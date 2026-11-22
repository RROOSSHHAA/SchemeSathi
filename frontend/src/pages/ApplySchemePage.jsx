import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopHeader from '../components/layout/TopHeader.jsx';
import SubNavBar from '../components/layout/SubNavBar.jsx';
import PortalFooter from '../components/layout/PortalFooter.jsx';
import NexconnChatModal from '../components/chat/NexconnChatModal.jsx';
import { 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  MessageSquare,
  ArrowRight,
  Info
} from 'lucide-react';
import { SCHEMES_BY_CATEGORY } from '../data/schemesCatalogue.js';

export default function ApplySchemePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    occupation: 'Student',
    schemeCategory: 'education'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isNexconnChatOpen, setIsNexconnChatOpen] = useState(false);
  const [chatSchemeContext, setChatSchemeContext] = useState(null);

  const currentCategoryData = SCHEMES_BY_CATEGORY[formData.schemeCategory] || SCHEMES_BY_CATEGORY.education;
  const schemesList = currentCategoryData.schemes || [];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) navigate(`/schemes?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-alabaster flex flex-col font-sans text-charcoal">
      
      {/* 1. Header & SubNav */}
      <TopHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <SubNavBar onOpenApply={() => window.scrollTo({ top: 150, behavior: 'smooth' })} />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full space-y-8">
        
        {/* Page Banner Title */}
        <div className="bg-white p-6 rounded-xl border border-govborder shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-saffron-dark uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-heritage-green animate-pulse" />
              <span>Official Government Scheme Application Portal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-navy">
              Apply for Welfare Schemes (योजना अर्ज व माहिती)
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-light mt-1">
              Enter your details, select your welfare category (Education, Loans, Healthcare, Farmers, Women), and access official government portals directly.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setChatSchemeContext(null);
                setIsNexconnChatOpen(true);
              }}
              className="px-4 py-2.5 bg-navy hover:bg-navy-light text-white text-xs font-semibold rounded-lg flex items-center space-x-2 shadow-xs transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-saffron" />
              <span>Ask Live Sahayak (Nexconn)</span>
            </button>
          </div>
        </div>

        {/* Section 1: Form Inputs */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-govborder shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-govborder pb-3">
            <h2 className="text-sm sm:text-base font-bold text-navy uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-saffron" />
              <span>Step 1: Enter Citizen Details & Choose "Scheme For"</span>
            </h2>
            <span className="text-xs text-heritage-green font-medium flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero Aadhaar OTP / Bank PIN Collected</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Full Name (पूर्ण नाव)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g. Sharwari Narvekar"
                className="w-full bg-alabaster border border-govborder rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-charcoal placeholder-govmuted focus:outline-hidden focus:ring-1 focus:ring-navy focus:border-navy"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Age (वय)
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder="e.g. 21"
                className="w-full bg-alabaster border border-govborder rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-charcoal placeholder-govmuted focus:outline-hidden focus:ring-1 focus:ring-navy focus:border-navy"
              />
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Occupation (व्यवसाय)
              </label>
              <select
                value={formData.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                className="w-full bg-alabaster border border-govborder rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-charcoal focus:outline-hidden focus:ring-1 focus:ring-navy focus:border-navy"
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

            {/* Scheme For (Dropdown) */}
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">
                Scheme For (योजनेचा प्रकार) ⭐
              </label>
              <select
                value={formData.schemeCategory}
                onChange={(e) => handleInputChange('schemeCategory', e.target.value)}
                className="w-full bg-saffron/15 border-2 border-saffron font-bold text-navy rounded-lg px-3.5 py-2.5 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-navy"
              >
                <option value="education">🎓 Education & Scholarships</option>
                <option value="loan">🏛️ Loan, MSME & Business</option>
                <option value="hospitality">🏥 Hospitality & Healthcare</option>
                <option value="agriculture">🌾 Agriculture & Farming</option>
                <option value="women">👩 Women & Child Welfare</option>
              </select>
            </div>

          </div>

          {/* Quick Helper Info */}
          <div className="bg-alabaster/80 p-3 rounded-lg border border-govborder flex items-center justify-between text-xs text-govmuted">
            <span>
              Showing Verified Schemes for: <strong className="text-navy">{currentCategoryData.categoryName}</strong>
            </span>
            <span className="font-mono text-navy font-semibold">
              {schemesList.length} Official Schemes Listed
            </span>
          </div>
        </div>

        {/* Section 2: Schemes Cards with Clickable Official Links */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-navy uppercase tracking-wider flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-heritage-green" />
              <span>Step 2: Available Official Government Schemes & Direct Links</span>
            </h2>
            <span className="text-xs text-govmuted font-mono">
              Traceable Government Portals
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {schemesList.map((scheme) => (
              <div 
                key={scheme.id}
                className="bg-white rounded-xl border border-govborder p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4 hover:border-saffron"
              >
                {/* Header of Scheme Card */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-navy/10 text-navy uppercase tracking-wider">
                      {scheme.portalName}
                    </span>
                    <span className="text-[11px] font-semibold text-heritage-green flex items-center space-x-1 shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-heritage-green" />
                      <span>Certified Portal</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-navy text-base font-serif leading-snug">
                    {scheme.name}
                  </h3>

                  <p className="text-xs text-govmuted">
                    {scheme.department}
                  </p>
                </div>

                {/* Personalized Eligibility Badge */}
                {formData.name && (
                  <div className="bg-heritage-green/10 text-heritage-green px-3 py-2 rounded-lg text-xs font-medium flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-heritage-green shrink-0" />
                    <span>
                      Eligible Citizen: <strong>{formData.name}</strong> ({formData.age ? `${formData.age} years old, ` : ''}{formData.occupation})
                    </span>
                  </div>
                )}

                {/* Benefits */}
                <div className="bg-alabaster p-3.5 rounded-lg border border-govborder space-y-1 text-xs">
                  <span className="font-bold text-navy text-xs uppercase tracking-wider block">
                    Assistance & Key Benefit:
                  </span>
                  <p className="text-charcoal-light leading-relaxed">
                    {scheme.benefits}
                  </p>
                </div>

                {/* Required Documents */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-govmuted uppercase tracking-wider block">
                    Standard Checklist:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.documents.map((doc, idx) => (
                      <span 
                        key={idx}
                        className="bg-alabaster border border-govborder px-2.5 py-1 rounded text-[11px] text-charcoal-light"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CLICKABLE OFFICIAL GOVERNMENT PORTAL LINK BUTTON */}
                <div className="pt-3 border-t border-govborder flex flex-col sm:flex-row items-center gap-2.5">
                  
                  {/* The Official Clickable URL */}
                  <a
                    href={scheme.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 bg-navy hover:bg-navy-light text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 shadow-xs transition group cursor-pointer"
                  >
                    <span>Visit {scheme.portalName.split('.')[0]} Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-saffron group-hover:translate-x-0.5 transition" />
                  </a>

                  {/* Ask Sahayak (Nexconn) */}
                  <button
                    onClick={() => {
                      setChatSchemeContext(scheme);
                      setIsNexconnChatOpen(true);
                    }}
                    className="w-full sm:w-auto px-3.5 py-2.5 rounded-lg border border-saffron bg-saffron/10 text-navy hover:bg-saffron/20 text-xs font-semibold flex items-center justify-center space-x-1.5 transition cursor-pointer"
                    title="Ask AI Mentor about this scheme"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-saffron" />
                    <span>Live Helpdesk</span>
                  </button>

                </div>

              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <PortalFooter />

      {/* Nexconn Live Chat Modal */}
      <NexconnChatModal
        isOpen={isNexconnChatOpen}
        onClose={() => setIsNexconnChatOpen(false)}
        initialScheme={chatSchemeContext}
      />

    </div>
  );
}
