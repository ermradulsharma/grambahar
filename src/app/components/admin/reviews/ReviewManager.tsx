'use client';

import { useState, useEffect } from 'react';
import { Table, Button, Badge, SearchInput, Card, Tabs } from '@/components/ui';
import {
    Star,
    CheckCircle,
    XCircle,
    Trash2,
    MessageSquare,
    Phone,
    Mail,
    CheckCircle2,
    ShieldCheck
} from 'lucide-react';
import {
    getMockReviews,
    updateMockReviewStatus,
    deleteMockReview,
    getMockInquiries,
    updateMockInquiryStatus,
    AdminReview,
    AdminInquiry,
    getWhatsAppUrl
} from '@/core/Helpers';
import styles from '@/components/admin/admin.module.css';

export default function ReviewManager() {
    const [subTab, setSubTab] = useState<'reviews' | 'inquiries'>('reviews');
    const [reviews, setReviews] = useState<AdminReview[]>([]);
    const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'Approved' | 'Pending' | 'Rejected'>('all');
    const [notification, setNotification] = useState<string | null>(null);

    const refreshData = () => {
        setReviews(getMockReviews());
        setInquiries(getMockInquiries());
    };

    useEffect(() => {
        refreshData();
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ store: string }>;
            if (ce.detail?.store === 'reviews' || ce.detail?.store === 'inquiries') {
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

    // Review Actions
    const handleReviewStatus = (id: string, status: 'Approved' | 'Pending' | 'Rejected') => {
        updateMockReviewStatus(id, status);
        showToast(`Review marked as ${status}`);
        refreshData();
    };

    const handleDeleteReview = (id: string) => {
        if (confirm('Are you sure you want to delete this customer review?')) {
            deleteMockReview(id);
            showToast('Review removed');
            refreshData();
        }
    };

    // Inquiry Actions
    const handleInquiryStatus = (id: string, status: 'New' | 'In Progress' | 'Resolved') => {
        updateMockInquiryStatus(id, status);
        showToast(`Inquiry status updated to ${status}`);
        refreshData();
    };

    const filteredReviews = reviews.filter(r => {
        const matchesSearch =
            r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.comment.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const filteredInquiries = inquiries.filter(i =>
        i.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.customerPhone.includes(searchQuery) ||
        i.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pendingReviewCount = reviews.filter(r => r.status === 'Pending').length;
    const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

    const navTabs = [
        { id: 'reviews', label: `Product Reviews (${reviews.length})` },
        { id: 'inquiries', label: `Customer Inquiries (${inquiries.length})` }
    ];

    const reviewHeaders = ['Product & Rating', 'Customer Feedback', 'Customer', 'Date', 'Status', 'Moderation'];
    const inquiryHeaders = ['Customer', 'Subject & Query', 'Channel', 'Date', 'Status', 'Actions'];

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h2 className={styles.sectionHeading}>Customer Trust & Inquiries</h2>
                    <p className={styles.sectionSubheading}>Moderate authentic product ratings, verified buyer reviews, and direct customer queries</p>
                </div>
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

            {/* Tabs */}
            <Tabs tabs={navTabs} activeTab={subTab} onChange={(id) => setSubTab(id as 'reviews' | 'inquiries')} />

            {/* Sub-tab 1: Reviews */}
            {subTab === 'reviews' && (
                <>
                    {/* Metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px', marginTop: '16px' }}>
                        <Card style={{ padding: '18px 20px', border: '1px solid var(--border-light)' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Average Rating</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                <span style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--foreground)' }}>4.8</span>
                                <div style={{ display: 'flex', color: '#eab308' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill="#eab308" />
                                    ))}
                                </div>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>Based on all approved reviews</div>
                        </Card>

                        <Card style={{ padding: '18px 20px', border: '1px solid var(--border-light)' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Awaiting Moderation</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: pendingReviewCount > 0 ? '#f59e0b' : 'var(--foreground)', marginTop: '4px' }}>
                                {pendingReviewCount}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>Pending admin verification</div>
                        </Card>

                        <Card style={{ padding: '18px 20px', border: '1px solid var(--border-light)' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified Buyers</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#16a34a', marginTop: '4px' }}>
                                {reviews.filter(r => r.isVerified).length}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>Genuine order deliveries verified</div>
                        </Card>
                    </div>

                    {/* Filter and Search Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                        <div style={{ width: '320px' }}>
                            <SearchInput
                                placeholder="Search by customer, product, comment..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                            {(['all', 'Approved', 'Pending', 'Rejected'] as const).map(status => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => setStatusFilter(status)}
                                    style={{
                                        padding: '6px 14px',
                                        borderRadius: '6px',
                                        border: '1px solid var(--border-light)',
                                        background: statusFilter === status ? 'var(--primary-dark)' : 'var(--surface)',
                                        color: statusFilter === status ? '#ffffff' : 'var(--foreground)',
                                        fontSize: '0.8125rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease'
                                    }}
                                >
                                    {status === 'all' ? 'All Reviews' : status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Reviews Table */}
                    <Card style={{ border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                        <Table headers={reviewHeaders}>
                            {filteredReviews.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: 'var(--slate-400)', fontSize: '0.875rem' }}>
                                        No reviews found matching your filter.
                                    </td>
                                </tr>
                            ) : (
                                filteredReviews.map((rev) => (
                                    <tr key={rev.id} className={styles.tableRow}>
                                        <td className={styles.tableCell} style={{ minWidth: '180px' }}>
                                            <div style={{ fontWeight: '700', color: 'var(--foreground)', marginBottom: '4px' }}>
                                                {rev.productName}
                                            </div>
                                            <div style={{ display: 'flex', color: '#eab308', gap: '2px' }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={13}
                                                        fill={i < rev.rating ? '#eab308' : 'none'}
                                                        color={i < rev.rating ? '#eab308' : '#cbd5e1'}
                                                    />
                                                ))}
                                                <span style={{ fontSize: '0.75rem', fontWeight: '700', marginLeft: '4px', color: 'var(--slate-600)' }}>
                                                    {rev.rating}.0
                                                </span>
                                            </div>
                                        </td>
                                        <td className={styles.tableCell} style={{ maxWidth: '320px' }}>
                                            <div style={{ fontWeight: '600', color: 'var(--foreground)', fontSize: '0.8125rem' }}>
                                                {rev.title}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)', marginTop: '2px', lineHeight: 1.4 }}>
                                                &ldquo;{rev.comment}&rdquo;
                                            </div>
                                        </td>
                                        <td className={styles.tableCell}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span style={{ fontWeight: '600', color: 'var(--foreground)' }}>{rev.customerName}</span>
                                                {rev.isVerified && (
                                                    <span title="Verified Order Buyer">
                                                        <ShieldCheck size={14} color="#16a34a" />
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>{rev.customerEmail}</div>
                                        </td>
                                        <td className={styles.tableCell} style={{ color: 'var(--slate-500)', fontSize: '0.8125rem' }}>
                                            {rev.date}
                                        </td>
                                        <td className={styles.tableCell}>
                                            <Badge variant={
                                                rev.status === 'Approved' ? 'success' :
                                                    rev.status === 'Pending' ? 'warning' : 'error'
                                            }>
                                                {rev.status}
                                            </Badge>
                                        </td>
                                        <td className={styles.tableCell} style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                                {rev.status !== 'Approved' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleReviewStatus(rev.id, 'Approved')}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#16a34a', padding: '4px' }}
                                                        title="Approve Review"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                )}
                                                {rev.status !== 'Rejected' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleReviewStatus(rev.id, 'Rejected')}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f59e0b', padding: '4px' }}
                                                        title="Reject / Hide Review"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteReview(rev.id)}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px' }}
                                                    title="Delete Permanently"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </Table>
                    </Card>
                </>
            )}

            {/* Sub-tab 2: Inquiries */}
            {subTab === 'inquiries' && (
                <>
                    {/* Metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px', marginTop: '16px' }}>
                        <Card style={{ padding: '18px 20px', border: '1px solid var(--border-light)' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Inquiries</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--foreground)', marginTop: '4px' }}>{inquiries.length}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>Pre-sales and bulk queries</div>
                        </Card>

                        <Card style={{ padding: '18px 20px', border: '1px solid var(--border-light)' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>New Unread Leads</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: newInquiriesCount > 0 ? '#ef4444' : 'var(--foreground)', marginTop: '4px' }}>
                                {newInquiriesCount}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>Requires immediate follow-up</div>
                        </Card>

                        <Card style={{ padding: '18px 20px', border: '1px solid var(--border-light)' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resolved Inquiries</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#16a34a', marginTop: '4px' }}>
                                {inquiries.filter(i => i.status === 'Resolved').length}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>Successfully attended</div>
                        </Card>
                    </div>

                    {/* Search */}
                    <div style={{ marginBottom: '16px', maxWidth: '350px' }}>
                        <SearchInput
                            placeholder="Search by customer, phone, message..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Inquiries Table */}
                    <Card style={{ border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                        <Table headers={inquiryHeaders}>
                            {filteredInquiries.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: 'var(--slate-400)', fontSize: '0.875rem' }}>
                                        No inquiries found.
                                    </td>
                                </tr>
                            ) : (
                                filteredInquiries.map((inq) => {
                                    const cleanPhone = inq.customerPhone.replace(/[^\d]/g, '');
                                    const whatsappReplyText = `Namaste ${inq.customerName}, this is regarding your GramBahar inquiry: "${inq.subject}". How can we help you?`;
                                    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappReplyText)}`;

                                    return (
                                        <tr key={inq.id} className={styles.tableRow}>
                                            <td className={styles.tableCell}>
                                                <div style={{ fontWeight: '700', color: 'var(--foreground)' }}>{inq.customerName}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                                    <Phone size={11} /> {inq.customerPhone}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Mail size={11} /> {inq.customerEmail}
                                                </div>
                                            </td>
                                            <td className={styles.tableCell} style={{ maxWidth: '350px' }}>
                                                <div style={{ fontWeight: '600', color: 'var(--foreground)', fontSize: '0.8125rem' }}>
                                                    {inq.subject}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)', marginTop: '2px', lineHeight: 1.4 }}>
                                                    {inq.message}
                                                </div>
                                            </td>
                                            <td className={styles.tableCell}>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    background: inq.channel === 'WhatsApp' ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-light)',
                                                    color: inq.channel === 'WhatsApp' ? '#16a34a' : 'var(--foreground)'
                                                }}>
                                                    <MessageSquare size={12} /> {inq.channel}
                                                </span>
                                            </td>
                                            <td className={styles.tableCell} style={{ color: 'var(--slate-500)', fontSize: '0.8125rem' }}>
                                                {inq.date}
                                            </td>
                                            <td className={styles.tableCell}>
                                                <select
                                                    value={inq.status}
                                                    onChange={(e) => handleInquiryStatus(inq.id, e.target.value as AdminInquiry['status'])}
                                                    style={{
                                                        padding: '4px 8px',
                                                        borderRadius: '6px',
                                                        border: '1px solid var(--border-light)',
                                                        background: 'var(--surface)',
                                                        color: inq.status === 'New' ? '#ef4444' : inq.status === 'In Progress' ? '#f59e0b' : '#16a34a',
                                                        fontWeight: '600',
                                                        fontSize: '0.75rem'
                                                    }}
                                                >
                                                    <option value="New">🔴 New</option>
                                                    <option value="In Progress">🟡 In Progress</option>
                                                    <option value="Resolved">🟢 Resolved</option>
                                                </select>
                                            </td>
                                            <td className={styles.tableCell} style={{ textAlign: 'right' }}>
                                                <a
                                                    href={whatsappUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        padding: '6px 12px',
                                                        borderRadius: '6px',
                                                        background: '#22c55e',
                                                        color: '#ffffff',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '600',
                                                        textDecoration: 'none'
                                                    }}
                                                >
                                                    <MessageSquare size={13} /> Reply on WhatsApp
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </Table>
                    </Card>
                </>
            )}
        </div>
    );
}
