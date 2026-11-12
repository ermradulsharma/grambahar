import type { Metadata } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-heading',
    display: 'swap',
});

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-body',
    display: 'swap',
});

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
        <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${outfit.variable}`}>
            <body className={outfit.className}>
                <ThemeProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
