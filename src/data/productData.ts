import { BundleOption, Colorway, Review, AddonItem } from '../types';

export const STORE_CONTACT = {
  companyName: "TRUTHFIELD INT'L LTD",
  dispatchPhone: '0810 226 8521',
  dispatchPhoneRaw: '08102268521',
  dispatchPhoneTel: '+2348102268521',
  whatsappNumber: '+234 810 226 8521',
  whatsappRaw: '2348102268521',
  whatsappLink: 'https://wa.me/2348102268521',
  supportHours: 'Monday – Saturday (8:00 AM – 9:00 PM)',
  location: 'Lagos & Nationwide Distribution Hub, Nigeria',
};

export const CAMPAIGN_HERO_FLYER = '/assets/aistudio/file_000000000cc08210a15f34414648bf88_79e3f454.jpg';
export const VIBE_POLO_SALES_FLYER = '/assets/aistudio/file_0000000015c08210afb707dd9e0a6fd7_22dcf53f.jpg';
export const BLACK_FRIDAY_FLYER = CAMPAIGN_HERO_FLYER;
export const PROMO_CAMPAIGN_BANNER = VIBE_POLO_SALES_FLYER;
export const FEATURE_LIFESTYLE_BANNER = '/assets/aistudio/Fitted_Comfort_Sneaker_Feature_Banner_0ff61b8a.jpg';
export const TERRAIN_FEATURE_BANNER = '/assets/aistudio/file_00000000d25081f484f0acb9ccd9cdcd_60c5b58d.jpg';

export const SNEAKER_PRODUCT = {
  brand: "TRUTHFIELD INT'L LTD",
  collection: 'HERITAGE SPORT COLLECTION',
  title: 'Vibe Polo Sneakers',
  modelCode: 'TF-VIBE-V2',
  originalPrice: 258000,
  salePrice: 60000,
  discountPercentage: 77,
  rating: 4.9,
  reviewCount: 348,
  inStockCount: 14,
  description:
    'Crafted with hand-finished suede overlays and breathable woven oxford mesh, the Vibe Polo Sneakers balance vintage athletics with modern street luxury. Features a molded EVA midsole for high-rebound cushioning, an ergonomic roomy toe-box, and the signature embroidered polo horse crest emblem.',
  highlights: [
    'Hand-stitched premium split suede & ballistic oxford mesh',
    'High-rebound dual-density EVA foam midsole',
    'Engineered ergonomic toe-box for all-day breathing room',
    'High-traction wave vulcanized rubber outsole for rain & dry grip',
    'Signature embroidered polo insignia',
  ],
};

export const COLORWAYS: Colorway[] = [
  {
    id: 'stealth-black-ash',
    name: 'Stealth Black & Ash Grey',
    code: 'MATTE BLACK / ASH GREY / WHITE',
    swatchHex: '#1C1C1E',
    image: '/assets/aistudio/Black_Sneaker_with_Ash-Grey_Tongue_Accent_ccc286bb.jpg',
    badge: 'Best Seller',
    description: 'Understated matte black suede with ash-grey padded collar, white wave trim, and dual-density midsole.',
  },
  {
    id: 'cobalt-blue-taupe',
    name: 'Cobalt Blue & Suede Taupe',
    code: 'COBALT BLUE / TAUPE / SLATE',
    swatchHex: '#1E5AA8',
    image: '/assets/aistudio/Cobalt_Blue_Laced_Polo_Sneaker_179051bd.jpg',
    badge: 'Trending',
    description: 'Earthy brushed taupe suede with vivid cobalt blue laces, padded collar, and sky blue ripple outsole.',
  },
  {
    id: 'mulberry-plum-taupe',
    name: 'Mulberry Plum & Suede Taupe',
    code: 'PLUM WINE / STONE TAUPE / CREAM',
    swatchHex: '#782846',
    image: '/assets/aistudio/Taupe_and_Plum_Polo_Sneaker_Studio_Shot_177b0288.jpg',
    badge: 'Featured Hero',
    description: 'Rich vintage plum leather heel counter with brushed taupe suede, cream oxford mesh, and peach grip sole.',
  },
  {
    id: 'ice-grey-navy-crimson',
    name: 'Ice Grey & Crimson Navy',
    code: 'ICE GREY / NAVY / CRIMSON RED',
    swatchHex: '#8B9EAF',
    image: '/assets/aistudio/Icy_Blue-Grey_Laced_Polo_Sneakers_cd2debd9.jpg',
    badge: 'Heritage Classic',
    description: 'Light ice-grey mesh and suede accented by collegiate navy collar, crimson red racing contour, and light blue laces.',
  },
  {
    id: 'white-grey-electric-volt',
    name: 'White Grey & Electric Volt',
    code: 'OPTIC WHITE / LIGHT ASH / VOLT NEON',
    swatchHex: '#C5D92D',
    image: '/assets/aistudio/White_Sneaker_with_Single_Curved_Seam_5e7303ca.jpg',
    badge: 'High Energy',
    description: 'Pristine optic white leather and light ash suede electrified with neon volt yellow racing accents and charcoal heel tab.',
  },
  {
    id: 'olive-khaki-sunset-coral',
    name: 'Olive Khaki & Sunset Coral',
    code: 'OLIVE KHAKI / SUNSET CORAL / ROYAL BLUE',
    swatchHex: '#EA580C',
    image: '/assets/aistudio/Coral-to-Olive_Gradient_Sneaker_Heel_3385eb54.jpg',
    badge: 'Collector Special',
    description: 'Earthy olive khaki suede contrasted by vibrant sunset coral piping and royal blue collar and laces.',
  },
];

