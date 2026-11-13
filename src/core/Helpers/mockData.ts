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

export interface AdminCoupon {
    id: string;
    code: string;
    discountType: 'percentage' | 'flat' | 'shipping';
    value: number; // e.g. 15 for 15%, 100 for ₹100, 0 for free shipping
    minOrderAmount: number;
    maxDiscount?: number;
    expiryDate: string;
    usageLimit: number;
    usedCount: number;
    isActive: boolean;
}

export interface AdminCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    productCount: number;
    isActive: boolean;
    displayOrder: number;
}

export interface AdminReview {
    id: string;
    productName: string;
    customerName: string;
    customerEmail: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    status: 'Approved' | 'Pending' | 'Rejected';
    isVerified: boolean;
}

export interface AdminInquiry {
    id: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    subject: string;
    message: string;
    date: string;
    status: 'New' | 'In Progress' | 'Resolved';
    channel: 'Website Form' | 'WhatsApp';
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

export const MOCK_ADMIN_COUPONS: AdminCoupon[] = [
    { id: 'CPN-1', code: 'FESTIVE20', discountType: 'percentage', value: 20, minOrderAmount: 999, maxDiscount: 300, expiryDate: '2026-03-31', usageLimit: 500, usedCount: 142, isActive: true },
    { id: 'CPN-2', code: 'WELCOME100', discountType: 'flat', value: 100, minOrderAmount: 599, expiryDate: '2026-12-31', usageLimit: 1000, usedCount: 389, isActive: true },
    { id: 'CPN-3', code: 'FREESHIP', discountType: 'shipping', value: 0, minOrderAmount: 499, expiryDate: '2026-06-30', usageLimit: 200, usedCount: 95, isActive: true },
    { id: 'CPN-4', code: 'WINTERSPECIAL', discountType: 'percentage', value: 15, minOrderAmount: 799, maxDiscount: 200, expiryDate: '2026-01-31', usageLimit: 300, usedCount: 300, isActive: false },
];

export const MOCK_ADMIN_CATEGORIES: AdminCategory[] = [
    { id: 'CAT-1', name: 'Pure Patali Gur', slug: 'patali-gur', description: 'Traditional solid date palm jaggery blocks from Nadia Siuli masters', productCount: 3, isActive: true, displayOrder: 1 },
    { id: 'CAT-2', name: 'Liquid Nolen Gur (Jhola)', slug: 'nolen-gur', description: 'Aromatic seasonal first-draw liquid date palm nectar', productCount: 2, isActive: true, displayOrder: 2 },
    { id: 'CAT-3', name: 'Super Saver Combos', slug: 'combos', description: 'Festive family combo bundles with complimentary wooden scoop', productCount: 4, isActive: true, displayOrder: 3 },
    { id: 'CAT-4', name: 'Organic Jaggery Powder', slug: 'jaggery-powder', description: 'Natural unrefined golden jaggery powder for daily tea & cooking', productCount: 1, isActive: true, displayOrder: 4 },
];

export const MOCK_ADMIN_REVIEWS: AdminReview[] = [
    { id: 'REV-1', productName: 'Premium Patali Gur', customerName: 'Sharmistha Sikdar', customerEmail: 'sharmistha@gmail.com', rating: 5, title: 'Authentic Village Aroma', comment: 'Very nice and tasty Patali Gur. Packed with genuine village aroma. Ordered 3 boxes again!', date: '2026-02-01', status: 'Approved', isVerified: true },
    { id: 'REV-2', productName: 'Liquid Nolen Gur', customerName: 'Sangita Sarkar', customerEmail: 'sangita.s@yahoo.com', rating: 5, title: 'Super Fresh and Fast Delivery', comment: 'Khub bhalo taste... akdom fresh and delivery was super fast pan-India.', date: '2026-01-29', status: 'Approved', isVerified: true },
    { id: 'REV-3', productName: 'Super Saver Combo', customerName: 'Rohit Sen', customerEmail: 'rohit.sen@delhifood.in', rating: 5, title: 'Brought Back Childhood Memories', comment: 'Pure & authentic product. Took me back to childhood winter mornings in rural Bengal.', date: '2026-01-25', status: 'Approved', isVerified: true },
    { id: 'REV-4', productName: 'Premium Patali Gur', customerName: 'Ananya Mukherjee', customerEmail: 'ananya.m@kolkata.org', rating: 4, title: 'Good taste, packaging could be stronger', comment: 'Sweetness is 100% natural, but please add an extra outer box during monsoon.', date: '2026-02-02', status: 'Pending', isVerified: true },
    { id: 'REV-5', productName: 'Super Saver Combo', customerName: 'Vikash Jha', customerEmail: 'vikash.jha@outlook.com', rating: 2, title: 'Courier delay by 2 days', comment: 'Product is good but Bluedart delivery was delayed by two days in Patna.', date: '2026-02-01', status: 'Pending', isVerified: false },
];

export const MOCK_ADMIN_INQUIRIES: AdminInquiry[] = [
    { id: 'INQ-101', customerName: 'Rajesh Mondal', customerPhone: '+91 9876543210', customerEmail: 'rajesh.mondal@gmail.com', subject: 'Bulk purchase for Wedding Gifting', message: 'Namaste, we need 50 gift packs of Patali Gur for a wedding ceremony in Kolkata next month. Can you offer bulk corporate discount?', date: 'Feb 02, 2026', status: 'New', channel: 'Website Form' },
    { id: 'INQ-102', customerName: 'Deepa Banerjee', customerPhone: '+91 9830112233', customerEmail: 'deepa.b@yahoo.com', subject: 'Express Delivery to Mumbai', message: 'Hi! Can you dispatch 2 packs of Nolen Gur with 48-hour express courier to Bandra, Mumbai?', date: 'Feb 01, 2026', status: 'In Progress', channel: 'WhatsApp' },
    { id: 'INQ-103', customerName: 'Suman Pal', customerPhone: '+91 9433221100', customerEmail: 'suman.pal@tcs.com', subject: 'Export Quality Inquiry', message: 'Do you provide certificate of purity or organic lab test reports for overseas dispatch to London?', date: 'Jan 29, 2026', status: 'Resolved', channel: 'Website Form' },
];

