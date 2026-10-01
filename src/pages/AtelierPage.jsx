import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const SILHOUETTES = [
  { id: 'halo', name: 'The Sovereign Halo', type: 'Solitaire Ring Frame', price: 3800, desc: 'Pave halo with tapered micropave band designed to amplify optical scintillation.' },
  { id: 'solitaire', name: 'Royal Solitaire Four-Prong', type: 'Pure Cathedral Frame', price: 2900, desc: 'Architectural cathedral shoulders lifting the crown towards direct ambient illumination.' },
  { id: 'lotus', name: 'Lotus Trellis Gallery', type: 'Sri Lankan Heritage Mount', price: 4400, desc: 'Petal-inspired open filigree pavilion allowing maximum light return to the culet.' },
  { id: 'art-deco', name: 'Ceylon Art Deco Step', type: 'Geometric Stepped Baguette', price: 4900, desc: 'Custom cut step baguettes flanking the primary specimen in 1920s high jewellery proportion.' }
];

const METALS = [
  { id: 'platinum', name: '950 Platinum', finish: 'Cold-Forged Mirror', priceMultiplier: 1.0, color: '#e5e4e2', badge: 'Apex Density' },
  { id: 'yellow-gold', name: '18K Royal Yellow Gold', finish: 'Satin & Polished', priceMultiplier: 0.95, color: '#e6ca65', badge: '750 Pure Gold' },
  { id: 'rose-gold', name: '18K Ceylon Rose Gold', finish: 'Warm Vintage Glow', priceMultiplier: 0.95, color: '#e0a98b', badge: '750 Pure Gold' },
  { id: 'white-gold', name: '18K Noble White Gold', finish: 'Rhodium Mirror Bath', priceMultiplier: 0.92, color: '#dcdcdc', badge: '750 Pure Gold' }
];

