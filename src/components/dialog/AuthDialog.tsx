'use client';

import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Dialog, Button, Input } from '@/components/ui';
import { AuthService } from '@/api/service/AuthService';
import { useAppDispatch } from '@/store';
import './AuthDialog.scss';

export interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export default function AuthDialog({ open, onClose, defaultTab = 'login' }: AuthDialogProps) {
  const dispatch = useAppDispatch();
  const authService = AuthService(dispatch);
  const { enqueueSnackbar } = useSnackbar();

  const [currentTab, setCurrentTab] = useState<number>(defaultTab === 'signup' ? 1 : 0);
  const [loading, setLoading] = useState<boolean>(false);

  // 로그인 폼 상태
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // 회원가입 폼 상태
  const [signupName, setSignupName] = useState<string>('');
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [signupPassword, setSignupPassword] = useState<string>('');

  const resetForm = () => {
    setLoginEmail('');
    setLoginPassword('');
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
  };

  const handleDialogClose = () => {
    resetForm();
    onClose();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      enqueueSnackbar('이메일과 비밀번호를 입력해주세요.', { variant: 'warning' });
      return;
    }

    setLoading(true);
    try {
      await authService.login({
        email: loginEmail,
        password: loginPassword,
      });
      enqueueSnackbar('로그인되었습니다.', { variant: 'success' });
      handleDialogClose();
    } catch (error: any) {
      const message =
        error?.response?.data?.information?.[0]?.message ||
        '로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.';
      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      enqueueSnackbar('모든 항목을 입력해주세요.', { variant: 'warning' });
      return;
    }

    if (signupPassword.length < 6) {
      enqueueSnackbar('비밀번호는 6자 이상으로 입력해주세요.', { variant: 'warning' });
      return;
    }

    setLoading(true);
    try {
      await authService.signup({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });
      enqueueSnackbar('회원가입이 완료되었습니다.', { variant: 'success' });
      handleDialogClose();
    } catch (error: any) {
      const message =
        error?.response?.data?.information?.[0]?.message ||
        '회원가입에 실패했습니다. 이미 사용 중인 이메일일 수 있습니다.';
      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await authService.googleLogin({
        email: 'google-user@univus.com',
        name: 'Google 사용자',
      });
      enqueueSnackbar('Google 계정으로 로그인되었습니다.', { variant: 'success' });
      handleDialogClose();
    } catch (error: any) {
      const message =
        error?.response?.data?.information?.[0]?.message ||
        'Google 로그인에 실패했습니다. 다시 시도해주세요.';
      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="sm"
      className="auth-dialog-paper"
      showCloseButton={true}
    >
      <div className="auth-dialog-body">
        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={currentTab === 0}
            className={`auth-tab ${currentTab === 0 ? 'auth-tab--active' : ''}`}
            onClick={() => setCurrentTab(0)}
          >
            로그인
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={currentTab === 1}
            className={`auth-tab ${currentTab === 1 ? 'auth-tab--active' : ''}`}
            onClick={() => setCurrentTab(1)}
          >
            회원가입
          </button>
        </div>

        {currentTab === 0 && (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <Input
              label="이메일"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={loading}
              placeholder="example@domain.com"
            />
            <Input
              label="비밀번호"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={loading}
            />
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              loading={loading}
              className="auth-submit-btn"
            >
              로그인
            </Button>
          </form>
        )}

        {currentTab === 1 && (
          <form onSubmit={handleSignupSubmit} className="auth-form">
            <Input
              label="이름"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              required
              autoComplete="name"
              disabled={loading}
              placeholder="홍길동"
            />
            <Input
              label="이메일"
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={loading}
              placeholder="example@domain.com"
            />
            <Input
              label="비밀번호"
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
              autoComplete="new-password"
              disabled={loading}
              helperText="6자 이상의 영문/숫자를 입력해주세요"
            />
            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="md"
              loading={loading}
              className="auth-submit-btn"
            >
              회원가입
            </Button>
          </form>
        )}

        <div className="auth-divider">
          <span>또는</span>
        </div>

        <Button
          variant="outlined"
          fullWidth
          size="md"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="google-auth-btn"
          startIcon={
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          }
        >
          Google 계정으로 로그인
        </Button>
      </div>
    </Dialog>
  );
}
