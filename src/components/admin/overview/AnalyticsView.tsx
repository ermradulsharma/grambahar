'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('../../ui/base/Card'));
const MiniChart = dynamic(() => import('../../ui/data/MiniChart'));

export default function AnalyticsView() {
    const metrics = [
        { label: 'Page Views', value: '12,402', trend: [1000, 1500, 1200, 2000, 2500, 2200, 12402] },
        { label: 'Conversion Rate', value: '3.2%', trend: [2.1, 2.5, 2.8, 3.0, 3.1, 3.2] },
        { label: 'Avg. Order Value', value: '₹ 840', trend: [700, 750, 800, 820, 810, 840] },
        { label: 'Bounce Rate', value: '42%', trend: [50, 48, 45, 44, 43, 42] },
    ];

    return (
        <div style={{ padding: '20px 0' }}>
            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Real-time Website Analytics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {metrics.map((m, i) => (
                    <Card key={i} padding="25px">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '8px' }}>{m.label}</p>
                                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-dark)' }}>{m.value}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ color: 'var(--nature-green)', fontWeight: '600', fontSize: '0.9rem' }}>+12% ↑</p>
                                <MiniChart data={m.trend} color="var(--nature-green)" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card padding="30px" style={{ marginTop: '20px' }}>
                <h4 style={{ marginBottom: '15px' }}>Top Traffic Sources</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                        { source: 'Direct', val: '45%' },
                        { source: 'Google Search', val: '30%' },
                        { source: 'Social Media', val: '15%' },
                        { source: 'Referral', val: '10%' }
                    ].map((s, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ width: '120px', fontSize: '0.9rem' }}>{s.source}</span>
                            <div style={{ flex: 1, height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: s.val, background: 'var(--primary)' }}></div>
                            </div>
                            <span style={{ width: '40px', fontSize: '0.85rem', fontWeight: '600' }}>{s.val}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
