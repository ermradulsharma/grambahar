'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from '@/components/ui';
import { Save, Eye, CheckCircle2, Sparkles } from 'lucide-react';
import { getMockContent, updateMockContent } from '@/core/Helpers';

export default function HeroEditor() {
    const [hero, setHero] = useState(() => getMockContent('hero'));
    const [savedNotice, setSavedNotice] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ store: string }>;
            if (ce.detail?.store === 'content') {
                setHero(getMockContent('hero'));
            }
        };
        window.addEventListener('gb_mock_store_update', handler);
        return () => window.removeEventListener('gb_mock_store_update', handler);
    }, []);

    const handleSave = () => {
        updateMockContent('hero', hero);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2500);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
            {/* Editor Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
                        Hero Banner Settings
                    </h3>
                    {savedNotice && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#10b981', fontWeight: 600 }}>
                            <CheckCircle2 size={16} /> Saved to Store!
                        </span>
                    )}
                </div>

                <Input
                    label="Announcement Top Banner"
                    value={hero.announcement}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHero({ ...hero, announcement: e.target.value })}
                    placeholder="e.g. ✈️ Free Pan-India Delivery on all Orders!"
                />

                <Input
                    label="Main Hero Title"
                    value={hero.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHero({ ...hero, title: e.target.value })}
                    placeholder="e.g. Authentic Taste of Nature"
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--foreground)' }}>
                        Hero Subtitle / Description
                    </label>
                    <textarea
                        rows={3}
                        value={hero.subtitle}
                        onChange={e => setHero({ ...hero, subtitle: e.target.value })}
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <Input
                        label="Primary CTA Label"
                        value={hero.ctaLabel}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHero({ ...hero, ctaLabel: e.target.value })}
                        placeholder="Explore Products"
                    />
                    <Input
                        label="CTA Target Link"
                        value={hero.ctaLink}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHero({ ...hero, ctaLink: e.target.value })}
                        placeholder="#products"
                    />
                </div>

                <div style={{ marginTop: '8px' }}>
                    <Button onClick={handleSave} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <Save size={16} /> Save Hero Changes
                    </Button>
                </div>
            </div>

            {/* Live Visual Card Preview */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--slate-500)', fontSize: '0.8125rem', fontWeight: 600 }}>
                    <Eye size={15} /> Live Storefront Preview
                </div>
                <Card padding="28px" style={{ background: 'linear-gradient(145deg, var(--surface), var(--bg-light))' }}>
                    {hero.announcement && (
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'rgba(212, 175, 55, 0.15)',
                            color: 'var(--primary)',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            marginBottom: '16px'
                        }}>
                            <Sparkles size={13} /> {hero.announcement}
                        </div>
                    )}
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: 'var(--primary-dark)',
                        lineHeight: 1.25,
                        marginBottom: '12px'
                    }}>
                        {hero.title}
                    </h2>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--slate-600)',
                        lineHeight: 1.6,
                        marginBottom: '20px'
                    }}>
                        {hero.subtitle}
                    </p>
                    <a
                        href={hero.ctaLink}
                        style={{
                            display: 'inline-block',
                            background: 'var(--primary)',
                            color: '#ffffff',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            textDecoration: 'none'
                        }}
                    >
                        {hero.ctaLabel} →
                    </a>
                </Card>
            </div>
        </div>
    );
}

