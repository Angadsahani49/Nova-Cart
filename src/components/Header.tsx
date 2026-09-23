import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User as UserIcon,
  MapPin,
  CheckCircle2,
  ChevronDown,
  Package,
  LogOut,
  X,
  Truck,
  Sparkles,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Header: React.FC<{ onOpenOrders: () => void }> = ({ onOpenOrders }) => {
  const {
    currentUser,
    cart,
    wishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setIsCartDrawerOpen,
    setIsWishlistOpen,
    setIsAuthModalOpen,
    setAuthModalMode,
    logoutUser,
    pincode,
    setIsAddressModalOpen,
    setIsTestingSuiteOpen
  } = useShop();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'electronics', label: 'Electronics & Laptops' },
    { id: 'mobiles', label: 'Mobiles & Tablets' },
    { id: 'audio', label: 'Audio & Headphones' },
    { id: 'fashion', label: 'Fashion & Apparel' },
    { id: 'home', label: 'Home & Kitchen' },
    { id: 'sports', label: 'Sports & Fitness' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Festive Tech Fest
            </span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="hidden sm:inline text-slate-300">
              Extra 10% instant discount with code <strong className="text-white">WELCOME10</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <span className="hidden md:inline text-slate-400">⚡ Free Express Delivery on orders over $49</span>
            <span className="text-slate-700 hidden md:inline">|</span>
            <span className="text-slate-300">24x7 Customer Support</span>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Brand Logo & Delivery Location */}
        <div className="flex items-center gap-3 lg:gap-5 shrink-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="flex items-center gap-2 text-left group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-950 font-['Space_Grotesk']">
                Nova<span className="text-blue-600">Cart</span>
              </span>
            </button>

            {/* Verification / Testing Suite Icon Badge under Logo */}
            <button
              onClick={() => setIsTestingSuiteOpen(true)}
              title="Verification & Testing Suite (Click to inspect all 12 E2E flows)"
              className="group flex items-center gap-1 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 hover:border-emerald-300 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Verified</span>
            </button>
          </div>

          {/* Delivery Location Pincode Selector */}
          <button
            onClick={() => setIsAddressModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer"
            title="Update delivery location"
          >
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <div className="text-left leading-tight">
              <span className="text-[10px] text-slate-400 block">Deliver to</span>
              <span className="font-semibold text-slate-800">{pincode}</span>
            </div>
          </button>
        </div>

        {/* Zone 2: Amazon / Flipkart Style Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <div className="flex items-center border-2 border-slate-200 focus-within:border-blue-600 rounded-xl overflow-hidden bg-slate-50 transition-colors">
            {/* Category Dropdown Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="hidden md:block bg-slate-100 text-xs font-medium text-slate-700 border-r border-slate-200 px-3 py-2.5 outline-hidden cursor-pointer hover:bg-slate-200/70"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Input with real-time clear */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for mobiles, laptops, headphones, fashion, appliances..."
              className="w-full text-sm px-3.5 py-2.5 bg-transparent text-slate-900 placeholder-slate-400 outline-hidden"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 mr-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 flex items-center justify-center transition-colors cursor-pointer"
              title="Search products"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Zone 3: Actions (Testing Checks, Auth/Account, Wishlist, Cart) */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* User Account / Auth Dropdown */}
          <div className="relative" ref={userMenuRef}>
            {currentUser ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 px-2.5 py-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase border border-blue-200">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left leading-tight">
                  <span className="text-[10px] text-slate-400 block">Hello,</span>
                  <span className="font-semibold text-slate-900 truncate max-w-[90px] block">
                    {currentUser.name.split(' ')[0]}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthModalMode('LOGIN');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-3 py-2 transition-colors cursor-pointer"
              >
                <UserIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* User Dropdown Menu */}
            {isUserMenuOpen && currentUser && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-xs">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onOpenOrders();
                    }}
                    className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-blue-600" />
                    <span>My Orders & Returns</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsAddressModalOpen(true);
                    }}
                    className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>Manage Saved Addresses</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsWishlistOpen(true);
                    }}
                    className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>My Wishlist ({wishlist.length})</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsTestingSuiteOpen(true);
                    }}
                    className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Testing Checks Suite</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      logoutUser();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="My Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl transition-colors cursor-pointer"
            title="View Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-blue-500 text-white font-bold text-[10px] min-w-[16px] h-4 rounded-full px-1 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>
      </div>

      {/* Categories Bar (Flipkart / Amazon subnav) */}
      <div className="bg-slate-50 border-t border-slate-200/80 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs py-2 gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-500 shrink-0">
            <button
              onClick={onOpenOrders}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              <span>Track Orders</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
