'use client';

import React from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import { Card, Button, Table } from '@/components/ui';
import styles from '@/components/admin/admin.module.css';

export default function ReportsView() {
    const reports = [
        { month: 'January 2026', sales: '₹ 1,24,500', orders: 156, status: 'Generated' },
        { month: 'December 2025', sales: '₹ 98,200', orders: 120, status: 'Archived' },
        { month: 'November 2025', sales: '₹ 1,12,000', orders: 142, status: 'Archived' },
    ];

    return (
        <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            <div className={styles.sectionHeader}>
                <div>
                    <h2 className={styles.sectionHeading}>Sales & Financial Reports</h2>
                    <p className={styles.sectionSubheading}>Monthly revenue settlements, sales volume, and accounting ledger</p>
                </div>
                <Button variant="outline" style={{ fontSize: '0.8125rem' }}>
                    <FileSpreadsheet size={16} /> Export All Data (CSV)
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                <Card padding="20px">
                    <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontWeight: 600 }}>Monthly Revenue Target</span>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginTop: '10px' }}>
                        <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--foreground)', lineHeight: 1 }}>85%</span>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>of ₹ 1,50,000 goal</span>
                    </div>
                    <div style={{ height: '8px', width: '100%', background: 'var(--bg-light)', borderRadius: '4px', marginTop: '14px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '85%', background: 'var(--secondary)', borderRadius: '4px' }}></div>
                    </div>
                </Card>

                <Card padding="20px">
                    <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontWeight: 600 }}>Best Selling Region</span>
                    <div style={{ marginTop: '10px' }}>
                        <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>West Bengal & Kolkata</p>
                        <p style={{ color: 'var(--slate-500)', fontSize: '0.8125rem', marginTop: '4px' }}>65% of total orders placed pan-India</p>
                    </div>
                </Card>
            </div>

            <Table headers={['Billing Cycle', 'Total Revenue', 'Order Volume', 'Action']}>
                {reports.map((r, i) => (
                    <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{r.month}</td>
                        <td style={{ fontWeight: 600, color: 'var(--foreground)' }}>{r.sales}</td>
                        <td>{r.orders} orders</td>
                        <td>
                            <button
                                onClick={() => alert(`Downloading report for ${r.month}...`)}
                                title="Download PDF"
                                style={{
                                    color: 'var(--slate-500)',
                                    cursor: 'pointer',
                                    border: 'none',
                                    background: 'none',
                                    transition: 'color 0.2s',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.8125rem',
                                    fontWeight: 500
                                }}
                                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                onMouseOut={(e) => e.currentTarget.style.color = 'var(--slate-500)'}
                            >
                                <Download size={16} /> PDF
                            </button>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    );
}
