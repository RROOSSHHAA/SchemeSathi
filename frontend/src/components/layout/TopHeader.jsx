import React from 'react';
import { Search, Globe, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopHeader({ searchQuery, setSearchQuery, onSearchSubmit, onLanguageChange, currentLanguage }) {
  return (
    <header className="bg-navy text-white border-b border-navy-light/40 sticky top-0 z-50 shadow-md">
      {/* Micro Top Bar with Disclaimer */}
      <div className="bg-navy-dark text-[11px] text-gray-300 py-1 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-saffron">SchemeSathi AI</span>
            <span>•</span>
            <span>Digital Public Services Assistance Platform for India</span>
          </div>
          <div className="flex items-center space-x-4 text-[10px]">
            <span className="text-gray-400">Independent Assistance Portal</span>
            <span className="hidden sm:inline">|</span>
            <a href="#accessibility" className="hover:text-white transition">Screen Reader Access</a>
            <span className="hidden sm:inline">|</span>
            <a href="#feedback" className="hover:text-white transition">Citizen Grievance</a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Left Brand: Emblem & Bilingual Title */}
          <Link to="/" className="flex items-center space-x-3.5 group">
            {/* Emblem Seal Motif */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-light to-navy-dark border-2 border-saffron/80 flex items-center justify-center shadow-inner">
                <svg className="w-8 h-8 text-saffron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                  <circle cx="12" cy="12" r="3" fill="#D6A45B" fillOpacity="0.4" />
                </svg>
              </div>
            </div>

            {/* Typography: Hindi + English official styling */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-bold tracking-tight text-white font-serif">भारत सरकार</span>
                <span className="text-xs text-saffron font-medium">| योजनासाथी</span>
              </div>
              <span className="text-xs uppercase tracking-wider text-gray-300 font-semibold">
                Ministry of Citizen Services & Welfare AI
              </span>
            </div>
          </Link>

          {/* Right Controls: Navigation, Language, and Search Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-5">
            {/* Nav Links */}
            <nav className="flex items-center space-x-4 text-xs font-medium text-gray-200">
              <Link to="/" className="text-white font-bold border-b-2 border-saffron pb-0.5 hover:text-saffron transition">
                Home
              </Link>
              <a href="#about" className="hover:text-white transition">
                About Us
              </a>
              <Link to="/schemes" className="hover:text-white transition">
                Schemes
              </Link>
              <a href="#documents" className="hover:text-white transition">
                Documents
              </a>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="flex items-center space-x-1 text-xs text-gray-200 bg-white/10 px-2.5 py-1.5 rounded border border-white/20">
                <Globe className="w-3.5 h-3.5 text-saffron" />
                <button 
                  onClick={() => onLanguageChange('en')} 
                  className={`hover:text-white transition ${currentLanguage === 'en' ? 'font-bold text-white' : 'text-gray-300'}`}
                >
                  English
                </button>
                <span className="text-gray-400">|</span>
                <button 
                  onClick={() => onLanguageChange('hi')} 
                  className={`hover:text-white transition ${currentLanguage === 'hi' ? 'font-bold text-white' : 'text-gray-300'}`}
                >
                  हिन्दी
                </button>
                <span className="text-gray-400">|</span>
                <button 
                  onClick={() => onLanguageChange('mr')} 
                  className={`hover:text-white transition ${currentLanguage === 'mr' ? 'font-bold text-white' : 'text-gray-300'}`}
                >
                  मराठी
                </button>
              </div>

              {/* Search Bar Input */}
              <form onSubmit={onSearchSubmit} className="relative flex-1 sm:w-56 md:w-64">
                <input
                  type="text"
                  placeholder="Search schemes, benefits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-charcoal text-xs pl-3 pr-8 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-saffron shadow-sm"
                />
                <button 
                  type="submit" 
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-navy hover:text-saffron transition p-0.5"
                  title="Search"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
