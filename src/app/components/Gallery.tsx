'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AppImage from '@/components/ui/AppImage';
import { SALON_INSTAGRAM, SALON_INSTAGRAM_HANDLE } from '@/lib/salonData';

type Category = 'all' | 'hair' | 'nails' | 'makeup' | 'salon' | 'treatments';

interface GalleryItem {
  src: string;
  alt: string;
  category: Category;
  span?: 'large' | 'medium' | 'small';
}

const ALL_ITEMS: GalleryItem[] = [
{
  src: "/assets/images/styles-1787668791948.png",
  alt: 'أي ستايل تختارين — تسريحات شعر احترافية من صالون نوره ستايل — Any style you choose, professional hair styling at Noura Style Salon',
  category: 'hair',
  span: 'large'
},
{
  src: "/assets/images/image-1787666397532.png",
  alt: 'مانيكير كروم ولؤلؤي أنيق من صالون نوره ستايل — chrome and pearl nail art manicure',
  category: 'nails',
  span: 'medium'
},
{
  src: "/assets/images/image-1787665927296.png",
  alt: 'مكياج احترافي للمناسبات والسهرات من صالون نوره ستايل — Professional makeup for events at Noura Style Salon',
  category: 'makeup',
  span: 'medium'
},
{
  src: "/assets/images/maskkatan-1787668021071.png",
  alt: 'ماسك طبيعي بدرة الكتان في وعاء خشبي مع براعم الورد — Natural flaxseed hair mask at Noura Style Salon',
  category: 'treatments',
  span: 'medium'
},
{
  src: "/assets/images/redhair-1787667609644.png",
  alt: 'صبغ شعر بلون بورغندي أحمر غامق مع تسريحة نصف مرفوعة — Deep burgundy red hair color at Noura Style Salon',
  category: 'hair',
  span: 'small'
},
{
  src: "/assets/images/khaltatsh3r2-1787667609485.png",
  alt: 'خلطة العصيدة الذهبية في وعاء فضي مع السمسم الأسود — Natural asida hair treatment blend at Noura Style Salon',
  category: 'treatments',
  span: 'medium'
},
{
  src: "/assets/images/image-1787667747398.png",
  alt: 'عناية بالبشرة وعلاجات متخصصة من صالون نوره ستايل — Specialized skincare treatments at Noura Style Salon',
  category: 'makeup',
  span: 'medium'
},
{
  src: "/assets/images/image-1787671443892.png",
  alt: 'فن أظافر أرجنتين بألوان أزرق وأبيض وذهبي مع رقم 10 — Argentina-themed blue white and gold nail art with number 10 at Noura Style Salon',
  category: 'nails',
  span: 'medium'
},
{
  src: "/assets/images/khaltatsh3r3-1787667609582.png",
  alt: 'خلطة شعر طبيعية بالروزماري وزيت الأرغان وبخاخ العناية — Natural rosemary and argan oil hair treatment at Noura Style Salon',
  category: 'treatments',
  span: 'medium'
},
{
  src: "/assets/images/blonde-1787666367749.png",
  alt: 'صبغ شعر بالياج وأومبريه شقراء من صالون نوره ستايل — blonde balayage ombré hair color',
  category: 'hair',
  span: 'small'
},
{
  src: "/assets/images/khaltash3r4-1787668719726.png",
  alt: 'خلطة حنة بالأعشاب في وعاء أخضر — حنة بالأعشاب الطبيعية من صالون نوره ستايل — Henna with herbs natural hair mask in green bowl at Noura Style Salon',
  category: 'treatments',
  span: 'medium'
},
{
  src: "/assets/images/khaltash3r5-1787669408950.png",
  alt: 'خلطة زنجبيل وكركديه في وعاء وردي — خلطة طبيعية للشعر من صالون نوره ستايل — Ginger-hibiscus natural hair mask in pink bowl at Noura Style Salon',
  category: 'treatments',
  span: 'medium'
},
{
  src: "/assets/images/norasalonpic-1787669118935.png",
  alt: 'صالون نوره ستايل — كراسي التصفيف الاحترافية والمرايا في الصالون — Noura Style Salon professional styling chairs and mirrors',
  category: 'salon',
  span: 'large'
},
{
  src: "/assets/images/noraplace-1787669122158.png",
  alt: 'صالون نوره ستايل — منطقة الانتظار بالكراسي الراتان والجدار الأخضر النباتي — Noura Style Salon rattan lounge waiting area with green plant wall',
  category: 'salon',
  span: 'medium'
},
{
  src: "/assets/images/image-1787671646618.png",
  alt: 'فن أظافر وردي ثلاثي الأبعاد بزهور وبولكا دوت وخطوط ذهبية — Pink 3D flower nail art with polka dots and gold stripes at Noura Style Salon',
  category: 'nails',
  span: 'medium'
}];


const TABS: {key: Category;ar: string;en: string;}[] = [
{ key: 'all', ar: 'الكل', en: 'All' },
{ key: 'hair', ar: 'الشعر', en: 'Hair' },
{ key: 'nails', ar: 'الأظافر', en: 'Nails' },
{ key: 'treatments', ar: 'الخلطات الطبيعية', en: 'Natural Masks' },
{ key: 'makeup', ar: 'المكياج', en: 'Makeup' },
{ key: 'salon', ar: 'الصالون', en: 'Salon' }];



