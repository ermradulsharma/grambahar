import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'neutral' | 'primary';
}

export default function Badge({ children, variant = 'neutral' }: BadgeProps) {
  const getStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'inline-block',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    };

    switch (variant) {
      case 'success': return { ...base, background: '#e8f5e9', color: '#2e7d32' };
      case 'warning': return { ...base, background: '#fff8e1', color: '#f57f17' };
      case 'error': return { ...base, background: '#ffebee', color: '#c62828' };
      case 'primary': return { ...base, background: 'var(--surface)', color: 'var(--primary)' };
      default: return { ...base, background: '#f5f5f5', color: '#616161' };
    }
  };

  return <span style={getStyles()}>{children}</span>;
}
