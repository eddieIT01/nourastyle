import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BrandStatement from './components/BrandStatement';
import SalonExperience from './components/SalonExperience';
import Services from './components/Services';
import SignatureServices from './components/SignatureServices';
import WowMoment from './components/WowMoment';
import Gallery from './components/Gallery';
import About from './components/About';
import SocialProof from './components/SocialProof';
import Location from './components/Location';
import BookingCTA from './components/BookingCTA';
import Footer from '@/components/Footer';
import MobileStickyBar from './components/MobileStickyBar';

// LocalBusiness structured data — verified information only
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: 'صالون نوره ستايل لتجميل السيدات',
  alternateName: 'Noura Style Ladies Beauty Salon',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nourastyle4149.builtwithrocket.new',
  telephone: '+96567775413',
  sameAs: [
    'https://www.instagram.com/nora_style_salon/',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Block 1, Street 117, Plot 173, Floor 1',
    addressLocality: 'Sabah Al-Salem',
    addressCountry: 'KW',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '21:00',
    },
  ],
  priceRange: '$$',
  hasMap: 'https://www.google.com/maps/search/صالون+نوره+ستايل+صباح+السالم+الكويت',
  foundingDate: '2017',
};

export default function HomePage() {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-background overflow-x-hidden">
        {/* LocalBusiness Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Navigation */}
        <Navigation />

        {/* Main content */}
        <main>
          {/* 01 — Hero */}
          <Hero />

          {/* 02 — Brand Statement */}
          <BrandStatement />

          {/* 03 — Salon Experience */}
          <SalonExperience />

          {/* 04 — Services (Pinned Scroll) */}
          <Services />

          {/* 05 — Signature Services */}
          <SignatureServices />

          {/* 06 — WOW Moment (Cinematic Pinned) */}
          <WowMoment />

          {/* 07 — Gallery */}
          <Gallery />

          {/* 08 — About */}
          <About />

          {/* 09 — Social Proof */}
          <SocialProof />

          {/* 10 — Location */}
          <Location />

          {/* 11 — Booking CTA */}
          <BookingCTA />
        </main>

        {/* Footer */}
        <Footer />

        {/* Mobile Sticky Bar */}
        <MobileStickyBar />
      </div>
    </LanguageProvider>
  );
}