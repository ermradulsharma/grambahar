import React from 'react';
import styles from './BulkSection.module.css';
import { MessageCircle } from 'lucide-react';

export default function BulkSection() {
  return (
    <section className={styles.bulkSection}>
      <div className="container">
        <div className={styles.banner}>
          <h2 className={styles.title}>Looking to buy in bulk?</h2>
          <p className={styles.text}>
            Our wholesale team is available and will assist you during the process for sweet shops, corporate gifting, or restaurant supplies.
          </p>
          <a
            href="https://wa.me/+919531536706?text=Hello%20Gram%20Bahar%2C%20I%20am%20interested%20in%20buying%20in%20bulk."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btn}
          >
            <MessageCircle size={20} />
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}

