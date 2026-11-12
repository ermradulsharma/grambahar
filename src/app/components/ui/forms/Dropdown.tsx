'use client';

import React, { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  label: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}

export default function Dropdown({ label, options, onSelect }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '10px 20px',
          borderRadius: '50px',
          background: 'var(--surface)',
          border: '1px solid #ddd',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '500'
        }}
      >
        {label} <span style={{ fontSize: '0.7rem' }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '110%',
          left: 0,
          background: '#fff',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          zIndex: 10,
          minWidth: '160px',
          overflow: 'hidden',
          padding: '8px'
        }}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
              style={{
                padding: '10px 15px',
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
