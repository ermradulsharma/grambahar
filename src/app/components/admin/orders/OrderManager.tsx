'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Table, SearchInput, Badge, Dropdown } from '@/components/ui';
import { MOCK_ADMIN_ORDERS, AdminOrder } from '@/core/Helpers';
import styles from '@/components/admin/admin.module.css';

const OrderDetails = dynamic(() => import('./OrderDetails'));

export default function OrderManager() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orders] = useState<AdminOrder[]>(MOCK_ADMIN_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const headers = ['Order ID', 'Date', 'Customer', 'Product', 'Amount', 'Status', 'Actions'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  if (selectedOrderId) {
    return <OrderDetails orderId={selectedOrderId} onBack={() => setSelectedOrderId(null)} />;
  }

  return (
    <div style={{ marginTop: '8px', animation: 'fadeIn 0.3s ease-in-out' }}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeading}>Order Fulfillment Center</h2>
          <p className={styles.sectionSubheading}>Manage customer orders, track payments, and verify deliveries</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <SearchInput
            placeholder="Search by Order ID, Customer..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
          <Dropdown
            label="Filter Status"
            value={statusFilter}
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Paid', value: 'paid' },
              { label: 'Pending', value: 'pending' }
            ]}
            onSelect={(val) => setStatusFilter(val)}
          />
        </div>
      </div>

      <Table headers={headers}>
        {filteredOrders.map((order) => (
          <tr key={order.id}>
            <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{order.id}</td>
            <td style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>{order.date}</td>
            <td>{order.customer}</td>
            <td>{order.product}</td>
            <td style={{ fontWeight: '500' }}>{order.amount}</td>
            <td>
              <Badge variant={order.status === 'Paid' ? 'success' : 'warning'}>
                {order.status}
              </Badge>
            </td>
            <td>
              <button
                onClick={() => setSelectedOrderId(order.id)}
                style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer', border: 'none', background: 'none' }}
              >
                Details
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
