'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AppImage from '@/components/ui/AppImage';
import { SALON_SERVICES } from '@/lib/salonData';

export default function Services() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ctx: {revert: () => void;};

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const steps = sectionRef.current?.querySelectorAll('.service-step') || [];

        steps.forEach((step, i) => {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 55%',
            end: 'bottom 45%',
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i)
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
      id="services"
      className="relative bg-background">

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className={`px-6 pt-24 pb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className="section-label mb-6 block">
            {t('خدماتنا', 'Our Services')}
          </span>
          <h2 className={`font-arabic text-section-title text-foreground ${isRTL ? 'text-right' : ''}`}>
            {t('كل ما تحتاجينه في مكان واحد', 'Everything you need, in one place')}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Sticky image panel (desktop) */}
          <div
            ref={stickyRef}
            className="hidden lg:block lg:w-1/2 sticky-service-panel">

            <div className="relative w-full h-full overflow-hidden">
              {SALON_SERVICES.map((service, i) =>
              <div
                key={i}
                className="absolute inset-0 transition-all duration-900"
                style={{
                  opacity: activeIndex === i ? 1 : 0,
                  transform: activeIndex === i ? 'scale(1)' : 'scale(0.96)',
                  filter: activeIndex === i ? 'blur(0px) grayscale(0%)' : 'blur(8px) grayscale(80%)',
                  transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>

                  <AppImage
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className="object-cover"
                  sizes="50vw" />

                  <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

                  {/* Service number overlay */}
                  <div className="absolute bottom-8 left-8">
                    <span className="service-number">{service.num}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scrolling content */}
          <div className="lg:w-1/2">
            <div className="h-0 lg:h-[20vh]" />

            {SALON_SERVICES.map((service, i) =>
            <div
              key={i}
              className={`service-step min-h-[50vh] lg:min-h-[80vh] flex flex-col justify-center px-6 lg:px-16 py-16 border-b border-border relative ${
              isRTL ? 'text-right items-end' : 'text-left items-start'}`
              }>

                {/* Mobile image */}
                <div className="lg:hidden w-full aspect-video mb-8 overflow-hidden">
                  <AppImage
                  src={service.image}
                  alt={service.imageAlt}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  sizes="100vw" />

                </div>

                {/* Number */}
                <span
                className="absolute font-display font-light text-foreground/5 pointer-events-none select-none"
                style={{
                  fontSize: 'clamp(5rem, 18vw, 12rem)',
                  lineHeight: 1,
                  top: '1rem',
                  right: isRTL ? '1.5rem' : 'auto',
                  left: isRTL ? 'auto' : '1.5rem'
                }}>

                  {service.num}
                </span>

                <div className="relative z-10">
                  <span className="text-xs tracking-widest uppercase text-accent font-sans-body mb-4 block">
                    {service.num}
                  </span>

                  <h3 className={`font-arabic text-editorial-xl text-foreground leading-tight mb-4 ${
                i === activeIndex ? 'text-foreground' : 'text-foreground-muted'} transition-colors duration-500`
                }>
                    {t(service.ar, service.en)}
                  </h3>

                  <p className="font-arabic text-base text-foreground-subtle leading-relaxed mb-8 max-w-sm">
                    {t(service.descAr, service.descEn)}
                  </p>

                  <a
                  href={service.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary">

                    <span>{t('استفسري عن الخدمة', 'Ask About This Service')}</span>
                  </a>
                </div>
              </div>
            )}

            <div className="h-0 lg:h-[20vh]" />
          </div>
        </div>
      </div>
    </section>);

}