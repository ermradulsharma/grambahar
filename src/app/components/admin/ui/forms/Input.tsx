import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, style, ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--foreground)' }}>{label}</label>}
      <input
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          border: error ? '1px solid #dc2626' : '1px solid var(--border-medium)',
          fontSize: '0.9rem',
          outline: 'none',
          transition: 'border-color 0.2s ease',
          backgroundColor: 'var(--surface)',
          color: 'var(--foreground)',
          width: '100%',
          ...style
        }}
        {...props}
      />
      {error && <span style={{ fontSize: '0.8rem', color: '#dc2626' }}>{error}</span>}
    </div>
  );
}
