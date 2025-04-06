// Session management utility for client-side session handling

// Session storage keys
const SESSION_KEY = 'cybertrainer_session';
const SESSION_EXPIRY_KEY = 'cybertrainer_session_expiry';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Session data interface
interface SessionData {
  userId?: string;
  username?: string;
  email?: string;
  isLoggedIn: boolean;
  lastActivity: number;
  [key: string]: any; // Allow for additional properties
}

// Create a new session
export const createSession = (data: Partial<SessionData>): void => {
  const now = Date.now();
  const sessionData: SessionData = {
    isLoggedIn: false,
    lastActivity: now,
    ...data
  };
  
  // Store session data
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    localStorage.setItem(SESSION_EXPIRY_KEY, (now + SESSION_DURATION).toString());
  }
};

// Get current session
export const getSession = (): SessionData | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const sessionData = localStorage.getItem(SESSION_KEY);
  const expiryTime = localStorage.getItem(SESSION_EXPIRY_KEY);
  
  if (!sessionData || !expiryTime) {
    return null;
  }
  
  // Check if session has expired
  if (Date.now() > parseInt(expiryTime, 10)) {
    clearSession();
    return null;
  }
  
  // Update last activity time
  const parsedData: SessionData = JSON.parse(sessionData);
  parsedData.lastActivity = Date.now();
  localStorage.setItem(SESSION_KEY, JSON.stringify(parsedData));
  
  return parsedData;
};

// Update session data
export const updateSession = (data: Partial<SessionData>): void => {
  const currentSession = getSession();
  
  if (!currentSession) {
    createSession(data);
    return;
  }
  
  const updatedSession = {
    ...currentSession,
    ...data,
    lastActivity: Date.now()
  };
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
  }
};

// Clear session
export const clearSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_EXPIRY_KEY);
  }
};

// Check if user is logged in
export const isLoggedIn = (): boolean => {
  const session = getSession();
  return !!session?.isLoggedIn;
};

// Extend session duration
export const extendSession = (): void => {
  if (typeof window !== 'undefined') {
    const now = Date.now();
    localStorage.setItem(SESSION_EXPIRY_KEY, (now + SESSION_DURATION).toString());
  }
};

// Get a specific session value
export const getSessionValue = (key: string): any => {
  const session = getSession();
  return session ? session[key] : null;
};

// Set a specific session value
export const setSessionValue = (key: string, value: any): void => {
  const session = getSession();
  
  if (session) {
    session[key] = value;
    updateSession(session);
  } else {
    const newSession: SessionData = {
      isLoggedIn: false,
      lastActivity: Date.now(),
      [key]: value
    };
    createSession(newSession);
  }
};

export default {
  createSession,
  getSession,
  updateSession,
  clearSession,
  isLoggedIn,
  extendSession,
  getSessionValue,
  setSessionValue
};
