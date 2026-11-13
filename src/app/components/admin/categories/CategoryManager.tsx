'use client';

import { useState, useEffect } from 'react';
import { Table, Button, Modal, Badge, Input, SearchInput, Card } from '@/components/ui';
import { Plus, FolderTree, Layers, Trash2, CheckCircle2, ArrowUpDown } from 'lucide-react';
import {
    getMockCategories,
    saveMockCategory,
    deleteMockCategory,
    AdminCategory
} from '@/core/Helpers';
import styles from '@/components/admin/admin.module.css';

export default function CategoryManager() {
    const [categories, setCategories] = useState<AdminCategory[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    // Form state
    const [formCategory, setFormCategory] = useState<Partial<AdminCategory>>({
        name: '',
        slug: '',
        description: '',
        displayOrder: 1,
        isActive: true
    });

    const refreshData = () => {
        setCategories(getMockCategories());
    };

    useEffect(() => {
        refreshData();
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ store: string }>;
            if (ce.detail?.store === 'categories') {
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

    const handleNameChange = (name: string) => {
        const autoSlug = name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        setFormCategory(prev => ({
            ...prev,
            name,
            slug: prev.slug === '' || prev.slug === undefined ? autoSlug : prev.slug
        }));
    };

    const handleSaveCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formCategory.name?.trim()) return;

        const cat: AdminCategory = {
            id: formCategory.id || `CAT-${Date.now().toString().slice(-4)}`,
            name: formCategory.name.trim(),
            slug: formCategory.slug?.trim() || formCategory.name.toLowerCase().replace(/\s+/g, '-'),
            description: formCategory.description?.trim() || '',
            productCount: formCategory.productCount || 0,
            displayOrder: Number(formCategory.displayOrder) || (categories.length + 1),
            isActive: formCategory.isActive ?? true
        };

        saveMockCategory(cat);
        setIsCreateModalOpen(false);
        showToast(`Category "${cat.name}" saved!`);
        setFormCategory({
            name: '',
            slug: '',
            description: '',
            displayOrder: categories.length + 1,
            isActive: true
        });
        refreshData();
    };

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete category "${name}"? Products in this category will become unassigned.`)) {
            deleteMockCategory(id);
            showToast(`Category "${name}" deleted`);
            refreshData();
        }
    };

    const handleToggleStatus = (cat: AdminCategory) => {
        saveMockCategory({
            ...cat,
            isActive: !cat.isActive
        });
        showToast(`Category "${cat.name}" status updated`);
        refreshData();
    };

    const filtered = categories
        .filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.displayOrder - b.displayOrder);

    const totalProducts = categories.reduce((acc, c) => acc + c.productCount, 0);
    const headers = ['Order', 'Category Name & Slug', 'Description', 'Products', 'Status', 'Actions'];

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h2 className={styles.sectionHeading}>Product Categories & Collections</h2>
                    <p className={styles.sectionSubheading}>Structure your storefront catalog, filter trees, and featured collections</p>
                </div>
                <Button variant="primary" onClick={() => {
                    setFormCategory({
                        name: '',
                        slug: '',
                        description: '',
                        displayOrder: categories.length + 1,
                        isActive: true
                    });
                    setIsCreateModalOpen(true);
                }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <Plus size={16} /> Add Category
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

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <Card style={{ padding: '18px 20px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Categories</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--foreground)', marginTop: '4px' }}>{categories.length}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>Organized collections</div>
                </Card>

                <Card style={{ padding: '18px 20px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categorized Items</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary)', marginTop: '4px' }}>{totalProducts}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>Items linked to categories</div>
                </Card>

                <Card style={{ padding: '18px 20px', border: '1px solid var(--border-light)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Storefront Visibility</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#16a34a', marginTop: '4px' }}>
                        {categories.filter(c => c.isActive).length} / {categories.length}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '4px' }}>Active on navigation menu</div>
                </Card>
            </div>

            {/* Search */}
            <div style={{ marginBottom: '16px', maxWidth: '350px' }}>
                <SearchInput
                    placeholder="Search categories by name or slug..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Categories Table */}
            <Card style={{ border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                <Table headers={headers}>
                    {filtered.length === 0 ? (
                        <tr>
                            <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: 'var(--slate-400)', fontSize: '0.875rem' }}>
                                No categories found.
                            </td>
                        </tr>
                    ) : (
                        filtered.map((cat) => (
                            <tr key={cat.id} className={styles.tableRow}>
                                <td className={styles.tableCell} style={{ fontWeight: '600', color: 'var(--slate-500)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <ArrowUpDown size={13} /> #{cat.displayOrder}
                                    </div>
                                </td>
                                <td className={styles.tableCell}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '6px',
                                            background: 'var(--bg-light)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--primary)'
                                        }}>
                                            <FolderTree size={16} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '700', color: 'var(--foreground)' }}>{cat.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>/{cat.slug}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className={styles.tableCell} style={{ color: 'var(--slate-600)', maxWidth: '300px' }}>
                                    <span style={{ fontSize: '0.8125rem' }}>{cat.description || '—'}</span>
                                </td>
                                <td className={styles.tableCell}>
                                    <span style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        padding: '3px 8px',
                                        borderRadius: '6px',
                                        background: 'var(--bg-light)',
                                        fontWeight: '600',
                                        fontSize: '0.8125rem'
                                    }}>
                                        <Layers size={13} /> {cat.productCount} items
                                    </span>
                                </td>
                                <td className={styles.tableCell}>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleStatus(cat)}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                        title="Click to toggle visibility"
                                    >
                                        <Badge variant={cat.isActive ? 'success' : 'neutral'}>
                                            {cat.isActive ? 'Published' : 'Hidden'}
                                        </Badge>
                                    </button>
                                </td>
                                <td className={styles.tableCell} style={{ textAlign: 'right' }}>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(cat.id, cat.name)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#ef4444',
                                            padding: '6px'
                                        }}
                                        title="Delete category"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </Table>
            </Card>

            {/* Create Category Modal */}
            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Add Product Category">
                <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '6px' }}>
                            Category Name *
                        </label>
                        <Input
                            placeholder="e.g. Liquid Nolen Gur"
                            value={formCategory.name || ''}
                            onChange={(e) => handleNameChange(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '6px' }}>
                                URL Slug *
                            </label>
                            <Input
                                placeholder="e.g. liquid-nolen-gur"
                                value={formCategory.slug || ''}
                                onChange={(e) => setFormCategory({ ...formCategory, slug: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '6px' }}>
                                Display Order
                            </label>
                            <Input
                                type="number"
                                placeholder="1"
                                value={formCategory.displayOrder || ''}
                                onChange={(e) => setFormCategory({ ...formCategory, displayOrder: Number(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '6px' }}>
                            Description
                        </label>
                        <textarea
                            placeholder="Brief description for SEO meta and collection banner..."
                            value={formCategory.description || ''}
                            onChange={(e) => setFormCategory({ ...formCategory, description: e.target.value })}
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-light)',
                                background: 'var(--surface)',
                                color: 'var(--foreground)',
                                fontSize: '0.875rem',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                        <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Category
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
