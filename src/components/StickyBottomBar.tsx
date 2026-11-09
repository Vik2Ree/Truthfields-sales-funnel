import React from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { Colorway, BundleOption } from '../types';

interface StickyBottomBarProps {
  selectedColorway: Colorway;
  selectedSize: number;
  selectedBundle: BundleOption;
  onOrderNow: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  selectedColorway,
  selectedSize,
  selectedBundle,
  onOrderNow,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#141414] text-white border-t border-white/10 px-3 py-2.5 shadow-2xl backdrop-blur-lg">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Left: Product & Price snapshot */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 bg-white border border-white/20 shrink-0 overflow-hidden relative">
            <img
              src={selectedColorway.image}
              alt={selectedColorway.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="flex items-center gap-1.5 text-[10px] text-white/70">
              <span className="truncate max-w-[80px]">{selectedColorway.name.split(' ')[0]}</span>
              <span>·</span>
              <span className="font-bold text-white">EU {selectedSize}</span>
            </div>
            <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
              <span className="text-sm font-extrabold text-[#E5A83B]">
                ₦{selectedBundle.totalPrice.toLocaleString()}
              </span>
              <span className="text-[10px] text-white/50 line-through">
                ₦{selectedBundle.originalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Instant Order Action */}
        <button
          type="button"
          onClick={onOrderNow}
          className="bg-[#842A46] hover:bg-[#6f2239] active:scale-[0.99] text-white px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 animate-btn-shadow cursor-pointer whitespace-nowrap group"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#52B788]" />
          <span>Order (POD)</span>
          <ChevronRight className="w-4 h-4 animate-pulse-right shrink-0" />
        </button>
      </div>
    </div>
  );
};
