export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  avatarUrl?: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  locality: string;
  addressLine: string;
  city: string;
  state: string;
  landmark?: string;
  type: 'HOME' | 'WORK';
  isDefault: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  category: 'electronics' | 'mobiles' | 'fashion' | 'home' | 'audio' | 'sports';
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  ratingCount: number;
  image: string;
  gallery: string[];
  inStock: boolean;
  stockCount: number;
  isAssured: boolean;
  fastDeliveryDate: string;
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type OrderStatus =
  | 'ORDERED'
  | 'CONFIRMED'
  | 'PACKED'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURN_REQUESTED'
  | 'RETURNED';

export interface TrackingStep {
  status: OrderStatus;
  label: string;
  date: string;
  location: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  shippingAddress: Address;
  deliverySpeed: 'STANDARD' | 'EXPRESS';
  deliveryFee: number;
  discountAmount: number;
  appliedCoupon?: string;
  subtotal: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'CARD' | 'NETBANKING' | 'COD';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  status: OrderStatus;
  trackingNumber: string;
  courierName: string;
  estimatedDelivery: string;
  actualDeliveryDate?: string;
  cancellationReason?: string;
  cancelledAt?: string;
  returnReason?: string;
  returnedAt?: string;
  refundStatus?: 'NOT_APPLICABLE' | 'INITIATED' | 'COMPLETED';
  trackingHistory: TrackingStep[];
}

export interface Coupon {
  code: string;
  description: string;
  discountPercentage?: number;
  discountAmount?: number;
  minOrderValue: number;
}
