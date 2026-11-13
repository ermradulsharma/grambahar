'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from '@/components/ui';
import { Save, CheckCircle2, HeartHandshake } from 'lucide-react';
import { getMockContent, updateMockContent } from '@/core/Helpers';

export default function AboutEditor() {
    const [about, setAbout] = useState(() => getMockContent('about'));
    const [savedNotice, setSavedNotice] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ store: string }>;
            if (ce.detail?.store === 'content') {
                setAbout(getMockContent('about'));
            }
        };
        window.addEventListener('gb_mock_store_update', handler);
        return () => window.removeEventListener('gb_mock_store_update', handler);
    }, []);

    const handleSave = () => {
        updateMockContent('about', about);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2000);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
                        About & Heritage Story
                    </h3>
                    {savedNotice && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#10b981', fontWeight: 600 }}>
                            <CheckCircle2 size={16} /> Saved!
                        </span>
                    )}
                </div>

                <Input
                    label="Badge / Subtitle"
                    value={about.subtitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAbout({ ...about, subtitle: e.target.value })}
                    placeholder="Our Heritage"
                />

                <Input
                    label="Main Heading"
                    value={about.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAbout({ ...about, title: e.target.value })}
                    placeholder="Preserving Bengal’s Authentic Date Palm Sweetness"
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--foreground)' }}>
                        Story Narrative
                    </label>
                    <textarea
                        rows={4}
                        value={about.text1}
                        onChange={e => setAbout({ ...about, text1: e.target.value })}
                        style={{
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-medium)',
                            background: 'var(--surface)',
                            color: 'var(--foreground)',
                            fontFamily: 'inherit',
                            fontSize: '0.875rem'
                        }}
                    />
                </div>

                <Input
                    label="Social Impact Statistics"
                    value={about.stats}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAbout({ ...about, stats: e.target.value })}
                    placeholder="200+ Farmer Families | 20,000+ Happy Customers"
                />

                <div>
                    <Button onClick={handleSave} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <Save size={16} /> Save About Story
                    </Button>
                </div>
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-500)', marginBottom: '8px' }}>
                    Storefront Section Preview
                </label>
                <Card padding="24px" style={{ background: 'var(--bg-light)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '8px' }}>
                        <HeartHandshake size={18} />
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {about.subtitle}
                        </span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '10px' }}>
                        {about.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: '16px' }}>
                        {about.text1}
                    </p>
                    <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'var(--surface)', border: '1px solid var(--border-light)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-dark)' }}>
                        🌱 {about.stats}
                    </div>
                </Card>
            </div>
        </div>
    );
}

