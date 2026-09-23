import React from 'react';
import { SlidersHorizontal, X, Star, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const ProductCatalog: React.FC = () => {
  const {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceFilter,
    setPriceFilter
  } = useShop();

  const formatPrice = (amt: number) => '₹' + amt.toLocaleString('en-IN');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'mobiles', label: 'Mobiles' },
    { id: 'audio', label: 'Audio' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'home', label: 'Home Appliances' },
    { id: 'sports', label: 'Sports & Footwear' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search status & headline */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-['Space_Grotesk'] tracking-tight">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : selectedCategory === 'all'
              ? 'Featured Products & Deals'
              : `${selectedCategory.toUpperCase()} Catalog`}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items with fast delivery guarantee
          </p>
        </div>

        {/* Sort selector & reset filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-hidden focus:border-blue-600 cursor-pointer shadow-xs"
            >
              <option value="popularity">Popularity / Best Selling</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>

          {(searchQuery || selectedCategory !== 'all' || priceFilter < 250000) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceFilter(250000);
              }}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 border border-rose-200 bg-rose-50 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Filters</span>
            </h3>
            <span className="text-[11px] text-slate-400">{filteredProducts.length} items</span>
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-semibold text-slate-800 mb-2">Category</h4>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-800">Max Budget</span>
              <span className="font-mono font-bold text-blue-600">
                {priceFilter >= 250000 ? 'Any Price' : formatPrice(priceFilter)}
              </span>
            </div>
            <input
              type="range"
              min={2000}
              max={250000}
              step={5000}
              value={priceFilter}
              onChange={(e) => setPriceFilter(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>₹2,000</span>
              <span>₹2,50,000</span>
            </div>
          </div>

          {/* Customer Rating Guarantee */}
          <div className="pt-2 border-t border-slate-100 text-xs space-y-2">
            <span className="font-semibold text-slate-800 block">Customer Rating</span>
            <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 p-2 rounded-lg">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-slate-900">4.0 & above</span>
            </div>
          </div>

          {/* Assured Tag Benefit */}
          <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900">
            <p className="font-bold flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Nova Assured Promise</span>
            </p>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Every item is quality checked, packed in tamper-proof boxes, and dispatched via priority courier.
            </p>
          </div>
        </div>

        {/* Right Products Grid */}
        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
              <p className="text-base font-bold text-slate-900 mb-1">No products found</p>
              <p className="text-xs text-slate-500 mb-6">
                Try searching for a different keyword or relaxing your budget and category filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setPriceFilter(250000);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