const GEMS = [
  {
    id: 'a',
    category: 'blue',
    title: '5.10ct Oval Royal Blue Ceylon Sapphire',
    shortName: '5.10ct Royal Blue Oval',
    mine: 'Ratnapura Mine',
    certs: 'SSEF & GIA',
    carats: 5.10,
    price: 28500,
    desc: 'Pure royal blue corundum with sublime velvety transparency and high brilliance. Mined from the historic Kalu Ganga riverbeds.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4cpUqf3KsOAAcYPrEeiT4xf090WcJQ2BIMjLCjxOES5UDzpA0qep_0SjMfMopUorJJV8jqwB-L01ZQrKsZYdov2jaww83jEndduUufgeIkK1I7YAx_Zn6nwyVv4Ndr0I8wByk7auehbCJxtwiFbzzHVznQ1_YFWaPHIs9EqvlLHOKNaj0KeeqoVSP1XDiD7zGwKehwUo7MpcA1XRT_etEky-KfRz2E56LL5URezknRDRwKBfpIBgI',
    renderImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzGZ5wCgIM-IiUOiPEnraJGHbocD8wU3BuZW7XPdnN5FvVSMHoI3rx2zhLCPitioHdxyHD5pypWYse8SB3bPGMucyXkg-mKDoHiP0RAWnFovKjlQ5H5Rk3DsiSUPxMUOkNWBP47gA6LjTx3ZSq98spW5i2vwof3P0N_Hw1Og4LDfS20x4lkrveRN41vChyyNdTQaNmBlEKt84HO8C2fuKahqVeinOBHktCxPhTCrPL_PlhDyWKM7wF'
  },
  {
    id: 'b',
    category: 'blue',
    title: '4.25ct Cushion Cornflower Ceylon Sapphire',
    shortName: '4.25ct Cushion Cornflower',
    mine: 'Elahera Valley',
    certs: 'Gübelin Certified',
    carats: 4.25,
    price: 21000,
    desc: 'Delicate luminous pastel blue with flawless symmetry. Exceptional light dispersion and pristine clarity under 10x magnification.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOdU1IbbYmBIQ0uAHreq4XpYBwTbiX3X9Q4V9tmpcnBdDXqqwNfz0pEVhbJ-lK8tpTCvisc0P-b0q4bVNhGWD9raDWwZ9ZGZH87T8_vYbcHTBpN7mwjrcZP_YI-MBeSvJXYAZGCbFqf5nCMevToCFpxaLohihP__AqUOpqBBA714NOukIKIRAP-jxm7YEQZ0-joUV4sLaMqLS3eGZudVAFm2u_XQu2leCMe4R9YRyXEf87A9NeR_bR',
    renderImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzGZ5wCgIM-IiUOiPEnraJGHbocD8wU3BuZW7XPdnN5FvVSMHoI3rx2zhLCPitioHdxyHD5pypWYse8SB3bPGMucyXkg-mKDoHiP0RAWnFovKjlQ5H5Rk3DsiSUPxMUOkNWBP47gA6LjTx3ZSq98spW5i2vwof3P0N_Hw1Og4LDfS20x4lkrveRN41vChyyNdTQaNmBlEKt84HO8C2fuKahqVeinOBHktCxPhTCrPL_PlhDyWKM7wF'
  },
  {
    id: 'c',
    category: 'pad',
    title: '3.80ct Oval Sunrise Padparadscha Sapphire',
    shortName: '3.80ct Sunrise Padparadscha',
    mine: 'Ratnapura Mine',
    certs: 'SSEF Royal Letter',
    carats: 3.80,
    price: 34000,
    desc: "The apex collector's prize: a delicate fusion of lotus blossom pink and Ceylon twilight orange. Natural and unenhanced.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzOMvYpvp-MeyOE2sHYar_x1cOeSExBNG1-USnwoC8Pw0lhxQMXcThoGXhOjvLCwAY6Xfph30RBgVEfOXJzy_HBWBhNqlKFEOYX0um1tKV7ImOHTlm50L-fFBH0RYEQPrfWvahiAVFzGuoKnvvosf9uJlHia96TooQzEzdH_wL2obaOgMVao80NDERMvxBYqEFwyK1_4gfhCHUC7BKRdJ1n_LIqY7je04msYCVJrOmaw9nbDsXlOUk',
    renderImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzGZ5wCgIM-IiUOiPEnraJGHbocD8wU3BuZW7XPdnN5FvVSMHoI3rx2zhLCPitioHdxyHD5pypWYse8SB3bPGMucyXkg-mKDoHiP0RAWnFovKjlQ5H5Rk3DsiSUPxMUOkNWBP47gA6LjTx3ZSq98spW5i2vwof3P0N_Hw1Og4LDfS20x4lkrveRN41vChyyNdTQaNmBlEKt84HO8C2fuKahqVeinOBHktCxPhTCrPL_PlhDyWKM7wF'
  },
  {
    id: 'd',
    category: 'ruby',
    title: '4.50ct Emerald Cut Natural Ceylon Ruby',
    shortName: '4.50ct Ceylon Ruby',
    mine: 'Nivithigala Deposit',
    certs: 'GIA & SSEF Dual Seal',
    carats: 4.50,
    price: 38000,
    desc: 'Unheated Sri Lankan ruby with vivid fiery red saturation and step-cut pavilion brilliance. Historic estate provenance.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-gmqHHeCKCL3KA8HuSHLJH92ics3DaDksxzvEtFkC7_wUXTQby2TUAwKjsRke0RwjmIGLhSwseCjXCrPrXCxfnEXweuNbntuXHyZ-omb59XvNT_w0Cl0JkE2z5ZGJplnSGgr9c-i96-8_irgBJlxWT5449Ny7WuU6tpdDckhEWBAXTZLbO5nwdZd62tlD6tSUVxQDHO1QtDdUCntgKnb2XDqDCw4sqx3D3WSU22aSjV0cwEqyv7_W',
    renderImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzGZ5wCgIM-IiUOiPEnraJGHbocD8wU3BuZW7XPdnN5FvVSMHoI3rx2zhLCPitioHdxyHD5pypWYse8SB3bPGMucyXkg-mKDoHiP0RAWnFovKjlQ5H5Rk3DsiSUPxMUOkNWBP47gA6LjTx3ZSq98spW5i2vwof3P0N_Hw1Og4LDfS20x4lkrveRN41vChyyNdTQaNmBlEKt84HO8C2fuKahqVeinOBHktCxPhTCrPL_PlhDyWKM7wF'
  }
];

