'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product } from '@/data/siteData';
import {
  buildWhatsAppOrderMessage,
  getWhatsAppUrl,
  safeGetStorage,
  safeSetStorage,
  CustomerInfo,
  createMockOrder,
  formatPrice
} from '@/core/Helpers';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  totalSavings: number;
  checkoutWhatsApp: (customer: { name: string; phone: string; address: string }) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const isMounted = useRef(false);

  // Safe client hydration from localStorage
  useEffect(() => {
    const saved = safeGetStorage<CartItem[]>('gb_cart', []);
    if (saved.length > 0) {
      queueMicrotask(() => {
        setItems(saved);
      });
    }
    isMounted.current = true;
  }, []);

  // Sync to localStorage safely after initial mount
  useEffect(() => {
    if (!isMounted.current) return;
    safeSetStorage('gb_cart', items);
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalSavings = items.reduce(
    (sum, item) => sum + (item.product.originalPrice - item.product.price) * item.quantity,
    0
  );

  const checkoutWhatsApp = (customer: CustomerInfo) => {
    if (items.length === 0) return;

    const message = buildWhatsAppOrderMessage(items, customer, subtotal, totalSavings);
    const whatsappUrl = getWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Register simulated order and trigger atomic inventory deduction
    createMockOrder({
      customer: customer.name,
      product: items.map(i => `${i.product.name} (${i.quantity}x)`).join(', '),
      amount: formatPrice(subtotal),
      quantity: totalItems
    });

    clearCart();
    closeCart();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        totalSavings,
        checkoutWhatsApp
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

