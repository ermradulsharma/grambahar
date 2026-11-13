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
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--bg-light)',
            padding: '4px',
            borderRadius: '10px',
            marginBottom: '28px',
            border: '1px solid var(--border-light)'
        }}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onChange(tab.id)}
                        style={{
                            padding: '8px 16px',
                            background: isActive ? 'var(--surface)' : 'transparent',
                            border: 'none',
                            borderRadius: '7px',
                            color: isActive ? 'var(--foreground)' : 'var(--slate-500)',
                            fontWeight: isActive ? 600 : 500,
                            cursor: 'pointer',
                            fontSize: '0.8125rem',
                            letterSpacing: '-0.01em',
                            transition: 'all 0.15s ease',
                            boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                        }}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
