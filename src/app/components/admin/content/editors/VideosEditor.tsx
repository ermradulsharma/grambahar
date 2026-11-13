'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Modal, Input } from '@/components/ui';
import { Plus, Trash2, Video as VideoIcon, ExternalLink } from 'lucide-react';
import { getMockContent, updateMockContent } from '@/core/Helpers';

export default function VideosEditor() {
    const [videos, setVideos] = useState(() => getMockContent('videos'));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newVideo, setNewVideo] = useState({ title: '', url: '', status: 'Published' });

    useEffect(() => {
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ store: string }>;
            if (ce.detail?.store === 'content') {
                setVideos(getMockContent('videos'));
            }
        };
        window.addEventListener('gb_mock_store_update', handler);
        return () => window.removeEventListener('gb_mock_store_update', handler);
    }, []);

    const handleDelete = (id: number) => {
        const updated = videos.filter(v => v.id !== id);
        setVideos(updated);
        updateMockContent('videos', updated);
    };

    const handleAdd = () => {
        if (!newVideo.title.trim()) return;
        const videoToAdd = {
            id: Date.now(),
            title: newVideo.title.trim(),
            url: newVideo.url.trim() || 'https://youtube.com',
            status: newVideo.status,
            views: '0'
        };
        const updated = [videoToAdd, ...videos];
        setVideos(updated);
        updateMockContent('videos', updated);
        setIsModalOpen(false);
        setNewVideo({ title: '', url: '', status: 'Published' });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
                        Artisanal Video Reels & Process Stories
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                        Manage documentary reels, date palm tapping process, and purity testing clips
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={16} /> Add Video Reel
                </Button>
            </div>

            <Table headers={['Video Title', 'Streaming Link', 'Views', 'Status', 'Actions']}>
                {videos.map((v) => (
                    <tr key={v.id}>
                        <td style={{ fontWeight: 600, color: 'var(--foreground)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <VideoIcon size={16} color="var(--primary)" />
                                {v.title}
                            </div>
                        </td>
                        <td>
                            <a
                                href={v.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8125rem', textDecoration: 'none' }}
                            >
                                Watch Video <ExternalLink size={12} />
                            </a>
                        </td>
                        <td style={{ color: 'var(--slate-500)', fontSize: '0.8125rem' }}>{v.views}</td>
                        <td>
                            <Badge variant={v.status === 'Published' ? 'success' : 'neutral'}>
                                {v.status}
                            </Badge>
                        </td>
                        <td>
                            <button
                                onClick={() => handleDelete(v.id)}
                                title="Delete video"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </td>
                    </tr>
                ))}
            </Table>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Video Reel">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Input
                        label="Video Title"
                        value={newVideo.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVideo({ ...newVideo, title: e.target.value })}
                        placeholder="e.g. Pure Date Palm Jaggery Boiling Process"
                    />
                    <Input
                        label="Video URL (YouTube / Instagram Reel)"
                        value={newVideo.url}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewVideo({ ...newVideo, url: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                    />
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <Button onClick={handleAdd} style={{ flex: 1 }}>Save Video</Button>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

