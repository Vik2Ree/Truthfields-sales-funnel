import React from 'react';
import { X, CheckCircle, Ruler } from 'lucide-react';
import { SIZES } from '../data/productData';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSize: number;
  onSelectSize: (size: number) => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  selectedSize,
  onSelectSize,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F5] w-full max-w-lg rounded-none border border-[#141414] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E7E4DC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#842A46]" />
            <h3 className="font-editorial text-xl font-bold tracking-tight text-[#141414]">
              Vibe Polo Sneakers Sizing & Fit Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#666] hover:text-[#141414] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#4A4742]">
          {/* Fit Recommendation */}
          <div className="bg-[#F1ECE4] p-4 border border-[#DDD6C9]">
            <p className="font-semibold text-[#141414] text-sm uppercase tracking-wider mb-1 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#52B788]" /> Fit Recommendation: True to Size
            </p>
            <p className="text-xs text-[#5C574F] leading-relaxed">
              The Vibe Polo Sneaker is engineered with an ergonomic, roomy toe box that prevents toe pinching while locking the heel firmly. If you are normally between sizes, we recommend ordering your true EU sneaker size. Our riders carry adjacent sizes for doorstep testing.
            </p>
          </div>

          {/* Size Chart Table */}
          <div>
            <h4 className="font-editorial text-base font-semibold text-[#141414] mb-3">
              Standard International Conversion Chart
            </h4>
            <div className="overflow-x-auto border border-[#E7E4DC]">
              <table className="w-full text-center text-xs">
                <thead>
                  <tr className="bg-[#141414] text-white">
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider">EU Size</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider">UK Size</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider">US Men</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider">Foot Length</th>
                    <th className="py-2.5 px-3 font-semibold uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E4DC] bg-white font-mono tabular-nums">
                  {SIZES.map((s) => (
                    <tr
                      key={s.eu}
                      className={
                        selectedSize === s.eu
                          ? 'bg-[#F4ECEF] font-semibold text-[#842A46]'
                          : 'hover:bg-[#FAF9F5]'
                      }
                    >
                      <td className="py-2.5 px-3 font-bold text-sm text-[#141414]">EU {s.eu}</td>
                      <td className="py-2.5 px-3">UK {s.uk}</td>
                      <td className="py-2.5 px-3">US {s.us}</td>
                      <td className="py-2.5 px-3">{s.cm} cm</td>
                      <td className="py-2.5 px-3">
                        <button
                          onClick={() => {
                            onSelectSize(s.eu);
                            onClose();
                          }}
                          className={`text-xs px-2.5 py-1 uppercase tracking-wider font-sans transition-all cursor-pointer ${
                            selectedSize === s.eu
                              ? 'bg-[#6f2239] text-white font-bold ring-1 ring-[#842A46]'
                              : 'bg-[#842A46] text-white hover:bg-[#6f2239]'
                          }`}
                        >
                          {selectedSize === s.eu ? 'Selected' : 'Choose'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to measure */}
          <div className="text-xs space-y-2 border-t border-[#E7E4DC] pt-4">
            <h5 className="font-semibold uppercase tracking-wider text-[#141414]">
              How to Measure Your Foot at Home:
            </h5>
            <ol className="list-decimal list-inside space-y-1 text-[#666]">
              <li>Place a sheet of paper on a hard floor against a wall.</li>
              <li>Stand with your heel resting gently against the wall.</li>
              <li>Mark the tip of your longest toe on the paper with a pencil.</li>
              <li>Measure the distance from the edge to the pencil mark in centimeters.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F4F2EC] border-t border-[#E7E4DC] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#842A46] hover:bg-[#6f2239] active:scale-[0.99] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
