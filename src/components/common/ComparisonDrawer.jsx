import React from 'react';
import { useCompare } from '../../context/CompareContext';

export default function ComparisonDrawer() {
  const { compareList, clearCompare, setIsCompareModalOpen, compareCount } = useCompare();

  if (compareCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 max-w-4xl mx-auto w-full px-4 transition-all duration-300">
      <div className="bg-primary text-on-primary rounded-xl p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-secondary/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-fixed-dim text-[22px]">
              compare_arrows
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold text-surface-container-lowest">
                <span>{compareCount}</span> Gemstone{compareCount > 1 ? 's' : ''} Selected
              </span>
              <span className="font-body-sm text-[12px] text-surface-container-highest">
                Live Optical &amp; Ratio Analysis
              </span>
            </div>
          </div>

          {/* Thumbnails of compared stones */}
          <div className="hidden sm:flex items-center gap-2 pl-3">
            {compareList.map((stone, idx) => (
              <div key={stone.id} className="relative group">
                <img
                  className="w-10 h-10 object-cover rounded shadow border border-outline/30"
                  src={stone.image}
                  alt={stone.name}
                />
                <span className="absolute -top-1 -right-1 bg-surface-container text-primary rounded-full w-3.5 h-3.5 text-[8px] flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={clearCompare}
            className="font-label-sm text-label-sm uppercase tracking-wider text-surface-container-highest hover:text-surface-container-lowest transition-colors px-2"
          >
            Clear Tray
          </button>
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-5 py-2.5 rounded bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-[0.14em] font-semibold hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>Compare Side-by-Side</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
