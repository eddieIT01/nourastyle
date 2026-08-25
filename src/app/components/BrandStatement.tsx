'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function BrandStatement() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const arabicRef = useRef<HTMLDivElement>(null);
  const englishRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void };

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Split Arabic text into words
        const arabicEl = arabicRef.current;
        const englishEl = englishRef.current;

        if (arabicEl) {
          const words = arabicEl.textContent?.split(' ') || [];
          arabicEl.innerHTML = words
            .map((w) => `<span class="inline-block overflow-hidden"><span class="inline-block will-change-transform" style="transform: translateY(100%)">${w}</span></span>`)
            .join(' ');

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 70%',
            onEnter: () => {
              gsap.to(arabicEl.querySelectorAll('span span'), {
                y: 0,
                duration: 1.2,
                ease: 'expo.out',
                stagger: 0.08,
              });
            },
          });
        }

        if (englishEl) {
          gsap.set(englishEl, { opacity: 0, y: 20 });
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 60%',
            onEnter: () => {
              gsap.to(englishEl, {
                opacity: 1, y: 0,
                duration: 1.1, ease: 'expo.out',
                delay: 0.5,
              });
            },
          });
        }

        if (lineRef.current) {
          gsap.set(lineRef.current, { scaleX: 0, transformOrigin: isRTL ? 'right' : 'left' });
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 65%',
            onEnter: () => {
              gsap.to(lineRef.current, {
                scaleX: 1, duration: 1.4, ease: 'expo.out', delay: 0.2,
              });
            },
          });
        }
      }, sectionRef);
    };

    init();
    return () => { if (ctx) ctx.revert(); };
  }, [isRTL]);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-background relative overflow-hidden"
      id="brand-statement"
    >
      {/* Decorative number */}
      <div className="absolute top-8 right-8 text-xs tracking-widest text-foreground-subtle/20 font-sans-body">
        02
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Arabic statement */}
          <div
            ref={arabicRef}
            className="font-arabic text-editorial-xl text-foreground leading-tight mb-6"
            dir="rtl"
          >
            الجمال يبدأ من التفاصيل
          </div>

          {/* Divider line */}
          <div
            ref={lineRef}
            className="w-full h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mb-8"
            style={{ transformOrigin: isRTL ? 'right' : 'left' }}
          />

          {/* English translation */}
          <div ref={englishRef} className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
            <p className="font-display italic text-2xl md:text-3xl text-accent-light font-light tracking-wide">
              "Beauty begins in the details."
            </p>
          </div>
        </div>

        {/* Ambient glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,168,130,0.06) 0%, transparent 70%)',
          }}
        />
      </div>
    </section>
  );
}