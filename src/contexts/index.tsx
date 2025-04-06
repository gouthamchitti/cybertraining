import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';

export * from './AuthContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
