import React, { useState } from 'react';
import {
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  ChevronRight,
  FileText,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { OrderData } from '../types';
import { STORE_CONTACT } from '../data/productData';
import { AdminReceiptModal } from './AdminReceiptModal';

interface OrderConfirmationProps {
  order: OrderData;
  onResetToHome: () => void;
  allOrders?: OrderData[];
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order,
  onResetToHome,
  allOrders = [],
}) => {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<OrderData>(order);

  // Build itemized shoe pairs text for WhatsApp dispatch receipt
  const itemsListText = order.items
    .map(
      (item, idx) =>
        `👟 ${order.items.length > 1 ? `Pair ${idx + 1}: ` : ''}${item.colorway.name} (Size: EU ${item.size})`
    )
    .join('\n');

  const whatsappMessage = encodeURIComponent(
    `Hello Truthfield Int'l Ltd Dispatch Team, I just completed my order on your store!\n\n` +
      `Order Reference: ${order.orderId}\n` +
      `Customer: ${order.customer.fullName}\n` +
      `Calling Phone: ${order.customer.phone}${order.customer.phoneNetwork ? ` (${order.customer.phoneNetwork})` : ''}\n` +
      (order.customer.hasSeparateWhatsapp && order.customer.whatsapp ? `💬 WhatsApp: ${order.customer.whatsapp}\n` : '') +
      `Delivery Address: ${order.customer.streetAddress}, ${order.customer.city}, ${order.customer.state}\n` +
      (order.customer.landmark ? `🏢 Landmark: ${order.customer.landmark}\n` : '') +
      `\nOrdered Items (${order.bundleTier} Pair${order.bundleTier > 1 ? 's' : ''}):\n${itemsListText}\n` +
      `\nDelivery Speed: Standard Delivery within 24 Hours (FREE)\n` +
      `Total Amount Due on Delivery: ₦${order.grandTotal.toLocaleString()}\n` +
      `Payment Terms: Payment on Delivery\n\n` +
      `Please confirm my delivery schedule and rider assignment.`
  );

  return (
    <div className="min-h-screen bg-[#F5F5F3] text-[#141414] py-8 sm:py-14 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Main Customer Order Confirmation Card */}
        <div className="bg-white border-2 border-[#141414] p-6 sm:p-10 shadow-lg text-center space-y-6 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-[#E7F6ED] text-[#2D6A4F] mx-auto flex items-center justify-center border-2 border-[#52B788] shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="font-crest text-xs tracking-[0.3em] uppercase text-[#735D43] font-semibold">
              TRUTHFIELD INT'L LTD
            </span>
            <h1 className="font-editorial text-2xl sm:text-4xl font-extrabold tracking-tight text-[#141414]">
              THANK YOU FOR YOUR ORDER!
            </h1>
            <p className="text-xs sm:text-sm text-[#545048] max-w-lg mx-auto">
              Your order has been logged into our central Lagos logistics queue. Your order reference code is:
            </p>
            <div className="inline-block bg-[#F5F2EB] border border-[#DDD6C8] px-4 py-2 font-mono text-base sm:text-lg font-bold text-[#141414] tracking-wider select-all">
              {order.orderId}
            </div>
          </div>

          {/* Urgent Phone Call Notice */}
          <div className="p-4 bg-[#FFFBEB] border border-[#F59E0B] text-left text-xs sm:text-sm text-[#92400E] flex items-start gap-3">
            <PhoneCall className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1">
              <strong className="font-bold uppercase tracking-wider block">
                IMPORTANT NEXT STEP: PLEASE KEEP YOUR PHONE NEARBY
              </strong>
              <span>
                Our logistics supervisor will call you on{' '}
                <strong className="underline font-mono">{order.customer.phone}</strong>{' '}
                {order.customer.phoneNetwork && (
                  <span className="font-sans font-bold text-[#2D6A4F]">({order.customer.phoneNetwork})</span>
                )}{' '}
                from our dispatch line{' '}
                <strong className="font-mono text-[#141414]">{STORE_CONTACT.dispatchPhone}</strong> within 1–2 hours to verify your delivery landmark and dispatch schedule.
              </span>
            </div>
          </div>

          {/* Quick Action Buttons: WhatsApp & Direct Call */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/2348102268521?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-white px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer w-full sm:w-auto animate-btn-shadow-green group"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>Track Order on WhatsApp</span>
              <ChevronRight className="w-4 h-4 animate-pulse-right shrink-0" />
            </a>

            <a
              href={`tel:${STORE_CONTACT.dispatchPhoneTel}`}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF9F5] active:scale-[0.99] text-[#141414] border-2 border-[#141414] px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs transition-all cursor-pointer w-full sm:w-auto font-mono"
            >
              <PhoneCall className="w-4 h-4 text-[#842A46]" />
              <span>Call Dispatch: {STORE_CONTACT.dispatchPhone}</span>
            </a>
          </div>

          {/* Return to Storefront CTA */}
          <div className="pt-4 border-t border-[#E7E4DC]">
            <button
              type="button"
              onClick={onResetToHome}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-[#842A46] hover:bg-[#6f2239] active:scale-[0.99] text-white px-7 py-3 transition-all cursor-pointer shadow-sm"
            >
              <span>← Return to Product Storefront</span>
            </button>
          </div>
        </div>

        {/* Admin Tool Bar: Generate & Print Official Receipt */}
        <div className="bg-[#FAF9F5] border border-[#D9D3C5] p-4 text-center space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#735D43] font-semibold flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#842A46]" />
            <span>Truthfield Logistics & Administration Portal</span>
          </div>
          <p className="text-xs text-[#5C574F]">
            Admin only: Generate printable dispatch waybill, packing manifest, and official company sales receipt.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setSelectedReceiptOrder(order);
                setIsAdminModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF9F5] active:scale-[0.99] text-[#141414] border-2 border-[#141414] hover:border-[#842A46] px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs font-mono"
            >
              <FileText className="w-4 h-4 text-[#842A46]" />
              <span>Admin: Generate Receipt & Waybill</span>
              <Printer className="w-3.5 h-3.5 text-[#735D43]" />
            </button>
          </div>
        </div>
      </div>

      {/* Admin Receipt & Waybill Modal */}
      <AdminReceiptModal
        order={selectedReceiptOrder}
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        allOrders={allOrders.length > 0 ? allOrders : [order]}
        onSelectOrder={(o) => setSelectedReceiptOrder(o)}
      />
    </div>
  );
};
