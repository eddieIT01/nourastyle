'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AppLogo from '@/components/ui/AppLogo';
import { SALON_INSTAGRAM, SALON_INSTAGRAM_HANDLE, GENERAL_BOOKING_URL } from '@/lib/salonData';

export default function Footer() {
  const { t, isRTL } = useLanguage();

  const currentYear = 2026;

  return (
    <footer className="bg-background border-t border-border pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Split pattern */}
        <div className={`grid md:grid-cols-2 gap-12 mb-12 ${isRTL ? '' : ''}`}>
          {/* Left: Logo + tagline */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <div className={`flex items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <AppLogo size={32} />
              <div>
                <span className="font-display text-base tracking-widest text-foreground">NOURA STYLE</span>
                <span className="block font-arabic text-xs text-accent" style={{ fontSize: '0.65rem' }}>صالون نوره ستايل</span>
              </div>
            </div>
            <p className="font-arabic text-sm text-foreground-subtle leading-relaxed max-w-xs">
              {t(
                'جمالج... بأسلوبج. صالون تجميل السيدات في الكويت.',
                'Your Beauty. Your Style. Ladies beauty salon in Kuwait.'
              )}
            </p>
            <p className="font-sans-body text-xs text-foreground-subtle mt-3 tracking-wide" dir="ltr">
              {t('صباح السالم · حولي · الكويت', 'Sabah Al-Salem · Hawalli · Kuwait')}
            </p>
          </div>

          {/* Right: Links compact */}
          <div className={`flex flex-col sm:flex-row gap-8 ${isRTL ? 'justify-start sm:justify-end text-right' : 'justify-start sm:justify-end text-left'}`}>
            <div className="space-y-3">
              <a href="#services" className="block text-sm text-foreground-muted hover:text-accent transition-colors font-arabic">
                {t('الخدمات', 'Services')}
              </a>
              <a href="#gallery" className="block text-sm text-foreground-muted hover:text-accent transition-colors font-arabic">
                {t('أعمالنا', 'Our Work')}
              </a>
              <a href="#about" className="block text-sm text-foreground-muted hover:text-accent transition-colors font-arabic">
                {t('عن الصالون', 'About')}
              </a>
            </div>
            <div className="space-y-3">
              <a href="#location" className="block text-sm text-foreground-muted hover:text-accent transition-colors font-arabic">
                {t('الفروع', 'Branches')}
              </a>
              <a
                href={GENERAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-foreground-muted hover:text-accent transition-colors font-arabic"
              >
                {t('احجزي موعدك', 'Book Appointment')}
              </a>
              <a
                href={SALON_INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-foreground-muted hover:text-accent transition-colors font-sans-body"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className={`border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
          <p className="text-xs text-foreground-subtle font-sans-body tracking-widest" dir="ltr">
            © {currentYear} Noura Style. {t('جميع الحقوق محفوظة', 'All rights reserved.')}
          </p>

          <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Instagram */}
            <a
              href={SALON_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${SALON_INSTAGRAM_HANDLE}`}
              className="text-foreground-subtle hover:text-accent transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href={GENERAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-foreground-subtle hover:text-accent transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            {/* Phone */}
            <a
              href="tel:+96567775413"
              aria-label="Call Noura Style Salon"
              className="text-foreground-subtle hover:text-accent transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}