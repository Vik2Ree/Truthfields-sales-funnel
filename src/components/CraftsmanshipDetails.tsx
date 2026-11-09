import React from 'react';
import { Shield } from 'lucide-react';
import { SNEAKER_PRODUCT } from '../data/productData';

export const CraftsmanshipDetails: React.FC = () => {
  return (
    <section className="bg-[#FAF9F5] py-10 sm:py-14 border-b border-[#E7E4DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Technical Specification Table */}
        <div className="bg-white border border-[#E7E4DC] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-3">
            <h4 className="font-editorial text-lg font-bold text-[#141414] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#842A46]" /> Technical Specifications
            </h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[#8C877E] uppercase tracking-wider block">Upper</span>
              <span className="font-medium text-[#141414] block">Suede + Ballistic Mesh</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8C877E] uppercase tracking-wider block">Lining</span>
              <span className="font-medium text-[#141414] block">Moisture-Wicking Textile</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8C877E] uppercase tracking-wider block">Midsole</span>
              <span className="font-medium text-[#141414] block">Sculpted High-Rebound EVA</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8C877E] uppercase tracking-wider block">Outsole</span>
              <span className="font-medium text-[#141414] block">All-Weather Rubber Wave</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8C877E] uppercase tracking-wider block">Average Weight</span>
              <span className="font-medium text-[#141414] block">320g (Ultra Lightweight)</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8C877E] uppercase tracking-wider block">Company / Distributor</span>
              <span className="font-medium text-[#141414] block">Truthfield Int'l Ltd</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8C877E] uppercase tracking-wider block">Toe Box</span>
              <span className="font-medium text-[#141414] block">Engineered Roomy Fit</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8C877E] uppercase tracking-wider block">Closure</span>
              <span className="font-medium text-[#141414] block">Flat Braided Cotton Laces</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
