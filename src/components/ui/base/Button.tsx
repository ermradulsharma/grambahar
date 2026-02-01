import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, style, ...props }: ButtonProps) {
  const getStyles = () => {
    const baseStyle: React.CSSProperties = {
      padding: '10px 24px',
      borderRadius: '50px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'var(--transition)',
      border: 'none',
      fontSize: '0.9rem',
      ...style
    };

    switch (variant) {
      case 'primary':
        return { ...baseStyle, background: 'var(--primary)', color: 'var(--white)' };
      case 'secondary':
        return { ...baseStyle, background: 'var(--secondary)', color: 'var(--primary-dark)' };
      case 'outline':
        return { ...baseStyle, background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' };
      default:
        return baseStyle;
    }
  };

  return (
    <button style={getStyles()} {...props}>
      {children}
    </button>
  );
}
