/**
 * Centralized Mock Data for Admin Management Suite
 * Prevents redundant in-file mock duplication across Admin modules
 */

export interface AdminOrder {
    id: string;
    customer: string;
    product: string;
    amount: string;
    status: 'Paid' | 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    date: string;
}

export interface AdminCustomer {
    id: string;
    name: string;
    email: string;
    orders: number;
    spent: string;
    status: 'Active' | 'VIP' | 'New' | 'Inactive';
}

export interface AdminInventoryItem {
    id: string;
    name: string;
    weight: string;
    stock: number;
    price: string;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export const MOCK_ADMIN_ORDERS: AdminOrder[] = [
    { id: '#GB-1001', customer: 'Rahul Sharma', product: 'Premium Patali Gur', amount: '₹ 499', status: 'Paid', date: 'Feb 01, 2026' },
    { id: '#GB-1002', customer: 'Priya Das', product: 'Super Saver Combo', amount: '₹ 899', status: 'Pending', date: 'Jan 31, 2026' },
    { id: '#GB-1003', customer: 'Amit Sen', product: 'Bulk Family Pack', amount: '₹ 1,720', status: 'Paid', date: 'Jan 30, 2026' },
    { id: '#GB-1004', customer: 'Sneha Roy', product: 'Premium Patali Gur', amount: '₹ 499', status: 'Paid', date: 'Jan 30, 2026' },
];

export const MOCK_ADMIN_CUSTOMERS: AdminCustomer[] = [
    { id: 'C-001', name: 'Rahul Sharma', email: 'rahul@example.com', orders: 5, spent: '₹ 4,500', status: 'Active' },
    { id: 'C-002', name: 'Priya Das', email: 'priya@test.com', orders: 2, spent: '₹ 1,200', status: 'Active' },
    { id: 'C-003', name: 'Amit Sen', email: 'amit.sen@web.in', orders: 12, spent: '₹ 15,400', status: 'VIP' },
    { id: 'C-004', name: 'Sneha Roy', email: 'sneha@example.org', orders: 1, spent: '₹ 499', status: 'New' },
];

export const MOCK_ADMIN_INVENTORY: AdminInventoryItem[] = [
    { id: 'P-1', name: 'Premium Patali Gur', weight: '750gm', stock: 45, price: '₹ 499', status: 'In Stock' },
    { id: 'P-2', name: 'Super Saver Combo (Small)', weight: '700gm + 750gm', stock: 8, price: '₹ 899', status: 'Low Stock' },
    { id: 'P-3', name: 'Bulk Family Pack', weight: '1.4kg + 1.5kg', stock: 15, price: '₹ 1,720', status: 'In Stock' },
];

