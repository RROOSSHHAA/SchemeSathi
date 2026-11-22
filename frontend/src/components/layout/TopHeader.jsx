import React, { useState } from 'react';
import { Search, Globe, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmblemLogo from '../common/EmblemLogo.jsx';

export default function TopHeader({ searchQuery, setSearchQuery, onSearchSubmit, onLanguageChange, currentLanguage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-navy text-white border-b border-navy-light/40 sticky top-0 z-50 shadow-md">
      {/* Top Disclaimer & Accessibility Bar */}
      <div className="bg-navy-dark text-[11px] text-gray-300 py-1.5 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-saffron">SchemeSathi AI</span>
            <span>•</span>
            <span className="text-gray-300">National Welfare Scheme Assistance & Eligibility Portal</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="text-gray-400 hidden sm:inline">Independent Public Service Guidance</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <a href="#accessibility" className="hover:text-white transition">Screen Reader Access</a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a href="#feedback" className="hover:text-white transition">Grievance Redressal</a>
          </div>
        </div>
      </div>

      {/* Main Header Container with Generous Breathing Room */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Brand: State Emblem of India with Satyameva Jayate */}
          <Link to="/" className="flex items-center group py-0.5">
            <EmblemLogo 
              className="w-10 h-13 sm:w-11 sm:h-14 text-white group-hover:text-saffron-light transition"
              subtitle="Government of India"
            />
          </Link>

          {/* Desktop Right Controls: Navigation, Language, and Search Input */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Primary Nav Links */}
            <nav className="flex items-center space-x-6 text-sm font-medium text-gray-200">
              <Link to="/" className="text-white font-bold border-b-2 border-saffron pb-1 hover:text-saffron transition">
                Home
              </Link>
              <a href="#about" className="hover:text-white transition py-1">
                About Us
              </a>
              <Link to="/schemes" className="hover:text-white transition py-1">
                Schemes
              </Link>
              <a href="#documents" className="hover:text-white transition py-1">
                Documents
              </a>
              <a href="#contact" className="hover:text-white transition py-1">
                Contact
              </a>
            </nav>

            {/* Language Selector */}
            <div className="flex items-center space-x-1.5 text-xs text-gray-200 bg-white/10 px-3 py-1.5 rounded-md border border-white/20 shadow-xs">
              <Globe className="w-3.5 h-3.5 text-saffron" />
              <button 
                onClick={() => onLanguageChange('en')} 
                className={`hover:text-white transition ${currentLanguage === 'en' ? 'font-bold text-white underline underline-offset-4 decoration-saffron' : 'text-gray-300'}`}
              >
                English
              </button>
              <span className="text-white/30">|</span>
              <button 
                onClick={() => onLanguageChange('hi')} 
                className={`hover:text-white transition ${currentLanguage === 'hi' ? 'font-bold text-white underline underline-offset-4 decoration-saffron' : 'text-gray-300'}`}
              >
                हिन्दी
              </button>
              <span className="text-white/30">|</span>
              <button 
                onClick={() => onLanguageChange('mr')} 
                className={`hover:text-white transition ${currentLanguage === 'mr' ? 'font-bold text-white underline underline-offset-4 decoration-saffron' : 'text-gray-300'}`}
              >
                मराठी
              </button>
            </div>

            {/* Search Bar Input */}
            <form onSubmit={onSearchSubmit} className="relative w-64 xl:w-72">
              <input
                type="text"
                placeholder="Search schemes, benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-charcoal text-xs pl-3.5 pr-9 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron shadow-sm"
              />
              <button 
                type="submit" 
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-navy hover:text-saffron transition"
                title="Search Schemes"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-white/10 text-white hover:bg-white/20 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu with Full Responsive Controls */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/15 space-y-4 animate-in fade-in duration-200">
            {/* Search Input on Mobile */}
            <form onSubmit={(e) => { onSearchSubmit(e); setMobileMenuOpen(false); }} className="relative w-full">
              <input
                type="text"
                placeholder="Search schemes, benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-charcoal text-xs pl-3.5 pr-9 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col space-y-2.5 text-sm font-medium">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-white/10 text-white font-semibold"
              >
                Home
              </Link>
              <a 
                href="#about" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-white/10 text-gray-200"
              >
                About Us
              </a>
              <Link 
                to="/schemes" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-white/10 text-gray-200"
              >
                Schemes Catalogue
              </Link>
              <a 
                href="#documents" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-white/10 text-gray-200"
              >
                Required Documents
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded hover:bg-white/10 text-gray-200"
              >
                Contact & Support
              </a>
            </nav>

            {/* Language Selector on Mobile */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs px-2">
              <span className="text-gray-300 flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-saffron" />
                <span>Select Language:</span>
              </span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => onLanguageChange('en')} 
                  className={`px-2 py-1 rounded ${currentLanguage === 'en' ? 'bg-saffron text-navy font-bold' : 'text-gray-300'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => onLanguageChange('hi')} 
                  className={`px-2 py-1 rounded ${currentLanguage === 'hi' ? 'bg-saffron text-navy font-bold' : 'text-gray-300'}`}
                >
                  हिन्दी
                </button>
                <button 
                  onClick={() => onLanguageChange('mr')} 
                  className={`px-2 py-1 rounded ${currentLanguage === 'mr' ? 'bg-saffron text-navy font-bold' : 'text-gray-300'}`}
                >
                  मराठी
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
