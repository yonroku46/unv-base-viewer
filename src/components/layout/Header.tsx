'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useHeaderVisibility } from '@/common/hooks/useHeaderVisibility';
import { config } from '@/config';
import { useAppDispatch, useAppSelector } from '@/store';
import { AuthService } from '@/api/service/AuthService';
import AuthDialog from '@/components/dialog/AuthDialog';
import Button from '@/components/ui/Button/Button';
import './Header.scss';

export default function Header() {
  const { isHeaderVisible } = useHeaderVisibility();
  const dispatch = useAppDispatch();
  const authService = AuthService(dispatch);
  const { enqueueSnackbar } = useSnackbar();

  const { currentUser, isAuthenticated } = useAppSelector((state) => state.auth);
  const [authDialogOpen, setAuthDialogOpen] = useState<boolean>(false);

  const handleOpenAuthDialog = () => {
    setAuthDialogOpen(true);
  };

  const handleCloseAuthDialog = () => {
    setAuthDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      enqueueSnackbar('로그아웃되었습니다.', { variant: 'info' });
    } catch {
      enqueueSnackbar('로그아웃 처리 중 오류가 발생했습니다.', { variant: 'error' });
    }
  };

  const displayName = currentUser?.name || currentUser?.userName || currentUser?.email || '사용자';

  return (
    <>
      <header className={`app-header ${!isHeaderVisible ? 'hidden' : ''}`}>
        <div className="header-inner">
          <Link href="/" className="brand">
            <span>{config.service.name}</span>
          </Link>
          <nav className="nav-links">
            <Link href="/">홈</Link>
            <Link href="/about">소개</Link>

            {isAuthenticated ? (
              <div className="user-profile-badge">
                <div className="user-avatar" title={displayName}>
                  {displayName.charAt(0)}
                </div>
                <span className="user-name">{displayName}</span>
                <Button
                  variant="outlined"
                  size="sm"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={handleOpenAuthDialog}
              >
                로그인
              </Button>
            )}
          </nav>
        </div>
      </header>

      <AuthDialog
        open={authDialogOpen}
        onClose={handleCloseAuthDialog}
      />
    </>
  );
}
