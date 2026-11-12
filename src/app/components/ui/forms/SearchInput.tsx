import React from 'react';
import Input from './Input';

export default function SearchInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <span style={{
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 0.5,
        fontSize: '1rem',
        zIndex: 1
      }}>
        🔍
      </span>
      <Input
        {...props}
        style={{
          paddingLeft: '40px',
          ...props.style
        }}
        placeholder={props.placeholder || "Search..."}
      />
    </div>
  );
}
