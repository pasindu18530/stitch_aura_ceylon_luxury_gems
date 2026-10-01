import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header.jsx';
import Footer from './components/common/Footer.jsx';
import SearchModal from './components/common/SearchModal.jsx';
import BagDrawer from './components/common/BagDrawer.jsx';
import ComparisonDrawer from './components/common/ComparisonDrawer.jsx';
import ComparisonModal from './components/common/ComparisonModal.jsx';
import HomePage from './pages/HomePage.jsx';
import GemstonesPage from './pages/GemstonesPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import { AtelierPage } from './pages/AtelierPage.jsx';
import { CollectionsPage } from './pages/CollectionsPage.jsx';
import { BridalPage } from './pages/BridalPage.jsx';
import { HeritagePage } from './pages/HeritagePage.jsx';
import { ConsultationPage } from './pages/ConsultationPage.jsx';
import { WishlistPage } from './pages/WishlistPage.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { CheckoutPage } from './pages/CheckoutPage.jsx';

function NotFoundPage() {
  return (
    <div className="w-full pt-40 pb-space-xl px-6 text-center min-h-screen bg-surface font-body-md text-on-surface">
      <span className="material-symbols-outlined text-[64px] text-on-surface-variant">diamond</span>
      <h1 className="font-headline-lg text-headline-lg text-primary mt-4">Vault Section Not Found</h1>
      <p className="font-body-md text-body-md text-on-surface-variant mt-2 mb-6">
        This section of the Serendib Impérial Vault is not yet accessible.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest hover:bg-surface-container-highest hover:text-on-surface transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Return to Vault
      </a>
    </div>
  );
}

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      {/* Global Header */}
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Global Overlays (always mounted) */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <BagDrawer />
      <ComparisonDrawer />
      <ComparisonModal />

      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gemstones" element={<GemstonesPage />} />
        <Route path="/high-jewellery" element={<CollectionsPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/gemstones/:id" element={<ProductDetailPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/custom-atelier" element={<AtelierPage />} />
        <Route path="/bridal-solitaires" element={<BridalPage />} />
        <Route path="/bridal" element={<BridalPage />} />
        <Route path="/the-vault-heritage" element={<HeritagePage />} />
        <Route path="/heritage" element={<HeritagePage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
