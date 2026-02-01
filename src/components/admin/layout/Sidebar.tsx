import styles from '@/app/admin/admin.module.css';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'content', label: 'Site Content', icon: '📝' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'products', label: 'Products', icon: '🍯' },
    { id: 'customers', label: 'Customers', icon: '👤' },
    { id: 'settings', label: 'Site Settings', icon: '⚙️' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>GramBahar</div>
      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.navItem} ${activeTab === item.id ? styles.navItemActive : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', padding: '20px', fontSize: '0.8rem', opacity: 0.7 }}>
        Admin Panel v1.2
      </div>
    </aside>
  );
}
