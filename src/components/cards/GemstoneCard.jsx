import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';

export default function GemstoneCard({ gem, showCompareCheckbox = true }) {
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useCompare();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [isRotating, setIsRotating] = useState(false);
  const [rotationDeg, setRotationDeg] = useState(0);

  const isFavorited = isInWishlist(gem.id);
  const isCheckedForCompare = isCompared(gem.id);

  const handleLoupeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRotating(true);
    setRotationDeg(prev => (prev + 90) % 360);
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleAcquire = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: gem.id,
      title: gem.title || gem.name,
      name: gem.name,
      price: gem.price,
      image: gem.image,
      sku: gem.sku,
      carat: gem.carat,
      cut: gem.cut,
      metal: '950 Platinum Mounting'
    });
  };

  return (
    <div className="gem-card group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-surface-container">
      {/* Specimen Visual Area */}
      <div className="relative aspect-square w-full bg-surface-container overflow-hidden">
        <img
          src={gem.image}
          alt={gem.name}
          style={{ transform: `scale(1.05) rotate(${rotationDeg}deg)` }}
          className={`w-full h-full object-cover transition-transform duration-500 ${isRotating ? 'transition-transform duration-500' : 'group-hover:scale-110'}`}
        />

        {/* Top-Left Thermal / Specimen Badge */}
        <span className="absolute top-3 left-3 px-2 py-1 rounded bg-tertiary-container text-on-tertiary font-label-sm text-[9px] uppercase font-bold tracking-wider shadow-sm">
          {gem.thermalStatus === "unheated" ? "Unheated • Natural" : gem.thermal}
        </span>

        {/* Top-Right Loupe & Quick Action Icons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          <button
            onClick={handleLoupeClick}
            className="px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-[10px] uppercase font-semibold flex items-center gap-1 shadow-sm hover:bg-surface hover:text-primary transition-all"
            title="Inspect 360° Loupe"
          >
            <span className={`material-symbols-outlined text-[14px] text-secondary ${isRotating ? 'animate-spin' : ''}`}>
              360
            </span>
            <span className="hidden sm:inline">360°</span>
          </button>

          {showCompareCheckbox && (
            <label
              className="cursor-pointer bg-surface/90 backdrop-blur-md p-1.5 rounded-full hover:bg-surface text-primary shadow-sm flex items-center justify-center transition-colors"
              title="Add to comparison tray"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={isCheckedForCompare}
                onChange={() => toggleCompare(gem)}
                className="w-3.5 h-3.5 accent-primary cursor-pointer"
              />
            </label>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(gem);
            }}
            className={`bg-surface/90 backdrop-blur-md p-1.5 rounded-full hover:bg-surface shadow-sm flex items-center justify-center transition-colors ${
              isFavorited ? 'text-error' : 'text-on-surface-variant hover:text-error'
            }`}
            title="Save to private vault wishlist"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isFavorited ? 'favorite' : 'favorite'}
            </span>
          </button>
        </div>

        {/* Mine Origin Tag Overlay */}
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-sm text-[10px] tracking-wider uppercase flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span>{gem.mine || gem.origin}</span>
        </div>
      </div>

      {/* Gemstone Data & Action Row */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-secondary font-label-sm text-label-sm tracking-wider uppercase font-semibold">
            <span>SKU: {gem.sku}</span>
            <span className="text-on-surface-variant font-normal">{gem.cut} ({gem.carat} ct)</span>
          </div>

          <Link to={`/gemstones/${gem.id}`}>
            <h3 className="font-headline-sm text-[18px] leading-snug font-medium text-primary line-clamp-2 hover:text-secondary transition-colors">
              {gem.title || gem.name}
            </h3>
          </Link>

          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
            {gem.color} • {gem.clarity} • {gem.thermal}
          </p>
        </div>

        <div className="pt-2 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 font-label-sm text-[10px] uppercase px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
              <span className="material-symbols-outlined text-[12px] text-secondary">verified</span>
              {gem.certification}
            </span>
            <div className="text-right">
              <span className="font-headline-sm text-headline-sm text-primary font-bold font-mono">
                {formatPrice(gem.price)}
              </span>
              {gem.pricePerCarat && (
                <span className="block font-label-sm text-[9px] text-on-surface-variant font-mono">
                  ~{formatPrice(gem.pricePerCarat)}/ct
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/gemstones/${gem.id}`}
              className="w-full py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm uppercase tracking-wider transition-colors text-center font-semibold flex items-center justify-center"
            >
              Inspect Dossier
            </Link>
            <button
              onClick={handleAcquire}
              className="w-full py-2.5 rounded-lg bg-primary hover:bg-secondary text-on-primary font-label-sm text-label-sm uppercase tracking-wider transition-colors text-center font-semibold flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Acquire • Set</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
