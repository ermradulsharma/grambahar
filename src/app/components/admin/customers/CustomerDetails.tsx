'use client';

import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, ShoppingBag, ShieldBan, UserCheck } from 'lucide-react';
import { Card, Button, Badge, Table } from '@/components/ui';
import styles from '@/components/admin/admin.module.css';

interface CustomerDetailsProps {
    customerId: string;
    onBack: () => void;
}

export default function CustomerDetails({ customerId, onBack }: CustomerDetailsProps) {
    // Mock Data based on ID
    const customer = {
        id: customerId,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '+91 98765 43210',
        joinDate: 'Jan 15, 2025',
        status: 'Active',
        lifetimeValue: '₹ 12,450',
        totalOrders: 15,
        avgOrderValue: '₹ 830',
        address: {
            line1: '12/4, Bose Pukur Road',
            city: 'Kolkata',
            state: 'West Bengal',
            zip: '700042'
        },
        orders: [
            { id: '#GB-1001', date: 'Feb 01, 2026', items: 2, total: '₹ 499', status: 'Paid' },
            { id: '#GB-0982', date: 'Jan 20, 2026', items: 1, total: '₹ 850', status: 'Delivered' },
            { id: '#GB-0950', date: 'Jan 05, 2026', items: 5, total: '₹ 2,100', status: 'Delivered' }
        ]
    };

    return (
        <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            {/* Header */}
            <div className={styles.sectionHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Button variant="outline" onClick={onBack} style={{ padding: '8px 12px' }}>
                        <ArrowLeft size={16} /> Back
                    </Button>
                    <div>
                        <h2 className={styles.sectionHeading}>
                            Customer Profile
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                            <span>Member since {customer.joinDate}</span>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--border-medium)' }}></span>
                            <Badge variant="success">{customer.status}</Badge>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="outline" onClick={() => alert('Blocking Customer...')} style={{ gap: '8px', borderColor: 'var(--border-medium)', color: '#dc2626' }}>
                        <ShieldBan size={16} /> Block User
                    </Button>
                    <Button onClick={() => alert('Saving Changes...')} style={{ gap: '8px' }}>
                        <UserCheck size={16} /> Update Profile
                    </Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '25px' }}>
                {/* Left Column: Profile Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <Card padding="30px">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '15px' }}>
                                {customer.name.charAt(0)}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--foreground)' }}>{customer.name}</h3>
                            <span style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>Customer ID: {customerId}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--slate-600)', fontSize: '0.9rem' }}>
                                <Mail size={16} className="text-slate-400" /> {customer.email}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--slate-600)', fontSize: '0.9rem' }}>
                                <Phone size={16} className="text-slate-400" /> {customer.phone}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--slate-600)', fontSize: '0.9rem' }}>
                                <MapPin size={16} className="text-slate-400" style={{ marginTop: '2px' }} />
                                <span>
                                    {customer.address.line1}<br />
                                    {customer.address.city}, {customer.address.state} - {customer.address.zip}
                                </span>
                            </div>
                        </div>
                    </Card>

                    <Card padding="25px">
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '15px' }}>Insights</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>Lifetime Spent</span>
                            <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{customer.lifetimeValue}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>Total Orders</span>
                            <span style={{ fontWeight: '600' }}>{customer.totalOrders}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>Avg. Order Value</span>
                            <span style={{ fontWeight: '600' }}>{customer.avgOrderValue}</span>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Order History */}
                <div>
                    <Card padding="0">
                        <div style={{ padding: '20px 25px', borderBottom: '1px solid var(--border-light)' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <ShoppingBag size={20} className="text-slate-400" /> Order History
                            </h3>
                        </div>
                        <Table headers={['Order ID', 'Date', 'Items', 'Total', 'Status']}>
                            {customer.orders.map((order) => (
                                <tr key={order.id}>
                                    <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{order.id}</td>
                                    <td style={{ color: 'var(--slate-500)' }}>{order.date}</td>
                                    <td>{order.items} Items</td>
                                    <td style={{ fontWeight: '500' }}>{order.total}</td>
                                    <td><Badge variant={order.status === 'Paid' || order.status === 'Delivered' ? 'success' : 'warning'}>{order.status}</Badge></td>
                                </tr>
                            ))}
                        </Table>
                    </Card>
                </div>
            </div>
        </div>
    );
}
