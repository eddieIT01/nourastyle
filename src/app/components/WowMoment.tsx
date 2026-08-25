'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AppImage from '@/components/ui/AppImage';
import { GENERAL_BOOKING_URL } from '@/lib/salonData';

export default function WowMoment() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: {revert: () => void;};

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Initial states
        gsap.set(textRef.current, { opacity: 0, y: 60, filter: 'blur(12px)' });
        gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
        gsap.set(ctaRef.current, { opacity: 0, y: 20 });
        gsap.set(image2Ref.current, { x: 200, opacity: 0, clipPath: 'inset(0 100% 0 0)' });

        // Pinned scroll timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=400%',
            scrub: 1.2,
            pin: true,
            anticipatePin: 1
          }
        });

        // Phase 1: Image zooms in
        tl.to(imageRef.current, {
          scale: 1.15,
          duration: 2,
          ease: 'none'
        })
        // Phase 2: Overlay darkens
        .to(overlayRef.current, {
          opacity: 0.7,
          duration: 1,
          ease: 'none'
        }, '<')
        // Phase 3: Main text appears
        .to(textRef.current, {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.2, ease: 'expo.out'
        }, '-=0.5')
        // Phase 4: Subtitle reveals
        .to(subtitleRef.current, {
          opacity: 1, y: 0,
          duration: 1, ease: 'expo.out'
        }, '-=0.4')
        // Phase 5: Secondary image slides in
        .to(image2Ref.current, {
          x: 0, opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.4, ease: 'expo.out'
        }, '-=0.3')
        // Phase 6: CTA appears
        .to(ctaRef.current, {
          opacity: 1, y: 0,
          duration: 0.9, ease: 'expo.out'
        }, '-=0.3');
      }, sectionRef);
    };

    init();
    return () => {if (ctx) ctx.revert();};
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-background"
      id="wow">

      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center">

        {/* Main background image */}
        <div
          ref={imageRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: 'center center' }}>

          <AppImage
            src="/assets/images/redhair-1787667609644.png"
            alt="صبغ شعر بلون بورغندي أحمر غامق مع تسريحة نصف مرفوعة في صالون نوره ستايل — Deep burgundy red hair color at Noura Style Salon"
            fill
            priority
            className="object-cover"
            sizes="100vw" />

        </div>

        {/* Darkening overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-background"
          style={{ opacity: 0.3 }} />


        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40 pointer-events-none" />

        {/* Main text */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
          style={{ opacity: 0 }}>

          <h2 className="wow-section-text text-foreground text-center leading-none mb-4">
            {isRTL ?
            <span className="font-arabic">نوره ستايل</span> :

            <span className="font-display italic">NOURA<br />STYLE</span>
            }
          </h2>
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="absolute bottom-32 left-0 right-0 flex justify-center z-10 px-6"
          style={{ opacity: 0 }}>

          <div className={`text-center ${isRTL ? '' : ''}`}>
            <p className="font-arabic text-lg text-accent tracking-widest mb-2">
              {t('صباح السالم، الكويت', 'Sabah Al-Salem, Kuwait')}
            </p>
            <div className="w-16 h-px bg-accent mx-auto" />
          </div>
        </div>

        {/* Secondary image — slides in from right */}
        <div
          ref={image2Ref}
          className="absolute bottom-0 right-0 w-80 h-96 z-20 overflow-hidden"
          style={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}>

          <AppImage
            src="/assets/images/khaltatsh3r2-1787667609485.png"
            alt="خلطة العصيدة الذهبية في وعاء فضي مع السمسم الأسود — Natural asida hair treatment blend at Noura Style Salon"
            fill
            className="object-cover"
            sizes="320px" />

          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="absolute bottom-12 left-0 right-0 flex justify-center z-20 px-6"
          style={{ opacity: 0 }}>

          <a
            href={GENERAL_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-10 py-5">

            <span>{t('تواصلي معنا', 'CONTACT US')}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>);

}