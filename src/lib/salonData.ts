// Centralized Noura Style Salon service data
// All WhatsApp booking URLs are generated programmatically from this single source of truth

const WHATSAPP_NUMBER = '96567775413';

function buildWhatsAppUrl(messageAr: string, messageEn: string): string {
  const combined = `${messageAr}\n\n${messageEn}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(combined)}`;
}

export interface SalonService {
  id: string;
  ar: string;
  en: string;
  descAr: string;
  descEn: string;
  num: string;
  image: string;
  imageAlt: string;
  messageAr: string;
  messageEn: string;
  whatsappUrl: string;
}

const SERVICES_RAW = [
{
  id: 'hair-styling',
  num: '01',
  ar: 'تسريحات الشعر',
  en: 'Hair Styling',
  descAr: 'تسريحات عصرية وكلاسيكية لكل مناسبة — بلمسة احترافية',
  descEn: 'Modern and classic styles for every occasion — with a professional touch',
  image: "/assets/images/styles-1787668791948.png",
  imageAlt: 'أي ستايل تختارين — تسريحات شعر احترافية من صالون نوره ستايل — Any style you choose, professional hair styling at Noura Style Salon',
  messageAr: 'مرحباً، أرغب في حجز موعد لخدمة تسريح الشعر في صالون نوره ستايل. أرجو تزويدي بالمواعيد المتاحة. شكراً.',
  messageEn: 'Hello, I would like to book a Hair Styling appointment at Noura Style Salon. Please let me know the available appointments. Thank you.'
},
{
  id: 'hair-color',
  num: '02',
  ar: 'صبغ الشعر',
  en: 'Hair Color',
  descAr: 'ألوان عصرية وتقنيات متطورة للشعر بأيدي متخصصات',
  descEn: 'Contemporary colors and advanced techniques by skilled specialists',
  image: "/assets/images/redhair-1787667609644.png",
  imageAlt: 'صبغ شعر بلون بورغندي أحمر غامق مع تسريحة نصف مرفوعة — Deep burgundy red hair color at Noura Style Salon',
  messageAr: 'مرحباً، أرغب في حجز موعد لخدمة صبغ الشعر في صالون نوره ستايل. أرجو تزويدي بالمواعيد المتاحة. شكراً.',
  messageEn: 'Hello, I would like to book a Hair Coloring appointment at Noura Style Salon. Please let me know the available appointments. Thank you.'
},
{
  id: 'nails',
  num: '03',
  ar: 'العناية بالأظافر',
  en: 'Nails',
  descAr: 'مانيكير وباديكير احترافي بأحدث التصاميم والتقنيات',
  descEn: 'Professional manicure and pedicure with the latest designs and techniques',
  image: "/assets/images/image-1787666397532.png",
  imageAlt: 'مانيكير كروم ولؤلؤي أنيق — تصميم أظافر احترافي من صالون نوره ستايل',
  messageAr: 'مرحباً، أرغب في حجز موعد لخدمة العناية بالأظافر (مانيكير/باديكير) في صالون نوره ستايل. أرجو تزويدي بالمواعيد المتاحة. شكراً.',
  messageEn: 'Hello, I would like to book a Nails (Manicure/Pedicure) appointment at Noura Style Salon. Please let me know the available appointments. Thank you.'
},
{
  id: 'makeup',
  num: '04',
  ar: 'المكياج',
  en: 'Makeup',
  descAr: 'مكياج احترافي للمناسبات والسهرات والأفراح',
  descEn: 'Professional makeup for events, evenings, and celebrations',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a49cb651-1772090160486.png",
  imageAlt: 'Professional makeup application — warm tones and elegant beauty artistry',
  messageAr: 'مرحباً، أرغب في حجز موعد لخدمة المكياج في صالون نوره ستايل. أرجو تزويدي بالمواعيد المتاحة. شكراً.',
  messageEn: 'Hello, I would like to book a Makeup appointment at Noura Style Salon. Please let me know the available appointments. Thank you.'
},
{
  id: 'skincare',
  num: '05',
  ar: 'العناية بالبشرة',
  en: 'Skin Care',
  descAr: 'علاجات متخصصة للعناية بالبشرة وتجديد الإشراق',
  descEn: 'Specialized skin care treatments for radiant, healthy skin',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19e011a5d-1772692648628.png",
  imageAlt: 'Luxurious skincare facial treatment in a serene spa-like environment',
  messageAr: 'مرحباً، أرغب في حجز موعد لخدمة العناية بالبشرة في صالون نوره ستايل. أرجو تزويدي بالمواعيد المتاحة. شكراً.',
  messageEn: 'Hello, I would like to book a Skincare appointment at Noura Style Salon. Please let me know the available appointments. Thank you.'
},
{
  id: 'natural-hair-masks',
  num: '06',
  ar: 'خلطات الشعر الطبيعية',
  en: 'Natural Hair Masks',
  descAr: 'خلطات طبيعية مميزة لتغذية الشعر وترطيبه — حنة بالأعشاب، زنجبيل وكركديه، ماسك الكتان، وخلطات الأعشاب الطبيعية',
  descEn: 'Signature natural hair masks for deep nourishment — henna with herbs, ginger-hibiscus, flaxseed mask, and herbal treatments',
  image: "/assets/images/maskkatan-1787668021071.png",
  imageAlt: 'ماسك طبيعي بدرة الكتان في وعاء خشبي مع براعم الورد — Natural flaxseed hair mask at Noura Style Salon',
  messageAr: 'مرحباً، أرغب في حجز موعد لخدمة خلطات الشعر الطبيعية في صالون نوره ستايل. أرجو تزويدي بالمواعيد المتاحة. شكراً.',
  messageEn: 'Hello, I would like to book a Natural Hair Masks appointment at Noura Style Salon. Please let me know the available appointments. Thank you.'
},
{
  id: 'eyelashes',
  num: '07',
  ar: 'تركيب الرموش',
  en: 'Eyelashes',
  descAr: 'تركيب رموش احترافي لإطلالة مميزة وعيون ساحرة',
  descEn: 'Professional eyelash application for a stunning, captivating look',
  image: "/assets/images/image-1787670994149.png",
  imageAlt: 'تركيب رموش احترافي وتصميم حواجب في صالون نوره ستايل — Professional eyelash application and brow styling at Noura Style Salon',
  messageAr: 'مرحباً، أرغب في حجز موعد لخدمة تركيب الرموش (رموش) في صالون نوره ستايل. أرجو تزويدي بالمواعيد المتاحة. شكراً.',
  messageEn: 'Hello, I would like to book an Eyelashes appointment at Noura Style Salon. Please let me know the available appointments. Thank you.'
},
{
  id: 'hair-extensions',
  num: '08',
  ar: 'وصلات الشعر',
  en: 'Hair Extensions',
  descAr: 'وصلات شعر طبيعية وعالية الجودة لإضافة الطول والكثافة',
  descEn: 'Natural, high-quality hair extensions for added length and volume',
  image: "/assets/images/lulunora-1787668372501.png",
  imageAlt: 'وصلات شعر احترافية بتجعيدات ذهبية كارميل من صالون نوره ستايل — Professional hair extensions at Noura Style Salon',
  messageAr: 'مرحباً، أرغب في حجز موعد لخدمة وصلات الشعر (إضافات الشعر) في صالون نوره ستايل. أرجو تزويدي بالمواعيد المتاحة. شكراً.',
  messageEn: 'Hello, I would like to book a Hair Extensions appointment at Noura Style Salon. Please let me know the available appointments. Thank you.'
}];


