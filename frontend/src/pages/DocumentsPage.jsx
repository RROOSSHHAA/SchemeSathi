import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopHeader from '../components/layout/TopHeader.jsx';
import SubNavBar from '../components/layout/SubNavBar.jsx';
import PortalFooter from '../components/layout/PortalFooter.jsx';
import NexconnChatModal from '../components/chat/NexconnChatModal.jsx';
import { 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Clock, 
  AlertCircle,
  MessageSquare,
  HelpCircle,
  FileCheck2,
  Landmark
} from 'lucide-react';

const DOCUMENT_CATEGORIES = [
  {
    categoryTitle: '1. Identity & Domicile Documents (ओळख व अधिवास पुरावे)',
    categoryDesc: 'Mandatory proof of citizen residency, age, and individual identity.',
    documents: [
      {
        name: 'Aadhaar Card (आधार कार्ड)',
        importance: 'Primary UIDAI digital identity mandatory for 99% of welfare schemes.',
        issuingAuthority: 'Unique Identification Authority of India (UIDAI)',
        howToGet: 'Official Portal: uidai.gov.in or any authorized Aadhaar Seva Kendra / Bank branch.',
        validity: 'Lifetime (Biometric update recommended every 10 years).',
        crucialTip: 'Ensure your active mobile number is linked to Aadhaar for receiving OTP e-KYC.'
      },
      {
        name: 'Maharashtra Domicile Certificate (अधिवास प्रमाणपत्र)',
        importance: 'Proof of continuous residence in Maharashtra (required for MahaDBT scholarships, Ladki Bahin, etc.).',
        issuingAuthority: 'Revenue Department / Tahsildar (तहसीलदार कार्यालय)',
        howToGet: 'Apply online on Aaple Sarkar: aaplesarkar.mahaonline.gov.in or nearest CSC Setu Kendra.',
        validity: 'Lifetime once verified.',
        crucialTip: 'Requires 10-15 years proof of residence (e.g. ration card, school leaving certificate, electricity bill).'
      },
      {
        name: 'Ration Card (शिधापत्रिका - Yellow / Orange / White / AAY)',
        importance: 'Determines priority poverty categorization for Ayushman Bharat, MJPJAY, food subsidies, and PDS.',
        issuingAuthority: 'Food, Civil Supplies and Consumer Protection Department, Maharashtra',
        howToGet: 'District Supply Office / Tahsil Supply Office or rcms.mahafood.gov.in',
        validity: 'Perpetual until family member addition / deletion.',
        crucialTip: 'Yellow & Orange ration card holders receive automatic ₹5 Lakh cashless hospital cover under MJPJAY.'
      },
      {
        name: 'Voter ID (मतदार ओळखपत्र - EPIC)',
        importance: 'Standard age and photo identity proof issued by Election Commission.',
        issuingAuthority: 'Election Commission of India (ECI)',
        howToGet: 'voters.eci.gov.in or National Voters’ Services Portal.',
        validity: 'Lifetime.',
        crucialTip: 'Can be fetched digitally in seconds via DigiLocker.'
      }
    ]
  },
  {
    categoryTitle: '2. Income & Financial Proofs (उत्पन्न व आर्थिक कागदपत्रे)',
    categoryDesc: 'Certificates establishing economic eligibility and direct benefit bank seeding.',
    documents: [
      {
        name: 'Annual Income Certificate (उत्पन्नाचा दाखला)',
        importance: 'Mandatory for tuition fee waivers, EWS quota, social pensions, and interest subsidies.',
        issuingAuthority: 'Sub-Divisional Officer (SDO) / Tahsildar with Digital QR Code',
        howToGet: 'Aaple Sarkar portal (aaplesarkar.mahaonline.gov.in) or CSC Kendra.',
        validity: 'Valid for 1 or 3 financial years as indicated on certificate.',
        crucialTip: 'Must declare all household income sources (salary, agriculture, business). Avoid outdated certificates.'
      },
      {
        name: 'Bank Passbook with Active NPCI Aadhaar Seeding (आधार संलग्न बँक खाते)',
        importance: 'Crucial for direct DBT cash transfers (PM-Kisan, Ladki Bahin, MahaDBT scholarships).',
        issuingAuthority: 'Any Nationalized / Scheduled Commercial Bank',
        howToGet: 'Visit your home bank branch and submit the "NPCI Aadhaar Seeding Consent Form".',
        validity: 'Active account.',
        crucialTip: 'Having Aadhaar linked is NOT enough; ensure "NPCI Mapper Seeding" is active to prevent payment failure.'
      },
      {
        name: 'Non-Creamy Layer (NCL) Certificate (उन्नत व प्रगत गटात मोडत नसल्याचे प्रमाणपत्र)',
        importance: 'Required for OBC, VJNT, and SBC category candidates to claim fee reimbursement and reservation.',
        issuingAuthority: 'Sub-Divisional Officer (SDO) / Tahsildar',
        howToGet: 'Aaple Sarkar portal or Tahsil office.',
        validity: 'Valid for 3 Financial Years.',
        crucialTip: 'Annual family gross income must be below ₹8,00,000 for the preceding 3 consecutive years.'
      }
    ]
  },
  {
    categoryTitle: '3. Category & Social Justice Documents (जात व संवर्ग पुरावे)',
    categoryDesc: 'Affirmative action verification for backward, tribal, and special categories.',
    documents: [
      {
        name: 'Caste Certificate (जातीचे प्रमाणपत्र)',
        importance: 'Certifies membership in SC, ST, VJNT, OBC, or SBC communities.',
        issuingAuthority: 'Competent Authority / Sub-Divisional Officer (SDO)',
        howToGet: 'Aaple Sarkar Portal or District Social Welfare Department.',
        validity: 'Lifetime.',
        crucialTip: 'Requires genealogy (वंशावळ) and pre-1967/pre-1961 historical documentary evidence.'
      },
      {
        name: 'Caste Validity Certificate (जात वैधता प्रमाणपत्र)',
        importance: 'Mandatory in Maharashtra for claiming reserved category scholarship benefits and college admissions.',
        issuingAuthority: 'Divisional Caste Scrutiny Committee (विभागीय जात पडताळणी समिती / CCVIS / BARTI)',
        howToGet: 'Online application via ccvis.mahaonline.gov.in',
        validity: 'Lifetime.',
        crucialTip: 'Apply immediately upon Class 12 completion to avoid last-minute scholarship rejection.'
      },
      {
        name: 'EWS Certificate (आर्थिकदृष्ट्या दुर्बल घटक प्रमाणपत्र)',
        importance: '10% quota and educational fee concessions for General category citizens with income ≤ ₹8 Lakhs.',
        issuingAuthority: 'Tahsildar / Competent Revenue Officer',
        howToGet: 'Aaple Sarkar or Tahsildar Office.',
        validity: 'Valid for current financial year.',
        crucialTip: 'Applicable only to candidates not covered under SC/ST/OBC quotas.'
      }
    ]
  },
  {
    categoryTitle: '4. Agriculture & Land Records (कृषी व जमीन महसूल कागदपत्रे)',
    categoryDesc: 'Landholder proofs required for PM-Kisan, Namo Shetkari, and Crop Insurance.',
    documents: [
      {
        name: '7/12 Land Record (डिजिटल सातबारा उतारा - Satbara Utara)',
        importance: 'Proof of cultivable landholding in Maharashtra required for PM-Kisan, Namo Shetkari, and PMFBY.',
        issuingAuthority: 'Revenue Department, Government of Maharashtra (Mahabhumi)',
        howToGet: 'Official Digital Portal: digital712.mahabhumi.gov.in or Talathi office.',
        validity: 'Requires digitally signed version (valid indefinitely unless crop/ownership changes).',
        crucialTip: 'Ensure landholder name matches character-for-character with Aadhaar card.'
      },
      {
        name: '8-A Land Extract (८-अ खाते उतारा)',
        importance: 'Summary of all landholdings of a farmer family across a specific village.',
        issuingAuthority: 'Talathi / Revenue Department (Mahabhumi)',
        howToGet: 'digital712.mahabhumi.gov.in',
        validity: 'Updated annually.',
        crucialTip: 'Essential for consolidating farmer holdings when applying for tractor and drip irrigation subsidies.'
      },
      {
        name: 'Crop Sowing Proof / E-Pik Pahani (ई-पीक पाहणी)',
        importance: 'Self-reporting of sown crops on digital portal required for claim settlement under PM Fasal Bima.',
        issuingAuthority: 'Mobile App: e-Pik Pahani (ई-पीक पाहणी प्रकल्प)',
        howToGet: 'Submit geotagged crop photo through official e-Pik Pahani Android app within 30 days of sowing.',
        validity: 'Per agricultural season (Kharif / Rabi).',
        crucialTip: 'Must be completed before deadline to be eligible for ₹1 crop insurance compensation.'
      }
    ]
  },
  {
    categoryTitle: '5. Business & Self-Employment Proofs (व्यवसाय व स्वयंरोजगार)',
    categoryDesc: 'Micro-enterprise and street vendor certifications for collateral-free loans.',
    documents: [
      {
        name: 'Udyam Registration Certificate (उद्यम नोंदणी प्रमाणपत्र)',
        importance: 'Government MSME certification required for PM Mudra, PMEGP, and interest subsidies.',
        issuingAuthority: 'Ministry of Micro, Small and Medium Enterprises (MSME), GoI',
        howToGet: '100% Free & Online: udyamregistration.gov.in (Beware of fake private portals charging fees!).',
        validity: 'Lifetime with dynamic turnover updates.',
        crucialTip: 'Official registration is completely FREE. Never pay private agents for Udyam.'
      },
      {
        name: 'Certificate of Vending / LOR (विक्रेता ओळखपत्र / शिफारस पत्र)',
        importance: 'Required for urban street vendors to receive ₹10,000 to ₹50,000 micro-credit under PM SVANidhi.',
        issuingAuthority: 'Municipal Corporation (Nagar Nigam) / Urban Local Body (ULB)',
        howToGet: 'Town Vending Committee (TVC) or Municipal Ward Office.',
        validity: 'Periodically renewed by Municipal authority.',
        crucialTip: 'If your name is in the municipal survey list, you can download the Letter of Recommendation directly.'
      }
    ]
  }
];

