'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { CONTACT_INFO, getWhatsAppUrl, validateCustomerInfo } from '@/core/Helpers';

export default function ContactInquiryForm() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validation = validateCustomerInfo({
            name,
            phone,
            address: message.trim().length > 0 ? message : 'General Inquiry'
        });

        if (!validation.isValid) {
            setError(validation.error || 'Please provide your name, phone, and message.');
            return;
        }

        setError(null);
        const inquiryText = `📩 *New Inquiry from ${CONTACT_INFO.brandName} Website*\n\n` +
            `• Name: ${name.trim()}\n` +
            `• Contact: ${phone.trim()}\n` +
            `• Inquiry / Requirement:\n${message.trim()}`;

        const url = getWhatsAppUrl(inquiryText);
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
            {error && (
                <div style={{ color: '#dc2626', fontSize: '0.875rem' }}>
                    {error}
                </div>
            )}
            <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 6 }}>
                    Your Name *
                </label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your name"
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 10,
                        border: '1px solid var(--border-medium)',
                        background: 'var(--background)',
                        color: 'var(--foreground)'
                    }}
                />
            </div>
            <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 6 }}>
                    Phone / WhatsApp Number *
                </label>
                <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 10,
                        border: '1px solid var(--border-medium)',
                        background: 'var(--background)',
                        color: 'var(--foreground)'
                    }}
                />
            </div>
            <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 6 }}>
                    Your Query or Bulk Inquiry *
                </label>
                <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Write your requirement or questions here..."
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 10,
                        border: '1px solid var(--border-medium)',
                        background: 'var(--background)',
                        color: 'var(--foreground)'
                    }}
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8 }}
            >
                <Send size={18} />
                Submit Inquiry via WhatsApp
            </button>
        </form>
    );
}

