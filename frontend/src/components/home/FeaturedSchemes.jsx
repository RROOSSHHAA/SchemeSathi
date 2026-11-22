import React from 'react';
import { ShieldCheck, CheckCircle2, Building, ExternalLink } from 'lucide-react';

export default function FeaturedSchemes({ onSelectScheme }) {
  const schemes = [
    {
      id: 'pmjdy',
      name: 'PM Jan Dhan Yojana',
      category: 'Financial Inclusion',
      verified: true,
      iconType: 'bank',
      summary: 'National Mission for Financial Inclusion ensuring access to basic savings bank deposit accounts, RuPay debit cards, and accidental insurance cover.',
      benefit: 'Zero balance account + ₹2 Lakh accidental insurance + ₹10,000 overdraft facility.',
      eligibility: 'Any Indian citizen aged 10+ without a basic savings account.',
      officialUrl: 'https://pmjdy.gov.in',
      department: 'Department of Financial Services, Ministry of Finance'
    },
    {
      id: 'pmjay',
      name: 'Ayushman Bharat (PM-JAY)',
      category: 'Healthcare Assurance',
      verified: true,
      iconType: 'health',
      summary: 'The world\'s largest government-funded health assurance scheme providing comprehensive secondary and tertiary medical treatment coverage.',
      benefit: '₹5,00,000 cashless health insurance coverage per eligible family per year across empaneled public & private hospitals.',
      eligibility: 'Deprived rural families & identified occupational urban categories as per SECC database.',
      officialUrl: 'https://pmjay.gov.in',
      department: 'National Health Authority (NHA), Ministry of Health'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Header bar matching the reference image layout */}
      <div className="flex items-center justify-between border-b border-govborder pb-2.5">
        <h2 className="text-lg font-bold text-navy flex items-center space-x-2">
          <span>Featured Schemes</span>
        </h2>
        <span className="text-[11px] font-mono text-govmuted bg-alabaster-card px-2 py-0.5 rounded border border-govborder">
          #FBF9FA • Verified
        </span>
      </div>

      {/* Grid of Scheme Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {schemes.map((scheme) => (
          <div 
            key={scheme.id}
            className="gov-card rounded-lg p-4 border border-govborder flex flex-col justify-between hover:shadow-md transition bg-white"
          >
            <div>
              {/* Card Top: Circular Emblem & Verified Green Shield Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-full bg-navy/5 border border-govborder flex items-center justify-center p-1.5 shadow-inner">
                  {scheme.iconType === 'bank' ? (
                    <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-[10px] font-bold">
                      ₹ JDY
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-heritage-green text-white flex items-center justify-center text-[10px] font-bold">
                      + NHA
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-1 text-heritage-green bg-heritage-green/10 px-2 py-0.5 rounded-full text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-heritage-green" />
                  <span className="text-[11px]">Verified</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-navy mb-1.5 line-clamp-1">
                {scheme.name}
              </h3>
              
              <p className="text-xs text-charcoal-light leading-relaxed mb-3 line-clamp-3">
                {scheme.summary}
              </p>
            </div>

            {/* Bottom Action Button matching reference design */}
            <div className="pt-2 border-t border-govborder">
              <button
                onClick={() => onSelectScheme(scheme)}
                className="w-full sm:w-auto bg-[#D6A45B] hover:bg-[#E2BC7E] text-navy font-bold text-xs px-5 py-2 rounded shadow-sm transition"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
