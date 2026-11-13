'use client';

import React from 'react';
import { ArrowLeft, Printer, Truck, CreditCard, User, Package, MapPin, Phone, Mail } from 'lucide-react';
import { Card, Button, Badge, Table } from '@/components/ui';

interface OrderDetailsProps {
    orderId: string;
    onBack: () => void;
}

export default function OrderDetails({ orderId, onBack }: OrderDetailsProps) {
    // Mock Data based on ID
    const order = {
        id: orderId,
        date: 'Feb 01, 2026',
        status: 'Paid',
        total: '₹ 499',
        paymentMethod: 'UPI',
        items: [
            { id: 1, name: 'Premium Patali Gur', variant: '500g', price: '₹ 499', qty: 1, total: '₹ 499' }
        ],
        customer: {
            name: 'Rahul Sharma',
            email: 'rahul.sharma@example.com',
            phone: '+91 98765 43210'
        },
        shippingAddress: {
            line1: '12/4, Bose Pukur Road',
            city: 'Kolkata',
            state: 'West Bengal',
            zip: '700042'
        }
    };

    return (
        <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Button variant="outline" onClick={onBack} style={{ padding: '8px 12px' }}>
                        <ArrowLeft size={18} /> Back
                    </Button>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--foreground)', marginBottom: '4px' }}>
                            Order {orderId}
                        </h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: 'var(--slate-500)' }}>
                            <span>Placed on {order.date}</span>
                            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }}></span>
                            <Badge variant="success">{order.status}</Badge>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Button variant="outline" onClick={() => alert('Printing Invoice...')} style={{ gap: '8px' }}>
                        <Printer size={16} /> Print Invoice
                    </Button>
                    <Button onClick={() => alert('Dispatching...')} style={{ gap: '8px' }}>
                        <Truck size={16} /> Dispatch Order
                    </Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px' }}>
                {/* Left Column: Order Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <Card padding="0">
                        <div style={{ padding: '20px 25px', borderBottom: '1px solid var(--border-light)' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Package size={20} className="text-slate-400" /> Order Items
                            </h3>
                        </div>
                        <Table headers={['Product Details', 'Price', 'Quantity', 'Total']}>
                            {order.items.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: '600', color: 'var(--foreground)' }}>{item.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>Variant: {item.variant}</div>
                                        </div>
                                    </td>
                                    <td>{item.price}</td>
                                    <td>{item.qty}</td>
                                    <td style={{ fontWeight: '600' }}>{item.total}</td>
                                </tr>
                            ))}
                        </Table>
                        <div style={{ padding: '20px 25px', borderTop: '1px solid var(--border-light)', background: 'var(--surface)' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '40px' }}>
                                <div style={{ textAlign: 'right', color: 'var(--slate-500)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <span>Subtotal:</span>
                                    <span>Shipping:</span>
                                    <span>Tax:</span>
                                    <span style={{ fontWeight: '700', color: 'var(--foreground)', fontSize: '1.1rem', marginTop: '8px' }}>Total Paid:</span>
                                </div>
                                <div style={{ textAlign: 'right', fontWeight: '600', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <span>{order.total}</span>
                                    <span>Free</span>
                                    <span>₹ 0.00</span>
                                    <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1.1rem', marginTop: '8px' }}>{order.total}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column: Customer & Payment */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    {/* Customer Info */}
                    <Card padding="25px">
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <User size={18} className="text-slate-400" /> Customer Details
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--foreground)', fontWeight: '500' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: '700' }}>
                                    {order.customer.name.charAt(0)}
                                </div>
                                {order.customer.name}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--slate-500)' }}>
                                <Mail size={14} /> {order.customer.email}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--slate-500)' }}>
                                <Phone size={14} /> {order.customer.phone}
                            </div>
                        </div>
                    </Card>

                    {/* Shipping Address */}
                    <Card padding="25px">
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MapPin size={18} className="text-slate-400" /> Shipping Address
                        </h3>
                        <address style={{ fontStyle: 'normal', color: 'var(--slate-600)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            {order.shippingAddress.line1}<br />
                            {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                            <strong>PIN: {order.shippingAddress.zip}</strong>
                        </address>
                    </Card>

                    {/* Payment Info */}
                    <Card padding="25px">
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CreditCard size={18} className="text-slate-400" /> Payment Info
                        </h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                            <span style={{ color: 'var(--slate-500)' }}>Method:</span>
                            <span style={{ fontWeight: '600' }}>{order.paymentMethod}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', marginTop: '8px' }}>
                            <span style={{ color: 'var(--slate-500)' }}>Status:</span>
                            <Badge variant="success">Paid</Badge>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
