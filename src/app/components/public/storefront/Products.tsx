'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PRODUCTS, Product } from '@/data/siteData';
import { useCart } from '@/context/CartContext';
import styles from './Products.module.css';
import { ShoppingBag, Check } from 'lucide-react';
import { formatPrice } from '@/core/Helpers';

export default function Products() {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'combo-small': 1,
    'nolen-gur-750': 1,
    'combo-family': 1
  });
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="products" className={styles.products}>
      <div className="container">
        <div className={styles.titleArea}>
          <p className={styles.category}>Our Winter Specials</p>
          <h2 className={styles.heading}>Super Saver Combos</h2>
        </div>

        <div className={styles.grid}>
          {PRODUCTS.map(product => {
            const qty = quantities[product.id] || 1;
            const isAdded = addedIds[product.id];

            return (
              <div key={product.id} className={styles.card}>
                <div className={styles.badge}>{product.discount}</div>
                <div className={styles.imageWrapper}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.info}>
                  <span className={styles.weight}>{product.weight}</span>
                  <h3 className={styles.productTitle}>{product.name}</h3>

                  <div className={styles.pricing}>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                    <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                  </div>

                  <div className={styles.bestPriceTag}>
                    Best Price {formatPrice(product.bestPrice)} *
                  </div>

                  <div className={styles.actions}>
                    <div className={styles.qtyControl}>
                      <button
                        onClick={() => handleQtyChange(product.id, -1)}
                        className={styles.qtyBtn}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className={styles.qtyVal}>{qty}</span>
                      <button
                        onClick={() => handleQtyChange(product.id, 1)}
                        className={styles.qtyBtn}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={styles.addBtn}
                    >
                      {isAdded ? (
                        <>
                          <Check size={18} /> Added!
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={18} /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
