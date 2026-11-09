import React, { useState, useEffect } from 'react';
import { COLORWAYS, SIZES, BUNDLE_OPTIONS } from './data/productData';
import { Colorway, BundleOption, OrderData } from './types';
import { TopBar } from './components/TopBar';
import { HeroProduct } from './components/HeroProduct';
import { ProductAnatomy } from './components/ProductAnatomy';
import { CraftsmanshipDetails } from './components/CraftsmanshipDetails';
import { HowPaymentOnDeliveryWorks } from './components/HowPaymentOnDeliveryWorks';
import { CustomerReviews } from './components/CustomerReviews';
import { FaqSection } from './components/FaqSection';
import { SizeGuideModal } from './components/SizeGuideModal';
import { StickyBottomBar } from './components/StickyBottomBar';
import { CheckoutAdidas } from './components/CheckoutAdidas';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Footer } from './components/Footer';
import { AdminReceiptModal } from './components/AdminReceiptModal';

export default function App() {
  // Funnel Views: 'landing' | 'checkout' | 'confirmation'
  const [view, setView] = useState<'landing' | 'checkout' | 'confirmation'>('landing');

  // Dynamic 2.5% font-size scale: active site-wide on storefront & checkout, bypassed on confirmation screen
  useEffect(() => {
    if (view === 'confirmation') {
      document.documentElement.classList.add('confirmation-view');
    } else {
      document.documentElement.classList.remove('confirmation-view');
    }
  }, [view]);

  // Product Selection State
  const [selectedColorway, setSelectedColorway] = useState<Colorway>(COLORWAYS[0]);
  const [selectedSize, setSelectedSize] = useState<number>(42);
  const [selectedBundle, setSelectedBundle] = useState<BundleOption>(BUNDLE_OPTIONS[0]);

  // Modal State
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdminReceiptOpen, setIsAdminReceiptOpen] = useState(false);

  // Completed Orders Tracking
  const [allOrders, setAllOrders] = useState<OrderData[]>(() => {
    try {
      const listStr = localStorage.getItem('all_polo_orders');
      if (listStr) return JSON.parse(listStr);
      const single = localStorage.getItem('last_polo_order');
      return single ? [JSON.parse(single)] : [];
    } catch {
      return [];
    }
  });

  const [currentOrder, setCurrentOrder] = useState<OrderData | null>(() => {
    try {
      const saved = localStorage.getItem('last_polo_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedAdminOrder, setSelectedAdminOrder] = useState<OrderData | null>(null);

  // Navigate to checkout
  const handleGoToCheckout = () => {
    setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to landing
  const handleBackToLanding = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order completed
  const handleOrderComplete = (order: OrderData) => {
    setCurrentOrder(order);
    setAllOrders((prev) => {
      const updated = [order, ...prev.filter((o) => o.orderId !== order.orderId)];
      try {
        localStorage.setItem('all_polo_orders', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    try {
      localStorage.setItem('last_polo_order', JSON.stringify(order));
    } catch {
      // ignore
    }
    setView('confirmation');
  };

  // Reset to storefront
  const handleResetToHome = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeAdminReceiptOrder = selectedAdminOrder || currentOrder || allOrders[0] || null;

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#141414] flex flex-col font-sans selection:bg-[#842A46] selection:text-white">
      {view === 'landing' && (
        <>
          <TopBar onOrderNowClick={handleGoToCheckout} />

          <main className="flex-1">
            <HeroProduct
              selectedColorway={selectedColorway}
              onSelectColorway={setSelectedColorway}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              selectedBundle={selectedBundle}
              onSelectBundle={setSelectedBundle}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              onOrderNow={handleGoToCheckout}
            />

            <ProductAnatomy onOrderClick={handleGoToCheckout} />

            <CraftsmanshipDetails />

            <HowPaymentOnDeliveryWorks onOrderClick={handleGoToCheckout} />

            <CustomerReviews />

            <FaqSection onOrderClick={handleGoToCheckout} />
          </main>

          <Footer
            onOpenAdminReceipt={
              allOrders.length > 0 ? () => setIsAdminReceiptOpen(true) : undefined
            }
          />

          {/* Sticky Bottom Bar for Mobile only (<15% viewport height) */}
          <StickyBottomBar
            selectedColorway={selectedColorway}
            selectedSize={selectedSize}
            selectedBundle={selectedBundle}
            onOrderNow={handleGoToCheckout}
          />
        </>
      )}

      {/* Size Guide Modal - accessible from both landing and checkout */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        selectedSize={selectedSize}
        onSelectSize={(s) => setSelectedSize(s)}
      />

      {/* Global Admin Receipt Modal (when opened from Footer) */}
      {activeAdminReceiptOrder && (
        <AdminReceiptModal
          order={activeAdminReceiptOrder}
          isOpen={isAdminReceiptOpen}
          onClose={() => setIsAdminReceiptOpen(false)}
          allOrders={allOrders}
          onSelectOrder={(o) => setSelectedAdminOrder(o)}
        />
      )}

      {view === 'checkout' && (
        <CheckoutAdidas
          selectedColorway={selectedColorway}
          onSelectColorway={setSelectedColorway}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          selectedBundle={selectedBundle}
          onSelectBundle={setSelectedBundle}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onBack={handleBackToLanding}
          onOrderComplete={handleOrderComplete}
        />
      )}

      {view === 'confirmation' && currentOrder && (
        <OrderConfirmation
          order={currentOrder}
          onResetToHome={handleResetToHome}
          allOrders={allOrders}
        />
      )}
    </div>
  );
}
