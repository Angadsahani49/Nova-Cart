/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { AddressManager } from './components/AddressManager';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { OrderCancellationModal } from './components/OrderCancellationModal';
import { InvoiceModal } from './components/InvoiceModal';
import { AuthModal } from './components/AuthModal';
import { OrdersListModal } from './components/OrdersListModal';
import { TestingSuiteModal } from './components/TestingSuiteModal';
import { Footer } from './components/Footer';

const MainAppContent: React.FC = () => {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Flipkart & Amazon inspired Navigation */}
      <Header onOpenOrders={() => setIsOrdersOpen(true)} />

      {/* Main Page Body */}
      <main className="flex-1">
        <HeroBanner />
        <ProductCatalog />
      </main>

      {/* Footer */}
      <Footer onOpenOrders={() => setIsOrdersOpen(true)} />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <WishlistModal />
      <AddressManager />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderTrackingModal />
      <OrderCancellationModal />
      <InvoiceModal />
      <AuthModal />
      <OrdersListModal isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} />
      <TestingSuiteModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}
