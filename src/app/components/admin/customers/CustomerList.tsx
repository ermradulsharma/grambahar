'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Table, SearchInput, Badge, Button } from '@/components/ui';
import { MOCK_ADMIN_CUSTOMERS, AdminCustomer } from '@/core/Helpers';

const CustomerDetails = dynamic(() => import('./CustomerDetails'));

export default function CustomerList() {
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
    const [customers] = useState<AdminCustomer[]>(MOCK_ADMIN_CUSTOMERS);
    const [searchTerm, setSearchTerm] = useState('');

    const headers = ['Customer Name', 'Email', 'Total Orders', 'Lifetime Spent', 'Status', 'Actions'];

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCustomerId) {
        return <CustomerDetails customerId={selectedCustomerId} onBack={() => setSelectedCustomerId(null)} />;
    }

    return (
        <div style={{ marginTop: '20px', animation: 'fadeIn 0.3s ease-in-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                <h2 style={{ color: 'var(--foreground)', fontSize: '1.5rem', fontWeight: '700' }}>Customer Management</h2>
                <SearchInput
                    placeholder="Find customers..."
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
            </div>

            <Table headers={headers}>
                {filtered.map((customer) => (
                    <tr key={customer.id}>
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
