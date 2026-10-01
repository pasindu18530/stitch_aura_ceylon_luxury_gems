import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast("Confidential Connoisseur Club Membership Lodged", "success");
    setEmail('');
  };

  return (
    <footer className="w-full bg-surface-container-low text-on-surface pt-space-xl pb-space-lg border-t border-surface-container">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-lg pb-space-xl">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-space-md">
            <Logo showText={true} />
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Safeguarding Ceylon's royal lapidary heritage since 1918. Directly curating untreated, ethically unearthed corundum and rare minerals from historic river gravels of Ratnapura and Elahera for the world's most discerning collectors.
            </p>
            <div className="flex flex-wrap gap-2 pt-space-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm uppercase">
                <span className="material-symbols-outlined text-[13px] text-secondary">lock</span>
                256-Bit Encrypted Vault
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm uppercase">
                <span className="material-symbols-outlined text-[13px] text-secondary">fingerprint</span>
                Blockchain Provenance Passport
              </span>
            </div>
          </div>

          {/* Client Services */}
          <div className="space-y-space-sm">
            <p className="font-label-lg text-label-lg uppercase tracking-[0.16em] text-primary font-bold">
              Client Services
            </p>
            <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
              <li className="hover:text-primary transition-colors">
                <Link to="/consultation">Private Salon Appointments</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link to="/custom-atelier">Bespoke Atelier Commissions</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link to="/consultation?type=virtual">360° Live Loupe Video Sessions</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link to="/account/orders">Insured Armored Transport (Brink's)</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link to="/account">Vault Storage &amp; Custody</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link to="/the-vault-heritage">Lifetime Provenance Guarantee</Link>
              </li>
            </ul>
          </div>

          {/* Lapidary & Ethics */}
          <div className="space-y-space-sm">
            <p className="font-label-lg text-label-lg uppercase tracking-[0.16em] text-primary font-bold">
              Lapidary &amp; Ethics
            </p>
            <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
              <li className="hover:text-primary transition-colors">
                <Link to="/the-vault-heritage">Ratnapura &amp; Elahera Mines</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link to="/the-vault-heritage">Artisanal Miner Cooperatives</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link to="/gemstones">SSEF &amp; Gübelin Certification</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link to="/gemstones">Zero Thermal Enhancement Policy</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link to="/the-vault-heritage">NGJA Sri Lanka Government Seals</Link>
              </li>
              <li className="hover:text-primary transition-colors">
                <Link to="/the-vault-heritage">CIBJO &amp; RJC Compliance</Link>
              </li>
            </ul>
          </div>

          {/* Connoisseur Club */}
          <div className="space-y-space-md">
            <p className="font-label-lg text-label-lg uppercase tracking-[0.16em] text-primary font-bold">
              Connoisseur Club
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Receive confidential notices on freshly unearthed unheated stones and private salon auctions.
            </p>
            <form onSubmit={handleJoin} className="space-y-2">
              <div className="flex">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-surface font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none rounded-l-lg border border-surface-container-highest"
                  placeholder="Your email address"
                  type="email"
                  required
                />
                <button
                  className="bg-primary hover:bg-surface-container-highest text-on-primary hover:text-on-surface px-4 py-2 font-label-sm text-label-sm uppercase tracking-wider rounded-r-lg transition-colors font-semibold"
                  type="submit"
                >
                  Join
                </button>
              </div>
              <p className="font-label-sm text-[10px] text-on-surface-variant">
                Strict non-disclosure. No unsolicited communication.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Accreditations and Legal Row */}
        <div className="pt-space-lg border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-md font-label-sm text-label-sm tracking-widest uppercase text-on-surface-variant">
            <span>GIA Verified</span>
            <span>•</span>
            <span>SSEF Swiss</span>
            <span>•</span>
            <span>Gübelin Certified</span>
            <span>•</span>
            <span>RJC Member</span>
            <span>•</span>
            <span>NGJA Licensed</span>
          </div>
          <div className="flex flex-wrap items-center gap-space-md font-label-sm text-label-sm uppercase text-on-surface-variant">
            <span>© 1918–2026 Serendib Impérial Haute Joaillerie S.A.</span>
            <Link to="/the-vault-heritage" className="hover:text-primary transition-colors">
              Privacy &amp; Disclosures
            </Link>
            <Link to="/the-vault-heritage" className="hover:text-primary transition-colors">
              Terms of Vault Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
