import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "GramBahar | Authentic Taste of Nature",
    description: "GramBahar: Discover pure, Patali Gur – a Bengal delicacy with rich, natural sweetness. Perfect for culinary delights straight from the farm.",
    keywords: "Patali Gur, Jaggery, Farm Fresh, Authentic, Bengal, Natural Sweets, GramBahar",
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
