/**
 * Utility functions for handling errors consistently across the application
 */

/**
 * Log errors only in development environment
 * @param message Error message
 * @param error Error object
 */
export const logError = (message: string, error?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, error);
  }
};

/**
 * Log warnings only in development environment
 * @param message Warning message
 * @param warning Warning object
 */
export const logWarning = (message: string, warning?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(message, warning);
  }
};

/**
 * Handle API errors consistently
 * @param error Error object
 * @param fallbackMessage Fallback message if error doesn't have a message
 * @returns Error message
 */
export const handleApiError = (error: any, fallbackMessage = 'An error occurred'): string => {
  logError('API Error:', error);
  
  if (error?.message) {
    return error.message;
  }
  
  return fallbackMessage;
};

/**
 * Check if a user is authenticated
 * @param user User object
 * @returns Boolean indicating if user is authenticated
 */
export const isAuthenticated = (user: any): boolean => {
  return !!user;
};
