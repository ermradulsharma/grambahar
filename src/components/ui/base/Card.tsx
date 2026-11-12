import React from 'react';

interface CardProps {
    children: React.ReactNode;
    padding?: string;
    style?: React.CSSProperties;
}

export default function Card({ children, padding = '24px', style }: CardProps) {
    return (
        <div style={{
            background: 'var(--surface)',
            padding: padding,
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            border: '1px solid var(--border-light)',
            height: '100%',
            ...style
        }}>
            {children}
        </div>
    );
}
