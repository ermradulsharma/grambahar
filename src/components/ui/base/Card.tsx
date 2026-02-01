import React from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: string;
  style?: React.CSSProperties;
}

export default function Card({ children, padding = '24px', style }: CardProps) {
  return (
    <div style={{
      background: 'var(--white)',
      padding: padding,
      borderRadius: '16px',
      boxShadow: 'var(--shadow-soft)',
      borderBottom: '3px solid var(--secondary)',
      height: '100%',
      ...style
    }}>
      {children}
    </div>
  );
}
