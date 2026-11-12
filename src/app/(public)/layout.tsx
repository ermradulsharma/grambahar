import React from 'react';
import { Navbar, Footer, FloatingWhatsApp } from '@/components/public/layout';
import CartDrawer from '@/components/public/cart/CartDrawer';

export default function PublicSiteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      {children}
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}

