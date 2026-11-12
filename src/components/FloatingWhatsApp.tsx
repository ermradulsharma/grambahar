'use client';

import React from 'react';
import styles from './FloatingWhatsApp.module.css';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/+919531536706?text=Hello%20Grambahar"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatingBtn}
      aria-label="Chat with GramBahar on WhatsApp"
    >
      <div className={styles.pulse} />
      <MessageCircle size={32} />
    </a>
  );
}

