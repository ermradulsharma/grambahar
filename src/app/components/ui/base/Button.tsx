import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, style, ...props }: ButtonProps) {
    const getStyles = () => {
        const baseStyle: React.CSSProperties = {
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid transparent',
            fontSize: '0.8125rem',
            letterSpacing: '-0.01em',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: 'inherit',
            ...style
        };

        switch (variant) {
            case 'primary':
                return {
                    ...baseStyle,
                    background: 'var(--primary)',
                    color: '#ffffff',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.08)'
                };
            case 'secondary':
                return {
                    ...baseStyle,
                    background: 'var(--bg-light)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border-light)'
                };
            case 'outline':
                return {
                    ...baseStyle,
                    background: 'transparent',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--foreground)'
                };
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
