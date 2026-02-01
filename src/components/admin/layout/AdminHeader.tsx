import styles from '@/app/admin/admin.module.css';

interface AdminHeaderProps {
    activeTab: string;
}

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, User, LogOut, Bell } from 'lucide-react';

export default function AdminHeader({ activeTab }: AdminHeaderProps) {
    const { theme, toggleTheme, mounted } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    return (
        <header className={styles.fixedHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <h1 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--foreground)', letterSpacing: '-0.3px' }}>
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}
                </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button onClick={toggleTheme}
                    style={{
                        background: 'var(--surface)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-light)',
                        color: 'var(--slate-500)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    {!mounted ? <div style={{ width: '18px', height: '18px' }} /> : (theme === 'light' ? <Moon size={18} /> : <Sun size={18} />)}
                </button>

                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        style={{
                            background: 'var(--surface)',
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--border-light)',
                            color: 'var(--slate-500)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            position: 'relative'
                        }}
                    >
                        <Bell size={18} />
                        <span style={{
                            position: 'absolute',
                            top: '-2px',
                            right: '-2px',
                            width: '8px',
                            height: '8px',
                            background: '#ef4444',
                            borderRadius: '50%',
                            border: '2px solid var(--surface)'
                        }} />
                    </button>

                    {isNotificationsOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '280px',
                            background: 'var(--surface)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            zIndex: 100
                        }}>
                            <div style={{
                                padding: '12px',
                                borderBottom: '1px solid var(--border-light)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Notifications</span>
                                <button style={{ fontSize: '0.75rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                    Mark all as read
                                </button>
                            </div>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} style={{
                                        padding: '12px',
                                        borderBottom: '1px solid var(--border-light)',
                                        cursor: 'pointer',
                                        background: i === 0 ? 'var(--bg-light)' : 'transparent'
                                    }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '500', marginBottom: '4px' }}>New Order Received</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Order #1234 from John Doe</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)', marginTop: '4px' }}>2 mins ago</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            paddingLeft: '20px',
                            border: 'none',
                            borderLeft: '1px solid var(--border-light)',
                            cursor: 'pointer',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            background: 'var(--slate-800)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            fontSize: '0.8rem'
                        }}>
                            SU
                        </div>
                    </button>

                    {isDropdownOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '200px',
                            background: 'var(--surface)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            padding: '8px',
                            zIndex: 100
                        }}>
                            <div style={{
                                padding: '12px',
                                borderBottom: '1px solid var(--border-light)',
                                marginBottom: '8px'
                            }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--foreground)' }}>Super User</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>admin@grambahar.com</div>
                            </div>

                            <button
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: 'var(--foreground)',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-light)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <User size={16} />
                                Profile
                            </button>

                            <button
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#ef4444',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    marginTop: '4px',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
