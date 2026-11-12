'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { Sun, Moon, ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/grambahar_logo.png"
            alt="Gram Bahar Logo"
            width={40}
            height={40}
            className={styles.logoImg}
            priority
          />
          <div className={styles.logoText}>
            <span className={styles.gram}>Gram</span>
            <span className={styles.bahar}>Bahar</span>
          </div>
        </Link>

        <ul className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksOpen : ''}`}>
          {mobileMenuOpen && (
            <li style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </li>
          )}
          <li>
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about-us" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="#products" onClick={() => setMobileMenuOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <Link href="#values" onClick={() => setMobileMenuOpen(false)}>
              Values
            </Link>
          </li>
          <li>
            <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </Link>
          </li>
        </ul>

        <div className={styles.navActions}>
          <button
            onClick={openCart}
            className={styles.cartBtn}
            aria-label="View shopping cart"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
          </button>

          <button
            onClick={toggleTheme}
            className={styles.toggleBtn}
            aria-label="Toggle Theme"
          >
            {!mounted ? (
              <div style={{ width: 18, height: 18 }} />
            ) : theme === 'light' ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>

          <button
            className={styles.hamburgerBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
