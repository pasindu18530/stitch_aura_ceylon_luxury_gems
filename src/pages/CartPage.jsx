import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';

export const CartPage = () => {
  const { cart: cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const subtotal = cartTotal;
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ROYAL1918') {
      setDiscountPercent(5);
      showToast('VIP Connoisseur Credential applied: 5% reduction.', 'success');
    } else {
      showToast('Unrecognized VIP credential code.', 'error');
    }
  };

  return (
    <div className="w-full pt-29 bg-surface font-body-md text-on-surface antialiased min-h-screen">
      {/* Header */}
      <section className="w-full bg-surface-container-low py-space-xl px-6 lg:px-12 border-b border-surface-container-highest/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="space-y-1">
            <div className="flex items-center gap-space-xs text-secondary">
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.24em]">
                Secure Acquisition Portfolio • Velvet Bag
              </span>
            </div>
            <h1 className="font-display-md text-headline-lg lg:text-display-md text-primary">
              Velvet Acquisition Bag
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Review your allocated high jewellery specimens and unheated Ceylon corundum before armored dispatch.
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-on-surface-variant hover:text-error font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
              <span>Empty Bag</span>
            </button>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full px-6 lg:px-12 py-space-xl">
        <div className="max-w-7xl mx-auto">
          {cartItems.length === 0 ? (
            <div className="py-space-xl text-center space-y-space-md bg-surface-container-lowest rounded-xl border border-surface-container-highest/60 p-space-xl max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm text-headline-sm text-primary">Your Acquisition Bag is Empty</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Select a certified unheated gemstone from our vault or explore our Haute Joaillerie suites to initiate an acquisition.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-space-xs">
                <a
                  href="/gemstones"
                  className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-highest hover:text-on-surface transition-colors"
                >
                  Browse Ceylon Gemstones
                </a>
                <a
                  href="/custom-atelier"
                  className="px-5 py-2.5 rounded-lg border border-surface-container-highest text-on-surface font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-low transition-colors"
                >
                  Bespoke Atelier
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-xl items-start">
              {/* Items List (2 Cols) */}
              <div className="lg:col-span-2 space-y-space-md">
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    className="p-space-md bg-surface-container-lowest rounded-xl border border-surface-container-highest/60 shadow-sm flex flex-col sm:flex-row gap-space-md items-start sm:items-center justify-between"
                  >
                    <div className="flex items-center gap-space-md">
                      <div className="w-20 h-20 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="font-label-sm text-[10px] uppercase font-bold text-secondary">
                          {item.category || item.sku || 'Vault Specimen'}
                        </span>
                        <h3 className="font-headline-sm text-[18px] font-semibold text-on-surface">
                          {item.title}
                        </h3>
                        {item.options && (
                          <div className="text-body-sm text-[12px] text-on-surface-variant space-x-2">
                            {item.options.metal && <span>Metal: <strong>{item.options.metal}</strong></span>}
                            {item.options.size && <span>• Size: <strong>{item.options.size}</strong></span>}
                            {item.options.engraving && <span>• Inscription: <em>"{item.options.engraving}"</em></span>}
                          </div>
                        )}
                        <p className="font-mono font-bold text-primary text-base">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-space-md w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-surface-container-highest">
                      <div className="flex items-center gap-2 bg-surface-container-low px-2 py-1 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.cartKey, -1)}
                          className="w-6 h-6 flex items-center justify-center text-on-surface hover:text-primary"
                        >
                          -
                        </button>
                        <span className="font-mono text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartKey, 1)}
                          className="w-6 h-6 flex items-center justify-center text-on-surface hover:text-primary"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="text-on-surface-variant hover:text-error transition-colors p-1"
                        title="Remove Item"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}

                {/* VIP Perks Banner */}
                <div className="p-space-md rounded-xl bg-surface-container-low border border-surface-container-highest/60 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px] text-secondary">verified_user</span>
                  <div className="space-y-0.5">
                    <p className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                      Lloyd's of London Underwritten Transit
                    </p>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      Full acquisition sum is insured until physical hand-to-hand signature at your designated private address or bank vault.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary (1 Col) */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container-highest/60 shadow-md space-y-space-md">
                <div className="flex items-center justify-between border-b border-surface-container-highest pb-space-sm">
                  <h3 className="font-label-lg text-label-lg uppercase tracking-wider text-primary font-bold">
                    Portfolio Ledger
                  </h3>
                  <span className="font-label-sm text-[10px] uppercase px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant">
                    {cartItems.length} Allocations
                  </span>
                </div>

                <div className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Specimen Subtotal:</span>
                    <span className="font-mono font-medium text-on-surface">{formatPrice(subtotal)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-secondary font-medium">
                      <span>VIP Connoisseur Reduction (5%):</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Brink's Armored Courier:</span>
                    <span className="font-label-sm text-label-sm uppercase font-bold text-secondary">Complimentary</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Swiss Dual Lab Sealed Passports:</span>
                    <span className="font-label-sm text-label-sm uppercase font-bold text-secondary">Included</span>
                  </div>
                </div>

                {/* VIP Code Form */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="VIP Credential Code"
                      className="w-full px-3 py-2 bg-surface-container-low rounded-lg font-mono text-xs uppercase focus:outline-none border border-surface-container-highest"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-surface-container-highest hover:bg-primary hover:text-on-primary rounded-lg font-label-sm text-[10px] uppercase font-bold tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  <span className="font-label-sm text-[9px] text-on-surface-variant mt-1 block">
                    Use VIP code <strong>ROYAL1918</strong> for connoisseur privileges.
                  </span>
                </form>

                <div className="border-t border-surface-container-highest pt-space-sm space-y-1">
                  <div className="flex justify-between items-end">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-bold">
                      Total Acquisition:
                    </span>
                    <span className="font-headline-sm text-headline-sm font-bold text-primary font-mono">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                  <p className="font-label-sm text-[10px] text-on-surface-variant text-right">
                    Taxes calculated at dispatch jurisdiction.
                  </p>
                </div>

                <a
                  href="/checkout"
                  className="w-full py-3.5 rounded-lg bg-primary hover:bg-surface-container-highest hover:text-on-surface text-on-primary font-label-md text-label-md uppercase tracking-widest text-center block shadow-lg transition-all"
                >
                  Proceed to Armored Escrow Checkout
                </a>

                <div className="text-center pt-2">
                  <a
                    href="/gemstones"
                    className="font-label-sm text-label-sm uppercase text-secondary hover:underline inline-flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                    <span>Continue Vault Browsing</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
