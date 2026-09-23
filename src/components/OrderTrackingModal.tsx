import React from 'react';
import {
  X,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  PhoneCall,
  RotateCcw,
  AlertOctagon,
  FileText,
  ShieldCheck,
  ChevronRight,
  FastForward
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderStatus } from '../types/ecommerce';

export const OrderTrackingModal: React.FC = () => {
  const {
    activeTrackingOrder,
    setActiveTrackingOrder,
    advanceOrderStage,
    setActiveCancellationOrder,
    setInvoiceOrder
  } = useShop();

  if (!activeTrackingOrder) return null;

  const order = activeTrackingOrder;
  const isDelivered = order.status === 'DELIVERED';
  const isCancelled = order.status === 'CANCELLED';
  const isReturnRequested = order.status === 'RETURN_REQUESTED';

  const stages: { status: OrderStatus; title: string; subtitle: string }[] = [
    { status: 'ORDERED', title: 'Order Placed', subtitle: 'Received at Bengaluru Store' },
    { status: 'CONFIRMED', title: 'Confirmed & Verified', subtitle: 'Seller Warehouse Approved' },
    { status: 'PACKED', title: 'Packed & Sealed', subtitle: 'FC-4 Fulfillment Center' },
    { status: 'SHIPPED', title: 'Dispatched in Transit', subtitle: 'Express Sort Facility' },
    { status: 'OUT_FOR_DELIVERY', title: 'Out for Delivery', subtitle: 'Courier with Rider' },
    { status: 'DELIVERED', title: 'Delivered', subtitle: 'Doorstep Handover' }
  ];

  const getStageIndex = (status: OrderStatus) => {
    return stages.findIndex((s) => s.status === status);
  };

  const currentIdx = getStageIndex(order.status);

  const formatPrice = (amt: number) => '₹' + amt.toLocaleString('en-IN');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
                Live Shipment Tracking
              </h2>
              <p className="text-xs text-slate-500">
                Order <strong className="text-slate-800 font-mono">{order.orderNumber}</strong> · AWB:{' '}
                <span className="font-mono text-blue-600">{order.trackingNumber}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTrackingOrder(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Close tracker"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Status Alert Banner */}
          {isCancelled ? (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800 text-xs">
              <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <p className="font-bold">This order was cancelled</p>
                <p className="text-[11px] text-rose-600">
                  Reason: {order.cancellationReason || 'Requested by customer'} · Refund Status:{' '}
                  <strong>{order.refundStatus || 'INITIATED'}</strong>
                </p>
              </div>
            </div>
          ) : isReturnRequested ? (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center gap-3 text-indigo-800 text-xs">
              <RotateCcw className="w-5 h-5 text-indigo-600 shrink-0" />
              <div>
                <p className="font-bold">Return Pickup Scheduled</p>
                <p className="text-[11px] text-indigo-600">
                  Our delivery executive will collect and inspect the item tomorrow. Refund initiated.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">
                  Expected Delivery
                </span>
                <p className="text-sm font-bold text-slate-900 font-mono">
                  {order.estimatedDelivery}
                </p>
                <p className="text-slate-500 text-[11px]">
                  Courier: <strong>{order.courierName}</strong>
                </p>
              </div>

              {/* Simulation Helper Button */}
              {!isDelivered && (
                <button
                  onClick={() => advanceOrderStage(order.id)}
                  className="bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  title="Simulate advancing to the next delivery milestone"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Simulate Next Stage</span>
                </button>
              )}
            </div>
          )}

          {/* Stepper Timeline Visualizer */}
          {!isCancelled && (
            <div className="py-2">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                Milestone Progress
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {stages.map((stage, idx) => {
                  const isCompleted = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={stage.status} className="relative flex items-start gap-4">
                      {/* Node Bullet */}
                      <div
                        className={`absolute -left-6 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-colors ${
                          isCompleted
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                            : 'bg-white border-slate-300 text-slate-400'
                        }`}
                      >
                        {isCompleted ? '✓' : idx + 1}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-xs font-bold ${
                              isCurrent
                                ? 'text-blue-600'
                                : isCompleted
                                ? 'text-slate-900'
                                : 'text-slate-400'
                            }`}
                          >
                            {stage.title}
                          </p>
                          {isCurrent && (
                            <span className="text-[10px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                              Active Stage
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">{stage.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Shipment Items */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Items in this Package ({order.items.length})
            </h3>
            <div className="space-y-2.5">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-contain bg-white rounded-lg border border-slate-200 p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{item.product.title}</p>
                    <p className="text-slate-400 text-[11px]">
                      Qty: {item.quantity} · Price: {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <span className="font-bold text-slate-900 font-mono tabular-nums">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address & Rider Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Delivery Address
              </span>
              <p className="font-bold text-slate-900">{order.shippingAddress.name}</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {order.shippingAddress.addressLine}, {order.shippingAddress.city} -{' '}
                {order.shippingAddress.pincode}
              </p>
              <p className="text-slate-500 text-[11px]">Phone: {order.shippingAddress.phone}</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Logistics & Delivery Agent
              </span>
              <p className="font-bold text-slate-900 flex items-center gap-1.5">
                <span>Ramesh Kumar (NovaExpress Rider)</span>
              </p>
              <p className="text-slate-500 text-[11px]">Contact-Free delivery OTP enabled</p>
              <div className="pt-1">
                <button
                  onClick={() => alert('Delivery Rider Ramesh Kumar: +91 98765 00123 (Simulated)')}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Call Delivery Agent</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions: Cancel, Return, Invoice */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              setInvoiceOrder(order);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2 border border-slate-300 rounded-xl hover:bg-white transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Download Invoice</span>
          </button>

          <div className="flex items-center gap-2">
            {!isCancelled && !isDelivered && (
              <button
                onClick={() => {
                  setActiveCancellationOrder(order);
                }}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 px-3 py-2 border border-rose-200 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel Order
              </button>
            )}

            {isDelivered && !isReturnRequested && (
              <button
                onClick={() => {
                  setActiveCancellationOrder(order);
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 px-3 py-2 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return / Replace Item</span>
              </button>
            )}

            <button
              onClick={() => setActiveTrackingOrder(null)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Close Tracker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
