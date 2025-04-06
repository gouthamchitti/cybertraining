'use client';

import { ReactNode } from 'react';
import { AppProviders } from '@/contexts';

export default function Providers({ children }: { children: ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
