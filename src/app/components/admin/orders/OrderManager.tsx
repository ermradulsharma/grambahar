'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Table, SearchInput, Badge, Dropdown, Button } from '@/components/ui';
import { PlusCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import {
  getMockOrders,
  createMockOrder,
  AdminOrder
} from '@/core/Helpers';
import styles from '@/components/admin/admin.module.css';

const OrderDetails = dynamic(() => import('./OrderDetails'));

export default function OrderManager() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [simNotice, setSimNotice] = useState<string | null>(null);

  const refreshOrders = () => {
    setOrders(getMockOrders());
  };

  useEffect(() => {
    refreshOrders();
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ store: string }>;
      if (ce.detail?.store === 'orders') {
        refreshOrders();
      }
    };
    window.addEventListener('gb_mock_store_update', handler);
    return () => window.removeEventListener('gb_mock_store_update', handler);
  }, []);

  const handleSimulateOrder = () => {
    const sampleProducts = [
      { name: 'Premium Patali Gur', amount: '₹ 499' },
      { name: 'Super Saver Combo (Small)', amount: '₹ 899' },
      { name: 'Bulk Family Pack', amount: '₹ 1,720' }
    ];
    const sampleCustomers = ['Debabrata Mondal', 'Tanushree Ghosh', 'Sourav Ganguly', 'Mitali Paul', 'Kunal Majumder'];

    const randomProd = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
    const randomCust = sampleCustomers[Math.floor(Math.random() * sampleCustomers.length)];

    const res = createMockOrder({
      customer: randomCust,
      product: randomProd.name,
      amount: randomProd.amount,
      quantity: 1
    });

    if (res.txResult.success) {
      setSimNotice(`🎉 New order ${res.order.id} placed by ${randomCust}! Inventory stock deducted atomically.`);
    } else {
      setSimNotice(`⚠️ Order placed, but inventory notice: ${res.txResult.error}`);
    }

    refreshOrders();
    setTimeout(() => setSimNotice(null), 4000);
  };

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
          <p className={styles.sectionSubheading}>
            Process customer checkouts, dispatch logistics, and track inventory synchronization
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <SearchInput
            placeholder="Search by ID, customer..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
          <Dropdown
            label="Filter Status"
            value={statusFilter}
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Paid', value: 'paid' },
              { label: 'Pending', value: 'pending' },
              { label: 'Shipped', value: 'shipped' },
              { label: 'Delivered', value: 'delivered' }
            ]}
            onSelect={(val) => setStatusFilter(val)}
          />
          <Button
            onClick={handleSimulateOrder}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <PlusCircle size={15} /> Simulate Order
          </Button>
        </div>
      </div>

      {simNotice && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#059669',
          borderRadius: '8px',
          marginBottom: '18px',
          fontSize: '0.8125rem',
          fontWeight: 600
        }}>
          {simNotice}
        </div>
      )}

      <Table headers={['Order ID', 'Date', 'Customer', 'Product', 'Amount', 'Status', 'Actions']}>
        {filteredOrders.map((order) => (
          <tr key={order.id}>
            <td style={{ fontWeight: 600, color: 'var(--primary)', fontFamily: 'monospace' }}>{order.id}</td>
            <td style={{ color: 'var(--slate-500)', fontSize: '0.8125rem' }}>{order.date}</td>
            <td style={{ fontWeight: 500 }}>{order.customer}</td>
            <td>{order.product}</td>
            <td style={{ fontWeight: 600 }}>{order.amount}</td>
            <td>
              <Badge variant={order.status === 'Paid' ? 'success' : (order.status === 'Shipped' ? 'primary' : (order.status === 'Delivered' ? 'success' : 'warning'))}>
                {order.status}
              </Badge>
            </td>
            <td>
              <button
                onClick={() => setSelectedOrderId(order.id)}
                style={{
                  color: 'var(--primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  fontSize: '0.8125rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Inspect <ArrowRight size={14} />
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}
