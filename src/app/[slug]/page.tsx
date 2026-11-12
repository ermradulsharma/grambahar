import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import CartDrawer from '@/components/cart/CartDrawer';
import { POLICIES_DATA } from '@/data/policyData';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = POLICIES_DATA[slug];
  if (!policy) {
    return { title: 'Page Not Found | GramBahar' };
  }
  return {
    title: `${policy.title} | GramBahar - Authentic Patali Gur`,
    description: policy.sections[0]?.paragraphs[0]?.slice(0, 160) || 'Official GramBahar policy page.'
  };
}

export default async function DynamicSlugPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = POLICIES_DATA[slug];

  if (!policy) {
    notFound();
  }

  const isContact = slug === 'contact-us';

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
                <p key={pIdx} style={{ marginBottom: '14px', color: 'var(--slate-700)' }}>
                  {p}
                </p>
              ))}
            </div>
          ))}

          {isContact && (
            <div
              style={{
                marginTop: '40px',
                paddingTop: '30px',
                borderTop: '1px solid var(--border-light)'
              }}
            >
              <h3
                style={{
                  fontSize: '1.25rem',
                  color: 'var(--primary-dark)',
                  marginBottom: '20px',
                  fontWeight: 700
                }}
              >
                Send Us a Message
              </h3>
              <form
                action="https://wa.me/+919531536706"
                method="GET"
                target="_blank"
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 6 }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 10,
                      border: '1px solid var(--border-medium)',
                      background: 'var(--background)',
                      color: 'var(--foreground)'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 6 }}>
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 10,
                      border: '1px solid var(--border-medium)',
                      background: 'var(--background)',
                      color: 'var(--foreground)'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: 6 }}>
                    Your Query or Bulk Inquiry *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your requirement or questions here..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 10,
                      border: '1px solid var(--border-medium)',
                      background: 'var(--background)',
                      color: 'var(--foreground)'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <Send size={18} />
                  Submit Inquiry via WhatsApp
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <FloatingWhatsApp />
      <Footer />
    </main>
  );
}

