'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Download } from 'lucide-react';

const Card = dynamic(() => import('../../ui/base/Card'));
const Button = dynamic(() => import('../../ui/base/Button'));
const Table = dynamic(() => import('../../ui/data/Table'));

export default function ReportsView() {
    const reports = [
        { month: 'January 2026', sales: '₹ 1,24,500', orders: 156, status: 'Generated' },
        { month: 'December 2025', sales: '₹ 98,200', orders: 120, status: 'Archived' },
        { month: 'November 2025', sales: '₹ 1,12,000', orders: 142, status: 'Archived' },
    ];

    return (
        <div style={{ padding: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3 style={{ color: 'var(--foreground)' }}>Sales & Financial Reports</h3>
                <Button variant="outline" style={{ fontSize: '0.8rem' }}>Export All Data (CSV)</Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <Card padding="25px">
                    <h4>Monthly Target</h4>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginTop: '10px' }}>
                        <span style={{ fontSize: '2rem', fontWeight: '700' }}>85%</span>
                        <span style={{ paddingBottom: '5px', color: '#666' }}>of ₹ 1,50,000 goal</span>
                    </div>
                    <div style={{ height: '10px', width: '100%', background: '#eee', borderRadius: '5px', marginTop: '15px' }}>
                        <div style={{ height: '100%', width: '85%', background: 'var(--secondary)', borderRadius: '5px' }}></div>
                    </div>
                </Card>

                <Card padding="25px">
                    <h4>Best Selling Region</h4>
                    <div style={{ marginTop: '15px' }}>
                        <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary-dark)' }}>West Bengal</p>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>65% of total sales this month</p>
                    </div>
                </Card>
            </div>

            <Table headers={['Billing Cycle', 'Total Revenue', 'Order Volume', 'Action']}>
                {reports.map((r, i) => (
                    <tr key={i}>
                        <td>{r.month}</td>
                        <td style={{ fontWeight: '600' }}>{r.sales}</td>
                        <td>{r.orders}</td>
                        <td>
                            <button
                                onClick={() => alert(`Downloading report for ${r.month}...`)}
                                title="Download PDF"
                                style={{ color: 'var(--slate-500)', cursor: 'pointer', border: 'none', background: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                onMouseOut={(e) => e.currentTarget.style.color = 'var(--slate-500)'}
                            >
                                <Download size={18} />
                            </button>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    );
}
