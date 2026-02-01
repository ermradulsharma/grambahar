import styles from '@/app/admin/admin.module.css';

export default function AdminFooter() {
    return (
        <footer className={styles.fixedFooter}>
            <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                &copy; 2026 GramBahar. All rights reserved.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.85rem' }}>
                <a href="#" style={{ color: 'var(--slate-500)', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</a>
                <a href="#" style={{ color: 'var(--slate-500)', textDecoration: 'none', transition: 'color 0.2s' }}>Terms of Service</a>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '24px', borderLeft: '1px solid var(--border-light)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)' }}></span>
                    <span style={{ color: 'var(--foreground)', fontWeight: '600', fontSize: '0.8rem' }}>System Operational</span>
                </div>
            </div>
        </footer>
    );
}
