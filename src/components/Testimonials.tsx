'use client';

import React from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        id: 1,
        name: 'Ananya Chatterjee',
        role: 'Home Maker',
        content: "I've tried many brands, but GramBahar's Patali Gur is exactly like what we used to get in our village. The aroma and texture are perfect!",
        rating: 5,
        initials: 'AC'
    },
    {
        id: 2,
        name: 'Siddharth Roy',
        role: 'Food Blogger',
        content: 'Impressive quality and packaging. It\'s great to see traditional Bengal delicacies being preserved with such authenticity.',
        rating: 5,
        initials: 'SR'
    },
    {
        id: 3,
        name: 'Dr. Megha Singh',
        role: 'Nutritionist',
        content: 'Pure, unadulterated jaggery is hard to find. GramBahar has become my go-to for healthy natural sweeteners.',
        rating: 5,
        initials: 'MS'
    }
];

export default function Testimonials() {
    return (
        <section className={styles.testimonials}>
            <div className="container">
                <div className={styles.titleSection}>
                    <span className={styles.subtitle}>Testimonials</span>
                    <h2 className={styles.title}>What Do Our Customers Say</h2>
                </div>

                <div className={styles.grid}>
                    {testimonials.map((item) => (
                        <div key={item.id} className={styles.card}>
                            <div className={styles.quoteIcon}>“</div>
                            <div className={styles.rating}>
                                {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                            </div>
                            <p className={styles.content}>{item.content}</p>
                            <div className={styles.author}>
                                <div className={styles.avatar}>{item.initials}</div>
                                <div className={styles.info}>
                                    <h4>{item.name}</h4>
                                    <p>{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
