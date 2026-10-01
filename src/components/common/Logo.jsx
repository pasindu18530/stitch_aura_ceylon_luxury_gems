import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = "h-8 w-auto", showText = true }) {
  return (
    <Link to="/" className="flex items-center gap-space-md group">
      {/* Refined Octagonal Ceylon Sapphire Gem Crest */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 60 52"
          className="h-9 w-auto text-primary"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="22,3 38,3 48,16 38,45 22,45 12,16"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
          <polygon
            points="24,7 36,7 43,17 36,41 24,41 17,17"
            stroke="#C5A880"
            strokeWidth="0.8"
            fill="none"
          />
          <line x1="22" y1="3" x2="24" y2="7" stroke="#C5A880" strokeWidth="0.8" />
          <line x1="38" y1="3" x2="36" y2="7" stroke="#C5A880" strokeWidth="0.8" />
          <line x1="48" y1="16" x2="43" y2="17" stroke="#C5A880" strokeWidth="0.8" />
          <line x1="38" y1="45" x2="36" y2="41" stroke="#C5A880" strokeWidth="0.8" />
          <line x1="22" y1="45" x2="24" y2="41" stroke="#C5A880" strokeWidth="0.8" />
          <line x1="12" y1="16" x2="17" y2="17" stroke="#C5A880" strokeWidth="0.8" />
          {/* Center Radiant Facet Star */}
          <path
            d="M30,14 L30,34 M20,24 L40,24 M23,17 L37,31 M37,17 L23,31"
            stroke="#C5A880"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
          <circle cx="30" cy="24" r="1.8" fill="#141413" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm uppercase tracking-[0.22em] text-primary font-bold transition-colors group-hover:text-secondary">
            SERENDIB IMPÉRIAL
          </span>
          <span className="font-label-sm text-label-sm tracking-[0.28em] text-secondary uppercase">
            Haute Joaillerie • Ceylon 1918
          </span>
        </div>
      )}
    </Link>
  );
}
