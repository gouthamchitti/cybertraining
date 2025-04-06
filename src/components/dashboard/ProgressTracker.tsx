import React, { useState } from 'react';
import Link from 'next/link';
import { FiBarChart2, FiTrendingUp, FiClock, FiAward, FiCalendar, FiCheckCircle } from 'react-icons/fi';

interface ProgressTrackerProps {
  userId?: string;
}

// Sample data for progress tracking
const PROGRESS_DATA = {
  completedModules: 12,
  totalModules: 48,
  completionPercentage: 25,
  streak: 5,
  lastActive: '2023-05-03T16:10:00Z',
  timeSpent: '32h 45m',
  achievements: 8,
  recommendedModules: [
    {
      id: 'w1-m3',
      title: 'Network Security',
      description: 'Learn about network security fundamentals',
      progress: 0,
      path: 'Security+ Foundations'
    },
    {
      id: 'w2-m1',
      title: 'Reconnaissance Techniques',
      description: 'Understand different reconnaissance methods',
      progress: 0,
      path: 'Offensive Security Basics'
    },
    {
      id: 'w3-m2',
      title: 'Incident Response',
      description: 'Learn how to respond to security incidents',
      progress: 0,
      path: 'Defensive Security'
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: 'module_completed',
      title: 'Authentication & Access Control',
      date: '2023-05-03T14:30:00Z',
      path: 'Security+ Foundations'
    },
    {
      id: 2,
      type: 'quiz_completed',
      title: 'Security Concepts Quiz',
      date: '2023-05-02T11:15:00Z',
      score: 85,
      path: 'Security+ Foundations'
    },
    {
      id: 3,
      type: 'lab_completed',
      title: 'Linux Basics Lab',
      date: '2023-05-01T16:45:00Z',
      path: 'Practical Skills'
    },
    {
      id: 4,
      type: 'achievement_earned',
      title: 'First Lab Completed',
      date: '2023-05-01T16:50:00Z'
    }
  ],
  skillMap: {
    'Network Security': 65,
    'Web Security': 40,
    'Cryptography': 30,
    'System Security': 55,
    'Security Operations': 25,
    'Ethical Hacking': 45,
    'Incident Response': 35,
    'Risk Management': 20
  }
};

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ userId }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'skills' | 'recommendations'>('overview');
  const [loading, setLoading] = useState(false);

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get time since date
  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Get icon for activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'module_completed':
        return <FiCheckCircle className="h-5 w-5 text-green-500" />;
      case 'quiz_completed':
        return <FiBarChart2 className="h-5 w-5 text-blue-500" />;
      case 'lab_completed':
        return <FiAward className="h-5 w-5 text-purple-500" />;
      case 'achievement_earned':
        return <FiAward className="h-5 w-5 text-yellow-500" />;
      default:
        return <FiCalendar className="h-5 w-5 text-gray-500" />;
    }
  };

  // Calculate progress statistics
  const calculateStats = () => {
    if (challengeLoading || !challenges.length) {
      return {
        completedChallenges: 0,
        totalChallenges: 0,
        completionPercentage: 0
      };
    }

    const completedChallenges = Object.values(userChallenges).filter(
      uc => uc.status === 'completed'
    ).length;

    const totalChallenges = challenges.length;
    const completionPercentage = Math.round((completedChallenges / totalChallenges) * 100);

    return {
      completedChallenges,
      totalChallenges,
      completionPercentage
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2.5"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2.5"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2.5"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Your Learning Progress
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Track your journey through the cybersecurity curriculum
        </p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700">
        <dl>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Challenge Completion
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              <div className="flex items-center">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mr-2 max-w-md">
                  <div
                    className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full"
                    style={{ width: `${stats.completionPercentage}%` }}
                  ></div>
                </div>
                <span>{stats.completionPercentage}%</span>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {stats.completedChallenges} of {stats.totalChallenges} challenges completed
              </p>
            </dd>
          </div>

          <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Total Points
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              <span className="font-medium">{profile?.total_points || 0}</span>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Current rank: {profile?.rank || 'Novice'}
              </p>
            </dd>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Lessons Completed
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {activitySummary?.completedLessonsCount || 0}
            </dd>
          </div>

          <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Recent Activity
            </dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {recentActivity.length > 0 ? (
                <ul className="border border-gray-200 dark:border-gray-700 rounded-md divide-y divide-gray-200 dark:divide-gray-700">
                  {recentActivity.map((activity) => (
                    <li key={activity.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">
                          {activity.event_type.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(activity.created_at).toLocaleString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-500 dark:text-gray-400">No recent activity</span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      {/* Challenge Progress */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
          Challenge Progress
        </h3>

        {!challengeLoading && challenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenges.slice(0, 6).map((challenge) => {
              const userChallenge = userChallenges[challenge.id];
              const status = userChallenge?.status || 'not_started';

              return (
                <div
                  key={challenge.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-md p-4"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{challenge.title}</h4>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                          : status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {status === 'completed' ? 'Completed' : status === 'in_progress' ? 'In Progress' : 'Not Started'}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {challenge.category} • {challenge.difficulty}
                  </p>

                  {userChallenge?.points_earned > 0 && (
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Points earned: <span className="font-medium text-gray-900 dark:text-white">{userChallenge.points_earned}</span>
                    </p>
                  )}

                  {userChallenge?.completed_at && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Completed: {new Date(userChallenge.completed_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {challengeLoading ? 'Loading challenges...' : 'No challenges available. Start your learning journey by exploring the challenges section.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
