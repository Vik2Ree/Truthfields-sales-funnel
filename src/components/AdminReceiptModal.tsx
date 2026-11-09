import React, { useState } from 'react';
import {
  Printer,
  Copy,
  Check,
  X,
  MapPin,
  PhoneCall,
  Calendar,
  ShieldCheck,
  Package,
  FileText,
} from 'lucide-react';
import { OrderData } from '../types';
import { SNEAKER_PRODUCT, STORE_CONTACT } from '../data/productData';

interface AdminReceiptModalProps {
  order: OrderData;
  isOpen: boolean;
  onClose: () => void;
  allOrders?: OrderData[];
  onSelectOrder?: (order: OrderData) => void;
}

export const AdminReceiptModal: React.FC<AdminReceiptModalProps> = ({
  order,
  isOpen,
  onClose,
  allOrders = [],
  onSelectOrder,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyDispatchText = () => {
    const itemsList = order.items
      .map(
        (item, idx) =>
          `• ${order.items.length > 1 ? `Pair ${idx + 1}: ` : ''}${item.colorway.name} (EU ${item.size})`
      )
      .join('\n');

    const dispatchText =
      `📋 TRUTHFIELD INT'L LTD — DISPATCH MANIFEST\n` +
      `───────────────────────────────\n` +
      `Order Ref: ${order.orderId}\n` +
      `Date: ${new Date(order.createdAt).toLocaleString()}\n\n` +
      `CUSTOMER DETAILS:\n` +
      `Name: ${order.customer.fullName}\n` +
      `Phone: ${order.customer.phone}${order.customer.phoneNetwork ? ` (${order.customer.phoneNetwork})` : ''}\n` +
      (order.customer.hasSeparateWhatsapp && order.customer.whatsapp ? `WhatsApp: ${order.customer.whatsapp}\n` : '') +
      `Address: ${order.customer.streetAddress}, ${order.customer.city}, ${order.customer.state}\n` +
      (order.customer.landmark ? `Landmark: ${order.customer.landmark}\n` : '') +
      (order.customer.deliveryNotes ? `Note: "${order.customer.deliveryNotes}"\n` : '') +
      `\nORDER ITEMS (${order.bundleTier} Pair${order.bundleTier > 1 ? 's' : ''}):\n${itemsList}\n\n` +
      `FINANCIALS:\n` +
      `Delivery Fee: FREE (Standard 24h)\n` +
      `Total Payable: ₦${order.grandTotal.toLocaleString()}\n` +
      `Payment Terms: Payment on Delivery (Cash or Bank Transfer to Rider)\n` +
      `Estimated Arrival: ${order.estimatedDeliveryDate}\n` +
      `Dispatch Line: ${STORE_CONTACT.dispatchPhone}`;

    navigator.clipboard.writeText(dispatchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-[#141414] shadow-2xl my-8 overflow-hidden">
        {/* Admin Header Bar - hidden during print */}
        <div className="no-print bg-[#141414] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#52B788] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider font-bold">
              Admin Portal · Official Receipt & Waybill Generator
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyDispatchText}
              className="flex items-center gap-1.5 bg-[#FAF9F5] hover:bg-white text-[#141414] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              title="Copy text manifest for rider WhatsApp / SMS"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#52B788]" />
                  <span className="text-[#52B788]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-[#842A46] hover:bg-[#6f2239] text-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Waybill</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-white/70 hover:text-white p-1 ml-1 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Order Switcher if multiple orders exist - hidden during print */}
        {allOrders.length > 1 && onSelectOrder && (
          <div className="no-print bg-[#F5F2EB] border-b border-[#DDD6C8] px-5 py-2.5 flex items-center gap-2 text-xs overflow-x-auto">
            <span className="text-[#735D43] font-bold shrink-0">Switch Order:</span>
            {allOrders.map((o) => (
              <button
                key={o.orderId}
                type="button"
                onClick={() => onSelectOrder(o)}
                className={`px-2.5 py-1 font-mono text-[11px] font-bold border transition-colors cursor-pointer shrink-0 ${
                  o.orderId === order.orderId
                    ? 'bg-[#141414] text-white border-[#141414]'
                    : 'bg-white text-[#141414] border-[#DDD6C8] hover:border-black'
                }`}
              >
                {o.orderId} ({o.customer.firstName || o.customer.fullName.split(' ')[0]})
              </button>
            ))}
          </div>
        )}

        {/* Printable Official Receipt & Waybill Area */}
        <div id="admin-printable-receipt" className="p-6 sm:p-8 space-y-6 bg-white text-[#141414]">
          {/* Official Company Waybill Header */}
          <div className="border-b-2 border-[#141414] pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="font-crest text-xs tracking-[0.3em] uppercase text-[#735D43] font-semibold block">
                TRUTHFIELD INT'L LTD
              </span>
              <h1 className="font-editorial text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141414]">
                OFFICIAL SALES RECEIPT & DISPATCH WAYBILL
              </h1>
              <p className="text-xs text-[#545048] mt-1">
                Lagos Logistics Distribution Hub · Dispatch Support: {STORE_CONTACT.dispatchPhone}
              </p>
            </div>

            <div className="sm:text-right space-y-1">
              <div className="text-[10px] uppercase font-bold text-[#8C877E] tracking-wider">
                Order Reference Code
              </div>
              <div className="font-mono text-base font-extrabold bg-[#F5F2EB] border border-[#DDD6C8] px-3 py-1 inline-block">
                {order.orderId}
              </div>
              <div className="text-[11px] text-[#736E65]">
                Issued: {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Customer & Destination Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#FAF9F5] border border-[#E7E4DC] space-y-2">
              <span className="font-bold uppercase tracking-wider text-[#141414] flex items-center gap-1.5 border-b border-[#E7E4DC] pb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#842A46]" /> Consignee / Delivery Address:
              </span>
              <div className="space-y-1 leading-relaxed text-[#4A4742]">
                <div className="font-bold text-sm text-[#141414]">{order.customer.fullName}</div>
                <div>{order.customer.streetAddress}</div>
                <div>
                  {order.customer.city ? `${order.customer.city}, ` : ''}{order.customer.state}
                </div>
                {order.customer.landmark && (
                  <div className="text-[#842A46] font-medium pt-0.5">
                    Landmark: <strong>{order.customer.landmark}</strong>
                  </div>
                )}
                {order.customer.deliveryNotes && (
                  <div className="italic text-[#736E65] pt-0.5">
                    Note: "{order.customer.deliveryNotes}"
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-[#FAF9F5] border border-[#E7E4DC] space-y-2">
              <span className="font-bold uppercase tracking-wider text-[#141414] flex items-center gap-1.5 border-b border-[#E7E4DC] pb-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#52B788]" /> Dispatch Calling & Contact:
              </span>
              <div className="space-y-2 text-[#4A4742]">
                <div>
                  <span className="text-[#8C877E] block text-[10px] uppercase font-semibold">
                    Calling Phone Number:
                  </span>
                  <div className="flex items-center gap-2 font-mono font-bold text-sm text-[#141414]">
                    <span>{order.customer.phone}</span>
                    {order.customer.phoneNetwork && (
                      <span className="text-[10px] bg-[#E7F6ED] text-[#2D6A4F] px-1.5 py-0.5 font-sans font-bold">
                        {order.customer.phoneNetwork}
                      </span>
                    )}
                  </div>
                </div>

                {order.customer.hasSeparateWhatsapp && order.customer.whatsapp && (
                  <div>
                    <span className="text-[#8C877E] block text-[10px] uppercase font-semibold">
                      WhatsApp Line:
                    </span>
                    <span className="font-mono font-bold text-xs text-[#25D366]">
                      {order.customer.whatsapp}
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-[#8C877E] block text-[10px] uppercase font-semibold">
                    Payment Terms:
                  </span>
                  <span className="font-bold text-[#144729]">
                    Payment on Delivery (Cash or Bank Transfer upon arrival)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Footwear Line Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#141414] border-b border-[#E7E4DC] pb-2">
              <span>Itemized Footwear Manifest ({order.items.length} Pair{order.items.length > 1 ? 's' : ''}):</span>
              <span className="font-mono text-[#735D43]">Bundle Tier: {order.bundleTier} Pair{order.bundleTier > 1 ? 's' : ''}</span>
            </div>

            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-3 bg-[#FAF9F5] border border-[#E7E4DC]"
                >
                  <div className="w-14 h-14 bg-white border border-[#DDD5C5] shrink-0 overflow-hidden">
                    <img
                      src={item.colorway.image}
                      alt={item.colorway.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#842A46]">
                        {item.pairLabel || `Pair ${idx + 1}`}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="text-[10px] uppercase text-[#8C877E]">{SNEAKER_PRODUCT.brand}</span>
                    </div>
                    <h4 className="font-editorial text-sm font-bold text-[#141414]">
                      {SNEAKER_PRODUCT.title}
                    </h4>
                    <div className="flex flex-wrap gap-4 text-[#545048] font-medium">
                      <span>Color: <strong className="text-[#141414]">{item.colorway.name}</strong></span>
                      <span>Size: <strong className="text-[#141414]">EU {item.size}</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="border-t border-[#141414] pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-[#5C574F]">
              <span>Subtotal:</span>
              <span className="font-mono font-semibold">₦{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#5C574F]">
              <span>Delivery Fee (Standard within 24 Hours):</span>
              <span className="font-mono text-[#52B788] font-bold">FREE</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t-2 border-[#141414]">
              <span className="text-sm font-extrabold uppercase tracking-wider text-[#141414]">
                Total Amount Due on Delivery:
              </span>
              <span className="font-editorial text-2xl font-black text-[#141414] font-mono tabular-nums">
                ₦{order.grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Delivery Handover & Sign-off Section */}
          <div className="pt-6 border-t border-dashed border-[#DDD6C8] grid grid-cols-1 sm:grid-cols-2 gap-6 text-[11px] text-[#545048]">
            <div className="space-y-3">
              <div className="font-bold uppercase tracking-wider text-[#141414]">
                Customer Acceptance Sign-Off:
              </div>
              <div className="border-b border-[#141414] h-7" />
              <div className="flex justify-between text-[10px] text-[#8C877E]">
                <span>Signature</span>
                <span>Date</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="font-bold uppercase tracking-wider text-[#141414]">
                Dispatch Rider Handover:
              </div>
              <div className="border-b border-[#141414] h-7" />
              <div className="flex justify-between text-[10px] text-[#8C877E]">
                <span>Rider Name & Signature</span>
                <span>Payment Confirmed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions - hidden during print */}
        <div className="no-print bg-[#F5F2EB] border-t border-[#DDD6C8] px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-[#736E65]">
            Tip: Click <strong>Print Waybill</strong> to print a physical delivery slip or save as PDF for your dispatch rider.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-white border border-[#DDD6C8] text-[#141414] hover:bg-[#FAF9F5] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2 text-xs font-bold uppercase tracking-widest bg-[#842A46] text-white hover:bg-[#6f2239] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Waybill</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
