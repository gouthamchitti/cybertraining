import { supabase } from '@/utils/supabase';
import { Database } from '@/utils/supabase-types';

export type LeaderboardEntry = Database['public']['Views']['leaderboard']['Row'];

export const leaderboardService = {
  /**
   * Get the global leaderboard
   */
  async getGlobalLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    try {
      // Check if user is authenticated first
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Return empty array for non-authenticated users
        return [];
      }

      // Check if the profiles table exists
      const { error: tableCheckError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

      // If profiles table doesn't exist, return mock data
      if (tableCheckError) {
        console.warn('Profiles table not found, returning mock leaderboard data');
        return [
          {
            user_id: '1',
            username: 'cyberhero',
            full_name: 'Cyber Hero',
            avatar_url: null,
            total_points: 1250,
            rank: 'Expert',
            badges_count: 8,
            challenges_completed: 25
          },
          {
            user_id: '2',
            username: 'securityninja',
            full_name: 'Security Ninja',
            avatar_url: null,
            total_points: 980,
            rank: 'Advanced',
            badges_count: 6,
            challenges_completed: 18
          },
          {
            user_id: user.id,
            username: user.email?.split('@')[0] || 'currentuser',
            full_name: user.user_metadata?.full_name || 'Current User',
            avatar_url: null,
            total_points: 750,
            rank: 'Intermediate',
            badges_count: 4,
            challenges_completed: 12
          },
          {
            user_id: '3',
            username: 'hackmaster',
            full_name: 'Hack Master',
            avatar_url: null,
            total_points: 620,
            rank: 'Intermediate',
            badges_count: 3,
            challenges_completed: 10
          },
          {
            user_id: '4',
            username: 'codebreaker',
            full_name: 'Code Breaker',
            avatar_url: null,
            total_points: 450,
            rank: 'Beginner',
            badges_count: 2,
            challenges_completed: 7
          }
        ];
      }

      // Try to fetch from the profiles table directly
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select(`
          id as user_id,
          username,
          full_name,
          avatar_url,
          total_points,
          rank
        `)
        .order('total_points', { ascending: false })
        .limit(limit);

      if (profilesError) {
        console.error('Error fetching profiles for leaderboard:', profilesError.message || profilesError);
        return [];
      }

      if (!profilesData) {
        return [];
      }

      // Transform profiles data to match leaderboard structure
      return profilesData.map(profile => ({
        ...profile,
        badges_count: 0, // Default values since we don't have this data
        challenges_completed: 0
      }));
    } catch (error: any) {
      console.error('Error fetching leaderboard:', error?.message || error);
      return [];
    }
  },

  /**
   * Get the current user's rank on the leaderboard
   */
  async getCurrentUserRank(): Promise<{ rank: number; totalUsers: number } | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return null;
      }

      // Check if the profiles table exists
      const { error: tableCheckError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);

      // If profiles table doesn't exist, return mock data
      if (tableCheckError) {
        console.warn('Profiles table not found, returning mock rank data');
        return {
          rank: 3, // Mock rank (3rd place)
          totalUsers: 50 // Mock total users
        };
      }

      // Get all profiles ordered by points
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, total_points')
        .order('total_points', { ascending: false });

      if (profilesError) {
        console.error('Error fetching profiles for rank:', profilesError.message || profilesError);
        // Return mock data as fallback
        return {
          rank: 3, // Mock rank (3rd place)
          totalUsers: 50 // Mock total users
        };
      }

      if (!profilesData || profilesData.length === 0) {
        // Return mock data as fallback
        return {
          rank: 1, // If no other users, current user is #1
          totalUsers: 1 // Just the current user
        };
      }

      // Find the current user's position
      const userIndex = profilesData.findIndex(entry => entry.id === user.id);

      if (userIndex === -1) {
        // User not found in profiles, return mock data
        return {
          rank: profilesData.length + 1, // Place user at the end
          totalUsers: profilesData.length + 1 // Include the current user
        };
      }

      return {
        rank: userIndex + 1, // +1 because array indices start at 0
        totalUsers: profilesData.length
      };
    } catch (error: any) {
      console.error('Error getting user rank:', error?.message || error);
      // Return mock data as fallback
      return {
        rank: 3, // Mock rank (3rd place)
        totalUsers: 50 // Mock total users
      };
    }
  },

  /**
   * Get the leaderboard with the current user's position highlighted
   */
  async getLeaderboardWithUserPosition(limit: number = 10): Promise<{ entries: LeaderboardEntry[]; userPosition: number | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        const entries = await this.getGlobalLeaderboard(limit);
        return { entries, userPosition: null };
      }

      try {
        // Get all users ordered by points
        const { data, error } = await supabase
          .from('leaderboard')
          .select('*')
          .order('total_points', { ascending: false });

        if (error || !data) {
          // Log only in development, not in production
          if (process.env.NODE_ENV === 'development') {
            console.error('Error fetching leaderboard with user position');
          }
          return { entries: [], userPosition: null };
        }

        // Find the current user's position
        const userIndex = data.findIndex(entry => entry.user_id === user.id);

        if (userIndex === -1) {
          return { entries: data.slice(0, limit), userPosition: null };
        }

        // If user is in the top 'limit', just return the top 'limit'
        if (userIndex < limit) {
          return { entries: data.slice(0, limit), userPosition: userIndex };
        }

        // Otherwise, include some entries before and after the user's position
        const beforeCount = Math.min(Math.floor(limit / 2), userIndex);
        const afterCount = Math.min(limit - beforeCount - 1, data.length - userIndex - 1);

        const entries = [
          ...data.slice(0, 3), // Always include top 3
          ...(userIndex > 3 ? [{ user_id: '...', username: '...', total_points: 0 } as any] : []),
          ...data.slice(userIndex - beforeCount, userIndex + afterCount + 1)
        ];

        return {
          entries: entries.slice(0, limit),
          userPosition: beforeCount + (userIndex > 3 ? 4 : 0)
        };
      } catch (error) {
        // Log only in development, not in production
        if (process.env.NODE_ENV === 'development') {
          console.error('Error in getLeaderboardWithUserPosition');
        }
        return { entries: [], userPosition: null };
      }
    } catch (error) {
      // Log only in development, not in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Unexpected error in getLeaderboardWithUserPosition');
      }
      return { entries: [], userPosition: null };
    }
  }
};
