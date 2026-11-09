import React, { useState } from 'react';
import { Footprints, ShieldCheck, Award, Feather, ArrowRight, Check, ChevronRight } from 'lucide-react';
import { TERRAIN_FEATURE_BANNER } from '../data/productData';

export const ProductAnatomy: React.FC<{ onOrderClick: () => void }> = ({ onOrderClick }) => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const features = [
    {
      title: 'Fitted & Gives Toe Room',
      kicker: 'ERGONOMIC RUNNER FIT',
      icon: Footprints,
      color: '#2D6A4F',
      summary:
        'Engineered with an expanded anatomical toe-box that allows your toes to spread naturally during movement, eliminating the pinch common with narrow dress sneakers.',
      specs: [
        'Roomy anatomical toe splay',
        'Secure midfoot lockdown',
        'Zero pressure on the pinky toe',
      ],
    },
    {
      title: 'Durable Vulcanized Traction',
      kicker: 'ALL-WEATHER GRIP',
      icon: ShieldCheck,
      color: '#1B4332',
      summary:
        'Reinforced high-density rubber sole featuring a dual-directional wave tread pattern designed for optimal traction on asphalt, tiles, polished stone, and rainy surfaces.',
      specs: [
        'Non-marking abrasion-resistant rubber',
        'Deep flex grooves for natural heel-to-toe roll',
        'Embedded authentic brand crest & quality stamp',
      ],
    },
    {
      title: '100% Authentic Brand Detailing',
      kicker: 'HERITAGE EMBROIDERY',
      icon: Award,
      color: '#842A46',
      summary:
        'Features the signature high-density 3D embroidered polo rider crest that never cracks, peels, or fades, complemented by genuine split-suede overlays.',
      specs: [
        'Intricate 4,000+ stitch embroidery',
        'Dual-toned accent racing welts',
        'Hand-finished suede heel counters',
      ],
    },
    {
      title: 'All-Day Cloud Comfort',
      kicker: 'CUSHIONED COLLAR & INSOLE',
      icon: Feather,
      color: '#735D43',
      summary:
        'A breathable, padded micro-mesh collar cradles your ankle and Achilles tendon, preventing chafing and blisters even when worn barefoot or with low socks.',
      specs: [
        'Anatomical memory-foam arch support',
        'Padded breathable collar mesh',
        'Shock-absorbing dual-layer EVA midsole',
      ],
    },
  ];

  return (
    <section id="lifestyle-anatomy" className="bg-[#F7F5EE] py-12 sm:py-16 border-b border-[#E7E4DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Heading */}
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#735D43]">
            Ralph Lauren Inspired Craft
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#141414]">
            Uncompromising Materials & Heritage Construction
          </h2>
          <p className="text-sm text-[#5C574F] leading-relaxed">
            Every pair is built using select European split-suede hides and high-tensile mesh to offer durability, breathability, and unmatched lightweight comfort.
          </p>
        </div>

        {/* ================= USER ATTACHED FEATURE BANNER ================= */}
        <div className="relative overflow-hidden border border-[#D9D3C5] shadow-md bg-white">
          <img
            src={TERRAIN_FEATURE_BANNER}
            alt="Truthfield Int'l Ltd - Built For Any Terrain, Rugged Performance, All-Day Comfort"
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Interactive Feature Deep Dive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {features.map((feat, index) => {
            const IconComponent = feat.icon;
            const isSelected = activeFeatureIndex === index;
            return (
              <button
                key={feat.title}
                type="button"
                onClick={() => setActiveFeatureIndex(index)}
                className={`p-5 text-left border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#141414] shadow-md ring-1 ring-[#141414]'
                    : 'bg-[#EFECE3] border-[#DFD8C8] hover:bg-white hover:border-[#141414]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-none flex items-center justify-center text-white"
                      style={{ backgroundColor: feat.color }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-[#735D43]">
                      {feat.kicker}
                    </div>
                    <h3 className="font-editorial text-lg font-bold text-[#141414] leading-tight">
                      {feat.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#5C574F] leading-relaxed line-clamp-3">
                    {feat.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E7E4DC] mt-4 flex items-center justify-between text-[11px] font-semibold text-[#141414]">
                  <span>{isSelected ? 'Viewing details' : 'Explore feature'}</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'translate-x-1 text-[#842A46]' : 'text-[#8C877E]'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Feature Detail Spotlight */}
        <div className="bg-white p-6 sm:p-8 border border-[#141414] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-widest text-[#842A46]">
              Deep Dive: {features[activeFeatureIndex].kicker}
            </div>
            <h4 className="font-editorial text-xl sm:text-2xl font-bold text-[#141414]">
              {features[activeFeatureIndex].title}
            </h4>
            <p className="text-xs sm:text-sm text-[#545048] leading-relaxed">
              {features[activeFeatureIndex].summary}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {features[activeFeatureIndex].specs.map((spec) => (
                <div key={spec} className="flex items-center gap-1.5 text-xs font-medium text-[#141414]">
                  <Check className="w-4 h-4 text-[#52B788]" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onOrderClick}
            className="w-full md:w-auto shrink-0 bg-[#842A46] hover:bg-[#6f2239] active:scale-[0.99] text-white px-7 py-4 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap animate-btn-shadow flex items-center justify-center gap-2 group"
          >
            <span>Order ₦60K Black Friday Deal</span>
            <ChevronRight className="w-4 h-4 animate-pulse-right shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
