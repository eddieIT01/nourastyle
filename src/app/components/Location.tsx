'use client';

import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Icon from '@/components/ui/AppIcon';

const BRANCHES = [
  {
    nameAr: 'فرع صباح السالم',
    nameEn: 'Sabah Al-Salem Branch',
    addressAr: 'ق١، ش ١١٧، قسيمة ١٧٣، دور ١، صباح السالم، الكويت',
    addressEn: 'Block 1, Street 117, Plot 173, Floor 1, Sabah Al-Salem, Kuwait',
    phone: '67775413',
    phoneDisplay: '+965 6777 5413',
    whatsapp: 'https://wa.me/96567775413?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AD%D8%AC%D8%B2%20%D9%85%D9%88%D8%B9%D8%AF%20%D9%81%D9%8A%20%D8%B5%D8%A7%D9%84%D9%88%D9%86%20%D9%86%D9%88%D8%B1%D9%87%20%D8%B3%D8%AA%D8%A7%D9%8A%D9%84%20-%20%D9%81%D8%B1%D8%B9%20%D8%B5%D8%A8%D8%A7%D8%AD%20%D8%A7%D9%84%D8%B3%D8%A7%D9%84%D9%85.%20%D8%A3%D8%B1%D8%AC%D9%88%20%D8%AA%D8%B2%D9%88%D9%8A%D8%AF%D9%8A%20%D8%A8%D8%A7%D9%84%D9%85%D9%88%D8%A7%D8%B9%D9%8A%D8%AF%20%D8%A7%D9%84%D9%85%D8%AA%D8%A7%D8%AD%D8%A9.%20%D8%B4%D9%83%D8%B1%D8%A7%D9%8B.%0A%0AHello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Noura%20Style%20Salon%20-%20Sabah%20Al-Salem%20Branch.%20Please%20let%20me%20know%20the%20available%20appointments.%20Thank%20you.',
    call: 'tel:+96567775413',
    mapsUrl: 'https://www.google.com/maps/search/صالون+نوره+ستايل+صباح+السالم+الكويت',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3480.5!2d48.0!3d29.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSabah+Al-Salem+Kuwait!5e0!3m2!1sen!2skw!4v1234567890',
    hoursAr: 'يومياً ١٠:٠٠ ص – ٩:٠٠ م',
    hoursEn: 'Daily 10:00 AM – 9:00 PM',
  },
  {
    nameAr: 'فرع حولي',
    nameEn: 'Hawalli Branch',
    addressAr: 'شارع قتيبة بن مسلم، حولي، الكويت',
    addressEn: 'Qutaiba Bin Muslim Street, Hawalli, Kuwait',
    phone: '22645886',
    phoneDisplay: '+965 2264 5886',
    whatsapp: 'https://wa.me/96522645886?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%AD%D8%AC%D8%B2%20%D9%85%D9%88%D8%B9%D8%AF%20%D9%81%D9%8A%20%D8%B5%D8%A7%D9%84%D9%88%D9%86%20%D9%86%D9%88%D8%B1%D9%87%20%D8%B3%D8%AA%D8%A7%D9%8A%D9%84%20-%20%D9%81%D8%B1%D8%B9%20%D8%AD%D9%88%D9%84%D9%8A.%20%D8%A3%D8%B1%D8%AC%D9%88%20%D8%AA%D8%B2%D9%88%D9%8A%D8%AF%D9%8A%20%D8%A8%D8%A7%D9%84%D9%85%D9%88%D8%A7%D8%B9%D9%8A%D8%AF%20%D8%A7%D9%84%D9%85%D8%AA%D8%A7%D8%AD%D8%A9.%20%D8%B4%D9%83%D8%B1%D8%A7%D9%8B.%0A%0AHello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Noura%20Style%20Salon%20-%20Hawalli%20Branch.%20Please%20let%20me%20know%20the%20available%20appointments.%20Thank%20you.',
    call: 'tel:+96522645886',
    mapsUrl: 'https://www.google.com/maps/search/صالون+نوره+ستايل+حولي+الكويت',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3478.0!2d47.99!3d29.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHawalli+Kuwait!5e0!3m2!1sen!2skw!4v1234567890',
    hoursAr: 'يومياً ١٠:٠٠ ص – ٩:٠٠ م',
    hoursEn: 'Daily 10:00 AM – 9:00 PM',
  },
];

export default function Location() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void };

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const cards = sectionRef.current?.querySelectorAll('.branch-card') || [];
        gsap.set(cards, { opacity: 0, y: 40 });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1, y: 0,
              duration: 1.0, ease: 'expo.out',
              stagger: 0.15,
            });
          },
        });
      }, sectionRef);
    };

    init();
    return () => { if (ctx) ctx.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="location"
      className="py-24 bg-surface border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className="section-label mb-4 block">
            {t('فروعنا', 'Our Branches')}
          </span>
          <h2 className="font-arabic text-section-title text-foreground">
            {t('زوريننا', 'Visit Us')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {BRANCHES.map((branch, i) => (
            <div
              key={i}
              className="branch-card bg-card border border-border overflow-hidden"
            >
              {/* Map */}
              <div className="relative w-full h-48 overflow-hidden">
                <iframe
                  src={branch.mapEmbed}
                  className="w-full h-full border-0 grayscale"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t(branch.nameAr, branch.nameEn)}
                  style={{ filter: 'grayscale(100%) contrast(1.1) brightness(0.7)' }}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-card/80 to-transparent" />
              </div>

              {/* Info */}
              <div className={`p-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-arabic text-xl text-foreground mb-1">
                      {t(branch.nameAr, branch.nameEn)}
                    </h3>
                    <p className="font-arabic text-sm text-foreground-muted leading-relaxed">
                      {t(branch.addressAr, branch.addressEn)}
                    </p>
                  </div>
                  <span className="text-xs tracking-widest text-accent font-sans-body border border-border px-3 py-1">
                    0{i + 1}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Icon name="PhoneIcon" size={16} className="text-accent flex-shrink-0" />
                    <a
                      href={branch.call}
                      className="font-sans-body text-sm text-foreground-muted hover:text-accent transition-colors"
                      dir="ltr"
                    >
                      {branch.phoneDisplay}
                    </a>
                  </div>
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Icon name="ClockIcon" size={16} className="text-accent flex-shrink-0" />
                    <span className="font-arabic text-sm text-foreground-muted">
                      {t(branch.hoursAr, branch.hoursEn)}
                    </span>
                  </div>
                </div>

                <div className={`flex gap-3 flex-wrap ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  <a
                    href={branch.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs px-5 py-3"
                  >
                    <span>{t('احجزي عبر واتساب', 'Book via WhatsApp')}</span>
                  </a>
                  <a
                    href={branch.call}
                    className="btn-outline text-xs px-5 py-3"
                  >
                    <span>{t('اتصال', 'Call')}</span>
                  </a>
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-xs px-5 py-3"
                  >
                    <span>{t('الخريطة', 'Directions')}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}