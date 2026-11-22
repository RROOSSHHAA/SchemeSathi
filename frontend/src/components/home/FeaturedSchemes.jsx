import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

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
    <div className="space-y-5">
      {/* Header bar with generous breathing room */}
      <div className="flex items-center justify-between border-b border-govborder pb-3">
        <h2 className="text-lg sm:text-xl font-bold text-navy flex items-center space-x-2">
          <span>Featured Schemes</span>
        </h2>
        <span className="text-[11px] font-mono text-govmuted bg-white px-2.5 py-1 rounded-md border border-govborder shadow-xs">
          #FBF9FA • Verified
        </span>
      </div>

      {/* Grid of Scheme Cards with Roomy Padding */}
      <div className="grid sm:grid-cols-2 gap-5">
        {schemes.map((scheme) => (
          <div 
            key={scheme.id}
            className="gov-card rounded-xl p-5 sm:p-6 border border-govborder flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <div className="space-y-4">
              {/* Card Top: Circular Emblem & Verified Green Shield Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-navy/5 border border-govborder flex items-center justify-center p-1.5 shadow-inner">
                  {scheme.iconType === 'bank' ? (
                    <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold">
                      ₹ JDY
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-heritage-green text-white flex items-center justify-center text-xs font-bold">
                      + NHA
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-1.5 text-heritage-green bg-heritage-green/10 px-2.5 py-1 rounded-full text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-heritage-green" />
                  <span className="text-xs">Verified</span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-navy leading-snug line-clamp-1 mb-2">
                  {scheme.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed line-clamp-3">
                  {scheme.summary}
                </p>
              </div>
            </div>

            {/* Bottom Action Button with comfortable tap target */}
            <div className="pt-4 mt-4 border-t border-govborder">
              <button
                onClick={() => onSelectScheme(scheme)}
                className="w-full sm:w-auto bg-[#D6A45B] hover:bg-[#E2BC7E] text-navy font-bold text-xs sm:text-sm px-6 py-2.5 rounded-md shadow-sm transition active:scale-95"
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
