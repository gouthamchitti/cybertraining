import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/utils/supabase';
import { User, Session } from '@supabase/supabase-js';
import { Profile, profileService } from '@/services/profileService';
import { notificationService } from '@/services/notificationService';
import { analyticsService } from '@/services/analyticsService';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  unreadNotificationsCount: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  useEffect(() => {
    // Set loading state
    setLoading(true);

    // Function to handle user session
    const handleSession = async (session: Session | null) => {
      // Update session and user state
      setSession(session);
      setUser(session?.user ?? null);

      // Clear user data if no session
      if (!session?.user) {
        setProfile(null);
        setUnreadNotificationsCount(0);
        setLoading(false);
        return;
      }

      // If we have a user, load their profile
      try {
        // Load user profile (profileService will create a default profile if needed)
        const userProfile = await profileService.getProfileById(session.user.id);

        if (userProfile) {
          setProfile(userProfile);
          console.log('Profile loaded successfully');

          // Check if we're on the landing page or login page and redirect to dashboard
          const currentPath = window.location.pathname;
          if (currentPath === '/' || currentPath === '/login') {
            // Force redirect to dashboard
            try {
              // Redirect based on role
              if (userProfile.role === 'admin' || userProfile.role === 'trainer') {
                // Use direct navigation for more reliable redirect
                window.location.href = '/admin/dashboard';
                // Fallback in case the above doesn't work
                setTimeout(() => {
                  window.location.replace('/admin/dashboard');
                }, 100);
              } else {
                // Redirect to the learning paths page instead of dashboard
                window.location.href = '/dashboard/learning-paths';
                // Fallback in case the above doesn't work
                setTimeout(() => {
                  window.location.replace('/dashboard/learning-paths');
                }, 100);
              }
            } catch (redirectError) {
              console.error('Error during redirect:', redirectError);
              // Last resort fallback
              window.location.href = '/dashboard/learning-paths';
            }
          }
        } else {
          console.warn('Could not load or create profile');
          // Set a minimal profile to prevent errors
          setProfile({
            id: session.user.id,
            username: session.user.email?.split('@')[0] || 'user',
            role: 'student',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as any);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        // Set a minimal profile to prevent errors
        setProfile({
          id: session.user.id,
          username: session.user.email?.split('@')[0] || 'user',
          role: 'student',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as any);
      }

      // Set a default notification count to prevent errors
      setUnreadNotificationsCount(0);

      // Always set loading to false when done
      setLoading(false);
    };

    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session } }) => handleSession(session))
      .catch(error => {
        console.error('Error getting session:', error);
        setLoading(false);
      });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      handleSession(session);

      // If user signed in, make sure they're redirected to dashboard
      if (event === 'SIGNED_IN') {
        const currentPath = window.location.pathname;
        if (currentPath === '/' || currentPath === '/login') {
          // The role-based redirect will happen in handleSession
          console.log('User signed in, redirecting to dashboard...');

          // Force redirect to dashboard after a short delay
          // This is a backup in case handleSession doesn't redirect
          setTimeout(() => {
            const path = window.location.pathname;
            if (path === '/' || path === '/login') {
              console.log('Forcing redirect to dashboard...');
              window.location.href = '/dashboard/learning-paths';
            }
          }, 1000);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Update last login timestamp
  const updateLastLogin = async () => {
    try {
      await profileService.updateLastLogin();
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  };

  // Sign in
  const signIn = async (email: string, password: string) => {
    try {
      // Set loading state
      setLoading(true);

      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setLoading(false);
        return { success: false, error: error.message };
      }

      // Set user and session immediately to trigger UI updates
      setUser(data.user);
      setSession(data.session);

      // Get user profile to determine role
      let role = 'student';
      if (data.user) {
        try {
          // Try to get the profile
          const userProfile = await profileService.getProfileById(data.user.id);
          if (userProfile) {
            setProfile(userProfile);
            role = userProfile.role || 'student';
          }

          // Update last login timestamp
          updateLastLogin().catch(err => console.error('Error updating last login:', err));
        } catch (profileError) {
          console.error('Error getting profile during login:', profileError);
          // Continue with default role if profile fetch fails
        }
      }

      // Return success with role for redirection
      return { success: true, role };
    } catch (error: any) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  // Sign up
  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      // Set loading state
      setLoading(true);

      // Clear local state first
      setUser(null);
      setProfile(null);
      setSession(null);
      setUnreadNotificationsCount(0);

      // Sign out from Supabase
      await supabase.auth.signOut();

      // Navigate to home page
      window.location.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);

      // Force clear local state even if API call fails
      setUser(null);
      setProfile(null);
      setSession(null);
      setUnreadNotificationsCount(0);

      // Force navigation to home page if there's an error
      window.location.replace('/');
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return false;

    try {
      const updatedProfile = await profileService.updateProfile(updates);
      if (updatedProfile) {
        setProfile(updatedProfile);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };

  // Refresh profile
  const refreshProfile = async () => {
    if (!user) return;

    try {
      const profile = await profileService.getProfileById(user.id);
      setProfile(profile);

      const count = await notificationService.getUnreadCount();
      setUnreadNotificationsCount(count);
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile,
    unreadNotificationsCount
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
