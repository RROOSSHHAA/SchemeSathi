import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopHeader from '../components/layout/TopHeader.jsx';
import SubNavBar from '../components/layout/SubNavBar.jsx';
import PortalFooter from '../components/layout/PortalFooter.jsx';
import NexconnChatModal from '../components/chat/NexconnChatModal.jsx';
import FloatingSahayakButton from '../components/chat/FloatingSahayakButton.jsx';
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Users, 
  Compass, 
  FileText, 
  Cpu, 
  MessageSquare,
  ArrowRight,
  Landmark,
  Scale
} from 'lucide-react';

export default function AboutUsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isNexconnChatOpen, setIsNexconnChatOpen] = useState(false);
  const [startWithVoice, setStartWithVoice] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/schemes?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const corePillars = [
    {
      icon: Cpu,
      title: '1. Deterministic Eligibility Engine',
      subtitle: 'Zero Generative Hallucination',
      description: 'Unlike generic chatbots that guess scheme rules, SchemeSathi AI evaluates verified logical criteria (age, annual income, domicile, student/farmer status, and occupation) with strict mathematical outcomes: LIKELY_MATCH, DOES_NOT_MATCH, or NEEDS_MORE_INFO.'
    },
    {
      icon: MessageSquare,
      title: '2. Nexconn Multi-Agent AI Council',
      subtitle: 'Real-Time Grounded Citizen Assistance',
      description: 'Integrated with the Nexconn Chat SDK v26.5, citizens receive coordinated guidance from 3 specialized personas: Priya Sharma (Compliance & Verification Officer), Ramesh Patel (Verified Beneficiary Mentor), and Anand Verma (Jan Seva Kendra / CSC Operator).'
    },
    {
      icon: Compass,
      title: '3. Official Source Citations',
      subtitle: 'Traceable Government Portals (.gov.in / .nic.in)',
      description: 'Every scheme includes direct links to authorized state and central portals (such as mahadbt.maharashtra.gov.in, mudra.org.in, and pmjay.gov.in) with official publication timestamps and verified issuing department metadata.'
    },
    {
      icon: Lock,
      title: '4. Ephemeral Zero-Knowledge Privacy',
      subtitle: 'Zero OTP & Zero Banking Credentials',
      description: 'Built in strict accordance with Indian citizen privacy principles. We strictly do not collect Aadhaar OTPs, bank passwords, or UPI PINs. Temporary session buffers exist in volatile RAM only with cryptographic zero-fill sweeps.'
    },
    {
      icon: Landmark,
      title: '5. Jan Seva Kendra (CSC) Locator',
      subtitle: 'Bridging the Digital Divide',
      description: 'For rural and elderly citizens facing biometric failures or lacking digital devices, SchemeSathi provides geolocation-based discovery of nearest Common Service Centers (CSC) for offline assisted filing.'
    },
    {
      icon: Scale,
      title: '6. Anti-Fraud & Direct Benefit Transfer',
      subtitle: 'Zero Intermediary Commissions',
      description: 'Educates citizens on statutory government fees (e.g. ₹25 e-KYC statutory fee), collateral-free loan provisions under Section 4 of Mudra directives, and NPCI Aadhaar bank seeding to prevent middleman exploitation.'
    }
  ];

  const targetBeneficiaries = [
    { label: 'College Students & Youth', desc: 'MahaDBT tuition fee waivers, NSP central sector scholarships, and apprenticeship stipends.' },
    { label: 'Small Business Owners & MSMEs', desc: 'PM Mudra collateral-free loans, PMEGP capital subsidies, and PM SVANidhi micro-credit.' },
    { label: 'Farmers & Agricultural Labor', desc: 'PM-Kisan income support, Namo Shetkari Mahasanman Nidhi, and ₹1 crop insurance.' },
    { label: 'Women & Self-Help Groups (SHGs)', desc: 'Mukhyamantri Majhi Ladki Bahin Yojana, Lakhpati Didi, and Sukanya Samriddhi Yojana.' },
    { label: 'Low-Income Families & Seniors', desc: 'Ayushman Bharat PM-JAY ₹5 Lakh cashless hospital cover and MJPJAY health assurance.' }
  ];

  return (
    <div className="min-h-screen bg-alabaster flex flex-col font-sans text-charcoal">
      
      {/* 1. Header & Navigation */}
      <TopHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <SubNavBar />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 w-full space-y-10">
        
        {/* Hero Section */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-govborder shadow-xs space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-saffron" />
            <span>Project Mission & Technical Architecture</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-navy leading-tight">
            About SchemeSathi AI (योजनासाथी AI)
          </h1>

          <p className="text-sm sm:text-base text-charcoal-light leading-relaxed max-w-4xl">
            <strong>SchemeSathi AI</strong> is a citizen-centric, AI-assisted public service discovery and eligibility evaluation platform. India hosts thousands of central and state welfare programs, yet millions of eligible citizens miss out due to information fragmentation, complex departmental jargon, and lack of verified procedural guidance.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link 
              to="/questionnaire" 
              className="bg-navy hover:bg-navy-light text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-xs flex items-center space-x-2 transition"
            >
              <span>Apply for Schemes</span>
              <ArrowRight className="w-4 h-4 text-saffron" />
            </Link>
            <Link 
              to="/schemes" 
              className="bg-alabaster hover:bg-white border border-govborder text-navy px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition"
            >
              Browse Schemes Directory
            </Link>
          </div>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="space-y-5">
          <div className="border-b border-govborder pb-3">
            <h2 className="text-lg sm:text-xl font-bold font-serif text-navy">
              Key Features & Architectural Pillars (प्रमुख वैशिष्ट्ये)
            </h2>
            <p className="text-xs text-govmuted mt-1">
              Engineered with deterministic logic, verified citations, and multi-agent coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white p-5 rounded-xl border border-govborder shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3.5 hover:border-saffron"
                >
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center">
                      <Icon className="w-5 h-5 text-navy" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-sm font-serif">{pillar.title}</h3>
                      <span className="text-[11px] font-semibold text-saffron-dark block mt-0.5">{pillar.subtitle}</span>
                    </div>
                    <p className="text-xs text-charcoal-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Target Beneficiaries */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-govborder shadow-xs space-y-4">
          <h2 className="text-base sm:text-lg font-bold font-serif text-navy flex items-center space-x-2">
            <Users className="w-5 h-5 text-heritage-green" />
            <span>Who SchemeSathi AI Serves (लाभार्थी घटक)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            {targetBeneficiaries.map((b, idx) => (
              <div key={idx} className="bg-alabaster p-3.5 rounded-lg border border-govborder space-y-1">
                <span className="font-bold text-xs text-navy block flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-heritage-green" />
                  <span>{b.label}</span>
                </span>
                <p className="text-[11px] text-charcoal-light leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Neutrality Disclaimer */}
        <div className="bg-amber-50 border border-saffron/40 p-5 rounded-xl text-xs space-y-2">
          <div className="flex items-center space-x-2 text-saffron-dark font-bold uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4 text-saffron-dark" />
            <span>Public Service Transparency Note</span>
          </div>
          <p className="text-charcoal leading-relaxed">
            SchemeSathi AI is an independent, non-governmental public assistance technology project. We do not approve, sanction, or disburse welfare funds. All statutory applications are finalized exclusively through authorized government portals (`.gov.in`, `.nic.in`, `maharashtra.gov.in`).
          </p>
        </div>

      </main>

      {/* Footer */}
      <PortalFooter />

      {/* Floating Sahayak & Voice Assistant */}
      <FloatingSahayakButton
        onOpenChat={() => {
          setStartWithVoice(false);
          setIsNexconnChatOpen(true);
        }}
        onOpenVoice={() => {
          setStartWithVoice(true);
          setIsNexconnChatOpen(true);
        }}
      />

      <NexconnChatModal
        isOpen={isNexconnChatOpen}
        onClose={() => {
          setIsNexconnChatOpen(false);
          setStartWithVoice(false);
        }}
        startWithVoice={startWithVoice}
      />

    </div>
  );
}
