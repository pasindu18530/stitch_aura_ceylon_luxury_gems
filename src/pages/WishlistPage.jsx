import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';

export const WishlistPage = () => {
  const { wishlist: wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart, setIsBagOpen } = useCart();
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();

  const removeFromWishlist = (item) => toggleWishlist(item);
  const clearWishlist = () => wishlistItems.forEach(item => toggleWishlist(item));

  const handleMoveToBag = (item) => {
    addToCart(item, 1);
    toggleWishlist(item);
    setIsBagOpen(true);
    showToast(`${item.title} moved to Velvet Acquisition Bag.`, 'success');
  };

  const handleShareFolio = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Encrypted Private Folio link copied to clipboard.', 'info');
    }
  };

  return (
    <div className="w-full pt-29 bg-surface font-body-md text-on-surface antialiased min-h-screen">
      {/* Header */}
      <section className="w-full bg-surface-container-low py-space-xl px-6 lg:px-12 border-b border-surface-container-highest/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="space-y-1">
            <div className="flex items-center gap-space-xs text-secondary">
              <span className="material-symbols-outlined text-[16px]">bookmark</span>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.24em]">
                Private Portfolio • Saved Vault Items
              </span>
            </div>
            <h1 className="font-display-md text-headline-lg lg:text-display-md text-primary">
              Private Client Wishlist
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Your confidential archive of reserved corundum, rare mineral specimens, and bespoke high jewellery commissions.
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <div className="flex items-center gap-space-sm">
              <button
                onClick={handleShareFolio}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-lowest border border-surface-container-highest font-label-sm text-label-sm uppercase tracking-wider text-on-surface hover:bg-surface-container transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
                <span>Share Folio</span>
              </button>
              <button
                onClick={clearWishlist}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-low border border-surface-container-highest font-label-sm text-label-sm uppercase tracking-wider text-error hover:bg-error-container/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">delete</span>
                <span>Clear Folio</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="w-full px-6 lg:px-12 py-space-xl">
        <div className="max-w-7xl mx-auto">
          {wishlistItems.length === 0 ? (
            <div className="py-space-xl text-center space-y-space-md bg-surface-container-lowest rounded-xl border border-surface-container-highest/60 p-space-xl max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[32px]">favorite_border</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-headline-sm text-headline-sm text-primary">Your Private Folio is Empty</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Explore our verified natural Ceylon corundum vault or haute joaillerie collections and mark items with the heart symbol to archive them here.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-space-xs">
                <a
                  href="/gemstones"
                  className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-highest hover:text-on-surface transition-colors"
                >
                  Explore Gemstones
                </a>
                <a
                  href="/high-jewellery"
                  className="px-5 py-2.5 rounded-lg border border-surface-container-highest text-on-surface font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container-low transition-colors"
                >
                  High Jewellery Suites
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {wishlistItems.map(item => (
                <div
                  key={item.id}
                  className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-surface-container-highest/60 flex flex-col justify-between transition-all"
                >
                  <div className="relative aspect-video w-full bg-surface-container-low overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFromWishlist(item)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-error hover:bg-error-container hover:text-on-error-container transition-colors shadow-sm"
                      title="Remove from Folio"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                    {item.certs && (
                      <span className="absolute bottom-2 left-2 bg-surface-container-lowest/90 px-2 py-0.5 rounded font-label-sm text-[9px] uppercase font-semibold text-on-surface">
                        {item.certs}
                      </span>
                    )}
                  </div>
                  <div className="p-space-md space-y-space-md">
                    <div className="space-y-1">
                      <span className="font-label-sm text-[10px] uppercase font-bold text-secondary">
                        {item.category || item.origin || 'Ceylon Natural Specimen'}
                      </span>
                      <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        {item.desc || item.gemstone || 'Accompanied by dual-sealed Swiss and GIA certifications.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-space-xs border-t border-surface-container-highest/60">
                      <span className="font-headline-sm text-headline-sm text-primary font-bold font-mono">
                        {formatPrice(item.price)}
                      </span>
                      <button
                        onClick={() => handleMoveToBag(item)}
                        className="px-3.5 py-2 rounded-lg bg-primary hover:bg-surface-container-highest hover:text-on-surface text-on-primary font-label-sm text-label-sm uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Acquire Specimen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
