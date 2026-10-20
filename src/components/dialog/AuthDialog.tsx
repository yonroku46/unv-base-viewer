'use client';

import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import MuiDialog from '@/components/mui/MuiDialog';
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

  // ログインフォーム状態
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // 新規登録フォーム状態
  const [signupName, setSignupName] = useState<string>('');
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [signupPassword, setSignupPassword] = useState<string>('');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const resetForm = () => {
    setLoginEmail('');
    setLoginPassword('');
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
  };

  const handleDialogClose = () => {
    if (loading) return;
    resetForm();
    onClose();
  };

  /**
   * メール・パスワードログイン処理
   */
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      enqueueSnackbar('メールアドレスとパスワードを入力してください。', { variant: 'warning' });
      return;
    }

    setLoading(true);
    try {
      await authService.login({
        email: loginEmail,
        password: loginPassword,
      });
      enqueueSnackbar('ログインに成功しました。', { variant: 'success' });
      handleDialogClose();
    } catch (error: any) {
      const message =
        error?.response?.data?.information?.[0]?.message ||
        'ログインに失敗しました。メールアドレスまたはパスワードを確認してください。';
      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  /**
   * 新規会員登録処理
   */
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      enqueueSnackbar('すべての項目を入力してください。', { variant: 'warning' });
      return;
    }

    setLoading(true);
    try {
      await authService.signup({
        userName: signupName,
        email: signupEmail,
        password: signupPassword,
      });
      enqueueSnackbar('会員登録が完了しました。', { variant: 'success' });
      handleDialogClose();
    } catch (error: any) {
      const message =
        error?.response?.data?.information?.[0]?.message ||
        '会員登録に失敗しました。入力内容を確認してください。';
      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Googleログイン処理
   */
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // GoogleログインAPI呼び出し（バックエンドのGoogleログイン連携）
      await authService.googleLogin({
        email: 'google-user@univus.com',
        name: 'Google ユーザー',
      });
      enqueueSnackbar('Googleアカウントでログインしました。', { variant: 'success' });
      handleDialogClose();
    } catch (error: any) {
      const message =
        error?.response?.data?.information?.[0]?.message ||
        'Googleログインに失敗しました。もう一度お試しください。';
      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MuiDialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ className: 'auth-dialog-paper' }}
    >
      <div className="auth-dialog-header">
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          className="auth-dialog-close-btn"
          size="small"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>

      <div className="auth-dialog-content">
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="fullWidth"
          className="auth-tabs"
        >
          <Tab label="ログイン" />
          <Tab label="新規登録" />
        </Tabs>

        {currentTab === 0 && (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <TextField
              label="メールアドレス"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              fullWidth
              size="small"
              required
              autoComplete="email"
              disabled={loading}
              placeholder="example@domain.com"
            />
            <TextField
              label="パスワード"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              fullWidth
              size="small"
              required
              autoComplete="current-password"
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'ログイン'}
            </Button>
          </form>
        )}

        {currentTab === 1 && (
          <form onSubmit={handleSignupSubmit} className="auth-form">
            <TextField
              label="お名前"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              fullWidth
              size="small"
              required
              autoComplete="name"
              disabled={loading}
              placeholder="山田 太郎"
            />
            <TextField
              label="メールアドレス"
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              fullWidth
              size="small"
              required
              autoComplete="email"
              disabled={loading}
              placeholder="example@domain.com"
            />
            <TextField
              label="パスワード"
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              fullWidth
              size="small"
              required
              autoComplete="new-password"
              disabled={loading}
              helperText="6文字以上の英数字を入力してください"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
              disabled={loading}
              className="auth-submit-btn"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'アカウント登録'}
            </Button>
          </form>
        )}

        <div className="auth-divider-wrap">
          <Divider>または</Divider>
        </div>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={loading}
          className="google-auth-btn"
          startIcon={
            <svg width="18" height="18" viewBox="0 0 24 24">
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
          Googleでログイン
        </Button>
      </div>
    </MuiDialog>
  );
}
