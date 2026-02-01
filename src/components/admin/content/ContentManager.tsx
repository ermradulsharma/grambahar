'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Card = dynamic(() => import('../../ui/base/Card'));
const Input = dynamic(() => import('../../ui/forms/Input'));
const Button = dynamic(() => import('../../ui/base/Button'));
const Tabs = dynamic(() => import('../../ui/navigation/Tabs'));
const Table = dynamic(() => import('../../ui/data/Table'));
const Modal = dynamic(() => import('../../ui/feedback/Modal'));
const Badge = dynamic(() => import('../../ui/base/Badge'));

export default function ContentManager() {
    const [activeTab, setActiveTab] = React.useState('hero');
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalConfig, setModalConfig] = React.useState<{ type: 'banner' | 'video' | 'testimonial', title: string }>({ type: 'banner', title: '' });

    // --- HERO STATE ---
    const [hero, setHero] = React.useState({
        title: 'Authentic Taste of Nature',
        subtitle: 'Discover pure, Farm-Fresh Patali Gur – a traditional Bengal delicacy handcrafted with love.',
        ctaLabel: 'Explore Products',
        ctaLink: '#products'
    });

    // --- BANNERS STATE ---
    const [newBanner, setNewBanner] = React.useState({ title: '', link: '' });
    const [banners, setBanners] = React.useState([
        { id: 1, title: 'Winter Jaggery Special', image: '/assets/banner1.jpg', link: '/products/gur', status: 'Active' },
        { id: 2, title: 'New Year Mega Sale', image: '/assets/banner2.jpg', link: '/offers', status: 'Draft' },
    ]);

    // --- VIDEOS STATE ---
    const [newVideo, setNewVideo] = React.useState({ title: '', url: '' });
    const [videos, setVideos] = React.useState([
        { id: 1, title: 'The Art of Gur Making', url: 'https://youtube.com/watch?v=1', status: 'Published' },
        { id: 2, title: 'Quality Testing Process', url: 'https://youtube.com/watch?v=2', status: 'Draft' }
    ]);

    // --- TESTIMONIALS STATE ---
    const [newTestimonial, setNewTestimonial] = React.useState({ name: '', role: '', comment: '', rating: 5 });
    const [testimonials, setTestimonials] = React.useState([
        { id: 1, name: 'Ananya Chatterjee', role: 'Home Maker', comment: 'Exactly like what we used to get in our village...', rating: 5 },
        { id: 2, name: 'Siddharth Roy', role: 'Food Blogger', comment: 'Impressive quality and packaging...', rating: 5 }
    ]);

    // --- LEGAL STATE ---
    const [selectedPolicy, setSelectedPolicy] = React.useState('Privacy Policy');
    const [policies, setPolicies] = React.useState<Record<string, string>>({
        'Privacy Policy': '<h2>1. Introduction</h2><p>Welcome to GramBahar. Your privacy is critically important to us.</p>...',
        'Return Policy': '<h2>Return Policy</h2><p>Items can be returned within 7 days of delivery.</p>',
        'Refund Policy': '<h2>Refund Policy</h2><p>Refunds are processed within 5-7 business days.</p>',
        'Shipping Policy': '<h2>Shipping Policy</h2><p>We ship nationwide with premium packaging.</p>',
        'Cookie Policy': '<h2>Cookie Policy</h2><p>We use cookies to improve your experience.</p>',
        'Terms of Service': '<h2>Terms of Service</h2><p>By using our site, you agree to these terms.</p>'
    });

    // --- ABOUT & CONTACT STATE ---
    const [about, setAbout] = React.useState({
        subtitle: 'Our Story',
        title: 'Handcrafted Tradition from the Heart of Bengal',
        text1: 'GramBahar was born out of a desire to preserve the authentic flavors of our childhood...'
    });

    const [contact, setContact] = React.useState({
        title: 'Experience Genuine Purity',
        subtitle: 'Ready to taste the authentic flavors of Bengal?'
    });

    // --- HANDLERS ---
    const handleSaveSection = (sectionName: string) => {
        alert(`${sectionName} changes saved successfully!`);
    };

    const handleAddItem = () => {
        if (modalConfig.type === 'banner') {
            if (!newBanner.title) return;
            setBanners([...banners, { ...newBanner, id: Date.now(), image: '/assets/placeholder.jpg', status: 'Active' }]);
            setNewBanner({ title: '', link: '' });
        } else if (modalConfig.type === 'video') {
            if (!newVideo.title) return;
            setVideos([...videos, { ...newVideo, id: Date.now(), status: 'Published' }]);
            setNewVideo({ title: '', url: '' });
        } else if (modalConfig.type === 'testimonial') {
            if (!newTestimonial.name) return;
            setTestimonials([...testimonials, { ...newTestimonial, id: Date.now() }]);
            setNewTestimonial({ name: '', role: '', comment: '', rating: 5 });
        }
        setIsModalOpen(false);
    };

    const handleDelete = (type: 'banner' | 'video' | 'testimonial', id: number) => {
        if (type === 'banner') setBanners(banners.filter(b => b.id !== id));
        if (type === 'video') setVideos(videos.filter(v => v.id !== id));
        if (type === 'testimonial') setTestimonials(testimonials.filter(t => t.id !== id));
    };

    const openModal = (type: 'banner' | 'video' | 'testimonial') => {
        setModalConfig({ type, title: `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}` });
        setIsModalOpen(true);
    };

    const contentTabs = [
        { id: 'hero', label: 'Hero Section' },
        { id: 'banners', label: 'Banners' },
        { id: 'videos', label: 'Videos' },
        { id: 'testimonials', label: 'Testimonials' },
        { id: 'legal', label: 'Legal Pages' },
        { id: 'about', label: 'About Story' },
        { id: 'contact', label: 'Contact Section' },
    ];

    return (
        <div style={{ marginTop: '20px' }}>
            <h2 style={{ marginBottom: '20px', color: 'var(--primary-dark)' }}>Website Content Manager</h2>
            <Card padding="30px">
                <Tabs tabs={contentTabs} activeTab={activeTab} onChange={setActiveTab} />

                {activeTab === 'hero' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Input label="Main Title" value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} />
                        <Input label="Subtitle" value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} />
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Input label="Primary CTA Label" value={hero.ctaLabel} onChange={(e) => setHero({ ...hero, ctaLabel: e.target.value })} />
                            <Input label="Primary CTA Link" value={hero.ctaLink} onChange={(e) => setHero({ ...hero, ctaLink: e.target.value })} />
                        </div>
                        <Button style={{ width: 'fit-content' }} onClick={() => handleSaveSection('Hero')}>Save Hero Changes</Button>
                    </div>
                )}

                {activeTab === 'banners' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ color: 'var(--primary)' }}>Promo Banners</h3>
                            <Button onClick={() => openModal('banner')}>+ Add New Banner</Button>
                        </div>
                        <Table headers={['Banner Preview', 'Title', 'Target Link', 'Status', 'Actions']}>
                            {banners.map((banner) => (
                                <tr key={banner.id}>
                                    <td><div style={{ width: '120px', height: '60px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>[Image]</div></td>
                                    <td>{banner.title}</td>
                                    <td>{banner.link}</td>
                                    <td><Badge variant={banner.status === 'Active' ? 'success' : 'neutral'}>{banner.status}</Badge></td>
                                    <td><button onClick={() => handleDelete('banner', banner.id)} style={{ color: '#c62828', cursor: 'pointer' }}>Delete</button></td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                )}

                {activeTab === 'videos' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ color: 'var(--primary)' }}>Process Videos</h3>
                            <Button onClick={() => openModal('video')}>+ Add New Video</Button>
                        </div>
                        <Table headers={['Video Title', 'URL', 'Status', 'Actions']}>
                            {videos.map((v) => (
                                <tr key={v.id}>
                                    <td>{v.title}</td>
                                    <td>{v.url}</td>
                                    <td><Badge variant={v.status === 'Published' ? 'success' : 'neutral'}>{v.status}</Badge></td>
                                    <td><button onClick={() => handleDelete('video', v.id)} style={{ color: '#c62828', cursor: 'pointer' }}>Delete</button></td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                )}

                {activeTab === 'testimonials' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ color: 'var(--primary)' }}>Customer Reviews</h3>
                            <Button onClick={() => openModal('testimonial')}>+ Add Testimonial</Button>
                        </div>
                        <Table headers={['Customer', 'Role', 'Comment', 'Rating', 'Actions']}>
                            {testimonials.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.name}</td>
                                    <td>{t.role}</td>
                                    <td>{t.comment}</td>
                                    <td><span style={{ color: '#ffc107' }}>{'★'.repeat(t.rating)}</span></td>
                                    <td><button onClick={() => handleDelete('testimonial', t.id)} style={{ color: '#c62828', cursor: 'pointer' }}>Delete</button></td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                )}

                {activeTab === 'legal' && (
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
                        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <h3 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Select Policy</h3>
                            {Object.keys(policies).map(policy => (
                                <div key={policy} onClick={() => setSelectedPolicy(policy)} style={{
                                    padding: '12px 20px',
                                    background: policy === selectedPolicy ? 'var(--surface)' : 'transparent',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    border: policy === selectedPolicy ? '1px solid var(--secondary)' : '1px solid #eee',
                                    fontWeight: policy === selectedPolicy ? '600' : '400'
                                }}>{policy}</div>
                            ))}
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ color: 'var(--primary-dark)' }}>Editor: {selectedPolicy}</h3>
                                <Button onClick={() => handleSaveSection('Legal')}>Save Content</Button>
                            </div>
                            <textarea
                                rows={15}
                                style={{ padding: '20px', borderRadius: '15px', border: '1.5px solid #e0e0e0', fontFamily: 'monospace' }}
                                value={policies[selectedPolicy]}
                                onChange={(e) => setPolicies({ ...policies, [selectedPolicy]: e.target.value })}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'about' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Input label="Section Subtitle" value={about.subtitle} onChange={(e) => setAbout({ ...about, subtitle: e.target.value })} />
                        <Input label="Section Title" value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} />
                        <textarea
                            rows={4}
                            style={{ padding: '12px', borderRadius: '10px', border: '1.5px solid #e0e0e0' }}
                            value={about.text1}
                            onChange={(e) => setAbout({ ...about, text1: e.target.value })}
                        />
                        <Button style={{ width: 'fit-content' }} onClick={() => handleSaveSection('About')}>Save About Section</Button>
                    </div>
                )}

                {activeTab === 'contact' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <Input label="Footer Title" value={contact.title} onChange={(e) => setContact({ ...contact, title: e.target.value })} />
                        <Input label="Footer Subtitle" value={contact.subtitle} onChange={(e) => setContact({ ...contact, subtitle: e.target.value })} />
                        <Button style={{ width: 'fit-content' }} onClick={() => handleSaveSection('Contact')}>Save Contact Section</Button>
                    </div>
                )}
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalConfig.title}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {modalConfig.type === 'banner' && (
                        <>
                            <Input label="Title" value={newBanner.title} onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })} />
                            <Input label="Target URL" value={newBanner.link} onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })} />
                        </>
                    )}
                    {modalConfig.type === 'video' && (
                        <>
                            <Input label="Title" value={newVideo.title} onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })} />
                            <Input label="Video URL" value={newVideo.url} onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })} />
                        </>
                    )}
                    {modalConfig.type === 'testimonial' && (
                        <>
                            <Input label="Customer Name" value={newTestimonial.name} onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })} />
                            <Input label="Role" value={newTestimonial.role} onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })} />
                            <textarea placeholder="Comment" rows={3} style={{ padding: '10px' }} value={newTestimonial.comment} onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })} />
                        </>
                    )}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <Button onClick={handleAddItem} style={{ flex: 1 }}>Add Item</Button>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} style={{ flex: 1 }}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
