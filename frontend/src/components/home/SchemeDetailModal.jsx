import React from 'react';
import { X, CheckCircle2, ExternalLink, ShieldAlert, FileText, ArrowRight } from 'lucide-react';

export default function SchemeDetailModal({ scheme, onClose, onCheckEligibility }) {
  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full border border-govborder overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-navy text-white px-6 py-4 flex items-center justify-between border-b-2 border-saffron">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-saffron text-navy font-bold flex items-center justify-center text-xs">
              GOV
            </div>
            <div>
              <span className="text-xs text-saffron font-semibold uppercase tracking-wider block">
                {scheme.category || 'Government Scheme'}
              </span>
              <h3 className="text-lg font-bold text-white font-serif">
                {scheme.name}
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-charcoal text-sm max-h-[75vh] overflow-y-auto">
          
          {/* Department Source Badge */}
          <div className="bg-alabaster p-3 rounded border border-govborder text-xs flex items-center justify-between">
            <span className="text-govmuted font-medium">Department:</span>
            <span className="font-semibold text-navy text-right">{scheme.department}</span>
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-1.5">Overview</h4>
            <p className="text-xs leading-relaxed text-charcoal-light">
              {scheme.summary}
            </p>
          </div>

          {/* Key Benefits */}
          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-1.5 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-heritage-green" />
              <span>Assistance & Financial Benefits</span>
            </h4>
            <div className="bg-heritage-green/10 text-heritage-green border border-heritage-green/20 p-3 rounded text-xs font-medium">
              {scheme.benefit}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
              Verified Eligibility Criteria
            </h4>
            <p className="text-xs text-charcoal-light bg-white border border-govborder p-3 rounded">
              {scheme.eligibility}
            </p>
          </div>

          {/* Required Documents Checklist */}
          <div>
            <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-1.5 flex items-center space-x-1">
              <FileText className="w-3.5 h-3.5 text-saffron-dark" />
              <span>Standard Required Documents</span>
            </h4>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs text-govmuted">
              <li className="flex items-center space-x-1.5 bg-alabaster p-2 rounded border border-govborder">
                <span className="w-1.5 h-1.5 rounded-full bg-heritage-green"></span>
                <span>Aadhaar Card (Identity Proof)</span>
              </li>
              <li className="flex items-center space-x-1.5 bg-alabaster p-2 rounded border border-govborder">
                <span className="w-1.5 h-1.5 rounded-full bg-heritage-green"></span>
                <span>Income Certificate / Ration Card</span>
              </li>
              <li className="flex items-center space-x-1.5 bg-alabaster p-2 rounded border border-govborder">
                <span className="w-1.5 h-1.5 rounded-full bg-heritage-green"></span>
                <span>Domicile Certificate (Maharashtra)</span>
              </li>
              <li className="flex items-center space-x-1.5 bg-alabaster p-2 rounded border border-govborder">
                <span className="w-1.5 h-1.5 rounded-full bg-heritage-green"></span>
                <span>Active Bank Passbook</span>
              </li>
            </ul>
          </div>

          {/* Official Gov Link Caution */}
          <div className="bg-amber-50 border border-govwarning/30 p-3 rounded flex items-start space-x-2 text-xs text-govwarning">
            <ShieldAlert className="w-4 h-4 text-govwarning flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              SchemeSathi AI provides assistance and eligibility evaluation only. Applications must be officially filed on the authorized government portal:
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-alabaster px-6 py-3.5 border-t border-govborder flex flex-col sm:flex-row justify-between items-center gap-3">
          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-navy font-semibold hover:underline flex items-center space-x-1"
          >
            <span>Visit Official Portal ({scheme.officialUrl})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 border border-govborder rounded text-xs font-semibold text-charcoal hover:bg-white transition"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onCheckEligibility(scheme);
              }}
              className="w-1/2 sm:w-auto bg-navy hover:bg-navy-light text-white px-5 py-2 rounded text-xs font-semibold shadow transition flex items-center justify-center space-x-1.5"
            >
              <span>Check My Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5 text-saffron" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
