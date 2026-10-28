import React from 'react';
import './Progress.scss';

export interface ProgressProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Progress({ size = 'md', className = '' }: ProgressProps) {
  return (
    <div
      role="progressbar"
      aria-label="로딩 중"
      className={`ui-progress ui-progress--${size} ${className}`.trim()}
    />
  );
}

export default Progress;
