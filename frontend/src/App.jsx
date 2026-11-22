import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopHeader from './components/layout/TopHeader.jsx';
import SubNavBar from './components/layout/SubNavBar.jsx';
import HeroBanner from './components/home/HeroBanner.jsx';
import FeaturedSchemes from './components/home/FeaturedSchemes.jsx';
import NewsAnnouncements from './components/home/NewsAnnouncements.jsx';
import ImportantLinks from './components/home/ImportantLinks.jsx';
import PortalFooter from './components/layout/PortalFooter.jsx';
import SchemeDetailModal from './components/home/SchemeDetailModal.jsx';
import QuickQuestionnaireModal from './components/home/QuickQuestionnaireModal.jsx';
import api from './services/api.js';

function HomePage() {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [backendHealth, setBackendHealth] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    api.get('/health')
      .then((res) => {
        if (res.success) {
          setBackendHealth(res.data);
        }
      })
      .catch((err) => {
        console.warn('Backend API connection check:', err.message);
      });
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setNotification(`Searching official registry for: "${searchQuery}"...`);
    setTimeout(() => {
      setIsQuestionnaireOpen(true);
      setNotification(null);
    }, 600);
  };

  const handleActionClick = (action) => {
    if (action === 'questionnaire' || action === 'rules') {
      setIsQuestionnaireOpen(true);
    } else if (action === 'schemes') {
      setSelectedScheme({
        id: 'pmjay',
        name: 'Ayushman Bharat (PM-JAY)',
        category: 'Healthcare Assurance',
        department: 'National Health Authority (NHA), Ministry of Health',
        summary: 'World\'s largest healthcare assurance scheme offering ₹5 Lakh cover per eligible family per year across secondary and tertiary medical treatments.',
        benefit: '₹5,00,000 cashless family health protection per year.',
        eligibility: 'Identified rural deprivation criteria and urban occupational categories under SECC database.',
        officialUrl: 'https://pmjay.gov.in'
      });
    } else if (action === 'security') {
      setNotification('Security Status: Zero Aadhaar OTPs or UPI PINs collected. Strict RLS and Helmet protection active.');
      setTimeout(() => setNotification(null), 5000);
    } else {
      setNotification('Citizen Assistance Helpline: 1800-11-0031 (Toll-free National Welfare Desk)');
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-alabaster flex flex-col font-sans text-charcoal">
      
      {/* 1. Official Government-Style Top Header */}
      <TopHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* 2. Sub-Navigation Bar */}
      <SubNavBar />

      {/* Ephemeral Alert Bar if triggered */}
      {notification && (
        <div className="bg-saffron text-navy px-4 py-2 text-xs font-semibold text-center border-b border-navy/20 animate-fade-in flex items-center justify-center space-x-2">
          <span>🔔</span>
          <span>{notification}</span>
        </div>
      )}

      {/* 3. Hero Section matching reference image */}
      <HeroBanner 
        onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)} 
      />

      {/* 4. Main Content Area matching the 3-column reference layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Backend Connectivity Status Pill */}
        <div className="mb-6 flex items-center justify-between text-xs text-govmuted bg-white px-3.5 py-2 rounded border border-govborder shadow-xs">
          <div className="flex items-center space-x-2">
            <span className={`w-2.5 h-2.5 rounded-full ${backendHealth?.status === 'operational' ? 'bg-heritage-green animate-pulse' : 'bg-govwarning'}`}></span>
            <span className="font-medium text-navy">
              Digital Service Engine: {backendHealth?.status === 'operational' ? 'Operational & Connected' : 'Connecting to Backend API...'}
            </span>
          </div>
          <span className="hidden sm:inline text-charcoal-light">
            Host: port 5000 (REST) • Client: port 5173 (Vite)
          </span>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Column 1: Featured Schemes (approx 5 cols on lg) */}
          <div className="lg:col-span-5">
            <FeaturedSchemes 
              onSelectScheme={(scheme) => setSelectedScheme(scheme)} 
            />
          </div>

          {/* Column 2: Latest News & Announcements (approx 4 cols on lg) */}
          <div className="lg:col-span-4">
            <NewsAnnouncements 
              onSelectAnnouncement={(item) => {
                setNotification(`Announcement [${item.date}]: ${item.title}`);
                setTimeout(() => setNotification(null), 4000);
              }}
            />
          </div>

          {/* Column 3: Important Quick Links (approx 3 cols on lg) */}
          <div className="lg:col-span-3">
            <ImportantLinks 
              onAction={handleActionClick} 
            />
          </div>

        </div>

      </main>

      {/* 5. Official Government-Style Portal Footer */}
      <PortalFooter />

      {/* Interactive Modals */}
      <SchemeDetailModal 
        scheme={selectedScheme}
        onClose={() => setSelectedScheme(null)}
        onCheckEligibility={(scheme) => {
          setSelectedScheme(null);
          setIsQuestionnaireOpen(true);
        }}
      />

      <QuickQuestionnaireModal 
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
