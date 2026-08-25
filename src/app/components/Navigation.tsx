'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AppLogo from '@/components/ui/AppLogo';


export default function Navigation() {
  const { lang, setLang, t, isRTL } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { ar: 'الخدمات', en: 'Services', href: '#services' },
    { ar: 'أعمالنا', en: 'Our Work', href: '#gallery' },
    { ar: 'عن الصالون', en: 'About', href: '#about' },
    { ar: 'تواصل', en: 'Contact', href: '#location' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-border' :'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <AppLogo size={36} />
            <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
              <span className="font-display text-lg tracking-widest text-foreground leading-none">
                NOURA STYLE
              </span>
              <span className="font-arabic text-xs text-accent leading-none mt-0.5" style={{ fontSize: '0.7rem' }}>
                صالون نوره ستايل
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks?.map((link) => (
              <a
                key={link?.href}
                href={link?.href}
                className={`nav-link-underline text-xs tracking-widest uppercase text-foreground-muted hover:text-foreground transition-colors duration-300 ${
                  isRTL ? 'font-arabic text-sm' : 'font-sans-body'
                }`}
              >
                {t(link?.ar, link?.en)}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase text-foreground-subtle hover:text-accent transition-colors duration-300 font-sans-body"
              aria-label="Toggle language"
            >
              <span className={lang === 'ar' ? 'text-accent' : 'text-foreground-subtle'}>عربي</span>
              <span className="text-foreground-subtle/40">|</span>
              <span className={lang === 'en' ? 'text-accent' : 'text-foreground-subtle'}>EN</span>
            </button>

            {/* Book Button */}
            <a
              href="https://wa.me/96567775413"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex btn-primary text-xs"
            >
              <span>{t('احجزي موعدك', 'Book Now')}</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-px bg-foreground transition-all duration-400 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-4 h-px bg-foreground transition-all duration-400 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-px bg-foreground transition-all duration-400 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Full-Screen Menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 bg-background transition-all duration-700 ease-expo-in-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full px-8 pt-32 pb-24 justify-between">
          <nav className="space-y-2">
            {navLinks?.map((link, i) => (
              <a
                key={link?.href}
                href={link?.href}
                onClick={() => setMenuOpen(false)}
                className={`block transition-all duration-500 border-b border-border py-5 ${
                  menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80 + 100}ms` }}
              >
                <span className={`text-section-title font-display text-foreground hover:text-accent transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                  {t(link?.ar, link?.en)}
                </span>
              </a>
            ))}
          </nav>

          <div className="space-y-6">
            {/* Language toggle mobile */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="text-sm text-foreground-muted font-sans-body tracking-widest uppercase"
            >
              {lang === 'ar' ? 'English' : 'عربي'}
            </button>

            <div className="flex gap-4">
              <a
                href="https://wa.me/96567775413"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 justify-center"
                onClick={() => setMenuOpen(false)}
              >
                <span>{t('واتساب', 'WhatsApp')}</span>
              </a>
              <a
                href="tel:+96567775413"
                className="btn-outline flex-1 justify-center"
                onClick={() => setMenuOpen(false)}
              >
                <span>{t('اتصال', 'Call')}</span>
              </a>
            </div>

            <p className="text-xs text-foreground-subtle font-sans-body tracking-widest">
              @nora_style_salon
            </p>
          </div>
        </div>
      </div>
    </>
  );
}