import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export default function JewelleryCard({ piece, isHero = false }) {
  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isFavorited = isInWishlist(piece.id);

  const handleAcquire = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (piece.isPOA) {
      window.location.href = `/consultation?interest=${encodeURIComponent(piece.title)}`;
      return;
    }
    addToCart({
      id: piece.id,
      title: piece.title,
      name: piece.name,
      price: piece.price,
      image: piece.image,
      sku: piece.sku,
      metal: piece.metal
    });
  };

  if (isHero) {
    return (
      <div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-8 lg:p-12 shadow-sm space-y-8 border border-surface-container">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              {piece.edition}
            </span>
            <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-[10px] uppercase font-bold">
              {piece.collection}
            </span>
          </div>
          <h3 className="font-display-md text-display-md text-primary font-normal leading-tight font-serif">
            {piece.title}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            {piece.description}
          </p>
        </div>

        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-surface-container group">
          <img
            src={piece.image}
            alt={piece.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <button
            onClick={() => toggleWishlist(piece)}
            className={`absolute top-4 right-4 bg-surface/90 backdrop-blur-md p-2 rounded-full shadow-md transition-colors ${
              isFavorited ? 'text-error' : 'text-on-surface-variant hover:text-error'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">favorite</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-surface-container">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">
              Private Commission Valuation
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold font-mono">
              {piece.isPOA ? "Price on Application" : formatPrice(piece.price)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/custom-atelier"
              className="px-5 py-3 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm uppercase tracking-wider font-semibold transition-colors"
            >
              Configure with Your Stone
            </Link>
            <Link
              to="/consultation"
              className="px-5 py-3 rounded-lg bg-primary hover:bg-secondary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold transition-colors"
            >
              Reserve Viewing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm space-y-6 border border-surface-container group">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
            {piece.edition}
          </span>
          <span className="font-label-sm text-[10px] uppercase text-on-surface-variant">
            {piece.metal}
          </span>
        </div>
        <h4 className="font-headline-lg text-[22px] text-primary font-medium font-serif leading-snug">
          {piece.title}
        </h4>
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
          {piece.description}
        </p>
      </div>

      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-surface-container">
        <img
          src={piece.image}
          alt={piece.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <button
          onClick={() => toggleWishlist(piece)}
          className={`absolute top-3 right-3 bg-surface/90 backdrop-blur-md p-1.5 rounded-full shadow-md transition-colors ${
            isFavorited ? 'text-error' : 'text-on-surface-variant hover:text-error'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">favorite</span>
        </button>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-surface-container-low">
        <span className="font-headline-sm text-[19px] text-primary font-bold font-mono">
          {piece.isPOA ? "Price on Application" : formatPrice(piece.price)}
        </span>
        <div className="flex items-center gap-2">
          <Link
            to={`/jewellery/${piece.id}`}
            className="text-secondary hover:text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold inline-flex items-center gap-1"
          >
            <span>View Details</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
