import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, style, ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      {label && <label style={{ fontSize: '0.9rem', fontWeight: '500', color: 'var(--primary-dark)' }}>{label}</label>}
      <input
        style={{
          padding: '12px 16px',
          borderRadius: '10px',
          border: error ? '1.5px solid #c62828' : '1.5px solid #e0e0e0',
          fontSize: '1rem',
          outline: 'none',
          transition: 'var(--transition)',
          backgroundColor: '#fff',
          ...style
        }}
        {...props}
      />
      {error && <span style={{ fontSize: '0.8rem', color: '#c62828' }}>{error}</span>}
    </div>
  );
}
