/**
 * Safe Browser LocalStorage Helpers (SSR-safe with try/catch)
 */

export function safeGetStorage<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
        const item = window.localStorage.getItem(key);
        if (!item) return fallback;
        return JSON.parse(item) as T;
    } catch (err) {
        console.warn(`[storage] Failed to parse key "${key}" from localStorage:`, err);
        return fallback;
    }
}

export function safeSetStorage<T>(key: string, value: T): boolean {
    if (typeof window === 'undefined') return false;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (err) {
        console.warn(`[storage] Failed to save key "${key}" to localStorage:`, err);
        return false;
    }
}

export function safeRemoveStorage(key: string): void {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.removeItem(key);
    } catch (err) {
        console.warn(`[storage] Failed to remove key "${key}" from localStorage:`, err);
    }
}

