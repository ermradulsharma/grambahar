'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  value?: string;
}

export default function Dropdown({ label, options, onSelect, value }: DropdownProps) {
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

  const activeOption = options.find(opt => opt.value === value);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '8px 14px',
          borderRadius: '8px',
          background: 'var(--surface)',
          border: '1px solid var(--border-medium)',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 500,
          fontSize: '0.8125rem',
          color: 'var(--foreground)',
          transition: 'all 0.15s ease'
        }}
      >
        <span>{activeOption ? activeOption.label : label}</span>
        <ChevronDown
          size={14}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            color: 'var(--slate-500)'
          }}
        />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          background: 'var(--surface)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-soft)',
          borderRadius: '8px',
          zIndex: 50,
          minWidth: '160px',
          overflow: 'hidden',
          padding: '4px'
        }}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: '6px',
                border: 'none',
                background: option.value === value ? 'var(--bg-light)' : 'transparent',
                color: 'var(--foreground)',
                fontSize: '0.8125rem',
                fontWeight: option.value === value ? 600 : 400,
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = option.value === value ? 'var(--bg-light)' : 'transparent')}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
