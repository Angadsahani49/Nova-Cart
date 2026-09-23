import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC<{ onOpenOrders: () => void }> = ({ onOpenOrders }) => {
  const {
    setIsTestingSuiteOpen,
    setIsAddressModalOpen,
    setIsAuthModalOpen,
    setAuthModalMode,
    setSelectedCategory
  } = useShop();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-16 no-print">
      {/* Upper features strip */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-blue-400 shrink-0" />
            <div>
              <p className="font-bold text-white text-xs">Express Delivery</p>
              <p className="text-[11px] text-slate-500">Same or next day across 20,000+ PIN codes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="w-6 h-6 text-indigo-400 shrink-0" />
            <div>
              <p className="font-bold text-white text-xs">7-Day Easy Returns</p>
              <p className="text-[11px] text-slate-500">Hassle-free doorstep pickup & instant refund</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white text-xs">100% Authentic</p>
              <p className="text-[11px] text-slate-500">Directly sourced with brand warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-white text-xs">Flexible Payments</p>
              <p className="text-[11px] text-slate-500">UPI, Credit/Debit Cards & Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main links section */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-sm font-bold text-white mb-3 font-['Space_Grotesk']">
            Nova<span className="text-blue-500">Cart</span>
          </h4>
          <p className="text-slate-400 leading-relaxed mb-4 text-[11px]">
            India’s premium shopping destination for high-end electronics, precision wearables, flagship smartphones, and modern lifestyle fashion.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ISO 27001 Certified Secure Checkout</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-3">
            Help & Customer Care
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li>
              <button onClick={onOpenOrders} className="hover:text-white transition-colors cursor-pointer">
                Track Live Order
              </button>
            </li>
            <li>
              <button onClick={onOpenOrders} className="hover:text-white transition-colors cursor-pointer">
                Returns & Cancellation Policy
              </button>
            </li>
            <li>
              <button onClick={() => setIsAddressModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                Saved Shipping Addresses
              </button>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Shipping & Delivery Rates
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-3">
            Top Categories
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li>
              <button onClick={() => setSelectedCategory('electronics')} className="hover:text-white transition-colors cursor-pointer">
                Laptops & Smart Electronics
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedCategory('mobiles')} className="hover:text-white transition-colors cursor-pointer">
                Flagship Smartphones
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedCategory('audio')} className="hover:text-white transition-colors cursor-pointer">
                Studio Headphones & Audio
              </button>
            </li>
            <li>
              <button onClick={() => setSelectedCategory('fashion')} className="hover:text-white transition-colors cursor-pointer">
                Organic Cotton Apparel
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase font-bold text-white tracking-wider mb-3">
            Consumer Policy & Trust
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Cancellation & Returns
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Terms of Use & Privacy
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Security & PCI-DSS Standards
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Grievance Redressal
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="border-t border-slate-900 py-6 px-4 text-center text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 NovaCart Internet Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <button
              onClick={() => setIsTestingSuiteOpen(true)}
              className="flex items-center gap-1 hover:text-slate-300 transition-colors cursor-pointer"
              title="System Verification & Flow Diagnostics"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Diagnostic Checks</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
