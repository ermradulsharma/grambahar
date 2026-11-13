/**
 * Centralized Contact Details & WhatsApp Configuration
 */

export const CONTACT_INFO = {
    brandName: 'GramBahar',
    tagline: 'Authentic Taste of Nature',
    primaryPhone: '+919531536706',
    displayPhone: '+91 9531536706',
    email: 'care@grambahar.com',
    location: 'Ranaghat, Nadia, West Bengal, India',
    whatsappNumber: '+919531536706',
    defaultWhatsAppGreeting: 'Hello Grambahar, I have a query about your authentic Patali Gur products.'
} as const;

/**
 * Builds a direct WhatsApp chat URL with encoded text query
 */
export function getWhatsAppUrl(customMessage?: string): string {
    const message = customMessage || CONTACT_INFO.defaultWhatsAppGreeting;
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encoded}`;
}

/**
 * Builds standard tel: URL
 */
export function getPhoneTelUrl(): string {
    return `tel:${CONTACT_INFO.primaryPhone}`;
}

