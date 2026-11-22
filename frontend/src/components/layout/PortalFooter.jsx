import React from 'react';
import { Link } from 'react-router-dom';

export default function PortalFooter() {
  return (
    <footer className="bg-navy text-white border-t-4 border-saffron mt-16 lg:mt-24">
      {/* Top Footer Section with Generous Padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 border-b border-white/10 pb-10">
          
          {/* Left: State Emblem of India with Satyameva Jayate */}
          <div className="flex items-center">
            <img
              src="/assets/satyameva-jayate.webp"
              alt="Satyameva Jayate emblem"
              className="h-20 w-auto object-contain bg-white rounded-md p-1"
            />
          </div>

          {/* Middle: Horizontal Nav Links with Good Spacing */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-gray-200 font-medium">
            <Link to="/" className="hover:text-saffron transition">Home</Link>
            <Link to="/about" className="hover:text-saffron transition">About Us</Link>
            <Link to="/schemes" className="hover:text-saffron transition">Schemes</Link>
            <Link to="/documents" className="hover:text-saffron transition">Documents</Link>
          </nav>

        </div>

        {/* Bottom Legal & Security Disclaimer with Generous Breathing Room */}
        <div className="pt-8 text-center space-y-3">
          <p className="text-xs sm:text-sm text-gray-300 font-medium">
            © 2026 Ministry of Citizen Services & SchemeSathi AI, Government of India Assistance Portal.
          </p>
          <p className="text-[11px] sm:text-xs text-gray-400 max-w-4xl mx-auto leading-relaxed">
            <strong>Important Citizen Disclaimer:</strong> SchemeSathi AI is an independent digital public assistance and scheme discovery initiative. 
            We strictly do not collect Aadhaar OTPs, bank passwords or UPI PINs. All welfare grant determinations and official application submissions 
            are governed exclusively by the authorized Central and State Government departments.
          </p>
        </div>

      </div>
    </footer>
  );
}
