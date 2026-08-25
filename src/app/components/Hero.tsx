'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AppImage from '@/components/ui/AppImage';
import { GENERAL_BOOKING_URL } from '@/lib/salonData';

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: typeof import('gsap').gsap;
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
    let ctx: {revert: () => void;};

    const init = async () => {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      gsap = gsapModule.gsap;
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Initial state
        gsap.set(imageWrapRef.current, { clipPath: 'inset(100% 0 0 0)' });
        gsap.set([headlineRef.current, sublineRef.current, ctaRef.current, labelRef.current, scrollIndicatorRef.current], {
          opacity: 0,
          y: 30,
          filter: 'blur(8px)'
        });

        // Entrance timeline
        const tl = gsap.timeline({ delay: 0.2 });

        tl.to(imageWrapRef.current, {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.4,
          ease: 'expo.inOut'
        }).
        to(labelRef.current, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.9, ease: 'expo.out'
        }, '-=0.4').
        to(headlineRef.current, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.1, ease: 'expo.out'
        }, '-=0.6').
        to(sublineRef.current, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.9, ease: 'expo.out'
        }, '-=0.7').
        to(ctaRef.current, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.9, ease: 'expo.out'
        }, '-=0.6').
        to(scrollIndicatorRef.current, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.7, ease: 'expo.out'
        }, '-=0.4');

        // Scroll parallax
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            if (imageWrapRef.current) {
              gsap.set(imageWrapRef.current, {
                scale: 1 + self.progress * 0.08,
                y: self.progress * 80
              });
            }
            if (headlineRef.current) {
              gsap.set(headlineRef.current, {
                y: self.progress * -60,
                opacity: 1 - self.progress * 1.5
              });
            }
          }
        });
      }, heroRef);
    };

    init();
    return () => {if (ctx) ctx.revert();};
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      aria-label="Hero section">

      {/* Background Image */}
      <div
        ref={imageWrapRef}
        className="absolute inset-0 z-0"
        style={{ clipPath: 'inset(100% 0 0 0)', transformOrigin: 'center center' }}>

        <AppImage
          src="/assets/images/norasalonpic-1787669118935.png"
          alt="صالون نوره ستايل — كراسي التصفيف والمرايا الاحترافية في الصالون الداخلي — Noura Style Salon interior with professional styling chairs and mirrors"
          fill
          priority
          className="object-cover"
          sizes="100vw" />

        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-background/20" />
      </div>

      {/* Grain texture */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />


      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            {/* Label */}
            <div ref={labelRef} className="mb-8">
              <span className="section-label text-accent">
                {t('صالون تجميل السيدات', 'Ladies Beauty Salon')}
              </span>
            </div>

            {/* Main Headline */}
            <div ref={headlineRef}>
              <h1 className={`font-display text-hero-xl text-foreground leading-none tracking-tight mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                NOURA<br />
                <span className="italic text-accent font-light">STYLE</span>
              </h1>
              <p className={`font-arabic text-arabic-hero text-foreground/80 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                صالون نوره ستايل
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 lg:pb-4">
            {/* Sub-line */}
            <div ref={sublineRef} className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="font-arabic text-xl text-foreground-muted leading-relaxed mb-2">
                {t('جمالج... بأسلوبج', 'Your Beauty. Your Style.')}
              </p>
              <p className="font-sans-body text-sm text-foreground-subtle tracking-wide">
                {t('صباح السالم · حولي · الكويت', 'Sabah Al-Salem · Hawalli · Kuwait')}
              </p>
            </div>

            {/* CTAs */}
            <div ref={ctaRef} className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'items-end' : 'items-start'}`}>
              <a
                href={GENERAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary">

                <span>{t('احجزي موعدك', 'BOOK APPOINTMENT')}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#services" className="btn-outline">
                <span>{t('اكتشفي الخدمات', 'EXPLORE SERVICES')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">

        <span className="text-xs tracking-widest uppercase text-foreground-subtle font-sans-body">
          {t('اسحبي للأسفل', 'Scroll')}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent animate-pulse" />
      </div>
    </section>);

}