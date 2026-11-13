'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Table, Button, Badge, Modal, Input } from '@/components/ui';
import { Plus, Trash2, CheckCircle2, ToggleLeft, ToggleRight } from 'lucide-react';
import { getMockContent, updateMockContent } from '@/core/Helpers';

export default function BannersEditor() {
    const [banners, setBanners] = useState(() => getMockContent('banners'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBanner, setNewBanner] = useState({ title: '', image: '/images/banner-poster-4.webp', link: '#products', status: 'Active' });
    const [savedNotice, setSavedNotice] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ store: string }>;
            if (ce.detail?.store === 'content') {
                setBanners(getMockContent('banners'));
            }
        };
        window.addEventListener('gb_mock_store_update', handler);
        return () => window.removeEventListener('gb_mock_store_update', handler);
    }, []);

    const handleToggleStatus = (id: number) => {
        const updated = banners.map(b =>
            b.id === id ? { ...b, status: b.status === 'Active' ? 'Draft' : 'Active' } : b
        );
        setBanners(updated);
        updateMockContent('banners', updated);
    };

    const handleDelete = (id: number) => {
        const updated = banners.filter(b => b.id !== id);
        setBanners(updated);
        updateMockContent('banners', updated);
    };

    const handleAdd = () => {
        if (!newBanner.title.trim()) return;
        const bannerToAdd = {
            id: Date.now(),
            title: newBanner.title.trim(),
            image: newBanner.image.trim() || '/images/banner-poster-4.webp',
            link: newBanner.link.trim() || '#products',
            status: newBanner.status
        };
        const updated = [bannerToAdd, ...banners];
        setBanners(updated);
        updateMockContent('banners', updated);
        setIsModalOpen(false);
        setNewBanner({ title: '', image: '/images/banner-poster-4.webp', link: '#products', status: 'Active' });
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2000);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
                        Storefront Promotional Banners
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                        Manage hero carousel posters, campaign links, and visibility status
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {savedNotice && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: '#10b981', fontWeight: 600 }}>
                            <CheckCircle2 size={16} /> Updated!
                        </span>
                    )}
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus size={16} /> Add New Banner
                    </Button>
                </div>
            </div>

            <Table headers={['Preview', 'Banner Title', 'Destination Link', 'Status', 'Actions']}>
                {banners.map((banner) => (
                    <tr key={banner.id}>
                        <td style={{ width: '100px' }}>
                            <div style={{ position: 'relative', width: '70px', height: '40px', borderRadius: '6px', overflow: 'hidden', background: '#eee' }}>
                                <Image
                                    src={banner.image}
                                    alt={banner.title}
                                    fill
                                    sizes="70px"
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </td>
                        <td style={{ fontWeight: 600, color: 'var(--foreground)' }}>{banner.title}</td>
                        <td style={{ color: 'var(--slate-500)', fontSize: '0.8125rem' }}>{banner.link}</td>
                        <td>
                            <Badge variant={banner.status === 'Active' ? 'success' : 'neutral'}>
                                {banner.status}
                            </Badge>
                        </td>
                        <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <button
                                    onClick={() => handleToggleStatus(banner.id)}
                                    title="Toggle Active/Draft Status"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-500)', display: 'flex', alignItems: 'center' }}
                                >
                                    {banner.status === 'Active' ? <ToggleRight size={20} color="#10b981" /> : <ToggleLeft size={20} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(banner.id)}
                                    title="Delete banner"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center' }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </Table>

            {/* Add Banner Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Storefront Banner">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Input
                        label="Banner Campaign Title"
                        value={newBanner.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewBanner({ ...newBanner, title: e.target.value })}
                        placeholder="e.g. Winter Fresh Jaggery Festival"
                    />
                    <Input
                        label="Image Path / URL"
                        value={newBanner.image}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewBanner({ ...newBanner, image: e.target.value })}
                        placeholder="/images/banner-poster-4.webp"
                    />
                    <Input
                        label="Click Action Link"
                        value={newBanner.link}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewBanner({ ...newBanner, link: e.target.value })}
                        placeholder="#products"
                    />
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <Button onClick={handleAdd} style={{ flex: 1 }}>Save Banner</Button>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

