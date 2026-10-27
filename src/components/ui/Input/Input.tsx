import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import './Input.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error = false, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

    const wrapperClass = [
      'ui-input-wrapper',
      error ? 'ui-input-wrapper--error' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClass}>
        {label && (
          <label htmlFor={inputId} className="ui-input-label">
            {label}
          </label>
        )}
        <div className="ui-input-container">
          <input ref={ref} id={inputId} className="ui-input-field" {...props} />
        </div>
        {helperText && <span className="ui-input-helper">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
