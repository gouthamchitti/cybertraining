import { supabase } from '@/utils/supabase';
import { Database } from '@/utils/supabase-types';

export type UserAnalytics = Database['public']['Tables']['user_analytics']['Row'];

export const analyticsService = {
  /**
   * Track a user event
   */
  async trackEvent(eventType: string, eventData?: any): Promise<void> {
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
      console.error('Error tracking event:', error);
    }
  },
  
  /**
   * Get user activity summary
   */
  async getUserActivitySummary(): Promise<any> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;
    
    // Get login count
    const { count: loginCount, error: loginError } = await supabase
      .from('user_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('event_type', 'login');
      
    if (loginError) {
      console.error('Error fetching login count:', loginError);
    }
    
    // Get lesson view count
    const { count: lessonViewCount, error: lessonError } = await supabase
      .from('user_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('event_type', 'lesson_view');
      
    if (lessonError) {
      console.error('Error fetching lesson view count:', lessonError);
    }
    
    // Get challenge attempt count
    const { count: challengeAttemptCount, error: challengeError } = await supabase
      .from('user_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('event_type', 'challenge_attempt');
      
    if (challengeError) {
      console.error('Error fetching challenge attempt count:', challengeError);
    }
    
    // Get completed challenges count
    const { count: completedChallengesCount, error: completedError } = await supabase
      .from('user_challenges')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'completed');
      
    if (completedError) {
      console.error('Error fetching completed challenges count:', completedError);
    }
    
    // Get completed lessons count
    const { count: completedLessonsCount, error: lessonsError } = await supabase
      .from('user_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('completed', true);
      
    if (lessonsError) {
      console.error('Error fetching completed lessons count:', lessonsError);
    }
    
    // Get total points
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('total_points, rank')
      .eq('id', user.id)
      .single();
      
    if (profileError) {
      console.error('Error fetching profile:', profileError);
    }
    
    return {
      loginCount: loginCount || 0,
      lessonViewCount: lessonViewCount || 0,
      challengeAttemptCount: challengeAttemptCount || 0,
      completedChallengesCount: completedChallengesCount || 0,
      completedLessonsCount: completedLessonsCount || 0,
      totalPoints: profile?.total_points || 0,
      rank: profile?.rank || 'Novice'
    };
  },
  
  /**
   * Get recent activity
   */
  async getRecentActivity(limit: number = 10): Promise<UserAnalytics[]> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('user_analytics')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }
    
    return data;
  }
};
