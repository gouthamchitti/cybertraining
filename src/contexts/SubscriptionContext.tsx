import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { 
  SubscriptionTier, 
  UserSubscription, 
  subscriptionService 
} from '@/services/subscriptionService';

interface SubscriptionContextType {
  tiers: SubscriptionTier[];
  currentSubscription: UserSubscription | null;
  loading: boolean;
  subscribe: (tierId: number) => Promise<boolean>;
  cancelSubscription: () => Promise<boolean>;
  hasAccess: (feature: string) => Promise<boolean>;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTiers();
    
    if (user) {
      loadCurrentSubscription();
    } else {
      setCurrentSubscription(null);
      setLoading(false);
    }
  }, [user]);

  // Load subscription tiers
  const loadTiers = async () => {
    try {
      const tiers = await subscriptionService.getAllTiers();
      setTiers(tiers);
    } catch (error) {
      console.error('Error loading subscription tiers:', error);
    }
  };

  // Load current subscription
  const loadCurrentSubscription = async () => {
    setLoading(true);
    try {
      const subscription = await subscriptionService.getCurrentSubscription();
      setCurrentSubscription(subscription);
    } catch (error) {
      console.error('Error loading current subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  // Subscribe to a tier
  const subscribe = async (tierId: number) => {
    if (!user) return false;
    
    setLoading(true);
    try {
      const subscription = await subscriptionService.subscribe(tierId);
      if (subscription) {
        setCurrentSubscription(subscription);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error subscribing to tier:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Cancel subscription
  const cancelSubscription = async () => {
    if (!user || !currentSubscription) return false;
    
    setLoading(true);
    try {
      const success = await subscriptionService.cancelSubscription(currentSubscription.id);
      if (success) {
        setCurrentSubscription(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check if user has access to a feature
  const hasAccess = async (feature: string) => {
    return await subscriptionService.hasAccess(feature);
  };

  // Refresh subscription
  const refreshSubscription = async () => {
    if (!user) return;
    
    try {
      const subscription = await subscriptionService.getCurrentSubscription();
      setCurrentSubscription(subscription);
    } catch (error) {
      console.error('Error refreshing subscription:', error);
    }
  };

  const value = {
    tiers,
    currentSubscription,
    loading,
    subscribe,
    cancelSubscription,
    hasAccess,
    refreshSubscription
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
