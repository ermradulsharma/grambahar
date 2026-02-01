import dynamic from 'next/dynamic';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

// Dynamic imports for improved performance
const Hero = dynamic(() => import('@/components/Hero'), {
  loading: () => <div style={{ height: '80vh', background: 'var(--surface)' }} />,
});

const Values = dynamic(() => import('@/components/Values'), {
  loading: () => <div style={{ height: '400px' }} />,
});

const Products = dynamic(() => import('@/components/Products'), {
  loading: () => <div style={{ height: '600px' }} />,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div style={{ height: '300px' }} />,
});

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section id="about" style={{ padding: '100px 0', background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '10px' }}>Our Story</p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: 'var(--primary-dark)', marginBottom: '25px' }}>
                Handcrafted Tradition from the Heart of Bengal
              </h2>
              <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                GramBahar was born out of a desire to preserve the authentic flavors of our childhood. 
                Our Patali Gur is made using age-old techniques, tapped from date palm trees in the 
                pristine villages of West Bengal.
              </p>
              <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
                We believe that food should be more than just sustenance; it should be a connection 
                to our roots, our farmers, and our nature.
              </p>
              <a href="#contact" className="btn btn-primary">Get In Touch</a>
            </div>
            <div style={{ position: 'relative', borderRadius: '30px', overflow: 'hidden', boxShadow: 'var(--shadow-medium)' }}>
              {/* Using hero image for about as well for consistency */}
              <Image 
                src="/assets/hero.png" 
                alt="Our Heritage" 
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>
      <Values />
      <Products />
      <section id="contact" style={{ padding: '100px 0', background: 'var(--primary-dark)', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '20px', color: 'var(--secondary)' }}>
            Experience Genuine Purity
          </h2>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 40px', opacity: '0.9' }}>
            Ready to taste the authentic flavors of Bengal? Order now or reach out to us for bulk inquiries.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a href="tel:+919531536706" className="btn btn-secondary">Call Us Now</a>
            <a href="https://wa.me/+919531536706" className="btn btn-primary" style={{ background: '#25D366' }}>WhatsApp Support</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
