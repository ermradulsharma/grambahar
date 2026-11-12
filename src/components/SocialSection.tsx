import React from 'react';
import Image from 'next/image';
import { SOCIAL_POSTS } from '@/data/siteData';
import styles from './SocialSection.module.css';
import { ExternalLink } from 'lucide-react';

export default function SocialSection() {
  return (
    <section className={styles.socialSection}>
      <div className="container">
        <div className={styles.titleArea}>
          <p className={styles.subtitle}>Community & Culinary Creations</p>
          <h2 className={styles.heading}>Join Us On Social Media</h2>
        </div>

        <div className={styles.grid}>
          {SOCIAL_POSTS.map(post => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.image}
              />
              <div className={styles.overlay}>
                <p className={styles.postTitle}>{post.title}</p>
                <div className={styles.viewAction}>
                  Watch on Social Media <ExternalLink size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

