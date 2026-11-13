import React from 'react';
import styles from '@/components/admin/admin.module.css';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    FileText,
    Settings,
    X,
    FolderTree,
    Tag,
    Star
} from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, isOpen = false, onClose }: SidebarProps) {
    const menuGroups = [
        {
            title: 'Management',
            items: [
                { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'orders', label: 'Orders & Returns', icon: Package },
                { id: 'products', label: 'Products & Stock', icon: ShoppingBag },
                { id: 'categories', label: 'Categories', icon: FolderTree },
                { id: 'customers', label: 'Customers', icon: Users },
            ]
        },
        {
            title: 'Marketing & Trust',
            items: [
                { id: 'coupons', label: 'Discounts & Coupons', icon: Tag },
                { id: 'reviews', label: 'Reviews & Leads', icon: Star },
            ]
        },
        {
            title: 'Website & Config',
            items: [
                { id: 'content', label: 'Site Content', icon: FileText },
                { id: 'settings', label: 'Settings', icon: Settings },
            ]
        }
    ];

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        if (onClose) onClose();
    };

    return (
        <>
            <div
                className={`${styles.sidebarOverlay} ${isOpen ? styles.sidebarOverlayOpen : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />
            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.logoArea} style={{ justifyContent: 'space-between' }}>
                    <div className={styles.logo}>
                        <span style={{ color: 'var(--secondary)' }}>Gram</span>Bahaar
                    </div>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.mobileMenuBtn}
                            style={{ color: '#ffffff', display: isOpen ? 'flex' : undefined }}
                            aria-label="Close navigation"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>
                <nav className={styles.nav}>
                    {menuGroups.map((group) => (
                        <React.Fragment key={group.title}>
                            <div className={styles.navGroup}>{group.title}</div>
                            {group.items.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
                                    onClick={() => handleTabClick(item.id)}
                                    style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                                >
                                    <span className={styles.navIcon}>
                                        <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                                    </span>
                                    {item.label}
                                </button>
                            ))}
                        </React.Fragment>
                    ))}
                </nav>
                <div className={styles.sidebarFooter}>
                    <span>v1.1.0</span>
                    <span>&copy; 2026 GramBahar</span>
                </div>
            </aside>
        </>
    );
}
