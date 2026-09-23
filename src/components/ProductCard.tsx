import React from 'react';
import { Star, Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types/ecommerce';
import { useShop } from '../context/ShopContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProductForDetail,
    cart
  } = useShop();

  const isFavorited = isInWishlist(product.id);
  const isInCart = cart.some((item) => item.product.id === product.id);

  const formatPrice = (amt: number) => {
    return '₹' + amt.toLocaleString('en-IN');
  };

  return (
    <div className="group relative bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div
        onClick={() => setSelectedProductForDetail(product)}
        className="relative w-full aspect-4/3 bg-slate-50 cursor-pointer overflow-hidden p-3 flex items-center justify-center"
      >
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Ribbon */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white font-bold text-[10px] tracking-wide px-2 py-0.5 rounded shadow-xs">
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all cursor-pointer ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 hover:bg-white text-slate-400 hover:text-rose-500 shadow-xs backdrop-blur-xs'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Assured Tag */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-slate-400">
              {product.brand}
            </span>
            {product.isAssured && (
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/50">
                Nova Assured
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProductForDetail(product)}
            className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 line-clamp-2 cursor-pointer transition-colors leading-snug mb-2"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Ratings & Reviews */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 bg-emerald-700 text-white font-bold text-xs px-1.5 py-0.5 rounded">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-white" />
            </div>
            <span className="text-xs text-slate-400">
              ({product.ratingCount.toLocaleString('en-IN')})
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-base font-bold text-slate-950 font-mono tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-[11px] text-slate-500 mb-3 truncate">
            {product.fastDeliveryDate}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isInCart
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                  : 'bg-slate-900 text-white hover:bg-blue-600 shadow-xs'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={() => setSelectedProductForDetail(product)}
              className="py-2 px-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors cursor-pointer"
              title="Quick view product specifications"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
