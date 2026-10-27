import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      startIcon,
      endIcon,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const classNames = [
      'ui-button',
      `ui-button--${variant}`,
      `ui-button--${size}`,
      fullWidth ? 'ui-button--full-width' : '',
      loading || disabled ? 'ui-button--disabled' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className="ui-button__spinner" aria-hidden="true" />}
        {!loading && startIcon && (
          <span className="ui-button__icon ui-button__icon--start">{startIcon}</span>
        )}
        <span>{children}</span>
        {!loading && endIcon && (
          <span className="ui-button__icon ui-button__icon--end">{endIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
