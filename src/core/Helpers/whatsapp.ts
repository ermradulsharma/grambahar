import { formatPrice } from './formatters';
import { CONTACT_INFO } from './contact';
import { CustomerInfo } from './validation';
import { Product } from '@/data/siteData';

export interface CartOrderLineItem {
    product: Product;
    quantity: number;
}

/**
 * Builds standard WhatsApp checkout message string
 */
export function buildWhatsAppOrderMessage(
    items: CartOrderLineItem[],
    customer: CustomerInfo,
    subtotal: number,
    totalSavings: number
): string {
    let message = `🛒 *New Order from ${CONTACT_INFO.brandName} Website*\n\n`;
    message += `*Customer Details:*\n`;
    message += `• Name: ${customer.name?.trim() || 'Not provided'}\n`;
    message += `• Phone: ${customer.phone?.trim() || 'Not provided'}\n`;
    message += `• Delivery Address: ${customer.address?.trim() || 'Not provided'}\n\n`;

    message += `*Items Ordered:*\n`;
    items.forEach((item, idx) => {
        const itemTotal = item.quantity * item.product.price;
        message += `${idx + 1}. ${item.product.name} (${item.product.weight})\n`;
        message += `   Qty: ${item.quantity} × ${formatPrice(item.product.price)} = ${formatPrice(itemTotal)}\n`;
    });

    message += `\n*Total Amount:* ${formatPrice(subtotal)}\n`;
    if (totalSavings > 0) {
        message += `*Total Savings:* ${formatPrice(totalSavings)}\n`;
    }
    message += `*Delivery:* Free Pan-India Delivery 🚚\n\n`;
    message += `Please confirm my order and share payment/delivery timeline. Thank you!`;

    return message;
}

