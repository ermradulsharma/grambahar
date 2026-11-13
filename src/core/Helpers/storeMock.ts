/**
 * Complete Persistent Mock Store for GramBahar
 * Simulates ACID Transactions & Persistent Storage via Browser LocalStorage
 */

import { safeGetStorage, safeSetStorage } from './storage';
import {
    MOCK_ADMIN_ORDERS,
    MOCK_ADMIN_INVENTORY,
    MOCK_ADMIN_COUPONS,
    MOCK_ADMIN_CATEGORIES,
    MOCK_ADMIN_REVIEWS,
    MOCK_ADMIN_INQUIRIES,
    AdminOrder,
    AdminInventoryItem,
    AdminCoupon,
    AdminCategory,
    AdminReview,
    AdminInquiry
} from './mockData';

export interface InventoryMutationLog {
    id: string;
    productId: string;
    productName: string;
    delta: number;
    previousStock: number;
    newStock: number;
    reason: string;
    timestamp: string;
}

export interface ReturnRecord {
    id: string;
    orderId: string;
    customer: string;
    reason: string;
    status: 'Processing' | 'Approved' | 'Refunded' | 'Rejected';
    amount: string;
    restocked: boolean;
    date: string;
}

const STORAGE_KEYS = {
    INVENTORY: 'gb_mock_inventory',
    ORDERS: 'gb_mock_orders',
    RETURNS: 'gb_mock_returns',
    LOGS: 'gb_mock_tx_logs',
    CONTENT: 'gb_mock_content',
    SETTINGS: 'gb_mock_settings',
    COUPONS: 'gb_mock_coupons',
    CATEGORIES: 'gb_mock_categories',
    REVIEWS: 'gb_mock_reviews',
    INQUIRIES: 'gb_mock_inquiries',
};

const DEFAULT_RETURNS: ReturnRecord[] = [
    { id: '#RET-501', orderId: '#GB-1002', customer: 'Priya Das', reason: 'Damaged Packaging in Transit', status: 'Processing', amount: '₹ 899', restocked: false, date: 'Feb 02, 2026' },
    { id: '#RET-502', orderId: '#GB-0980', customer: 'Subhashish Roy', reason: 'Wrong Variant Delivered', status: 'Refunded', amount: '₹ 499', restocked: true, date: 'Jan 28, 2026' },
];

export const DEFAULT_CONTENT = {
    hero: {
        title: 'Authentic Taste of Nature',
        subtitle: 'Discover pure, farm-fresh Patali Gur & Nolen Gur – a traditional Bengal delicacy handcrafted with love from date palms of Nadia.',
        ctaLabel: 'Explore Winter Combos',
        ctaLink: '#products',
        announcement: '✈️ Free Pan-India Delivery on all Orders!'
    },
    banners: [
        { id: 1, title: 'Winter Jaggery Super Saver Collection', image: '/images/banner-poster-4.webp', link: '#products', status: 'Active' },
        { id: 2, title: 'Artisanal Fresh Dawn Date Palm Tapping', image: '/images/banner-poster-2.webp', link: '#values', status: 'Active' },
        { id: 3, title: 'Bulk Gifting & Family Festive Bundles', image: '/images/banner-poster-3.webp', link: '#contact', status: 'Draft' },
    ],
    videos: [
        { id: 1, title: 'The Traditional Art of Nolen Gur Tapping at Dawn', url: 'https://youtube.com/watch?v=1', status: 'Published', views: '24.5k' },
        { id: 2, title: 'Zero Adulteration: Laboratory Purity Test of Patali Gur', url: 'https://youtube.com/watch?v=2', status: 'Published', views: '18.2k' },
        { id: 3, title: 'Traditional Winter Sweet Recipes (Pithe Puli)', url: 'https://youtube.com/watch?v=3', status: 'Draft', views: '0' },
    ],
    testimonials: [
        { id: 1, name: 'Sharmistha Sikdar', role: 'Verified Buyer', location: 'Kolkata, WB', comment: 'Very nice and tasty Patali Gur. Packed with genuine village aroma. Ordered 3 boxes again!', rating: 5 },
        { id: 2, name: 'Sangita Sarkar', role: 'Home Chef', location: 'Bengaluru, KA', comment: 'Khub bhalo taste... akdom fresh and delivery was super fast pan-India.', rating: 5 },
        { id: 3, name: 'Rohit Sen', role: 'Food Critic', location: 'Delhi NCR', comment: 'Pure & authentic product. Took me back to childhood winter mornings in rural Bengal.', rating: 5 },
    ],
    legal: {
        privacy: `GramBahar respects customer privacy. We collect minimal customer delivery information (name, address, phone number) strictly for fulfilling orders and courier delivery dispatch.`,
        returns: `We accept return or replacement requests within 7 days of delivery in case of transit damage, seal tampering, or wrong product received. Photographic proof required.`,
        refunds: `Refunds are processed within 24-48 hours via original payment source or direct UPI refund upon receipt and inspection of returned batch.`,
        shipping: `All orders are dispatched within 24 hours of confirmation. Free Pan-India standard shipping with delivery timeline of 2-5 business days.`,
        terms: `By using the GramBahar portal, customers agree to authentic artisan supply terms. All weights and nutritional values reflect pure unprocessed natural date palm jaggery.`
    },
    about: {
        subtitle: 'Our Heritage',
        title: 'Preserving Bengal’s Authentic Date Palm Sweetness',
        text1: 'GramBahar was founded in Ranaghat, Nadia, to support local date palm Siuli artisans and deliver unadulterated jaggery to households worldwide without chemical preservatives.',
        stats: '200+ Farmer Families Supported | 20,000+ Happy Customers | 70 Years Legacy'
    },
    contact: {
        supportEmail: 'care@grambahar.com',
        helpline: '+91 9531536706',
        address: 'Ranaghat, Nadia District, West Bengal - 741201',
        whatsappNote: 'Support available Monday to Sunday, 8 AM - 10 PM IST.'
    }
};

