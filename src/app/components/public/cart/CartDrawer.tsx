'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';
import { X, Trash2, MessageCircle } from 'lucide-react';
import { formatPrice, validateCustomerInfo } from '@/core/Helpers';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalSavings,
    checkoutWhatsApp
  } = useCart();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [formError, setFormError] = useState<string | null>(null);

  const handleCheckout = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const validation = validateCustomerInfo(customer);
    if (!validation.isValid) {
      setFormError(validation.error || 'Please provide all delivery details.');
      return;
    }
    setFormError(null);
    checkoutWhatsApp(customer);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={closeCart}
      />
      <aside className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.header}>
          <h2>Your Cart ({items.length})</h2>
          <button onClick={closeCart} className={styles.closeBtn} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🍯</div>
              <div className={styles.emptyTitle}>Your cart is empty</div>
              <p className={styles.emptyText}>
                Taste the pure, unadulterated sweetness of Bengal. Explore our winter combos!
              </p>
              <button
                onClick={closeCart}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Shop Now
              </button>
            </div>
          ) : (
            <>
              <div className={styles.itemList}>
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className={styles.itemCard}>
                    <div style={{ position: 'relative', width: 70, height: 70 }}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="70px"
                        style={{ objectFit: 'cover', borderRadius: 8 }}
                      />
                    </div>
                    <div className={styles.itemDetails}>
                      <div className={styles.itemName}>{product.name}</div>
                      <span className={styles.itemWeight}>{product.weight}</span>
                      <div className={styles.itemPrice}>{formatPrice(product.price * quantity)}</div>
                    </div>
                    <div className={styles.itemControls}>
                      <div className={styles.quantityGroup}>
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className={styles.qtyBtn}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className={styles.qtyValue}>{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className={styles.qtyBtn}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className={styles.removeBtn}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <form id="cart-checkout-form" onSubmit={handleCheckout} className={styles.customerForm}>
                <div className={styles.customerFormTitle}>Delivery Details</div>
                {formError && (
                  <div style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: 10 }}>
                    {formError}
                  </div>
                )}
                <div className={styles.inputField}>
                  <label htmlFor="name">Your Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={customer.name}
                    onChange={e => setCustomer({ ...customer, name: e.target.value })}
                  />
                </div>
                <div className={styles.inputField}>
                  <label htmlFor="phone">Phone / WhatsApp Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={customer.phone}
                    onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                  />
                </div>
                <div className={styles.inputField}>
                  <label htmlFor="address">Full Delivery Address *</label>
                  <textarea
                    id="address"
                    rows={2}
                    required
                    placeholder="Street, City, State, Pincode"
                    value={customer.address}
                    onChange={e => setCustomer({ ...customer, address: e.target.value })}
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            {totalSavings > 0 && (
              <div className={styles.savingsBadge}>
                🎉 You are saving {formatPrice(totalSavings)} on this order!
              </div>
            )}
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Delivery:</span>
              <span style={{ color: '#15803d', fontWeight: 600 }}>FREE</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total Payable:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button
              type="submit"
              form="cart-checkout-form"
              className={styles.whatsappCheckoutBtn}
            >
              <MessageCircle size={20} />
              Order via WhatsApp
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

