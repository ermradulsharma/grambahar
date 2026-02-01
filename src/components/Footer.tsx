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
          <ul>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Return Policy</Link></li>
            <li><Link href="#">Shipping Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
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
