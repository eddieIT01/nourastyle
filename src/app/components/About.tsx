'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AppImage from '@/components/ui/AppImage';

export default function About() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: {revert: () => void;};

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.set(textRef.current, { opacity: 0, x: isRTL ? 40 : -40 });
        gsap.set(imageRef.current, { opacity: 0, x: isRTL ? -40 : 40 });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(textRef.current, {
              opacity: 1, x: 0, duration: 1.2, ease: 'expo.out'
            });
            gsap.to(imageRef.current, {
              opacity: 1, x: 0, duration: 1.2, ease: 'expo.out', delay: 0.15
            });
          }
        });
      }, sectionRef);
    };

    init();
    return () => {if (ctx) ctx.revert();};
  }, [isRTL]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 bg-surface border-t border-border">

      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid lg:grid-cols-12 gap-12 items-center ${isRTL ? '' : ''}`}>
          {/* Text */}
          <div
            ref={textRef}
            className={`lg:col-span-5 ${isRTL ? 'text-right lg:order-2' : 'text-left lg:order-1'}`}>

            <span className="section-label mb-6 block">
              {t('عن الصالون', 'About the Salon')}
            </span>

            <h2 className="font-arabic text-section-title text-foreground leading-tight mb-6">
              {t('صالون نوره ستايل', 'Noura Style Salon')}
            </h2>

            <div className="space-y-4 mb-8">
              <p className="font-arabic text-lg text-foreground-muted leading-relaxed">
                {t(
                  'منذ عام ٢٠١٧، صالون نوره ستايل يقدم خدمات التجميل بأعلى مستوى من الجودة والاهتمام.',
                  'Since 2017, Noura Style has been delivering beauty services with the highest level of quality and care.'
                )}
              </p>
              <p className="font-arabic text-base text-foreground-subtle leading-relaxed">
                {t(
                  'مو بس صالون — هالمكان مجهز عشانج انتي. أجواء رايقة، ديكور يفتح النفس، وخدمة من قلب.',
                  'More than a salon — this space is designed entirely for you. A relaxed atmosphere, beautiful décor, and service from the heart.'
                )}
              </p>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 gap-6 pt-8 border-t border-border`}>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <span className="font-display text-4xl text-accent font-light">2017</span>
                <p className="text-xs tracking-widest uppercase text-foreground-subtle font-sans-body mt-1">
                  {t('سنة التأسيس', 'Established')}
                </p>
              </div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <span className="font-display text-4xl text-accent font-light">2</span>
                <p className="text-xs tracking-widest uppercase text-foreground-subtle font-sans-body mt-1">
                  {t('فروع في الكويت', 'Branches in Kuwait')}
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className={`lg:col-span-7 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>

            <div
              className="relative overflow-hidden"
              style={{ height: 'clamp(320px, 50vw, 560px)' }}>

              <AppImage
                src="/assets/images/noraplace-1787669122158.png"
                alt="صالون نوره ستايل — منطقة الانتظار الأنيقة بالكراسي الراتان وجدار النباتات الخضراء — Noura Style Salon elegant rattan lounge waiting area with green plant wall"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />

              {/* Quote overlay */}
              <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} max-w-xs`}>
                <div className="glass-dark p-5">
                  <p className="font-arabic text-sm text-foreground leading-relaxed mb-2">
                    {t(
                      '"خدمة من قلب"',
                      '"Service from the heart"'
                    )}
                  </p>
                  <span className="text-xs tracking-widest text-accent font-sans-body uppercase">
                    Noura Style
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}