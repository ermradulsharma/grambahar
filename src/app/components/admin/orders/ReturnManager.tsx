'use client';

import React from 'react';
import { Table, Badge, SearchInput } from '@/components/ui';

export default function ReturnManager() {
    const returns = [
        { id: '#RET-501', order: '#GB-1002', reason: 'Damaged Packaging', status: 'Processing' },
        { id: '#RET-502', order: '#GB-980', reason: 'Wrong Product Sent', status: 'Refunded' },
    ];

    return (
        <div style={{ padding: '20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h3 style={{ color: 'var(--primary)' }}>Returns & Refund Management</h3>
                <SearchInput placeholder="Search return ID..." style={{ width: '250px' }} />
            </div>

            <Table headers={['Return ID', 'Original Order', 'Reason', 'Status', 'Action']}>
                {returns.map((r, i) => (
                    <tr key={i}>
                        <td style={{ fontWeight: '600' }}>{r.id}</td>
                        <td>{r.order}</td>
                        <td>{r.reason}</td>
                        <td>
                            <Badge variant={r.status === 'Refunded' ? 'success' : 'warning'}>
                                {r.status}
                            </Badge>
                        </td>
                        <td>
                            <button style={{ color: 'var(--primary)', cursor: 'pointer', background: 'none', border: 'none' }}>
                                Inspect
                            </button>
                        </td>
                    </tr>
                ))}
            </Table>

            {returns.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>
                    No pending returns found.
                </div>
            )}
        </div>
    );
}
