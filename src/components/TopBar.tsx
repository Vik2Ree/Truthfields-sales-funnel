import React from 'react';
import { ShieldCheck, Truck, Clock, ChevronRight } from 'lucide-react';

interface TopBarProps {
  onOrderNowClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOrderNowClick }) => {
  return (
    <>
      {/* Promotional Announcement Banner */}
      <div className="bg-white text-[#141414] text-[11px] md:text-xs py-2 px-4 border-b border-[#E7E4DC]">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-center">
          <div className="flex items-center gap-2 mx-auto sm:mx-0 font-medium tracking-wide">
            <span className="animate-golden-pulse font-extrabold tracking-wider uppercase text-[10px] md:text-[11px]">
              Black Friday Flash Sale
            </span>
            <span className="hidden sm:inline text-[#A8A49C]">·</span>
            <span className="hidden sm:inline text-[#141414] font-semibold">77% OFF Limited Release</span>
            <span className="text-[#A8A49C]">·</span>
            <span className="text-[#144729] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 inline text-[#2D6A4F]" /> Payment on Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#E7E4DC] transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex flex-col items-start leading-none group shrink-0 whitespace-nowrap"
          >
            <span className="font-crest text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#735D43] font-semibold">
              Truthfield
            </span>
            <span className="font-editorial text-xl sm:text-2xl tracking-[0.15em] font-bold text-[#141414] group-hover:text-[#842A46] transition-colors">
              INT'L LTD
            </span>
          </a>

          {/* Zone 2: Luxury Semi-Cursive Centerpiece */}
          <div className="flex-1 text-center px-2 min-w-0">
            <span className="font-script text-base sm:text-2xl md:text-[27px] text-[#842A46] tracking-wide whitespace-nowrap truncate block drop-shadow-xs select-none">
              Original Vibe Polo Sneakers Flash Sale
            </span>
          </div>

          {/* Zone 3: 1 Primary CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOrderNowClick}
              className="bg-[#842A46] text-[#FAF9F5] hover:bg-[#6f2239] active:scale-[0.99] transition-all px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-[13px] tracking-widest uppercase font-semibold border border-[#842A46] animate-btn-shadow whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer group"
            >
              <span>Order Now</span>
              <ChevronRight className="w-4 h-4 animate-pulse-right shrink-0" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
