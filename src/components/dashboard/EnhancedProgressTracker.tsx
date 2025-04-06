"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FiBarChart2, FiTrendingUp, FiClock, FiAward, FiCalendar, FiCheckCircle } from 'react-icons/fi';

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

interface EnhancedProgressTrackerProps {
  userId?: string;
}

const EnhancedProgressTracker: React.FC<EnhancedProgressTrackerProps> = ({ userId }) => {
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

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg animate-pulse">
        <div className="px-4 py-5 sm:px-6">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200 sm:dark:divide-gray-700">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="mt-1 h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 sm:mt-0 sm:col-span-2"></div>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="mt-1 h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 sm:mt-0 sm:col-span-2"></div>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="mt-1 h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 sm:mt-0 sm:col-span-2"></div>
            </div>
          </dl>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Learning Progress
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Track your progress and see your learning journey
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900 p-3 rounded-md">
              <FiBarChart2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Completion</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{PROGRESS_DATA.completionPercentage}%</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {PROGRESS_DATA.completedModules}/{PROGRESS_DATA.totalModules} modules
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 p-3 rounded-md">
              <FiTrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Current Streak</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{PROGRESS_DATA.streak} days</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Last active: {getTimeSince(PROGRESS_DATA.lastActive)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-md">
              <FiClock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Time Spent</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{PROGRESS_DATA.timeSpent}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total learning time
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 dark:bg-yellow-900 p-3 rounded-md">
              <FiAward className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Achievements</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{PROGRESS_DATA.achievements}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Badges earned
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex px-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`${
              activeTab === 'activity'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
          >
            Recent Activity
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`${
              activeTab === 'skills'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
          >
            Skills Map
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`${
              activeTab === 'recommendations'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Recommendations
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'overview' && (
          <div>
            <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">Overall Progress</h4>
            
            {/* Overall Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Course Completion</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{PROGRESS_DATA.completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${PROGRESS_DATA.completionPercentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Learning Path Visual */}
            <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">Learning Path</h4>
            <div className="relative">
              <div className="absolute left-4 inset-y-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              <div className="relative z-10 mb-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                    <FiCheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-4 bg-white dark:bg-gray-700 rounded-lg shadow p-4 flex-1">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">Security+ Foundations</h5>
                    <div className="mt-1 flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">4/4 modules completed</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 mb-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    <span className="text-white font-medium">2</span>
                  </div>
                  <div className="ml-4 bg-white dark:bg-gray-700 rounded-lg shadow p-4 flex-1">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">Offensive Security Basics</h5>
                    <div className="mt-1 flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">3/5 modules completed</span>
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                        <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 mb-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">3</span>
                  </div>
                  <div className="ml-4 bg-white dark:bg-gray-700 rounded-lg shadow p-4 flex-1">
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white">Defensive Security</h5>
                    <div className="mt-1 flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">0/4 modules completed</span>
                      <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                        <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'activity' && (
          <div>
            <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h4>
            
            <div className="relative">
              <div className="absolute left-4 inset-y-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              {PROGRESS_DATA.recentActivity.map((activity) => (
                <div key={activity.id} className="relative z-10 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white dark:bg-gray-800 border-2 border-indigo-500 flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="ml-4 bg-white dark:bg-gray-700 rounded-lg shadow p-4 flex-1">
                      <div className="flex justify-between">
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</h5>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{getTimeSince(activity.date)}</span>
                      </div>
                      <div className="mt-1">
                        {activity.path && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Path: {activity.path}
                          </span>
                        )}
                        {activity.score !== undefined && (
                          <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Score: {activity.score}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'skills' && (
          <div>
            <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">Skills Map</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(PROGRESS_DATA.skillMap).map(([skill, level]) => (
                <div key={skill} className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        level >= 70 ? 'bg-green-600' : level >= 40 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'recommendations' && (
          <div>
            <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">Recommended Next Steps</h4>
            
            <div className="space-y-4">
              {PROGRESS_DATA.recommendedModules.map((module) => (
                <div key={module.id} className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-between">
                      <h5 className="text-sm font-medium text-gray-900 dark:text-white">{module.title}</h5>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                        {module.path}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{module.description}</p>
                    <div className="mt-4">
                      <Link
                        href={`/student-dashboard/module/${module.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Start Module
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedProgressTracker;
