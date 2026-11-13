import React from 'react';
import { Search } from 'lucide-react';
import Input from './Input';

export default function SearchInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div style={{ position: 'relative', width: '280px' }}>
      <span style={{
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--slate-400)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <Search size={15} />
      </span>
      <Input
        {...props}
        style={{
          paddingLeft: '36px',
          paddingTop: '8px',
          paddingBottom: '8px',
          fontSize: '0.8125rem',
          ...props.style
        }}
        placeholder={props.placeholder || "Search..."}
      />
    </div>
  );
}
