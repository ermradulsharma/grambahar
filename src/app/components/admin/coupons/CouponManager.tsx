'use client';

import { useState, useEffect } from 'react';
import { Table, Button, Modal, Badge, Input, SearchInput, Card } from '@/components/ui';
import { Plus, Tag, Percent, IndianRupee, Truck, Trash2, CheckCircle2, Clock } from 'lucide-react';
import {
    getMockCoupons,
    saveMockCoupon,
    toggleMockCoupon,
    deleteMockCoupon,
    AdminCoupon
} from '@/core/Helpers';
import styles from '@/components/admin/admin.module.css';

export default function CouponManager() {
    const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'percentage' | 'flat' | 'shipping'>('all');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    // New Coupon State
    const [newCoupon, setNewCoupon] = useState<Partial<AdminCoupon>>({
        code: '',
        discountType: 'percentage',
        value: 15,
        minOrderAmount: 499,
        maxDiscount: 200,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        usageLimit: 500,
        isActive: true
    });

    const refreshData = () => {
        setCoupons(getMockCoupons());
    };

    useEffect(() => {
        refreshData();
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ store: string }>;
            if (ce.detail?.store === 'coupons') {
                refreshData();
            }
        };
        window.addEventListener('gb_mock_store_update', handler);
        return () => window.removeEventListener('gb_mock_store_update', handler);
    }, []);

    const showToast = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleCreateCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCoupon.code?.trim()) return;

        const couponToSave: AdminCoupon = {
            id: `CPN-${Date.now().toString().slice(-4)}`,
            code: newCoupon.code.trim().toUpperCase(),
            discountType: newCoupon.discountType || 'percentage',
            value: Number(newCoupon.value) || 0,
            minOrderAmount: Number(newCoupon.minOrderAmount) || 0,
            maxDiscount: newCoupon.discountType === 'percentage' ? (Number(newCoupon.maxDiscount) || undefined) : undefined,
            expiryDate: newCoupon.expiryDate || '2026-12-31',
            usageLimit: Number(newCoupon.usageLimit) || 100,
            usedCount: 0,
            isActive: newCoupon.isActive ?? true
        };

        saveMockCoupon(couponToSave);
        setIsCreateModalOpen(false);
        showToast(`Coupon "${couponToSave.code}" created successfully!`);
        setNewCoupon({
            code: '',
            discountType: 'percentage',
            value: 15,
            minOrderAmount: 499,
            maxDiscount: 200,
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            usageLimit: 500,
            isActive: true
        });
        refreshData();
    };

    const handleToggleStatus = (id: string, code: string) => {
        toggleMockCoupon(id);
        showToast(`Status updated for coupon "${code}"`);
        refreshData();
    };

    const handleDelete = (id: string, code: string) => {
        if (confirm(`Are you sure you want to delete coupon "${code}"?`)) {
            deleteMockCoupon(id);
            showToast(`Coupon "${code}" deleted`);
            refreshData();
        }
    };

    // Filter coupons
    const filteredCoupons = coupons.filter(c => {
        const matchesSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === 'all' || c.discountType === typeFilter;
        return matchesSearch && matchesType;
    });

    const activeCount = coupons.filter(c => c.isActive).length;
    const totalRedemptions = coupons.reduce((acc, c) => acc + c.usedCount, 0);

    const headers = ['Code', 'Discount Value', 'Min Order', 'Redemptions', 'Expires On', 'Status', 'Actions'];

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h2 className={styles.sectionHeading}>Discounts & Coupons</h2>
                    <p className={styles.sectionSubheading}>Create, schedule, and track promotional promo codes and seasonal discounts</p>
                </div>
                <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Plus size={16} /> Create Coupon
                    </span>
                </Button>
            </div>

            {/* Notification Toast */}
            {notification && (
                <div style={{
                    padding: '12px 18px',
                    borderRadius: '8px',
                    background: 'var(--primary-dark)',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px',
                    boxShadow: 'var(--shadow-soft)'
                }}>
                    <CheckCircle2 size={18} />
                    {notification}
                </div>
            )}

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <Card style={{ padding: '18px 20px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Promo Codes</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--foreground)', marginTop: '4px' }}>{activeCount}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>Available on storefront checkout</div>
                </Card>

                <Card style={{ padding: '18px 20px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Redemptions</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary)', marginTop: '4px' }}>{totalRedemptions}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>Customer checkouts applied</div>
                </Card>

                <Card style={{ padding: '18px 20px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Campaign Status</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                        <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />
                        <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--foreground)' }}>Live Promotion</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>Winter Patali Season 2026</div>
                </Card>
            </div>

            {/* Controls Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ width: '300px' }}>
                    <SearchInput
                        placeholder="Search promo codes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    {(['all', 'percentage', 'flat', 'shipping'] as const).map(type => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setTypeFilter(type)}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '6px',
                                border: '1px solid var(--border-light)',
                                background: typeFilter === type ? 'var(--primary-dark)' : 'var(--surface)',
                                color: typeFilter === type ? '#ffffff' : 'var(--foreground)',
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Coupons Table */}
            <Card style={{ border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                <Table headers={headers}>
                    {filteredCoupons.length === 0 ? (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: 'var(--slate-400)', fontSize: '0.875rem' }}>
                                No coupons found matching your query.
                            </td>
                        </tr>
                    ) : (
                        filteredCoupons.map((coupon) => (
                            <tr key={coupon.id} className={styles.tableRow}>
                                <td className={styles.tableCell}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Tag size={16} color="var(--primary)" />
                                        <span style={{ fontWeight: '700', letterSpacing: '0.04em', color: 'var(--foreground)' }}>
                                            {coupon.code}
                                        </span>
                                    </div>
                                </td>
                                <td className={styles.tableCell}>
                                    {coupon.discountType === 'percentage' && (
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                                            <Percent size={14} /> {coupon.value}% Off {coupon.maxDiscount ? `(up to ₹${coupon.maxDiscount})` : ''}
                                        </span>
                                    )}
                                    {coupon.discountType === 'flat' && (
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                                            <IndianRupee size={14} /> Flat ₹{coupon.value} Off
                                        </span>
                                    )}
                                    {coupon.discountType === 'shipping' && (
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600', color: '#16a34a' }}>
                                            <Truck size={14} /> Free Shipping
                                        </span>
                                    )}
                                </td>
                                <td className={styles.tableCell} style={{ color: 'var(--slate-600)', fontWeight: '500' }}>
                                    ₹ {coupon.minOrderAmount}
                                </td>
                                <td className={styles.tableCell}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontWeight: '600', color: 'var(--foreground)' }}>{coupon.usedCount}</span>
                                        <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem' }}>/ {coupon.usageLimit}</span>
                                    </div>
                                    <div style={{
                                        width: '80px',
                                        height: '4px',
                                        background: 'var(--bg-light)',
                                        borderRadius: '2px',
                                        marginTop: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${Math.min(100, (coupon.usedCount / coupon.usageLimit) * 100)}%`,
                                            height: '100%',
                                            background: 'var(--primary)'
                                        }} />
                                    </div>
                                </td>
                                <td className={styles.tableCell} style={{ color: 'var(--slate-500)', fontSize: '0.8125rem' }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                        <Clock size={13} /> {coupon.expiryDate}
                                    </span>
                                </td>
                                <td className={styles.tableCell}>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleStatus(coupon.id, coupon.code)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: 0
                                        }}
                                        title="Click to toggle status"
                                    >
                                        <Badge variant={coupon.isActive ? 'success' : 'neutral'}>
                                            {coupon.isActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </button>
                                </td>
                                <td className={styles.tableCell} style={{ textAlign: 'right' }}>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(coupon.id, coupon.code)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#ef4444',
                                            padding: '6px'
                                        }}
                                        title="Delete Coupon"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </Table>
            </Card>

            {/* Create Coupon Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create Promotional Coupon">
                <form onSubmit={handleCreateCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '6px' }}>
                            Promo Code *
                        </label>
                        <Input
                            placeholder="e.g. FESTIVE25, GUR100"
                            value={newCoupon.code || ''}
                            onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '6px' }}>
                                Discount Type
                            </label>
                            <select
                                value={newCoupon.discountType}
                                onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as AdminCoupon['discountType'] })}
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-light)',
                                    background: 'var(--surface)',
                                    color: 'var(--foreground)',
                                    fontSize: '0.875rem'
                                }}
                            >
                                <option value="percentage">Percentage (%) Off</option>
                                <option value="flat">Flat Amount (₹) Off</option>
                                <option value="shipping">Free Shipping</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '6px' }}>
                                Value {newCoupon.discountType === 'percentage' ? '(%)' : '(₹)'}
                            </label>
                            <Input
                                type="number"
                                placeholder={newCoupon.discountType === 'percentage' ? '15' : '100'}
                                value={newCoupon.value || ''}
                                onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                                disabled={newCoupon.discountType === 'shipping'}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '6px' }}>
                                Min Order Value (₹)
                            </label>
                            <Input
                                type="number"
                                placeholder="499"
                                value={newCoupon.minOrderAmount || ''}
                                onChange={(e) => setNewCoupon({ ...newCoupon, minOrderAmount: Number(e.target.value) })}
                            />
                        </div>

                        {newCoupon.discountType === 'percentage' && (
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '6px' }}>
                                    Max Discount Cap (₹)
                                </label>
                                <Input
                                    type="number"
                                    placeholder="200"
                                    value={newCoupon.maxDiscount || ''}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscount: Number(e.target.value) })}
                                />
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '6px' }}>
                                Expiry Date
                            </label>
                            <Input
                                type="date"
                                value={newCoupon.expiryDate || ''}
                                onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '6px' }}>
                                Total Usage Limit
                            </label>
                            <Input
                                type="number"
                                placeholder="500"
                                value={newCoupon.usageLimit || ''}
                                onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                        <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Save & Activate
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
