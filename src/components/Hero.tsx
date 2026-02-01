import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <Image 
          src="/assets/hero.png" 
          alt="Authentic GramBahar Patali Gur" 
          fill 
          priority
          className={styles.heroImage}
        />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={`container ${styles.heroContent}`}>
        <h1 className={styles.title}>
          Authentic <span className={styles.highlight}>Taste</span> of Nature
        </h1>
        <p className={styles.subtitle}>
          Discover pure, Farm-Fresh Patali Gur – a traditional Bengal delicacy 
          handcrafted with love and rooted in heritage.
        </p>
        <div className={styles.cta}>
          <a href="#products" className="btn btn-secondary">Explore Products</a>
          <a href="#about" className="btn btn-primary" style={{ border: '1px solid var(--secondary)' }}>Learn Our Story</a>
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <span></span>
      </div>
    </section>
  );
}