export default function Gallery() {
  const { t, isRTL } = useLanguage();
  const [active, setActive] = useState<Category>('all');
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = active === 'all' ? ALL_ITEMS : ALL_ITEMS.filter((i) => i.category === active);

  useEffect(() => {
    let ctx: {revert: () => void;};

    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const items = sectionRef.current?.querySelectorAll('.gallery-item') || [];
        gsap.set(items, { opacity: 0, y: 40, scale: 0.96 });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(items, {
              opacity: 1, y: 0, scale: 1,
              duration: 0.9, ease: 'expo.out',
              stagger: 0.08
            });
          }
        });
      }, sectionRef);
    };

    init();
    return () => {if (ctx) ctx.revert();};
  }, [active]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="py-24 bg-surface overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <span className="section-label mb-4 block">
              {t('معرض الأعمال', 'Our Work')}
            </span>
            <h2 className="font-arabic text-section-title text-foreground">
              {t('أعمالنا تتحدث عنا', 'Our work speaks for us')}
            </h2>
          </div>

          {/* Filter tabs */}
          <div className={`flex gap-2 flex-wrap ${isRTL ? 'justify-end' : 'justify-start'}`}>
            {TABS.map((tab) =>
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-5 py-2 text-xs tracking-widest uppercase font-sans-body transition-all duration-300 border ${
              active === tab.key ?
              'bg-accent text-accent-foreground border-accent' :
              'bg-transparent text-foreground-muted border-border hover:border-accent hover:text-accent'}`
              }>

                {t(tab.ar, tab.en)}
              </button>
            )}
          </div>
        </div>

        {/* Asymmetric Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-3 auto-rows-auto">

          {/* Card 1 — Hair Large cs-6 rs-2 */}
          {(active === 'all' || active === 'hair') &&
          <div className="gallery-item col-span-2 md:col-span-2 lg:col-span-6 row-span-2 img-cover-container group" style={{ minHeight: 'clamp(280px, 40vw, 560px)' }}>
              <AppImage
              src={ALL_ITEMS[0].src}
              alt={ALL_ITEMS[0].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="text-xs tracking-widest uppercase text-foreground font-sans-body">
                  {t('تسريحات الشعر', 'Hair Styling')}
                </span>
              </div>
            </div>
          }

          {/* Card 2 — NailsMed cs-3 */}
          {(active === 'all' || active === 'nails') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[1].src}
              alt={ALL_ITEMS[1].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }

          {/* Card 3 — MakeupMed cs-3 */}
          {(active === 'all' || active === 'makeup') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[2].src}
              alt={ALL_ITEMS[2].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }

          {/* Card 4 — Mask1 (flaxseed) cs-3 */}
          {(active === 'all' || active === 'treatments') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[3].src}
              alt={ALL_ITEMS[3].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }

          {/* Card 5 — Red Hair Small cs-3 */}
          {(active === 'all' || active === 'hair') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[4].src}
              alt={ALL_ITEMS[4].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }

          {/* Card 6 — Mask2 (asida) cs-3 */}
          {(active === 'all' || active === 'treatments') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[5].src}
              alt={ALL_ITEMS[5].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }

          {/* Card 7 — Skincare cs-3 */}
          {(active === 'all' || active === 'makeup') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[6].src}
              alt={ALL_ITEMS[6].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }

          {/* Card 8 — Argentina Nails cs-3 */}
          {(active === 'all' || active === 'nails') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[7].src}
              alt={ALL_ITEMS[7].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }

          {/* Card 9 — Mask3 (rosemary) cs-3 */}
          {(active === 'all' || active === 'treatments') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[8].src}
              alt={ALL_ITEMS[8].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }

          {/* Card 10 — Blonde Hair Small cs-3 */}
          {(active === 'all' || active === 'hair') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[9].src}
              alt={ALL_ITEMS[9].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }

          {/* Card 11 — Mask4 (henna) cs-3 */}
          {(active === 'all' || active === 'treatments') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[10].src}
              alt={ALL_ITEMS[10].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }

          {/* Card 12 — Mask5 (ginger-hibiscus) cs-3 */}
          {(active === 'all' || active === 'treatments') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[11].src}
              alt={ALL_ITEMS[11].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }

          {/* Card 13 — Salon Large cs-6 */}
          {(active === 'all' || active === 'salon') &&
          <div className="gallery-item col-span-2 md:col-span-2 lg:col-span-6 img-cover-container group" style={{ minHeight: 'clamp(200px, 28vw, 380px)' }}>
              <AppImage
              src={ALL_ITEMS[12].src}
              alt={ALL_ITEMS[12].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="text-xs tracking-widest uppercase text-foreground font-sans-body">
                  {t('الصالون', 'The Salon')}
                </span>
              </div>
            </div>
          }

          {/* Card 14 — Salon Lounge cs-3 */}
          {(active === 'all' || active === 'salon') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[13].src}
              alt={ALL_ITEMS[13].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }

          {/* Card 15 — Pink 3D Nails cs-3 */}
          {(active === 'all' || active === 'nails') &&
          <div className="gallery-item col-span-1 lg:col-span-3 img-cover-container group" style={{ minHeight: 'clamp(160px, 20vw, 270px)' }}>
              <AppImage
              src={ALL_ITEMS[14].src}
              alt={ALL_ITEMS[14].alt}
              fill
              className="object-cover transition-transform duration-900 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw" />

              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          }
        </div>

        {/* Instagram CTA */}
        <div className="mt-12 text-center">
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
            <span>{t('المزيد على انستغرام', 'MORE ON INSTAGRAM')}</span>
            <span className="text-accent font-sans-body">{SALON_INSTAGRAM_HANDLE}</span>
          </a>
        </div>
      </div>
    </section>);

}