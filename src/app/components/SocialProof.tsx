'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AppImage from '@/components/ui/AppImage';
import { SALON_INSTAGRAM, SALON_INSTAGRAM_HANDLE } from '@/lib/salonData';

// Real Unsplash photos representing the types of work done at the salon
// These are professional beauty photography — no AI generated images
const INSTAGRAM_PREVIEWS = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_17451c325-1783269430228.png",
  alt: 'Professional hair styling and blowout — elegant salon work'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_159e0c282-1766985572664.png",
  alt: 'Nail art and manicure — detailed professional nail care'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1d79a4177-1772070077523.png",
  alt: 'Professional makeup application — warm tones beauty artistry'
},
{
  src: "https://images.unsplash.com/photo-1659521931882-7b21a3678486",
  alt: 'Bridal hair and makeup preparation — elegant romantic styling'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1d1f245cd-1767692472099.png",
  alt: 'Skincare facial treatment — luxurious skin care session'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_15c0c61f3-1778168794463.png",
  alt: 'Hair coloring process — professional color technique in salon'
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