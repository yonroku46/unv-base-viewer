'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useSnackbar } from 'notistack';
import { useHeaderVisibility } from '@/common/hooks/useHeaderVisibility';
import { config } from '@/config';
import { useAppDispatch, useAppSelector } from '@/store';
import { AuthService } from '@/api/service/AuthService';
import AuthDialog from '@/components/dialog/AuthDialog';
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
      enqueueSnackbar('ログアウトしました。', { variant: 'info' });
    } catch {
      enqueueSnackbar('ログアウト処理中にエラーが発生しました。', { variant: 'error' });
    }
  };

  const displayName = currentUser?.name || currentUser?.userName || currentUser?.email || 'ユーザー';

  return (
    <>
      <header className={`app-header ${!isHeaderVisible ? 'hidden' : ''}`}>
        <div className="header-inner">
          <Link href="/" className="brand">
            <span>{config.service.name}</span>
          </Link>
          <nav className="nav-links">
            <Link href="/">ホーム</Link>
            <Link href="/about">概要</Link>

            {isAuthenticated ? (
              <div className="user-profile-badge">
                <Avatar
                  className="user-avatar"
                  src={currentUser?.picture}
                  alt={displayName}
                  sx={{ width: 30, height: 30, fontSize: '0.85rem' }}
                >
                  {displayName.charAt(0)}
                </Avatar>
                <span className="user-name">{displayName}</span>
                <Button
                  variant="outlined"
                  size="small"
                  color="inherit"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  ログアウト
                </Button>
              </div>
            ) : (
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={handleOpenAuthDialog}
              >
                ログイン
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
