import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TopHeader from './components/layout/TopHeader.jsx';
import SubNavBar from './components/layout/SubNavBar.jsx';
import HeroBanner from './components/home/HeroBanner.jsx';
import FeaturedSchemes from './components/home/FeaturedSchemes.jsx';
import NewsAnnouncements from './components/home/NewsAnnouncements.jsx';
import ImportantLinks from './components/home/ImportantLinks.jsx';
import PortalFooter from './components/layout/PortalFooter.jsx';
import SchemeDetailModal from './components/home/SchemeDetailModal.jsx';
import QuickQuestionnaireModal from './components/home/QuickQuestionnaireModal.jsx';
import StateSchemeDirectory from './components/home/StateSchemeDirectory.jsx';
import SchemeDirectory from './components/home/SchemeDirectory.jsx';
import NexconnChatModal from './components/chat/NexconnChatModal.jsx';
import NexconnChatBot from './components/chat/NexconnChatBot.jsx';
import ApplySchemeModal from './components/apply/ApplySchemeModal.jsx';
import ApplySchemePage from './pages/ApplySchemePage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import DocumentsPage from './pages/DocumentsPage.jsx';
import FloatingSahayakButton from './components/chat/FloatingSahayakButton.jsx';
import { MessageSquare } from 'lucide-react';
import api from './services/api.js';

function HomePage() {
  const navigate = useNavigate();
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [isNexconnChatOpen, setIsNexconnChatOpen] = useState(false);
  const [startWithVoice, setStartWithVoice] = useState(false);
  const [chatSchemeContext, setChatSchemeContext] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [activeApplyScheme, setActiveApplyScheme] = useState(null);
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
    const query = searchQuery.trim();
    if (!query) return;
    navigate(`/schemes?q=${encodeURIComponent(query)}`);
  };

  const handleApplyClick = (scheme) => {
    setActiveApplyScheme(scheme);
    setIsApplyModalOpen(true);
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
        officialUrl: 'https://pmjay.gov.in',
        documents: [
          'Aadhaar or Aadhaar enrolment ID',
          'Ration card or SECC beneficiary ID',
          'Family identification document',
          'Active mobile number'
        ]
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
      <TopHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <SubNavBar />

      {notification && (
        <div className="bg-saffron text-navy px-4 py-2.5 text-xs font-semibold text-center border-b border-navy/20 animate-fade-in flex items-center justify-center space-x-2">
          <span>🔔</span>
          <span>{notification}</span>
        </div>
      )}

      <HeroBanner 
        onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 flex-1 w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-govmuted bg-white px-4 py-3 rounded-lg border border-govborder shadow-xs">
          <div className="flex items-center space-x-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${backendHealth?.status === 'operational' ? 'bg-heritage-green animate-pulse' : 'bg-govwarning'}`}></span>
            <span className="font-semibold text-navy">
              Digital Service Engine: {backendHealth?.status === 'operational' ? 'Operational & Connected' : 'Connecting to Backend API...'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-7">
            <FeaturedSchemes 
              onSelectScheme={(scheme) => setSelectedScheme(scheme)} 
            />
          </div>

          <StateSchemeDirectory />

          <div className="lg:col-span-5">
            <NewsAnnouncements 
              onSelectAnnouncement={(item) => {
                setNotification(`Announcement [${item.date}]: ${item.title}`);
                setTimeout(() => setNotification(null), 4000);
              }}
            />
          </div>
        </div>
      </main>

      <PortalFooter />

      <SchemeDetailModal 
        scheme={selectedScheme}
        onClose={() => setSelectedScheme(null)}
        onOpenChat={(scheme) => {
          setChatSchemeContext(scheme);
          setIsNexconnChatOpen(true);
        }}
        onCheckEligibility={(scheme) => {
          setSelectedScheme(null);
          setIsQuestionnaireOpen(true);
        }}
      />

      <QuickQuestionnaireModal
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
      />

      <ApplySchemeModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        scheme={activeApplyScheme}
      />

      {isNexconnChatOpen && (
        <NexconnChatModal
          isOpen={isNexconnChatOpen}
          onClose={() => setIsNexconnChatOpen(false)}
          initialSchemeContext={chatSchemeContext}
        />
      )}
    </div>
  );
}

function SchemePage() {
  const navigate = useNavigate();
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-alabaster flex flex-col font-sans text-charcoal">
      <TopHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={(event) => {
          event.preventDefault();
          const query = searchQuery.trim();
          if (query) navigate(`/schemes?q=${encodeURIComponent(query)}`);
        }}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <SubNavBar />
      <SchemeDirectory onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)} />
      <PortalFooter />
      <QuickQuestionnaireModal
        isOpen={isQuestionnaireOpen}
        onClose={() => setIsQuestionnaireOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/schemes" element={<SchemePage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/questionnaire" element={<ApplySchemePage />} />
        <Route path="/apply" element={<ApplySchemePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <NexconnChatBot />
    </>
  );
}
