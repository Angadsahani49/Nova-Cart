import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Zap } from 'lucide-react';
import heroBannerImg from '../assets/images/hero_ecommerce_banner_1790177055618.jpg';
import { useShop } from '../context/ShopContext';

export const HeroBanner: React.FC = () => {
  const { setSelectedCategory, setSearchQuery } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6">
      {/* Main Campaign Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white shadow-lg border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[340px]">
          {/* Left Text Pitch */}
          <div className="lg:col-span-7 p-6 sm:p-10 z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>BIG TECH REVEAL · UP TO 40% OFF</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4 font-['Space_Grotesk']">
              Next-Gen Audio & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                Flagship Devices
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-lg mb-6 leading-relaxed">
              Experience studio-grade active noise cancellation, aerospace titanium smartwatches, and ultrafast next-day delivery.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('audio');
                  setSearchQuery('');
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Audio Deals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl border border-white/15 transition-colors cursor-pointer"
              >
                Explore All Catalog
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-full w-full overflow-hidden flex items-center justify-center p-4">
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={heroBannerImg}
                alt="Premium Electronics Showcase"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-slate-300">Sony WH-1000XM5 & Titan Pro</span>
                <span className="text-amber-400 font-bold">Deal of the Day</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Strip (Flipkart & Amazon style guarantee) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Express Delivery</p>
            <p className="text-[11px] text-slate-500">Same or next day on 10k+ items</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">100% Genuine</p>
            <p className="text-[11px] text-slate-500">Direct from authorized brands</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">7-Day Free Return</p>
            <p className="text-[11px] text-slate-500">Doorstep pickup & instant refund</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Secure Payments</p>
            <p className="text-[11px] text-slate-500">UPI, Cards, NetBanking & COD</p>
          </div>
        </div>
      </div>
    </div>
  );
};
