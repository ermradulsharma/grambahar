import { useState } from 'react';
import styles from '@/components/admin/admin.module.css';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, User, LogOut, Bell } from 'lucide-react';

interface AdminHeaderProps {
    activeTab: string;
}

export default function AdminHeader({ activeTab }: AdminHeaderProps) {
    const { theme, toggleTheme, mounted } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const formatTabTitle = (tab: string) => {
        return tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1');
    };

    return (
        <header className={styles.fixedHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <h1 className={styles.headerTitle}>
                    {formatTabTitle(activeTab)}
                </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle Dark / Light Theme"
                    style={{
                        background: 'var(--surface)',
                        width: '38px',
                        height: '38px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-light)',
                        color: 'var(--slate-600)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                    }}
                >
                    {!mounted ? <div style={{ width: '18px', height: '18px' }} /> : (theme === 'light' ? <Moon size={18} /> : <Sun size={18} />)}
                </button>

                {/* Notifications Button */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        aria-label="View notifications"
                        style={{
                            background: 'var(--surface)',
                            width: '38px',
                            height: '38px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--border-light)',
                            color: 'var(--slate-600)',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            position: 'relative'
                        }}
                    >
                        <Bell size={18} />
                        <span style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '7px',
                            height: '7px',
                            background: '#ef4444',
                            borderRadius: '50%',
                            border: '1.5px solid var(--surface)'
                        }} />
                    </button>

                    {isNotificationsOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '125%',
                            right: 0,
                            width: '300px',
                            background: 'var(--surface)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '12px',
                            boxShadow: 'var(--shadow-soft)',
                            zIndex: 100,
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                padding: '14px 16px',
                                borderBottom: '1px solid var(--border-light)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--foreground)' }}>Notifications</span>
                                <button
                                    onClick={() => setIsNotificationsOpen(false)}
                                    style={{ fontSize: '0.75rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                                >
                                    Dismiss
                                </button>
                            </div>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {[
                                    { title: 'New Order Received', desc: 'Order #GB-1004 from Sneha Roy', time: '10m ago' },
                                    { title: 'Low Stock Alert', desc: 'Super Saver Combo is below 10 units', time: '1h ago' },
                                    { title: 'Weekly Report Ready', desc: 'January revenue report has been compiled', time: '1d ago' },
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        padding: '12px 16px',
                                        borderBottom: '1px solid var(--border-light)',
                                        cursor: 'pointer',
                                        background: i === 0 ? 'var(--bg-light)' : 'transparent',
                                        transition: 'background 0.15s ease'
                                    }}>
                                        <div style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)', marginBottom: '2px' }}>{item.title}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{item.desc}</div>
                                        <div style={{ fontSize: '0.6875rem', color: 'var(--slate-400)', marginTop: '4px' }}>{item.time}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* User Profile Menu */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        aria-label="User Account Menu"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-light)',
                            background: 'var(--surface)',
                            cursor: 'pointer'
                        }}
                    >
                        <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            background: 'var(--primary-dark)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            fontSize: '0.75rem'
                        }}>
                            GB
                        </div>
                        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--foreground)' }}>Admin</span>
                        </div>
                    </button>

                    {isDropdownOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '125%',
                            right: 0,
                            width: '220px',
                            background: 'var(--surface)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '12px',
                            boxShadow: 'var(--shadow-soft)',
                            padding: '8px',
                            zIndex: 100
                        }}>
                            <div style={{
                                padding: '10px 12px',
                                borderBottom: '1px solid var(--border-light)',
                                marginBottom: '6px'
                            }}>
                                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--foreground)' }}>GramBahar Admin</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>admin@grambahar.com</div>
                            </div>

                            <button
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: 'var(--foreground)',
                                    cursor: 'pointer',
                                    fontSize: '0.8125rem',
                                    fontWeight: '500',
                                    transition: 'background 0.15s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-light)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <User size={15} />
                                Profile Settings
                            </button>

                            <button
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#ef4444',
                                    cursor: 'pointer',
                                    fontSize: '0.8125rem',
                                    fontWeight: '500',
                                    marginTop: '4px',
                                    transition: 'background 0.15s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <LogOut size={15} />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
