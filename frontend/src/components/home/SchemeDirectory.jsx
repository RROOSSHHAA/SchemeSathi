import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FileText, CheckCircle2, ShieldCheck, Landmark, Sparkles } from 'lucide-react';

export const schemeCatalog = [
  // 1. Education & Scholarships
  {
    id: 'edu_mahadbt',
    category: 'education',
    name: 'MahaDBT Post-Matric Scholarship (महाडीबीटी शिष्यवृत्ती)',
    department: 'Social Justice & Special Assistance / Higher Education, Maharashtra',
    description: '50% to 100% tuition and exam fee reimbursement directly deposited in student college account.',
    benefits: 'Tuition and exam fees covered directly under Direct Benefit Transfer.',
    eligibility: 'Resident of Maharashtra, enrolled in higher secondary / degree / diploma courses. Family income ≤ ₹2.5 Lakhs (or ₹8 Lakhs for EBC).',
    documents: ['Aadhaar Card', 'Income Certificate (Tahsildar)', 'College Bonafide / Admission Receipt', 'Caste Certificate (if applicable)', 'Bank Passbook with Aadhaar Seeding'],
    url: 'https://mahadbt.maharashtra.gov.in',
    keywords: 'student youth scholarship education dbt college fees mahadbt maharashtra fee reimbursement'
  },
  {
    id: 'edu_nsp',
    category: 'education',
    name: 'National Scholarship Portal (NSP Central Sector)',
    department: 'Ministry of Education & MeitY, Government of India',
    description: 'Central sector scholarship granting financial assistance for university & college education.',
    benefits: '₹10,000 to ₹20,000 per academic year for undergraduate and postgraduate studies.',
    eligibility: 'All Indian citizens scoring above 80th percentile in relevant Class 12 board stream with family income ≤ ₹4.5 Lakhs.',
    documents: ['Class 12 Marksheet', 'Income Certificate', 'Aadhaar Card', 'College Admission Proof', 'Bank Passbook'],
    url: 'https://scholarships.gov.in',
    keywords: 'student youth scholarship education dbt college fees central sector nsp merit'
  },
  {
    id: 'edu_vidyalakshmi',
    category: 'education',
    name: 'PM Vidya Lakshmi Education Loan Portal',
    department: 'Department of Higher Education, Ministry of Education, GoI',
    description: 'Single-window electronic application portal for education loans and interest subsidies.',
    benefits: 'Education loans up to ₹7.5 Lakhs collateral-free with subsidized interest under CSIS scheme.',
    eligibility: 'Students admitted to recognized higher education institutions in India or abroad.',
    documents: ['Admission Letter', 'College Fee Schedule', 'Student PAN & Aadhaar', 'Parent Income Proof'],
    url: 'https://www.vidyalakshmi.co.in',
    keywords: 'student education loan vidya lakshmi interest subsidy higher technical study'
  },
  {
    id: 'edu_aicte_pragati',
    category: 'education',
    name: 'AICTE Pragati Scholarship for Girl Students',
    department: 'All India Council for Technical Education (AICTE), Ministry of Education',
    description: 'Empowers girl students pursuing technical education across recognized diploma & degree colleges.',
    benefits: '₹50,000 per annum towards college fee, books, computer, and stationery purchase.',
    eligibility: 'Girl students admitted to 1st year of AICTE-approved Degree / Diploma courses. Family annual income ≤ ₹8 Lakhs.',
    documents: ['AICTE College Bonafide', 'Class 10/12 Marksheet', 'Family Income Certificate', 'Aadhaar Card'],
    url: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati',
    keywords: 'student girl technical engineering aicte pragati scholarship college'
  },
  {
    id: 'edu_nats',
    category: 'education',
    name: 'National Apprenticeship Training Scheme (NATS)',
    department: 'Board of Apprenticeship Training, Ministry of Education',
    description: 'One-year paid on-the-job training program for technically qualified youth and graduates.',
    benefits: 'Government-subsidized monthly stipend ranging from ₹8,000 to ₹15,000.',
    eligibility: 'Degree / Diploma holders in engineering, technology, or general streams within 3 years of passing.',
    documents: ['Aadhaar Card', 'Degree/Diploma Certificate', 'Bank Passbook with Aadhaar Seeding', 'Resume'],
    url: 'https://nats.education.gov.in',
    keywords: 'student youth apprenticeship training internship technical graduate stipend'
  },

  // 2. Loans, MSME & Business
  {
    id: 'loan_mudra',
    category: 'loan',
    name: 'Pradhan Mantri Mudra Yojana (PMMY - मुद्रा योजना)',
    department: 'Department of Financial Services, Ministry of Finance, GoI',
    description: 'Collateral-free institutional loans for micro and small enterprises across India.',
    benefits: 'Shishu: Up to ₹50,000 | Kishore: ₹50,000 to ₹5 Lakhs | Tarun: Up to ₹20 Lakhs with zero collateral.',
    eligibility: 'Non-farm micro and small businesses, artisans, traders, shopkeepers, service enterprises.',
    documents: ['Aadhaar & PAN Card', 'Business Proof / Udyam Registration', 'Quotation for Machinery / Stock', '6-Month Bank Statement'],
    url: 'https://www.mudra.org.in',
    keywords: 'msme business loan mudra entrepreneur startup collateral free credit shopkeeper'
  },
  {
    id: 'loan_pmegp',
    category: 'loan',
    name: 'Prime Minister’s Employment Generation Programme (PMEGP)',
    department: 'Khadi and Village Industries Commission (KVIC), Ministry of MSME',
    description: 'Credit-linked subsidy program to generate self-employment ventures in rural and urban areas.',
    benefits: '15% to 35% government capital subsidy on bank project loans up to ₹50 Lakhs (Manufacturing) and ₹20 Lakhs (Services).',
    eligibility: 'Individuals aged 18+, minimum 8th class pass for projects above ₹10 Lakhs. New enterprise setups.',
    documents: ['Detailed Project Report (DPR)', 'Educational Certificate', 'Aadhaar & PAN', 'Caste/Category Certificate', 'Rural Area Certificate (if applicable)'],
    url: 'https://www.kviconline.gov.in/pmegpeportal',
    keywords: 'msme loan pmegp kvic subsidy capital grant factory manufacturing business'
  },
  {
    id: 'loan_pmsvanidhi',
    category: 'loan',
    name: 'PM SVANidhi (Micro-Credit for Urban Street Vendors)',
    department: 'Ministry of Housing and Urban Affairs (MoHUA), GoI',
    description: 'Working capital collateral-free credit for street vendors to restart urban livelihoods.',
    benefits: '1st Tranche: ₹10,000 | 2nd Tranche: ₹20,000 | 3rd Tranche: ₹50,000 with 7% interest subsidy and digital cashback.',
    eligibility: 'Urban and peri-urban street vendors possessing vending certificate or surveyed under Municipal lists.',
    documents: ['Aadhaar Card', 'Vending Certificate / Urban Local Body Survey Card', 'Aadhaar-Linked Bank Passbook'],
    url: 'https://pmsvanidhi.mohua.gov.in',
    keywords: 'street vendor svanidhi micro loan hawker urban subsidy cash credit'
  },
  {
    id: 'loan_annasaheb',
    category: 'loan',
    name: 'Annasaheb Patil Arthik-Magas Vikas Mahamandal',
    department: 'Skill Development & Entrepreneurship Department, Government of Maharashtra',
    description: 'Interest reimbursement scheme supporting youth entrepreneurs in Maharashtra.',
    benefits: '100% interest reimbursement up to ₹12 Lakhs on bank enterprise loans (up to 12% interest for 5 years).',
    eligibility: 'Youth resident of Maharashtra, aged 18 to 45 years, annual family income ≤ ₹8 Lakhs.',
    documents: ['Aadhaar Card', 'Maharashtra Domicile Certificate', 'Project Feasibility Report', 'Income Certificate', 'Bank Sanction Letter'],
    url: 'https://sje.maharashtra.gov.in',
    keywords: 'maharashtra youth loan annasaheb patil interest reimbursement startup business'
  },
  {
    id: 'loan_standup',
    category: 'loan',
    name: 'Stand-Up India Scheme',
    department: 'Department of Financial Services, Ministry of Finance, GoI',
    description: 'Bank loans for SC, ST, and women entrepreneurs to establish greenfield enterprises.',
    benefits: 'Composite loan between ₹10 Lakhs and ₹1 Crore for manufacturing, services, or trading enterprises.',
    eligibility: 'SC, ST or Woman entrepreneur aged 18+, holding at least 51% stake in the enterprise.',
    documents: ['Aadhaar & PAN Card', 'Caste Certificate (if SC/ST)', 'Business Project Plan', 'Bank Statements'],
    url: 'https://www.standupmitra.in',
    keywords: 'women sc st stand up india greenfield enterprise business loan crore bank'
  },

  // 3. Healthcare & Hospital Assurance
  {
    id: 'health_pmjay',
    category: 'hospitality',
    name: 'Ayushman Bharat — PM-JAY (आयुष्मान भारत)',
    department: 'National Health Authority (NHA), Ministry of Health & Family Welfare',
    description: 'World\'s largest government-funded health assurance scheme providing cashless hospital protection.',
    benefits: '₹5,00,000 cashless family health protection per year across 28,000+ empaneled private and public hospitals.',
    eligibility: 'Families identified under SECC database + Universal cashless cover for all senior citizens aged 70 and above.',
    documents: ['Aadhaar Card', 'Ration Card (Yellow/Orange)', 'Family Identification Document', 'Active Mobile Number'],
    url: 'https://pmjay.gov.in',
    keywords: 'health healthcare hospital insurance ayushman bharat pmjay senior citizen medical'
  },
  {
    id: 'health_mjpjay',
    category: 'hospitality',
    name: 'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY)',
    department: 'State Health Assurance Society, Public Health Department, Maharashtra',
    description: 'Universal health assurance covering surgical and medical treatments across Maharashtra.',
    benefits: 'Cashless hospital treatment cover up to ₹5,00,000 per family across 996 recognized medical procedures.',
    eligibility: 'All yellow, orange, and white ration card holding families residing in Maharashtra.',
    documents: ['Ration Card (Yellow/Orange/White)', 'Aadhaar Card / Voter ID', 'Doctor Referral Diagnosis Slip'],
    url: 'https://www.jeevandayee.gov.in',
    keywords: 'maharashtra health insurance hospital mjpjay cashless surgery doctor medical'
  },
  {
    id: 'health_abha',
    category: 'hospitality',
    name: 'ABHA — Ayushman Bharat Health Account',
    department: 'Ayushman Bharat Digital Mission (ABDM), National Health Authority',
    description: 'Universal digital health account to access, store, and share medical records electronically.',
    benefits: '14-digit unique health identifier ensuring paperless health record sharing across verified clinics and hospitals.',
    eligibility: 'All citizens of India (100% free, generated in 60 seconds with Aadhaar OTP).',
    documents: ['Aadhaar Card linked with active mobile number for OTP'],
    url: 'https://abha.abdm.gov.in',
    keywords: 'abha digital health id card medical records online hospital paperless'
  },
  {
    id: 'health_pmsby',
    category: 'hospitality',
    name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
    department: 'Department of Financial Services, Ministry of Finance, GoI',
    description: 'Accidental death and total permanent disability insurance at an affordable statutory premium.',
    benefits: '₹2 Lakh accidental insurance coverage at a statutory annual premium of only ₹20 per year.',
    eligibility: 'All bank account holders aged 18 to 70 years giving auto-debit consent.',
    documents: ['Active Savings Bank Account Passbook', 'Aadhaar Card'],
    url: 'https://financialservices.gov.in/beta/en/pradhan-mantri-suraksha-bima-yojana-pmsby',
    keywords: 'accident insurance pmsby 20 rupees premium hospital disability death'
  },

  // 4. Agriculture & Farmers
  {
    id: 'agri_pmkisan',
    category: 'agriculture',
    name: 'PM Kisan Samman Nidhi (पीएम किसान सन्मान निधी)',
    department: 'Department of Agriculture & Farmers Welfare, Ministry of Agriculture, GoI',
    description: 'Direct income support of ₹6,000 per year transferred into bank accounts of cultivable landholding farmers.',
    benefits: '₹6,000 per year in 3 equal four-monthly installments of ₹2,000 directly deposited via DBT.',
    eligibility: 'Small and marginal farmer families possessing cultivable land ownership as per state revenue records.',
    documents: ['7/12 & 8A Land Record (Satbara)', 'Aadhaar Card with e-KYC', 'Aadhaar-Seeded Bank Passbook'],
    url: 'https://pmkisan.gov.in',
    keywords: 'farmer agriculture pmkisan 6000 dbt land satbara crop income support'
  },
  {
    id: 'agri_namo_shetkari',
    category: 'agriculture',
    name: 'Namo Shetkari Mahasanman Nidhi Yojana (Maharashtra)',
    department: 'Department of Agriculture, Government of Maharashtra',
    description: 'Supplementary ₹6,000 annual direct cash transfer from Maharashtra State Government.',
    benefits: 'Total ₹12,000 per year when combined with PM-Kisan for verified farmer families in Maharashtra.',
    eligibility: 'All verified PM-Kisan beneficiaries residing in Maharashtra with validated land ownership.',
    documents: ['PM-Kisan Beneficiary ID', '7/12 Land Record', 'Aadhaar Card', 'Bank Passbook'],
    url: 'https://mahadbt.maharashtra.gov.in',
    keywords: 'maharashtra farmer namo shetkari mahasanman 12000 bonus crop agriculture'
  },
  {
    id: 'agri_pmfby',
    category: 'agriculture',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    department: 'Ministry of Agriculture and Farmers Welfare, GoI',
    description: 'Comprehensive risk insurance covering pre-sowing to post-harvest crop losses from natural disasters.',
    benefits: 'Full financial compensation for crop failure with farmer premium subsidized to just ₹1 per application in Maharashtra.',
    eligibility: 'All farmers cultivating notified crops in notified administrative areas.',
    documents: ['Crop Sowing Certificate (e-Pik Pahani)', '7/12 Land Extract', 'Aadhaar Card', 'Bank Passbook'],
    url: 'https://pmfby.gov.in',
    keywords: 'farmer crop insurance fasal bima pmfby 1 rupee drought flood storm pest'
  },

  // 5. Women & Child Empowerment
  {
    id: 'women_ladki_bahin',
    category: 'women',
    name: 'Mukhyamantri Majhi Ladki Bahin Yojana (माझी लाडकी बहीण)',
    department: 'Women and Child Development Department, Maharashtra',
    description: 'Monthly direct cash assistance of ₹1,500 transferred to Aadhaar-seeded accounts of eligible women.',
    benefits: '₹1,500 monthly (₹18,000 annually) direct benefit cash transfer.',
    eligibility: 'Women residents of Maharashtra aged 21 to 65 years with annual family income up to ₹2.50 Lakhs.',
    documents: ['Aadhaar Card', 'Maharashtra Domicile Certificate / Ration Card', 'Income Certificate', 'Bank Passbook with NPCI Seeding'],
    url: 'https://ladkibahin.maharashtra.gov.in',
    keywords: 'women ladki bahin maharashtra 1500 monthly dbt shg direct cash support'
  },
  {
    id: 'women_sukanya',
    category: 'women',
    name: 'Sukanya Samriddhi Yojana (SSY Girl Child Prosperity)',
    department: 'National Savings Institute, Ministry of Finance, GoI',
    description: 'Small savings deposit scheme designed for girl child higher education and marriage security.',
    benefits: 'Guaranteed 8.2% annual interest with 100% triple tax exemption (EEE) under Section 80C.',
    eligibility: 'Parents or legal guardians of girl children aged up to 10 years at account opening. Max 2 girls per household.',
    documents: ['Birth Certificate of Girl Child', 'Identity Proof of Parent / Guardian', 'Address Proof', 'Passport Photos'],
    url: 'https://www.indiapost.gov.in',
    keywords: 'women girl child sukanya samriddhi ssy saving tax free post office bank'
  },
  {
    id: 'women_lakhpati',
    category: 'women',
    name: 'Lakhpati Didi Initiative (Rural SHG Livelihoods)',
    department: 'Ministry of Rural Development, Deendayal Antyodaya Yojana - NRLM',
    description: 'Self-help group livelihood mission enabling rural women to achieve sustainable annual income ≥ ₹1 Lakh.',
    benefits: 'Enterprise incubation, skill development training, zero-collateral credit, and direct digital market linkages.',
    eligibility: 'Active female members of registered Self-Help Groups (SHGs) across rural India.',
    documents: ['Self-Help Group (SHG) Member Passbook', 'Aadhaar Card', 'Aadhaar-Linked Bank Account'],
    url: 'https://nrlm.gov.in',
    keywords: 'women shg self help group lakhpati didi rural livelihood loan micro enterprise'
  },
  {
    id: 'women_mahila_shakti',
    category: 'women',
    name: 'Mahila Shakti Kendra Scheme',
    department: 'Ministry of Women and Child Development, GoI',
    description: 'Community-level empowerment center providing skill training, nutrition, and welfare awareness to women.',
    benefits: 'Single-point support system for rural women empowerment, literacy, legal rights, and digital literacy.',
    eligibility: 'All rural women and adolescent girls in beneficiary blocks.',
    documents: ['Aadhaar Card', 'Address Proof', 'Bank Passbook'],
    url: 'https://wcd.gov.in',
    keywords: 'women mahila shakti kendra empowerment skill literacy legal support'
  },

  // 6. Senior Citizen Pensions
  {
    id: 'senior_ignoaps',
    category: 'senior',
    name: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    department: 'Department of Rural Development, Ministry of Rural Development, GoI',
    description: 'Monthly social pension support for elderly citizens living below the poverty line.',
    benefits: 'Monthly financial pension transferred directly into beneficiary bank accounts.',
    eligibility: 'Citizens aged 60+ belonging to households living below the poverty line (BPL).',
    documents: ['Age Proof / Birth Certificate', 'Aadhaar Card', 'BPL Certificate / Ration Card', 'Bank Passbook'],
    url: 'https://nsap.nic.in',
    keywords: 'senior citizen old age pension parents bpl elderly social assistance'
  },
  {
    id: 'senior_nsap',
    category: 'senior',
    name: 'National Social Assistance Programme (NSAP Direct Support)',
    department: 'Ministry of Rural Development, Government of India',
    description: 'Welfare pensions for elderly, widows, and persons with disabilities from impoverished backgrounds.',
    benefits: 'Direct financial assistance under National Family Benefit, Disability, and Widow Pension sub-schemes.',
    eligibility: 'Elderly citizens (60+), widows (40+), and persons with 80%+ severe disability belonging to BPL families.',
    documents: ['Aadhaar Card', 'Disability / Widow Certificate (as applicable)', 'Income Certificate', 'Bank Passbook'],
    url: 'https://nsap.nic.in',
    keywords: 'senior citizen elderly widow disability pension nsap bpl welfare'
  }
];

