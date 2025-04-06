import { supabase } from '@/utils/supabase';
import { Database } from '@/utils/supabase-types';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export const profileService = {
  /**
   * Get the current user's profile
   */
  async getCurrentProfile(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  },

  /**
   * Get a user's profile by ID
   */
  async getProfileById(userId: string): Promise<Profile | null> {
    if (!userId) {
      console.warn('getProfileById called with no userId');
      return null;
    }

    try {
      // First try to get the existing profile
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // If profile exists, return it
      if (data) return data;

      // If no profile found (PGRST116 = no rows returned), create a default one
      if (error && error.code === 'PGRST116') {
        console.log('No profile found, creating default profile for user:', userId);
        return this.createDefaultProfile(userId);
      }

      // For other errors, log and return null
      if (error) {
        console.error('Error fetching profile:', error.message || error);
        return null;
      }

      return null;
    } catch (error: any) {
      console.error('Unexpected error fetching profile:', error?.message || error);
      return null;
    }
  },

  /**
   * Create a default profile for a new user
   */
  async createDefaultProfile(userId: string): Promise<Profile | null> {
    if (!userId) {
      console.warn('createDefaultProfile called with no userId');
      return null;
    }

    try {
      // Get user data to populate profile
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        console.warn('No user found when creating default profile');
        return null;
      }

      // Create default profile object
      const defaultProfile = {
        id: userId,
        username: user.email?.split('@')[0] || 'user',
        full_name: user.user_metadata?.full_name || '',
        avatar_url: user.user_metadata?.avatar_url || '',
        bio: '',
        total_points: 0,
        rank: 'Novice',
        role: 'student', // Default role is student
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        progress: 0
      };

      // Insert the profile into the database
      const { data, error } = await supabase
        .from('profiles')
        .insert(defaultProfile)
        .select()
        .single();

      if (error) {
        console.error('Error creating default profile:', error.message || error);
        return null;
      }

      console.log('Successfully created default profile for user:', userId);
      return data;
    } catch (error: any) {
      console.error('Error creating default profile:', error?.message || error);
      return null;
    }
  },

  /**
   * Update the current user's profile
   */
  async updateProfile(profile: ProfileUpdate): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return null;
    }

    return data;
  },

  /**
   * Update the user's last login time
   */
  async updateLastLogin(): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating last login:', error);
    }
  },

  /**
   * Track user activity
   */
  async trackActivity(eventType: string, eventData?: any): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from('user_analytics')
      .insert({
        user_id: user.id,
        event_type: eventType,
        event_data: eventData || null
      });

    if (error) {
      console.error('Error tracking activity:', error);
    }
  },

  /**
   * Get all students (users with role 'student')
   */
  async getAllStudents(): Promise<{ data: Profile[] | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student');

      return { data, error };
    } catch (error) {
      console.error('Error fetching students:', error);
      return { data: null, error };
    }
  }
};
