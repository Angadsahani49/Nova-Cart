import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistModal: React.FC = () => {
  const {
    wishlist,
    products,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    moveWishlistToCart,
    setSelectedProductForDetail
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const formatPrice = (amt: number) => '₹' + amt.toLocaleString('en-IN');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
              My Saved Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Your Wishlist is Empty</h3>
              <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
                Save your favorite items by tapping the heart icon on any product card.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-6 rounded-xl transition-colors cursor-pointer"
              >
                Browse Products
              </button>
            </div>
          ) : (
            wishlistProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex gap-3.5"
              >
                <div
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setSelectedProductForDetail(prod);
                  }}
                  className="w-20 h-20 bg-white rounded-lg border border-slate-200 p-1 shrink-0 flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  <img
                    src={prod.image}
                    alt={prod.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {prod.brand}
                    </span>
                    <h4
                      onClick={() => {
                        setIsWishlistOpen(false);
                        setSelectedProductForDetail(prod);
                      }}
                      className="text-xs font-semibold text-slate-900 line-clamp-1 leading-snug cursor-pointer hover:text-blue-600"
                    >
                      {prod.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                        {formatPrice(prod.price)}
                      </span>
                      {prod.originalPrice > prod.price && (
                        <span className="text-[11px] text-slate-400 line-through font-mono tabular-nums">
                          {formatPrice(prod.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => moveWishlistToCart(prod.id)}
                      className="bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => moveWishlistToCart(p.id));
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Move All to Cart</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
