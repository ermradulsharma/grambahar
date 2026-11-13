'use client';

import React, { useState } from 'react';
import { Card, Tabs } from '@/components/ui';
import styles from '@/components/admin/admin.module.css';

import HeroEditor from './editors/HeroEditor';
import BannersEditor from './editors/BannersEditor';
import VideosEditor from './editors/VideosEditor';
import TestimonialsEditor from './editors/TestimonialsEditor';
import LegalEditor from './editors/LegalEditor';
import AboutEditor from './editors/AboutEditor';
import ContactEditor from './editors/ContactEditor';

export default function ContentManager() {
    const [activeTab, setActiveTab] = useState('hero');

    const contentTabs = [
        { id: 'hero', label: 'Hero Banner' },
        { id: 'banners', label: 'Promotional Banners' },
        { id: 'videos', label: 'Video Reels' },
        { id: 'testimonials', label: 'Customer Reviews' },
        { id: 'legal', label: 'Legal Policies' },
        { id: 'about', label: 'Our Story' },
        { id: 'contact', label: 'Contact Info' },
    ];

    return (
        <div style={{ marginTop: '8px', animation: 'fadeIn 0.3s ease-in-out' }}>
            <div className={styles.sectionHeader}>
                <div>
                    <h2 className={styles.sectionHeading}>Website Content Manager</h2>
                    <p className={styles.sectionSubheading}>
                        Manage marketing banners, customer feedback, multimedia reels, and compliance policies
                    </p>
                </div>
            </div>

            <Tabs tabs={contentTabs} activeTab={activeTab} onChange={setActiveTab} />

            <Card padding="28px">
                {activeTab === 'hero' && <HeroEditor />}
                {activeTab === 'banners' && <BannersEditor />}
                {activeTab === 'videos' && <VideosEditor />}
                {activeTab === 'testimonials' && <TestimonialsEditor />}
                {activeTab === 'legal' && <LegalEditor />}
                {activeTab === 'about' && <AboutEditor />}
                {activeTab === 'contact' && <ContactEditor />}
            </Card>
        </div>
    );
}
