import {
  Hero,
  ImpactStats,
  Products,
  Values,
  CustomerService,
  BulkSection,
  Testimonials,
  SocialSection
} from '@/components/public/storefront';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ImpactStats />
      <Products />
      <Values />
      <CustomerService />
      <BulkSection />
      <Testimonials />
      <SocialSection />
    </main>
  );
}
