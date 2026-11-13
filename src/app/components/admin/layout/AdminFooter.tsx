import styles from '@/components/admin/admin.module.css';

export default function AdminFooter() {
    return (
        <footer className={styles.fixedFooter}>
            <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                &copy; {new Date().getFullYear()} GramBahar Management Suite. All rights reserved.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.8125rem' }}>
                <span style={{ color: 'var(--slate-500)' }}>Version 1.1.0</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '16px', borderLeft: '1px solid var(--border-light)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)' }}></span>
                    <span style={{ color: 'var(--foreground)', fontWeight: '600', fontSize: '0.75rem' }}>All Systems Live</span>
                </div>
            </div>
        </footer>
    );
}
