import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, style, ...props }: ButtonProps) {
    const getStyles = () => {
        const baseStyle: React.CSSProperties = {
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid transparent',
            fontSize: '0.875rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            ...style
        };

        switch (variant) {
            case 'primary':
                return {
                    ...baseStyle,
                    background: 'var(--primary)',
                    color: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                };
            case 'secondary':
                return {
                    ...baseStyle,
                    background: 'var(--slate-100)',
                    color: 'var(--slate-700)',
                    border: '1px solid var(--border-light)'
                };
            case 'outline':
                return {
                    ...baseStyle,
                    background: 'transparent',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--slate-600)'
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
