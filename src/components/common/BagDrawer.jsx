import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function BagDrawer() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isBagOpen, setIsBagOpen } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  if (!isBagOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm flex justify-end">
      <div
        className="w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col justify-between border-l border-surface-container animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[22px]">shopping_bag</span>
            <h3 className="font-headline-sm text-[18px] text-primary font-serif font-bold uppercase tracking-wider">
              Velvet Acquisition Bag
            </h3>
          </div>
          <button
            onClick={() => setIsBagOpen(false)}
            className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Bag Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <span className="material-symbols-outlined text-5xl text-outline-variant">shopping_bag</span>
              <p className="font-body-md text-on-surface-variant">
                Your Velvet Acquisition Bag is currently empty.
              </p>
              <button
                onClick={() => {
                  setIsBagOpen(false);
                  navigate('/gemstones');
                }}
                className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold"
              >
                Browse Gemstone Vault
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartKey}
                className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex gap-4 items-start"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover bg-surface-container shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-headline-sm text-[15px] font-semibold text-primary truncate">
                      {item.title || item.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.cartKey)}
                      className="text-on-surface-variant hover:text-error"
                      title="Remove piece"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>

                  <p className="font-label-sm text-[11px] text-secondary font-mono">
                    {item.selectedMetal || '950 Platinum'} • Size: {item.selectedSize || '6.0'}
                  </p>
                  {item.engraving && (
                    <p className="font-label-sm text-[10px] text-on-surface-variant truncate font-mono">
                      Engraved: "{item.engraving}"
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 bg-surface-container rounded px-2 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.cartKey, -1)}
                        className="text-on-surface hover:text-primary font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="font-mono text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartKey, 1)}
                        className="text-on-surface hover:text-primary font-bold text-sm"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-mono text-[14px] font-bold text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-surface-container bg-surface-container-low space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-body-sm font-body-sm text-on-surface-variant">
                <span>Armored Brink's Escrow:</span>
                <span className="text-secondary font-bold uppercase font-label-sm text-[10px]">
                  Complimentary
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                  Total Acquisition Value:
                </span>
                <span className="font-headline-sm text-headline-sm font-bold text-primary font-mono">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/cart"
                onClick={() => setIsBagOpen(false)}
                className="py-3 rounded-lg bg-surface-container-highest hover:bg-surface-container text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold text-center transition-colors"
              >
                Review Folio
              </Link>
              <Link
                to="/checkout"
                onClick={() => setIsBagOpen(false)}
                className="py-3 rounded-lg bg-primary hover:bg-secondary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold text-center transition-colors flex items-center justify-center gap-1 shadow-md"
              >
                <span>Checkout</span>
                <span className="material-symbols-outlined text-[15px]">lock</span>
              </Link>
            </div>

            <p className="font-label-sm text-[10px] text-center text-on-surface-variant">
              Guaranteed 100% unheated Ceylon provenance with GIA/SSEF passports.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
