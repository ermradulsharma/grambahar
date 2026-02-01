'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Table = dynamic(() => import('../../ui/data/Table'));
const SearchInput = dynamic(() => import('../../ui/forms/SearchInput'));
const Badge = dynamic(() => import('../../ui/base/Badge'));
const Dropdown = dynamic(() => import('../../ui/forms/Dropdown'));
const OrderDetails = dynamic(() => import('./OrderDetails'));

export default function OrderManager() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const orders = [
    { id: '#GB-1001', customer: 'Rahul Sharma', product: 'Premium Patali Gur', amount: '₹ 499', status: 'Paid', date: 'Feb 01, 2026' },
    { id: '#GB-1002', customer: 'Priya Das', product: 'Super Saver Combo', amount: '₹ 899', status: 'Pending', date: 'Jan 31, 2026' },
    { id: '#GB-1003', customer: 'Amit Sen', product: 'Bulk Family Pack', amount: '₹ 1,720', status: 'Paid', date: 'Jan 30, 2026' },
    { id: '#GB-1004', customer: 'Sneha Roy', product: 'Premium Patali Gur', amount: '₹ 499', status: 'Paid', date: 'Jan 30, 2026' },
  ];

  const headers = ['Order ID', 'Date', 'Customer', 'Product', 'Amount', 'Status', 'Actions'];

  if (selectedOrderId) {
    return <OrderDetails orderId={selectedOrderId} onBack={() => setSelectedOrderId(null)} />;
  }

  return (
    <div style={{ marginTop: '20px', animation: 'fadeIn 0.3s ease-in-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '20px' }}>
        <h2 style={{ color: 'var(--foreground)', fontSize: '1.5rem', fontWeight: '700' }}>Order Fulfillment Center</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <SearchInput placeholder="Search by Order ID..." />
          <Dropdown
            label="Filter Date"
            options={[
              { label: 'All Time', value: 'all' },
              { label: 'Today', value: 'today' },
              { label: 'This Week', value: 'week' }
            ]}
            onSelect={(val) => console.log(val)}
          />
        </div>
      </div>

      <Table headers={headers}>
        {orders.map((order) => (
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
