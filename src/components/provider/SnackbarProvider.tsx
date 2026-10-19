'use client';

import { forwardRef } from 'react';
import { SnackbarProvider as NotistackSnackbarProvider, useSnackbar } from 'notistack';
import Alert, { AlertColor } from '@mui/material/Alert';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

const CustomSnackbar = forwardRef<HTMLDivElement, {
  id: string | number;
  message: string;
  variant: AlertColor | 'default';
}>(({ id, message, variant }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const variantIcon = {
    default: <InfoIcon />,
    success: <CheckCircleIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    info: <InfoIcon />,
  }[variant] || <InfoIcon />;

  return (
    <Alert
      ref={ref}
      variant="filled"
      severity={variant === 'default' ? 'info' : (variant as AlertColor)}
      onClick={() => closeSnackbar(id)}
      sx={{
        cursor: 'pointer',
        borderRadius: '0.75rem',
        fontSize: '0.95rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      }}
      icon={variantIcon}
    >
      {message}
    </Alert>
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
