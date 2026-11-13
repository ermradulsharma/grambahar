'use client';

import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from '@/components/ui';
import { Save, CheckCircle2, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { getMockContent, updateMockContent } from '@/core/Helpers';

export default function ContactEditor() {
    const [contact, setContact] = useState(() => getMockContent('contact'));
    const [savedNotice, setSavedNotice] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ store: string }>;
            if (ce.detail?.store === 'content') {
                setContact(getMockContent('contact'));
            }
        };
        window.addEventListener('gb_mock_store_update', handler);
        return () => window.removeEventListener('gb_mock_store_update', handler);
    }, []);

    const handleSave = () => {
        updateMockContent('contact', contact);
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2000);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
                        Customer Support & Contact Info
                    </h3>
                    {savedNotice && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#10b981', fontWeight: 600 }}>
                            <CheckCircle2 size={16} /> Saved!
                        </span>
                    )}
                </div>

                <Input
                    label="Customer Care Email"
                    value={contact.supportEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContact({ ...contact, supportEmail: e.target.value })}
                    placeholder="care@grambahar.com"
                />

                <Input
                    label="Helpline & WhatsApp Number"
                    value={contact.helpline}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContact({ ...contact, helpline: e.target.value })}
                    placeholder="+91 9531536706"
                />

                <Input
                    label="Processing Unit & Office Address"
                    value={contact.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContact({ ...contact, address: e.target.value })}
                    placeholder="Ranaghat, Nadia District, West Bengal"
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--foreground)' }}>
                        Support Timing / WhatsApp Note
                    </label>
                    <textarea
                        rows={2}
                        value={contact.whatsappNote}
                        onChange={e => setContact({ ...contact, whatsappNote: e.target.value })}
                        style={{
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-medium)',
                            background: 'var(--surface)',
                            color: 'var(--foreground)',
                            fontFamily: 'inherit',
                            fontSize: '0.875rem'
                        }}
                    />
                </div>

                <div>
                    <Button onClick={handleSave} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <Save size={16} /> Save Contact Details
                    </Button>
                </div>
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-500)', marginBottom: '8px' }}>
                    Footer / Contact Card Preview
                </label>
                <Card padding="24px" style={{ background: 'var(--bg-light)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.875rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Mail size={16} color="var(--primary)" />
                            <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>{contact.supportEmail}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Phone size={16} color="var(--primary)" />
                            <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>{contact.helpline}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MapPin size={16} color="var(--primary)" />
                            <span style={{ color: 'var(--foreground)' }}>{contact.address}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '6px', padding: '10px 12px', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                            <MessageSquare size={16} color="#10b981" style={{ marginTop: '2px' }} />
                            <span style={{ fontSize: '0.8125rem', color: 'var(--slate-600)' }}>{contact.whatsappNote}</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