/* --- Event Dispatcher for Real-Time Sync Across Components --- */
function notifyMockStoreChange(storeName: string) {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('gb_mock_store_update', { detail: { store: storeName } }));
    }
}

/* =========================================================================
   1. INVENTORY ACID MUTATION SIMULATOR
   ========================================================================= */

export function getMockInventory(): AdminInventoryItem[] {
    return safeGetStorage<AdminInventoryItem[]>(STORAGE_KEYS.INVENTORY, MOCK_ADMIN_INVENTORY);
}

export function getInventoryLogs(): InventoryMutationLog[] {
    return safeGetStorage<InventoryMutationLog[]>(STORAGE_KEYS.LOGS, []);
}

/**
 * ACID Transaction Simulator for Inventory Mutations
 * Atomically deducts or adds inventory stock, updates product status, and records an immutable log.
 */
export function mutateInventoryStock(
    productId: string,
    delta: number,
    reason: string
): { success: boolean; error?: string; updatedItem?: AdminInventoryItem } {
    const items = getMockInventory();
    const itemIndex = items.findIndex(i => i.id === productId || i.name.toLowerCase().includes(productId.toLowerCase()));

    if (itemIndex === -1) {
        return { success: false, error: `Product not found: "${productId}"` };
    }

    const currentItem = items[itemIndex];
    const previousStock = currentItem.stock;
    const newStock = previousStock + delta;

    if (newStock < 0) {
        return {
            success: false,
            error: `Insufficient stock for "${currentItem.name}". Available: ${previousStock}, Requested deduction: ${Math.abs(delta)}`
        };
    }

    // Determine status atomically
    let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
    if (newStock === 0) {
        status = 'Out of Stock';
    } else if (newStock <= 10) {
        status = 'Low Stock';
    }

    const updatedItem: AdminInventoryItem = {
        ...currentItem,
        stock: newStock,
        status
    };

    items[itemIndex] = updatedItem;
    safeSetStorage(STORAGE_KEYS.INVENTORY, items);

    // Record Transaction Log
    const logs = getInventoryLogs();
    const newLog: InventoryMutationLog = {
        id: `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        productId: currentItem.id,
        productName: currentItem.name,
        delta,
        previousStock,
        newStock,
        reason,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    logs.unshift(newLog);
    safeSetStorage(STORAGE_KEYS.LOGS, logs.slice(0, 50)); // Keep last 50 logs

    notifyMockStoreChange('inventory');
    return { success: true, updatedItem };
}

export function addMockProduct(item: Omit<AdminInventoryItem, 'id' | 'status'>): AdminInventoryItem {
    const items = getMockInventory();
    const id = `P-${Date.now().toString().slice(-4)}`;
    const status = item.stock === 0 ? 'Out of Stock' : (item.stock <= 10 ? 'Low Stock' : 'In Stock');
    const newItem: AdminInventoryItem = { ...item, id, status };
    items.unshift(newItem);
    safeSetStorage(STORAGE_KEYS.INVENTORY, items);
    notifyMockStoreChange('inventory');
    return newItem;
}

/* =========================================================================
   2. ORDERS & RETURNS LIFECYCLE MUTATION SIMULATOR
   ========================================================================= */

export function getMockOrders(): AdminOrder[] {
    return safeGetStorage<AdminOrder[]>(STORAGE_KEYS.ORDERS, MOCK_ADMIN_ORDERS);
}

export function updateOrderStatus(
    orderId: string,
    newStatus: AdminOrder['status']
): { success: boolean; order?: AdminOrder } {
    const orders = getMockOrders();
    const index = orders.findIndex(o => o.id === orderId);

    if (index === -1) return { success: false };

    orders[index] = { ...orders[index], status: newStatus };
    safeSetStorage(STORAGE_KEYS.ORDERS, orders);

    // If order was dispatched/shipped, execute simulated inventory mutation
    if (newStatus === 'Shipped') {
        mutateInventoryStock(orders[index].product, -1, `Order ${orderId} Dispatched`);
    }

    notifyMockStoreChange('orders');
    return { success: true, order: orders[index] };
}

export function createMockOrder(order: {
    customer: string;
    product: string;
    amount: string;
    quantity?: number;
}): { success: boolean; order: AdminOrder; txResult: ReturnType<typeof mutateInventoryStock> } {
    const orders = getMockOrders();
    const newId = `#GB-${1000 + orders.length + 1}`;
    const newOrder: AdminOrder = {
        id: newId,
        customer: order.customer,
        product: order.product,
        amount: order.amount,
        status: 'Paid',
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' })
    };

    orders.unshift(newOrder);
    safeSetStorage(STORAGE_KEYS.ORDERS, orders);

    // Atomically decrement inventory
    const txResult = mutateInventoryStock(
        order.product,
        -(order.quantity || 1),
        `New Order Checkout (${newId})`
    );

    notifyMockStoreChange('orders');
    return { success: true, order: newOrder, txResult };
}

export function getMockReturns(): ReturnRecord[] {
    return safeGetStorage<ReturnRecord[]>(STORAGE_KEYS.RETURNS, DEFAULT_RETURNS);
}

export function processReturnStatus(
    returnId: string,
    action: 'Approved' | 'Refunded' | 'Rejected',
    shouldRestock = false
): boolean {
    const returns = getMockReturns();
    const index = returns.findIndex(r => r.id === returnId);
    if (index === -1) return false;

    returns[index].status = action;
    if (shouldRestock && !returns[index].restocked) {
        returns[index].restocked = true;
        // Restock inventory atomically
        mutateInventoryStock('Premium Patali Gur', 1, `Return ${returnId} Restocked`);
    }

    safeSetStorage(STORAGE_KEYS.RETURNS, returns);
    notifyMockStoreChange('returns');
    return true;
}

/* =========================================================================
   3. CONTENT MANAGEMENT STORE
   ========================================================================= */

export function getMockContent<K extends keyof typeof DEFAULT_CONTENT>(key: K): (typeof DEFAULT_CONTENT)[K] {
    const store = safeGetStorage<typeof DEFAULT_CONTENT>(STORAGE_KEYS.CONTENT, DEFAULT_CONTENT);
    return store[key] || DEFAULT_CONTENT[key];
}

export function updateMockContent<K extends keyof typeof DEFAULT_CONTENT>(
    key: K,
    value: (typeof DEFAULT_CONTENT)[K]
): void {
    const store = safeGetStorage<typeof DEFAULT_CONTENT>(STORAGE_KEYS.CONTENT, DEFAULT_CONTENT);
    store[key] = value;
    safeSetStorage(STORAGE_KEYS.CONTENT, store);
    notifyMockStoreChange('content');
}

/* =========================================================================
   4. GLOBAL SETTINGS STORE
   ========================================================================= */

export interface AdminSettings {
    siteTitle: string;
    metaDescription: string;
    keywords: string;
    deliveryCharge: number;
    freeShippingThreshold: number;
    currencySymbol: string;
    lowStockThreshold: number;
    emailAlerts: boolean;
    smsAlerts: boolean;
    autoInvoice: boolean;
}

export const DEFAULT_SETTINGS: AdminSettings = {
    siteTitle: 'GramBahar | Authentic Taste of Nature',
    metaDescription: 'GramBahar: Discover pure, farm-fresh Patali Gur & Nolen Gur – a Bengal delicacy with rich, natural sweetness.',
    keywords: 'Patali Gur, Nolen Gur, Date Palm Jaggery, Farm Fresh, Authentic Bengal, Ranaghat',
    deliveryCharge: 0,
    freeShippingThreshold: 0,
    currencySymbol: '₹',
    lowStockThreshold: 10,
    emailAlerts: true,
    smsAlerts: true,
    autoInvoice: true,
};

export function getMockSettings(): AdminSettings {
    return safeGetStorage<AdminSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export function updateMockSettings(settings: AdminSettings): void {
    safeSetStorage(STORAGE_KEYS.SETTINGS, settings);
    notifyMockStoreChange('settings');
}

/* =========================================================================
   5. COUPONS & OFFERS STORE
   ========================================================================= */

export function getMockCoupons(): AdminCoupon[] {
    return safeGetStorage<AdminCoupon[]>(STORAGE_KEYS.COUPONS, MOCK_ADMIN_COUPONS);
}

export function saveMockCoupon(coupon: AdminCoupon): void {
    const list = getMockCoupons();
    const index = list.findIndex(c => c.id === coupon.id);
    if (index >= 0) {
        list[index] = coupon;
    } else {
        list.unshift(coupon);
    }
    safeSetStorage(STORAGE_KEYS.COUPONS, list);
    notifyMockStoreChange('coupons');
}

export function toggleMockCoupon(id: string): void {
    const list = getMockCoupons();
    const index = list.findIndex(c => c.id === id);
    if (index >= 0) {
        list[index].isActive = !list[index].isActive;
        safeSetStorage(STORAGE_KEYS.COUPONS, list);
        notifyMockStoreChange('coupons');
    }
}

export function deleteMockCoupon(id: string): void {
    const list = getMockCoupons().filter(c => c.id !== id);
    safeSetStorage(STORAGE_KEYS.COUPONS, list);
    notifyMockStoreChange('coupons');
}

/* =========================================================================
   6. CATEGORIES & COLLECTIONS STORE
   ========================================================================= */

export function getMockCategories(): AdminCategory[] {
    return safeGetStorage<AdminCategory[]>(STORAGE_KEYS.CATEGORIES, MOCK_ADMIN_CATEGORIES);
}

export function saveMockCategory(category: AdminCategory): void {
    const list = getMockCategories();
    const index = list.findIndex(c => c.id === category.id);
    if (index >= 0) {
        list[index] = category;
    } else {
        list.push(category);
    }
    safeSetStorage(STORAGE_KEYS.CATEGORIES, list);
    notifyMockStoreChange('categories');
}

export function deleteMockCategory(id: string): void {
    const list = getMockCategories().filter(c => c.id !== id);
    safeSetStorage(STORAGE_KEYS.CATEGORIES, list);
    notifyMockStoreChange('categories');
}

/* =========================================================================
   7. REVIEWS & RATINGS STORE
   ========================================================================= */

export function getMockReviews(): AdminReview[] {
    return safeGetStorage<AdminReview[]>(STORAGE_KEYS.REVIEWS, MOCK_ADMIN_REVIEWS);
}

export function updateMockReviewStatus(id: string, status: 'Approved' | 'Pending' | 'Rejected'): void {
    const list = getMockReviews();
    const index = list.findIndex(r => r.id === id);
    if (index >= 0) {
        list[index].status = status;
        safeSetStorage(STORAGE_KEYS.REVIEWS, list);
        notifyMockStoreChange('reviews');
    }
}

export function deleteMockReview(id: string): void {
    const list = getMockReviews().filter(r => r.id !== id);
    safeSetStorage(STORAGE_KEYS.REVIEWS, list);
    notifyMockStoreChange('reviews');
}

/* =========================================================================
   8. CUSTOMER INQUIRIES & LEADS STORE
   ========================================================================= */

export function getMockInquiries(): AdminInquiry[] {
    return safeGetStorage<AdminInquiry[]>(STORAGE_KEYS.INQUIRIES, MOCK_ADMIN_INQUIRIES);
}

export function updateMockInquiryStatus(id: string, status: 'New' | 'In Progress' | 'Resolved'): void {
    const list = getMockInquiries();
    const index = list.findIndex(i => i.id === id);
    if (index >= 0) {
        list[index].status = status;
        safeSetStorage(STORAGE_KEYS.INQUIRIES, list);
        notifyMockStoreChange('inquiries');
    }
}

