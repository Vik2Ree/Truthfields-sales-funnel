import React, { useState } from 'react';
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/productData';

export const FaqSection: React.FC<{ onOrderClick?: () => void }> = ({ onOrderClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="bg-[#FAF9F5] py-12 sm:py-16 border-b border-[#E7E4DC]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#735D43]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#141414]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#5C574F]">
            Everything you need to know about delivery, payment, sizes, and authenticity.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="border border-[#E0DBD0] bg-white transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-editorial text-sm sm:text-base font-bold text-[#141414]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#735D43] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-[#545048] leading-relaxed border-t border-[#F1EFEA]">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Centered Action Button */}
        {onOrderClick && (
          <div className="flex justify-center pt-4 sm:pt-6">
            <button
              type="button"
              onClick={onOrderClick}
              className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-[#842A46] hover:bg-[#6f2239] active:scale-[0.99] text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest whitespace-nowrap cursor-pointer transition-all animate-btn-shadow flex items-center justify-center gap-3 group"
            >
              <span>Order with Zero Risk — Pay on Delivery</span>
              <ChevronRight className="w-5 h-5 animate-pulse-right shrink-0" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
