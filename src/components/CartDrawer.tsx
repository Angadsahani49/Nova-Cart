import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Heart
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    deliveryCharge,
    totalAmount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    setIsCheckoutModalOpen,
    toggleWishlist
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartDrawerOpen) return null;

  const formatPrice = (amt: number) => '₹' + amt.toLocaleString('en-IN');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    setCouponMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
              Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h2>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Your Cart is Empty</h3>
              <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
                Explore our featured electronics, audio gear, and lifestyle products.
              </p>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-6 rounded-xl transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex gap-3.5"
                >
                  <div className="w-20 h-20 bg-white rounded-lg border border-slate-200 p-1 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">
                        {item.product.brand}
                      </span>
                      <h4 className="text-xs font-semibold text-slate-900 line-clamp-1 leading-snug">
                        {item.product.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.originalPrice > item.product.price && (
                          <span className="text-[11px] text-slate-400 line-through font-mono tabular-nums">
                            {formatPrice(item.product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold px-2.5 py-0.5 text-slate-900 font-mono tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                          title="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            toggleWishlist(item.product.id);
                            removeFromCart(item.product.id);
                          }}
                          className="text-[11px] text-slate-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                          title="Move to wishlist"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Save</span>
                        </button>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon Applicator */}
              <div className="pt-2">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Enter Coupon (e.g. WELCOME10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded-xl outline-hidden focus:border-blue-600 uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {couponMessage && (
                  <p
                    className={`text-[11px] mt-1.5 ${
                      couponMessage.isError ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}

                {appliedCoupon && (
                  <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        Applied: <strong>{appliedCoupon.code}</strong> (
                        {appliedCoupon.discountPercentage
                          ? `${appliedCoupon.discountPercentage}% Off`
                          : `₹${appliedCoupon.discountAmount} Off`}
                        )
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-rose-600 font-bold text-[11px] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Bottom Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Total Item MRP</span>
                <span className="font-mono tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Coupon Savings</span>
                  <span className="font-mono tabular-nums">- {formatPrice(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-mono tabular-nums">
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-600 font-semibold">FREE</span>
                  ) : (
                    formatPrice(deliveryCharge)
                  )}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Amount</span>
                <span className="text-base font-extrabold text-blue-600 font-mono tabular-nums">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedCheckout}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-blue-500/20 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe and Secure 256-bit SSL Encrypted Payments</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
