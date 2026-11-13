'use client';

import React from 'react';
import styles from './FloatingWhatsApp.module.css';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, CONTACT_INFO } from '@/core/Helpers';

export default function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppUrl(`Hello ${CONTACT_INFO.brandName}`)}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.floatingBtn}
      aria-label={`Chat with ${CONTACT_INFO.brandName} on WhatsApp`}
    >
      <div className={styles.pulse} />
      <MessageCircle size={32} />
    </a>
  );
}

