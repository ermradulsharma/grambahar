import styles from '@/app/admin/admin.module.css';

export default function AdminFooter() {
    return (
        <footer className={styles.fixedFooter}>
            <div>&copy; 2026 GramBahar. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
                <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
                <span style={{ cursor: 'pointer' }}>Terms of Service</span>
                <span style={{ color: 'var(--nature-green)', fontWeight: '600' }}>System Status: Online</span>
            </div>
        </footer>
    );
}
