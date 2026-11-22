import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  Landmark, 
  HeartPulse, 
  Sprout, 
  Users, 
  ArrowRight,
  MessageSquare,
  Building2,
  Info
} from 'lucide-react';
import { SCHEMES_BY_CATEGORY } from '../../data/schemesCatalogue.js';

export default function ApplySchemeModal({ isOpen, onClose, onOpenChat }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    occupation: 'Student',
    schemeCategory: 'education'
  });

  const [notification, setNotification] = useState(null);

  if (!isOpen) return null;

  const currentCategoryData = SCHEMES_BY_CATEGORY[formData.schemeCategory] || SCHEMES_BY_CATEGORY.education;
  const schemesList = currentCategoryData.schemes || [];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-govborder overflow-hidden">
        
        {/* Header */}
        <div className="bg-navy text-white px-5 py-4 flex items-center justify-between border-b-2 border-saffron">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-saffron/20 border border-saffron flex items-center justify-center text-saffron font-bold text-sm">
              GOV
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold font-serif tracking-wide text-white">
                  Apply for Government Scheme (योजना अर्ज पोर्टल)
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-heritage-green text-white uppercase">
                  Verified Portals
                </span>
              </div>
              <p className="text-xs text-gray-300">
                Official Directory of Central & Maharashtra State Welfare Programs with Direct Application Links
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ephemeral Alert if any */}
        {notification && (
          <div className="bg-saffron/20 text-navy px-4 py-2 text-xs font-semibold border-b border-saffron flex items-center space-x-2">
            <Info className="w-4 h-4 text-navy shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-alabaster/30">
          
          {/* Section 1: Citizen Input Form */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-govborder shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-govborder pb-2.5">
              <h3 className="text-xs sm:text-sm font-bold text-navy uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-saffron" />
                <span>Step 1: Enter Your Details & Select Scheme Category</span>
              </h3>
              <span className="text-[11px] text-govmuted">Zero Aadhaar/Banking OTP collected</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-navy mb-1">
                  Full Name (नाव)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g. Sharwari Narvekar"
                  className="w-full bg-alabaster border border-govborder rounded-lg px-3 py-2 text-xs text-charcoal placeholder-govmuted focus:outline-hidden focus:ring-1 focus:ring-navy focus:border-navy"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-bold text-navy mb-1">
                  Age (वय)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="e.g. 21"
                  className="w-full bg-alabaster border border-govborder rounded-lg px-3 py-2 text-xs text-charcoal placeholder-govmuted focus:outline-hidden focus:ring-1 focus:ring-navy focus:border-navy"
                />
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-xs font-bold text-navy mb-1">
                  Occupation (व्यवसाय)
                </label>
                <select
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  className="w-full bg-alabaster border border-govborder rounded-lg px-3 py-2 text-xs text-charcoal focus:outline-hidden focus:ring-1 focus:ring-navy focus:border-navy"
                >
                  <option value="Student">Student (विद्यार्थी)</option>
                  <option value="Small Business Owner">Small Business / Trader (लघु व्यावसायिक)</option>
                  <option value="Farmer">Farmer (शेतकरी)</option>
                  <option value="Hospitality / Worker">Hospitality & Healthcare Worker</option>
                  <option value="Salaried Employee">Salaried / Private Employee</option>
                  <option value="Homemaker">Homemaker / Self-Help Group</option>
                  <option value="Daily Wage Labor">Daily Wage Labor (कामगार)</option>
                  <option value="Unemployed">Seeking Job / Unemployed</option>
                </select>
              </div>

              {/* Scheme For (Category Dropdown) */}
              <div>
                <label className="block text-xs font-bold text-navy mb-1">
                  Scheme For (योजनेचा प्रकार) ⭐
                </label>
                <select
                  value={formData.schemeCategory}
                  onChange={(e) => handleInputChange('schemeCategory', e.target.value)}
                  className="w-full bg-saffron/15 border border-saffron font-semibold text-navy rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:ring-1 focus:ring-navy"
                >
                  <option value="education">🎓 Education & Scholarships</option>
                  <option value="loan">🏛️ Loan, MSME & Business</option>
                  <option value="hospitality">🏥 Hospitality & Healthcare</option>
                  <option value="agriculture">🌾 Agriculture & Farming</option>
                  <option value="women">👩 Women & Child Welfare</option>
                </select>
              </div>

            </div>

            {/* Quick Helper Badge */}
            <div className="bg-alabaster/70 p-2.5 rounded-lg border border-govborder/60 flex items-center justify-between text-xs text-govmuted">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-heritage-green"></span>
                <span>Active Category: <strong className="text-navy">{currentCategoryData.categoryName}</strong></span>
              </span>
              <span>{schemesList.length} Official Government Schemes Available</span>
            </div>
          </div>

          {/* Section 2: Official Schemes Cards with Clickable Links */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-navy uppercase tracking-wider flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-heritage-green" />
                <span>Step 2: Official Schemes for {currentCategoryData.categoryName}</span>
              </h3>
              <span className="text-[11px] text-govmuted font-mono">
                Source: Official State & Central Portals
              </span>
            </div>

            {/* Schemes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schemesList.map((scheme) => (
                <div 
                  key={scheme.id}
                  className="bg-white rounded-xl border border-govborder p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3.5 hover:border-saffron"
                >
                  {/* Top Bar & Department */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-navy/10 text-navy uppercase tracking-wider">
                        {scheme.portalName}
                      </span>
                      <span className="text-[10px] font-semibold text-heritage-green flex items-center space-x-1 shrink-0">
                        <ShieldCheck className="w-3 h-3 text-heritage-green" />
                        <span>Verified Portal</span>
                      </span>
                    </div>

                    <h4 className="font-bold text-navy text-sm font-serif leading-snug">
                      {scheme.name}
                    </h4>

                    <p className="text-[11px] text-govmuted line-clamp-1">
                      {scheme.department}
                    </p>
                  </div>

                  {/* Personalized match notice if name/occupation filled */}
                  {formData.name && (
                    <div className="bg-heritage-green/10 text-heritage-green px-2.5 py-1.5 rounded text-[11px] font-medium flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-heritage-green shrink-0" />
                      <span className="truncate">
                        Citizen: <strong>{formData.name}</strong> ({formData.age ? `${formData.age} yrs, ` : ''}{formData.occupation})
                      </span>
                    </div>
                  )}

                  {/* Key Benefits Box */}
                  <div className="bg-alabaster p-3 rounded-lg border border-govborder space-y-1 text-xs">
                    <span className="font-bold text-navy text-[11px] uppercase tracking-wider block">
                      Benefit & Assistance:
                    </span>
                    <p className="text-charcoal-light leading-relaxed text-[11px]">
                      {scheme.benefits}
                    </p>
                  </div>

                  {/* Required Documents Pills */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-govmuted uppercase tracking-wider block">
                      Required Documents:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {scheme.documents.slice(0, 3).map((doc, idx) => (
                        <span 
                          key={idx}
                          className="bg-white border border-govborder px-2 py-0.5 rounded text-[10px] text-charcoal-light"
                        >
                          {doc}
                        </span>
                      ))}
                      {scheme.documents.length > 3 && (
                        <span className="text-[10px] text-govmuted self-center">
                          +{scheme.documents.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons: CLICKABLE OFFICIAL PORTAL LINK */}
                  <div className="pt-2 border-t border-govborder/70 flex flex-col sm:flex-row items-center gap-2">
                    
                    {/* Primary Button: Clickable Official Portal URL */}
                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 bg-navy hover:bg-navy-light text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-xs transition group cursor-pointer"
                    >
                      <span>Apply on {scheme.portalName.split('.')[0]} Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 text-saffron group-hover:translate-x-0.5 transition" />
                    </a>

                    {/* Secondary Button: Ask Live Sahayak */}
                    {onOpenChat && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenChat(scheme);
                        }}
                        className="w-full sm:w-auto px-2.5 py-2 rounded-lg border border-saffron bg-saffron/10 text-navy hover:bg-saffron/20 text-xs font-semibold flex items-center justify-center space-x-1 transition cursor-pointer"
                        title="Chat with AI Mentor about this scheme"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-saffron" />
                        <span className="hidden sm:inline">Ask Sahayak</span>
                      </button>
                    )}

                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-alabaster px-5 py-3 border-t border-govborder flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-govmuted">
            <ShieldCheck className="w-4 h-4 text-heritage-green" />
            <span>All links lead to certified government servers (`.gov.in`, `.nic.in`, `maharashtra.gov.in`). Zero third-party fees.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-white border border-govborder rounded-lg font-semibold text-charcoal hover:bg-gray-100 transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
