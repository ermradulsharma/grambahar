import React from 'react';
import styles from '@/components/admin/admin.module.css';
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    FileText,
    Settings
} from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
    const menuGroups = [
        {
            title: 'Management',
            items: [
                { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'orders', label: 'Orders', icon: Package },
                { id: 'products', label: 'Products', icon: ShoppingBag },
                { id: 'customers', label: 'Customers', icon: Users },
            ]
        },
        {
            title: 'Website',
            items: [
                { id: 'content', label: 'Site Content', icon: FileText },
                { id: 'settings', label: 'Settings', icon: Settings },
            ]
        }
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoArea}>
                <div className={styles.logo}>
                    <span style={{ color: 'var(--secondary)' }}>Gram</span>Bahaar
                </div>
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
                                onClick={() => setActiveTab(item.id)}
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
    );
}
