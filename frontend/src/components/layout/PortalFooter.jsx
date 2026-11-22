import React from 'react';
import { Link } from 'react-router-dom';

export default function PortalFooter() {
  return (
    <footer className="bg-navy text-white border-t-4 border-saffron mt-12">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
          
          {/* Left: Official Emblem & Ministry Branding */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-full bg-navy-light/80 border-2 border-saffron flex items-center justify-center flex-shrink-0 shadow-inner">
              <svg className="w-7 h-7 text-saffron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
                <circle cx="12" cy="12" r="2.5" fill="#D6A45B" fillOpacity="0.5" />
              </svg>
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white font-serif block">
                भारत सरकार
              </span>
              <span className="text-xs uppercase tracking-wider text-saffron-light font-semibold block">
                Ministry of Citizen Services & Welfare AI
              </span>
              <span className="text-[11px] text-gray-300 block">
                SchemeSathi AI Digital Public Assistance Initiative
              </span>
            </div>
          </div>

          {/* Middle: Horizontal Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-200 font-medium">
            <Link to="/" className="hover:text-saffron transition">Home</Link>
            <a href="#about" className="hover:text-saffron transition">About Us</a>
            <Link to="/schemes" className="hover:text-saffron transition">Schemes</Link>
            <a href="#documents" className="hover:text-saffron transition">Documents</a>
            <a href="#contact" className="hover:text-saffron transition">Contact</a>
          </nav>

          {/* Right: Social Media Icons matching reference layout */}
          <div className="flex items-center space-x-3 text-white">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-saffron hover:text-navy transition flex items-center justify-center text-xs font-bold"
              aria-label="Facebook"
            >
              f
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-saffron hover:text-navy transition flex items-center justify-center text-xs font-bold"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-saffron hover:text-navy transition flex items-center justify-center text-xs font-bold"
              aria-label="Twitter / X"
            >
              𝕏
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-saffron hover:text-navy transition flex items-center justify-center text-xs font-bold"
              aria-label="YouTube / Media"
            >
              ▶
            </a>
          </div>

        </div>

        {/* Bottom Legal & Security Disclaimer */}
        <div className="pt-6 text-center space-y-2">
          <p className="text-xs text-gray-300 font-medium">
            © 2026 Ministry of Citizen Services & SchemeSathi AI, Government of India Assistance Portal.
          </p>
          <p className="text-[11px] text-gray-400 max-w-4xl mx-auto leading-relaxed">
            <strong>Important Citizen Disclaimer:</strong> SchemeSathi AI is an independent citizen assistance and scheme discovery platform. 
            We do not collect Aadhaar OTPs, bank passwords or UPI PINs. All benefit grants and official applications are governed exclusively 
            by the respective Central and State Government departments.
          </p>
        </div>

      </div>
    </footer>
  );
}
