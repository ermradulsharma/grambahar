"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.gram}>Gram</span>
                    <span className={styles.bahar}>Bahar</span>
                </Link>
                <ul className={styles.navLinks}>
                    <li><Link href="#about">About</Link></li>
                    <li><Link href="#products">Products</Link></li>
                    <li><Link href="#values">Our Values</Link></li>
                    <li className={styles.themeToggle}>
                        <button onClick={toggleTheme} className={styles.toggleBtn}>
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                    </li>
                    <li><Link href="#contact" className="btn btn-primary">Contact Us</Link></li>
                </ul>
            </div>
        </nav>
    );
}
