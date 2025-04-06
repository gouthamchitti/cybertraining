import { supabase } from './supabase';

// Types
export interface ModuleCompletion {
  id?: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  score?: number;
  time_spent?: number;
  last_accessed?: Date;
  completed_at?: Date;
}

export interface QuizAttempt {
  id?: string;
  user_id: string;
  module_id: string;
  quiz_id: string;
  score: number;
  max_score: number;
  passed: boolean;
  attempt_number: number;
  answers?: any;
}

export interface UserActivity {
  id?: string;
  user_id: string;
  activity_type: string;
  module_id?: string;
  details?: any;
}

export interface UserSkill {
  id?: string;
  user_id: string;
  skill_name: string;
  proficiency_level: number;
}

// Module completion functions
export async function getModuleCompletion(userId: string, moduleId: string) {
  const { data, error } = await supabase
    .from('progress.module_completion')
    .select('*')
    .eq('user_id', userId)
    .eq('module_id', moduleId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching module completion:', error);
    return null;
  }

  return data;
}

export async function getAllModuleCompletions(userId: string) {
  const { data, error } = await supabase
    .from('progress.module_completion')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching all module completions:', error);
    return [];
  }

  return data || [];
}

export async function updateModuleCompletion(completion: ModuleCompletion) {
  const { data, error } = await supabase
    .from('progress.module_completion')
    .upsert(completion)
    .select()
    .single();

  if (error) {
    console.error('Error updating module completion:', error);
    return null;
  }

  return data;
}

export async function markModuleCompleted(userId: string, moduleId: string, score?: number) {
  const now = new Date();
  const completion: ModuleCompletion = {
    user_id: userId,
    module_id: moduleId,
    completed: true,
    score,
    last_accessed: now,
    completed_at: now
  };

  return updateModuleCompletion(completion);
}

export async function trackModuleAccess(userId: string, moduleId: string) {
  // First, check if we already have a record
  const existing = await getModuleCompletion(userId, moduleId);
  
  const completion: ModuleCompletion = {
    user_id: userId,
    module_id: moduleId,
    completed: existing?.completed || false,
    score: existing?.score,
    time_spent: existing?.time_spent,
    last_accessed: new Date()
  };

  return updateModuleCompletion(completion);
}

// Quiz attempt functions
export async function getQuizAttempts(userId: string, moduleId: string, quizId: string) {
  const { data, error } = await supabase
    .from('progress.quiz_attempts')
    .select('*')
    .eq('user_id', userId)
    .eq('module_id', moduleId)
    .eq('quiz_id', quizId)
    .order('attempt_number', { ascending: false });

  if (error) {
    console.error('Error fetching quiz attempts:', error);
    return [];
  }

  return data || [];
}

export async function saveQuizAttempt(attempt: QuizAttempt) {
  // Get the latest attempt number
  const attempts = await getQuizAttempts(attempt.user_id, attempt.module_id, attempt.quiz_id);
  const attemptNumber = attempts.length > 0 ? attempts[0].attempt_number + 1 : 1;
  
  const newAttempt = {
    ...attempt,
    attempt_number: attemptNumber
  };

  const { data, error } = await supabase
    .from('progress.quiz_attempts')
    .insert(newAttempt)
    .select()
    .single();

  if (error) {
    console.error('Error saving quiz attempt:', error);
    return null;
  }

  // If this is a passing attempt, also mark the module as completed
  if (newAttempt.passed) {
    await markModuleCompleted(newAttempt.user_id, newAttempt.module_id, newAttempt.score);
  }

  return data;
}

// User activity functions
export async function logUserActivity(activity: UserActivity) {
  const { data, error } = await supabase
    .from('progress.user_activity')
    .insert(activity)
    .select()
    .single();

  if (error) {
    console.error('Error logging user activity:', error);
    return null;
  }

  return data;
}

export async function getUserActivities(userId: string, limit = 50) {
  const { data, error } = await supabase
    .from('progress.user_activity')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching user activities:', error);
    return [];
  }

  return data || [];
}

// User skills functions
export async function getUserSkills(userId: string) {
  const { data, error } = await supabase
    .from('progress.user_skills')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user skills:', error);
    return [];
  }

  return data || [];
}

export async function updateUserSkill(skill: UserSkill) {
  const { data, error } = await supabase
    .from('progress.user_skills')
    .upsert(skill)
    .select()
    .single();

  if (error) {
    console.error('Error updating user skill:', error);
    return null;
  }

  return data;
}

// Admin functions
export async function getAllUserProgress(limit = 100) {
  const { data, error } = await supabase
    .from('progress.module_completion')
    .select(`
      *,
      user:user_id (
        id,
        email,
        raw_user_meta_data
      )
    `)
    .limit(limit);

  if (error) {
    console.error('Error fetching all user progress:', error);
    return [];
  }

  return data || [];
}

export async function getUserProgressSummary(userId: string) {
  // Get all module completions
  const completions = await getAllModuleCompletions(userId);
  
  // Get all skills
  const skills = await getUserSkills(userId);
  
  // Get recent activity
  const activities = await getUserActivities(userId, 10);
  
  // Calculate summary statistics
  const totalModules = completions.length;
  const completedModules = completions.filter(m => m.completed).length;
  const completionPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
  
  const averageScore = completions
    .filter(m => m.score !== null && m.score !== undefined)
    .reduce((sum, m) => sum + (m.score || 0), 0) / 
    completions.filter(m => m.score !== null && m.score !== undefined).length || 0;
  
  return {
    totalModules,
    completedModules,
    completionPercentage,
    averageScore,
    skills,
    recentActivities: activities
  };
}
