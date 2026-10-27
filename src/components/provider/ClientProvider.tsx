'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from '@/app/loading';
import { ThemeProvider } from '@/components/provider/ThemeProvider';
import { HeaderVisibilityProvider } from '@/common/hooks/useHeaderVisibility';

const ReduxProvider = dynamic(() => import('@/store/ReduxProvider'), { ssr: false });
const SnackbarProvider = dynamic(() => import('@/components/provider/SnackbarProvider'), { ssr: false });
const AuthProvider = dynamic(() => import('@/components/provider/AuthProvider'), { ssr: false });

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <SnackbarProvider>
        <ThemeProvider>
          <ReduxProvider>
            <AuthProvider>
              <HeaderVisibilityProvider>
                {children}
              </HeaderVisibilityProvider>
            </AuthProvider>
          </ReduxProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </Suspense>
  );
}
