import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Background SVG illustration */}
      <div className={styles.bgSvg}>
        <Image
          src="/images/footer-bg-img.svg"
          alt="Footer Background"
          fill
          sizes="400px"
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className={`container ${styles.footerGrid}`}>
        {/* Brand Column */}
        <div>
          <Link href="/" className={styles.logo}>
            <Image
              src="/grambahar_logo.png"
              alt="Gram Bahar Logo"
              width={38}
              height={38}
              className={styles.logoImg}
            />
            <div className={styles.logoText}>GramBahar</div>
          </Link>
          <p className={styles.brandDesc}>
            Bringing you the finest, natural ingredients straight from the farm. Authentic taste, pure tradition, direct from the date palms of Bengal.
          </p>
          <div className={styles.socials}>
            <a
              href="https://www.facebook.com/profile.php?id=100092955764879"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GramBahar Facebook"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href="https://www.instagram.com/gram_bahar/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GramBahar Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://wa.me/+919531536706?text=Hello%20Grambahar"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GramBahar WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        {/* Policies Column */}
        <div className={styles.column}>
          <h3>Our Policies</h3>
          <ul>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/return-policy">Return Policy</Link></li>
            <li><Link href="/refund-cancellation-policy">Refund/Cancellation Policy</Link></li>
            <li><Link href="/shipping-policy">Shipping Policy</Link></li>
            <li><Link href="/cookie-policy">Cookie Policy</Link></li>
            <li><Link href="/terms-of-services">Terms of Services</Link></li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className={styles.column}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about-us">About Us</Link></li>
            <li><Link href="#products">Our Products</Link></li>
            <li><Link href="#values">Our Values</Link></li>
            <li><Link href="/contact-us">Contact Us</Link></li>
            <li>
              <a
                href="https://wa.me/+919531536706?text=Hello%20Gram%20Bahar%2C%20I%20am%20interested%20in%20buying%20in%20bulk."
                target="_blank"
                rel="noopener noreferrer"
              >
                Wholesale / Bulk
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className={`${styles.column} ${styles.contactInfo}`}>
          <h3>Contact Us</h3>
          <p><MapPin size={16} style={{ display: 'inline', marginRight: 6 }} /> Ranaghat, Nadia, WB, IN - 741201</p>
          <p><Mail size={16} style={{ display: 'inline', marginRight: 6 }} /> <a href="mailto:grambahar.com@gmail.com">grambahar.com@gmail.com</a></p>
          <p><Phone size={16} style={{ display: 'inline', marginRight: 6 }} /> <a href="tel:+919531536706">+91 9531536706</a></p>
          <p><Phone size={16} style={{ display: 'inline', marginRight: 6 }} /> <a href="tel:+919883214823">+91 9883214823</a></p>
          <a
            href="https://wa.me/+919531536706?text=Hello%20Grambahar"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappLink}
          >
            <MessageCircle size={16} /> WhatsApp Support
          </a>
        </div>
      </div>

      <div className="container">
        <div className={styles.bottomBar}>
          <p>&copy; {currentYear} GramBahar. All rights reserved.</p>
          <p>
            Made with love by{' '}
            <a href="https://mepritam.dev" target="_blank" rel="noopener noreferrer">
              meghoshpritam
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
