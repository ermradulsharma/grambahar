'use client';

import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      borderBottom: '1px solid #e0e0e0',
      marginBottom: '20px',
      padding: '0 10px'
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          style={{
            padding: '12px 20px',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === tab.id ? '3px solid var(--secondary)' : '3px solid transparent',
            color: activeTab === tab.id ? 'var(--primary-dark)' : '#666',
            fontWeight: activeTab === tab.id ? '600' : '400',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            marginBottom: '-1px'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
