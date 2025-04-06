import { supabase } from '@/utils/supabase';
import { Database } from '@/utils/supabase-types';

export type Badge = Database['public']['Tables']['badges']['Row'];
export type UserBadge = Database['public']['Tables']['user_badges']['Row'];

export const badgeService = {
  /**
   * Get all badges
   */
  async getAllBadges(): Promise<Badge[]> {
    const { data, error } = await supabase
      .from('badges')
      .select('*');
      
    if (error) {
      console.error('Error fetching badges:', error);
      return [];
    }
    
    return data;
  },
  
  /**
   * Get a specific badge by ID
   */
  async getBadgeById(badgeId: number): Promise<Badge | null> {
    const { data, error } = await supabase
      .from('badges')
      .select('*')
      .eq('id', badgeId)
      .single();
      
    if (error) {
      console.error('Error fetching badge:', error);
      return null;
    }
    
    return data;
  },
  
  /**
   * Get the current user's badges
   */
  async getUserBadges(): Promise<(UserBadge & { badge: Badge })[]> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('user_badges')
      .select('*, badge:badges(*)')
      .eq('user_id', user.id);
      
    if (error) {
      console.error('Error fetching user badges:', error);
      return [];
    }
    
    return data as any;
  },
  
  /**
   * Get badges for a specific user
   */
  async getBadgesByUserId(userId: string): Promise<(UserBadge & { badge: Badge })[]> {
    const { data, error } = await supabase
      .from('user_badges')
      .select('*, badge:badges(*)')
      .eq('user_id', userId);
      
    if (error) {
      console.error('Error fetching user badges:', error);
      return [];
    }
    
    return data as any;
  }
};
