import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GEMSTONES } from '../../data/gemstones';
import { JEWELLERY } from '../../data/jewellery';
import { useCurrency } from '../../context/CurrencyContext';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredGems = query.trim() ? GEMSTONES.filter(g =>
    g.title.toLowerCase().includes(query.toLowerCase()) ||
    g.sku.toLowerCase().includes(query.toLowerCase()) ||
    g.cut.toLowerCase().includes(query.toLowerCase()) ||
    g.origin.toLowerCase().includes(query.toLowerCase()) ||
    g.color.toLowerCase().includes(query.toLowerCase())
  ) : GEMSTONES.slice(0, 3);

  const filteredJewels = query.trim() ? JEWELLERY.filter(j =>
    j.title.toLowerCase().includes(query.toLowerCase()) ||
    j.sku.toLowerCase().includes(query.toLowerCase()) ||
    j.category.toLowerCase().includes(query.toLowerCase())
  ) : JEWELLERY.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 bg-primary/70 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div
        className="w-full max-w-3xl rounded-2xl bg-surface-container-lowest shadow-2xl border border-surface-container overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-surface-container flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary text-[24px]">search</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Ceylon Sapphires, Padparadschas, SKUs, or Haute Joaillerie suites..."
            className="flex-1 bg-transparent text-primary placeholder:text-outline font-body-md text-[17px] focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-1 rounded bg-surface-container-high font-mono text-[11px] text-on-surface-variant">
            ESC to close
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {/* Loose Gemstones Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                Certified Loose Gemstones ({filteredGems.length})
              </span>
              <Link
                to="/gemstones"
                onClick={onClose}
                className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant hover:text-primary"
              >
                View Full Vault Register →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {filteredGems.map(gem => (
                <Link
                  key={gem.id}
                  to={`/gemstones/${gem.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group"
                >
                  <img
                    src={gem.image}
                    alt={gem.name}
                    className="w-14 h-14 rounded-lg object-cover bg-surface-container"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-[10px] text-secondary font-bold uppercase truncate">
                      {gem.sku} • {gem.carat} ct
                    </span>
                    <span className="font-body-sm text-[13px] text-primary font-medium truncate group-hover:text-secondary transition-colors">
                      {gem.name}
                    </span>
                    <span className="font-mono text-[12px] font-bold text-primary">
                      {formatPrice(gem.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* High Jewellery Section */}
          <div className="space-y-3 pt-2 border-t border-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                Haute Joaillerie Suites ({filteredJewels.length})
              </span>
              <Link
                to="/jewellery"
                onClick={onClose}
                className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant hover:text-primary"
              >
                View All Suites →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredJewels.map(jewel => (
                <Link
                  key={jewel.id}
                  to={`/jewellery/${jewel.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all group"
                >
                  <img
                    src={jewel.image}
                    alt={jewel.name}
                    className="w-16 h-16 rounded-lg object-cover bg-surface-container"
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-[10px] text-secondary font-bold uppercase">
                      {jewel.edition}
                    </span>
                    <span className="font-body-sm text-[14px] text-primary font-medium group-hover:text-secondary transition-colors truncate">
                      {jewel.title}
                    </span>
                    <span className="font-mono text-[13px] font-bold text-primary">
                      {jewel.isPOA ? "Price on Application" : formatPrice(jewel.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Quick Links */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-label-sm text-[11px] uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span>Popular:</span>
            <button onClick={() => setQuery('padparadscha')} className="hover:text-primary underline">Padparadscha</button>
            <button onClick={() => setQuery('royal blue')} className="hover:text-primary underline">Royal Blue</button>
            <button onClick={() => setQuery('alexandrite')} className="hover:text-primary underline">Alexandrite</button>
            <button onClick={() => setQuery('unheated')} className="hover:text-primary underline">Unheated</button>
          </div>
          <Link to="/consultation" onClick={onClose} className="text-secondary font-bold hover:underline">
            Book Private Viewing Session →
          </Link>
        </div>
      </div>
    </div>
  );
}
