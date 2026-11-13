'use client';

import React from 'react';
import { Card, MiniChart } from '@/components/ui';
import styles from '@/components/admin/admin.module.css';

export default function AnalyticsView() {
    const metrics = [
        { label: 'Total Page Views', value: '12,402', change: '+14.2%', trend: [1000, 1500, 1200, 2000, 2500, 2200, 12402] },
        { label: 'Store Conversion Rate', value: '3.2%', change: '+0.4%', trend: [2.1, 2.5, 2.8, 3.0, 3.1, 3.2] },
        { label: 'Avg. Order Value', value: '₹ 840', change: '+8.1%', trend: [700, 750, 800, 820, 810, 840] },
        { label: 'Cart Abandonment Rate', value: '42%', change: '-3.5%', trend: [50, 48, 45, 44, 43, 42] },
    ];

    return (
        <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            <div className={styles.sectionHeader} style={{ marginBottom: '20px' }}>
                <div>
                    <h2 className={styles.sectionHeading}>Real-Time Traffic Analytics</h2>
                    <p className={styles.sectionSubheading}>Live store visitors, conversion funnel, and regional demand metrics</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                {metrics.map((m, i) => (
                    <Card key={i} padding="22px">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                                    {m.label}
                                </span>
                                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--foreground)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                                    {m.value}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.8125rem', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                                    {m.change} ↑
                                </span>
                                <div style={{ marginTop: '8px' }}>
                                    <MiniChart data={m.trend} color="#10b981" />
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card padding="24px">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '16px' }}>
                    Top Traffic Channels
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                        { source: 'Direct Search & Bookmarks', val: '45%' },
                        { source: 'Organic Google Search (Patali Gur)', val: '30%' },
                        { source: 'Instagram & Facebook Posts', val: '15%' },
                        { source: 'Word of Mouth / WhatsApp Referral', val: '10%' }
                    ].map((s, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ width: '240px', fontSize: '0.8125rem', color: 'var(--foreground)', fontWeight: 500 }}>
                                {s.source}
                            </span>
                            <div style={{ flex: 1, height: '8px', background: 'var(--bg-light)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: s.val, background: 'var(--primary)', borderRadius: '4px' }}></div>
                            </div>
                            <span style={{ width: '45px', fontSize: '0.8125rem', fontWeight: 600, textAlign: 'right', color: 'var(--foreground)' }}>
                                {s.val}
                            </span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
