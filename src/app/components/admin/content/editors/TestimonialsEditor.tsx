'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input } from '@/components/ui';
import { Plus, Trash2, Star } from 'lucide-react';
import { getMockContent, updateMockContent } from '@/core/Helpers';

export default function TestimonialsEditor() {
    const [testimonials, setTestimonials] = useState(() => getMockContent('testimonials'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReview, setNewReview] = useState({ name: '', role: 'Verified Buyer', location: '', comment: '', rating: 5 });

    useEffect(() => {
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ store: string }>;
            if (ce.detail?.store === 'content') {
                setTestimonials(getMockContent('testimonials'));
            }
        };
        window.addEventListener('gb_mock_store_update', handler);
        return () => window.removeEventListener('gb_mock_store_update', handler);
    }, []);

    const handleDelete = (id: number) => {
        const updated = testimonials.filter(t => t.id !== id);
        setTestimonials(updated);
        updateMockContent('testimonials', updated);
    };

    const handleAdd = () => {
        if (!newReview.name.trim() || !newReview.comment.trim()) return;
        const reviewToAdd = {
            id: Date.now(),
            name: newReview.name.trim(),
            role: newReview.role.trim() || 'Verified Buyer',
            location: newReview.location.trim() || 'India',
            comment: newReview.comment.trim(),
            rating: Number(newReview.rating) || 5
        };
        const updated = [reviewToAdd, ...testimonials];
        setTestimonials(updated);
        updateMockContent('testimonials', updated);
        setIsModalOpen(false);
        setNewReview({ name: '', role: 'Verified Buyer', location: '', comment: '', rating: 5 });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
                        Customer Reviews & Testimonials
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                        Manage customer ratings, feedback cards, and social proof shown on the storefront
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={16} /> Add Testimonial
                </Button>
            </div>

            <Table headers={['Customer', 'Rating', 'Location', 'Feedback Review', 'Action']}>
                {testimonials.map((t) => (
                    <tr key={t.id}>
                        <td>
                            <div style={{ fontWeight: 600, color: 'var(--foreground)' }}>{t.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{t.role}</div>
                        </td>
                        <td>
                            <div style={{ display: 'flex', gap: '2px' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        fill={i < t.rating ? '#f59e0b' : 'none'}
                                        color={i < t.rating ? '#f59e0b' : 'var(--slate-300)'}
                                    />
                                ))}
                            </div>
                        </td>
                        <td style={{ color: 'var(--slate-600)', fontSize: '0.8125rem' }}>{t.location}</td>
                        <td style={{ maxWidth: '350px', fontSize: '0.8125rem', color: 'var(--foreground)', fontStyle: 'italic' }}>
                            &ldquo;{t.comment}&rdquo;
                        </td>
                        <td>
                            <button
                                onClick={() => handleDelete(t.id)}
                                title="Delete review"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </Table>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Customer Testimonial">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Input
                        label="Customer Name *"
                        value={newReview.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewReview({ ...newReview, name: e.target.value })}
                        placeholder="e.g. Sharmistha Sikdar"
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <Input
                            label="Role / Badge"
                            value={newReview.role}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewReview({ ...newReview, role: e.target.value })}
                            placeholder="Verified Buyer"
                        />
                        <Input
                            label="City, State"
                            value={newReview.location}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewReview({ ...newReview, location: e.target.value })}
                            placeholder="Kolkata, WB"
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--foreground)' }}>
                            Star Rating (1 to 5)
                        </label>
                        <select
                            value={newReview.rating}
                            onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                            style={{
                                padding: '9px 12px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-medium)',
                                background: 'var(--surface)',
                                color: 'var(--foreground)',
                                fontFamily: 'inherit'
                            }}
                        >
                            <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                            <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                            <option value={3}>⭐⭐⭐ (3 Stars)</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--foreground)' }}>
                            Customer Review Comment *
                        </label>
                        <textarea
                            rows={3}
                            value={newReview.comment}
                            onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                            placeholder="Share customer's genuine words about the taste, packaging, delivery..."
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
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <Button onClick={handleAdd} style={{ flex: 1 }}>Save Review</Button>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