const categoryTitles = {
  education: 'Student & Youth Scholarship Schemes (शिक्षण व शिष्यवृत्ती)',
  loan: 'Business, Loan & MSME Credit Schemes (व्यवसाय व कर्ज योजना)',
  hospitality: 'Healthcare & Hospital Treatment Schemes (आरोग्य व रुग्णालय उपचार)',
  agriculture: 'Farmer Welfare & Crop Insurance Schemes (शेतकरी कल्याण व विमा)',
  women: 'Women & Child Direct Welfare Schemes (महिला व बाल कल्याण)',
  senior: 'Senior Citizen Pension & Health Schemes (ज्येष्ठ नागरिक निवृत्तीवेतन)'
};

export default function SchemeDirectory({ onOpenQuestionnaire }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('cat') || '';
  const query = (searchParams.get('q') || '').trim().toLowerCase();

  const filtered = schemeCatalog.filter((scheme) => {
    const matchesCategory = !category || scheme.category === category;
    const searchableText = `${scheme.name} ${scheme.description} ${scheme.department} ${scheme.category} ${scheme.keywords || ''} ${scheme.documents.join(' ')}`.toLowerCase();
    const matchesQuery = !query || searchableText.includes(query);
    return matchesCategory && matchesQuery;
  });

  const categoryCounts = {
    all: schemeCatalog.length,
    education: schemeCatalog.filter(s => s.category === 'education').length,
    loan: schemeCatalog.filter(s => s.category === 'loan').length,
    hospitality: schemeCatalog.filter(s => s.category === 'hospitality').length,
    agriculture: schemeCatalog.filter(s => s.category === 'agriculture').length,
    women: schemeCatalog.filter(s => s.category === 'women').length,
    senior: schemeCatalog.filter(s => s.category === 'senior').length
  };

  return (
    <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Top Banner with Scheme Count */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-govborder shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link to="/" className="inline-flex items-center text-xs font-semibold text-navy hover:text-saffron mb-3">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
          </Link>
          <div className="flex items-center space-x-2.5">
            <span className="px-2.5 py-1 rounded-full bg-navy/10 text-navy text-xs font-bold uppercase tracking-wider">
              Official Directory
            </span>
            <span className="px-2.5 py-1 rounded-full bg-heritage-green/10 text-heritage-green text-xs font-bold">
              {schemeCatalog.length} Total Verified Schemes
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy font-serif mt-2">
            {categoryTitles[category] || 'All Verified Government Schemes (सर्व सरकारी योजना)'}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light mt-1 max-w-3xl">
            Browse official welfare schemes from Central and Maharashtra state departments with verified eligibility rules and direct portal application links.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            to="/questionnaire"
            className="bg-navy hover:bg-navy-light text-white font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm shadow-xs flex items-center justify-center space-x-2 transition"
          >
            <Sparkles className="w-4 h-4 text-saffron" />
            <span>Apply for Scheme</span>
          </Link>
          <button
            onClick={onOpenQuestionnaire}
            className="bg-saffron hover:bg-saffron-dark text-navy font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm shadow-xs transition"
          >
            Check Eligibility
          </button>
        </div>
      </div>

      {/* Filter Chips with Real-Time Counters */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          ['', `All Schemes (${categoryCounts.all})`],
          ['education', `Education (${categoryCounts.education})`],
          ['loan', `Loans & MSME (${categoryCounts.loan})`],
          ['hospitality', `Healthcare (${categoryCounts.hospitality})`],
          ['agriculture', `Agriculture (${categoryCounts.agriculture})`],
          ['women', `Women (${categoryCounts.women})`],
          ['senior', `Senior Citizens (${categoryCounts.senior})`]
        ].map(([val, label]) => (
          <button
            key={val || 'all'}
            onClick={() => setSearchParams({
              ...(val ? { cat: val } : {}),
              ...(query ? { q: query } : {})
            })}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-semibold transition ${
              category === val 
                ? 'bg-navy text-white border-navy shadow-xs' 
                : 'bg-white text-charcoal border-govborder hover:border-navy hover:text-navy'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Showing Count Status Bar */}
      <div className="flex items-center justify-between text-xs text-govmuted px-1">
        <span>
          Showing <strong>{filtered.length}</strong> of <strong>{schemeCatalog.length}</strong> schemes
          {category && <span> in <strong>{category.toUpperCase()}</strong></span>}
          {query && <span> matching "<strong>{query}</strong>"</span>}
        </span>
        {query && (
          <button 
            onClick={() => setSearchParams(category ? { cat: category } : {})}
            className="text-navy hover:text-saffron underline font-semibold"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filtered.map((scheme) => (
          <article 
            key={scheme.id || scheme.name} 
            className="bg-white border border-govborder rounded-xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 hover:border-saffron"
          >
            <div className="space-y-3">
              
              {/* Category & Verified Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-alabaster border border-govborder text-navy uppercase tracking-wider">
                  {scheme.category}
                </span>
                <span className="flex items-center space-x-1 text-[11px] font-bold text-heritage-green">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Official</span>
                </span>
              </div>

              {/* Title & Department */}
              <div>
                <h2 className="text-base sm:text-lg font-bold text-navy font-serif leading-snug">
                  {scheme.name}
                </h2>
                {scheme.department && (
                  <p className="text-[11px] text-govmuted mt-0.5 flex items-center space-x-1">
                    <Landmark className="w-3 h-3 text-saffron-dark shrink-0" />
                    <span className="line-clamp-1">{scheme.department}</span>
                  </p>
                )}
              </div>

              {/* Description & Benefits */}
              <p className="text-xs text-charcoal leading-relaxed">
                {scheme.description}
              </p>

              {scheme.benefits && (
                <div className="bg-alabaster p-3 rounded-lg border border-govborder text-xs space-y-1">
                  <span className="font-bold text-navy text-[11px] block">
                    ✨ Key Benefits:
                  </span>
                  <p className="text-charcoal-light text-xs leading-relaxed">
                    {scheme.benefits}
                  </p>
                </div>
              )}

              {/* Eligibility Criteria */}
              {scheme.eligibility && (
                <div className="text-xs space-y-1">
                  <span className="font-bold text-navy text-[11px] block">
                    📋 Eligibility Criteria:
                  </span>
                  <p className="text-charcoal-light text-xs leading-relaxed">
                    {scheme.eligibility}
                  </p>
                </div>
              )}

              {/* Required Documents Checklist */}
              {scheme.documents && scheme.documents.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <h3 className="flex items-center text-[11px] font-bold uppercase tracking-wider text-navy">
                    <FileText className="w-3.5 h-3.5 mr-1 text-saffron-dark" /> Required Documents:
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.documents.map((doc, dIdx) => (
                      <span 
                        key={dIdx} 
                        className="text-[10px] bg-white border border-govborder rounded px-2 py-0.5 text-charcoal font-medium"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions: Official Portal Link & Apply */}
            <div className="pt-3 border-t border-govborder flex items-center justify-between gap-3">
              <a
                href={scheme.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-navy hover:text-saffron transition"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 text-navy" />
              </a>

              <Link
                to="/questionnaire"
                className="px-3.5 py-1.5 rounded-md bg-navy hover:bg-navy-light text-white text-xs font-semibold shadow-xs transition"
              >
                Apply Online
              </Link>
            </div>

          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white p-12 rounded-2xl border border-govborder text-center space-y-3">
          <p className="text-sm font-semibold text-charcoal">
            No government schemes found matching your search.
          </p>
          <button
            onClick={() => setSearchParams({})}
            className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-lg"
          >
            View All {schemeCatalog.length} Schemes
          </button>
        </div>
      )}

    </main>
  );
}
