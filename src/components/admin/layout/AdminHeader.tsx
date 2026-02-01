import styles from '@/app/admin/admin.module.css';

interface AdminHeaderProps {
    activeTab: string;
}

export default function AdminHeader({ activeTab }: AdminHeaderProps) {
    return (
        <header className={styles.fixedHeader}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-dark)' }}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button style={{ background: 'var(--surface)', padding: '8px 15px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
                    Frontend ↗
                </button>
                <div style={{ color: 'var(--primary)', fontWeight: '600' }}>Admin: SuperUser</div>
            </div>
        </header>
    );
}
