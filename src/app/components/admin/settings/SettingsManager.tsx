'use client';

import React, { useState, useEffect } from 'react';
import { Card, Input, Button } from '@/components/ui';
import styles from '@/components/admin/admin.module.css';
import { getMockSettings, updateMockSettings, AdminSettings } from '@/core/Helpers';

import {
    Save,
    Shield,
    Bell,
    ShoppingBag,
    Globe,
    CheckCircle2
} from 'lucide-react';

export default function SettingsManager() {
    const [settings, setSettings] = useState<AdminSettings>(getMockSettings);
    const [savedNotice, setSavedNotice] = useState(false);

    useEffect(() => {
        setSettings(getMockSettings());
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ store: string }>;
            if (ce.detail?.store === 'settings') {
                setSettings(getMockSettings());
            }
        };
        window.addEventListener('gb_mock_store_update', handler);
        return () => window.removeEventListener('gb_mock_store_update', handler);
    }, []);

    const handleSave = () => {
        updateMockSettings(settings);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
    };

    return (
        <div style={{ marginTop: '8px', paddingBottom: '40px', animation: 'fadeIn 0.3s ease-in-out' }}>
            <div className={styles.sectionHeader}>
                <div>
                    <h2 className={styles.sectionHeading}>Site Global Settings</h2>
                    <p className={styles.sectionSubheading}>Configure SEO, store pricing, notifications, and security protocols</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {savedNotice && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#10b981', fontWeight: 600 }}>
                            <CheckCircle2 size={16} /> Settings Saved!
                        </span>
                    )}
                    <Button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Save size={16} /> Save All Changes
                    </Button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
                {/* SEO & Meta */}
                <Card padding="24px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', color: 'var(--primary)' }}>
                        <Globe size={18} />
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)' }}>SEO & Meta Information</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Input
                            label="Site Title"
                            value={settings.siteTitle}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, siteTitle: e.target.value })}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--foreground)' }}>Meta Description</label>
                            <textarea
                                rows={3}
                                style={{
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-medium)',
                                    background: 'var(--surface)',
                                    color: 'var(--foreground)',
                                    fontFamily: 'inherit',
                                    fontSize: '0.875rem'
                                }}
                                value={settings.metaDescription}
                                onChange={e => setSettings({ ...settings, metaDescription: e.target.value })}
                            />
                        </div>
                        <Input
                            label="Keywords"
                            value={settings.keywords}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, keywords: e.target.value })}
                        />
                    </div>
                </Card>

                {/* Store Pricing Configuration */}
                <Card padding="24px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', color: 'var(--primary)' }}>
                        <ShoppingBag size={18} />
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)' }}>Store Pricing & Thresholds</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                            <Input
                                label="Standard Delivery Charge (₹)"
                                type="number"
                                value={settings.deliveryCharge}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, deliveryCharge: Number(e.target.value) })}
                            />
                            <Input
                                label="Free Delivery Above (₹)"
                                type="number"
                                value={settings.freeShippingThreshold}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                            />
                        </div>
                        <Input
                            label="Low Stock Warning Limit (Units)"
                            type="number"
                            value={settings.lowStockThreshold}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, lowStockThreshold: Number(e.target.value) })}
                        />
                        <Input
                            label="Display Currency Symbol"
                            value={settings.currencySymbol}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSettings({ ...settings, currencySymbol: e.target.value })}
                        />
                    </div>
                </Card>

                {/* System Notifications */}
                <Card padding="24px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', color: 'var(--primary)' }}>
                        <Bell size={18} />
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)' }}>Automation & Notifications</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.875rem' }}>
                            <input
                                type="checkbox"
                                checked={settings.emailAlerts}
                                onChange={e => setSettings({ ...settings, emailAlerts: e.target.checked })}
                                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                            />
                            <span>Email alerts on new customer orders</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.875rem' }}>
                            <input
                                type="checkbox"
                                checked={settings.smsAlerts}
                                onChange={e => setSettings({ ...settings, smsAlerts: e.target.checked })}
                                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                            />
                            <span>Instant WhatsApp & SMS dispatch notifications</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.875rem' }}>
                            <input
                                type="checkbox"
                                checked={settings.autoInvoice}
                                onChange={e => setSettings({ ...settings, autoInvoice: e.target.checked })}
                                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                            />
                            <span>Generate GST Tax Invoice automatically on checkout</span>
                        </label>
                    </div>
                </Card>

                {/* Security Status */}
                <Card padding="24px">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', color: '#10b981' }}>
                        <Shield size={18} />
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)' }}>Security & Database Health</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8125rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-light)', borderRadius: '6px' }}>
                            <span style={{ color: 'var(--slate-600)' }}>Mock Store Engine:</span>
                            <strong style={{ color: '#10b981' }}>LocalStorage + ACID Simulated</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-light)', borderRadius: '6px' }}>
                            <span style={{ color: 'var(--slate-600)' }}>Audit Logging:</span>
                            <strong>Active (Last 50 Tx preserved)</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-light)', borderRadius: '6px' }}>
                            <span style={{ color: 'var(--slate-600)' }}>SSL Encryption:</span>
                            <strong style={{ color: '#10b981' }}>TLS 1.3 Active</strong>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
