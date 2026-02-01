import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Format the slug for display
    const title = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <main>
            <Navbar />
            <div className="container" style={{ padding: '150px 0 100px' }}>
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '3rem',
                    color: 'var(--primary-dark)',
                    marginBottom: '40px'
                }}>
                    {title}
                </h1>

                <div style={{
                    background: 'var(--white)',
                    padding: '50px',
                    borderRadius: '30px',
                    boxShadow: 'var(--shadow-soft)',
                    lineHeight: '1.8',
                    fontSize: '1.1rem',
                    color: '#444'
                }}>
                    <p>This is the official {title} for GramBahar. We take your rights and our responsibilities seriously.</p>

                    <h2 style={{ color: 'var(--primary)', marginTop: '30px' }}>1. Introduction</h2>
                    <p>Placeholder content for {title}. Our traditional values guide our modern business practices.</p>

                    <h2 style={{ color: 'var(--primary)', marginTop: '30px' }}>2. Scope of Policy</h2>
                    <p>This policy applies to all interactions with the GramBahar website and our handcrafted products.</p>

                    <div style={{ marginTop: '50px', padding: '20px', background: 'var(--surface)', borderRadius: '15px', fontSize: '0.9rem' }}>
                        Last Updated: February 2026
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
