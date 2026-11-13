'use client';

import React, { useState, useEffect } from 'react';
import { Table, Badge, SearchInput, Button, Modal } from '@/components/ui';
import { RefreshCw, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import { getMockReturns, processReturnStatus, ReturnRecord } from '@/core/Helpers';
import styles from '@/components/admin/admin.module.css';

export default function ReturnManager() {
    const [returns, setReturns] = useState<ReturnRecord[]>([]);
    const [selectedReturn, setSelectedReturn] = useState<ReturnRecord | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [actionNotice, setActionNotice] = useState<string | null>(null);

    const refreshReturns = () => {
        setReturns(getMockReturns());
    };

    useEffect(() => {
        refreshReturns();
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ store: string }>;
            if (ce.detail?.store === 'returns') {
                refreshReturns();
            }
        };
        window.addEventListener('gb_mock_store_update', handler);
        return () => window.removeEventListener('gb_mock_store_update', handler);
    }, []);

    const handleAction = (returnId: string, action: 'Approved' | 'Refunded' | 'Rejected', restock = false) => {
        const ok = processReturnStatus(returnId, action, restock);
        if (ok) {
            refreshReturns();
            setSelectedReturn(null);
            setActionNotice(`Return ${returnId} marked as ${action}${restock ? ' (Inventory Stock Restocked)' : ''}!`);
            setTimeout(() => setActionNotice(null), 3500);
        }
    };

    const filtered = returns.filter(r =>
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ marginTop: '8px', animation: 'fadeIn 0.3s ease-in-out' }}>
            <div className={styles.sectionHeader}>
                <div>
                    <h2 className={styles.sectionHeading}>Returns & Refund Management</h2>
                    <p className={styles.sectionSubheading}>
                        Process transit damages, replacements, refund vouchers, and inventory restock
                    </p>
                </div>
                <SearchInput
                    placeholder="Search return ID, Order..."
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
            </div>

            {actionNotice && (
                <div style={{
                    padding: '12px 16px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#059669',
                    borderRadius: '8px',
                    marginBottom: '18px',
                    fontSize: '0.8125rem',
                    fontWeight: 600
                }}>
                    {actionNotice}
                </div>
            )}

            <Table headers={['Return ID', 'Order Ref', 'Customer', 'Reason', 'Amount', 'Status', 'Restocked?', 'Action']}>
                {filtered.map((r) => (
                    <tr key={r.id}>
                        <td style={{ fontWeight: 600, color: 'var(--primary)', fontFamily: 'monospace' }}>{r.id}</td>
                        <td style={{ fontWeight: 500 }}>{r.orderId}</td>
                        <td style={{ fontWeight: 500 }}>{r.customer}</td>
                        <td style={{ color: 'var(--slate-600)', fontSize: '0.8125rem' }}>{r.reason}</td>
                        <td style={{ fontWeight: 600 }}>{r.amount}</td>
                        <td>
                            <Badge variant={r.status === 'Refunded' ? 'success' : (r.status === 'Approved' ? 'primary' : 'warning')}>
                                {r.status}
                            </Badge>
                        </td>
                        <td>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: r.restocked ? '#10b981' : 'var(--slate-400)' }}>
                                {r.restocked ? '✓ Yes' : '✗ No'}
                            </span>
                        </td>
                        <td>
                            <button
                                onClick={() => setSelectedReturn(r)}
                                style={{
                                    color: 'var(--primary)',
                                    cursor: 'pointer',
                                    background: 'none',
                                    border: 'none',
                                    fontWeight: 600,
                                    fontSize: '0.8125rem'
                                }}
                            >
                                Process
                            </button>
                        </td>
                    </tr>
                ))}
            </Table>

            {/* Process Return Modal */}
            <Modal
                isOpen={Boolean(selectedReturn)}
                onClose={() => setSelectedReturn(null)}
                title={`Process Return: ${selectedReturn?.id || ''}`}
            >
                {selectedReturn && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.875rem' }}>
                        <div style={{ padding: '12px', background: 'var(--bg-light)', borderRadius: '8px' }}>
                            <div>Order Ref: <strong>{selectedReturn.orderId}</strong> ({selectedReturn.customer})</div>
                            <div style={{ marginTop: '4px' }}>Claimed Reason: <em>{selectedReturn.reason}</em></div>
                            <div style={{ marginTop: '4px' }}>Refund Amount: <strong>{selectedReturn.amount}</strong></div>
                            <div style={{ marginTop: '4px' }}>Current Status: <Badge variant="warning">{selectedReturn.status}</Badge></div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Button
                                onClick={() => handleAction(selectedReturn.id, 'Approved', true)}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <RotateCcw size={16} /> Approve & Restock Inventory (+1 Unit)
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={() => handleAction(selectedReturn.id, 'Refunded', false)}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <CheckCircle2 size={16} color="#10b981" /> Issue Refund without Restock
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => handleAction(selectedReturn.id, 'Rejected', false)}
                                style={{ color: '#ef4444', borderColor: '#fca5a5' }}
                            >
                                Reject Return Claim
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
