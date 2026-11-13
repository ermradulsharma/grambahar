'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, Truck, CheckCircle2, User, Package, MapPin, Phone, Mail } from 'lucide-react';
import { Card, Button, Badge, Table, Modal } from '@/components/ui';
import { getMockOrders, updateOrderStatus, AdminOrder } from '@/core/Helpers';
import styles from '@/components/admin/admin.module.css';

interface OrderDetailsProps {
    orderId: string;
    onBack: () => void;
}

export default function OrderDetails({ orderId, onBack }: OrderDetailsProps) {
    const [order, setOrder] = useState<AdminOrder | null>(null);
    const [actionNotice, setActionNotice] = useState<string | null>(null);
    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

    useEffect(() => {
        const orders = getMockOrders();
        const found = orders.find(o => o.id === orderId);
        if (found) {
            setOrder(found);
        }
    }, [orderId]);

    const handleUpdateStatus = (newStatus: AdminOrder['status'], msg: string) => {
        const res = updateOrderStatus(orderId, newStatus);
        if (res.success && res.order) {
            setOrder(res.order);
            setActionNotice(msg);
            setTimeout(() => setActionNotice(null), 3000);
        }
    };

    if (!order) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>Loading order details for {orderId}...</p>
                <Button variant="outline" onClick={onBack}>Go Back</Button>
            </div>
        );
    }

    return (
        <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            {/* Header */}
            <div className={styles.sectionHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Button variant="outline" onClick={onBack} style={{ padding: '8px 12px' }}>
                        <ArrowLeft size={16} /> Back to Fulfillment
                    </Button>
                    <div>
                        <h2 className={styles.sectionHeading}>
                            Order {orderId}
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                            <span>Placed on {order.date}</span>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--border-medium)' }}></span>
                            <Badge variant={order.status === 'Paid' ? 'success' : (order.status === 'Shipped' ? 'primary' : 'warning')}>
                                {order.status}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="outline" onClick={() => setIsInvoiceOpen(true)} style={{ gap: '8px' }}>
                        <Printer size={16} /> Print Invoice
                    </Button>
                    {order.status !== 'Shipped' && order.status !== 'Delivered' && (
                        <Button
                            onClick={() => handleUpdateStatus('Shipped', '🚚 Order marked as Shipped! Inventory stock deducted atomically.')}
                            style={{ gap: '8px' }}
                        >
                            <Truck size={16} /> Dispatch Order
                        </Button>
                    )}
                    {order.status === 'Shipped' && (
                        <Button
                            onClick={() => handleUpdateStatus('Delivered', '✅ Order marked as Delivered successfully!')}
                            style={{ gap: '8px', background: '#10b981' }}
                        >
                            <CheckCircle2 size={16} /> Mark as Delivered
                        </Button>
                    )}
                </div>
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                {/* Order Item Details */}
                <Card padding="24px">
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Package size={18} color="var(--primary)" /> Ordered Items
                    </h3>
                    <div style={{ padding: '14px', borderRadius: '8px', background: 'var(--bg-light)', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontWeight: 600, color: 'var(--foreground)' }}>{order.product}</span>
                            <span style={{ fontWeight: 700 }}>{order.amount}</span>
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                            Qty: 1 Unit • Handcrafted Batch • Free Pan-India Delivery
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '14px', fontSize: '0.875rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                            <span>Subtotal:</span>
                            <span>{order.amount}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                            <span>Shipping Fee:</span>
                            <span style={{ color: '#10b981', fontWeight: 600 }}>FREE</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', color: 'var(--foreground)', borderTop: '1px solid var(--border-light)', paddingTop: '8px' }}>
                            <span>Total Settlement:</span>
                            <span>{order.amount}</span>
                        </div>
                    </div>
                </Card>

                {/* Customer & Shipping Details */}
                <Card padding="24px">
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={18} color="var(--primary)" /> Buyer & Logistics
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Recipient Name</span>
                            <p style={{ margin: '2px 0 0', fontWeight: 600, color: 'var(--foreground)' }}>{order.customer}</p>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Delivery Address</span>
                            <p style={{ margin: '2px 0 0', color: 'var(--slate-600)' }}>
                                <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                Salt Lake Sector 5, Kolkata, West Bengal - 700091
                            </p>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Payment Method</span>
                            <p style={{ margin: '2px 0 0', color: 'var(--slate-600)' }}>
                                UPI / Online Pre-paid (Verified)
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Invoice Print Modal Mockup */}
            <Modal isOpen={isInvoiceOpen} onClose={() => setIsInvoiceOpen(false)} title={`Tax Invoice: ${orderId}`}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
                        <div>
                            <strong style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>GramBahar</strong>
                            <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: 'var(--slate-500)' }}>Ranaghat, Nadia, WB - 741201</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <Badge variant="success">PAID</Badge>
                            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: 'var(--slate-500)' }}>Date: {order.date}</p>
                        </div>
                    </div>

                    <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Billed To:</span>
                        <div style={{ fontWeight: 600 }}>{order.customer}</div>
                    </div>

                    <div style={{ border: '1px solid var(--border-light)', borderRadius: '8px', padding: '10px 12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                            <span>{order.product} (1x)</span>
                            <span>{order.amount}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                        <span>Total Paid (Inc. GST):</span>
                        <span>{order.amount}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <Button onClick={() => alert('Sending PDF to printer...')} style={{ flex: 1 }}>
                            <Printer size={16} /> Send to Printer
                        </Button>
                        <Button variant="outline" onClick={() => setIsInvoiceOpen(false)} style={{ flex: 1 }}>
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
