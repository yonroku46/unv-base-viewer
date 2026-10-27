'use client';

import React, { forwardRef } from 'react';
import { SnackbarProvider as NotistackSnackbarProvider, useSnackbar } from 'notistack';
import './SnackbarProvider.scss';

type AlertVariant = 'default' | 'error' | 'success' | 'warning' | 'info';

function AlertIcon({ variant }: { variant: AlertVariant }) {
  switch (variant) {
    case 'success':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <path d="m9 11 3 3L22 4" />
        </svg>
      );
    case 'error':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      );
    case 'warning':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case 'info':
    case 'default':
    default:
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      );
  }
}

const CustomSnackbar = forwardRef<
  HTMLDivElement,
  {
    id: string | number;
    message: string;
    variant: AlertVariant;
  }
>(({ id, message, variant }, ref) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <div
      ref={ref}
      role="alert"
      className={`ui-snackbar-alert ui-snackbar-alert--${variant}`}
      onClick={() => closeSnackbar(id)}
    >
      <span className="ui-snackbar-icon">
        <AlertIcon variant={variant} />
      </span>
      <span className="ui-snackbar-message">{message}</span>
    </div>
  );
});

CustomSnackbar.displayName = 'CustomSnackbar';

export default function SnackbarProvider({ children }: { children: React.ReactNode }) {
  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={3000}
      preventDuplicate={true}
      Components={{
        default: CustomSnackbar,
        error: CustomSnackbar,
        success: CustomSnackbar,
        warning: CustomSnackbar,
        info: CustomSnackbar,
      }}
    >
      {children}
    </NotistackSnackbarProvider>
  );
}
