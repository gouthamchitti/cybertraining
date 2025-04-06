import { supabase } from '@/utils/supabase';
import { Database } from '@/utils/supabase-types';

export type SubscriptionTier = Database['public']['Tables']['subscription_tiers']['Row'];
export type UserSubscription = Database['public']['Tables']['user_subscriptions']['Row'];

export const subscriptionService = {
  /**
   * Get all subscription tiers
   */
  async getAllTiers(): Promise<SubscriptionTier[]> {
    try {
      // Check if the table exists first
      const { error: tableCheckError } = await supabase
        .from('subscription_tiers')
        .select('count')
        .limit(1);

      // If table doesn't exist, return mock data
      if (tableCheckError) {
        console.warn('Subscription tiers table not found, returning mock data');
        return [
          {
            id: 1,
            name: 'Basic',
            description: 'Access to basic courses and challenges',
            price: 0,
            features: ['Basic courses', 'Community forum access'],
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 2,
            name: 'Premium',
            description: 'Full access to all courses and features',
            price: 29.99,
            features: ['All courses', 'Live labs', 'Certification preparation'],
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ];
      }

      // If table exists, get the data
      const { data, error } = await supabase
        .from('subscription_tiers')
        .select('*')
        .order('price', { ascending: true });

      if (error) {
        console.error('Error fetching subscription tiers:', error.message || error);
        return [];
      }

      return data || [];
    } catch (error: any) {
      console.error('Error fetching subscription tiers:', error?.message || error);
      return [];
    }
  },

  /**
   * Get a specific subscription tier by ID
   */
  async getTierById(tierId: number): Promise<SubscriptionTier | null> {
    const { data, error } = await supabase
      .from('subscription_tiers')
      .select('*')
      .eq('id', tierId)
      .single();

    if (error) {
      console.error('Error fetching subscription tier:', error);
      return null;
    }

    return data;
  },

  /**
   * Get the current user's subscription
   */
  async getCurrentSubscription(): Promise<UserSubscription | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.warn('getCurrentSubscription called with no authenticated user');
        return null;
      }

      // Check if the tables exist first
      const { error: tableCheckError } = await supabase
        .from('user_subscriptions')
        .select('count')
        .limit(1);

      // If tables don't exist, return mock data
      if (tableCheckError) {
        console.warn('User subscriptions table not found, returning mock data');
        return {
          id: 1,
          user_id: user.id,
          subscription_tier_id: 1,
          is_active: true,
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          subscription_tiers: {
            id: 1,
            name: 'Basic',
            description: 'Access to basic courses and challenges',
            price: 0,
            features: ['Basic courses', 'Community forum access'],
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        } as any;
      }

      try {
        const { data, error } = await supabase
          .from('user_subscriptions')
          .select('*, subscription_tiers(*)')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // No subscription found, this is normal for new users
            return null;
          }
          console.error('Error fetching subscription:', error.message || error);
          return null;
        }

        return data;
      } catch (error: any) {
        // If there's an error with the relationship, return a basic subscription
        if (error.message && error.message.includes('relationship')) {
          console.warn('Relationship error, returning mock subscription');
          return {
            id: 1,
            user_id: user.id,
            subscription_tier_id: 1,
            is_active: true,
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          } as any;
        }

        console.error('Error fetching subscription:', error?.message || error);
        return null;
      }
    } catch (error: any) {
      console.error('Error fetching subscription:', error?.message || error);
      return null;
    }
  },

  /**
   * Subscribe to a tier
   */
  async subscribe(tierId: number): Promise<UserSubscription | null> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    // First, deactivate any existing subscriptions
    await supabase
      .from('user_subscriptions')
      .update({ is_active: false })
      .eq('user_id', user.id)
      .eq('is_active', true);

    // Create new subscription
    const { data, error } = await supabase
      .from('user_subscriptions')
      .insert({
        user_id: user.id,
        tier_id: tierId,
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        is_active: true,
        payment_status: 'completed' // In a real app, this would be set after payment processing
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating subscription:', error);
      return null;
    }

    return data;
  },

  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: number): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { error } = await supabase
      .from('user_subscriptions')
      .update({ is_active: false })
      .eq('id', subscriptionId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error canceling subscription:', error);
      return false;
    }

    return true;
  },

  /**
   * Check if the current user has access to a specific feature
   */
  async hasAccess(feature: string): Promise<boolean> {
    const subscription = await this.getCurrentSubscription();

    if (!subscription) {
      // If no subscription, check if the feature is available in the free tier
      const freeTier = await supabase
        .from('subscription_tiers')
        .select('*')
        .eq('name', 'Free')
        .single();

      if (freeTier.error || !freeTier.data) return false;

      const features = freeTier.data.features as any;
      return !!features && features[feature] !== undefined;
    }

    // Get the tier details
    const tier = await this.getTierById(subscription.tier_id);
    if (!tier) return false;

    const features = tier.features as any;
    return !!features && features[feature] !== undefined;
  }
};
