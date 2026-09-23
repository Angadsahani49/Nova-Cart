import React, { useState } from 'react';
import {
  X,
  Package,
  Truck,
  RotateCcw,
  FileText,
  AlertOctagon,
  CheckCircle2,
  Calendar,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderStatus } from '../types/ecommerce';

export const OrdersListModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const {
    orders,
    setActiveTrackingOrder,
    setActiveCancellationOrder,
    setInvoiceOrder,
    addToCart,
    setIsCartDrawerOpen
  } = useShop();

  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'DELIVERED' | 'CANCELLED'>('ALL');

  if (!isOpen) return null;

  const filteredOrders = orders.filter((ord) => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'ACTIVE') return !['DELIVERED', 'CANCELLED', 'RETURNED'].includes(ord.status);
    if (statusFilter === 'DELIVERED') return ord.status === 'DELIVERED';
    if (statusFilter === 'CANCELLED') return ['CANCELLED', 'RETURN_REQUESTED', 'RETURNED'].includes(ord.status);
    return true;
  });

  const formatPrice = (amt: number) => '₹' + amt.toLocaleString('en-IN');

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'DELIVERED':
        return (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Delivered
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <AlertOctagon className="w-3 h-3" /> Cancelled
          </span>
        );
      case 'RETURN_REQUESTED':
        return (
          <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <RotateCcw className="w-3 h-3" /> Return Requested
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Truck className="w-3 h-3" /> {status.replace('_', ' ')}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
              My Orders & Returns History ({orders.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-xs">
          {(['ALL', 'ACTIVE', 'DELIVERED', 'CANCELLED'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                statusFilter === f
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f === 'ALL'
                ? 'All Orders'
                : f === 'ACTIVE'
                ? 'In Transit / Active'
                : f === 'DELIVERED'
                ? 'Completed Deliveries'
                : 'Cancelled / Returned'}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-900 mb-1">No Orders Found</h3>
              <p className="text-xs text-slate-500">
                You have no orders matching the selected filter criteria.
              </p>
            </div>
          ) : (
            filteredOrders.map((ord) => {
              const isDelivered = ord.status === 'DELIVERED';
              const isCancelled = ord.status === 'CANCELLED';
              const isReturnRequested = ord.status === 'RETURN_REQUESTED';

              return (
                <div
                  key={ord.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
                >
                  {/* Top Bar of the Order Card */}
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">
                          Order Number
                        </span>
                        <span className="font-bold text-slate-900 font-mono">{ord.orderNumber}</span>
                      </div>
                      <span className="text-slate-300">|</span>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">
                          Order Date
                        </span>
                        <span className="text-slate-700">{ord.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold text-right">
                          Total Paid
                        </span>
                        <span className="font-bold text-slate-900 font-mono tabular-nums">
                          {formatPrice(ord.totalAmount)}
                        </span>
                      </div>
                      <div>{getStatusBadge(ord.status)}</div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 space-y-3">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-contain rounded-lg border border-slate-200 p-1 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate">
                              {item.product.title}
                            </p>
                            <p className="text-slate-500 text-[11px]">
                              Qty: {item.quantity} · Price: {formatPrice(item.product.price)}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            addToCart(item.product, 1);
                            setIsCartDrawerOpen(true);
                          }}
                          className="shrink-0 text-blue-600 hover:text-blue-800 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy Again</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-500">
                      <span>Shipped to: </span>
                      <strong className="text-slate-700">
                        {ord.shippingAddress.name} ({ord.shippingAddress.city})
                      </strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          setActiveTrackingOrder(ord);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Track Shipment</span>
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          setInvoiceOrder(ord);
                        }}
                        className="border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>Invoice</span>
                      </button>

                      {!isCancelled && !isDelivered && (
                        <button
                          onClick={() => {
                            onClose();
                            setActiveCancellationOrder(ord);
                          }}
                          className="text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}

                      {isDelivered && !isReturnRequested && (
                        <button
                          onClick={() => {
                            onClose();
                            setActiveCancellationOrder(ord);
                          }}
                          className="text-indigo-600 hover:bg-indigo-50 border border-indigo-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Return</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