export const AtelierPage = () => {
  const { formatPrice, currency } = useCurrency();
  const { addToCart, setIsBagOpen } = useCart();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(3);
  const [selectedSilhouette, setSelectedSilhouette] = useState(SILHOUETTES[0]);
  const [selectedMetal, setSelectedMetal] = useState(METALS[0]);
  const [selectedGem, setSelectedGem] = useState(GEMS[0]);
  const [accentDiamonds, setAccentDiamonds] = useState({ name: 'Round Brilliant (F/VVS 0.45ct)', price: 1200 });
  const [engravingText, setEngravingText] = useState('ETERNITAS • 1918');
  const [ringSize, setRingSize] = useState('US 6.5 (EU 53)');

  // Stage controls
  const [lighting, setLighting] = useState('day');
  const [skinTone, setSkinTone] = useState('fair');
  const [rotation, setRotation] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Filters for Step 3
  const [activeCategory, setActiveCategory] = useState('all');
  const [maxCarat, setMaxCarat] = useState(6.5);
  const [maxBudget, setMaxBudget] = useState(40000);

  const filteredGems = GEMS.filter(g => {
    if (activeCategory !== 'all' && g.category !== activeCategory) return false;
    if (g.carats > maxCarat) return false;
    if (g.price > maxBudget) return false;
    return true;
  });

  const totalAcquisition = selectedSilhouette.price + selectedGem.price + accentDiamonds.price;

  const handleRotate = () => {
    setRotation(prev => (prev + 45) % 360);
  };

  const handleToggleZoom = () => {
    setIsZoomed(prev => !prev);
  };

  const handleDownloadBlueprint = () => {
    showToast('Atelier Blueprint PDF CAD vector generated and downloaded.', 'success');
  };

  const handleConciergeCall = () => {
    showToast('Initiating encrypted VIP video session with Chief Gemologist Dr. Senanayake...', 'info');
  };

  const handleReserveCommission = () => {
    const customItem = {
      id: `bespoke-${Date.now()}`,
      title: `Bespoke ${selectedSilhouette.name} with ${selectedGem.shortName}`,
      sku: `BESPOKE-${selectedGem.id.toUpperCase()}-PLAT`,
      category: 'Bespoke Atelier',
      price: totalAcquisition,
      image: selectedGem.renderImage || selectedGem.image,
      options: {
        silhouette: selectedSilhouette.name,
        metal: selectedMetal.name,
        centerGem: selectedGem.shortName,
        accents: accentDiamonds.name,
        engraving: engravingText,
        size: ringSize
      }
    };
    addToCart(customItem, 1);
    setIsBagOpen(true);
    showToast(`Bespoke commission transferred to your Velvet Acquisition Bag.`, 'success');
  };

  return (
    <div className="w-full pt-29 bg-surface font-body-md text-on-surface antialiased">
      {/* Stepper & Atelier Page Header */}
      <section className="w-full bg-surface-container-low py-space-lg px-6 lg:px-12 border-b border-surface-container-highest/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="space-y-space-xs">
              <div className="flex items-center gap-space-xs text-secondary">
                <span className="material-symbols-outlined text-[16px]">architecture</span>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.24em]">
                  Haute Joaillerie Atelier • Bespoke Registry
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">
                Bespoke Atelier — Handcrafted by Master Goldsmiths
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Select an authenticated Ceylon gem from our vault and forge your heirloom ring, necklace, or pendant with direct lapidary supervision.
              </p>
            </div>
            <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-xs rounded-xl shadow-sm border border-surface-container-highest/40">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></div>
              <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider">
                Ratnapura Vault Synchronized
              </span>
            </div>
          </div>

          {/* 6-Step Horizontal Progress Tracker */}
          <div className="w-full overflow-x-auto pb-space-xs">
            <div className="grid grid-cols-6 min-w-[760px] gap-space-sm">
              {/* Step 1 */}
              <div
                onClick={() => setCurrentStep(1)}
                className={`flex flex-col gap-space-xs group cursor-pointer p-2 rounded-lg transition-all ${
                  currentStep === 1 ? 'bg-surface-container-lowest shadow-sm' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-label-sm text-label-sm uppercase font-bold ${
                    currentStep > 1 ? 'text-secondary' : currentStep === 1 ? 'text-primary' : 'text-on-surface-variant'
                  }`}>
                    01 • Silhouette
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-secondary">
                    {currentStep > 1 ? 'check_circle' : currentStep === 1 ? 'adjust' : 'circle'}
                  </span>
                </div>
                <div className={`h-1 w-full rounded-full ${
                  currentStep > 1 ? 'bg-secondary' : currentStep === 1 ? 'bg-primary' : 'bg-surface-container-highest'
                }`}></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">{selectedSilhouette.name}</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">{selectedSilhouette.type}</span>
                </div>
              </div>

              {/* Step 2 */}
              <div
                onClick={() => setCurrentStep(2)}
                className={`flex flex-col gap-space-xs group cursor-pointer p-2 rounded-lg transition-all ${
                  currentStep === 2 ? 'bg-surface-container-lowest shadow-sm' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-label-sm text-label-sm uppercase font-bold ${
                    currentStep > 2 ? 'text-secondary' : currentStep === 2 ? 'text-primary' : 'text-on-surface-variant'
                  }`}>
                    02 • Metal
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-secondary">
                    {currentStep > 2 ? 'check_circle' : currentStep === 2 ? 'adjust' : 'circle'}
                  </span>
                </div>
                <div className={`h-1 w-full rounded-full ${
                  currentStep > 2 ? 'bg-secondary' : currentStep === 2 ? 'bg-primary' : 'bg-surface-container-highest'
                }`}></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">{selectedMetal.name}</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">{selectedMetal.finish}</span>
                </div>
              </div>

              {/* Step 3 */}
              <div
                onClick={() => setCurrentStep(3)}
                className={`flex flex-col gap-space-xs group cursor-pointer p-2 rounded-lg transition-all ${
                  currentStep === 3 ? 'bg-surface-container-lowest shadow-sm' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-label-sm text-label-sm uppercase font-bold ${
                    currentStep > 3 ? 'text-secondary' : currentStep === 3 ? 'text-primary' : 'text-on-surface-variant'
                  }`}>
                    03 • Center Gem
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-primary animate-pulse">
                    {currentStep > 3 ? 'check_circle' : currentStep === 3 ? 'adjust' : 'circle'}
                  </span>
                </div>
                <div className={`h-1 w-full rounded-full ${
                  currentStep > 3 ? 'bg-secondary' : currentStep === 3 ? 'bg-primary' : 'bg-surface-container-highest'
                }`}></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-primary">{selectedGem.shortName}</span>
                  <span className="font-label-sm text-[10px] text-primary uppercase font-semibold">Active Selection</span>
                </div>
              </div>

              {/* Step 4 */}
              <div
                onClick={() => setCurrentStep(4)}
                className={`flex flex-col gap-space-xs group cursor-pointer p-2 rounded-lg transition-all ${
                  currentStep === 4 ? 'bg-surface-container-lowest shadow-sm' : currentStep < 4 ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase font-semibold">04 • Architecture</span>
                  <span className="material-symbols-outlined text-[15px]">
                    {currentStep > 4 ? 'check_circle' : currentStep === 4 ? 'adjust' : 'lock'}
                  </span>
                </div>
                <div className={`h-1 w-full rounded-full ${
                  currentStep > 4 ? 'bg-secondary' : currentStep === 4 ? 'bg-primary' : 'bg-surface-container-highest'
                }`}></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">Prongs &amp; Gallery</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Claw &amp; Pavilion</span>
                </div>
              </div>

              {/* Step 5 */}
              <div
                onClick={() => setCurrentStep(5)}
                className={`flex flex-col gap-space-xs group cursor-pointer p-2 rounded-lg transition-all ${
                  currentStep === 5 ? 'bg-surface-container-lowest shadow-sm' : currentStep < 5 ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase font-semibold">05 • Accents</span>
                  <span className="material-symbols-outlined text-[15px]">
                    {currentStep > 5 ? 'check_circle' : currentStep === 5 ? 'adjust' : 'lock'}
                  </span>
                </div>
                <div className={`h-1 w-full rounded-full ${
                  currentStep > 5 ? 'bg-secondary' : currentStep === 5 ? 'bg-primary' : 'bg-surface-container-highest'
                }`}></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">Pavé &amp; Engraving</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">{ringSize}</span>
                </div>
              </div>

              {/* Step 6 */}
              <div
                onClick={() => setCurrentStep(6)}
                className={`flex flex-col gap-space-xs group cursor-pointer p-2 rounded-lg transition-all ${
                  currentStep === 6 ? 'bg-surface-container-lowest shadow-sm' : currentStep < 6 ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-sm text-label-sm uppercase font-semibold">06 • Reserve</span>
                  <span className="material-symbols-outlined text-[15px]">
                    {currentStep === 6 ? 'verified' : 'lock'}
                  </span>
                </div>
                <div className={`h-1 w-full rounded-full ${
                  currentStep === 6 ? 'bg-primary' : 'bg-surface-container-highest'
                }`}></div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">Gemologist Review</span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Vault Escrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Split Builder Workspace */}
      <section className="w-full px-6 lg:px-12 py-space-lg">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-space-xl items-start">
          {/* Left Side: Sticky Live Interactive Canvas & Estimator (45%) */}
          <aside className="w-full lg:w-[45%] lg:sticky lg:top-28 flex flex-col gap-space-lg">
            {/* Interactive 3D Preview Frame */}
            <div
              className={`relative w-full aspect-square rounded-xl overflow-hidden shadow-xl flex flex-col justify-between p-space-md transition-colors duration-500 border border-surface-container-highest/60 ${
                lighting === 'day' ? 'bg-[#f5f3f0]' : 'bg-[#1c1c1a]'
              }`}
            >
              {/* Lighting & Skin Micro Toolbar */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-surface-container-highest/40">
                  <button
                    onClick={() => setLighting('day')}
                    className={`font-label-sm text-label-sm uppercase px-2 py-0.5 rounded-full transition-all ${
                      lighting === 'day'
                        ? 'bg-primary text-on-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Daylight (5500K)
                  </button>
                  <button
                    onClick={() => setLighting('eve')}
                    className={`font-label-sm text-label-sm uppercase px-2 py-0.5 rounded-full transition-all ${
                      lighting === 'eve'
                        ? 'bg-secondary-fixed text-on-secondary-fixed font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Evening (2700K)
                  </button>
                </div>

                <div className="flex items-center gap-1.5 bg-surface-container-lowest/80 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-surface-container-highest/40">
                  <span className="font-label-sm text-[9px] uppercase tracking-wider text-on-surface-variant">Skin:</span>
                  <button
                    onClick={() => setSkinTone('fair')}
                    className={`w-4 h-4 rounded-full bg-[#f6e2d3] shadow-sm hover:scale-110 transition-transform ${
                      skinTone === 'fair' ? 'ring-2 ring-primary ring-offset-1' : ''
                    }`}
                    title="Fair"
                  />
                  <button
                    onClick={() => setSkinTone('medium')}
                    className={`w-4 h-4 rounded-full bg-[#d6a374] shadow-sm hover:scale-110 transition-transform ${
                      skinTone === 'medium' ? 'ring-2 ring-primary ring-offset-1' : ''
                    }`}
                    title="Medium"
                  />
                  <button
                    onClick={() => setSkinTone('rich')}
                    className={`w-4 h-4 rounded-full bg-[#825338] shadow-sm hover:scale-110 transition-transform ${
                      skinTone === 'rich' ? 'ring-2 ring-primary ring-offset-1' : ''
                    }`}
                    title="Deep Rich"
                  />
                </div>
              </div>

              {/* Central Specimen Interactive Rendering */}
              <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedGem.renderImage}
                  alt={selectedGem.title}
                  style={{
                    transform: `rotate(${rotation}deg) scale(${isZoomed ? 1.35 : 1})`,
                    filter: lighting === 'eve' ? 'sepia(0.2) brightness(0.95)' : 'none'
                  }}
                  className="w-4/5 h-4/5 object-contain transition-all duration-700 filter drop-shadow-2xl select-none"
                />

                {/* Realtime Inspection Loupe Indicator */}
                <div className="absolute bottom-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 border border-surface-container-highest/40">
                  <span className="material-symbols-outlined text-[15px] text-secondary">loupe</span>
                  <span className="font-label-sm text-label-sm uppercase text-on-surface font-semibold">
                    {selectedGem.shortName} • {selectedGem.certs}
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-tertiary-container text-on-tertiary px-2.5 py-1 rounded font-label-sm text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-secondary-fixed-dim">verified</span> Unheated Ceylon
                </div>
              </div>

              {/* Bottom Viewport Controls & Blueprint Download */}
              <div className="flex items-center justify-between z-10 pt-space-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRotate}
                    className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors shadow-sm"
                    title="Rotate 45°"
                  >
                    <span className="material-symbols-outlined text-[16px]">rotate_right</span>
                  </button>
                  <button
                    onClick={handleToggleZoom}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                      isZoomed ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                    }`}
                    title="Macro Loupe Zoom"
                  >
                    <span className="material-symbols-outlined text-[16px]">{isZoomed ? 'zoom_out' : 'zoom_in'}</span>
                  </button>
                </div>
                <button
                  onClick={handleDownloadBlueprint}
                  className="flex items-center gap-1.5 font-label-sm text-label-sm uppercase text-secondary hover:text-primary transition-colors bg-surface-container-lowest/80 px-3 py-1.5 rounded-lg shadow-sm border border-surface-container-highest/40"
                >
                  <span className="material-symbols-outlined text-[15px]">download</span>
                  <span>Atelier Blueprint PDF</span>
                </button>
              </div>
            </div>

            {/* Live Dynamic Investment Estimator Ledger */}
            <div className="w-full bg-surface-container-lowest p-space-lg rounded-xl shadow-md space-y-space-md border border-surface-container-highest/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary">receipt_long</span>
                  <span className="font-label-lg text-label-lg uppercase tracking-wider text-primary font-bold">Investment Ledger</span>
                </div>
                <span className="font-label-sm text-[10px] uppercase px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant font-mono">
                  Live Currency: {currency}
                </span>
              </div>
              <div className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">Setting Silhouette: <em>{selectedSilhouette.name}</em></span>
                  <span className="font-mono text-on-surface font-medium">{formatPrice(selectedSilhouette.price)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">Metal Fabrication: <em>{selectedMetal.name}</em></span>
                  <span className="font-mono text-on-surface font-medium">Included</span>
                </div>
                <div className="flex items-center justify-between text-primary font-medium">
                  <span className="flex items-center gap-1">Selected Center Gem: <em>{selectedGem.shortName}</em></span>
                  <span className="font-mono font-bold">+{formatPrice(selectedGem.price)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Accent Diamonds: <em>{accentDiamonds.name}</em></span>
                  <span className="font-mono text-on-surface font-medium">+{formatPrice(accentDiamonds.price)}</span>
                </div>
                <div className="flex items-center justify-between text-secondary">
                  <span>Custom Hand-Chiseled Calligraphy:</span>
                  <span className="font-label-sm text-label-sm uppercase font-bold">Complimentary</span>
                </div>
              </div>
              <div className="h-[1px] w-full bg-surface-container-highest"></div>
              <div className="flex items-end justify-between">
                <div className="space-y-0.5">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                    Estimated Total Acquisition
                  </span>
                  <p className="font-label-sm text-[11px] text-on-surface-variant">
                    Insured armored courier &amp; Swiss certification included.
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">
                    {formatPrice(totalAcquisition)}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Side: Configuration Console (55%) */}
          <main className="w-full lg:w-[55%] flex flex-col gap-space-lg">
            {/* Step 1: Silhouette */}
            {currentStep === 1 && (
              <div className="space-y-space-md">
                <div className="space-y-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-primary text-on-primary">Step 1 of 6</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Architectural Frame</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Choose Your Setting Silhouette</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Each silhouette is engineered with hand-cast comfort curvature and optimized for maximum pavilion light refraction.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {SILHOUETTES.map(sil => (
                    <div
                      key={sil.id}
                      onClick={() => setSelectedSilhouette(sil)}
                      className={`p-space-md rounded-xl cursor-pointer transition-all duration-300 border ${
                        selectedSilhouette.id === sil.id
                          ? 'bg-surface-container-lowest ring-2 ring-primary border-primary shadow-md'
                          : 'bg-surface-container-low hover:bg-surface-container-lowest border-surface-container-highest/40'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-label-sm text-label-sm uppercase font-bold text-secondary">{sil.type}</span>
                        <span className="font-mono font-bold text-primary">{formatPrice(sil.price)}</span>
                      </div>
                      <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold mb-1">{sil.name}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{sil.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Metal */}
            {currentStep === 2 && (
              <div className="space-y-space-md">
                <div className="space-y-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-primary text-on-primary">Step 2 of 6</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Precious Metallurgy</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Select Alloy &amp; Surface Finish</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    All alloys are cold-forged and purified without nickel to comply with strict Swiss hypoallergenic standards.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {METALS.map(metal => (
                    <div
                      key={metal.id}
                      onClick={() => setSelectedMetal(metal)}
                      className={`p-space-md rounded-xl cursor-pointer transition-all duration-300 border ${
                        selectedMetal.id === metal.id
                          ? 'bg-surface-container-lowest ring-2 ring-primary border-primary shadow-md'
                          : 'bg-surface-container-low hover:bg-surface-container-lowest border-surface-container-highest/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full border border-black/20 shadow-sm" style={{ backgroundColor: metal.color }} />
                          <span className="font-label-sm text-label-sm uppercase font-bold text-primary">{metal.badge}</span>
                        </div>
                        <span className="font-label-sm text-[10px] uppercase text-secondary font-semibold">Complimentary</span>
                      </div>
                      <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold">{metal.name}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{metal.finish}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Center Gem Selection (Direct Stitch UI) */}
            {currentStep === 3 && (
              <div className="space-y-space-lg">
                <div className="space-y-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-primary text-on-primary">Step 3 of 6</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Ceylon Corundum &amp; Minerals</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Select Your Certified Center Gem</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Each natural gem in this curated register is guaranteed unheated and accompanied by SSEF, Gübelin, or GIA dual-sealed passports direct from Ratnapura and Elahera river gravels.
                  </p>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-xl border border-surface-container-highest/40">
                  {/* Category Chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { key: 'all', label: `All Gems (${GEMS.length})` },
                      { key: 'blue', label: 'Royal Blue Sapphire' },
                      { key: 'pad', label: 'Padparadscha' },
                      { key: 'ruby', label: 'Ceylon Ruby' }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveCategory(tab.key)}
                        className={`font-label-md text-label-md uppercase px-3 py-1.5 rounded-lg transition-all ${
                          activeCategory === tab.key
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Carat & Budget Sliders */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between font-label-sm text-label-sm uppercase">
                        <span className="text-on-surface-variant font-semibold">Carat Weight</span>
                        <span className="text-primary font-bold font-mono">Up to {maxCarat.toFixed(2)}ct</span>
                      </div>
                      <input
                        type="range"
                        min="3.0"
                        max="6.5"
                        step="0.1"
                        value={maxCarat}
                        onChange={(e) => setMaxCarat(parseFloat(e.target.value))}
                        className="w-full accent-primary bg-surface-container h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between font-label-sm text-label-sm uppercase">
                        <span className="text-on-surface-variant font-semibold">Investment Ceiling</span>
                        <span className="text-primary font-bold font-mono">Up to {formatPrice(maxBudget)}</span>
                      </div>
                      <input
                        type="range"
                        min="20000"
                        max="45000"
                        step="1000"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(parseInt(e.target.value, 10))}
                        className="w-full accent-primary bg-surface-container h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Gemstone Inventory Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {filteredGems.map(gem => (
                    <div
                      key={gem.id}
                      onClick={() => setSelectedGem(gem)}
                      className={`gem-card relative p-space-md bg-surface-container-lowest rounded-xl shadow-md cursor-pointer transition-all duration-300 border ${
                        selectedGem.id === gem.id ? 'ring-2 ring-primary border-primary' : 'border-surface-container-highest/40 hover:shadow-lg'
                      }`}
                    >
                      {selectedGem.id === gem.id && (
                        <div className="absolute top-3 right-3 bg-primary text-on-primary font-label-sm text-[9px] uppercase px-2 py-0.5 rounded font-bold tracking-wider z-10">
                          Selected
                        </div>
                      )}
                      <div className="relative w-full aspect-video bg-surface-container-low rounded-lg overflow-hidden mb-space-sm">
                        <img
                          src={gem.image}
                          alt={gem.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-surface-container-lowest/80 px-2 py-0.5 rounded font-label-sm text-[9px] uppercase text-on-surface backdrop-blur-sm">
                          {gem.certs}
                        </div>
                      </div>
                      <div className="space-y-space-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm uppercase text-secondary font-bold">{gem.mine}</span>
                          <span className="font-label-sm text-[10px] uppercase px-1.5 py-0.5 rounded bg-tertiary-container text-on-tertiary">
                            Zero Heat
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-[18px] leading-snug text-on-surface font-semibold">{gem.title}</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                          {gem.desc}
                        </p>
                        <div className="pt-space-xs flex items-center justify-between">
                          <span className="font-headline-sm text-headline-sm text-primary font-bold font-mono">
                            {formatPrice(gem.price)}
                          </span>
                          <span className="font-label-sm text-label-sm uppercase text-secondary flex items-center gap-0.5">
                            Inspect Specimen <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Architecture */}
            {currentStep === 4 && (
              <div className="space-y-space-md">
                <div className="space-y-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-primary text-on-primary">Step 4 of 6</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Prong &amp; Pavilion Architecture</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Gallery Elevation &amp; Prongs</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Custom claw tips carved under microscope to secure the Ceylon stone while exposing minimum perimeter metal.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {[
                    { id: 'claw4', title: 'Four Micro-Claw Tips', desc: 'Minimalist claw geometry giving maximum exposure to the sapphire girdle.', badge: 'Standard Atelier' },
                    { id: 'crown6', title: 'Six-Claw Imperial Crown', desc: 'Historic royal seating offering superior security and circular pavilion framing.', badge: 'Collector Choice' },
                    { id: 'bezel', title: 'Low-Profile Bezel Collar', desc: 'Seamless mirror-polished bezel collar protecting the girdle for daily wear.', badge: 'Modern Elegance' },
                    { id: 'hidden', title: 'Hidden Halo Pavé Bridge', desc: 'An intimate circle of F/VVS diamond micro-brilliants nestled underneath the head.', badge: 'Understated Luxury' }
                  ].map(item => (
                    <div
                      key={item.id}
                      className="p-space-md rounded-xl bg-surface-container-lowest border border-surface-container-highest/40 hover:border-primary transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-label-sm text-label-sm uppercase text-secondary font-bold">{item.badge}</span>
                        <span className="material-symbols-outlined text-[18px] text-primary">check_circle</span>
                      </div>
                      <h3 className="font-headline-sm text-[18px] font-semibold text-on-surface mb-1">{item.title}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Accents & Personalization */}
            {currentStep === 5 && (
              <div className="space-y-space-md">
                <div className="space-y-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-primary text-on-primary">Step 5 of 6</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Accents &amp; Hand-Chiseled Calligraphy</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Size, Pavé &amp; Inscription</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Indicate finger sizing and commemorative inscriptions chiseled into the inner shank by our master engraver.
                  </p>
                </div>
                <div className="space-y-space-md bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container-highest/60">
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                      Finger Size Calibration
                    </label>
                    <select
                      value={ringSize}
                      onChange={(e) => setRingSize(e.target.value)}
                      className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg font-body-md text-on-surface focus:outline-none border border-surface-container-highest"
                    >
                      <option value="US 5 (EU 49.3)">US 5 (EU 49.3) — 15.7mm</option>
                      <option value="US 5.5 (EU 50.6)">US 5.5 (EU 50.6) — 16.1mm</option>
                      <option value="US 6 (EU 51.9)">US 6 (EU 51.9) — 16.5mm</option>
                      <option value="US 6.5 (EU 53)">US 6.5 (EU 53) — 16.9mm (Standard)</option>
                      <option value="US 7 (EU 54.4)">US 7 (EU 54.4) — 17.3mm</option>
                      <option value="US 7.5 (EU 55.7)">US 7.5 (EU 55.7) — 17.7mm</option>
                      <option value="US 8 (EU 57)">US 8 (EU 57) — 18.1mm</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm uppercase text-on-surface-variant font-semibold">
                      Hand-Chiseled Inner Shank Inscription (Complimentary)
                    </label>
                    <input
                      type="text"
                      maxLength={24}
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                      placeholder="e.g. ETERNITAS • 1918"
                      className="w-full px-4 py-2.5 bg-surface-container-low rounded-lg font-mono text-on-surface uppercase focus:outline-none border border-surface-container-highest"
                    />
                    <p className="font-label-sm text-[10px] text-on-surface-variant">Max 24 characters. Roman serif font or cursive copperplate available.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Review & Vault Escrow */}
            {currentStep === 6 && (
              <div className="space-y-space-md">
                <div className="space-y-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-primary text-on-primary">Step 6 of 6</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">Gemologist Review &amp; Allocation</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">Heirloom Commission Dossier</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Your bespoke piece is reviewed by our lead gemologist before stone allocation. Deposit secured in escrow.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container-highest/60 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-body-sm">
                    <div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Setting:</span>
                      <p className="font-semibold text-on-surface">{selectedSilhouette.name}</p>
                    </div>
                    <div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Precious Metal:</span>
                      <p className="font-semibold text-on-surface">{selectedMetal.name}</p>
                    </div>
                    <div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Center Specimen:</span>
                      <p className="font-semibold text-primary">{selectedGem.title}</p>
                    </div>
                    <div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Certification:</span>
                      <p className="font-semibold text-on-surface">{selectedGem.certs}</p>
                    </div>
                    <div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Ring Calibration:</span>
                      <p className="font-semibold text-on-surface">{ringSize}</p>
                    </div>
                    <div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">Engraving:</span>
                      <p className="font-semibold font-mono text-secondary">{engravingText || 'None'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Concierge Assistance Pill */}
            <div className="w-full bg-surface-container-low p-space-md rounded-xl flex flex-col sm:flex-row items-center justify-between gap-space-md shadow-sm border border-surface-container-highest/40">
              <div className="flex items-center gap-space-sm">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-surface-container-highest flex items-center justify-center font-headline-sm font-bold text-primary">
                    DS
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-600 ring-2 ring-surface-container-low"></div>
                </div>
                <div className="space-y-0.5">
                  <p className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                    Direct Gemologist Concierge
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Need guidance on refractive fire or setting pairing? Chat live with Dr. Senanayake.
                  </p>
                </div>
              </div>
              <button
                onClick={handleConciergeCall}
                className="whitespace-nowrap font-label-sm text-label-sm uppercase tracking-wider px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-container-highest shadow-sm transition-all flex items-center gap-1.5 border border-surface-container-highest/40"
              >
                <span className="material-symbols-outlined text-[15px] text-secondary">chat_bubble</span>
                <span>Request Salon Call</span>
              </button>
            </div>

            {/* Atelier Navigation Action Bar */}
            <div className="flex items-center justify-between pt-space-md">
              <button
                disabled={currentStep === 1}
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                className="flex items-center gap-2 font-label-md text-label-md uppercase tracking-widest text-on-surface-variant hover:text-primary px-space-md py-3 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Back</span>
              </button>

              {currentStep < 6 ? (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
                  className="flex items-center gap-3 font-label-md text-label-md uppercase tracking-widest bg-primary text-on-primary hover:bg-surface-container-highest hover:text-on-surface px-space-lg py-3.5 rounded-lg shadow-lg transition-all"
                >
                  <span>Confirm &amp; Proceed to Step {currentStep + 1}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              ) : (
                <button
                  onClick={handleReserveCommission}
                  className="flex items-center gap-3 font-label-md text-label-md uppercase tracking-widest bg-secondary text-on-secondary hover:bg-primary hover:text-on-primary px-space-lg py-3.5 rounded-lg shadow-lg transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Transfer to Acquisition Bag ({formatPrice(totalAcquisition)})</span>
                </button>
              )}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};
