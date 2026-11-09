import React, { useState } from 'react';
import {
  ShieldCheck,
  Star,
  Check,
  ChevronRight,
  Flame,
  Sparkles,
} from 'lucide-react';
import {
  COLORWAYS,
  SNEAKER_PRODUCT,
  FEATURE_LIFESTYLE_BANNER,
  BLACK_FRIDAY_FLYER,
  VIBE_POLO_SALES_FLYER,
} from '../data/productData';
import { Colorway, BundleOption } from '../types';

interface HeroProductProps {
  selectedColorway: Colorway;
  onSelectColorway: (colorway: Colorway) => void;
  selectedSize?: number;
  onSelectSize?: (size: number) => void;
  selectedBundle: BundleOption;
  onSelectBundle?: (bundle: BundleOption) => void;
  onOpenSizeGuide?: () => void;
  onOrderNow: () => void;
}

export const HeroProduct: React.FC<HeroProductProps> = ({
  selectedColorway,
  onSelectColorway,
  selectedSize,
  onSelectSize,
  selectedBundle,
  onSelectBundle,
  onOpenSizeGuide,
  onOrderNow,
}) => {
  // Gallery view: 'colorway' | 'flyer'
  const [activeMediaTab, setActiveMediaTab] = useState<'colorway' | 'flyer'>('flyer');

  const activeImageSrc =
    activeMediaTab === 'flyer'
      ? BLACK_FRIDAY_FLYER
      : selectedColorway.image;

  return (
    <>
      {/* ================= FULL-WIDTH HERO MEDIA SECTION (EDGE-TO-EDGE) ================= */}
      <section id="overview" className="w-full bg-[#FAF9F5] border-b border-[#E7E4DC] p-0 m-0 overflow-hidden">
        {/* Main Stage Image (Full-width, zero gutters reaching both sides of the screen) */}
        <div className="relative w-full bg-[#F3F0E8] overflow-hidden group shadow-sm">
          {/* Limited Offer Floating Badge */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-6 z-20 flex flex-col gap-1.5 items-start">
            <span className="bg-[#141414] text-[#FAF9F5] text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3.5 py-1 sm:py-1.5 uppercase tracking-widest border border-white/10 shadow-sm flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#E5A83B]" />
              <span>Black Friday 77% OFF</span>
            </span>
          </div>

          {/* Image Display - Edge-to-Edge Full Width */}
          <div
            className={`relative w-full flex items-center justify-center transition-colors duration-300 overflow-hidden ${
              activeMediaTab === 'flyer'
                ? 'bg-[#EADED2] aspect-[4/3] sm:aspect-[4/3] md:aspect-[16/11] lg:aspect-[16/10] max-h-[660px]'
                : 'bg-white aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[640px]'
            }`}
          >
            {/* Ambient canvas backdrop when displaying the flyer so it extends edge-to-edge seamlessly */}
            {activeMediaTab === 'flyer' && (
              <div
                className="absolute inset-0 bg-cover bg-center filter blur-2xl scale-125 opacity-40 pointer-events-none"
                style={{ backgroundImage: `url(${activeImageSrc})` }}
              />
            )}

            <img
              src={activeImageSrc}
              alt={`${SNEAKER_PRODUCT.title} - ${selectedColorway.name}`}
              className={`relative z-10 w-full h-full transition-transform duration-500 group-hover:scale-101 ${
                activeMediaTab === 'colorway'
                  ? 'object-contain p-4 sm:p-6 lg:p-10 max-h-[560px]'
                  : 'object-contain max-h-[660px]'
              }`}
              referrerPolicy="no-referrer"
            />

            {/* Subtle Luxury Gradient Overlay at the base */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none z-10" />

            {/* Floating Hero Thumbnail Switcher Overlay */}
            <div className="absolute bottom-3 sm:bottom-5 inset-x-0 z-20 flex flex-col items-center gap-1.5 px-2 pointer-events-none">
              <div className="pointer-events-auto transition-opacity duration-300 ease-in-out opacity-85 hover:opacity-100 bg-black/60 hover:bg-black/80 backdrop-blur-md p-1.5 sm:p-2 rounded-xl border border-white/25 shadow-2xl flex items-center gap-1.5 sm:gap-2 max-w-[95vw] sm:max-w-2xl overflow-x-auto">
                {/* 1st Position: Official Black Friday 77% OFF Campaign Flyer */}
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('flyer')}
                  className={`relative w-12 sm:w-16 md:w-20 aspect-[4/3] shrink-0 bg-[#EFECE3] rounded-md transition-all duration-200 overflow-hidden cursor-pointer group ${
                    activeMediaTab === 'flyer'
                      ? 'ring-2 ring-white scale-105 shadow-md border-transparent'
                      : 'border border-white/30 hover:border-white hover:scale-102 opacity-85 hover:opacity-100'
                  }`}
                  title="Official 77% OFF Black Friday Flyer"
                >
                  <img
                    src={BLACK_FRIDAY_FLYER}
                    alt="Official Black Friday 77% OFF Flyer"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#842A46] text-white text-[8px] sm:text-[10px] px-1 py-0.5 truncate text-center font-bold">
                    77% OFF
                  </div>
                </button>

                {/* Sneaker Colorway Thumbnails */}
                {COLORWAYS.map((c) => {
                  const isSelected = selectedColorway.id === c.id && activeMediaTab === 'colorway';
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        onSelectColorway(c);
                        setActiveMediaTab('colorway');
                      }}
                      className={`relative w-12 sm:w-16 md:w-20 aspect-[4/3] shrink-0 bg-white rounded-md transition-all duration-200 overflow-hidden cursor-pointer group ${
                        isSelected
                          ? 'ring-2 ring-white scale-105 shadow-md border-transparent'
                          : 'border border-white/30 hover:border-white hover:scale-102 opacity-85 hover:opacity-100'
                      }`}
                      title={c.name}
                    >
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-full h-full object-contain p-0.5"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-black/75 text-white text-[8px] sm:text-[9px] px-1 py-0.5 truncate text-center font-medium">
                        {c.name.split(' ')[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PURCHASING DETAILS SECTION (DIRECTLY UNDER HERO) ================= */}
      <section id="purchase-details" className="w-full bg-[#FAF9F5] border-b border-[#E7E4DC] py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-stretch">
            {/* Left Column: Purchasing Details, Trust Badge & Price Lockup */}
            <div className="md:col-span-7 lg:col-span-7 flex flex-col justify-between space-y-5 lg:space-y-6">
              {/* Header Lockup */}
              <div className="space-y-1.5 border-b border-[#E7E4DC] pb-4">
                <div className="flex items-center justify-between text-xs text-[#735D43] font-semibold uppercase tracking-[0.25em]">
                  <span>{SNEAKER_PRODUCT.brand}</span>
                  <span className="text-[#842A46] tracking-wider font-bold">LIMITED TIME RELEASE</span>
                </div>

                <h1 className="font-editorial text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#141414] leading-tight">
                  {SNEAKER_PRODUCT.title}
                </h1>

                {/* Rating & Social Proof */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex text-[#D97706]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#141414] tabular-nums">4.9</span>
                  <span className="text-xs text-[#736E65]">(348 Verified Nigerian Buyers)</span>
                </div>
              </div>

              {/* PAYMENT ON DELIVERY TRUST BADGE */}
              <div className="p-4 bg-gradient-to-br from-[#F0F7F2] to-[#E3F2E8] border-2 border-[#52B788] shadow-sm relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#52B788] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#144729] text-xs sm:text-sm uppercase tracking-wider">
                        PAYMENT ON DELIVERY ONLY
                      </span>
                      <span className="bg-[#144729] text-white text-[9px] px-1.5 py-0.5 font-bold uppercase">
                        100% Zero Risk
                      </span>
                    </div>
                    <p className="text-xs text-[#205234] leading-relaxed">
                      You do <strong>NOT</strong> pay before getting your item delivered to you. You only pay via <strong>instant bank transfer</strong> immediately you recieve your shoe(s)!
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Lockup */}
              <div className="p-5 sm:p-6 bg-[#F5F2EB] border border-[#DDD6C8] flex flex-col justify-between gap-5 shadow-2xs">
                {/* Price and discount details */}
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-crest text-[10px] tracking-[0.25em] uppercase text-[#735D43] font-semibold">
                      Black Friday Flash Offer
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#842A46]" />
                    <span className="text-[10px] text-[#842A46] font-bold uppercase tracking-wider">
                      77% OFF Applied
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <div className="font-editorial text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#141414] tabular-nums leading-none">
                      ₦{selectedBundle.totalPrice.toLocaleString()}
                    </div>
                    <div className="text-base sm:text-lg text-[#8C877E] line-through font-mono tabular-nums">
                      ₦{selectedBundle.originalPrice.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    <span className="bg-[#842A46] text-white text-[11px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      SAVE 77% (₦{(selectedBundle.originalPrice - selectedBundle.totalPrice).toLocaleString()} OFF)
                    </span>
                    <span className="text-xs text-[#52B788] font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> FREE Delivery!!
                    </span>
                  </div>

                  <p className="text-xs text-[#5C574F] leading-relaxed pt-1">
                    Special limited allocation from Truthfield Int'l Ltd. Zero upfront payment required — inspect upon doorstep arrival.
                  </p>
                </div>

                {/* Order Now button */}
                <div className="w-full shrink-0 pt-1">
                  <button
                    type="button"
                    onClick={onOrderNow}
                    className="w-full bg-[#842A46] hover:bg-[#6f2239] active:scale-[0.99] text-[#FAF9F5] py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all animate-btn-shadow flex items-center justify-center gap-2.5 cursor-pointer group whitespace-nowrap"
                  >
                    <span>Order Now — Pay on Delivery</span>
                    <ChevronRight className="w-5 h-5 animate-pulse-right shrink-0" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Promotional Campaign Flyer Beside Purchasing Details */}
            <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-center">
              <div
                onClick={onOrderNow}
                className="w-full h-full max-w-sm sm:max-w-md md:max-w-none mx-auto bg-[#F5F2EB] border border-[#DDD6C8] p-2.5 sm:p-3 flex flex-col justify-center items-center group cursor-pointer shadow-sm hover:border-[#842A46] transition-all relative overflow-hidden"
                title="Step Into Style — Black Friday Sales From ₦258K to ₦60K! Click to Order"
              >
                <div className="relative w-full h-[280px] sm:h-[340px] md:h-full md:min-h-[360px] md:max-h-[460px] lg:max-h-[520px] overflow-hidden bg-[#ECE8DF] border border-black/5 flex items-center justify-center">
                  <img
                    src={VIBE_POLO_SALES_FLYER}
                    alt="Step Into Style — Black Friday Sales From ₦258K to ₦60K (77% OFF)"
                    className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* High-Contrast Callout Button Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2.5 sm:p-3 text-center flex justify-center">
                    <span className="inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2 bg-[#842A46] text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider animate-btn-shadow border border-white/20 group-hover:bg-[#6f2239] transition-colors whitespace-nowrap">
                      <Sparkles className="w-3.5 h-3.5 text-[#E5A83B] shrink-0" />
                      <span>Click Flyer to Order Deal (₦60,000)</span>
                      <ChevronRight className="w-4 h-4 animate-pulse-right shrink-0" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIFESTYLE ANATOMY SECTION ================= */}
        <section id="lifestyle-anatomy" className="bg-[#F7F5EE] py-12 sm:py-16 border-b border-[#E7E4DC]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            {/* Section Heading */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#735D43]">
                <span>Italian Riviera Inspiration</span>
                <span>·</span>
                <span>All-Day Performance</span>
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#141414]">
                Engineered for Timeless Elegance & Effortless Comfort
              </h2>
              <p className="text-sm text-[#5C574F] leading-relaxed">
                The Vibe Polo Sneakers merge classical luxury resort styling with modern sports mechanics. See the exact anatomy that makes them Nigeria’s most sought-after casual luxury runner.
              </p>
            </div>

            {/* ================= USER ATTACHED FEATURE & LIFESTYLE BANNER ================= */}
            <div className="relative overflow-hidden border border-[#D9D3C5] shadow-md bg-white">
              <img
                src={FEATURE_LIFESTYLE_BANNER}
                alt="Polo Sneaker Lifestyle on Villa Terrace with 4 Feature Breakdown"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* CTA Button below feature lifestyle banner */}
            <div className="pt-2 max-w-md mx-auto w-full space-y-3">
              <button
                type="button"
                onClick={onOrderNow}
                className="w-full bg-[#842A46] hover:bg-[#6f2239] active:scale-[0.99] text-[#FAF9F5] py-4 px-6 text-sm sm:text-base font-bold uppercase tracking-widest transition-all animate-btn-shadow flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>ORDER NOW — PAY ON DELIVERY</span>
                <ChevronRight className="w-5 h-5 animate-pulse-right shrink-0" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#842A46] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#842A46] animate-pulse" />
                <span>Urgent: Only {SNEAKER_PRODUCT.inStockCount} pairs left in stock today!</span>
              </div>
            </div>
          </div>
        </section>
      </>
  );
};