export default function DocumentsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isNexconnChatOpen, setIsNexconnChatOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/schemes?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-alabaster flex flex-col font-sans text-charcoal">
      
      {/* 1. Header */}
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
        
        {/* Banner */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-govborder shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-navy uppercase tracking-wider">
              <FileCheck2 className="w-4 h-4 text-heritage-green" />
              <span>Standard Verification Manual</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-navy">
              Types of Documents Required for Government Schemes
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-light max-w-3xl leading-relaxed">
              Complete reference directory of essential identification, income, category, land, and business certificates required across Central and Maharashtra welfare schemes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <a 
              href="https://www.digilocker.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-alabaster hover:bg-white border border-govborder text-navy rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition"
            >
              <span>DigiLocker Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-navy" />
            </a>
            <button
              onClick={() => setIsNexconnChatOpen(true)}
              className="px-4 py-2.5 bg-navy hover:bg-navy-light text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-xs transition cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-saffron" />
              <span>Ask Document Sahayak</span>
            </button>
          </div>
        </div>

        {/* Categories of Documents */}
        <div className="space-y-10">
          {DOCUMENT_CATEGORIES.map((cat, idx) => (
            <section key={idx} className="space-y-4">
              <div className="border-b border-govborder pb-2.5">
                <h2 className="text-base sm:text-lg font-bold font-serif text-navy">
                  {cat.categoryTitle}
                </h2>
                <p className="text-xs text-govmuted mt-0.5">
                  {cat.categoryDesc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {cat.documents.map((doc, dIdx) => (
                  <div 
                    key={dIdx}
                    className="bg-white rounded-xl border border-govborder p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-3.5 hover:border-saffron"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-navy text-sm font-serif leading-snug">
                          {doc.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-heritage-green/10 text-heritage-green shrink-0">
                          Verified Format
                        </span>
                      </div>

                      <p className="text-xs text-charcoal-light leading-relaxed">
                        {doc.importance}
                      </p>
                    </div>

                    {/* Metadata Specs */}
                    <div className="space-y-2 bg-alabaster p-3 rounded-lg border border-govborder text-xs">
                      <div>
                        <span className="font-bold text-navy text-[11px] uppercase tracking-wider block">
                          Issuing Authority:
                        </span>
                        <span className="text-charcoal-light text-xs">{doc.issuingAuthority}</span>
                      </div>

                      <div>
                        <span className="font-bold text-navy text-[11px] uppercase tracking-wider block">
                          How to Obtain:
                        </span>
                        <span className="text-charcoal-light text-xs font-mono text-[11px]">{doc.howToGet}</span>
                      </div>
                    </div>

                    {/* Crucial Tip */}
                    <div className="bg-amber-50 border border-saffron/30 p-2.5 rounded text-[11px] text-charcoal flex items-start space-x-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-saffron-dark shrink-0 mt-0.5" />
                      <span><strong>Key Tip:</strong> {doc.crucialTip}</span>
                    </div>

                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Official Portals for Document Services */}
        <div className="bg-white p-6 rounded-2xl border border-govborder shadow-xs space-y-3">
          <h2 className="text-sm sm:text-base font-bold font-serif text-navy flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-heritage-green" />
            <span>Authorized Portals to Apply for Certificates in Maharashtra & India</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <a 
              href="https://aaplesarkar.mahaonline.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-alabaster p-3 rounded-lg border border-govborder hover:border-saffron flex items-center justify-between transition"
            >
              <div>
                <strong className="text-navy block">आपले सरकार (Aaple Sarkar)</strong>
                <span className="text-[11px] text-govmuted">Income, Domicile, Caste Certificates</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-navy shrink-0 ml-2" />
            </a>

            <a 
              href="https://digital712.mahabhumi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-alabaster p-3 rounded-lg border border-govborder hover:border-saffron flex items-center justify-between transition"
            >
              <div>
                <strong className="text-navy block">महाभूमी (Digital 7/12)</strong>
                <span className="text-[11px] text-govmuted">Digital Satbara & 8A Land Records</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-navy shrink-0 ml-2" />
            </a>

            <a 
              href="https://udyamregistration.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-alabaster p-3 rounded-lg border border-govborder hover:border-saffron flex items-center justify-between transition"
            >
              <div>
                <strong className="text-navy block">उद्यम नोंदणी (Udyam MSME)</strong>
                <span className="text-[11px] text-govmuted">100% Free MSME Certificate</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-navy shrink-0 ml-2" />
            </a>
          </div>
        </div>

      </main>

      {/* Footer */}
      <PortalFooter />

      {/* Floating Sahayak */}
      <button
        onClick={() => setIsNexconnChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-navy hover:bg-navy-light text-white px-4 py-3 rounded-full shadow-2xl border-2 border-saffron flex items-center space-x-2.5 transition-all hover:scale-105 group cursor-pointer"
        aria-label="Open Live Sahayak Chat"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 text-saffron" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-heritage-green animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-heritage-green" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold leading-tight">योजनासाथी Sahayak</div>
          <div className="text-[10px] text-saffron font-medium leading-tight">Live Chat Desk</div>
        </div>
      </button>

      <NexconnChatModal
        isOpen={isNexconnChatOpen}
        onClose={() => setIsNexconnChatOpen(false)}
      />

    </div>
  );
}
