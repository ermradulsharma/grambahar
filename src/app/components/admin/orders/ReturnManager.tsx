'use client';

import React from 'react';
import { Table, Badge, SearchInput } from '@/components/ui';
import styles from '@/components/admin/admin.module.css';

export default function ReturnManager() {
    const returns = [
        { id: '#RET-501', order: '#GB-1002', reason: 'Damaged Packaging', status: 'Processing' },
        { id: '#RET-502', order: '#GB-980', reason: 'Wrong Product Sent', status: 'Refunded' },
    ];

    return (
        <div style={{ marginTop: '8px', animation: 'fadeIn 0.3s ease-in-out' }}>
            <div className={styles.sectionHeader}>
                <div>
                    <h2 className={styles.sectionHeading}>Returns & Refund Management</h2>
                    <p className={styles.sectionSubheading}>Handle transit damages, replacement dispatches, and customer reimbursements</p>
                </div>
                <SearchInput placeholder="Search return ID, Order..." />
            </div>

            <Table headers={['Return ID', 'Original Order', 'Reason', 'Status', 'Action']}>
                {returns.map((r, i) => (
                    <tr key={i}>
                        <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{r.id}</td>
                        <td style={{ fontWeight: 500 }}>{r.order}</td>
                        <td style={{ color: 'var(--slate-600)' }}>{r.reason}</td>
                        <td>
                            <Badge variant={r.status === 'Refunded' ? 'success' : 'warning'}>
                                {r.status}
                            </Badge>
                        </td>
                        <td>
                            <button
                                style={{
                                    color: 'var(--primary)',
                                    cursor: 'pointer',
                                    background: 'none',
                                    border: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.8125rem'
                                }}
                            >
                                Inspect
                            </button>
                        </td>
                    </tr>
                ))}
            </Table>

            {returns.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--slate-400)' }}>
                    No pending returns found.
                </div>
            )}
        </div>
    );
}
