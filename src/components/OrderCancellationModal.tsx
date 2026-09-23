import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  Calendar,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderCancellationModal: React.FC = () => {
  const {
    activeCancellationOrder,
    setActiveCancellationOrder,
    cancelOrder,
    requestReturn
  } = useShop();

  const [selectedReason, setSelectedReason] = useState('Ordered by mistake');
  const [returnType, setReturnType] = useState<'REFUND' | 'REPLACE'>('REFUND');
  const [feedback, setFeedback] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!activeCancellationOrder) return null;

  const order = activeCancellationOrder;
  const isDelivered = order.status === 'DELIVERED';

  const cancellationReasons = [
    'Ordered by mistake',
    'Found a cheaper price elsewhere',
    'Delivery time is taking too long',
    'Need to change shipping address or mobile number',
    'Payment issue / duplicate order',
    'Changed my mind'
  ];

  const returnReasons = [
    'Defective or product not working properly',
    'Received different item from picture',
    'Missing components or accessories',
    'Quality is not as expected',
    'Size or fitting issue'
  ];

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDelivered) {
      const res = requestReturn(order.id, `${selectedReason} (${returnType === 'REPLACE' ? 'Replacement' : 'Refund'})`);
      setStatusMessage(res.message);
      setTimeout(() => {
        setActiveCancellationOrder(null);
      }, 1500);
    } else {
      const res = cancelOrder(order.id, selectedReason);
      setStatusMessage(res.message);
      setTimeout(() => {
        setActiveCancellationOrder(null);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            {isDelivered ? (
              <RotateCcw className="w-5 h-5 text-indigo-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            )}
            <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
              {isDelivered ? 'Request Return or Replacement' : 'Cancel Order'}
            </h2>
          </div>

          <button
            onClick={() => setActiveCancellationOrder(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {statusMessage ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-slate-900">{statusMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleAction} className="pt-4 space-y-4">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <p className="text-slate-500">
                Order Number: <strong className="text-slate-900 font-mono">{order.orderNumber}</strong>
              </p>
              <p className="text-slate-500">
                Item: <strong className="text-slate-900">{order.items[0]?.product.title}</strong>
              </p>
              <p className="text-slate-500">
                Paid Amount: <strong className="text-slate-900 font-mono">₹{order.totalAmount.toLocaleString('en-IN')}</strong> ({order.paymentMethod})
              </p>
            </div>

            {/* Select Reason */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {isDelivered ? 'Reason for Return / Replacement *' : 'Reason for Cancellation *'}
              </label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-hidden focus:border-blue-600"
              >
                {(isDelivered ? returnReasons : cancellationReasons).map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* If delivered: Choose between Refund or Replacement */}
            {isDelivered && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Resolution Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setReturnType('REFUND')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      returnType === 'REFUND'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Full Refund to Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setReturnType('REPLACE')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                      returnType === 'REPLACE'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Replace with Brand New Unit
                  </button>
                </div>
              </div>
            )}

            {/* Refund Info Notice */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 space-y-1">
              <p className="font-semibold flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                <span>Instant Refund Guarantee</span>
              </p>
              <p className="text-blue-800">
                {order.paymentMethod === 'COD'
                  ? 'No payment was collected, order will simply be closed.'
                  : `₹${order.totalAmount.toLocaleString('en-IN')} will be refunded immediately to your ${order.paymentMethod} account.`}
              </p>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Additional Comments (Optional)
              </label>
              <textarea
                rows={2}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Help us improve our service..."
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-xl outline-hidden focus:border-blue-600"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className={`flex-1 text-white font-semibold text-xs py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs ${
                  isDelivered
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                {isDelivered ? 'Submit Return Request' : 'Confirm Cancellation'}
              </button>
              <button
                type="button"
                onClick={() => setActiveCancellationOrder(null)}
                className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Go Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
