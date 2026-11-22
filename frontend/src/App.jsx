import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight,
  Globe,
  HelpCircle,
  Users
} from 'lucide-react';
import api from './services/api.js';

function LandingPage({ backendHealth }) {
  return (
    <div className="space-y-12">
      {/* Official Government Service Clarification Banner */}
      <div className="bg-navy text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <span>🇮🇳 Digital Public Service Assistance Platform • Prioritizing Maharashtra & Central Schemes</span>
          <span className="text-gray-300">Independent Citizen Assistance Platform — Not an Official Government Agency</span>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="border-b border-govborder bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded bg-navy flex items-center justify-center text-white font-bold text-xl shadow-sm">
                SS
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-navy">SchemeSathi<span className="text-saffron font-extrabold">.AI</span></span>
                <p className="text-xs text-govmuted font-medium">Discover Benefits • Understand Eligibility • Apply with Confidence</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-charcoal">
              <a href="#features" className="hover:text-navy transition">How It Works</a>
              <a href="#categories" className="hover:text-navy transition">Categories</a>
              <a href="#community" className="hover:text-navy transition">Community</a>
              <a href="#about" className="hover:text-navy transition">About Us</a>
              <div className="h-4 w-px bg-govborder"></div>
              <button className="flex items-center space-x-1 text-xs text-govmuted hover:text-navy">
                <Globe className="w-3.5 h-3.5" />
                <span>English (मराठी)</span>
              </button>
              <Link to="/login" className="px-3 py-1.5 text-navy font-semibold hover:text-navy-light">
                Sign In
              </Link>
              <Link to="/register" className="gov-button-primary px-4 py-2 rounded text-sm font-medium shadow-sm">
                Register
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-heritage-green/10 border border-heritage-green/20 text-heritage-green text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Eligibility Engine & Official Citations</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
              Find Government Schemes You May Be Eligible For
            </h1>

            <p className="text-base sm:text-lg text-charcoal-light leading-relaxed">
              Discover government benefits based on your age, income, location and personal circumstances. 
              Get eligibility assistance, verified information and step-by-step application guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                to="/questionnaire" 
                className="gov-button-primary px-6 py-3.5 rounded text-base font-semibold shadow flex items-center justify-center space-x-2"
              >
                <span>Find Schemes For Me</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/schemes" 
                className="gov-card px-6 py-3.5 rounded text-base font-semibold text-navy hover:bg-alabaster transition flex items-center justify-center"
              >
                <span>Explore All Schemes</span>
              </Link>
            </div>

            {/* Backend connection indicator */}
            <div className="pt-4 flex items-center space-x-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${backendHealth?.status === 'operational' ? 'bg-heritage-green animate-pulse' : 'bg-govwarning'}`}></span>
              <span className="text-govmuted">
                API Status: <strong className="text-charcoal">{backendHealth?.status || 'Connecting...'}</strong>
              </span>
              {backendHealth && (
                <span className="text-govmuted">
                  (Port: 5000, Environment: {backendHealth.environment})
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="gov-card p-6 rounded-lg border-2 border-govborder bg-white shadow-md space-y-4">
              <div className="border-b border-govborder pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-saffron-dark">Quick Verification Preview</span>
                <h3 className="text-lg font-bold text-navy mt-1">Direct Citizen Assistance Workflow</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3 p-2.5 rounded bg-alabaster">
                  <div className="w-6 h-6 rounded-full bg-navy text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold text-navy">Enter Citizen Profile</h4>
                    <p className="text-xs text-govmuted">Age, income, district, occupation & student status.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-2.5 rounded bg-alabaster">
                  <div className="w-6 h-6 rounded-full bg-navy text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold text-navy">Deterministic Engine Matches</h4>
                    <p className="text-xs text-govmuted">Rules evaluate conditions strictly (LIKELY_MATCH, etc.).</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-2.5 rounded bg-alabaster">
                  <div className="w-6 h-6 rounded-full bg-navy text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="font-semibold text-navy">Official Portal Guidance</h4>
                    <p className="text-xs text-govmuted">Verified gov.in links & step-by-step document checklist.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs text-govmuted italic border-t border-govborder">
                * Note: SchemeSathi provides assistance only; all applications are submitted through authorized official government portals.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-govborder">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">Engineered for Transparency and Accuracy</h2>
          <p className="text-sm text-govmuted mt-2">
            Built with deterministic rule evaluation, official source traceability, and respectful data privacy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="gov-card p-6 rounded-lg space-y-3">
            <div className="w-10 h-10 rounded bg-navy/10 text-navy flex items-center justify-center">
              <Search className="w-5 h-5 text-navy" />
            </div>
            <h3 className="text-base font-bold text-navy">1. Personalized Scheme Discovery</h3>
            <p className="text-xs text-govmuted leading-relaxed">
              Discovers Central & Maharashtra state government schemes matched to your demographic and economic profile using live search integrations.
            </p>
          </div>

          <div className="gov-card p-6 rounded-lg space-y-3">
            <div className="w-10 h-10 rounded bg-heritage-green/10 text-heritage-green flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-heritage-green" />
            </div>
            <h3 className="text-base font-bold text-navy">2. Deterministic Eligibility Engine</h3>
            <p className="text-xs text-govmuted leading-relaxed">
              Never hallucinates eligibility. Evaluates explicit rules (age, income, residency, farmer/student status) with four strict match outcomes.
            </p>
          </div>

          <div className="gov-card p-6 rounded-lg space-y-3">
            <div className="w-10 h-10 rounded bg-saffron/20 text-saffron-dark flex items-center justify-center">
              <FileText className="w-5 h-5 text-saffron-dark" />
            </div>
            <h3 className="text-base font-bold text-navy">3. Official Source Citations</h3>
            <p className="text-xs text-govmuted leading-relaxed">
              Traceable references directly to official <code className="text-navy font-semibold">gov.in</code> and <code className="text-navy font-semibold">nic.in</code> portals with verification timestamps.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white mt-16 border-t-4 border-saffron">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded bg-saffron text-navy font-bold flex items-center justify-center text-sm">SS</div>
                <span className="font-bold text-base tracking-tight">SchemeSathi AI</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                An AI-driven digital public service discovery initiative facilitating citizen welfare scheme accessibility in India.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-saffron mb-3">Core Modules</h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li><Link to="/questionnaire" className="hover:text-white">Citizen Questionnaire</Link></li>
                <li><Link to="/schemes" className="hover:text-white">Scheme Catalogue</Link></li>
                <li><Link to="/guidance" className="hover:text-white">Application Guidance</Link></li>
                <li><Link to="/community" className="hover:text-white">Nexconn Community</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-saffron mb-3">Public Departments</h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li>Higher & Technical Education</li>
                <li>Agriculture & Farmers Welfare</li>
                <li>Social Justice & Special Assistance</li>
                <li>Women & Child Development</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm text-saffron mb-3">Disclaimer</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                SchemeSathi AI is an independent guidance platform. We never ask for Aadhaar OTPs, UPI PINs or passwords, and do not charge fees for discovery.
              </p>
            </div>
          </div>

          <div className="border-t border-navy-light mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
            <span>© 2026 SchemeSathi AI. All rights reserved.</span>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [backendHealth, setBackendHealth] = useState(null);

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

  return (
    <Routes>
      <Route path="/" element={<LandingPage backendHealth={backendHealth} />} />
      <Route path="*" element={<LandingPage backendHealth={backendHealth} />} />
    </Routes>
  );
}
