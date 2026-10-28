'use client';

import React, { useEffect, useCallback, ReactNode, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import './Dialog.scss';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  maxWidth = 'md',
  fullWidth = true,
  showCloseButton = true,
  className = '',
}: DialogProps) {
  // ESC 키 입력 시 닫기
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // 브라우저 뒤로가기 (popstate) 안전 처리
  useEffect(() => {
    if (!open) return;

    window.history.pushState({ dialog: true }, '');

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    // 배경 스크롤 방지
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose, handleKeyDown]);

  if (!open || typeof window === 'undefined') {
    return null;
  }

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const paperClass = [
    'ui-dialog-paper',
    `ui-dialog-paper--${maxWidth}`,
    fullWidth ? 'ui-dialog-paper--full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <div className="ui-dialog-root" role="dialog" aria-modal="true">
      <div className="ui-dialog-backdrop" onClick={handleBackdropClick} />
      <div className={paperClass} tabIndex={-1}>
        {(title || showCloseButton) && (
          <div className="ui-dialog-header">
            {typeof title === 'string' ? <h2>{title}</h2> : title || <span />}
            {showCloseButton && (
              <button
                type="button"
                className="ui-dialog-close"
                onClick={onClose}
                aria-label="닫기"
              >
                ✕
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}

export function DialogContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`ui-dialog-content ${className}`.trim()}>{children}</div>;
}

export function DialogActions({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`ui-dialog-actions ${className}`.trim()}>{children}</div>;
}

export default Dialog;
