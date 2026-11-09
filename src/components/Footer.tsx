import React from 'react';

interface FooterProps {
  onOpenAdminReceipt?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminReceipt }) => {
  return (
    <footer className="bg-[#F5F2EB] text-[#5C574F] border-t border-[#E7E4DC] pt-10 pb-24 md:pb-12 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand Lockup */}
          <div className="space-y-1">
            <span className="font-crest text-xs tracking-[0.3em] uppercase text-[#735D43] font-semibold block">
              TRUTHFIELD
            </span>
            <span className="font-editorial text-lg sm:text-xl font-bold text-[#141414] tracking-widest uppercase block">
              INT'L LTD
            </span>
            <p className="text-[11px] text-[#8C877E]">
              Authentic Footwear & Premium Apparel Distribution
            </p>
          </div>

          {/* Contact & Support */}
          <div className="text-[11px] text-[#736E65] space-y-1.5 md:text-right">
            <div className="flex flex-wrap md:justify-end items-center gap-2">
              <span className="text-[#8C877E]">Dispatch Call & Support:</span>
              <a
                href="tel:+2348102268521"
                className="font-bold text-[#141414] hover:text-[#842A46] underline decoration-[#141414]/30 underline-offset-2 transition-colors font-mono"
              >
                0810 226 8521
              </a>
              <span className="text-[#DDD6C8]">|</span>
              <a
                href="https://wa.me/2348102268521"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#25D366] hover:text-[#1eb355] underline decoration-[#25D366]/40 underline-offset-2 transition-colors inline-flex items-center gap-1"
              >
                <span>WhatsApp</span>
              </a>
            </div>
            <div>Support Hours: Monday – Saturday (8:00 AM – 9:00 PM)</div>
            <div className="flex flex-wrap md:justify-end items-center gap-2 text-[#8C877E] pt-1">
              <span>© {new Date().getFullYear()} Truthfield Int'l Ltd. All rights reserved.</span>
              {onOpenAdminReceipt && (
                <>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={onOpenAdminReceipt}
                    className="hover:text-[#141414] underline cursor-pointer font-mono text-[10px]"
                  >
                    Admin Receipt Generator
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
