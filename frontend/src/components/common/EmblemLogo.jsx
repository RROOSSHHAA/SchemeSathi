import React from 'react';

/**
 * State Emblem of India vector with Lion Capital of Ashoka,
 * Ashoka Chakra, and "सत्यमेव जयते" (Satyameva Jayate) inscription.
 */
export default function EmblemLogo({ className = "w-11 h-14", textColor = "text-white", subtitle = "Government of India" }) {
  return (
    <div className="flex items-center space-x-3.5 select-none">
      {/* Lion Capital of Ashoka SVG Emblem */}
      <div className="flex flex-col items-center flex-shrink-0">
        <svg 
          viewBox="0 0 100 135" 
          className={className} 
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="State Emblem of India with Satyameva Jayate"
        >
          {/* Central Ashoka Lion Head & Mane */}
          <path d="M50 8 C44 8 40 12 38 18 C35 17 31 19 30 23 C28 22 25 24 25 28 C22 29 20 33 21 37 C18 40 18 45 20 49 C18 53 19 58 22 62 C25 65 29 67 34 68 C36 71 40 73 45 74 L45 78 L55 78 L55 74 C60 73 64 71 66 68 C71 67 75 65 78 62 C81 58 82 53 80 49 C82 45 82 40 79 37 C80 33 78 29 75 28 C75 24 72 22 70 23 C69 19 65 17 62 18 C60 12 56 8 50 8 Z" fill="currentColor" fillOpacity="0.95" />
          
          {/* Facial contours & stylized lion features */}
          <ellipse cx="44" cy="32" rx="2.5" ry="3.5" fill="#142B4A" />
          <ellipse cx="56" cy="32" rx="2.5" ry="3.5" fill="#142B4A" />
          <path d="M47 38 L53 38 L50 44 Z" fill="#142B4A" />
          <path d="M42 48 Q50 54 58 48 Q50 51 42 48 Z" fill="#142B4A" />

          {/* Left Profile Lion */}
          <path d="M26 28 C20 30 16 35 15 42 C14 48 16 54 20 58 C22 56 24 53 25 49 C23 45 23 40 25 36 Z" fill="currentColor" fillOpacity="0.85" />
          
          {/* Right Profile Lion */}
          <path d="M74 28 C80 30 84 35 85 42 C86 48 84 54 80 58 C78 56 76 53 75 49 C77 45 77 40 75 36 Z" fill="currentColor" fillOpacity="0.85" />

          {/* Abacus / Pedestal */}
          <rect x="18" y="79" width="64" height="6" rx="2" fill="currentColor" fillOpacity="0.9" />
          
          {/* Central Ashoka Chakra on Abacus */}
          <circle cx="50" cy="94" r="9" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <circle cx="50" cy="94" r="2" fill="currentColor" />
          {/* 8 representative radial spokes */}
          <path d="M50 85 L50 103 M41 94 L59 94 M43.6 87.6 L56.4 100.4 M43.6 100.4 L56.4 87.6" stroke="currentColor" strokeWidth="1" />
          
          {/* Left Galloping Horse Motif */}
          <path d="M26 91 C28 89 31 89 33 91 C35 93 33 97 30 97 C27 97 25 94 26 91 Z" fill="currentColor" fillOpacity="0.8" />
          
          {/* Right Charging Bull Motif */}
          <path d="M68 91 C70 89 73 89 75 91 C77 93 75 97 72 97 C69 97 67 94 68 91 Z" fill="currentColor" fillOpacity="0.8" />

          {/* Base Platform */}
          <path d="M12 105 L88 105 L83 111 L17 111 Z" fill="currentColor" fillOpacity="0.9" />

          {/* Devanagari Script: सत्यमेव जयते (Satyameva Jayate) */}
          <text 
            x="50" 
            y="126" 
            textAnchor="middle" 
            fill="currentColor" 
            fontSize="10.5" 
            fontWeight="bold" 
            fontFamily="'Tiro Devanagari Hindi', 'Noto Sans Devanagari', 'Mangal', 'Segoe UI Historic', serif"
            letterSpacing="0.8"
          >
            सत्यमेव जयते
          </text>
        </svg>
      </div>

      {/* Official Bilingual Title Block */}
      <div className={`flex flex-col leading-tight ${textColor}`}>
        <span className="text-base sm:text-lg font-bold tracking-tight font-serif">
          भारत सरकार
        </span>
        <span className="text-xs sm:text-sm font-semibold tracking-wide text-gray-200">
          {subtitle}
        </span>
        <span className="text-[10px] sm:text-[11px] text-saffron font-medium tracking-wider uppercase mt-0.5">
          SchemeSathi AI • Citizen Services Portal
        </span>
      </div>
    </div>
  );
}
