'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/admin/layout/Sidebar';
import styles from '@/components/admin/admin.module.css';

import AdminHeader from '@/components/admin/layout/AdminHeader';
import AdminFooter from '@/components/admin/layout/AdminFooter';
import { Tabs } from '@/components/ui';

// Overview Sub-Tabs
const Stats = dynamic(() => import('@/components/admin/overview/Stats'));
const AnalyticsView = dynamic(() => import('@/components/admin/overview/AnalyticsView'));
const ReportsView = dynamic(() => import('@/components/admin/overview/ReportsView'));

// Order Sub-Tabs
const OrderManager = dynamic(() => import('@/components/admin/orders/OrderManager'));
const ReturnManager = dynamic(() => import('@/components/admin/orders/ReturnManager'));

// Main Sidebar Tabs
const ProductList = dynamic(() => import('@/components/admin/products/ProductList'));
const ContentManager = dynamic(() => import('@/components/admin/content/ContentManager'));
const CustomerList = dynamic(() => import('@/components/admin/customers/CustomerList'));
const SettingsManager = dynamic(() => import('@/components/admin/settings/SettingsManager'));

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [overviewSubTab, setOverviewSubTab] = useState('snapshot');
    const [ordersSubTab, setOrdersSubTab] = useState('management');

    const overviewTabs = [
        { id: 'snapshot', label: 'Snapshot' },
        { id: 'analytics', label: 'Detailed Analytics' },
        { id: 'reports', label: 'Sales Reports' },
    ];

    const orderTabs = [
        { id: 'management', label: 'Order Management' },
        { id: 'returns', label: 'Returns & Refunds' },
    ];

    return (
        <div className={styles.adminContainer}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className={styles.mainWrapper}>
                <AdminHeader activeTab={activeTab} />

                <main className={styles.mainContent}>
                    {/* OVERVIEW SECTION */}
                    {activeTab === 'overview' && (
                        <>
                            <Tabs tabs={overviewTabs} activeTab={overviewSubTab} onChange={setOverviewSubTab} />
                            {overviewSubTab === 'snapshot' && (
                                <>
                                    <Stats />
                                    <div style={{ marginTop: '30px' }}>
                                        <OrderManager />
                                    </div>
                                </>
                            )}
                            {overviewSubTab === 'analytics' && <AnalyticsView />}
                            {overviewSubTab === 'reports' && <ReportsView />}
                        </>
                    )}

                    {/* CONTENT SECTION */}
                    {activeTab === 'content' && <ContentManager />}

                    {/* ORDERS SECTION */}
                    {activeTab === 'orders' && (
                        <>
                            <Tabs tabs={orderTabs} activeTab={ordersSubTab} onChange={setOrdersSubTab} />
                            {ordersSubTab === 'management' && <OrderManager />}
                            {ordersSubTab === 'returns' && <ReturnManager />}
                        </>
                    )}

                    {/* PRODUCTS SECTION */}
                    {activeTab === 'products' && <ProductList />}

                    {/* CUSTOMERS SECTION */}
                    {activeTab === 'customers' && <CustomerList />}

                    {/* SETTINGS SECTION */}
                    {activeTab === 'settings' && <SettingsManager />}
                </main>

                <AdminFooter />
            </div>
        </div>
    );
}
