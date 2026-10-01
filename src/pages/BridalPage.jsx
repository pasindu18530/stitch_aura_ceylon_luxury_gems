import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import RingSizerModal from '../components/common/RingSizerModal';

const BRIDAL_ITEMS = [
  {
    id: 'bridal-1',
    title: 'The Sovereign Oval Royal Blue Sapphire Solitaire',
    category: 'Engagement Ring',
    metal: '950 Platinum',
    gemstone: '4.80ct Unheated Royal Blue Sapphire',
    accent: '0.60ct F/VVS Micropavé Halo',
    price: 36500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzGZ5wCgIM-IiUOiPEnraJGHbocD8wU3BuZW7XPdnN5FvVSMHoI3rx2zhLCPitioHdxyHD5pypWYse8SB3bPGMucyXkg-mKDoHiP0RAWnFovKjlQ5H5Rk3DsiSUPxMUOkNWBP47gA6LjTx3ZSq98spW5i2vwof3P0N_Hw1Og4LDfS20x4lkrveRN41vChyyNdTQaNmBlEKt84HO8C2fuKahqVeinOBHktCxPhTCrPL_PlhDyWKM7wF',
    certs: 'SSEF & GIA Dual Seal'
  },
  {
    id: 'bridal-2',
    title: 'The Lotus Dawn Padparadscha Cathedral Solitaire',
    category: 'Engagement Ring',
    metal: '18K Ceylon Rose Gold & Platinum',
    gemstone: '3.65ct Natural Sunrise Padparadscha',
    accent: 'Tapered Baguette Shoulders (0.40ct)',
    price: 44000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzOMvYpvp-MeyOE2sHYar_x1cOeSExBNG1-USnwoC8Pw0lhxQMXcThoGXhOjvLCwAY6Xfph30RBgVEfOXJzy_HBWBhNqlKFEOYX0um1tKV7ImOHTlm50L-fFBH0RYEQPrfWvahiAVFzGuoKnvvosf9uJlHia96TooQzEzdH_wL2obaOgMVao80NDERMvxBYqEFwyK1_4gfhCHUC7BKRdJ1n_LIqY7je04msYCVJrOmaw9nbDsXlOUk',
    certs: 'Gübelin Gemmological Report'
  },
  {
    id: 'bridal-3',
    title: 'Imperial Ceylon Cornflower Cushion Three-Stone',
    category: 'Three-Stone Ring',
    metal: '950 Platinum',
    gemstone: '5.20ct Vivid Cornflower Cushion',
    accent: 'Trapezoid Diamond Side Stones (0.85ct)',
    price: 39500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOdU1IbbYmBIQ0uAHreq4XpYBwTbiX3X9Q4V9tmpcnBdDXqqwNfz0pEVhbJ-lK8tpTCvisc0P-b0q4bVNhGWD9raDWwZ9ZGZH87T8_vYbcHTBpN7mwjrcZP_YI-MBeSvJXYAZGCbFqf5nCMevToCFpxaLohihP__AqUOpqBBA714NOukIKIRAP-jxm7YEQZ0-joUV4sLaMqLS3eGZudVAFm2u_XQu2leCMe4R9YRyXEf87A9NeR_bR',
    certs: 'GIA Sealed Passport'
  },
  {
    id: 'bridal-4',
    title: 'The Queen of Serendib Pigeon Blood Ruby Solitaire',
    category: 'Collector Bridal',
    metal: '18K Noble Yellow Gold',
    gemstone: '4.15ct Untreated Pigeon Blood Ceylon Ruby',
    accent: 'Half-Moon Diamond Accents (0.50ct)',
    price: 52000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-gmqHHeCKCL3KA8HuSHLJH92ics3DaDksxzvEtFkC7_wUXTQby2TUAwKjsRke0RwjmIGLhSwseCjXCrPrXCxfnEXweuNbntuXHyZ-omb59XvNT_w0Cl0JkE2z5ZGJplnSGgr9c-i96-8_irgBJlxWT5449Ny7WuU6tpdDckhEWBAXTZLbO5nwdZd62tlD6tSUVxQDHO1QtDdUCntgKnb2XDqDCw4sqx3D3WSU22aSjV0cwEqyv7_W',
    certs: 'SSEF Swiss Special Letter'
  }
];

export const BridalPage = () => {
  const { formatPrice } = useCurrency();
  const { addToCart, setIsBagOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isSizerOpen, setIsSizerOpen] = useState(false);

  return (
    <div className="w-full pt-29 bg-surface font-body-md text-on-surface antialiased">
      {/* Header */}
      <section className="relative w-full bg-surface-container-low py-space-xl px-6 lg:px-12 border-b border-surface-container-highest/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs text-secondary">
              <span className="material-symbols-outlined text-[16px]">favorite</span>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.24em]">
                Bridal &amp; Solitaires • Forever Provenance
              </span>
            </div>
            <h1 className="font-display-lg text-headline-lg lg:text-display-lg text-primary leading-tight">
              Ceylon Sapphire Engagement Rings
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Since Princess Diana chose a Ceylon royal sapphire, unheated Sri Lankan corundum has symbolized everlasting loyalty, deep nobility, and rarity far surpassing standard diamonds.
            </p>
          </div>
          <button
            onClick={() => setIsSizerOpen(true)}
            className="flex items-center gap-2 px-space-md py-3 rounded-lg bg-surface-container-lowest text-primary border border-surface-container-highest/80 shadow-sm hover:bg-surface-container transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">straighten</span>
            <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
              Complimentary Ring Sizer Kit
            </span>
          </button>
        </div>
      </section>

      {/* Grid */}
      <section className="w-full px-6 lg:px-12 py-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-space-xl">
          {BRIDAL_ITEMS.map(item => (
            <div
              key={item.id}
              className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md border border-surface-container-highest/60 flex flex-col justify-between group hover:shadow-xl transition-all"
            >
              <div className="relative aspect-square w-full bg-surface-container-low overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                />
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md text-on-surface hover:text-secondary shadow-sm"
                >
                  <span className={`material-symbols-outlined text-[20px] ${isInWishlist(item.id) ? 'text-secondary fill-1' : ''}`}>
                    favorite
                  </span>
                </button>
                <div className="absolute bottom-4 left-4 bg-primary text-on-primary font-label-sm text-[9px] uppercase px-2.5 py-1 rounded font-bold tracking-wider">
                  {item.certs}
                </div>
              </div>
              <div className="p-space-lg space-y-space-md">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-secondary">{item.category}</span>
                    <span className="font-label-sm text-label-sm uppercase text-on-surface-variant">{item.metal}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">{item.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {item.gemstone} with {item.accent}. Hand-sculpted shank with mirror polish.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-space-xs border-t border-surface-container-highest/60">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold font-mono">
                    {formatPrice(item.price)}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href="/custom-atelier"
                      className="px-3.5 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm uppercase tracking-wider transition-colors"
                    >
                      Customize
                    </a>
                    <button
                      onClick={() => {
                        addToCart(item, 1);
                        setIsBagOpen(true);
                      }}
                      className="px-4 py-2 rounded-lg bg-primary hover:bg-surface-container-highest hover:text-on-surface text-on-primary font-label-sm text-label-sm uppercase tracking-wider transition-colors shadow-sm"
                    >
                      Acquire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <RingSizerModal isOpen={isSizerOpen} onClose={() => setIsSizerOpen(false)} />
    </div>
  );
};