export const SALON_SERVICES: SalonService[] = SERVICES_RAW.map((s) => ({
  ...s,
  whatsappUrl: buildWhatsAppUrl(s.messageAr, s.messageEn)
}));

// Bridal service (used in SignatureServices)
export const BRIDAL_SERVICE = {
  id: 'bridal',
  ar: 'باقة العروس',
  en: 'Bridal Package',
  descAr: 'باقات متكاملة للعروس في يومها المميز — شعر، مكياج، وعناية شاملة',
  descEn: 'Complete bridal packages for your special day — hair, makeup, and full care',
  messageAr: 'مرحباً، أرغب في الاستفسار عن باقات العروس في صالون نوره ستايل. أرجو تزويدي بالتفاصيل والمواعيد المتاحة. شكراً.',
  messageEn: 'Hello, I would like to enquire about Bridal Packages at Noura Style Salon. Please provide details and available appointments. Thank you.',
  get whatsappUrl() {
    return buildWhatsAppUrl(this.messageAr, this.messageEn);
  }
};

// Hair transformation service (used in SignatureServices)
export const HAIR_TRANSFORM_SERVICE = {
  id: 'hair-transform',
  ar: 'تحويل الشعر',
  en: 'Hair Transformation',
  messageAr: 'مرحباً، أرغب في حجز موعد لخدمة تحويل الشعر في صالون نوره ستايل. أرجو تزويدي بالمواعيد المتاحة. شكراً.',
  messageEn: 'Hello, I would like to book a Hair Transformation appointment at Noura Style Salon. Please let me know the available appointments. Thank you.',
  get whatsappUrl() {
    return buildWhatsAppUrl(this.messageAr, this.messageEn);
  }
};

// General booking (used for hero, wow moment, booking CTA, mobile bar)
export const GENERAL_BOOKING_URL = buildWhatsAppUrl(
  'مرحباً، أرغب في حجز موعد في صالون نوره ستايل. أرجو تزويدي بالمواعيد المتاحة. شكراً.',
  'Hello, I would like to book an appointment at Noura Style Salon. Please let me know the available appointments. Thank you.'
);

// Hawalli branch booking
export const HAWALLI_BOOKING_URL = `https://wa.me/96522645886?text=${encodeURIComponent(
  'مرحباً، أرغب في حجز موعد في صالون نوره ستايل - فرع حولي. أرجو تزويدي بالمواعيد المتاحة. شكراً.\n\nHello, I would like to book an appointment at Noura Style Salon - Hawalli Branch. Please let me know the available appointments. Thank you.'
)}`;

export const SALON_PHONE = '+96567775413';
export const SALON_WHATSAPP_NUMBER = '96567775413';
export const SALON_INSTAGRAM = 'https://www.instagram.com/nora_style_salon/';
export const SALON_INSTAGRAM_HANDLE = '@nora_style_salon';