"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProgressTracker from "@/components/dashboard/ProgressTracker";
import LabEnvironments from "@/components/dashboard/LabEnvironments";
import { useAuth, useChallenges, useNotifications } from "@/contexts";
import { analyticsService } from "@/services/analyticsService";
import { profileService } from "@/services/profileService";

// Mock data for courses
const COURSES = [
  {
    id: 1,
    title: "Introduction to Cybersecurity",
    description: "Learn the fundamentals of cybersecurity and basic security principles.",
    level: "Beginner",
    duration: "4 weeks",
    progress: 0,
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
  },
  {
    id: 2,
    title: "Network Security Fundamentals",
    description: "Understand network vulnerabilities and how to secure network infrastructure.",
    level: "Intermediate",
    duration: "6 weeks",
    progress: 0,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80"
  },
  {
    id: 3,
    title: "Ethical Hacking",
    description: "Learn ethical hacking techniques to identify and fix security vulnerabilities.",
    level: "Advanced",
    duration: "8 weeks",
    progress: 0,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 4,
    title: "Security Compliance and Regulations",
    description: "Understand cybersecurity regulations, compliance frameworks, and best practices.",
    level: "Intermediate",
    duration: "5 weeks",
    progress: 0,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
  }
];

export default function Dashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const { challenges, userChallenges, loading: challengeLoading } = useChallenges();
  const { notifications } = useNotifications();
  const [activitySummary, setActivitySummary] = useState<any>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // If still loading auth state, don't do anything yet
    if (authLoading) return;

    // If not logged in, redirect to login
    if (!user) {
      window.location.href = "/login";
      return;
    }

    // Redirect to learning paths page
    if (window.location.pathname === '/dashboard') {
      window.location.href = "/dashboard/learning-paths";
      return;
    }

    // Load data for the dashboard
    loadAnalytics();
    trackDashboardVisit();
  }, [user, authLoading]);

  const loadAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      if (!user) {
        setLoadingAnalytics(false);
        return;
      }

      const summary = await analyticsService.getUserActivitySummary();
      setActivitySummary(summary);
    } catch (error) {
      console.error('Error loading analytics:', error);
      // Set default values if analytics fail to load
      setActivitySummary({
        loginCount: 0,
        lessonViewCount: 0,
        challengeAttemptCount: 0,
        completedChallengesCount: 0,
        completedLessonsCount: 0,
        totalPoints: 0,
        rank: 'Novice'
      });
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const trackDashboardVisit = async () => {
    if (!user) return;

    try {
      await analyticsService.trackEvent('dashboard_view');
    } catch (error) {
      // Just log the error but don't block the user experience
      console.error('Error tracking dashboard visit:', error);
    }
  };



  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="px-4 sm:px-0 mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Welcome back, {profile?.full_name || profile?.username || user?.email?.split('@')[0] || 'User'}!</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Continue your cybersecurity learning journey
            </p>
            {profile?.rank && (
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                Rank: {profile.rank}
              </div>
            )}
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
            {/* Left Column - Stats and Progress */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skill Level Stats */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Your Progress</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Track your learning journey</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20">
                        <svg viewBox="0 0 36 36" className="w-20 h-20 transform -rotate-90">
                          <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-gray-700" strokeWidth="3.6"></circle>
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            className="stroke-current text-red-500"
                            strokeWidth="3.6"
                            strokeDasharray="100"
                            strokeDashoffset="65"
                            strokeLinecap="round"
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">35%</span>
                        </div>
                      </div>
                      <span className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">Offensive</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20">
                        <svg viewBox="0 0 36 36" className="w-20 h-20 transform -rotate-90">
                          <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-gray-700" strokeWidth="3.6"></circle>
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            className="stroke-current text-blue-500"
                            strokeWidth="3.6"
                            strokeDasharray="100"
                            strokeDashoffset="58"
                            strokeLinecap="round"
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">42%</span>
                        </div>
                      </div>
                      <span className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">Defensive</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20">
                        <svg viewBox="0 0 36 36" className="w-20 h-20 transform -rotate-90">
                          <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-gray-700" strokeWidth="3.6"></circle>
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            className="stroke-current text-green-500"
                            strokeWidth="3.6"
                            strokeDasharray="100"
                            strokeDashoffset="72"
                            strokeLinecap="round"
                          ></circle>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">28%</span>
                        </div>
                      </div>
                      <span className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">General</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Stats */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Your Stats</h3>
                </div>
                <div className="p-6 grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">4</div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Courses Enrolled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">0</div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Courses Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">0</div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">Certificates Earned</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Weekly Activity */}
            <div className="space-y-6">
              {/* Weekly Streak */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Weekly Streak</h3>
                  <div className="mt-1 flex items-center">
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">5</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-end justify-between h-32">
                    {[
                      { day: "Mon", count: 2 },
                      { day: "Tue", count: 3 },
                      { day: "Wed", count: 1 },
                      { day: "Thu", count: 4 },
                      { day: "Fri", count: 2 },
                      { day: "Sat", count: 0 },
                      { day: "Sun", count: 1 }
                    ].map((day) => (
                      <div key={day.day} className="flex flex-col items-center">
                        <div
                          className={`w-8 rounded-t-md ${day.count > 0 ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                          style={{ height: day.count > 0 ? `${(day.count / 4) * 100}%` : '10%', minHeight: '4px' }}
                        ></div>
                        <div className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">{day.day}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">You're on a 5-day streak! Keep it up!</p>
                  </div>
                </div>
              </div>

              {/* AI Assistant */}
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">AI Learning Assistant</h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Need help with your cybersecurity training? Ask our AI assistant!
                  </p>
                  <Link
                    href="/dashboard/ai-assistant"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Open AI Assistant
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Progress Tracker */}
          {user && <ProgressTracker userId={user.id} />}

          {/* Lab Environments */}
          {user && <LabEnvironments userId={user.id} />}
        </div>
    </DashboardLayout>
  );
}
