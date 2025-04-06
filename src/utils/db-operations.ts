import { supabase } from './supabase';

// User profile operations
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
  
  return data;
}

// Course operations
export async function getAllCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('id');
  
  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
  
  return data || [];
}

export async function getCourseById(courseId: number) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();
  
  if (error) {
    console.error(`Error fetching course with ID ${courseId}:`, error);
    return null;
  }
  
  return data;
}

export async function getCourseWithModules(courseId: number) {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      modules:modules(
        *,
        lessons:lessons(*)
      )
    `)
    .eq('id', courseId)
    .single();
  
  if (error) {
    console.error(`Error fetching course with modules for ID ${courseId}:`, error);
    return null;
  }
  
  return data;
}

// User progress operations
export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select(`
      *,
      lesson:lessons(
        *,
        module:modules(
          *,
          course:courses(*)
        )
      )
    `)
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching user progress:', error);
    return [];
  }
  
  return data || [];
}

export async function updateLessonProgress(userId: string, lessonId: number, completed: boolean) {
  // Check if progress record exists
  const { data: existingProgress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single();
  
  if (existingProgress) {
    // Update existing record
    const { data, error } = await supabase
      .from('user_progress')
      .update({
        completed,
        last_accessed: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating lesson progress:', error);
      return null;
    }
    
    return data;
  } else {
    // Create new record
    const { data, error } = await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        lesson_id: lessonId,
        completed,
        last_accessed: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating lesson progress:', error);
      return null;
    }
    
    return data;
  }
}

// Calculate user course progress
export async function calculateCourseProgress(userId: string, courseId: number) {
  // Get all lessons for the course
  const { data: courseLessons, error: courseLessonsError } = await supabase
    .from('lessons')
    .select('id, modules!inner(course_id)')
    .eq('modules.course_id', courseId);
  
  if (courseLessonsError || !courseLessons) {
    console.error('Error fetching course lessons:', courseLessonsError);
    return { completed: 0, total: 0, percentage: 0 };
  }
  
  // Get completed lessons for the user
  const { data: userProgress, error: userProgressError } = await supabase
    .from('user_progress')
    .select('lesson_id, completed')
    .eq('user_id', userId)
    .in('lesson_id', courseLessons.map(lesson => lesson.id))
    .eq('completed', true);
  
  if (userProgressError) {
    console.error('Error fetching user progress:', userProgressError);
    return { completed: 0, total: 0, percentage: 0 };
  }
  
  const totalLessons = courseLessons.length;
  const completedLessons = userProgress?.length || 0;
  const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  
  return {
    completed: completedLessons,
    total: totalLessons,
    percentage
  };
}
