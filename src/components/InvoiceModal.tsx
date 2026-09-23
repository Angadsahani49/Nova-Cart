import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const InvoiceModal: React.FC = () => {
  const { invoiceOrder, setInvoiceOrder } = useShop();

  if (!invoiceOrder) return null;

  const order = invoiceOrder;
  const formatPrice = (amt: number) => '₹' + amt.toLocaleString('en-IN');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Controls Header */}
        <div className="px-6 py-3.5 border-b border-slate-200 bg-white flex items-center justify-between no-print">
          <span className="text-xs font-bold text-slate-700">
            Tax Invoice · {order.orderNumber}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={() => setInvoiceOrder(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="printable-invoice" className="p-8 overflow-y-auto text-xs text-slate-800 bg-white">
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-slate-300">
            <div>
              <div className="text-2xl font-extrabold text-slate-950 font-['Space_Grotesk'] tracking-tight mb-1">
                Nova<span className="text-blue-600">Cart</span> Retail Ltd.
              </div>
              <p className="text-[11px] text-slate-500">
                GSTIN: 29AABCU9603R1ZM · CIN: U74999KA2025PTC148291
              </p>
              <p className="text-[11px] text-slate-500">
                Plot 18, Electronic City Phase 1, Hosur Main Road, Bengaluru, KA - 560100
              </p>
            </div>

            <div className="text-right">
              <span className="text-sm font-extrabold text-slate-900 uppercase tracking-wider block">
                TAX INVOICE
              </span>
              <p className="text-slate-600 font-mono mt-1">Invoice No: INV-{order.orderNumber.replace('NC-', '')}</p>
              <p className="text-slate-500">Date: {order.date}</p>
            </div>
          </div>

          {/* Customer & Shipping Info */}
          <div className="grid grid-cols-2 gap-6 py-5 border-b border-slate-200">
            <div>
              <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1.5">
                Billed & Shipped To:
              </h4>
              <p className="font-bold text-slate-900 text-sm">{order.shippingAddress.name}</p>
              <p className="text-slate-600 leading-relaxed">
                {order.shippingAddress.addressLine}, {order.shippingAddress.locality && `${order.shippingAddress.locality}, `}
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p className="text-slate-500 mt-1">Phone: {order.shippingAddress.phone}</p>
              <p className="text-slate-500">Email: {order.customerEmail}</p>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-1.5">
                Dispatch & Payment Details:
              </h4>
              <p className="text-slate-700">
                Logistics Partner: <strong>{order.courierName}</strong>
              </p>
              <p className="text-slate-700">
                AWB / Tracking: <strong className="font-mono">{order.trackingNumber}</strong>
              </p>
              <p className="text-slate-700">
                Payment Method: <strong>{order.paymentMethod}</strong> (Status: <strong>{order.paymentStatus}</strong>)
              </p>
              <p className="text-slate-700">
                Delivery Priority: <strong>{order.deliverySpeed} Guaranteed</strong>
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="py-5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 text-[11px] uppercase text-slate-500 font-bold">
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-center">HSN Code</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="py-2 text-right">Unit Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="text-xs">
                    <td className="py-3">
                      <p className="font-semibold text-slate-900">{item.product.title}</p>
                      <p className="text-[10px] text-slate-400">Brand: {item.product.brand}</p>
                    </td>
                    <td className="py-3 text-center font-mono text-slate-500">85183000</td>
                    <td className="py-3 text-center font-mono font-semibold">{item.quantity}</td>
                    <td className="py-3 text-right font-mono tabular-nums">{formatPrice(item.product.price)}</td>
                    <td className="py-3 text-right font-mono font-bold tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculations Table */}
          <div className="flex justify-end pt-2 pb-6 border-b border-slate-300">
            <div className="w-64 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal (Net):</span>
                <span className="font-mono tabular-nums">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount ({order.appliedCoupon || 'PROMO'}):</span>
                  <span className="font-mono tabular-nums">- {formatPrice(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping & Handling:</span>
                <span className="font-mono tabular-nums">
                  {order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px]">
                <span>IGST (18% Included):</span>
                <span className="font-mono tabular-nums">
                  {formatPrice(Math.round((order.totalAmount * 18) / 118))}
                </span>
              </div>
              <div className="border-t border-slate-300 pt-2 flex justify-between font-bold text-slate-900 text-sm">
                <span>Grand Total:</span>
                <span className="font-mono text-blue-600 tabular-nums">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Footer Legal & Digital Signature */}
          <div className="pt-6 flex items-center justify-between text-[11px] text-slate-400">
            <div>
              <p>This is a computer-generated tax invoice and requires no physical signature.</p>
              <p>Authorized Signatory: NovaCart Digital Operations Hub, India</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Digitally Verified GST Receipt</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
