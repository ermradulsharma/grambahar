import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/cart/CartDrawer';
import Hero from '@/components/Hero';
import ImpactStats from '@/components/ImpactStats';
import Products from '@/components/Products';
import Values from '@/components/Values';
import CustomerService from '@/components/CustomerService';
import BulkSection from '@/components/BulkSection';
import Testimonials from '@/components/Testimonials';
import SocialSection from '@/components/SocialSection';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <CartDrawer />
      <Hero />
      <ImpactStats />
      <Products />
      <Values />
      <CustomerService />
      <BulkSection />
      <Testimonials />
      <SocialSection />
      <FloatingWhatsApp />
      <Footer />
    </main>
  );
}
