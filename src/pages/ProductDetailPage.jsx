import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GEMSTONES } from '../data/gemstones';
import { JEWELLERY } from '../data/jewellery';
import RingSizerModal from '../components/common/RingSizerModal';
import { useCurrency } from '../context/CurrencyContext';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useCompare();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  // Find gemstone or jewelry piece
  const product = GEMSTONES.find(g => g.id === id) || JEWELLERY.find(j => j.id === id) || GEMSTONES[0];

  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState('950 Platinum');
  const [selectedSize, setSelectedSize] = useState('6.0');
  const [engraving, setEngraving] = useState('');
  const [lightingMode, setLightingMode] = useState('daylight'); // 'daylight' | 'candlelight'
  const [isSizerOpen, setIsSizerOpen] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const images = product.images && product.images.length > 0 ? product.images : [
    { url: product.image, label: "Face-Up", alt: product.name }
  ];

  const currentImage = images[activeThumbIndex] ? images[activeThumbIndex].url : product.image;

  const isFavorited = isInWishlist(product.id);
  const isComparedItem = isCompared(product.id);

  // Wire discount calculation (-2%)
  const wireDiscountPrice = Math.round(product.price * 0.98);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const delta = clientX - startX;
    if (Math.abs(delta) > 10) {
      setRotationAngle(prev => prev + (delta > 0 ? 5 : -5));
      setStartX(clientX);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleAcquire = () => {
    addToCart(product, {
      metal: selectedMetal,
      size: selectedSize,
      engraving: engraving
    });
  };

  const handleScheduleShowing = () => {
    window.location.href = `/consultation?type=virtual&interest=${encodeURIComponent(product.title || product.name)}`;
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      {/* Micro Breadcrumb & Global Security Bar */}
      <section className="w-full bg-surface-container-low text-on-surface-variant pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
            <Link to="/jewellery" className="hover:text-primary transition-colors">Haute Joaillerie</Link>
            <span className="text-outline-variant">/</span>
            <Link to="/gemstones" className="hover:text-primary transition-colors">Ceylon Royal Corundum</Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold truncate max-w-[200px] sm:max-w-none">
              {product.title || product.name}
            </span>
          </div>

          <div className="flex items-center gap-6 font-label-sm text-label-sm tracking-widest uppercase">
            <span className="flex items-center gap-1.5 text-secondary">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield
              </span>
              GIA &amp; SSEF Double Verified
            </span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-outline-variant"></span>
            <span className="hidden sm:flex items-center gap-1.5 text-on-surface">
              <span className="material-symbols-outlined text-[15px]">lock</span>
              Insured Armored Dispatch: Geneva • NY • Dubai
            </span>
          </div>
        </div>
      </section>

      {/* Main Product Detail Grid */}
      <section className="w-full bg-surface py-8 lg:py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-start">
            {/* LEFT 58% CINEMATIC PRODUCT GALLERY */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {/* Main Display Canvas */}
              <div className="relative w-full rounded-xl overflow-hidden bg-surface-container-lowest shadow-xl p-3 md:p-6 border border-surface-container group">
                {/* Badges Overlay */}
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-tertiary-container text-on-tertiary font-label-sm text-label-sm uppercase tracking-widest shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>
                    Zero Thermal Heat • Unheated
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[13px] text-secondary">verified</span>
                    {product.origin || "Ratnapura Alluvial Gravels"}
                  </span>
                </div>

                {/* Interactive 360 & Tool Controls */}
                <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
                  <button
                    onClick={() => setRotationAngle(a => a + 45)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/95 backdrop-blur-md text-primary hover:bg-primary hover:text-on-primary font-label-sm text-label-sm uppercase tracking-wider transition-all shadow-sm"
                    title="Rotate 360°"
                  >
                    <span className="material-symbols-outlined text-[16px]">360</span>
                    <span>360° Loupe</span>
                  </button>
                  <button
                    onClick={() => setLightingMode(l => l === 'daylight' ? 'candlelight' : 'daylight')}
                    className={`p-2 rounded-lg backdrop-blur-md transition-all shadow-sm ${lightingMode === 'candlelight' ? 'bg-secondary text-on-secondary' : 'bg-surface/95 text-on-surface hover:text-primary'}`}
                    title="Toggle Lighting Spectrum (Daylight vs Candlelight)"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {lightingMode === 'candlelight' ? 'nightlight' : 'wb_sunny'}
                    </span>
                  </button>
                  <button
                    onClick={() => showToast("Microscopic 20x Gemological Loupe Zoom Active", "info")}
                    className="p-2 rounded-lg bg-surface/95 backdrop-blur-md text-on-surface hover:text-primary transition-all shadow-sm"
                    title="20x Microscopic Gemological Zoom"
                  >
                    <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                  </button>
                </div>

                {/* Primary Image Stage with Drag Simulation */}
                <div
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onTouchStart={handleDragStart}
                  onTouchMove={handleDragMove}
                  onTouchEnd={handleDragEnd}
                  className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none transition-colors duration-500 ${
                    lightingMode === 'candlelight' ? 'bg-[#1c1815]' : 'bg-surface-container-low'
                  }`}
                >
                  <img
                    src={currentImage}
                    alt={product.name}
                    style={{
                      transform: `scale(1.05) rotate(${rotationAngle}deg)`,
                      filter: lightingMode === 'candlelight' ? 'sepia(0.2) brightness(0.95)' : 'none'
                    }}
                    className="w-full h-full object-cover transition-transform duration-200"
                  />

                  {/* Drag to Rotate Floating Pill */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-primary/80 backdrop-blur-md text-on-primary font-label-sm text-label-sm uppercase tracking-widest flex items-center gap-2 shadow-lg">
                    <span className="material-symbols-outlined text-[14px]">swipe</span>
                    <span>Drag to Rotate 360° Angle</span>
                  </div>

                  {/* Live Lighting Performance Tag */}
                  <div className="absolute bottom-5 left-5 hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-[10px] tracking-wider uppercase">
                    <span className="material-symbols-outlined text-[13px] text-secondary">
                      {lightingMode === 'candlelight' ? 'flare' : 'wb_sunny'}
                    </span>
                    <span>{lightingMode === 'candlelight' ? '2700K Candlelight Fire' : '5500K North-Sky Daylight Standard'}</span>
                  </div>
                </div>

                {/* 4K Macro Light Performance Dual Switcher Banner */}
                <div className="mt-4 p-3 rounded-lg bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-on-secondary">
                      <span className="material-symbols-outlined text-[16px]">play_circle</span>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                        4K Macro Optical Performance
                      </p>
                      <p className="font-body-sm text-[11px] text-on-surface-variant">
                        Spectroscopy &amp; Pleochroism under pure daylight vs. 2700K ambient candlelight
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setLightingMode('daylight')}
                      className={`px-2.5 py-1 rounded font-label-sm text-[10px] uppercase tracking-wider transition-colors ${
                        lightingMode === 'daylight' ? 'bg-primary text-on-primary font-bold' : 'bg-surface text-primary hover:bg-surface-container-highest'
                      }`}
                      type="button"
                    >
                      Daylight View
                    </button>
                    <button
                      onClick={() => setLightingMode('candlelight')}
                      className={`px-2.5 py-1 rounded font-label-sm text-[10px] uppercase tracking-wider transition-colors ${
                        lightingMode === 'candlelight' ? 'bg-primary text-on-primary font-bold' : 'bg-surface text-primary hover:bg-surface-container-highest'
                      }`}
                      type="button"
                    >
                      Candlelight Fire
                    </button>
                  </div>
                </div>
              </div>

              {/* Thumbnail Carousel Grid */}
              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveThumbIndex(idx)}
                    className={`rounded-lg overflow-hidden bg-surface-container-lowest p-1 shadow-sm focus:outline-none transition-all ${
                      activeThumbIndex === idx ? 'ring-2 ring-primary scale-100' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="w-full aspect-square rounded overflow-hidden bg-surface-container">
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                    </div>
                    <span className="block text-center font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant mt-1">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Chromatographic Spectral Absorption Profile */}
              <div className="rounded-xl bg-surface-container-low p-5 shadow-sm border border-surface-container">
                <div className="flex items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">equalizer</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold text-primary">
                      Chromatographic Spectral Absorption Profile
                    </span>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest font-mono">
                    Fe-Ti Inter-Valence Interval
                  </span>
                </div>
                <div className="w-full h-16 flex items-end gap-1.5 pt-2">
                  <svg className="w-full h-full text-secondary" fill="none" preserveAspectRatio="none" viewBox="0 0 500 70">
                    <defs>
                      <linearGradient id="sapphireGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" stopColor="#051b39" stopOpacity="0.85"></stop>
                        <stop offset="45%" stopColor="#1c1c1a" stopOpacity="0.95"></stop>
                        <stop offset="75%" stopColor="#725b38" stopOpacity="0.9"></stop>
                        <stop offset="100%" stopColor="#e0c298" stopOpacity="0.7"></stop>
                      </linearGradient>
                    </defs>
                    <path d="M0,60 Q40,55 80,48 T160,25 T240,12 T320,38 T400,20 T500,5" stroke="url(#sapphireGrad)" strokeWidth="2.5"></path>
                    <path d="M0,60 Q40,55 80,48 T160,25 T240,12 T320,38 T400,20 T500,5 L500,70 L0,70 Z" fill="url(#sapphireGrad)" fillOpacity="0.12"></path>
                  </svg>
                </div>
                <div className="flex justify-between font-label-sm text-[10px] text-on-surface-variant pt-2 uppercase font-mono">
                  <span>380nm (Violet)</span>
                  <span>450nm (Absorption Peak)</span>
                  <span>550nm (Transmission)</span>
                  <span>720nm (Near Infrared)</span>
                </div>
              </div>
            </div>

            {/* RIGHT 42% PRODUCT & GEMOLOGICAL DOSSIER */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Dossier Header & Title */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-widest font-bold">
                    Piece Unique • Masterpiece
                  </span>
                  <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-mono">
                    Vault Registered #{product.sku}
                  </span>
                </div>
                <h1 className="font-display-md text-display-md text-primary tracking-tight leading-tight font-serif">
                  {product.title || product.name}
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest font-mono">
                  <span>SKU: {product.sku}</span>
                  <span>•</span>
                  <a className="text-secondary hover:underline flex items-center gap-0.5" href="#certificate-preview">
                    GIA #{product.giaNumber || "2215894102"} <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                  </a>
                  <span>•</span>
                  <a className="text-secondary hover:underline flex items-center gap-0.5" href="#certificate-preview">
                    SSEF #{product.ssefNumber || "118492"} <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                  </a>
                </div>
              </div>

              {/* Price & Split Formulation Card */}
              <div className="rounded-xl bg-surface-container-low p-5 shadow-sm space-y-4 border border-surface-container">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block">
                      Total Acquisition Price
                    </span>
                    <span className="font-display-md text-headline-lg font-bold text-primary font-mono">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary bg-surface px-2.5 py-1 rounded font-semibold uppercase">
                      <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                      Complimentary Armored Escrow
                    </span>
                  </div>
                </div>

                {/* Price Breakdown Split */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-surface border border-surface-container-high">
                    <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-[10px] uppercase">
                      <span>{product.carat || 6.85}ct Certified Gem</span>
                      <span className="material-symbols-outlined text-[13px] text-secondary">diamond</span>
                    </div>
                    <span className="font-headline-sm text-[17px] font-semibold text-primary block mt-1 font-mono">
                      {formatPrice(product.looseStonePrice || Math.round(product.price * 0.8))}
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Loose stone value</span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface border border-surface-container-high">
                    <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-[10px] uppercase">
                      <span>Platinum &amp; Setting</span>
                      <span className="material-symbols-outlined text-[13px] text-secondary">auto_fix_high</span>
                    </div>
                    <span className="font-headline-sm text-[17px] font-semibold text-primary block mt-1 font-mono">
                      {formatPrice(product.mountingPrice || Math.round(product.price * 0.2))}
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">Handcrafted mounting</span>
                  </div>
                </div>

                {/* Payment Methods Tier */}
                <div className="pt-2 flex flex-wrap items-center justify-between text-on-surface-variant font-label-sm text-[11px] tracking-wide gap-2 border-t border-surface-container-high">
                  <span className="flex items-center gap-1 text-on-surface font-medium">
                    <span className="material-symbols-outlined text-[14px] text-secondary">account_balance</span>
                    Bank Wire (-2% Rebate: <strong className="text-primary font-mono">{formatPrice(wireDiscountPrice)}</strong>)
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-[14px] text-secondary">currency_bitcoin</span>
                    USDC • BTC • ETH
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">splitscreen</span>
                    Split 50/50 Deposit
                  </span>
                </div>
              </div>

              {/* Configuration & Bespoke Options Form */}
              <div className="space-y-5">
                {/* Precious Metal Finishing */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-label-sm text-label-sm uppercase tracking-widest font-bold text-primary">
                      Precious Metal Suite
                    </label>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">
                      Handcrafted in Geneva
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { name: '950 Platinum', color: '#E5E5E5', sub: 'Default Setting' },
                      { name: '18K Royal Gold', color: '#E8C779', sub: 'No charge swap' },
                      { name: '18K Rose Gold', color: '#EAB39D', sub: 'No charge swap' }
                    ].map(metal => (
                      <button
                        key={metal.name}
                        onClick={() => setSelectedMetal(metal.name)}
                        className={`p-3 rounded-lg shadow-sm flex flex-col items-center gap-1.5 transition-all text-left border ${
                          selectedMetal === metal.name
                            ? 'bg-surface-container-lowest border-primary ring-1 ring-primary'
                            : 'bg-surface-container-low hover:bg-surface-container border-transparent'
                        }`}
                        type="button"
                      >
                        <span className="w-5 h-5 rounded-full shadow-inner inline-block" style={{ backgroundColor: metal.color }}></span>
                        <span className="font-label-sm text-label-sm uppercase font-semibold text-primary">{metal.name}</span>
                        <span className="font-body-sm text-[10px] text-on-surface-variant">{metal.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ring Size Selection & Conversion Sizer */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <label className="font-label-sm text-label-sm uppercase tracking-widest font-bold text-primary">
                        Bespoke Ring Size
                      </label>
                      <span className="font-label-sm text-[10px] text-secondary font-medium uppercase font-mono">
                        (US Standard)
                      </span>
                    </div>
                    <button
                      onClick={() => setIsSizerOpen(true)}
                      className="font-label-sm text-label-sm text-secondary hover:underline uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[13px]">straighten</span>
                      Conversion Chart • Free Kit
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {['4.5', '5.0', '5.5', '6.0', '6.5', '7.0', 'Custom'].map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 rounded font-label-md text-label-md transition-colors ${
                          selectedSize === size
                            ? 'bg-primary text-on-primary font-bold shadow-sm'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
                        }`}
                        type="button"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-secondary">check_circle</span>
                    Complimentary lifetime sizing adjustments within +/- 2.5 sizes.
                  </p>
                </div>

                {/* Optional Laser Engraving Field */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-label-sm text-label-sm uppercase tracking-widest font-bold text-primary" htmlFor="engravingInput">
                      Micro-Laser Inscription (Interior Shank)
                    </label>
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-mono">
                      Max 24 Roman Characters
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      id="engravingInput"
                      value={engraving}
                      onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                      maxLength={24}
                      placeholder="e.g. SEMPER FIDELIS • VII.X.MMXXIV"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-low font-body-sm text-body-sm text-primary placeholder:text-outline-variant focus:outline-none focus:bg-surface-container-lowest transition-colors uppercase font-mono tracking-wider border border-surface-container-high"
                      type="text"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-on-surface-variant">
                      edit_note
                    </span>
                  </div>
                </div>
              </div>

              {/* PRIMARY ACTION CTA SUITE */}
              <div className="space-y-3 pt-2">
                {/* Main Acquisition Button */}
                <button
                  onClick={handleAcquire}
                  className="w-full py-4 px-6 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-[0.2em] font-bold shadow-xl hover:bg-tertiary-container hover:text-on-tertiary transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px] text-secondary-fixed">lock</span>
                  <span>Acquire &amp; Secure in Vault</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>

                {/* Secondary High Touch Gemologist Video Appointment */}
                <button
                  onClick={handleScheduleShowing}
                  className="w-full py-3 px-6 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">videocam</span>
                  <span>Schedule 1-on-1 Live Loupe Showing</span>
                </button>

                {/* Tertiary Utility Actions */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`py-2.5 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-sm text-label-sm uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                      isFavorited ? 'text-error font-bold' : 'text-on-surface-variant hover:text-primary'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">favorite</span>
                    <span>{isFavorited ? "Saved in Wishlist" : "Private Wishlist"}</span>
                  </button>
                  <button
                    onClick={() => toggleCompare(product)}
                    className={`py-2.5 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-sm text-label-sm uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                      isComparedItem ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
                    <span>{isComparedItem ? "In Comparison Tray" : "Compare Specs"}</span>
                  </button>
                </div>
              </div>

              {/* Quick Connoisseur Assurance Points */}
              <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm space-y-2.5 border border-surface-container">
                <div className="flex items-center gap-2.5 text-on-surface font-label-sm text-[11px] uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                  <span>Tamper-Proof Micro-Chipped Vault Enclosure</span>
                </div>
                <div className="flex items-center gap-2.5 text-on-surface font-label-sm text-[11px] uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[16px] text-secondary">flight_takeoff</span>
                  <span>Armored Courier Delivery via Malca-Amit / Brink's</span>
                </div>
                <div className="flex items-center gap-2.5 text-on-surface font-label-sm text-[11px] uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[16px] text-secondary">history_edu</span>
                  <span>Full Historical Dossier from Ratnapura Extraction to Polish</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GEMOLOGICAL DOSSIER & SPECIFICATIONS BENTO GRID */}
      <section className="w-full bg-surface-container-low py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.22em] text-secondary font-bold block mb-1">
                Authentic Corundum Science
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary font-serif">
                Master Lapidary &amp; Mineral Specimen Data
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              Every inclusion in this stone acts as nature’s unalterable fingerprint, examined through ultraviolet light emission, confocal Raman spectroscopy, and laser ablation ICP-MS.
            </p>
          </div>

          {/* Spec Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Carat & Dimensions */}
            <div className="p-6 rounded-xl bg-surface-container-lowest shadow-sm space-y-3 border border-surface-container">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">scale</span>
              </div>
              <div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Carat Weight &amp; Spread</h3>
                <p className="font-headline-sm text-headline-sm text-primary font-bold mt-1 font-mono">
                  {product.carat || 6.85} ct ({product.cut || "Sapphire"})
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                  1.42 ct TW Trilliant Diamonds
                </p>
              </div>
              <div className="pt-2 text-on-surface-variant font-label-sm text-[11px] space-y-1 border-t border-surface-container">
                <div className="flex justify-between">
                  <span>Length x Width:</span>
                  <span className="font-mono text-primary font-semibold">{product.dimensions || "12.14 x 9.88 mm"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Depth Ratio:</span>
                  <span className="font-mono text-primary font-semibold">{product.depthRatio || "62.8%"}</span>
                </div>
              </div>
            </div>

            {/* Card 2: Color Grade & Origin */}
            <div className="p-6 rounded-xl bg-surface-container-lowest shadow-sm space-y-3 border border-surface-container">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">palette</span>
              </div>
              <div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Color Grade &amp; Origin</h3>
                <p className="font-headline-sm text-headline-sm text-primary font-bold mt-1">
                  {product.color || "Royal Blue • Ceylon"}
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                  {product.origin || "Ratnapura Valley Gravels"}
                </p>
              </div>
              <div className="pt-2 text-on-surface-variant font-label-sm text-[11px] space-y-1 border-t border-surface-container">
                <div className="flex justify-between">
                  <span>Tone / Saturation:</span>
                  <span className="font-mono text-primary font-semibold">Medium-Deep (Tone 6/Sat 6)</span>
                </div>
                <div className="flex justify-between">
                  <span>Modifier:</span>
                  <span className="font-mono text-primary font-semibold">Pure Blue (Zero Modifier)</span>
                </div>
              </div>
            </div>

            {/* Card 3: Treatment & Micro-Inclusions */}
            <div className="p-6 rounded-xl bg-surface-container-lowest shadow-sm space-y-3 border border-surface-container">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">science</span>
              </div>
              <div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Thermal &amp; Clarity Matrix</h3>
                <p className="font-headline-sm text-headline-sm text-secondary font-bold mt-1">
                  {product.thermal || "Zero Enhancement"}
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                  Unheated Natural Corundum
                </p>
              </div>
              <div className="pt-2 text-on-surface-variant font-label-sm text-[11px] space-y-1 border-t border-surface-container">
                <div className="flex justify-between">
                  <span>Internal Silk:</span>
                  <span className="font-mono text-primary font-semibold">Intact Rutile Needles</span>
                </div>
                <div className="flex justify-between">
                  <span>Clarity:</span>
                  <span className="font-mono text-primary font-semibold">{product.clarity || "Eye-Clean (VS1)"}</span>
                </div>
              </div>
            </div>

            {/* Card 4: Optical Physics & Indices */}
            <div className="p-6 rounded-xl bg-surface-container-lowest shadow-sm space-y-3 border border-surface-container">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <div>
                <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Optical Physics</h3>
                <p className="font-headline-sm text-headline-sm text-primary font-bold mt-1 font-mono">
                  RI 1.762 – 1.770
                </p>
                <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5 font-mono">
                  Birefringence 0.008
                </p>
              </div>
              <div className="pt-2 text-on-surface-variant font-label-sm text-[11px] space-y-1 border-t border-surface-container">
                <div className="flex justify-between">
                  <span>Specific Gravity:</span>
                  <span className="font-mono text-primary font-semibold">4.00 g/cm³</span>
                </div>
                <div className="flex justify-between">
                  <span>Fluorescence:</span>
                  <span className="font-mono text-primary font-semibold">Inert (SWUV &amp; LWUV)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICIAL DUAL CERTIFICATION & BLOCKCHAIN PASSPORT PREVIEW */}
      <section className="w-full bg-surface py-14" id="certificate-preview">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-2xl bg-surface-container-lowest p-6 md:p-12 shadow-xl border border-surface-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Official Certificate Replica Box */}
              <div className="lg:col-span-6 p-6 rounded-xl bg-surface-container-low shadow-inner space-y-6 border border-surface-container-high">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-display-md text-headline-sm tracking-wider uppercase font-bold text-primary font-serif">
                      GIA
                    </span>
                    <span className="text-outline-variant font-mono">|</span>
                    <span className="font-display-md text-headline-sm tracking-wider uppercase font-bold text-primary font-serif">
                      SSEF Swiss
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-surface font-label-sm text-[10px] uppercase font-mono tracking-widest text-secondary font-bold">
                    Double-Sealed Folio
                  </span>
                </div>

                {/* Certificate Mock Content */}
                <div className="space-y-3 font-mono text-[12px] text-on-surface leading-relaxed">
                  <div className="flex justify-between py-1 bg-surface-container px-3 rounded">
                    <span className="text-on-surface-variant font-sans">Laboratory Report:</span>
                    <span className="font-semibold text-primary">GIA #{product.giaNumber || "2215894102"}</span>
                  </div>
                  <div className="flex justify-between py-1 bg-surface px-3 rounded">
                    <span className="text-on-surface-variant font-sans">Swiss SSEF Number:</span>
                    <span className="font-semibold text-primary">SSEF #{product.ssefNumber || "118492"}</span>
                  </div>
                  <div className="flex justify-between py-1 bg-surface-container px-3 rounded">
                    <span className="text-on-surface-variant font-sans">Species / Variety:</span>
                    <span className="font-semibold text-primary">Natural Corundum / Sapphire</span>
                  </div>
                  <div className="flex justify-between py-1 bg-surface px-3 rounded">
                    <span className="text-on-surface-variant font-sans">Geographic Origin:</span>
                    <span className="font-semibold text-primary">Sri Lanka (Ceylon)</span>
                  </div>
                  <div className="flex justify-between py-1 bg-surface-container px-3 rounded">
                    <span className="text-on-surface-variant font-sans">Thermal Enhancement:</span>
                    <span className="font-semibold text-secondary">No Indications of Heating (NTE)</span>
                  </div>
                  <div className="flex justify-between py-1 bg-surface px-3 rounded">
                    <span className="text-on-surface-variant font-sans">Color Opinion:</span>
                    <span className="font-semibold text-primary">Royal Blue (SSEF Special Appendix)</span>
                  </div>
                </div>

                {/* Cryptographic Ledger Verification Stamp & QR */}
                <div className="p-4 rounded-lg bg-surface flex items-center justify-between gap-4 border border-surface-container-high">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-primary text-on-primary flex items-center justify-center font-mono text-center text-[10px]">
                      <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block">
                        Immutable Blockchain Ledger
                      </span>
                      <span className="font-mono text-[10px] text-on-surface-variant">
                        Hash: {product.blockchainHash || "0x8f2d...b918"} • Verified on Ethereum
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-[26px]">verified</span>
                </div>
              </div>

              {/* Right: Certificate Details & Download Options */}
              <div className="lg:col-span-6 space-y-6">
                <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary font-bold block">
                  Documented Pedigree
                </span>
                <h3 className="font-headline-lg text-headline-lg text-primary leading-tight font-serif">
                  Dual Sovereign Lab Passports with SSEF Exceptional Stone Appendix
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  This sapphire was submitted directly to both the Gemological Institute of America (GIA) in New York and the Swiss Gemmological Institute (SSEF) in Basel. Both independently certified the stone as unheated natural Ceylon corundum with royal blue color saturation. SSEF awarded this gem an exceptional letter denoting its historical rarity.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => showToast("Downloading 18MB High-Resolution GIA/SSEF Dossier PDF", "info")}
                    className="px-5 py-3 rounded-lg bg-primary hover:bg-surface-container-highest text-on-primary hover:text-on-surface font-label-sm text-label-sm uppercase tracking-widest transition-all flex items-center gap-2 font-semibold shadow-md"
                  >
                    <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                    <span>Download High-Res PDF Dossier (18MB)</span>
                  </button>
                  <a
                    href="https://www.ssef.ch"
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm uppercase tracking-wider transition-colors flex items-center gap-2 font-semibold border border-surface-container-high"
                  >
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    <span>Verify on SSEF Swiss Portal</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCORDION FAQS & TRUST DIRECTIVES */}
      <section className="w-full bg-surface-container-low py-14">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-2 mb-10">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.24em] text-secondary font-bold">
              Client Disclosures &amp; Guarantees
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-serif">
              Trust &amp; Acquisition Protocols
            </h2>
          </div>

          <div className="space-y-3">
            <details className="group rounded-xl bg-surface-container-lowest p-5 shadow-sm transition-all border border-surface-container" open>
              <summary className="flex justify-between items-center font-headline-sm text-[18px] text-primary cursor-pointer list-none select-none font-serif">
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">psychology_alt</span>
                  Ethical Provenance &amp; Ratnapura Alluvial Extraction
                </span>
                <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="pt-4 font-body-md text-body-md text-on-surface-variant space-y-2 leading-relaxed">
                <p>
                  This stone was unmined using traditional pit extraction from the ancient gem gravels (locally called <em>illam</em>) in the Kalu Ganga river basin of Ratnapura. In strict alignment with Sri Lanka’s National Gem and Jewellery Authority (NGJA) sustainable mining regulations, no toxic chemicals or automated dredging was utilized.
                </p>
                <p>
                  Serendib Impérial pays a 15% ethical extraction dividend directly into local lapidary worker cooperatives and secondary educational foundations in Ratnapura.
                </p>
              </div>
            </details>

            <details className="group rounded-xl bg-surface-container-lowest p-5 shadow-sm transition-all border border-surface-container">
              <summary className="flex justify-between items-center font-headline-sm text-[18px] text-primary cursor-pointer list-none select-none font-serif">
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">shield</span>
                  Armored Courier Dispatch &amp; Geneva / NYC Salon Collection
                </span>
                <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="pt-4 font-body-md text-body-md text-on-surface-variant space-y-2 leading-relaxed">
                <p>
                  High jewelry acquisitions over $50,000 USD are routed via Lloyd's of London 100% insured armored transport through Malca-Amit or Brink’s Global Services.
                </p>
                <p>
                  Alternatively, acquisitions can be secured for personal inspection and white-glove collection at our private viewing salons in Mayfair (London), Place Vendôme (Paris), Rue du Rhône (Geneva), or DIFC (Dubai).
                </p>
              </div>
            </details>

            <details className="group rounded-xl bg-surface-container-lowest p-5 shadow-sm transition-all border border-surface-container">
              <summary className="flex justify-between items-center font-headline-sm text-[18px] text-primary cursor-pointer list-none select-none font-serif">
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">published_with_changes</span>
                  Lifetime Authenticity Guarantee &amp; 5-Year Vault Trade-In Policy
                </span>
                <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="pt-4 font-body-md text-body-md text-on-surface-variant space-y-2 leading-relaxed">
                <p>
                  We provide a perpetual 100% full-value cash guarantee regarding the untreated, unheated authenticity and natural Ceylon origin of this sapphire.
                </p>
                <p>
                  Furthermore, under our Connoisseur Vault Liquidity program, Serendib Impérial offers an optional buyback or trade-in credit equal to 90% of the gemstone purchase price after a minimum holding period of two years.
                </p>
              </div>
            </details>

            <details className="group rounded-xl bg-surface-container-lowest p-5 shadow-sm transition-all border border-surface-container">
              <summary className="flex justify-between items-center font-headline-sm text-[18px] text-primary cursor-pointer list-none select-none font-serif">
                <span className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">handyman</span>
                  Atelier Ring Setting &amp; Custom Solitaire Mounting Options
                </span>
                <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="pt-4 font-body-md text-body-md text-on-surface-variant space-y-2 leading-relaxed">
                <p>
                  Prefer this sapphire as a loose gemstone or mounted into a bespoke necklace, tiara, or toi-et-moi configuration? Our Geneva atelier team accommodates private design commissions.
                </p>
                <p>
                  The mounting allowance will be applied toward any custom concept designed in collaboration with our Senior High Jewelry Creative Director.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CURATED HIGH-JEWELRY COMPANIONS */}
      <section className="w-full bg-surface py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.24em] text-secondary font-bold block mb-1">
                Harmonious Suites
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary font-serif">
                Companion Corundum &amp; Royal Gems
              </h2>
            </div>
            <Link
              to="/gemstones"
              className="hidden sm:inline-flex items-center gap-1 font-label-sm text-label-sm uppercase tracking-wider text-secondary hover:text-primary transition-colors font-bold"
            >
              View Complete Vault Register
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {JEWELLERY.filter(j => j.id !== product.id).slice(0, 3).map(piece => (
              <div
                key={piece.id}
                className="rounded-xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between border border-surface-container"
              >
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-low mb-4 relative">
                  <img
                    src={piece.image}
                    alt={piece.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-surface/90 backdrop-blur-md font-label-sm text-[9px] uppercase tracking-widest text-primary font-semibold">
                    {piece.collection}
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest font-mono">
                    {piece.origin} • {piece.certification}
                  </span>
                  <h4 className="font-headline-sm text-[17px] text-primary font-semibold mt-1 font-serif">
                    {piece.title}
                  </h4>
                  <p className="font-body-sm text-[13px] text-on-surface-variant mt-0.5 line-clamp-2">
                    {piece.description}
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-surface-container-low mt-3">
                  <span className="font-headline-sm text-[16px] font-bold text-primary font-mono">
                    {piece.isPOA ? "Price on Application" : formatPrice(piece.price)}
                  </span>
                  <Link
                    to={`/jewellery/${piece.id}`}
                    className="font-label-sm text-label-sm uppercase tracking-wider text-secondary hover:text-primary flex items-center gap-1 font-bold"
                  >
                    Inspect <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ring Sizer Matrix Modal */}
      <RingSizerModal
        isOpen={isSizerOpen}
        onClose={() => setIsSizerOpen(false)}
        selectedSize={selectedSize}
        onSelectSize={(size) => {
          setSelectedSize(size);
          setIsSizerOpen(false);
          showToast(`Ring size ${size} selected`, "info");
        }}
      />
    </div>
  );
}
