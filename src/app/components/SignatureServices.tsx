'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AppImage from '@/components/ui/AppImage';
import { BRIDAL_SERVICE, HAIR_TRANSFORM_SERVICE } from '@/lib/salonData';

export default function SignatureServices() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: {revert: () => void;};

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const panels = sectionRef.current?.querySelectorAll('.sig-panel') || [];
        panels.forEach((panel) => {
          gsap.set(panel, { opacity: 0, y: 50 });
          ScrollTrigger.create({
            trigger: panel,
            start: 'top 75%',
            onEnter: () => {
              gsap.to(panel, {
                opacity: 1, y: 0,
                duration: 1.1, ease: 'expo.out'
              });
            }
          });
        });
      }, sectionRef);
    };

    init();
    return () => {if (ctx) ctx.revert();};
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-background py-24"
      id="signature">

      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className="section-label mb-4 block">
            {t('خدمات مميزة', 'Signature Services')}
          </span>
          <h2 className="font-arabic text-section-title text-foreground">
            {t('لأهم لحظاتج', 'For your most important moments')}
          </h2>
        </div>

        {/* Natural Hair Masks Feature — full-width featured panel */}
        <div className="sig-panel mb-6 relative overflow-hidden group" style={{ minHeight: 'clamp(380px, 55vw, 620px)' }}>
          <AppImage
            src="/assets/images/maskkatan-1787668021071.png"
            alt="ماسك طبيعي بدرة الكتان في وعاء خشبي مع براعم الورد — Natural flaxseed hair mask at Noura Style Salon"
            fill
            className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
            sizes="100vw" />

          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          <div className={`absolute bottom-0 left-0 right-0 p-8 md:p-12 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-xs tracking-widest uppercase text-accent font-sans-body mb-3 block">
              {t('خدمة مميزة', 'Signature Service')}
            </span>
            <h3 className="font-arabic text-editorial-xl text-foreground mb-4">
              {t(BRIDAL_SERVICE.ar, BRIDAL_SERVICE.en)}
            </h3>
            <p className="font-arabic text-base text-foreground-muted mb-6 max-w-lg">
              {t(BRIDAL_SERVICE.descAr, BRIDAL_SERVICE.descEn)}
            </p>
            <a
              href={BRIDAL_SERVICE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary">

              <span>{t('استفسري عن الباقات', 'Enquire About Packages')}</span>
            </a>
          </div>
        </div>

        {/* Hair Transformation — Split: redhair + spiral curls */}
        <div className={`sig-panel grid md:grid-cols-2 gap-6`}>
          <div className="relative overflow-hidden group" style={{ minHeight: 'clamp(280px, 40vw, 440px)' }}>
            <AppImage
              src="/assets/images/redhair-1787667609644.png"
              alt="صبغ شعر بلون بورغندي أحمر غامق مع تسريحة نصف مرفوعة — Deep burgundy red hair color at Noura Style Salon"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
              sizes="50vw" />

            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'}`}>
              <span className="text-xs tracking-widest uppercase text-foreground-muted font-sans-body">
                {t('صبغ الشعر', 'Hair Color')}
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden group" style={{ minHeight: 'clamp(280px, 40vw, 440px)' }}>
            <AppImage
              src="/assets/images/lulunora-1787668372501.png"
              alt="تسريحة شعر بتجعيدات حلزونية ذهبية كارميل من صالون نوره ستايل — Golden caramel spiral curls hair styling at Noura Style Salon"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
              sizes="50vw" />

            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className={`absolute bottom-0 left-0 right-0 p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              <span className="text-xs tracking-widest uppercase text-accent font-sans-body mb-2 block">
                {t('تسريحات الشعر', 'Hair Styling')}
              </span>
              <h3 className="font-arabic text-2xl text-foreground mb-3">
                {t(HAIR_TRANSFORM_SERVICE.ar, HAIR_TRANSFORM_SERVICE.en)}
              </h3>
              <a
                href={HAIR_TRANSFORM_SERVICE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs">

                <span>{t('احجزي', 'Book')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>);

}