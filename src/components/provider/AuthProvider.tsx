'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { AuthService } from '@/api/service/AuthService';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 초기 로딩 시 인증 상태 점검 또는 필요한 토큰 갱신 로직 수행 가능
    const auth = AuthService(dispatch);
    const currentUser = auth.getCurrentUser();
    if (currentUser?.refreshToken) {
      // 필요 시 토큰 유효성 확인 가능
    }
  }, [dispatch]);

  return <>{children}</>;
}
