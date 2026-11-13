/**
 * Centralized Validation Schemas & Helpers
 */

export interface CustomerInfo {
    name: string;
    phone: string;
    address: string;
}

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

/**
 * Validates 10-digit Indian mobile number format with optional +91 or 0 prefix
 */
export function isValidIndianPhone(phone: string): boolean {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(cleaned);
}

/**
 * Validates checkout customer details
 */
export function validateCustomerInfo(customer: CustomerInfo): ValidationResult {
    if (!customer.name || customer.name.trim().length < 2) {
        return { isValid: false, error: 'Please enter a valid customer name (at least 2 characters).' };
    }

    if (!customer.phone || customer.phone.trim().length < 8) {
        return { isValid: false, error: 'Please enter a valid contact/WhatsApp phone number.' };
    }

    if (!customer.address || customer.address.trim().length < 5) {
        return { isValid: false, error: 'Please provide a full delivery address including city and pincode.' };
    }

    return { isValid: true };
}

