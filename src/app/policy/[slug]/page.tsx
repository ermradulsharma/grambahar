import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import CartDrawer from '@/components/cart/CartDrawer';
import { POLICIES_DATA } from '@/data/policyData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const policy = POLICIES_DATA[slug];
    if (!policy) {
        return { title: 'Policy Not Found | GramBahar' };
    }
    return {
        title: `${policy.title} | GramBahar - Authentic Patali Gur`,
        description: policy.sections[0]?.paragraphs[0]?.slice(0, 160) || 'Official GramBahar policy page.'
    };
}

export default async function PolicyPage({
    params
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const policy = POLICIES_DATA[slug];

    if (!policy) {
        notFound();
    }

    return (
        <main>
            <Navbar />
            <CartDrawer />

            <div className="container" style={{ padding: '140px 20px 90px', maxWidth: 900 }}>
                <h1
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                        color: 'var(--primary-dark)',
                        marginBottom: '20px',
                        textAlign: 'center'
                    }}
                >
                    {policy.title}
                </h1>

                {policy.lastUpdated && (
                    <p
                        style={{
                            textAlign: 'center',
                            color: 'var(--slate-500)',
                            fontSize: '0.9rem',
                            marginBottom: '40px'
                        }}
                    >
                        Last Updated: {policy.lastUpdated}
                    </p>
                )}

                <div
                    style={{
                        background: 'var(--surface)',
                        padding: 'clamp(24px, 5vw, 50px)',
                        borderRadius: '24px',
                        boxShadow: 'var(--shadow-soft)',
                        border: '1px solid var(--border-light)',
                        lineHeight: '1.8',
                        fontSize: '1.05rem',
                        color: 'var(--foreground)'
                    }}
                >
                    {policy.sections.map((sec, idx) => (
                        <div key={idx} style={{ marginBottom: idx === policy.sections.length - 1 ? 0 : 35 }}>
                            {sec.heading && (
                                <h2
                                    style={{
                                        color: 'var(--primary-dark)',
                                        fontSize: '1.4rem',
                                        marginBottom: '14px',
                                        fontWeight: 700
                                    }}
                                >
                                    {sec.heading}
                                </h2>
                            )}
                            {sec.paragraphs.map((p, pIdx) => (
                                <p key={pIdx} style={{ marginBottom: '16px', color: 'var(--foreground)', opacity: 0.88, lineHeight: 'var(--leading-relaxed)' }}>
                                    {p}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <FloatingWhatsApp />
            <Footer />
        </main>
    );
}
