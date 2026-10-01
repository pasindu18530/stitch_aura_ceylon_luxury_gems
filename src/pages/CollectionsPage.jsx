import React, { useState } from 'react';
import { JEWELLERY } from '../data/jewellery';
import JewelleryCard from '../components/cards/JewelleryCard';
import { useCurrency } from '../context/CurrencyContext';

export const CollectionsPage = () => {
  const { formatPrice } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Imperial Sapphire Suites', 'Padparadscha Collections', 'Crown Jewels & Tiara', 'Royal Necklaces'];

  const filteredItems = JEWELLERY;


  return (
    <div className="w-full pt-29 bg-surface font-body-md text-on-surface antialiased">
      {/* Hero Banner */}
      <section className="relative w-full bg-surface-container-low py-space-xl px-6 lg:px-12 border-b border-surface-container-highest/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs text-secondary">
              <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.24em]">
                Haute Joaillerie Archives • Masterpiece Curation
              </span>
            </div>
            <h1 className="font-display-lg text-headline-lg lg:text-display-lg text-primary leading-tight">
              High Jewellery Collections
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              One-of-a-kind parures and individual collector commissions crafted around untamed, unheated Ceylon gems, each requiring over 600 hours of artisanal hand-sculpting in our Ratnapura atelier.
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container-highest/60 min-w-[280px]">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Vault Status
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-label-md text-label-md uppercase font-semibold text-primary">
                6 Unique Suites Active
              </span>
            </div>
            <span className="font-body-sm text-[12px] text-on-surface-variant">
              Insured courier by Brink's Global Services.
            </span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="w-full px-6 lg:px-12 py-space-md border-b border-surface-container-highest/60 bg-surface">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-space-md pb-2">
          <div className="flex items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-label-md text-label-md uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="font-label-sm text-label-sm uppercase text-on-surface-variant whitespace-nowrap">
            Showing {filteredItems.length} Collections
          </span>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="w-full px-6 lg:px-12 py-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filteredItems.map(item => (
            <JewelleryCard key={item.id} piece={item} />
          ))}
        </div>
      </section>

      {/* Bespoke Invitation Banner */}
      <section className="w-full bg-primary-container text-on-primary-container py-space-xl px-6 lg:px-12 mt-space-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="space-y-space-xs max-w-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.24em] text-secondary-fixed-dim">
              Commission an Heirloom Suite
            </span>
            <h2 className="font-display-md text-headline-lg text-surface-container-lowest">
              Looking for a Bespoke Parure?
            </h2>
            <p className="font-body-md text-body-md text-on-primary-container">
              Our master lapidaries can source matched suites of untreated Royal Blue sapphires or Padparadschas directly from active Ratnapura river gravels for custom family tiaras, necklaces, or earrings.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-space-sm">
            <a
              href="/custom-atelier"
              className="px-space-lg py-3 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md uppercase tracking-widest hover:bg-secondary-fixed transition-colors shadow-lg"
            >
              Open Bespoke Atelier
            </a>
            <a
              href="/consultation"
              className="px-space-lg py-3 rounded-lg border border-on-primary-container/40 text-surface-container-lowest font-label-md text-label-md uppercase tracking-widest hover:bg-primary transition-colors"
            >
              Salon Appointment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
