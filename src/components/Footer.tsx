import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandInfo}>
          <Link href="/" className={styles.logo}>
            <span className={styles.gram}>Gram</span>
            <span className={styles.bahar}>Bahar</span>
          </Link>
          <p>Bringing you the finest, natural ingredients straight from the farm. Authentic taste, pure tradition.</p>
          <div className={styles.socials}>
            {/* Social icons can be added here */}
          </div>
        </div>

        <div className={styles.links}>
          <h3>Our Policies</h3>
          <ul className={styles.footerList}>
            <li><Link href="/policy/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/policy/return-policy">Return Policy</Link></li>
            <li><Link href="/policy/refund-cancellation-policy">Refund/Cancellation Policy</Link></li>
            <li><Link href="/policy/shipping-policy">Shipping Policy</Link></li>
            <li><Link href="/policy/cookie-policy">Cookie Policy</Link></li>
            <li><Link href="/policy/terms-of-services">Terms of Services</Link></li>
          </ul>
        </div>

        <div className={styles.links}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="#about">About Us</Link></li>
            <li><Link href="#products">Our Products</Link></li>
            <li><Link href="#contact">Contact Us</Link></li>
            <li><Link href="#">Wholesale</Link></li>
          </ul>
        </div>

        <div className={styles.contact}>
          <h3>Contact Us</h3>
          <p>Ranaghat, Nadia, WB, IN</p>
          <p>Email: grambahar.com@gmail.com</p>
          <p>Phone: +91 9531536706</p>
          <a href="https://wa.me/+919531536706" className={styles.whatsapp}>
            WhatsApp Support
          </a>
        </div>
      </div>
      <div className={styles.copy}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()}, GramBahar. All rights reserved. Made with love.</p>
        </div>
      </div>
    </footer>
  );
}
