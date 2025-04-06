import { supabase } from '@/utils/supabase';
import { Database } from '@/utils/supabase-types';

export type Challenge = Database['public']['Tables']['challenges']['Row'];
export type UserChallenge = Database['public']['Tables']['user_challenges']['Row'];

export const challengeService = {
  /**
   * Get all challenges
   */
  async getAllChallenges(): Promise<Challenge[]> {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_active', true)
        .order('difficulty', { ascending: true });

      if (error) {
        console.error('Error fetching challenges:', error.message || error);
        return [];
      }

      return data || [];
    } catch (error: any) {
      console.error('Error fetching challenges:', error?.message || error);
      return [];
    }
  },

  /**
   * Get challenges by category
   */
  async getChallengesByCategory(category: string): Promise<Challenge[]> {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('difficulty', { ascending: true });

    if (error) {
      console.error('Error fetching challenges by category:', error);
      return [];
    }

    return data;
  },

  /**
   * Get challenges by difficulty
   */
  async getChallengesByDifficulty(difficulty: string): Promise<Challenge[]> {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('difficulty', difficulty)
      .eq('is_active', true)
      .order('category', { ascending: true });

    if (error) {
      console.error('Error fetching challenges by difficulty:', error);
      return [];
    }

    return data;
  },

  /**
   * Get a specific challenge by ID
   */
  async getChallengeById(challengeId: number): Promise<Challenge | null> {
    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .eq('id', challengeId)
      .single();

    if (error) {
      console.error('Error fetching challenge:', error);
      return null;
    }

    return data;
  },

  /**
   * Get the current user's challenge progress
   */
  async getUserChallengeProgress(challengeId: number): Promise<UserChallenge | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from('user_challenges')
      .select('*')
      .eq('user_id', user.id)
      .eq('challenge_id', challengeId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No progress found, create a new entry
        return this.initializeUserChallenge(challengeId);
      }
      console.error('Error fetching user challenge progress:', error);
      return null;
    }

    return data;
  },

  /**
   * Initialize a user challenge
   */
  async initializeUserChallenge(challengeId: number): Promise<UserChallenge | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from('user_challenges')
      .insert({
        user_id: user.id,
        challenge_id: challengeId,
        status: 'not_started',
        attempts: 0,
        points_earned: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Error initializing user challenge:', error);
      return null;
    }

    return data;
  },

  /**
   * Start a challenge
   */
  async startChallenge(challengeId: number): Promise<UserChallenge | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    // Get current progress
    const currentProgress = await this.getUserChallengeProgress(challengeId);

    if (!currentProgress) return null;

    // Only update if not already started or completed
    if (currentProgress.status === 'not_started') {
      const { data, error } = await supabase
        .from('user_challenges')
        .update({
          status: 'in_progress',
          updated_at: new Date().toISOString()
        })
        .eq('id', currentProgress.id)
        .select()
        .single();

      if (error) {
        console.error('Error starting challenge:', error);
        return null;
      }

      return data;
    }

    return currentProgress;
  },

  /**
   * Submit a challenge solution
   */
  async submitChallengeSolution(challengeId: number, solution: string): Promise<{ success: boolean; message: string; points?: number }> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, message: 'User not authenticated' };

    // Get the challenge
    const challenge = await this.getChallengeById(challengeId);
    if (!challenge) return { success: false, message: 'Challenge not found' };

    // Get current progress
    const currentProgress = await this.getUserChallengeProgress(challengeId);
    if (!currentProgress) return { success: false, message: 'Challenge progress not found' };

    // Check if already completed
    if (currentProgress.status === 'completed') {
      return { success: true, message: 'Challenge already completed', points: currentProgress.points_earned };
    }

    // Increment attempts
    const attempts = currentProgress.attempts + 1;

    // Check solution (in a real app, this would be more sophisticated)
    const isCorrect = solution.trim().toLowerCase() === challenge.solution?.trim().toLowerCase();

    if (isCorrect) {
      // Calculate points (fewer points for more attempts)
      const pointsMultiplier = Math.max(0.5, 1 - (attempts - 1) * 0.1); // 10% reduction per attempt, minimum 50%
      const pointsEarned = Math.round(challenge.points * pointsMultiplier);

      // Update progress
      const { error } = await supabase
        .from('user_challenges')
        .update({
          status: 'completed',
          attempts,
          completed_at: new Date().toISOString(),
          points_earned: pointsEarned,
          solution_submitted: solution,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentProgress.id);

      if (error) {
        console.error('Error updating challenge progress:', error);
        return { success: false, message: 'Error updating challenge progress' };
      }

      // Check for badges
      await this.checkForBadges(user.id);

      return { success: true, message: 'Correct solution!', points: pointsEarned };
    } else {
      // Update attempts
      const { error } = await supabase
        .from('user_challenges')
        .update({
          attempts,
          solution_submitted: solution,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentProgress.id);

      if (error) {
        console.error('Error updating challenge attempts:', error);
        return { success: false, message: 'Error updating challenge attempts' };
      }

      return { success: false, message: 'Incorrect solution. Try again!' };
    }
  },

  /**
   * Get a hint for a challenge
   */
  async getHint(challengeId: number, hintIndex: number): Promise<string | null> {
    const challenge = await this.getChallengeById(challengeId);

    if (!challenge || !challenge.hints) return null;

    const hints = challenge.hints as any;
    const hintKey = `hint${hintIndex + 1}`;

    return hints[hintKey] || null;
  },

  /**
   * Check for badges that the user might have earned
   */
  async checkForBadges(userId: string): Promise<void> {
    // Get all badges
    const { data: badges, error: badgesError } = await supabase
      .from('badges')
      .select('*');

    if (badgesError || !badges) {
      console.error('Error fetching badges:', badgesError);
      return;
    }

    // Get user's completed challenges
    const { data: userChallenges, error: challengesError } = await supabase
      .from('user_challenges')
      .select('*, challenges(*)')
      .eq('user_id', userId)
      .eq('status', 'completed');

    if (challengesError) {
      console.error('Error fetching user challenges:', challengesError);
      return;
    }

    // Get user's existing badges
    const { data: userBadges, error: userBadgesError } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', userId);

    if (userBadgesError) {
      console.error('Error fetching user badges:', userBadgesError);
      return;
    }

    const existingBadgeIds = userBadges.map(ub => ub.badge_id);

    // Check each badge criteria
    for (const badge of badges) {
      // Skip if user already has this badge
      if (existingBadgeIds.includes(badge.id)) continue;

      const criteria = badge.criteria as any;
      let earned = false;

      if (criteria.type === 'challenge_completion') {
        if (criteria.count === 1 && userChallenges.length > 0) {
          // First challenge completion
          earned = true;
        } else if (criteria.category && criteria.count === 'all') {
          // All challenges in a category
          const categoryChallenges = userChallenges.filter(uc =>
            (uc.challenges as any).category === criteria.category
          );

          // Get total challenges in this category
          const { count } = await supabase
            .from('challenges')
            .select('*', { count: 'exact', head: true })
            .eq('category', criteria.category);

          if (count && categoryChallenges.length === count) {
            earned = true;
          }
        }
      } else if (criteria.type === 'points' && criteria.threshold) {
        // Get user's total points
        const { data: profile } = await supabase
          .from('profiles')
          .select('total_points')
          .eq('id', userId)
          .single();

        if (profile && profile.total_points >= criteria.threshold) {
          earned = true;
        }
      }

      // Award badge if earned
      if (earned) {
        const { error } = await supabase
          .from('user_badges')
          .insert({
            user_id: userId,
            badge_id: badge.id
          });

        if (error) {
          console.error('Error awarding badge:', error);
        } else {
          // Create notification
          await supabase
            .from('notifications')
            .insert({
              user_id: userId,
              title: 'New Badge Earned!',
              message: `Congratulations! You've earned the "${badge.name}" badge.`,
              type: 'achievement',
              data: { badge_id: badge.id }
            });
        }
      }
    }
  },

  /**
   * Get the leaderboard
   */
  async getLeaderboard(limit: number = 10): Promise<any[]> {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .limit(limit);

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }

    return data;
  }
};
