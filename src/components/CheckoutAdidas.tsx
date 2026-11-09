import React, { useState, useRef } from 'react';
import {
  Lock,
  ArrowLeft,
  Truck,
  Award,
  ShieldCheck,
  Check,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ChevronDown,
  AlertCircle,
  Plus,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import { Colorway, BundleOption, AddonItem, OrderData, OrderItem } from '../types';
import {
  NIGERIAN_STATES,
  SNEAKER_PRODUCT,
  COLORWAYS,
  SIZES,
  BUNDLE_OPTIONS,
  STORE_CONTACT,
} from '../data/productData';
import { validateNigerianPhone, formatAsNigerianPhone } from '../utils/nigerianPhone';

interface CheckoutAdidasProps {
  selectedColorway: Colorway;
  onSelectColorway: (colorway: Colorway) => void;
  selectedSize: number;
  onSelectSize: (size: number) => void;
  selectedBundle: BundleOption;
  onSelectBundle: (bundle: BundleOption) => void;
  onOpenSizeGuide: () => void;
  onBack: () => void;
  onOrderComplete: (order: OrderData) => void;
}

export const CheckoutAdidas: React.FC<CheckoutAdidasProps> = ({
  selectedColorway,
  onSelectColorway,
  selectedSize,
  onSelectSize,
  selectedBundle,
  onSelectBundle,
  onOpenSizeGuide,
  onBack,
  onOrderComplete,
}) => {
  // Stepped progression: 1 = Selection, 2 = Delivery, 3 = Speed, 4 = Payment (POD)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [fullName, setFullName] = useState('');
  const firstName = fullName.trim().split(' ')[0] || '';
  const lastName = fullName.trim().split(' ').slice(1).join(' ') || '';
  const [phone, setPhone] = useState('');
  const [hasSeparateWhatsapp, setHasSeparateWhatsapp] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Lagos');
  const [landmark, setLandmark] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Multi-pair bundle customization (Pair 2 & Pair 3 when bundle > 1)
  const [pair2Colorway, setPair2Colorway] = useState<Colorway>(() => COLORWAYS[1] || COLORWAYS[0]);
  const [pair2Size, setPair2Size] = useState<number>(selectedSize);
  const [pair3Colorway, setPair3Colorway] = useState<Colorway>(() => COLORWAYS[2] || COLORWAYS[0]);
  const [pair3Size, setPair3Size] = useState<number>(selectedSize);

  // Shipping & Payment Options
  const deliveryMethod = 'standard_free' as const;
  const paymentMethod = 'cod' as const;

  // Mobile Order Summary Drawer
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  // Submitting State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const deliveryFee = 0;
  const grandTotal = selectedBundle.totalPrice;

  // Real-time Nigerian Phone Validation feedback
  const phoneValidation = validateNigerianPhone(phone, 'Dispatch calling number');
  const whatsappValidation = hasSeparateWhatsapp
    ? validateNigerianPhone(whatsapp, 'WhatsApp number')
    : phoneValidation;

  // Validation for Step 2 (Delivery Address)
  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (First and Last Name)';
    }

    const pVal = validateNigerianPhone(phone, 'Dispatch phone number');
    if (!pVal.isValid) {
      newErrors.phone = pVal.error || 'Please enter a valid 11-digit Nigerian phone number';
    }

    if (hasSeparateWhatsapp) {
      const wVal = validateNigerianPhone(whatsapp, 'WhatsApp number');
      if (!wVal.isValid) {
        newErrors.whatsapp = wVal.error || 'Please enter a valid 11-digit Nigerian WhatsApp number';
      }
    }

    if (!streetAddress.trim()) {
      newErrors.streetAddress = 'Please enter your street address and house / flat number';
    }

    if (!city.trim()) {
      newErrors.city = 'Please enter your City / LGA / Town (e.g. Lekki, Ikeja, Wuse 2, Port Harcourt)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step element references for targeted, smooth, calm scrolling
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  const scrollToStep = (stepNumber: 1 | 2 | 3 | 4) => {
    // Wait for the next tick so React has applied DOM changes and container heights
    requestAnimationFrame(() => {
      setTimeout(() => {
        const refMap: Record<number, HTMLDivElement | null> = {
          1: step1Ref.current,
          2: step2Ref.current,
          3: step3Ref.current,
          4: step4Ref.current,
        };
        const targetEl = refMap[stepNumber];
        if (!targetEl) return;

        // Sticky header is ~55-65px; 80px offset ensures step header sits comfortably in view
        const headerOffset = window.innerWidth < 640 ? 76 : 84;
        const startY = window.pageYOffset || document.documentElement.scrollTop;
        const rect = targetEl.getBoundingClientRect();
        const targetY = Math.max(0, rect.top + startY - headerOffset);
        const distance = targetY - startY;

        // If already practically at the target, no scroll needed
        if (Math.abs(distance) < 8) return;

        // Slower, graceful scroll animation duration (750ms)
        const duration = 750;
        let startTime: number | null = null;
        let isCancelled = false;

        const onUserCancel = () => {
          isCancelled = true;
          window.removeEventListener('wheel', onUserCancel);
          window.removeEventListener('touchmove', onUserCancel);
        };

        window.addEventListener('wheel', onUserCancel, { passive: true });
        window.addEventListener('touchmove', onUserCancel, { passive: true });

        // Smooth cubic ease-in-out curve: slow initiation, seamless glide, gentle landing
        const easeInOutCubic = (t: number) => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateScroll = (currentTime: number) => {
          if (isCancelled) return;
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const ease = easeInOutCubic(progress);

          window.scrollTo(0, startY + distance * ease);

          if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
          } else {
            window.removeEventListener('wheel', onUserCancel);
            window.removeEventListener('touchmove', onUserCancel);
          }
        };

        requestAnimationFrame(animateScroll);
      }, 70);
    });
  };

  const handleProceedToStep2 = () => {
    setCurrentStep(2);
    scrollToStep(2);
  };

  const handleProceedToStep3 = () => {
    if (validateStep2()) {
      setCurrentStep(3);
      scrollToStep(3);
    } else {
      scrollToStep(2);
    }
  };

  const handleProceedToStep4 = () => {
    setCurrentStep(4);
    scrollToStep(4);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) {
      setCurrentStep(2);
      scrollToStep(2);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Generate unique order ID
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const orderId = `POLO-NG-${randomSuffix}`;

      // Estimated arrival
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + (state === 'Lagos' || state.includes('Abuja') ? 1 : 2));
      const formattedDate = tomorrow.toLocaleDateString('en-GB', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      });

      // Construct item list with multi-pair selections tallying with the chosen bundle
      const orderItems: OrderItem[] = [
        {
          colorway: selectedColorway,
          size: selectedSize,
          quantity: 1,
          pairLabel: selectedBundle.pairs > 1 ? 'Pair 1' : undefined,
        },
      ];

      if (selectedBundle.pairs >= 2) {
        orderItems.push({
          colorway: pair2Colorway,
          size: pair2Size,
          quantity: 1,
          pairLabel: 'Pair 2',
        });
      }

      if (selectedBundle.pairs >= 3) {
        orderItems.push({
          colorway: pair3Colorway,
          size: pair3Size,
          quantity: 1,
          pairLabel: 'Pair 3',
        });
      }

      const pVal = validateNigerianPhone(phone, 'Dispatch phone number');
      const wVal = hasSeparateWhatsapp && whatsapp.trim()
        ? validateNigerianPhone(whatsapp, 'WhatsApp number')
        : pVal;

      const newOrder: OrderData = {
        orderId,
        createdAt: new Date().toISOString(),
        customer: {
          fullName: fullName || `${firstName} ${lastName}`.trim() || 'Customer',
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: pVal.formattedDisplay || phone.trim(),
          phoneRaw: pVal.normalized11 || phone.replace(/\D/g, ''),
          phoneNetwork: pVal.network,
          whatsapp: wVal.formattedDisplay || (hasSeparateWhatsapp ? whatsapp.trim() : (pVal.formattedDisplay || phone.trim())),
          whatsappRaw: wVal.normalized11 || (hasSeparateWhatsapp ? whatsapp.replace(/\D/g, '') : (pVal.normalized11 || phone.replace(/\D/g, ''))),
          hasSeparateWhatsapp,
          streetAddress: streetAddress.trim(),
          state,
          city: city.trim() || state,
          landmark: landmark.trim(),
          deliveryNotes: deliveryNotes.trim(),
        },
        items: orderItems,
        bundleTier: selectedBundle.pairs,
        deliveryMethod,
        deliveryFee,
        selectedAddons: [],
        paymentMethod,
        subtotal: selectedBundle.totalPrice,
        discount: selectedBundle.savingsTotal,
        grandTotal,
        status: 'confirmed',
        estimatedDeliveryDate: formattedDate,
      };

      setIsSubmitting(false);
      onOrderComplete(newOrder);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] text-[#141414] pb-24">
      {/* Light-themed Minimalist Header */}
      <header className="bg-[#FAF9F5]/95 backdrop-blur-md text-[#141414] border-b border-[#E7E4DC] px-4 sm:px-6 py-3.5 sm:py-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#5C574F] hover:text-[#141414] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Product</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="flex flex-col items-center">
            <span className="font-crest text-[10px] tracking-[0.3em] uppercase text-[#735D43] font-semibold">
              TRUTHFIELD INT'L LTD
            </span>
            <span className="font-editorial text-sm sm:text-base font-bold tracking-widest uppercase text-[#141414]">
              CHECKOUT
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#2D6A4F] font-semibold">
            <Lock className="w-3.5 h-3.5 text-[#52B788]" />
            <span className="hidden sm:inline">256-Bit SSL Encrypted</span>
            <span className="sm:hidden">Secure</span>
          </div>
        </div>
      </header>

      {/* Stepped Progress Bar */}
      <div className="bg-white border-b border-[#E5E3DC] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => {
              setCurrentStep(1);
              scrollToStep(1);
            }}
            className={`flex items-center gap-2 cursor-pointer ${
              currentStep === 1 ? 'text-black border-b-2 border-black pb-1' : 'text-[#8C877E]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                currentStep >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              1
            </span>
            <span>Selection</span>
          </button>

          <span className="text-gray-300">———</span>

          <button
            type="button"
            onClick={() => {
              setCurrentStep(2);
              scrollToStep(2);
            }}
            className={`flex items-center gap-2 cursor-pointer ${
              currentStep === 2 ? 'text-black border-b-2 border-black pb-1' : 'text-[#8C877E]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                currentStep >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              2
            </span>
            <span>Delivery</span>
          </button>

          <span className="text-gray-300">———</span>

          <button
            type="button"
            onClick={() => {
              if (validateStep2()) {
                setCurrentStep(3);
                scrollToStep(3);
              } else {
                scrollToStep(2);
              }
            }}
            className={`flex items-center gap-2 cursor-pointer ${
              currentStep === 3 ? 'text-black border-b-2 border-black pb-1' : 'text-[#8C877E]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                currentStep >= 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              3
            </span>
            <span>Speed</span>
          </button>

          <span className="text-gray-300">———</span>

          <button
            type="button"
            onClick={() => {
              if (validateStep2()) {
                setCurrentStep(4);
                scrollToStep(4);
              } else {
                scrollToStep(2);
              }
            }}
            className={`flex items-center gap-2 cursor-pointer ${
              currentStep === 4 ? 'text-black border-b-2 border-black pb-1' : 'text-[#8C877E]'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                currentStep >= 4 ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              4
            </span>
            <span>Payment (POD)</span>
          </button>
        </div>
      </div>

      {/* Main Checkout Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* Mobile Accordion Toggle for Order Summary */}
        <div className="lg:hidden mb-4 bg-white border border-[#E5E3DC] p-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowMobileSummary(!showMobileSummary)}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black cursor-pointer"
          >
            <span>{showMobileSummary ? 'Hide Order Summary' : 'View Order Summary'}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showMobileSummary ? 'rotate-180' : ''}`}
            />
          </button>
          <div className="text-sm font-bold font-mono text-black tabular-nums">
            ₦{grandTotal.toLocaleString()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT 7 COLS: FORM STEPS ================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust Reassurance Strip */}
            <div className="bg-[#EBF7EE] border border-[#52B788] p-3.5 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#144729] shrink-0" />
              <div className="text-xs text-[#144729]">
                <strong className="font-bold uppercase tracking-wider block">
                  Payment on Delivery Active
                </strong>
                <span>You only pay when the rider delivers and you inspect the shoes.</span>
              </div>
            </div>

            {/* ================= STEP 1: SNEAKER & BUNDLE SELECTION ================= */}
            <div
              ref={step1Ref}
              className={`bg-white border transition-all ${
                currentStep === 1
                  ? 'border-black shadow-sm p-5 sm:p-6'
                  : 'border-[#E0DBD0] p-4 opacity-90'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-mono font-bold flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-editorial text-lg font-bold uppercase tracking-wide">
                    Purchasing Options & Selection
                  </h2>
                </div>
                {currentStep !== 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      scrollToStep(1);
                    }}
                    className="text-xs font-semibold text-[#842A46] uppercase hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === 1 ? (
                <div className="space-y-6">
                  {/* Colorway Selection */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="uppercase font-semibold tracking-wider text-[#141414]">
                        Select Colorway:
                      </span>
                      <span className="font-medium text-[#735D43]">{selectedColorway.name}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                      {COLORWAYS.map((c) => {
                        const isSelected = selectedColorway.id === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => onSelectColorway(c)}
                            className={`p-2 sm:p-2.5 border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                              isSelected
                                ? 'border-[#141414] bg-white ring-2 ring-[#141414] shadow-sm'
                                : 'border-[#D9D3C5] bg-[#F8F6F0] hover:border-[#8C877E] hover:bg-white'
                            }`}
                          >
                            <div className="space-y-1.5 w-full">
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span
                                  className="w-3.5 h-3.5 rounded-full border border-black/25 shrink-0 shadow-xs"
                                  style={{ backgroundColor: c.swatchHex }}
                                />
                                <span className="text-[11px] font-bold text-[#141414] truncate">
                                  {c.name}
                                </span>
                              </div>

                              <div className="aspect-[4/3] w-full overflow-hidden bg-white border border-[#E7E4DC] relative flex items-center justify-center p-1">
                                <img
                                  src={c.image}
                                  alt={c.name}
                                  className="w-full h-full object-contain"
                                  referrerPolicy="no-referrer"
                                />
                                {c.badge && (
                                  <span className="absolute top-1 left-1 bg-black/85 text-white text-[8px] font-bold px-1 py-0.5 uppercase tracking-wider">
                                    {c.badge}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#735D43]">
                              <span className="truncate uppercase font-medium tracking-tight">
                                {c.code.split('/')[0].trim()}
                              </span>
                              {isSelected && (
                                <span className="bg-[#141414] text-white p-0.5 ml-1 shrink-0">
                                  <Check className="w-2.5 h-2.5" />
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="uppercase font-semibold tracking-wider text-[#141414]">
                        Select Size:
                      </span>
                      <button
                        type="button"
                        onClick={onOpenSizeGuide}
                        className="text-[#842A46] font-semibold underline underline-offset-2 hover:text-[#141414] transition-colors cursor-pointer"
                      >
                        Size & Fit Guide
                      </button>
                    </div>

                    <div className="grid grid-cols-6 gap-2">
                      {SIZES.map((s) => {
                        const isSelected = selectedSize === s.eu;
                        return (
                          <button
                            key={s.eu}
                            type="button"
                            onClick={() => onSelectSize(s.eu)}
                            className={`py-2.5 sm:py-3 border text-center transition-all cursor-pointer font-mono tabular-nums ${
                              isSelected
                                ? 'bg-[#141414] text-white border-[#141414] font-bold shadow-sm'
                                : 'bg-white text-[#141414] border-[#D9D3C5] hover:border-[#141414]'
                            }`}
                          >
                            <div className="text-sm sm:text-base font-bold leading-none">{s.eu}</div>
                            <div className="text-[9px] uppercase tracking-tight text-[#8C877E] mt-0.5">
                              UK {s.uk}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bundle Multiplier Selector */}
                  <div className="space-y-2 pt-2 border-t border-[#E7E4DC]">
                    <span className="block text-xs uppercase font-semibold tracking-wider text-[#141414]">
                      Choose Quantity / Bundle Deal:
                    </span>

                    <div className="space-y-2">
                      {BUNDLE_OPTIONS.map((b) => {
                        const isSelected = selectedBundle.pairs === b.pairs;
                        return (
                          <div
                            key={b.pairs}
                            onClick={() => onSelectBundle(b)}
                            className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? 'border-[#842A46] bg-[#FCF8F9] ring-1 ring-[#842A46]'
                                : 'border-[#D9D3C5] bg-white hover:border-[#141414]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected
                                    ? 'border-[#842A46] bg-[#842A46] text-white'
                                    : 'border-[#8C877E]'
                                }`}
                              >
                                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <div>
                                <div className="text-xs sm:text-sm font-bold text-[#141414]">
                                  {b.label}
                                </div>
                                <div className="text-[11px] text-[#736E65]">
                                  ₦{b.pricePerPair.toLocaleString()} per pair · Save ₦{b.savingsTotal.toLocaleString()}
                                </div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm sm:text-base font-bold text-[#141414] font-mono tabular-nums">
                                ₦{b.totalPrice.toLocaleString()}
                              </div>
                              {b.badge && (
                                <span className="inline-block bg-[#E5A83B] text-black text-[9px] font-bold px-1.5 py-0.2 uppercase tracking-wide">
                                  {b.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Multi-pair Bundle Customization */}
                    {selectedBundle.pairs >= 2 && (
                      <div className="mt-4 p-4 bg-[#F8F6F0] border border-[#DDD6C8] space-y-4">
                        <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#141414]">
                            Customize Colors & Sizes for Your {selectedBundle.pairs}-Pair Pack
                          </span>
                          <span className="text-[10px] text-[#735D43] font-semibold bg-[#EBE7DD] px-2 py-0.5">
                            Mix & Match Allowed
                          </span>
                        </div>

                        {/* Pair 1 overview */}
                        <div className="p-2.5 bg-white border border-[#E7E4DC] flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={selectedColorway.image}
                              alt=""
                              className="w-10 h-10 object-cover border border-[#DDD6C8] shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="font-bold text-[#141414] block">Pair 1 (Main Selection):</span>
                              <span className="text-[#545048] truncate block">
                                {selectedColorway.name} · Size EU {selectedSize}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold text-[#8C877E] shrink-0">Selected Above</span>
                        </div>

                        {/* Pair 2 selector */}
                        <div className="p-3 bg-white border border-[#E7E4DC] space-y-2.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#141414] uppercase tracking-wide">
                              Pair 2 Selection:
                            </span>
                            <span className="text-[#735D43] font-medium truncate">
                              {pair2Colorway.name} (EU {pair2Size})
                            </span>
                          </div>

                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {COLORWAYS.map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => setPair2Colorway(c)}
                                className={`p-1 border flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                                  pair2Colorway.id === c.id
                                    ? 'border-[#141414] bg-[#FAF9F5] ring-2 ring-black'
                                    : 'border-[#DDD6C8] bg-white opacity-80 hover:opacity-100'
                                }`}
                              >
                                <div className="w-8 h-8 bg-white border border-[#E7E4DC] rounded-xs flex items-center justify-center p-0.5 shrink-0">
                                  <img src={c.image} alt={c.name} className="w-full h-full object-contain" />
                                </div>
                                <span className="text-[10px] font-bold pr-1">{c.name.split(' ')[0]}</span>
                              </button>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-[11px] text-[#735D43] shrink-0">Size:</span>
                            <div className="flex gap-1.5 flex-wrap">
                              {SIZES.map((s) => (
                                <button
                                  key={s.eu}
                                  type="button"
                                  onClick={() => setPair2Size(s.eu)}
                                  className={`w-8 h-8 text-xs font-mono font-bold border cursor-pointer transition-all ${
                                    pair2Size === s.eu
                                      ? 'bg-[#141414] text-white border-black'
                                      : 'bg-white text-black border-[#DDD6C8] hover:border-black'
                                  }`}
                                >
                                  {s.eu}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Pair 3 selector (if 3 pairs) */}
                        {selectedBundle.pairs >= 3 && (
                          <div className="p-3 bg-white border border-[#E7E4DC] space-y-2.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-[#141414] uppercase tracking-wide">
                                Pair 3 Selection:
                              </span>
                              <span className="text-[#735D43] font-medium truncate">
                                {pair3Colorway.name} (EU {pair3Size})
                              </span>
                            </div>

                            <div className="flex gap-2 overflow-x-auto pb-1">
                              {COLORWAYS.map((c) => (
                                <button
                                  key={c.id}
                                  type="button"
                                  onClick={() => setPair3Colorway(c)}
                                  className={`p-1 border flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                                    pair3Colorway.id === c.id
                                      ? 'border-[#141414] bg-[#FAF9F5] ring-2 ring-black'
                                      : 'border-[#DDD6C8] bg-white opacity-80 hover:opacity-100'
                                  }`}
                                >
                                  <div className="w-8 h-8 bg-white border border-[#E7E4DC] rounded-xs flex items-center justify-center p-0.5 shrink-0">
                                  <img src={c.image} alt={c.name} className="w-full h-full object-contain" />
                                </div>
                                  <span className="text-[10px] font-bold pr-1">{c.name.split(' ')[0]}</span>
                                </button>
                              ))}
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-[11px] text-[#735D43] shrink-0">Size:</span>
                              <div className="flex gap-1.5 flex-wrap">
                                {SIZES.map((s) => (
                                  <button
                                    key={s.eu}
                                    type="button"
                                    onClick={() => setPair3Size(s.eu)}
                                    className={`w-8 h-8 text-xs font-mono font-bold border cursor-pointer transition-all ${
                                      pair3Size === s.eu
                                        ? 'bg-[#141414] text-white border-black'
                                        : 'bg-white text-black border-[#DDD6C8] hover:border-black'
                                    }`}
                                  >
                                    {s.eu}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Confidence Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-3 border-t border-[#E7E4DC]">
                    <div className="p-2.5 sm:p-3 bg-[#F3EFE6] border border-[#E8E4DA] flex items-center gap-3 text-left">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Truck className="w-4 h-4 text-[#141414]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#141414] leading-tight">Within 24h Delivery</div>
                        <div className="text-[10px] sm:text-[11px] text-[#736E65]">To your doorstep / office</div>
                      </div>
                    </div>
                    <div className="p-2.5 sm:p-3 bg-[#F3EFE6] border border-[#E8E4DA] flex items-center gap-3 text-left">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xs">
                        <Award className="w-4 h-4 text-[#842A46]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#141414] leading-tight">100% Authentic</div>
                        <div className="text-[10px] sm:text-[11px] text-[#736E65]">Truthfield Guarantee</div>
                      </div>
                    </div>
                  </div>

                  {/* Continue to Step 2 Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleProceedToStep2}
                      className="w-full py-4 px-6 bg-[#842A46] hover:bg-[#6f2239] active:scale-[0.99] text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Continue to Delivery Address →</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[#141414] uppercase tracking-wider">
                      {selectedBundle.label} · ₦{selectedBundle.totalPrice.toLocaleString()}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentStep(1);
                        scrollToStep(1);
                      }}
                      className="text-xs font-semibold text-[#842A46] uppercase hover:underline cursor-pointer"
                    >
                      Change Selection
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="flex items-center gap-2.5 p-2 bg-[#FAF9F5] border border-[#E7E4DC]">
                      <img
                        src={selectedColorway.image}
                        alt={selectedColorway.name}
                        className="w-9 h-9 object-cover border border-[#D9D3C5] bg-[#ECE8DF]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-[#141414] truncate">
                          {selectedBundle.pairs > 1 ? 'Pair 1: ' : ''}{selectedColorway.name}
                        </div>
                        <div className="text-[#735D43] text-[11px]">Size: EU {selectedSize}</div>
                      </div>
                    </div>

                    {selectedBundle.pairs >= 2 && (
                      <div className="flex items-center gap-2.5 p-2 bg-[#FAF9F5] border border-[#E7E4DC]">
                        <img
                          src={pair2Colorway.image}
                          alt={pair2Colorway.name}
                          className="w-9 h-9 object-cover border border-[#D9D3C5] bg-[#ECE8DF]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-[#141414] truncate">Pair 2: {pair2Colorway.name}</div>
                          <div className="text-[#735D43] text-[11px]">Size: EU {pair2Size}</div>
                        </div>
                      </div>
                    )}

                    {selectedBundle.pairs >= 3 && (
                      <div className="flex items-center gap-2.5 p-2 bg-[#FAF9F5] border border-[#E7E4DC] sm:col-span-2">
                        <img
                          src={pair3Colorway.image}
                          alt={pair3Colorway.name}
                          className="w-9 h-9 object-cover border border-[#D9D3C5] bg-[#ECE8DF]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-[#141414] truncate">Pair 3: {pair3Colorway.name}</div>
                          <div className="text-[#735D43] text-[11px]">Size: EU {pair3Size}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ================= STEP 2: DELIVERY & CONTACT DETAILS ================= */}
            <div
              ref={step2Ref}
              className={`bg-white border transition-all ${
                currentStep === 2
                  ? 'border-black shadow-sm p-5 sm:p-6'
                  : 'border-[#E0DBD0] p-4 opacity-90'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-mono font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="font-editorial text-lg font-bold uppercase tracking-wide">
                    Delivery Address & Contact
                  </h2>
                </div>
                {currentStep > 2 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(2);
                      scrollToStep(2);
                    }}
                    className="text-xs font-semibold text-[#842A46] uppercase hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === 2 ? (
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#141414] mb-1">
                      Full Name (First and Last Name) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Babatunde Adeleke"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className={`w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border rounded-none focus:outline-none focus:border-black transition-colors ${
                        errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-[#D9D3C5]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone Number (Nigerian Dispatch Call Verification) */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#141414] mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#842A46]" />
                        <span>Phone Number (Dispatch Call)</span>
                        <span className="text-red-500">*</span>
                      </span>
                      {phoneValidation.isValid && (
                        <span className="text-[10px] font-bold text-[#2D6A4F] bg-[#E7F6ED] px-2 py-0.5 border border-[#52B788] flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#2D6A4F]" />
                          <span>Valid Nigerian Number ({phoneValidation.network || 'Verified'})</span>
                        </span>
                      )}
                    </label>

                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center gap-1 text-xs font-bold text-[#5C574F] select-none pointer-events-none">
                        <span>🇳🇬</span>
                        <span>+234</span>
                        <span className="text-gray-300">|</span>
                      </div>
                      <input
                        type="tel"
                        placeholder="0803 123 4567 or 0810 226 8521"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPhone(val);
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        onBlur={() => {
                          if (phone.trim()) {
                            const formatted = formatAsNigerianPhone(phone);
                            setPhone(formatted);
                          }
                        }}
                        className={`w-full pl-20 pr-10 py-3 text-sm bg-[#FAF9F5] border rounded-none focus:outline-none focus:border-black font-mono transition-colors ${
                          errors.phone ? 'border-red-500 bg-red-50/20' : phoneValidation.isValid ? 'border-[#52B788]' : 'border-[#D9D3C5]'
                        }`}
                      />
                      {phoneValidation.isValid && (
                        <Check className="w-4 h-4 text-[#2D6A4F] absolute right-3 pointer-events-none" />
                      )}
                    </div>
                    {errors.phone ? (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.phone}
                      </p>
                    ) : (
                      <p className="text-[10px] text-[#736E65] mt-1">
                        Must be a valid 11-digit Nigerian mobile line. Our logistics supervisor will call you on this line before rider dispatch.
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Toggle & Optional Revealed Input */}
                  <div className="p-3.5 bg-[#FAF9F5] border border-[#E7E4DC] space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <div className="relative inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={hasSeparateWhatsapp}
                          onChange={(e) => {
                            setHasSeparateWhatsapp(e.target.checked);
                            if (!e.target.checked) {
                              setWhatsapp('');
                              if (errors.whatsapp) setErrors({ ...errors, whatsapp: '' });
                            }
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-[#D9D3C5] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#25D366]"></div>
                      </div>
                      <span className="text-xs text-[#2D2A26] font-medium">
                        My WhatsApp number is different from my calling phone number
                      </span>
                    </label>

                    {hasSeparateWhatsapp && (
                      <div className="pt-3 border-t border-[#E7E4DC] space-y-1">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#141414] mb-1 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                            <span>WhatsApp Number</span>
                            <span className="text-red-500">*</span>
                          </span>
                          {whatsappValidation.isValid && (
                            <span className="text-[10px] font-bold text-[#2D6A4F] bg-[#E7F6ED] px-2 py-0.5 border border-[#52B788] flex items-center gap-1">
                              <Check className="w-3 h-3 text-[#2D6A4F]" />
                              <span>Valid ({whatsappValidation.network || 'Nigerian'})</span>
                            </span>
                          )}
                        </label>
                        <div className="relative flex items-center">
                          <div className="absolute left-3 flex items-center gap-1 text-xs font-bold text-[#5C574F] select-none pointer-events-none">
                            <span>🇳🇬</span>
                            <span>+234</span>
                            <span className="text-gray-300">|</span>
                          </div>
                          <input
                            type="tel"
                            placeholder="0801 234 5678 (WhatsApp)"
                            value={whatsapp}
                            onChange={(e) => {
                              setWhatsapp(e.target.value);
                              if (errors.whatsapp) setErrors({ ...errors, whatsapp: '' });
                            }}
                            onBlur={() => {
                              if (whatsapp.trim()) {
                                const formatted = formatAsNigerianPhone(whatsapp);
                                setWhatsapp(formatted);
                              }
                            }}
                            className={`w-full pl-20 pr-10 py-3 text-sm bg-white border rounded-none focus:outline-none focus:border-black font-mono transition-colors ${
                              errors.whatsapp ? 'border-red-500 bg-red-50/20' : whatsappValidation.isValid ? 'border-[#52B788]' : 'border-[#D9D3C5]'
                            }`}
                          />
                          {whatsappValidation.isValid && (
                            <Check className="w-4 h-4 text-[#2D6A4F] absolute right-3 pointer-events-none" />
                          )}
                        </div>
                        {errors.whatsapp && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.whatsapp}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Street Address & House / Flat No. */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#141414] mb-1">
                      Street Address and House / Flat No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flat 4B, Plot 12 Admiralty Way"
                      value={streetAddress}
                      onChange={(e) => {
                        setStreetAddress(e.target.value);
                        if (errors.streetAddress) setErrors({ ...errors, streetAddress: '' });
                      }}
                      className={`w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border rounded-none focus:outline-none focus:border-black transition-colors ${
                        errors.streetAddress ? 'border-red-500' : 'border-[#D9D3C5]'
                      }`}
                    />
                    {errors.streetAddress && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.streetAddress}
                      </p>
                    )}
                  </div>

                  {/* City / LGA / Town & State */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#141414] mb-1">
                        City / LGA / Town <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Lekki Phase 1, Ikeja, Wuse 2"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          if (errors.city) setErrors({ ...errors, city: '' });
                        }}
                        className={`w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border rounded-none focus:outline-none focus:border-black transition-colors ${
                          errors.city ? 'border-red-500' : 'border-[#D9D3C5]'
                        }`}
                      />
                      {errors.city && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#141414] mb-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#D9D3C5] rounded-none focus:outline-none focus:border-black cursor-pointer"
                      >
                        {NIGERIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Closest Landmark / Bus Stop */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#141414] mb-1">
                      Closest Bus Stop / Prominent Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Ebeano Supermarket / Beside Total Filling Station"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-3.5 py-3 text-sm bg-[#FAF9F5] border border-[#D9D3C5] rounded-none focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Continue Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleProceedToStep3}
                      className="w-full py-4 px-6 bg-[#842A46] hover:bg-[#6f2239] active:scale-[0.99] text-white text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm text-center flex items-center justify-center gap-2"
                    >
                      <span>Continue to Shipping Speed →</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-[#545048] space-y-1">
                  <div className="font-bold text-[#141414]">{fullName || 'Customer'}</div>
                  <div>
                    {streetAddress || 'Address specified'}, {city ? `${city}, ` : ''}{state}
                    {landmark ? ` (Landmark: ${landmark})` : ''}
                  </div>
                  <div className="font-mono text-[#735D43] flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[#141414]">📞 {phone}</span>
                    {phoneValidation.isValid && phoneValidation.network && (
                      <span className="text-[10px] bg-[#E7F6ED] text-[#2D6A4F] px-1.5 py-0.2 font-sans font-bold">
                        {phoneValidation.network}
                      </span>
                    )}
                    {hasSeparateWhatsapp && whatsapp && (
                      <span>• WA: {whatsapp}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ================= STEP 3: DELIVERY SPEED ================= */}
            <div
              ref={step3Ref}
              className={`bg-white border transition-all ${
                currentStep === 3
                  ? 'border-black shadow-sm p-5 sm:p-6'
                  : 'border-[#E0DBD0] p-4 opacity-90'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-mono font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="font-editorial text-lg font-bold uppercase tracking-wide">
                    Delivery Speed
                  </h2>
                </div>
                {currentStep > 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(3);
                      scrollToStep(3);
                    }}
                    className="text-xs font-semibold text-[#842A46] uppercase hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === 3 ? (
                <div className="space-y-4">
                  {/* Single Delivery Option: Standard Delivery within 24 hours */}
                  <div className="p-4 border border-[#52B788] bg-[#F3F9F5] ring-1 ring-[#52B788] transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full border border-[#52B788] bg-[#52B788] text-white mt-0.5 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs sm:text-sm font-bold text-[#144729] uppercase tracking-wider flex items-center gap-2">
                            <span>Standard Delivery within 24 Hours</span>
                            <span className="bg-[#144729] text-white text-[9px] font-bold px-1.5 py-0.2 uppercase">
                              INCLUDED
                            </span>
                          </div>
                          <div className="text-xs text-[#2D6A4F] leading-relaxed">
                            Delivered safely to your doorstep or office within 24 hours by our dispatch rider.
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] shrink-0 font-mono">
                        FREE
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleProceedToStep4}
                      className="w-full py-4 px-6 bg-[#842A46] hover:bg-[#6f2239] active:scale-[0.99] text-white text-xs sm:text-sm font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm text-center flex items-center justify-center gap-2"
                    >
                      <span>Continue to Payment Method →</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-[#545048] flex items-center justify-between">
                  <span>Standard Delivery within 24 Hours</span>
                  <span className="font-bold text-[#52B788]">FREE</span>
                </div>
              )}
            </div>

            {/* ================= STEP 4: PAYMENT METHOD (PAYMENT ON DELIVERY) ================= */}
            <div
              ref={step4Ref}
              className={`bg-white border transition-all ${
                currentStep === 4
                  ? 'border-black shadow-sm p-5 sm:p-6'
                  : 'border-[#E0DBD0] p-4 opacity-90'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#E7E4DC] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-mono font-bold flex items-center justify-center">
                    4
                  </span>
                  <h2 className="font-editorial text-lg font-bold uppercase tracking-wide">
                    Payment Method
                  </h2>
                </div>
              </div>

              {currentStep === 4 ? (
                <div className="space-y-4">
                  {/* Single Payment Option: Payment on Delivery */}
                  <div className="p-4 border border-[#52B788] bg-[#F3F9F5] ring-2 ring-[#52B788] transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border border-[#52B788] bg-[#52B788] text-white mt-0.5 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-[#144729] uppercase tracking-wider">
                            Payment on Delivery (Cash or Bank Transfer to Rider)
                          </span>
                          <span className="bg-[#144729] text-white text-[9px] font-bold px-1.5 py-0.2 uppercase">
                            RECOMMENDED
                          </span>
                        </div>
                        <p className="text-xs text-[#205234] leading-relaxed">
                          Pay <strong>ZERO kobo now</strong>. You only pay when the rider arrives, after you have confirmed your order.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Final Submit CTA */}
                  <div className="pt-4 space-y-3">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleFinalSubmit}
                      className="w-full bg-[#842A46] hover:bg-[#6f2239] active:scale-[0.99] text-white py-4 px-6 text-sm sm:text-base font-bold uppercase tracking-widest transition-all animate-btn-shadow flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Generating Order & Dispatch Ticket...</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2.5">
                          <span>
                            PLACE ORDER — PAY ₦{grandTotal.toLocaleString()} ON DELIVERY
                          </span>
                          <ChevronRight className="w-5 h-5 animate-pulse-right shrink-0" />
                        </span>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-[#736E65] leading-relaxed">
                      By clicking "Place Order", you agree to receive a phone call from our dispatch supervisor within 2 hours to confirm your address before your rider departs.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-[#545048]">
                  <span>Payment on Delivery (Cash or Bank Transfer upon arrival)</span>
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT 5 COLS: ADIDAS STICKY ORDER SUMMARY ================= */}
          <div
            className={`lg:col-span-5 space-y-4 ${
              showMobileSummary ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white border border-[#141414] p-5 sm:p-6 sticky top-24 shadow-sm space-y-5">
              <h3 className="font-editorial text-lg font-bold uppercase tracking-wide border-b border-[#E7E4DC] pb-3">
                Order Summary
              </h3>

              {/* Product preview card & multi-pair list */}
              <div className="space-y-2.5">
                <div className="flex gap-3 items-start">
                  <div className="w-16 h-16 bg-[#F3EFE7] border border-[#DDD5C5] shrink-0 overflow-hidden relative">
                    <img
                      src={selectedColorway.image}
                      alt={selectedColorway.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#735D43]">
                      {SNEAKER_PRODUCT.brand}
                    </div>
                    <h4 className="font-editorial text-sm font-bold text-[#141414] truncate">
                      {SNEAKER_PRODUCT.title}
                    </h4>
                    <div className="text-xs text-[#545048]">
                      {selectedBundle.pairs > 1 ? (
                        <span className="font-bold text-[#842A46]">{selectedBundle.label}</span>
                      ) : (
                        <span>Color: <strong className="text-[#141414]">{selectedColorway.name}</strong></span>
                      )}
                    </div>
                    {currentStep !== 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentStep(1);
                          scrollToStep(1);
                        }}
                        className="text-[11px] font-semibold text-[#842A46] uppercase hover:underline cursor-pointer"
                      >
                        Change Selection
                      </button>
                    )}
                  </div>
                </div>

                {/* Items in Pack breakdown */}
                <div className="p-2.5 bg-[#FAF9F5] border border-[#E7E4DC] text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[#141414]">
                    <span className="font-medium truncate">
                      {selectedBundle.pairs > 1 ? '1. ' : ''}{selectedColorway.name}
                    </span>
                    <span className="font-mono font-bold text-[#735D43] shrink-0 ml-2">EU {selectedSize}</span>
                  </div>

                  {selectedBundle.pairs >= 2 && (
                    <div className="flex items-center justify-between text-[#141414]">
                      <span className="font-medium truncate">2. {pair2Colorway.name}</span>
                      <span className="font-mono font-bold text-[#735D43] shrink-0 ml-2">EU {pair2Size}</span>
                    </div>
                  )}

                  {selectedBundle.pairs >= 3 && (
                    <div className="flex items-center justify-between text-[#141414]">
                      <span className="font-medium truncate">3. {pair3Colorway.name}</span>
                      <span className="font-mono font-bold text-[#735D43] shrink-0 ml-2">EU {pair3Size}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 border-t border-b border-[#E7E4DC] py-4 text-xs">
                <div className="flex justify-between text-[#5C574F]">
                  <span>Original Value:</span>
                  <span className="line-through font-mono">
                    ₦{selectedBundle.originalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-[#5C574F]">
                  <span>Black Friday Bundle Price:</span>
                  <span className="font-mono text-[#141414] font-semibold">
                    ₦{selectedBundle.totalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-[#842A46] font-semibold">
                  <span>Savings Applied (77% OFF):</span>
                  <span className="font-mono">-₦{selectedBundle.savingsTotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-[#5C574F]">
                  <span>Doorstep Delivery:</span>
                  <span className="font-mono font-semibold text-[#52B788]">
                    FREE
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-xs uppercase font-bold tracking-wider text-[#141414]">
                    Total Payable on Delivery:
                  </div>
                  <div className="text-[11px] text-[#52B788] font-medium">
                    (Zero advance payment required)
                  </div>
                </div>
                <div className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#141414] font-mono tabular-nums">
                  ₦{grandTotal.toLocaleString()}
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-3 bg-[#FAF9F5] border border-[#E7E4DC] text-[11px] space-y-1.5 text-[#545048]">
                <div className="font-semibold text-[#141414] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#52B788]" /> What happens next:
                </div>
                <ul className="space-y-1 list-disc list-inside text-[#666]">
                  <li>After filling the form and submitting it.</li>
                  <li>
                    Dispatch will call you from <strong className="text-[#141414]">{STORE_CONTACT.dispatchPhone}</strong> within 1 hour.
                  </li>
                  <li>Rider delivers within 24 hours.</li>
                  <li>You inspect and confirm the shoe before paying.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
