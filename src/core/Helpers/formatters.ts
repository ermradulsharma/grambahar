/**
 * Core Formatting Utilities for GramBahar
 * Centralized under src/core/Helpers/ adhering to DRY
 */

/**
 * Formats a numeric amount to INR currency display format (e.g., 499 -> "₹ 499.00" or "₹ 499")
 */
export function formatPrice(amount: number, includeDecimals = true): string {
    if (isNaN(amount)) return '₹ 0.00';
    const formatted = new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: includeDecimals ? 2 : 0,
        maximumFractionDigits: includeDecimals ? 2 : 0,
    }).format(amount);
    return `₹ ${formatted}`;
}

/**
 * Formats standard currency amounts
 */
export function formatCurrency(amount: number): string {
    return formatPrice(amount, false);
}

/**
 * Formats date to human-readable string (e.g., "Feb 01, 2026")
 */
export function formatDate(date: string | Date | number): string {
    try {
        const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
        return new Intl.DateTimeFormat('en-IN', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).format(d);
    } catch {
        return String(date);
    }
}

