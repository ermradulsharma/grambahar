import React from 'react';
import Image from 'next/image';
import { VALUES } from '@/data/siteData';
import styles from './Values.module.css';

export default function Values() {
  return (
    <section id="values" className={styles.values}>
      <div className="container">
        <div className={styles.titleArea}>
          <p className={styles.subtitle}>The GramBahar Philosophy</p>
          <h2 className={styles.heading}>We believe in</h2>
        </div>

        <div className={styles.grid}>
          {VALUES.map((val, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconWrapper}>
                <Image
                  src={val.icon}
                  alt={val.title}
                  width={56}
                  height={56}
                  className={styles.iconImg}
                />
              </div>
              <h3 className={styles.cardTitle}>{val.title}</h3>
              <p className={styles.cardDesc}>{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
