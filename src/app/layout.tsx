import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'GramBahar | Authentic Taste of Nature - Pure Bengal Patali Gur',
  description:
    'GramBahar: Discover pure, farm-fresh Patali Gur & Nolen Gur – a Bengal delicacy with rich, natural sweetness. Handcrafted straight from date palms of Nadia, West Bengal.',
  keywords:
    'Patali Gur, Nolen Gur, Date Palm Jaggery, Farm Fresh, Authentic Bengal Jaggery, Natural Sweeteners, GramBahar, Ranaghat, West Bengal',
  icons: {
    icon: '/grambahar_logo.png'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
