import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'neutral' | 'primary';
}

export default function Badge({ children, variant = 'neutral' }: BadgeProps) {
    const getStyles = (): React.CSSProperties => {
        const base: React.CSSProperties = {
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.7rem',
            fontWeight: '700',
            display: 'inline-flex',
            alignItems: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            lineHeight: 1
        };

        switch (variant) {
            case 'success': return { ...base, background: 'rgba(16, 185, 129, 0.1)', color: '#059669', border: '1px solid rgba(16, 185, 129, 0.2)' }; // Emerald-600
            case 'warning': return { ...base, background: 'rgba(245, 158, 11, 0.1)', color: '#d97706', border: '1px solid rgba(245, 158, 11, 0.2)' }; // Amber-600
            case 'error': return { ...base, background: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: '1px solid rgba(239, 68, 68, 0.2)' }; // Red-600
            case 'primary': return { ...base, background: 'var(--slate-100)', color: 'var(--primary)', border: '1px solid var(--border-light)' };
            case 'neutral':
            default: return { ...base, background: 'var(--slate-100)', color: 'var(--slate-600)', border: '1px solid var(--border-light)' };
        }
    };

    return <span style={getStyles()}>{children}</span>;
}
