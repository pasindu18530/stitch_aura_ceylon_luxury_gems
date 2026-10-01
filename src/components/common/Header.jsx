import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Header({ onOpenSearch }) {
  const { currency, setCurrency, formatPrice } = useCurrency();
  const { wishlistCount } = useWishlist();
  const { compareCount, setIsCompareModalOpen } = useCompare();
  const { cartCount, cartTotal, setIsBagOpen } = useCart();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const activeClass = "py-2 transition-colors text-primary font-semibold border-b border-primary";
  const inactiveClass = "text-on-surface-variant hover:text-on-surface py-2 transition-colors";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Top Announcement Bar */}
      <div className="bg-primary-container text-on-primary-container font-label-sm text-label-sm tracking-widest uppercase">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-9 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-[14px] text-secondary-fixed-dim">verified</span>
            <span>Complimentary Insured Worldwide Courier &amp; GIA/SSEF Vault Verification • Private Salons: Colombo, London, Geneva, Dubai</span>
          </div>
          <div className="flex md:hidden items-center">
            <span className="text-surface-container-highest truncate">Worldwide Insured Courier &amp; Vault Verification</span>
          </div>

          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-xs text-secondary-fixed-dim">
              <span className="material-symbols-outlined text-[13px]">diamond</span>
              <Link to="/consultation" className="hover:text-surface-container-lowest transition-colors">
                Gemologist Concierge 24/7
              </Link>
            </div>
            <div className="h-3 w-[1px] bg-outline/40"></div>
            <div className="flex items-center gap-space-xs">
              <span className="text-on-primary-container">CURRENCY:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-surface-container-lowest focus:outline-none cursor-pointer uppercase font-mono"
              >
                <option className="bg-primary-container text-on-primary-container" value="USD">USD $</option>
                <option className="bg-primary-container text-on-primary-container" value="EUR">EUR €</option>
                <option className="bg-primary-container text-on-primary-container" value="GBP">GBP £</option>
                <option className="bg-primary-container text-on-primary-container" value="LKR">LKR Rs</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Logo />

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-space-lg font-label-md text-label-md uppercase tracking-[0.14em]">
          <NavLink
            to="/jewellery"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            High Jewellery
          </NavLink>

          {/* Ceylon Gemstones with Mega Menu */}
          <div className="relative group py-2">
            <NavLink
              to="/gemstones"
              className={({ isActive }) =>
                `transition-colors inline-flex items-center gap-1.5 ${isActive ? 'text-primary font-semibold border-b border-primary' : 'text-on-surface-variant hover:text-on-surface'}`
              }
            >
              <span>Ceylon Gemstones</span>
              <span className="font-label-sm text-[9px] px-1.5 py-0.5 rounded bg-secondary text-on-secondary normal-case tracking-normal">
                Direct Mines
              </span>
            </NavLink>

            {/* Mega Menu Dropdown */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block w-[720px] bg-surface-container-lowest p-space-lg shadow-[0_24px_60px_-12px_rgba(13,34,64,0.08)] rounded-xl border border-surface-container">
              <div className="grid grid-cols-3 gap-space-lg">
                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm tracking-wider uppercase text-secondary font-bold">
                    Imperial Sapphires
                  </span>
                  <div className="flex flex-col space-y-2 pt-2">
                    <Link to="/gemstones?category=blue" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                      Royal Blue Sapphires
                    </Link>
                    <Link to="/gemstones?category=padparadscha" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                      Padparadscha (King)
                    </Link>
                    <Link to="/gemstones?category=star" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                      Star Sapphires (Asterism)
                    </Link>
                    <Link to="/gemstones?category=blue" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                      Cornflower &amp; Teal
                    </Link>
                  </div>
                </div>

                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm tracking-wider uppercase text-secondary font-bold">
                    Museum Minerals
                  </span>
                  <div className="flex flex-col space-y-2 pt-2">
                    <Link to="/gemstones?category=ruby" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                      Ceylon Rubies (Ratnapura)
                    </Link>
                    <Link to="/gemstones?category=alexandrite" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                      Chrysoberyl Alexandrite
                    </Link>
                    <Link to="/gemstones?category=alexandrite" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                      Cat's Eye Chrysoberyl
                    </Link>
                    <Link to="/gemstones?category=yellow" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
                      Tsavorite &amp; Spinel
                    </Link>
                  </div>
                </div>

                <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="font-label-sm text-[9px] uppercase px-1.5 py-0.5 rounded bg-tertiary-container text-on-tertiary font-semibold">
                      Zero Thermal Treatment
                    </span>
                    <p className="font-headline-sm text-[16px] leading-tight text-on-surface pt-2">
                      Unheated Natural Gems
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Guaranteed SSEF, Gübelin, &amp; GIA double-sealed passports.
                    </p>
                  </div>
                  <Link
                    to="/gemstones"
                    className="font-label-sm text-label-sm uppercase tracking-wider text-secondary flex items-center gap-1 hover:underline"
                  >
                    Browse The Register <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <NavLink
            to="/collections"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            Collections
          </NavLink>

          <NavLink
            to="/custom-atelier"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            Custom Atelier
          </NavLink>

          <NavLink
            to="/bridal"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            Bridal &amp; Solitaires
          </NavLink>

          <NavLink
            to="/the-vault-heritage"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            The Vault &amp; Heritage
          </NavLink>

          <NavLink
            to="/consultation"
            className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
          >
            Consultation
          </NavLink>
        </nav>

        {/* Right Side Icons & Actions */}
        <div className="flex items-center gap-space-sm">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-space-sm py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors"
            title="Search gemstones and SKUs"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            <span className="font-label-sm text-label-sm uppercase hidden md:inline">Search</span>
            <kbd className="hidden lg:inline text-[10px] px-1 py-0.5 bg-surface-container-high rounded text-on-surface-variant font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Private Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-2 text-on-surface-variant hover:text-on-surface transition-colors"
            title="Private Wishlist"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-secondary text-on-secondary font-label-sm text-[9px] flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Gemstone Comparison Tray */}
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="relative p-2 text-on-surface-variant hover:text-on-surface transition-colors"
            title="Gemstone Comparison Tray"
          >
            <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
            {compareCount > 0 && (
              <span className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-[9px] flex items-center justify-center font-bold">
                {compareCount}
              </span>
            )}
          </button>

          {/* Velvet Acquisition Bag */}
          <button
            onClick={() => setIsBagOpen(true)}
            className="flex items-center gap-1.5 p-2 text-on-surface-variant hover:text-on-surface transition-colors"
            title="Velvet Acquisition Bag"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span className="font-label-sm text-label-sm hidden sm:inline">
              {cartCount > 0 ? formatPrice(cartTotal) : "$0"}
            </span>
            {cartCount > 0 && (
              <span className="h-3.5 w-3.5 rounded-full bg-primary text-on-primary font-label-sm text-[9px] flex items-center justify-center font-bold sm:hidden">
                {cartCount}
              </span>
            )}
          </button>

          {/* Client Account */}
          <Link
            to={user?.role === 'admin' ? '/admin' : '/account'}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-1 cursor-pointer transition-transform hover:scale-105"
            title={user ? `${user.name} (${user.tier})` : "Client Account"}
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              {user?.role === 'admin' ? 'admin_panel_settings' : 'person'}
            </span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-on-surface-variant hover:text-primary"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-t border-surface-container px-6 py-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3 font-label-md text-label-md uppercase tracking-[0.14em]">
            <NavLink to="/jewellery" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-on-surface-variant")}>
              High Jewellery
            </NavLink>
            <NavLink to="/gemstones" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-on-surface-variant")}>
              Ceylon Gemstones
            </NavLink>
            <NavLink to="/collections" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-on-surface-variant")}>
              Collections
            </NavLink>
            <NavLink to="/custom-atelier" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-on-surface-variant")}>
              Custom Atelier
            </NavLink>
            <NavLink to="/bridal" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-on-surface-variant")}>
              Bridal &amp; Solitaires
            </NavLink>
            <NavLink to="/the-vault-heritage" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-on-surface-variant")}>
              The Vault &amp; Heritage
            </NavLink>
            <NavLink to="/consultation" className={({ isActive }) => (isActive ? "text-primary font-bold" : "text-on-surface-variant")}>
              Consultation
            </NavLink>
            <div className="pt-4 border-t border-surface-container flex flex-col space-y-2">
              <Link to="/account" className="text-secondary font-bold">
                Client Portal / Dashboard
              </Link>
              <Link to="/admin" className="text-on-surface-variant hover:text-primary">
                Vault Master Admin
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
