'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { HERO_BANNERS } from '@/data/siteData';
import styles from './Hero.module.css';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? HERO_BANNERS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_BANNERS.length);
  };

  const activeBanner = HERO_BANNERS[currentSlide];

  return (
    <section className={styles.hero}>
      <div className={styles.carouselContainer}>
        {HERO_BANNERS.map((banner, idx) => (
          <div
            key={banner.image}
            className={`${styles.slide} ${idx === currentSlide ? styles.slideActive : ''}`}
          >
            <Image
              src={banner.image}
              alt={banner.alt}
              fill
              sizes="100vw"
              priority={idx === 0}
              className={styles.bannerImage}
            />
            <div className={styles.overlay} />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className={`${styles.arrowBtn} ${styles.prevBtn}`}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className={`${styles.arrowBtn} ${styles.nextBtn}`}
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className={`container ${styles.heroContent}`}>
        <span className={styles.tagline}>Winter Harvest Specials</span>
        <h1 className={styles.title}>
          {activeBanner.title}
        </h1>
        <p className={styles.subtitle}>
          {activeBanner.subtitle}
        </p>
        <div className={styles.ctaGroup}>
          <a href="#products" className="btn btn-secondary">
            Explore Combos
          </a>
          <a
            href="https://wa.me/+919531536706?text=Hello%20Gram%20Bahar%2C%20I%20am%20interested%20in%20ordering%20Patali%20Gur."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappCta}
          >
            <MessageCircle size={20} />
            Order on WhatsApp
          </a>
        </div>
      </div>

      <div className={styles.indicators}>
        {HERO_BANNERS.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.indicator} ${idx === currentSlide ? styles.indicatorActive : ''}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
