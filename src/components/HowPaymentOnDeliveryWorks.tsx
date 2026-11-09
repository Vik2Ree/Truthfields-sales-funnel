import React from 'react';
import { PackageCheck, PhoneCall, Truck, ShieldCheck, Banknote, ChevronRight } from 'lucide-react';

export const HowPaymentOnDeliveryWorks: React.FC<{ onOrderClick: () => void }> = ({ onOrderClick }) => {
  const steps = [
    {
      step: 'Step 1',
      title: 'Fill Order Details (30 Seconds)',
      icon: PackageCheck,
      brief: 'Zero Upfront Payment',
      description:
        'Select your size and color. Enter your delivery address. No card details or advance payment needed.',
    },
    {
      step: 'Step 2',
      title: 'Quick Dispatch Call',
      icon: PhoneCall,
      brief: 'Quick Response, Zero Hassle',
      description:
        'A logistics supervisor will call you within 30 minutes to 1 hour from our official dispatch line (0810 226 8521) to confirm your exact location, verify your shoe size, and schedule your rider.',
    },
    {
      step: 'Step 3',
      title: 'Doorstep Inspection',
      icon: Truck,
      brief: 'Fast Delivery, Zero Delay',
      description:
        'When the rider arrives at your location, confirm that the package is what you ordered.',
    },
    {
      step: ' Step 4',
      title: 'Payment',
      icon: Banknote,
      brief: 'Secure Payment, Zero Scam',
      description:
        'Once 100% confirmed, pay through the paystack secured link sent by your logistics supervisor.',
    },
  ];

  return (
    <section id="how-pod-works" className="bg-[#FAF9F5] py-12 sm:py-16 border-b border-[#E7E4DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.25em] uppercase text-[#52B788]">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Risk-Free Purchasing</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#141414]">
            How Payment on Delivery Works
          </h2>
          <p className="text-sm text-[#5C574F]">
            We understand Nigerian online shoppers want certainty. You inspect the sneakers first, confirm it is what you ordered for, and only then do you pay in 4(four) easy steps.
          </p>
        </div>

        {/* 4 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.step}
                className="p-6 bg-white border border-[#E7E4DC] space-y-4 relative flex flex-col justify-between hover:border-[#141414] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-[#F5F2EB] text-[#141414] flex items-center justify-center">
                      <IconComp className="w-5 h-5 text-[#842A46]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#8C877E]">{item.step}</span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-[#141414] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#5C574F] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F3EFE7] text-[10px] uppercase font-bold tracking-wider text-[#52B788] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {item.brief}
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Action Button */}
        <div className="flex justify-center pt-2 sm:pt-4">
          <button
            type="button"
            onClick={onOrderClick}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-[#842A46] hover:bg-[#6f2239] active:scale-[0.99] text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest whitespace-nowrap cursor-pointer transition-all animate-btn-shadow flex items-center justify-center gap-3 group"
          >
            <span>Order with Zero Risk — Pay on Delivery</span>
            <ChevronRight className="w-5 h-5 animate-pulse-right shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
