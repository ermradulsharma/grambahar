import React from 'react';
import styles from './CustomerService.module.css';
import { Phone, MessageCircle, Check } from 'lucide-react';

export default function CustomerService() {
  const points = [
    'Available over WhatsApp or direct call',
    'Continuous support throughout your journey',
    'Easily schedule seasonal reorders',
    'Completely confidential communication'
  ];

  return (
    <section className={styles.serviceSection}>
      <div className="container">
        <div className={styles.box}>
          <div>
            <h2 className={styles.heading}>
              Our Customer Service is 2X the industry standard
            </h2>
            <p className={styles.description}>
              Get prompt help on your queries, bulk orders, and deliveries with our dedicated support team, always around to answer your questions.
            </p>
            <div className={styles.ctaGroup}>
              <a href="tel:+919531536706" className={styles.phoneBtn}>
                <Phone size={18} />
                Call +91 9531536706
              </a>
              <a
                href="https://wa.me/+919531536706?text=Hello%20Grambahar%2C%20I%20have%20a%20query%20about%20my%20order."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>

          <ul className={styles.featureList}>
            {points.map((pt, idx) => (
              <li key={idx} className={styles.featureItem}>
                <div className={styles.checkIcon}>
                  <Check size={16} strokeWidth={3} />
                </div>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

