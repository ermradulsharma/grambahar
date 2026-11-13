'use client';

import { Card, MiniChart } from '@/components/ui';
import styles from '@/components/admin/admin.module.css';

export default function Stats() {
    const stats = [
        { label: 'Total Sales', value: '₹ 1,24,500', icon: '💰', data: [31000, 40000, 35000, 50000, 49000, 60000, 124500] },
        { label: 'Total Orders', value: '156', icon: '🛒', data: [10, 20, 15, 25, 30, 40, 156] },
        { label: 'Active Customers', value: '89', icon: '👥', data: [5, 15, 20, 35, 50, 70, 89] },
        { label: 'Pending Shipments', value: '12', icon: '🚚', data: [5, 8, 4, 10, 15, 8, 12] },
    ];

    return (
        <div className={styles.grid}>
            {stats.map((stat, index) => (
                <Card key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '0.9rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                                {stat.label}
                            </h3>
                            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '10px' }}>{stat.value}</div>
                            <MiniChart data={stat.data} color={index % 2 === 0 ? 'var(--nature-green)' : 'var(--accent)'} />
                        </div>
                        <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>{stat.icon}</span>
                    </div>
                </Card>
            ))}
        </div>
    );
}
