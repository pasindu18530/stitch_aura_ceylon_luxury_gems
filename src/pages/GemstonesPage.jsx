import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GEMSTONES, CUTS } from '../data/gemstones';
import { JEWELLERY } from '../data/jewellery';
import GemstoneCard from '../components/cards/GemstoneCard';
import JewelleryCard from '../components/cards/JewelleryCard';
import ComparisonDrawer from '../components/common/ComparisonDrawer';
import { useCurrency } from '../context/CurrencyContext';

export default function GemstonesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeTab, setActiveTab] = useState('loose'); // 'loose' | 'jewellery'
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCut, setSelectedCut] = useState('all');
  const [maxCarat, setMaxCarat] = useState(15.0);
  const [maxPrice, setMaxPrice] = useState(250000);
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [thermalFilter, setThermalFilter] = useState('all');
  const [sortBy, setSortBy] = useState('curator');
  const [viewMode, setViewMode] = useState('large'); // 'large' | 'compact' | 'table'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const { formatPrice } = useCurrency();

  // Filter gemstones
  const filteredGems = useMemo(() => {
    return GEMSTONES.filter(gem => {
      if (selectedCategory !== 'all' && gem.category !== selectedCategory) return false;
      if (selectedCut !== 'all' && gem.cut.toLowerCase() !== selectedCut.toLowerCase()) return false;
      if (gem.carat > maxCarat) return false;
      if (gem.price > maxPrice) return false;
      if (selectedOrigin !== 'all' && !gem.origin.toLowerCase().includes(selectedOrigin.toLowerCase())) return false;
      if (thermalFilter === 'unheated' && gem.thermalStatus !== 'unheated') return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'carat-desc') return b.carat - a.carat;
      return 0; // default curator
    });
  }, [selectedCategory, selectedCut, maxCarat, maxPrice, selectedOrigin, thermalFilter, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedCut('all');
    setMaxCarat(15.0);
    setMaxPrice(250000);
    setSelectedOrigin('all');
    setThermalFilter('all');
    setSortBy('curator');
  };

  const paginatedGems = filteredGems.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filteredGems.length / pageSize) || 1;

  return (
    <div className="flex flex-col w-full min-h-screen bg-surface">
      {/* Editorial Catalog Header Banner */}
      <section className="relative w-full bg-surface-container-low px-6 lg:px-12 py-10 shadow-sm overflow-hidden pt-32">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
              <span className="hover:text-primary transition-colors cursor-pointer">The Vault</span>
              <span className="text-outline">/</span>
              <span className="text-secondary font-semibold">Gemstone Register 1918</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                Direct Pit-Head Acquisitions
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest hidden sm:inline">
                SSEF • GIA Sealed
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="font-display-lg text-display-lg text-primary tracking-tight font-serif">
                The Serendib Gemstone &amp; Jewellery Vault
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                A safeguarded folio of museum-calibre unheated corundum, rare Padparadscha sapphires, and royal chrysoberyls direct from Ratnapura and Elahera river gravels.
              </p>
            </div>

            {/* Mode Toggle Segmented Pill */}
            <div className="inline-flex p-1.5 rounded-full bg-surface-container-highest shadow-inner self-start lg:self-end">
              <button
                onClick={() => setActiveTab('loose')}
                className={`px-5 py-2.5 rounded-full font-label-md text-label-md uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeTab === 'loose'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">diamond</span>
                Precious Loose Gems <span className="opacity-75 text-[10px] font-mono">({GEMSTONES.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('jewellery')}
                className={`px-5 py-2.5 rounded-full font-label-md text-label-md uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeTab === 'jewellery'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                High Jewellery <span className="opacity-75 text-[10px] font-mono">({JEWELLERY.length})</span>
              </button>
            </div>
          </div>

          {/* Active Filter Strip */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mr-2">
              Active Curation:
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm tracking-wide">
              <span>Origin: Ceylon (Sri Lanka)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary font-label-sm text-label-sm tracking-wide">
              <span className="material-symbols-outlined text-[12px] text-secondary-fixed-dim">verified</span>
              <span>Heat: 100% Unheated</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm tracking-wide">
              <span>Certification: GIA / Gübelin / SSEF</span>
            </span>
            <button
              onClick={clearAllFilters}
              className="font-label-sm text-label-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors underline ml-2 cursor-pointer"
            >
              Clear All Folio Filters
            </button>
          </div>
        </div>
      </section>

      {/* Main Exploration Matrix: Sidebar + Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Dossier (Sticky) */}
          <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 space-y-6">
            <div className="bg-surface-container-low rounded-xl p-6 shadow-sm space-y-6 border border-surface-container">
              <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">tune</span>
                  <h2 className="font-label-lg text-label-lg uppercase tracking-[0.16em] text-primary font-bold">
                    Lapidary Filter
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                  {filteredGems.length} Results
                </span>
              </div>

              {/* Specimen Classification */}
              <div className="space-y-3">
                <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary font-bold block">
                  Specimen Classification
                </span>
                <div className="space-y-2">
                  {[
                    { id: 'all', name: 'All Specimen Classes', count: GEMSTONES.length },
                    { id: 'blue', name: 'Ceylon Royal Blue', count: 4 },
                    { id: 'padparadscha', name: 'Padparadscha (Sunrise)', count: 2 },
                    { id: 'ruby', name: 'Pigeon Blood Ruby', count: 2 },
                    { id: 'alexandrite', name: 'Chrysoberyl Alexandrite', count: 2 },
                    { id: 'star', name: 'Star Sapphire (Asterism)', count: 1 }
                  ].map(cat => (
                    <label
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className="flex items-center justify-between text-body-sm font-body-sm text-on-surface cursor-pointer group"
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="classification"
                          checked={selectedCategory === cat.id}
                          onChange={() => setSelectedCategory(cat.id)}
                          className="accent-primary rounded w-4 h-4 cursor-pointer"
                        />
                        <span className={`group-hover:text-primary ${selectedCategory === cat.id ? 'font-bold text-primary' : ''}`}>
                          {cat.name}
                        </span>
                      </span>
                      <span className="font-mono text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Carat Weight Range */}
              <div className="space-y-3 pt-2 border-t border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary font-bold">
                    Carat Weight
                  </span>
                  <span className="font-mono text-[11px] text-primary font-semibold">
                    Up to {maxCarat.toFixed(2)} ct
                  </span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="15.0"
                  step="0.5"
                  value={maxCarat}
                  onChange={(e) => setMaxCarat(parseFloat(e.target.value))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setMaxCarat(3.0)}
                    className="px-2 py-1.5 bg-surface-container hover:bg-surface-container-highest text-on-surface text-[11px] font-label-sm uppercase rounded transition-colors text-center"
                  >
                    Under 3.0 ct
                  </button>
                  <button
                    onClick={() => setMaxCarat(6.0)}
                    className="px-2 py-1.5 bg-surface-container hover:bg-surface-container-highest text-on-surface text-[11px] font-label-sm uppercase rounded transition-colors text-center"
                  >
                    3.0 — 6.0 ct
                  </button>
                  <button
                    onClick={() => setMaxCarat(10.0)}
                    className="px-2 py-1.5 bg-surface-container-highest font-bold text-primary text-[11px] font-label-sm uppercase rounded transition-colors text-center"
                  >
                    6.0 — 10.0 ct
                  </button>
                  <button
                    onClick={() => setMaxCarat(15.0)}
                    className="px-2 py-1.5 bg-secondary text-on-secondary text-[11px] font-label-sm uppercase rounded transition-colors text-center font-bold"
                  >
                    10.0 ct+ Premier
                  </button>
                </div>
              </div>

              {/* Lapidary Faceting Cut Selector */}
              <div className="space-y-3 pt-2 border-t border-surface-container">
                <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary font-bold block">
                  Lapidary Faceting
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {CUTS.map(cut => (
                    <button
                      key={cut.id}
                      onClick={() => setSelectedCut(selectedCut === cut.id ? 'all' : cut.id)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                        selectedCut === cut.id
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container hover:bg-surface-container-highest text-on-surface'
                      }`}
                      title={cut.name}
                    >
                      <span className="material-symbols-outlined text-[20px]">diamond</span>
                      <span className="font-label-sm text-[9px] uppercase tracking-wider mt-1 truncate w-full">
                        {cut.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Thermal Enhancement Policy */}
              <div className="space-y-3 pt-2 border-t border-surface-container">
                <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary font-bold block">
                  Thermal Integrity
                </span>
                <div className="space-y-2">
                  <div
                    onClick={() => setThermalFilter('unheated')}
                    className={`p-3 rounded-lg space-y-1 cursor-pointer transition-colors ${
                      thermalFilter === 'unheated' ? 'bg-surface-container-highest ring-1 ring-secondary' : 'bg-surface-container'
                    }`}
                  >
                    <label className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface font-semibold cursor-pointer">
                      <input
                        type="radio"
                        name="heat_policy"
                        checked={thermalFilter === 'unheated'}
                        onChange={() => setThermalFilter('unheated')}
                        className="accent-primary"
                      />
                      <span>100% Unheated (Natural State)</span>
                    </label>
                    <p className="font-label-sm text-[10px] text-on-surface-variant pl-5 leading-normal">
                      Zero borax, lattice diffusion, or oven thermal enhancement. Intact microscopic rutile silk.
                    </p>
                  </div>
                  <div
                    onClick={() => setThermalFilter('all')}
                    className={`p-3 rounded-lg space-y-1 cursor-pointer transition-colors ${
                      thermalFilter === 'all' ? 'bg-surface-container-highest ring-1 ring-secondary' : 'bg-surface-container'
                    }`}
                  >
                    <label className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface cursor-pointer">
                      <input
                        type="radio"
                        name="heat_policy"
                        checked={thermalFilter === 'all'}
                        onChange={() => setThermalFilter('all')}
                        className="accent-primary"
                      />
                      <span>Show All Authentic Gems</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Geographic Provenance (Mines) */}
              <div className="space-y-2 pt-2 border-t border-surface-container">
                <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary font-bold block">
                  Ceylon River Basin Origin
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'Elahera', 'Ratnapura', 'Pelmadulla', 'Balangoda'].map(mine => (
                    <button
                      key={mine}
                      onClick={() => setSelectedOrigin(mine)}
                      className={`px-2.5 py-1 rounded font-label-sm text-label-sm uppercase transition-colors cursor-pointer ${
                        selectedOrigin === mine
                          ? 'bg-secondary text-on-secondary font-bold'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
                      }`}
                    >
                      {mine === 'all' ? 'All Mines' : mine}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-3 pt-2 border-t border-surface-container">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary font-bold">
                    Acquisition Tier
                  </span>
                  <span className="font-mono text-[11px] text-primary font-semibold">
                    Up to {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="250000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                  className="w-full accent-primary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              <button
                onClick={clearAllFilters}
                className="w-full py-3 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-[0.16em] rounded transition-colors flex items-center justify-center gap-2 font-semibold shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                Reset All Filters
              </button>
            </div>

            {/* Curatorial Provenance Card */}
            <div className="bg-surface-container-highest p-5 rounded-xl space-y-3 border border-surface-container">
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
                  The Serendib Guarantee
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Every gemstone features an immutable physical cryptographic passport with laser-inscribed girdle numbers matching Swiss vault ledgers.
              </p>
            </div>
          </aside>

          {/* Main Showcase Grid Area */}
          <section className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Controls Bar */}
            <div className="bg-surface-container-low rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm border border-surface-container">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-headline-sm text-[16px] text-primary font-semibold">
                  {activeTab === 'loose' ? `${filteredGems.length} Exceptional Investment Stones` : `${JEWELLERY.length} Haute Joaillerie Suites`}
                </span>
                <span className="text-outline hidden sm:inline">•</span>
                <div className="hidden sm:flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface hover:bg-secondary hover:text-on-secondary font-label-sm text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Recently Unearthed
                  </button>
                  <button
                    onClick={() => setSelectedCategory('padparadscha')}
                    className="px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface hover:bg-secondary hover:text-on-secondary font-label-sm text-[10px] uppercase tracking-wider transition-colors"
                  >
                    Padparadscha Only
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-auto">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant hidden lg:inline" htmlFor="sort-select">
                    Sort:
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-surface-container-highest text-on-surface font-label-sm text-label-sm uppercase tracking-wider px-3 py-1.5 rounded focus:outline-none cursor-pointer"
                  >
                    <option value="curator">Curator’s Choice / Investment Grade</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="carat-desc">Carat: Largest First</option>
                  </select>
                </div>

                {/* View Switchers */}
                <div className="flex items-center bg-surface-container-highest rounded p-0.5">
                  <button
                    onClick={() => setViewMode('large')}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'large' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-primary'}`}
                    title="3-Column Large Grid"
                  >
                    <span className="material-symbols-outlined text-[16px] block">grid_view</span>
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'compact' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-primary'}`}
                    title="Dense Grid"
                  >
                    <span className="material-symbols-outlined text-[16px] block">view_compact</span>
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'table' ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:text-primary'}`}
                    title="Detailed Gemological Ledger"
                  >
                    <span className="material-symbols-outlined text-[16px] block">table_rows</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid / Table */}
            {activeTab === 'loose' ? (
              viewMode === 'table' ? (
                /* Ledger Table View */
                <div className="bg-surface-container-lowest rounded-xl overflow-x-auto shadow-sm border border-surface-container">
                  <table className="w-full text-left font-body-sm text-[13px]">
                    <thead className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      <tr>
                        <th className="p-3">Specimen</th>
                        <th className="p-3">SKU</th>
                        <th className="p-3">Carat</th>
                        <th className="p-3">Cut</th>
                        <th className="p-3">Origin</th>
                        <th className="p-3">Certification</th>
                        <th className="p-3">Price</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                      {paginatedGems.map(gem => (
                        <tr key={gem.id} className="hover:bg-surface-container-low transition-colors">
                          <td className="p-3 flex items-center gap-2">
                            <img src={gem.image} alt={gem.name} className="w-10 h-10 rounded object-cover" />
                            <span className="font-medium text-primary">{gem.name}</span>
                          </td>
                          <td className="p-3 font-mono text-[11px] text-secondary font-bold">{gem.sku}</td>
                          <td className="p-3 font-mono font-bold">{gem.carat} ct</td>
                          <td className="p-3">{gem.cut}</td>
                          <td className="p-3 text-on-surface-variant">{gem.origin}</td>
                          <td className="p-3 font-mono text-[11px]">{gem.certification}</td>
                          <td className="p-3 font-mono font-bold text-primary">{formatPrice(gem.price)}</td>
                          <td className="p-3 text-right">
                            <a
                              href={`/gemstones/${gem.id}`}
                              className="px-3 py-1 bg-primary text-on-primary rounded text-[11px] uppercase font-label-sm font-semibold inline-block"
                            >
                              Inspect
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Grid View (Large or Compact) */
                <div
                  className={`grid gap-6 ${
                    viewMode === 'compact'
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                  }`}
                >
                  {paginatedGems.map(gem => (
                    <GemstoneCard key={gem.id} gem={gem} />
                  ))}
                </div>
              )
            ) : (
              /* High Jewellery Tab Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {JEWELLERY.map(piece => (
                  <JewelleryCard key={piece.id} piece={piece} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {activeTab === 'loose' && (
              <div className="bg-surface-container-low rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                    Page {currentPage} of {totalPages}
                  </span>
                  <span className="text-outline">•</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredGems.length)} of {filteredGems.length} Available Specimens
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3.5 py-1.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm uppercase disabled:opacity-40"
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3.5 py-1.5 rounded font-label-sm text-label-sm uppercase ${
                        currentPage === i + 1
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container hover:bg-surface-container-highest text-on-surface'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3.5 py-1.5 rounded bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm uppercase disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Floating Comparison Tray */}
      <ComparisonDrawer />
    </div>
  );
}
