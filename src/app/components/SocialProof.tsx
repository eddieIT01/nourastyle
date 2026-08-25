'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AppImage from '@/components/ui/AppImage';
import { SALON_INSTAGRAM, SALON_INSTAGRAM_HANDLE } from '@/lib/salonData';

// Real Noura Style Salon photos for Instagram preview grid
const INSTAGRAM_PREVIEWS = [
{
  src: "/assets/images/styles-1787668791948.png",
  alt: 'تسريحات شعر احترافية من صالون نوره ستايل — Professional hair styling at Noura Style Salon'
},
{
  src: "/assets/images/image-1787666397532.png",
  alt: 'مانيكير كروم ولؤلؤي أنيق من صالون نوره ستايل — Chrome and pearl nail art manicure at Noura Style Salon'
},
{
  src: "/assets/images/image-1787665927296.png",
  alt: 'مكياج احترافي للمناسبات من صالون نوره ستايل — Professional makeup for events at Noura Style Salon'
},
{
  src: "/assets/images/maskkatan-1787668021071.png",
  alt: 'ماسك طبيعي بدرة الكتان من صالون نوره ستايل — Natural flaxseed hair mask at Noura Style Salon'
},
{
  src: "/assets/images/redhair-1787667609644.png",
  alt: 'صبغ شعر بلون بورغندي أحمر غامق من صالون نوره ستايل — Deep burgundy red hair color at Noura Style Salon'
},
{
  src: "/assets/images/lulunora-1787668372501.png",
  alt: 'وصلات شعر احترافية بتجعيدات ذهبية كارميل من صالون نوره ستايل — Professional hair extensions at Noura Style Salon'
}];


export default function SocialProof() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: {revert: () => void;};

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const items = sectionRef.current?.querySelectorAll('.insta-item') || [];
        gsap.set(items, { opacity: 0, scale: 0.92 });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(items, {
              opacity: 1, scale: 1,
              duration: 0.8, ease: 'expo.out',
              stagger: 0.07
            });
          }
        });
      }, sectionRef);
    };

    init();
    return () => {if (ctx) ctx.revert();};
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-background border-t border-border"
      id="social">

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label mb-4 mx-auto justify-center">
            {t('تابعينا', 'Follow Us')}
          </span>
          <h2 className="font-arabic text-section-title text-foreground mb-3">
            {t('على انستغرام', 'On Instagram')}
          </h2>
          <a
            href={SALON_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-sans-body text-sm tracking-widest hover:text-accent-light transition-colors">

            {SALON_INSTAGRAM_HANDLE}
          </a>
        </div>

        {/* Instagram grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {INSTAGRAM_PREVIEWS.map((item, i) =>
          <a
            key={i}
            href={SALON_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="insta-item img-cover-container aspect-square group block relative overflow-hidden">

              <AppImage
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              sizes="(max-width: 768px) 50vw, 16vw" />

              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="white" />
                </svg>
              </div>
            </a>
          )}
        </div>

        <div className="text-center">
          <a
            href={SALON_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-3">

            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            <span>{t('تابعي الصالون على انستغرام', 'FOLLOW THE SALON ON INSTAGRAM')}</span>
          </a>
        </div>
      </div>
    </section>);

}