export const SIZES = [
  { eu: 40, uk: 6.5, us: 7.5, cm: 25.5 },
  { eu: 41, uk: 7.5, us: 8.5, cm: 26.5 },
  { eu: 42, uk: 8.0, us: 9.0, cm: 27.0 },
  { eu: 43, uk: 9.0, us: 10.0, cm: 28.0 },
  { eu: 44, uk: 9.5, us: 10.5, cm: 28.5 },
  { eu: 45, uk: 10.5, us: 11.5, cm: 29.5 },
];

export const BUNDLE_OPTIONS: BundleOption[] = [
  {
    pairs: 1,
    label: '1 Pair (Single Order)',
    pricePerPair: 60000,
    totalPrice: 60000,
    originalPrice: 258000,
    savingsTotal: 198000,
  },
  {
    pairs: 2,
    label: '2 Pairs (Double Pack)',
    pricePerPair: 55000,
    totalPrice: 110000,
    originalPrice: 516000,
    savingsTotal: 406000,
    badge: 'EXTRA ₦10,000 OFF',
    popular: true,
  },
  {
    pairs: 3,
    label: '3 Pairs (Family / Collector Pack)',
    pricePerPair: 51666,
    totalPrice: 155000,
    originalPrice: 774000,
    savingsTotal: 619000,
    badge: 'EXTRA ₦25,000 OFF',
  },
];

export const ADDONS: AddonItem[] = [
  {
    id: 'suede-shield',
    name: 'Nano Suede & Rain Shield Protector Spray (200ml)',
    description: 'Invisible barrier protects your suede from rain, red dirt, stains and spills.',
    originalPrice: 12000,
    price: 5000,
    imageIcon: 'shield',
  },
  {
    id: 'cotton-socks',
    name: 'Polo Performance Cotton Crew Socks (3-Pack)',
    description: 'Cushioned sole & breathable mesh arch band. Black, White & Heather Grey.',
    originalPrice: 9000,
    price: 4000,
    imageIcon: 'socks',
  },
];

export const NIGERIAN_STATES = [
  'Lagos',
  'Abuja (FCT)',
  'Rivers (Port Harcourt)',
  'Oyo (Ibadan)',
  'Ogun',
  'Enugu',
  'Delta',
  'Edo (Benin)',
  'Anambra',
  'Akwa Ibom',
  'Kaduna',
  'Kano',
  'Kwara',
  'Ondo',
  'Cross River',
  'Imo',
  'Abia',
  'Plateau',
  'Other States',
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Chinedu O.',
    location: 'Lekki Phase 1, Lagos',
    rating: 5,
    date: '',
    title: 'The payment on delivery gave me complete peace of mind',
    comment:
      'I was hesitant at first because of many online scams in Nigeria, but the rider brought it to my office in Lekki. I was allowed to check the shoe and confirm that it was 100% what I ordered before making the bank transfer. Top notch quality!',
    verifiedPurchase: true,
    colorway: 'Mulberry Plum & Suede Taupe',
    size: 43,
  },
  {
    id: 'rev-4',
    author: 'Dr. Fatima K.',
    location: 'Ikeja GRA, Lagos',
    rating: 5,
    date: '',
    title: 'Dispatched and delivered within hours',
    comment:
      'I placed my order at 10 AM, a representative from Truthfield called at 11:30 AM to confirm the address that I inputted plus other things he informed me professionally, later the rider was at my gate by 3 PM. I recieved the package and paid with my link. very nice honestly!',
    verifiedPurchase: true,
    colorway: 'Mulberry Plum & Suede Taupe',
    size: 41,
  },
];

export const FAQS = [
  {
    question: 'How does Payment on Delivery (POD) work?',
    answer:
      'It is 100% zero risk for you. You do NOT pay a single kobo upfront online. When the dispatch courier arrives at your doorstep or office, inspect the sneakers, and only pay after you have fully confirmed, via the secured payment link sent to you by your personal logistics supervisor.',
  },
  {
    question: 'How long does nationwide delivery take?',
    answer:
      'Lagos orders are delivered within 24 hours (often before 6 hours if ordered before 12 PM). Other major cities (Port Harcourt, Ibadan, Benin, Enugu, etc.) would arrive in 3 to 5 working days. Rural locations take 5 to 7 business days.',
  },
  {
    question: 'Are these sneakers authentic?',
    answer:
      'Yes, 100% authentic footwear distributed by Truthfield Int\'l Ltd with original branded packaging, and signature embroidery. You have full right of inspection before paying.',
  },
  {
    question: 'Can I pay via Mobile Bank Transfer to the rider?',
    answer:
      'Payments are only accepted via the secure link sent to you through your personalized logistics supervisor. S/he provides the link once the ride begins and you are asked to pay only when you verify the item.',
  },
];
