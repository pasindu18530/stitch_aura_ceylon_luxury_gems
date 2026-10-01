import React from 'react';

export const HeritagePage = () => {
  return (
    <div className="w-full pt-29 bg-surface font-body-md text-on-surface antialiased">
      {/* Hero Section */}
      <section className="relative w-full bg-surface-container-low py-space-xl px-6 lg:px-12 border-b border-surface-container-highest/60">
        <div className="max-w-4xl mx-auto text-center space-y-space-md">
          <div className="inline-flex items-center gap-space-xs text-secondary justify-center">
            <span className="material-symbols-outlined text-[16px]">history_edu</span>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.28em]">
              Ceylon 1918 • Guardians of Untreated Corundum
            </span>
          </div>
          <h1 className="font-display-lg text-headline-lg lg:text-display-lg text-primary">
            The Living Gravels of Serendib
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            For over two millennia, the river valleys of Ratnapura have yielded the earth's purest crystalline corundum. Since 1918, Serendib Impérial has safeguarded these natural marvels, refusing artificial thermal alteration in favor of untouched geological perfection.
          </p>
        </div>
      </section>

      {/* Philosophy Grid */}
      <section className="w-full px-6 lg:px-12 py-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-surface-container-highest/60 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">thermostat</span>
            </div>
            <h3 className="font-headline-sm text-[20px] text-on-surface font-semibold">Zero Thermal Enhancement</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Less than 1% of all gem-quality corundum mined worldwide possesses natural color without furnace treatment. We solely acquire unheated specimens with zero optical alterations.
            </p>
          </div>

          <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-surface-container-highest/60 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">handshake</span>
            </div>
            <h3 className="font-headline-sm text-[20px] text-on-surface font-semibold">Artisanal Co-Op Mining</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              We work exclusively with hereditary miner families in Ratnapura and Elahera using traditional eco-conscious timber pit methods that protect the Ceylon groundwater ecology.
            </p>
          </div>

          <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-surface-container-highest/60 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <h3 className="font-headline-sm text-[20px] text-on-surface font-semibold">Swiss &amp; GIA Dual Passports</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Every major specimen is verified and sealed by either SSEF (Basel), Gübelin (Lucerne), or GIA (New York), accompanied by an irrevocable provenance passport.
            </p>
          </div>

          <div className="p-space-lg rounded-xl bg-surface-container-lowest border border-surface-container-highest/60 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[24px]">fingerprint</span>
            </div>
            <h3 className="font-headline-sm text-[20px] text-on-surface font-semibold">Encrypted Vault Custody</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              From our subterranean storage vault in Colombo to private bank vaults in Zurich and London, our client acquisitions are tracked via immutable ledger registry.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="w-full bg-surface-container-low py-space-xl px-6 lg:px-12 border-t border-b border-surface-container-highest/60">
        <div className="max-w-4xl mx-auto space-y-space-xl">
          <div className="text-center space-y-2">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.24em] text-secondary font-bold">Chronology</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">A Century of Lapidary Mastery</h2>
          </div>

          <div className="space-y-space-lg border-l-2 border-secondary/30 pl-space-md ml-4">
            <div className="relative space-y-1">
              <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-secondary ring-4 ring-surface-container-low"></span>
              <span className="font-label-sm text-label-sm uppercase text-secondary font-bold">1918</span>
              <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold">Founding at Ratnapura</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Master lapidary Don Carolis Senanayake establishes the private atelier near the Kalu Ganga river, providing untreated blue corundum to European royalty.
              </p>
            </div>

            <div className="relative space-y-1">
              <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-secondary ring-4 ring-surface-container-low"></span>
              <span className="font-label-sm text-label-sm uppercase text-secondary font-bold">1954</span>
              <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold">The Royal Tour Curation</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Commissioned by the Government of Ceylon to present Queen Elizabeth II with rare unheated cornflower blue sapphires during her royal visit.
              </p>
            </div>

            <div className="relative space-y-1">
              <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-secondary ring-4 ring-surface-container-low"></span>
              <span className="font-label-sm text-label-sm uppercase text-secondary font-bold">1996</span>
              <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold">Global Salon Expansion</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Private consultation suites opened on Bond Street (London) and Place Vendôme (Paris) to cater directly to private collectors and museum acquisitions.
              </p>
            </div>

            <div className="relative space-y-1">
              <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-secondary ring-4 ring-surface-container-low"></span>
              <span className="font-label-sm text-label-sm uppercase text-secondary font-bold">Present Day</span>
              <h3 className="font-headline-sm text-[18px] text-on-surface font-semibold">Digital Vault &amp; Direct Traceability</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Integrating microscopic spectroscopy and dual Swiss lab certifications with instant global armored transport to 120+ jurisdictions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
