import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  icon,
  fullWidth = false,
  ariaLabel,
  ...props
}, ref) => {
  const handleClick = (event) => {
    if (loading || disabled) return;
    onClick?.(event);
  };

  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    loading && 'btn-loading',
    fullWidth && 'btn-full-width',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={loading}
      aria-disabled={disabled}
      {...props}
    >
      {loading && (
        <span className="btn-spinner" role="status" aria-hidden="true">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
        </span>
      )}
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-content">{children}</span>
      <span className="btn-ripple" />
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  icon: PropTypes.node,
  fullWidth: PropTypes.bool,
  ariaLabel: PropTypes.string,
}; 