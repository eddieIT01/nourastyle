'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AppImage from '@/components/ui/AppImage';

export default function SalonExperience() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const imageLeftRef = useRef<HTMLDivElement>(null);
  const imageRightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: {revert: () => void;};

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Parallax on images
        if (imageLeftRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              gsap.set(imageLeftRef.current, { y: self.progress * -60 });
            }
          });
        }

        if (imageRightRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              gsap.set(imageRightRef.current, { y: self.progress * 40 });
            }
          });
        }

        // Text reveal
        if (textRef.current) {
          gsap.set(textRef.current, { opacity: 0, y: 40 });
          ScrollTrigger.create({
            trigger: textRef.current,
            start: 'top 75%',
            onEnter: () => {
              gsap.to(textRef.current, {
                opacity: 1, y: 0,
                duration: 1.2, ease: 'expo.out'
              });
            }
          });
        }
      }, sectionRef);
    };

    init();
    return () => {if (ctx) ctx.revert();};
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-surface relative overflow-hidden"
      id="experience">

      <div className="absolute top-8 left-8 text-xs tracking-widest text-foreground-subtle/20 font-sans-body">
        03
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid lg:grid-cols-12 gap-8 items-center ${isRTL ? 'direction-rtl' : ''}`}>
          {/* Images column */}
          <div className={`lg:col-span-7 ${isRTL ? 'order-2 lg:order-1' : 'order-1'}`}>
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Left image — taller */}
              <div
                ref={imageLeftRef}
                className="img-cover-container"
                style={{ height: 'clamp(280px, 55vw, 520px)' }}>

                <AppImage
                  src="/assets/images/norasalonpic-1787669118935.png"
                  alt="صالون نوره ستايل — كراسي التصفيف الاحترافية والمرايا في الصالون — Noura Style Salon professional styling chairs and mirrors"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 50vw, 30vw" />

              </div>

              {/* Right image — offset */}
              <div
                ref={imageRightRef}
                className="img-cover-container mt-12"
                style={{ height: 'clamp(240px, 45vw, 440px)' }}>

                <AppImage
                  src="/assets/images/noraplace-1787669122158.png"
                  alt="صالون نوره ستايل — منطقة الانتظار بالكراسي الراتان والجدار الأخضر النباتي — Noura Style Salon rattan lounge waiting area with green plant wall"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 50vw, 30vw" />

              </div>

              {/* Floating stat */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-warm p-6 text-center z-10 w-36">
                <span className="block font-display text-4xl text-accent font-light mb-1">2017</span>
                <span className="block text-xs tracking-widest uppercase text-foreground-subtle font-sans-body">
                  {t('منذ', 'Est.')}
                </span>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div
            ref={textRef}
            className={`lg:col-span-5 ${isRTL ? 'order-1 lg:order-2 text-right' : 'order-2 text-left'}`}>

            <span className="section-label mb-8 block">
              {t('تجربة الصالون', 'The Salon Experience')}
            </span>

            <h2 className={`font-arabic text-section-title text-foreground leading-tight mb-6 ${isRTL ? 'text-right' : ''}`}>
              {t('مو بس صالون', 'More Than a Salon')}
            </h2>

            <div className={`space-y-4 mb-10 ${isRTL ? 'text-right' : ''}`}>
              <p className="font-arabic text-lg text-foreground-muted leading-relaxed">
                {t(
                  'هالمكان مجهز عشانج انتي',
                  'This space is designed entirely for you.'
                )}
              </p>
              <p className="font-arabic text-base text-foreground-subtle leading-relaxed">
                {t(
                  'أجواء رايقة، ديكور يفتح النفس، وخدمة من قلب',
                  'Relaxed atmosphere, beautiful décor, and service from the heart.'
                )}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
              { ar: 'فرعان في صباح السالم وحولي', en: 'Two branches — Sabah Al-Salem & Hawalli' },
              { ar: 'خدمة من القلب', en: 'Service from the heart' },
              { ar: 'أجواء هادئة ومريحة', en: 'Calm, comfortable atmosphere' }].
              map((item, i) =>
              <div key={i} className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-8 h-px bg-accent flex-shrink-0" />
                  <span className="font-arabic text-sm text-foreground-muted">
                    {t(item.ar, item.en)}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-10">
              <a href="#location" className="btn-outline">
                <span>{t('اعرفي أكثر', 'FIND US')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);

}