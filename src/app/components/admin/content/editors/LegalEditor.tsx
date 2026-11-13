'use client';

import React, { useState, useEffect } from 'react';
import { Button, Card } from '@/components/ui';
import { Save, CheckCircle2, ShieldCheck } from 'lucide-react';
import { getMockContent, updateMockContent } from '@/core/Helpers';

type PolicyKey = 'privacy' | 'returns' | 'refunds' | 'shipping' | 'terms';

export default function LegalEditor() {
    const [legal, setLegal] = useState(() => getMockContent('legal'));
    const [selectedPolicy, setSelectedPolicy] = useState<PolicyKey>('privacy');
    const [savedNotice, setSavedNotice] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ store: string }>;
            if (ce.detail?.store === 'content') {
                setLegal(getMockContent('legal'));
            }
        };
        window.addEventListener('gb_mock_store_update', handler);
        return () => window.removeEventListener('gb_mock_store_update', handler);
    }, []);

    const policies: { key: PolicyKey; label: string }[] = [
        { key: 'privacy', label: 'Privacy Policy' },
        { key: 'returns', label: 'Return Policy' },
        { key: 'refunds', label: 'Refund Policy' },
        { key: 'shipping', label: 'Shipping Policy' },
        { key: 'terms', label: 'Terms of Service' },
    ];

    const handleSave = () => {
        updateMockContent('legal', legal);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2000);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
                        Legal & Compliance Policies
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                        Maintain customer trust with clear return rules, shipping SLA, and privacy guarantees
                    </p>
                </div>
                {savedNotice && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#10b981', fontWeight: 600 }}>
                        <CheckCircle2 size={16} /> Policy Updated!
                    </span>
                )}
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {policies.map(p => (
                    <button
                        key={p.key}
                        type="button"
                        onClick={() => setSelectedPolicy(p.key)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: '1px solid',
                            borderColor: selectedPolicy === p.key ? 'var(--primary)' : 'var(--border-medium)',
                            background: selectedPolicy === p.key ? 'var(--primary)' : 'var(--surface)',
                            color: selectedPolicy === p.key ? '#ffffff' : 'var(--foreground)',
                            cursor: 'pointer',
                            fontSize: '0.8125rem',
                            fontWeight: selectedPolicy === p.key ? 600 : 500,
                            transition: 'all 0.15s ease'
                        }}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--foreground)', marginBottom: '8px' }}>
                        Edit Policy Content (Markdown / Text)
                    </label>
                    <textarea
                        rows={10}
                        value={legal[selectedPolicy]}
                        onChange={e => setLegal({ ...legal, [selectedPolicy]: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '14px',
                            borderRadius: '10px',
                            border: '1px solid var(--border-medium)',
                            background: 'var(--surface)',
                            color: 'var(--foreground)',
                            fontFamily: 'inherit',
                            fontSize: '0.875rem',
                            lineHeight: 1.6
                        }}
                    />
                    <div style={{ marginTop: '14px' }}>
                        <Button onClick={handleSave} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <Save size={16} /> Save Policy Changes
                        </Button>
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-500)', marginBottom: '8px' }}>
                        Customer View Preview
                    </label>
                    <Card padding="20px" style={{ background: 'var(--bg-light)', minHeight: '260px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '12px' }}>
                            <ShieldCheck size={18} />
                            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>
                                {policies.find(p => p.key === selectedPolicy)?.label}
                            </h4>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--foreground)', lineHeight: 1.7, margin: 0 }}>
                            {legal[selectedPolicy]}
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}

