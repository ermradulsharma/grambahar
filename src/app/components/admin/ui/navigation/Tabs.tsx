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
            gap: '4px',
            background: 'var(--slate-100)',
            padding: '4px',
            borderRadius: '10px',
            marginBottom: '32px',
            width: 'fit-content'
        }}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    style={{
                        padding: '8px 16px',
                        background: activeTab === tab.id ? 'var(--surface)' : 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        color: activeTab === tab.id ? 'var(--foreground)' : 'var(--slate-500)',
                        fontWeight: activeTab === tab.id ? '600' : '500',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        transition: 'all 0.15s ease',
                        boxShadow: activeTab === tab.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                    }}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
