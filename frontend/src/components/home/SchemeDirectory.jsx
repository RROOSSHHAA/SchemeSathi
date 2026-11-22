import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react';

export const schemeCatalog = [
  {
    category: 'agriculture',
    name: 'PM-KISAN',
    description: 'Income support for eligible farmer families.',
    documents: ['Aadhaar card', 'Land ownership record', 'Bank passbook', 'Mobile number'],
    url: 'https://pmkisan.gov.in',
    keywords: 'farmer agriculture kisaan crop subsidy landholding'
  },
  {
    category: 'agriculture',
    name: 'PM Fasal Bima Yojana',
    description: 'Affordable crop insurance against natural risks.',
    documents: ['Aadhaar card', 'Bank passbook', 'Land records', 'Sowing certificate'],
    url: 'https://pmfby.gov.in',
    keywords: 'farmer crop insurance agriculture monsoon natural disaster'
  },
  {
    category: 'education',
    name: 'National Scholarship Portal',
    description: 'Central and state scholarships for students and youth.',
    documents: ['Aadhaar card', 'Income certificate', 'Caste certificate, if applicable', 'Education certificates', 'Bank passbook'],
    url: 'https://scholarships.gov.in',
    keywords: 'student youth scholarship education dbt college fees'
  },
  {
    category: 'education',
    name: 'National Apprenticeship Training Scheme',
    description: 'Paid apprenticeship opportunities for technical graduates.',
    documents: ['Aadhaar card', 'Educational certificate', 'Bank passbook', 'Resume'],
    url: 'https://nats.education.gov.in',
    keywords: 'student youth apprenticeship training internship technical graduate'
  },
  {
    category: 'women',
    name: 'Pradhan Mantri Mudra Yojana',
    description: 'Loans for micro and small enterprises, including women entrepreneurs.',
    documents: ['Aadhaar card', 'Business proof', 'Identity and address proof', 'Bank statement', 'Project report'],
    url: 'https://www.mudra.org.in',
    keywords: 'women msme shg self help group business loan mudra entrepreneur'
  },
  {
    category: 'women',
    name: 'Stand-Up India',
    description: 'Bank loans for women and eligible entrepreneurs starting greenfield enterprises.',
    documents: ['Aadhaar card', 'Caste certificate, if applicable', 'Business plan', 'Address proof', 'Bank statements'],
    url: 'https://www.standupmitra.in',
    keywords: 'women entrepreneur business loan startup msme'
  },
  {
    category: 'senior',
    name: 'Indira Gandhi National Old Age Pension',
    description: 'Monthly pension support for eligible senior citizens from poor households.',
    documents: ['Age proof', 'Aadhaar card', 'Income or BPL certificate', 'Bank passbook', 'Residence proof'],
    url: 'https://nssp.nsdl.co.in',
    keywords: 'senior citizen old age pension parents parents pension'
  },
  {
    category: 'senior',
    name: 'Ayushman Bharat PM-JAY',
    description: 'Health insurance coverage for eligible senior citizens and families.',
    documents: ['Aadhaar card', 'SECC or ration card', 'Family identification document', 'Mobile number'],
    url: 'https://pmjay.gov.in',
    keywords: 'senior citizen parents health insurance ayushman healthcare medical'
  },
  {
    category: 'senior',
    name: 'National Social Assistance Programme',
    description: 'Social assistance for eligible elderly, widows, and disabled persons.',
    documents: ['Aadhaar card', 'Age certificate', 'Income certificate', 'Bank passbook', 'Residence proof'],
    url: 'https://nsap.nic.in',
    keywords: 'old parents elderly senior widow disability pension social assistance'
  },
  {
    category: 'education',
    name: 'MahaDBT Scholarship Portal',
    description: 'Maharashtra scholarships and fee reimbursement for eligible students.',
    documents: ['Aadhaar card', 'Income certificate', 'Caste certificate, if applicable', 'College admission proof', 'Bank passbook'],
    url: 'https://mahadbt.maharashtra.gov.in',
    keywords: 'maharashtra student scholarship maha dbt college fees student'
  },
  {
    category: 'women',
    name: 'Mahila Shakti Kendra',
    description: 'Support services for women including awareness, training and empowerment.',
    documents: ['Aadhaar card', 'Address proof', 'Bank passbook', 'SHG or training reference, if applicable'],
    url: 'https://wcd.gov.in',
    keywords: 'women shg mahila self help empowerment training support'
  }
];

const titles = {
  agriculture: 'Farmer Welfare Schemes',
  education: 'Student and Youth Scholarship Schemes',
  women: 'Women MSME and SHG Support Schemes',
  senior: 'Senior Citizen Pension and Healthcare Schemes'
};

export default function SchemeDirectory({ onOpenQuestionnaire }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('cat') || '';
  const query = (searchParams.get('q') || '').trim().toLowerCase();
  const filtered = schemeCatalog.filter((scheme) => {
    const matchesCategory = !category || scheme.category === category;
    const searchableText = `${scheme.name} ${scheme.description} ${scheme.category} ${scheme.keywords || ''} ${scheme.documents.join(' ')}`.toLowerCase();
    const matchesQuery = !query || searchableText.includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <Link to="/" className="inline-flex items-center text-xs font-semibold text-navy hover:text-saffron mb-3">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy font-serif">
            {titles[category] || 'All Government Schemes'}
          </h1>
        </div>
        <button
          onClick={onOpenQuestionnaire}
          className="bg-saffron text-navy font-bold px-5 py-2.5 rounded-md text-sm"
        >
          Check My Eligibility
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {[['', 'All'], ['agriculture', 'Farmers'], ['education', 'Students'], ['women', 'Women'], ['senior', 'Senior Citizens']].map(([value, label]) => (
          <button
            key={value || 'all'}
            onClick={() => setSearchParams({
              ...(value ? { cat: value } : {}),
              ...(query ? { q: query } : {})
            })}
            className={`px-4 py-2 rounded-full border text-xs font-semibold ${category === value ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-govborder'}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((scheme) => (
          <article key={scheme.name} className="bg-white border border-govborder rounded-xl p-5 shadow-xs">
            <h2 className="text-lg font-bold text-navy">{scheme.name}</h2>
            <p className="text-sm text-govmuted mt-2">{scheme.description}</p>
            <h3 className="mt-5 mb-2 flex items-center text-xs font-bold uppercase tracking-wide text-navy">
              <FileText className="w-4 h-4 mr-1.5 text-saffron-dark" /> Required Documents
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {scheme.documents.map((document) => (
                <li key={document} className="text-xs bg-alabaster border border-govborder rounded p-2 text-charcoal">
                  {document}
                </li>
              ))}
            </ul>
            <a
              href={scheme.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-5 text-sm font-bold text-navy hover:text-saffron-dark"
            >
              Visit Official Portal <ExternalLink className="w-4 h-4 ml-1.5" />
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
