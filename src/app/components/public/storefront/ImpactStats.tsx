import React from 'react';
import { STATS } from '@/data/siteData';
import styles from './ImpactStats.module.css';

export default function ImpactStats() {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.grid}>
          {STATS.map((stat, idx) => (
            <div key={idx} className={styles.statItem}>
              <div className={styles.number}>{stat.value}</div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

