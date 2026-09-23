import React, { useState } from 'react';
import {
  X,
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  CheckCircle,
  Tag,
  MapPin
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    pincode,
    setPincode,
    checkPincodeDelivery,
    pincodeDeliveryDays,
    setIsCheckoutModalOpen,
    setIsCartDrawerOpen
  } = useShop();

  const [inputPincode, setInputPincode] = useState(pincode);
  const [pinFeedback, setPinFeedback] = useState<string | null>(null);

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;
  const isFavorited = isInWishlist(product.id);

  const formatPrice = (amt: number) => '₹' + amt.toLocaleString('en-IN');

  const handlePincodeCheck = () => {
    const valid = checkPincodeDelivery(inputPincode);
    if (valid) {
      setPincode(inputPincode);
      setPinFeedback(`Delivering to ${inputPincode} in ${pincodeDeliveryDays || 1} day(s)`);
    } else {
      setPinFeedback('Please enter a valid 6-digit postal code');
    }
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    setSelectedProductForDetail(null);
    setIsCheckoutModalOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    setIsCartDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Header with Title and Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              {product.brand}
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs text-slate-600 capitalize">{product.category}</span>
          </div>

          <button
            onClick={() => setSelectedProductForDetail(null)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Gallery */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-square bg-slate-50 rounded-2xl border border-slate-200/80 p-4 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-center"
                />

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full transition-all cursor-pointer ${
                    isFavorited
                      ? 'bg-rose-50 text-rose-600 shadow-md'
                      : 'bg-white text-slate-400 hover:text-rose-500 shadow-sm border border-slate-200'
                  }`}
                  title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Assured & Trust Tags */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Original Brand Guarantee & Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Free Express Delivery for orders above ₹999</span>
                </div>
              </div>
            </div>

            {/* Right Product Info */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-2 font-['Space_Grotesk']">
                  {product.title}
                </h1>

                {/* Rating & Verified Tag */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 bg-emerald-700 text-white font-bold text-xs px-2 py-0.5 rounded">
                    <span>{product.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <span className="text-xs text-slate-500">
                    {product.ratingCount.toLocaleString('en-IN')} Ratings & {product.reviews.length} Verified Reviews
                  </span>
                  {product.isAssured && (
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Nova Assured
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/80 mb-5">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.discountPercentage > 0 && (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">Inclusive of all taxes · EMI starts at ₹1,199/month</p>
                </div>

                {/* Bank / Coupon Offers */}
                <div className="mb-5 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-blue-600" />
                    <span>Available Offers</span>
                  </h3>
                  <div className="text-xs space-y-1.5 text-slate-600">
                    <p className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">Offer 1:</span>
                      <span>Flat 10% instant discount with coupon code <strong>WELCOME10</strong> at checkout</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">Offer 2:</span>
                      <span>No cost EMI on all major credit cards for orders above ₹10,000</span>
                    </p>
                  </div>
                </div>

                {/* Pincode & Delivery Availability Checker */}
                <div className="mb-5 p-3.5 bg-white border border-slate-200 rounded-xl">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Check Delivery & Fast Shipping</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={inputPincode}
                      onChange={(e) => setInputPincode(e.target.value)}
                      placeholder="Enter 6-digit Pincode"
                      className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 outline-hidden focus:border-blue-600 w-44 font-mono"
                    />
                    <button
                      onClick={handlePincodeCheck}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Check
                    </button>
                  </div>
                  {pinFeedback && (
                    <p className="text-[11px] text-emerald-700 mt-1.5 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>{pinFeedback}</span>
                    </p>
                  )}
                </div>

                {/* Highlights */}
                <div className="mb-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Key Highlights
                  </h3>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                    {product.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-blue-500/20 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3 font-['Space_Grotesk']">
              Product Specifications
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              {Object.entries(product.specs).map(([key, val], idx) => (
                <div
                  key={key}
                  className={`grid grid-cols-12 p-3 ${
                    idx % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'
                  } border-b border-slate-100 last:border-0`}
                >
                  <div className="col-span-4 font-semibold text-slate-700">{key}</div>
                  <div className="col-span-8 text-slate-600 font-mono">{val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3 font-['Space_Grotesk']">
              Verified Ratings & Customer Reviews
            </h3>
            <div className="space-y-3">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-emerald-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        <span>{rev.rating}</span>
                        <Star className="w-2.5 h-2.5 fill-white" />
                      </div>
                      <span className="text-xs font-semibold text-slate-900">{rev.title}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">{rev.comment}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>{rev.author}</span>
                    <span className="text-slate-300">·</span>
                    <span className="text-emerald-600">Verified Purchase</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
