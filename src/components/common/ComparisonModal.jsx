import React from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../../context/CompareContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function ComparisonModal() {
  const { compareList, toggleCompare, clearCompare, isCompareModalOpen, setIsCompareModalOpen } = useCompare();
  const { formatPrice } = useCurrency();

  if (!isCompareModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-primary/75 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="w-full max-w-5xl rounded-2xl bg-surface-container-lowest shadow-2xl border border-surface-container overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-surface-container flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">compare_arrows</span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif">
                Gemological Side-by-Side Comparison
              </h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Cross-examining optical indices, carat spreads, and certified provenance ledgers.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant hover:text-primary"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto p-6 flex-1">
          {compareList.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <span className="material-symbols-outlined text-4xl text-outline-variant">diamond</span>
              <p className="font-body-md text-on-surface-variant">
                No gemstones currently selected for comparison.
              </p>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm uppercase tracking-wider"
              >
                Return to Gemstone Vault
              </button>
            </div>
          ) : (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="p-3 font-label-sm text-label-sm uppercase text-on-surface-variant border-b border-surface-container w-44">
                    Attribute
                  </th>
                  {compareList.map(gem => (
                    <th key={gem.id} className="p-3 border-b border-surface-container min-w-[200px]">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <img
                          src={gem.image}
                          alt={gem.name}
                          className="w-24 h-24 rounded-lg object-cover bg-surface-container shadow-sm"
                        />
                        <span className="font-headline-sm text-[15px] font-medium text-primary line-clamp-2">
                          {gem.name}
                        </span>
                        <span className="font-mono text-[14px] font-bold text-primary">
                          {formatPrice(gem.price)}
                        </span>
                        <div className="flex items-center gap-2 pt-1">
                          <Link
                            to={`/gemstones/${gem.id}`}
                            onClick={() => setIsCompareModalOpen(false)}
                            className="font-label-sm text-[10px] uppercase tracking-wider px-2.5 py-1 rounded bg-primary text-on-primary font-semibold"
                          >
                            Inspect
                          </Link>
                          <button
                            onClick={() => toggleCompare(gem)}
                            className="text-on-surface-variant hover:text-error text-[10px] uppercase font-label-sm"
                            title="Remove"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container text-body-sm font-body-sm">
                <tr>
                  <td className="p-3 font-label-sm text-[11px] uppercase text-secondary font-bold">Carat Weight</td>
                  {compareList.map(gem => (
                    <td key={gem.id} className="p-3 text-center font-mono font-bold text-primary">
                      {gem.carat} ct
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-label-sm text-[11px] uppercase text-secondary font-bold">Cut &amp; Faceting</td>
                  {compareList.map(gem => (
                    <td key={gem.id} className="p-3 text-center font-medium">
                      {gem.cut} ({gem.cutDetails || gem.cut})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-label-sm text-[11px] uppercase text-secondary font-bold">Thermal Integrity</td>
                  {compareList.map(gem => (
                    <td key={gem.id} className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary font-label-sm text-[10px] uppercase font-bold">
                        {gem.thermal}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-label-sm text-[11px] uppercase text-secondary font-bold">Mine Provenance</td>
                  {compareList.map(gem => (
                    <td key={gem.id} className="p-3 text-center text-on-surface">
                      {gem.mine || gem.origin}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-label-sm text-[11px] uppercase text-secondary font-bold">Lab Certification</td>
                  {compareList.map(gem => (
                    <td key={gem.id} className="p-3 text-center font-mono text-[12px]">
                      {gem.certification}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-label-sm text-[11px] uppercase text-secondary font-bold">Price per Carat</td>
                  {compareList.map(gem => (
                    <td key={gem.id} className="p-3 text-center font-mono text-on-surface-variant">
                      ~{formatPrice(gem.pricePerCarat)} / ct
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-label-sm text-[11px] uppercase text-secondary font-bold">Clarity Grade</td>
                  {compareList.map(gem => (
                    <td key={gem.id} className="p-3 text-center font-medium">
                      {gem.clarity}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
