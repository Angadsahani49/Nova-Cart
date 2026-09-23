import React from 'react';
import {
  CheckCircle2,
  Package,
  FileText,
  Truck,
  ArrowRight,
  MapPin,
  Calendar
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderSuccessModal: React.FC = () => {
  const {
    currentPlacedOrder,
    setCurrentPlacedOrder,
    setActiveTrackingOrder,
    setInvoiceOrder
  } = useShop();

  if (!currentPlacedOrder) return null;

  const order = currentPlacedOrder;

  const formatPrice = (amt: number) => '₹' + amt.toLocaleString('en-IN');

  const handleTrackLive = () => {
    setActiveTrackingOrder(order);
    setCurrentPlacedOrder(null);
  };

  const handleViewInvoice = () => {
    setInvoiceOrder(order);
    setCurrentPlacedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto p-6 sm:p-8 text-center animate-in fade-in zoom-in duration-300">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          Order Placed Successfully
        </span>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3 mb-1 font-['Space_Grotesk']">
          Thank you for your order!
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Order ID: <strong className="text-slate-800 font-mono">{order.orderNumber}</strong> · A confirmation SMS & email have been dispatched.
        </p>

        {/* Order Details Card */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-xs space-y-3 mb-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="text-slate-500">Estimated Delivery:</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>{order.estimatedDelivery}</span>
            </span>
          </div>

          <div className="flex items-start gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">{order.shippingAddress.name}</p>
              <p className="text-[11px] text-slate-500">
                {order.shippingAddress.addressLine}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 font-semibold text-slate-900">
            <span>Total Paid ({order.paymentMethod})</span>
            <span className="text-sm font-bold text-blue-600 font-mono tabular-nums">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <button
            onClick={handleTrackLive}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-blue-500/20 cursor-pointer"
          >
            <Truck className="w-4 h-4" />
            <span>Track Order Live</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleViewInvoice}
              className="flex-1 py-2.5 px-3 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Tax Invoice</span>
            </button>

            <button
              onClick={() => setCurrentPlacedOrder(null)}
              className="flex-1 py-2.5 px-3 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
