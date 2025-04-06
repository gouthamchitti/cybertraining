import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  user: null;
  loading: boolean;
  signIn: () => Promise<{ success: boolean }>;
  signOut: () => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Simplified auth provider that doesn't actually do authentication
  const authValue: AuthContextType = {
    user: null,
    loading: false,
    signIn: async () => ({ success: false }),
    signOut: async () => {}
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
