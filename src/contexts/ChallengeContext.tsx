import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import {
  Challenge,
  UserChallenge,
  challengeService
} from '@/services/challengeService';
import {
  LeaderboardEntry,
  leaderboardService
} from '@/services/leaderboardService';

interface ChallengeContextType {
  challenges: Challenge[];
  userChallenges: Record<number, UserChallenge>;
  leaderboard: LeaderboardEntry[];
  userRank: { rank: number; totalUsers: number } | null;
  loading: {
    challenges: boolean;
    userChallenges: boolean;
    leaderboard: boolean;
  };
  startChallenge: (challengeId: number) => Promise<UserChallenge | null>;
  submitSolution: (challengeId: number, solution: string) => Promise<{ success: boolean; message: string; points?: number }>;
  getHint: (challengeId: number, hintIndex: number) => Promise<string | null>;
  refreshChallenges: () => Promise<void>;
  refreshLeaderboard: () => Promise<void>;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export function ChallengeProvider({ children }: { children: ReactNode }) {
  const { user, refreshProfile } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userChallenges, setUserChallenges] = useState<Record<number, UserChallenge>>({});
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<{ rank: number; totalUsers: number } | null>(null);
  const [loading, setLoading] = useState({
    challenges: true,
    userChallenges: true,
    leaderboard: true
  });

  useEffect(() => {
    loadChallenges();
    loadLeaderboard();

    if (user) {
      loadUserChallenges();
    } else {
      setUserChallenges({});
      setLoading(prev => ({ ...prev, userChallenges: false }));
    }
  }, [user]);

  // Load all challenges
  const loadChallenges = async () => {
    setLoading(prev => ({ ...prev, challenges: true }));
    try {
      const challenges = await challengeService.getAllChallenges();
      setChallenges(challenges);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(prev => ({ ...prev, challenges: false }));
    }
  };

  // Load user's challenge progress
  const loadUserChallenges = async () => {
    if (!user) return;

    setLoading(prev => ({ ...prev, userChallenges: true }));
    try {
      const userChallengesMap: Record<number, UserChallenge> = {};

      // For each challenge, get the user's progress
      for (const challenge of challenges) {
        const progress = await challengeService.getUserChallengeProgress(challenge.id);
        if (progress) {
          userChallengesMap[challenge.id] = progress;
        }
      }

      setUserChallenges(userChallengesMap);
    } catch (error) {
      console.error('Error loading user challenges:', error);
    } finally {
      setLoading(prev => ({ ...prev, userChallenges: false }));
    }
  };

  // Load leaderboard
  const loadLeaderboard = async () => {
    setLoading(prev => ({ ...prev, leaderboard: true }));
    try {
      const leaderboard = await leaderboardService.getGlobalLeaderboard(10);
      setLeaderboard(leaderboard || []); // Ensure we always have an array

      if (user) {
        const rank = await leaderboardService.getCurrentUserRank();
        setUserRank(rank);
      } else {
        setUserRank(null);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      setLeaderboard([]); // Set empty array on error
      setUserRank(null);
    } finally {
      setLoading(prev => ({ ...prev, leaderboard: false }));
    }
  };

  // Start a challenge
  const startChallenge = async (challengeId: number) => {
    if (!user) return null;

    try {
      const progress = await challengeService.startChallenge(challengeId);
      if (progress) {
        setUserChallenges(prev => ({
          ...prev,
          [challengeId]: progress
        }));
        return progress;
      }
      return null;
    } catch (error) {
      console.error('Error starting challenge:', error);
      return null;
    }
  };

  // Submit a solution
  const submitSolution = async (challengeId: number, solution: string) => {
    if (!user) return { success: false, message: 'You must be logged in to submit a solution' };

    try {
      const result = await challengeService.submitChallengeSolution(challengeId, solution);

      // If successful, refresh the user's challenge progress and profile
      if (result.success) {
        const progress = await challengeService.getUserChallengeProgress(challengeId);
        if (progress) {
          setUserChallenges(prev => ({
            ...prev,
            [challengeId]: progress
          }));
        }

        // Refresh profile to get updated points
        await refreshProfile();

        // Refresh leaderboard
        await loadLeaderboard();
      }

      return result;
    } catch (error) {
      console.error('Error submitting solution:', error);
      return { success: false, message: 'An error occurred while submitting your solution' };
    }
  };

  // Get a hint
  const getHint = async (challengeId: number, hintIndex: number) => {
    return await challengeService.getHint(challengeId, hintIndex);
  };

  // Refresh challenges
  const refreshChallenges = async () => {
    await loadChallenges();
    if (user) {
      await loadUserChallenges();
    }
  };

  // Refresh leaderboard
  const refreshLeaderboard = async () => {
    await loadLeaderboard();
  };

  const value = {
    challenges,
    userChallenges,
    leaderboard,
    userRank,
    loading,
    startChallenge,
    submitSolution,
    getHint,
    refreshChallenges,
    refreshLeaderboard
  };

  return <ChallengeContext.Provider value={value}>{children}</ChallengeContext.Provider>;
}

export function useChallenges() {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return context;
}
