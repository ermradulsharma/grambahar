import React from 'react';
import styles from '@/app/admin/admin.module.css';
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
                    <span style={{ color: 'var(--secondary)' }}>Gram</span>Bahar
                </div>
            </div>
            <nav className={styles.nav}>
                {menuGroups.map((group) => (
                    <React.Fragment key={group.title}>
                        <div className={styles.navGroup}>{group.title}</div>
                        {group.items.map((item) => (
                            <div
                                key={item.id}
                                className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <span className={styles.navIcon}>
                                    <item.icon size={18} strokeWidth={2.5} />
                                </span>
                                {item.label}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </nav>
            <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.75rem', opacity: 0.5 }}>
                &copy; 2026 Admin Panel
            </div>
        </aside>
    );
}
