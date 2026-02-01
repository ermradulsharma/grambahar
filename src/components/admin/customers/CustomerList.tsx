'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Table = dynamic(() => import('../../ui/data/Table'));
const SearchInput = dynamic(() => import('../../ui/forms/SearchInput'));
const Badge = dynamic(() => import('../../ui/base/Badge'));
const Button = dynamic(() => import('../../ui/base/Button'));
const CustomerDetails = dynamic(() => import('./CustomerDetails'));

export default function CustomerList() {
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

    const customers = [
        { id: 'C-001', name: 'Rahul Sharma', email: 'rahul@example.com', orders: 5, spent: '₹ 4,500', status: 'Active' },
        { id: 'C-002', name: 'Priya Das', email: 'priya@test.com', orders: 2, spent: '₹ 1,200', status: 'Active' },
        { id: 'C-003', name: 'Amit Sen', email: 'amit.sen@web.in', orders: 12, spent: '₹ 15,400', status: 'VIP' },
        { id: 'C-004', name: 'Sneha Roy', email: 'sneha@example.org', orders: 1, spent: '₹ 499', status: 'New' },
    ];

    const headers = ['Customer Name', 'Email', 'Total Orders', 'Lifetime Spent', 'Status', 'Actions'];

    if (selectedCustomerId) {
        return <CustomerDetails customerId={selectedCustomerId} onBack={() => setSelectedCustomerId(null)} />;
    }

    return (
        <div style={{ marginTop: '20px', animation: 'fadeIn 0.3s ease-in-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ color: 'var(--foreground)', fontSize: '1.5rem', fontWeight: '700' }}>Customer Management</h2>
                <SearchInput placeholder="Find customers..." />
            </div>

            <Table headers={headers}>
                {customers.map((customer, idx) => (
                    <tr key={idx}>
                        <td style={{ fontWeight: '600', color: 'var(--foreground)' }}>{customer.name}</td>
                        <td style={{ color: 'var(--slate-500)' }}>{customer.email}</td>
                        <td>{customer.orders}</td>
                        <td style={{ fontWeight: '500' }}>{customer.spent}</td>
                        <td>
                            <Badge variant={customer.status === 'VIP' ? 'primary' : (customer.status === 'Active' ? 'success' : 'neutral')}>
                                {customer.status}
                            </Badge>
                        </td>
                        <td>
                            <Button
                                variant="outline"
                                onClick={() => setSelectedCustomerId(customer.id)}
                                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                            >
                                View History
                            </Button>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    );
}
