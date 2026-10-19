'use client';

import { useEffect, useCallback } from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';

export interface MuiDialogProps extends DialogProps {
  onClose?: () => void;
}

export default function MuiDialog({ open, onClose, children, ...props }: MuiDialogProps) {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const handlePopState = () => {
      handleClose();
    };

    window.history.pushState({ dialog: true }, '');
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [open, handleClose]);

  return (
    <Dialog open={open} onClose={handleClose} {...props}>
      {children}
    </Dialog>
  );
}
