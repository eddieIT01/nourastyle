import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, Noto_Naskh_Arabic } from 'next/font/google';
import '../styles/tailwind.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'صالون نوره ستايل | Noura Style Salon — صباح السالم، الكويت',
  description: 'صالون نوره ستايل لتجميل السيدات في صباح السالم وحولي، الكويت. خدمات الشعر والأظافر والمكياج والعناية بالبشرة والحمام المغربي. احجزي موعدك: +965 6777 5413',
  keywords: [
    'صالون نوره ستايل',
    'Noura Style Salon',
    'صالون صباح السالم',
    'صالون حولي',
    'beauty salon Kuwait',
    'صالونات الكويت',
    'ladies salon Kuwait',
    'صالون تجميل السيدات',
    'hair salon Kuwait',
    'nail salon Kuwait',
    'makeup Kuwait',
    'حمام مغربي الكويت',
  ],
  openGraph: {
    title: 'صالون نوره ستايل | Noura Style Salon',
    description: 'صالون تجميل السيدات في صباح السالم وحولي، الكويت. شعر، أظافر، مكياج، عناية بالبشرة، حمام مغربي. احجزي موعدك عبر واتساب: +965 6777 5413',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nourastyle4149.builtwithrocket.new',
    siteName: 'Noura Style Salon | صالون نوره ستايل',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Noura Style Salon — صالون نوره ستايل لتجميل السيدات، صباح السالم، الكويت',
      }
    ],
    locale: 'ar_KW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'صالون نوره ستايل | Noura Style Salon',
    description: 'صالون تجميل السيدات في صباح السالم وحولي، الكويت.',
    images: ['/assets/images/app_logo.png'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://nourastyle4149.builtwithrocket.new',
    languages: {
      'ar-KW': process.env.NEXT_PUBLIC_SITE_URL || 'https://nourastyle4149.builtwithrocket.new',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/assets/images/app_logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${cormorant.variable} ${dmSans.variable} ${notoNaskh.variable}`}>
      <body className="font-arabic antialiased bg-background text-foreground overflow-x-hidden">
        {children}

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fnourastyle4149back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}