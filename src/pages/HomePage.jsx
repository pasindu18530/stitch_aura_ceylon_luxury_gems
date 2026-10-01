import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GEMSTONES } from '../data/gemstones';
import { JEWELLERY } from '../data/jewellery';
import GemstoneCard from '../components/cards/GemstoneCard';
import JewelleryCard from '../components/cards/JewelleryCard';
import { useToast } from '../context/ToastContext';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quizAura, setQuizAura] = useState('royal-blue');
  const [quizStep, setQuizStep] = useState(1);
  const { showToast } = useToast();

  // Consultation Form state
  const [consultName, setConsultName] = useState('');
  const [consultPhone, setConsultPhone] = useState('');
  const [consultType, setConsultType] = useState('virtual');
  const [consultInterest, setConsultInterest] = useState('royal-blue');
  const [consultNotes, setConsultNotes] = useState('');

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    showToast(
      "Your confidential consultation request has been lodged with the Vault Concierge. A private gemologist will contact you within 2 hours.",
      "success"
    );
    setConsultName('');
    setConsultPhone('');
    setConsultNotes('');
  };

  const filteredPortalGems = selectedCategory === 'all'
    ? GEMSTONES.slice(0, 4)
    : GEMSTONES.filter(g => g.category === selectedCategory).slice(0, 4);

  const kandySuite = JEWELLERY.find(j => j.id === 'kandy-royal-suite') || JEWELLERY[0];
  const lotusEarrings = JEWELLERY.find(j => j.id === 'lotus-dawn-earrings') || JEWELLERY[1];
  const celestialSolitaire = JEWELLERY.find(j => j.id === 'celestial-sapphire-solitaire') || JEWELLERY[2];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Cinematic Editorial Hero Section */}
      <section className="relative w-full pt-36 pb-24 overflow-hidden bg-primary-container text-surface-container-lowest">
        {/* Ambient jewel refraction effect */}
        <div className="absolute -top-32 right-[-10%] w-[650px] h-[650px] rounded-full bg-gradient-to-br from-tertiary-fixed-dim/20 via-secondary/15 to-transparent blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 left-[-5%] w-[480px] h-[480px] rounded-full bg-secondary-container/10 blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Column */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-highest/10 backdrop-blur-md w-fit">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
                <span className="font-label-sm text-label-sm tracking-[0.24em] text-secondary-fixed-dim uppercase">
                  Haute Joaillerie • Ratnapura • Galle 1918
                </span>
              </div>

              <h1 className="font-display-lg text-display-lg font-normal tracking-tight text-surface-container-lowest max-w-2xl leading-[1.08] font-serif">
                From the Ancient Gravels of Serendib to the World’s Crown Jewels
              </h1>

              <p className="font-body-lg text-body-lg text-on-primary-container max-w-xl font-light">
                Discover unheated Royal Blue Sapphires, ethereal Padparadschas, and bespoke high jewellery masterworks ethically unearthed in Sri Lanka’s revered gem gravels.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/gemstones"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md uppercase tracking-widest font-semibold hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-all duration-300 shadow-xl group"
                >
                  <span>Explore Certified Gemstones</span>
                  <span className="material-symbols-outlined text-[16px] ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    diamond
                  </span>
                </Link>

                <Link
                  to="/custom-atelier"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-surface-container-highest/10 hover:bg-surface-container-highest/20 text-surface-container-lowest font-label-md text-label-md uppercase tracking-widest transition-all duration-300 backdrop-blur-md group"
                >
                  <span>Commission Bespoke Atelier</span>
                  <span className="material-symbols-outlined text-[16px] ml-2 transition-transform duration-300 group-hover:translate-x-1 text-secondary-fixed-dim">
                    arrow_forward
                  </span>
                </Link>
              </div>

              {/* Micro Specimen Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6 max-w-lg">
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-secondary-fixed-dim font-bold font-serif">
                    100%
                  </span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container">
                    Unheated Guarantee
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-secondary-fixed-dim font-bold font-serif">
                    SSEF &amp; GIA
                  </span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container">
                    Dual Cryptic Seal
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-secondary-fixed-dim font-bold font-serif">
                    107 Yrs
                  </span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container">
                    Ceylon Lapidary
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Hero Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-surface-container-high group">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAquJkol9_N6ipM8m_nJ5plpCmkufWBNxbgBuxfELqEi66JIKG_XUBzFo2RMQ63e2lddnDmcTnfHLL4nVGlx6VGuUtRGRdhf5Z_EX4cvXlSSNPGqhi_Sjo3jdNia5ECQD_0ptIGej2gxJSAIsPoGGpiD0bgLrvKNYcN1tZBI5DLIx3sCOZCaN2b--T03j-iudCsksmEVAOgo8ny7tZMoFoKZO4o9y6h-H4On9xKcPMbUkPhsZwZAB_E"
                  alt="An ethereal high-fashion macro photograph of an unheated Royal Blue Ceylon Sapphire"
                />

                {/* Glassmorphic floating certificate loupe */}
                <Link
                  to="/gemstones/ser-sap-9182"
                  className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-primary-container/85 backdrop-blur-xl shadow-xl flex items-center justify-between hover:bg-primary-container transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary-fixed-dim">
                      <span className="material-symbols-outlined text-[20px]">verified_user</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary-fixed-dim font-bold">
                        SSEF #119402 • Gübelin
                      </span>
                      <span className="font-body-sm text-body-sm text-surface-container-lowest font-medium">
                        8.42 ct Cushion Royal Blue Ceylon
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                    Unheated
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Live Trust Bar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16">
          <div className="w-full py-4 px-6 rounded-xl bg-surface-container-lowest text-primary shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[22px] text-secondary">alt_route</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider">
                  Mine-to-Finger
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  100% Traceable Provenance
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[22px] text-secondary">workspace_premium</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider">
                  GIA &amp; Gübelin
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Swiss Lab Certification
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[22px] text-secondary">shield</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider">
                  Brink’s Armored
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Insured Courier Worldwide
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[22px] text-secondary">support_agent</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase font-bold tracking-wider">
                  Private Concierge
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Master Gemologist 24/7
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Gemstone Discovery Portal (Interactive Specimen Grid) */}
      <section className="w-full py-24 bg-surface" id="gemstone-portal">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary font-bold">
                  Unheated Natural Corundum
                </span>
              </div>
              <h2 className="font-display-md text-display-md text-primary font-normal font-serif">
                The Sacred Stones of Serendib
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                Direct access to Sri Lanka’s most coveted unheated treasures, extracted responsibly from ancestral alluvial pit gravels and cut to exacting proportions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/gemstones"
                className="px-4 py-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-2 transition-colors font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Carat &amp; Cut Filter</span>
              </Link>
              <Link
                to="/gemstones"
                className="px-4 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-2 transition-colors font-semibold"
              >
                <span>View Full Vault ({GEMSTONES.length})</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Ceylon Gems' },
              { id: 'blue', label: 'Royal Blue Sapphires' },
              { id: 'padparadscha', label: 'Ethereal Padparadscha' },
              { id: 'ruby', label: 'Ceylon Rubies' },
              { id: 'alexandrite', label: 'Rare Alexandrite' },
              { id: 'star', label: 'Star Sapphires' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full font-label-sm text-label-sm tracking-wider uppercase transition-all duration-200 shrink-0 font-semibold ${
                  selectedCategory === tab.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 4 High-Fidelity Specimen Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPortalGems.map(gem => (
              <GemstoneCard key={gem.id} gem={gem} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. High Jewellery Masterpieces & Curated Collections */}
      <section className="w-full py-24 bg-surface-container-low" id="collections">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.24em] text-secondary font-bold">
              Place Vendôme Handcraftsmanship
            </span>
            <h2 className="font-display-lg text-display-lg font-normal text-primary font-serif">
              Haute Joaillerie Suites
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Where centuries-old Ceylon gemstone legacies meet the avant-garde precision of high jewelry ateliers in Paris, Geneva, and Colombo.
            </p>
          </div>

          {/* Curated Split Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7 Columns: Kandy Royal Suite */}
            <div className="lg:col-span-7 flex">
              <JewelleryCard piece={kandySuite} isHero={true} />
            </div>

            {/* Right 5 Columns: Lotus Dawn and Solitaires */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <JewelleryCard piece={lotusEarrings} isHero={false} />
              <JewelleryCard piece={celestialSolitaire} isHero={false} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Feature Teaser: 6-Step Custom Atelier & Guided Gem Finder */}
      <section className="w-full py-24 bg-surface relative overflow-hidden" id="custom-atelier">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-2xl bg-gradient-to-r from-primary-container via-surface-container-high/40 to-primary-container p-8 lg:p-14 text-surface-container-lowest shadow-2xl relative overflow-hidden">
            {/* Subtle gold line geometry decorative SVG */}
            <svg
              className="absolute right-0 top-0 bottom-0 h-full w-1/2 opacity-10 pointer-events-none"
              fill="none"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" />
              <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1" />
              <polygon points="200,40 340,280 60,280" stroke="currentColor" strokeWidth="1" />
              <polygon points="200,360 340,120 60,120" stroke="currentColor" strokeWidth="1" />
            </svg>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  <span>Bespoke Interactive Experience</span>
                </div>

                <h2 className="font-display-md text-display-md font-normal leading-tight font-serif">
                  Design Your Own Masterpiece or Take The Connoisseur Gem Quiz
                </h2>

                <p className="font-body-md text-body-md text-on-primary-container max-w-xl">
                  Whether curating a one-of-a-kind royal engagement ring or commissioning an archival necklace, our 6-step Custom Atelier guides you from unearthing the raw rough stone to hand-finishing in platinum.
                </p>

                {/* 6-Step Minimalist Stepper Preview */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-4">
                  <div className="flex flex-col space-y-1">
                    <span className="font-label-sm text-label-sm text-secondary-fixed-dim font-bold">I. Gem</span>
                    <span className="text-[11px] text-on-primary-container font-mono">Select Stone</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-label-sm text-label-sm text-secondary-fixed-dim font-bold">II. Metal</span>
                    <span className="text-[11px] text-on-primary-container font-mono">18k • Platinum</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-label-sm text-label-sm text-secondary-fixed-dim font-bold">III. Cut</span>
                    <span className="text-[11px] text-on-primary-container font-mono">Lapidary</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-label-sm text-label-sm text-secondary-fixed-dim font-bold">IV. Setting</span>
                    <span className="text-[11px] text-on-primary-container font-mono">Prong • Bezel</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-label-sm text-label-sm text-secondary-fixed-dim font-bold">V. 3D Model</span>
                    <span className="text-[11px] text-on-primary-container font-mono">Gouache • CAD</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-label-sm text-label-sm text-secondary-fixed-dim font-bold">VI. Vault</span>
                    <span className="text-[11px] text-on-primary-container font-mono">Courier Delivery</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    to="/custom-atelier"
                    className="px-6 py-3.5 rounded-lg bg-secondary hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed text-on-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold transition-all shadow-lg flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">design_services</span>
                    <span>Launch 6-Step Atelier</span>
                  </Link>
                  <button
                    onClick={() => {
                      const quizEl = document.getElementById('quiz-box');
                      if (quizEl) quizEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 rounded-lg bg-surface-container-highest/20 hover:bg-surface-container-highest/30 text-surface-container-lowest font-label-sm text-label-sm uppercase tracking-wider font-semibold transition-all backdrop-blur-md flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">quiz</span>
                    <span>Take 60-Sec Gemstone Quiz</span>
                  </button>
                </div>
              </div>

              {/* Interactive Quiz Card Preview */}
              <div id="quiz-box" className="lg:col-span-5 bg-surface-container-lowest text-primary p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Connoisseur Gem Selector
                  </span>
                  <span className="font-label-sm text-[10px] text-on-surface-variant font-mono">
                    Step {quizStep} of 3
                  </span>
                </div>

                {quizStep === 1 && (
                  <div className="space-y-4">
                    <h4 className="font-headline-sm text-headline-sm font-medium font-serif">
                      Which mineral aura resonates most?
                    </h4>
                    <div className="space-y-2.5">
                      {[
                        { id: 'royal-blue', title: 'Royal Blue Ceylon Sapphire', desc: 'Depth, sovereign wisdom, clarity' },
                        { id: 'padparadscha', title: 'Padparadscha "Lotus Sunrise"', desc: 'Serenity, ethereal salmon glow, distinction' },
                        { id: 'ruby', title: 'Pigeon Blood Ceylon Ruby', desc: 'Vitality, bold passion, fiery fluorescence' }
                      ].map(option => (
                        <label
                          key={option.id}
                          onClick={() => setQuizAura(option.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            quizAura === option.id ? 'bg-surface-container ring-1 ring-secondary' : 'bg-surface hover:bg-surface-container'
                          }`}
                        >
                          <input
                            type="radio"
                            name="gem_aura"
                            checked={quizAura === option.id}
                            onChange={() => setQuizAura(option.id)}
                            className="accent-secondary w-4 h-4"
                          />
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md uppercase font-bold text-primary">
                              {option.title}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {option.desc}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                    <button
                      onClick={() => setQuizStep(2)}
                      className="w-full py-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>Continue to Carat Weight</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                )}

                {quizStep === 2 && (
                  <div className="space-y-4">
                    <h4 className="font-headline-sm text-headline-sm font-medium font-serif">
                      Preferred Carat Tier &amp; Scale
                    </h4>
                    <div className="space-y-2.5">
                      {['3.00 ct — 5.00 ct (Discreet Luxury)', '5.00 ct — 8.00 ct (Heirloom Statement)', '8.00 ct+ (Museum Monumental)'].map((tier, idx) => (
                        <label
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg bg-surface hover:bg-surface-container cursor-pointer transition-colors"
                        >
                          <input type="radio" name="carat_tier" defaultChecked={idx === 1} className="accent-secondary w-4 h-4" />
                          <span className="font-label-md text-label-md uppercase font-bold text-primary">{tier}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setQuizStep(1)}
                        className="py-3 px-4 rounded-lg bg-surface-container text-on-surface font-label-sm uppercase text-label-sm"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setQuizStep(3)}
                        className="flex-1 py-3 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold"
                      >
                        Reveal Matched Specimens
                      </button>
                    </div>
                  </div>
                )}

                {quizStep === 3 && (
                  <div className="space-y-4 text-center py-2">
                    <span className="material-symbols-outlined text-4xl text-secondary">verified</span>
                    <h4 className="font-headline-sm text-headline-sm font-medium font-serif">
                      Your Matched Vault Specimen
                    </h4>
                    <p className="font-body-sm text-on-surface-variant">
                      Based on your connoisseur profile, we have reserved allocation for unheated corundum:
                    </p>
                    <div className="p-4 rounded-xl bg-surface-container-low text-left">
                      <span className="font-label-sm text-secondary uppercase font-bold text-[10px]">Vault Recommendation</span>
                      <p className="font-headline-sm text-[16px] font-bold text-primary">6.85ct Royal Blue Cushion Sapphire</p>
                      <p className="font-body-sm text-[12px] text-on-surface-variant">Ratnapura Valley Gravels • GIA &amp; SSEF Sealed</p>
                    </div>
                    <Link
                      to="/gemstones/ser-sap-9182"
                      className="w-full py-3 rounded-lg bg-secondary text-on-secondary font-label-sm text-label-sm uppercase tracking-wider font-bold block"
                    >
                      Inspect Your Matched Gem
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Ceylon Heritage & Ethical Artisanal Mining Story */}
      <section className="w-full py-24 bg-surface-container-high/40" id="the-vault-heritage">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.24em] text-secondary font-bold">
                  Heritage • Since 1918
                </span>
              </div>

              <h2 className="font-display-lg text-display-lg font-normal text-primary leading-tight font-serif">
                The Living Gravels of the Kalu Ganga Valley
              </h2>

              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                For over two millennia, the riverbeds surrounding Ratnapura—the historic "City of Gems"—have yielded the finest corundum in human antiquity, adorning the royal diadems of Solomon, the Roman Caesars, and Britain’s St Edward’s Crown.
              </p>

              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Serendib Impérial maintains ancestral artisanal mining concessions. Our miners rely strictly on non-destructive <em>illam</em> shafts lined with eco-friendly rubber tree timber, hand-washing gem gravels in rattan baskets without toxic chemicals or open-pit strip machinery.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-surface-container-lowest space-y-2 border border-surface-container">
                  <span className="material-symbols-outlined text-[24px] text-secondary">forest</span>
                  <h4 className="font-label-lg text-label-lg uppercase font-bold text-primary">
                    Zero-Carbon Pits
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Each alluvial shaft is fully refilled and re-forested after harvest.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-lowest space-y-2 border border-surface-container">
                  <span className="material-symbols-outlined text-[24px] text-secondary">handshake</span>
                  <h4 className="font-label-lg text-label-lg uppercase font-bold text-primary">
                    Fair Share Model
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Miner cooperatives hold 40% equity in high-value rough yield.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Mosaic of Lapidary & Mining */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg bg-surface-container">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJQc3zt2GLBnZCElEQFa69fEb_AQOVfeadENakGJZHk8482Ov-iwG5myKjMfQ-zmFCzLDdNP5iNWUNUy0swu1dAh5dGCPcnGeNUROnPbcBPLZ9kPfgn23lguw76SPRY_3E3ZreCDiG6Hr-ic6zZq5Sw2kT8djtQpy88ovSGRrPJsYjedKOaOF7Q76rcQYPyGL-QFjZqEESAe_ETePmJqlHPo7HjUddnk5Xx5QAPs4xnm9s-zD5hCtq"
                    alt="Traditional Sri Lankan artisanal gem miner in shallow river water"
                  />
                </div>
                <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm space-y-1 border border-surface-container">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Ratnapura • River Illam
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Centuries of undisturbed alluvial stratification.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm space-y-1 border border-surface-container">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                    Galle Fort Lapidary
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Fourth-generation master facet cutters.
                  </p>
                </div>
                <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg bg-surface-container">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOsg-lV4InUHh8boH2CPInnFQ8RGxrHBC1Dmc4203MXfrAFWnA6fkDBmETRTF6ugHEkKLPvGuyt-KSBnGL13dLphR8UkdVs4co9FbvMa1lw0Z_f28ziY-Cpj9wBGMXAZ8ntcyDxKBYlTaPKqQw-bBx2plbS2GZgseMtvmTfxf7n0CWVz22kuchqCxE3mgAJIKdmrrLGazPJ2zgCYssKpbGIm6wDaG3Lg8rHmaIEBkrJhu3J-68hyJk"
                    alt="Close up photograph of a veteran Sri Lankan master lapidary artisan"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Private Vault Consultation & Booking Concierge */}
      <section className="w-full py-24 bg-surface" id="consultation">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-surface-container-lowest rounded-2xl p-8 lg:p-14 shadow-xl items-center border border-surface-container">
            {/* Left Column: Context */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-[0.24em] text-secondary font-bold">
                  Confidential Concierge
                </span>
              </div>

              <h2 className="font-display-md text-display-md text-primary font-normal leading-tight font-serif">
                Schedule a Private Vault Consultation
              </h2>

              <p className="font-body-md text-body-md text-on-surface-variant">
                Examine unheated Ceylon gemstones under 4K macro polarization cameras live from our Colombo vault, or book a private salon viewing in London, Geneva, or Dubai.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary mt-0.5">videocam</span>
                  <div>
                    <p className="font-label-md text-label-md uppercase font-bold text-primary">
                      Live 4K Gem Cam Session
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Direct microscope feed with Senior FGA/GIA Gemologist.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[20px] text-secondary mt-0.5">meeting_room</span>
                  <div>
                    <p className="font-label-md text-label-md uppercase font-bold text-primary">
                      Private Salon Viewings
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Mayfair (London), Rue du Rhône (Geneva), DIFC (Dubai), Galle Face (Colombo).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Form */}
            <div className="lg:col-span-7 bg-surface-container-low p-8 rounded-xl space-y-6 border border-surface-container">
              <h3 className="font-headline-sm text-headline-sm font-medium text-primary font-serif">
                Reserve Your Private Session
              </h3>

              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Full Legal Name
                    </label>
                    <input
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-secondary border border-surface-container-highest"
                      placeholder="Lord / Lady / Dr / Mr"
                      required
                      type="text"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Direct Telephone (Signal / WhatsApp)
                    </label>
                    <input
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-secondary border border-surface-container-highest"
                      placeholder="+44 7000 000000"
                      required
                      type="tel"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Consultation Type
                    </label>
                    <select
                      value={consultType}
                      onChange={(e) => setConsultType(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer border border-surface-container-highest"
                    >
                      <option value="virtual">Virtual 4K Live Loupe Session</option>
                      <option value="london">Private Salon — Mayfair, London</option>
                      <option value="geneva">Private Salon — Geneva, Switzerland</option>
                      <option value="dubai">Private Salon — DIFC, Dubai</option>
                      <option value="colombo">Historic Vault — Colombo 03</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Gemstone Interest
                    </label>
                    <select
                      value={consultInterest}
                      onChange={(e) => setConsultInterest(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer border border-surface-container-highest"
                    >
                      <option value="royal-blue">Unheated Royal Blue Sapphire (5ct+)</option>
                      <option value="padparadscha">Ethereal Padparadscha</option>
                      <option value="ruby">Ceylon Pigeon Blood Ruby</option>
                      <option value="alexandrite">Color-Change Alexandrite</option>
                      <option value="bespoke">Full High Jewellery Commission</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Special Requests / Preferred Date
                  </label>
                  <textarea
                    value={consultNotes}
                    onChange={(e) => setConsultNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-secondary border border-surface-container-highest"
                    placeholder="Specify preferred appointment time, carat preferences, or courier vault arrangements..."
                    rows={3}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-label-sm text-[11px] text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">lock</span>
                    Strict Non-Disclosure • 256-Bit Encrypted
                  </span>
                  <button
                    className="px-8 py-3.5 rounded-lg bg-primary hover:bg-secondary text-on-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold transition-colors shadow-md"
                    type="submit"
                  >
                    Confirm Vault Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
