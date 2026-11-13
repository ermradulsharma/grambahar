'use client';

import { Card, MiniChart } from '@/components/ui';
import styles from '@/components/admin/admin.module.css';
import { TrendingUp, ShoppingBag, Users, Truck } from 'lucide-react';

export default function Stats() {
    const stats = [
        { label: 'Total Revenue', value: '₹ 1,24,500', icon: TrendingUp, color: '#10b981', data: [31000, 40000, 35000, 50000, 49000, 60000, 124500] },
        { label: 'Total Orders', value: '156', icon: ShoppingBag, color: 'var(--primary)', data: [10, 20, 15, 25, 30, 40, 156] },
        { label: 'Active Customers', value: '89', icon: Users, color: '#3b82f6', data: [5, 15, 20, 35, 50, 70, 89] },
        { label: 'Pending Shipments', value: '12', icon: Truck, color: '#f59e0b', data: [5, 8, 4, 10, 15, 8, 12] },
    ];

    return (
        <div className={styles.grid}>
            {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                    <Card key={index} padding="20px">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: 'var(--slate-500)',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    marginBottom: '8px'
                                }}>
                                    {stat.label}
                                </div>
                                <div style={{
                                    fontSize: '1.75rem',
                                    fontWeight: 700,
                                    color: 'var(--foreground)',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.2,
                                    marginBottom: '12px'
                                }}>
                                    {stat.value}
                                </div>
                                <MiniChart data={stat.data} color={stat.color} />
                            </div>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: 'var(--bg-light)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: stat.color,
                                border: '1px solid var(--border-light)'
                            }}>
                                <IconComponent size={20} strokeWidth={2} />
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
