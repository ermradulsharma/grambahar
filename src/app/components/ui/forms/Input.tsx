import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, style, ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--foreground)', letterSpacing: '-0.01em' }}>
          {label}
        </label>
      )}
      <input
        style={{
          padding: '9px 12px',
          borderRadius: '8px',
          border: error ? '1px solid #dc2626' : '1px solid var(--border-medium)',
          fontSize: '0.875rem',
          outline: 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          backgroundColor: 'var(--surface)',
          color: 'var(--foreground)',
          width: '100%',
          fontFamily: 'inherit',
          ...style
        }}
        {...props}
      />
      {error && <span style={{ fontSize: '0.75rem', color: '#dc2626' }}>{error}</span>}
    </div>
  );
}
