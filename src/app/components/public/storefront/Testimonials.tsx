import React from 'react';
import { TESTIMONIALS } from '@/data/siteData';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className="container">
        <div className={styles.titleArea}>
          <p className={styles.subtitle}>Verified Reviews</p>
          <h2 className={styles.heading}>What Do Our Customers Say</h2>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map(t => (
            <div key={t.id} className={styles.card}>
              <div className={styles.rating}>
                {'★'.repeat(t.rating)}
              </div>
              <p className={styles.text}>&ldquo;{t.text}&rdquo;</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.initial}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.location}>{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
