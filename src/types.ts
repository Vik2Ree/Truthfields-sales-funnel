export interface Colorway {
  id: string;
  name: string;
  code: string;
  swatchHex: string;
  image: string;
  badge?: string;
  description: string;
}

export interface BundleOption {
  pairs: number;
  label: string;
  pricePerPair: number;
  totalPrice: number;
  originalPrice: number;
  savingsTotal: number;
  badge?: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  colorway: string;
  size: number;
}

export interface AddonItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  price: number;
  imageIcon: string;
}

export interface OrderCustomer {
  fullName: string;
  firstName?: string;
  lastName?: string;
  phone: string;
  phoneRaw?: string;
  phoneNetwork?: string;
  altPhone?: string;
  whatsapp: string;
  whatsappRaw?: string;
  hasSeparateWhatsapp?: boolean;
  streetAddress: string;
  state: string;
  city?: string;
  landmark?: string;
  deliveryNotes?: string;
}

export interface OrderItem {
  colorway: Colorway;
  size: number;
  quantity: number;
  pairLabel?: string;
}

export interface OrderData {
  orderId: string;
  createdAt: string;
  customer: OrderCustomer;
  items: OrderItem[];
  bundleTier: number;
  deliveryMethod: 'standard_free' | 'vip_express';
  deliveryFee: number;
  selectedAddons: AddonItem[];
  paymentMethod: 'cod' | 'instant_transfer';
  subtotal: number;
  discount: number;
  grandTotal: number;
  status: 'confirmed' | 'processing' | 'dispatched' | 'delivered';
  estimatedDeliveryDate: string;
}
