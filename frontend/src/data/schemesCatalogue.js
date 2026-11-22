/**
 * Master Government Schemes Catalogue
 * Grouped by User Welfare Category with Verified Official Portal Links (.gov.in / .nic.in / maharashtra.gov.in)
 */

export const SCHEMES_BY_CATEGORY = {
  education: {
    categoryKey: 'education',
    categoryName: 'Education & Scholarships',
    categoryIcon: 'GraduationCap',
    badgeText: '🎓 Education & Higher Studies',
    description: 'State and Central scholarships, fee reimbursement, and student education credit.',
    schemes: [
      {
        id: 'edu_mahadbt',
        name: 'MahaDBT Post-Matric Scholarship (महाडीबीटी शिष्यवृत्ती)',
        department: 'Social Justice & Special Assistance / Higher Education, Maharashtra',
        benefits: '50% to 100% Tuition & Exam Fee Reimbursement directly deposited in student college account.',
        eligibility: 'Domicile of Maharashtra, enrolled in higher secondary / degree / diploma courses. Family annual income ≤ ₹2.5 Lakhs (or ₹8 Lakhs for EBC).',
        officialUrl: 'https://mahadbt.maharashtra.gov.in',
        portalName: 'mahadbt.maharashtra.gov.in',
        tags: ['Maharashtra State', 'Higher Education', 'Direct Benefit Transfer'],
        documents: ['Aadhaar Card', 'Income Certificate (Tehsildar)', 'College Admission Receipt / Bonafide', 'Caste Certificate (if applicable)', 'Bank Passbook with Aadhaar Seeding']
      },
      {
        id: 'edu_nsp',
        name: 'National Scholarship Portal (NSP - Central Sector Schemes)',
        department: 'Ministry of Electronics and Information Technology & Ministry of Education, GoI',
        benefits: '₹10,000 to ₹20,000 per academic year for higher university education across India.',
        eligibility: 'All Indian citizens scoring above 80th percentile in relevant Class 12 board stream with family income ≤ ₹4.5 Lakhs.',
        officialUrl: 'https://scholarships.gov.in',
        portalName: 'scholarships.gov.in',
        tags: ['All India Central', 'Merit-cum-Means', 'Undergraduate / Postgraduate'],
        documents: ['Class 12 Marksheet', 'Income Certificate', 'Aadhaar Card', 'College Admission Proof']
      },
      {
        id: 'edu_vidyalakshmi',
        name: 'PM Vidya Lakshmi Education Loan Scheme',
        department: 'Department of Higher Education, Ministry of Education, GoI',
        benefits: 'Single-window application for education loans up to ₹7.5 Lakhs collateral-free with subsidized interest rates.',
        eligibility: 'Students admitted to higher education courses recognized by UGC/AICTE in India or premier overseas universities.',
        officialUrl: 'https://www.vidyalakshmi.co.in',
        portalName: 'vidyalakshmi.co.in',
        tags: ['Collateral-Free Loan', 'Nationalized Banks', 'Higher Technical Education'],
        documents: ['Admission Letter', 'College Fee Schedule', 'Student PAN & Aadhaar', 'Parent / Co-applicant Income Proof']
      },
      {
        id: 'edu_aicte_pragati',
        name: 'AICTE Pragati Scholarship for Girl Students',
        department: 'All India Council for Technical Education (AICTE), Ministry of Education',
        benefits: '₹50,000 per annum towards college tuition and purchase of computer, stationery, and books.',
        eligibility: 'Girl students admitted to 1st year of AICTE-approved Degree / Diploma courses. Max 2 girls per family, income ≤ ₹8 Lakhs.',
        officialUrl: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati',
        portalName: 'aicte-india.org',
        tags: ['Women in STEM', 'Technical Degrees', 'Government Grant'],
        documents: ['AICTE College Bonafide', 'Class 10/12 Passing Certificate', 'Family Income Certificate', 'Aadhaar Card']
      }
    ]
  },

  loan: {
    categoryKey: 'loan',
    categoryName: 'Loan, MSME & Business Finance',
    categoryIcon: 'Landmark',
    badgeText: '🏛️ Business Loans & Credit',
    description: 'Collateral-free working capital, credit guarantees, and enterprise subsidies.',
    schemes: [
      {
        id: 'loan_mudra',
        name: 'Pradhan Mantri Mudra Yojana (PMMY - Shishu / Kishore / Tarun)',
        department: 'Department of Financial Services, Ministry of Finance, GoI',
        benefits: 'Shishu: Up to ₹50,000 | Kishore: ₹50,000 to ₹5 Lakhs | Tarun: Up to ₹20 Lakhs. 100% Collateral-Free & zero processing fee for micro-units.',
        eligibility: 'Non-farm micro and small businesses, traders, artisans, food vendors, repair shops, and startups.',
        officialUrl: 'https://www.mudra.org.in',
        portalName: 'mudra.org.in',
        tags: ['Zero Collateral', 'Small Business', 'Working Capital'],
        documents: ['Aadhaar & PAN Card', 'Business Proof / Udyam Registration', 'Quotation for Machinery / Stock', '6-Month Bank Statement']
      },
      {
        id: 'loan_pmegp',
        name: 'Prime Minister’s Employment Generation Programme (PMEGP)',
        department: 'Khadi and Village Industries Commission (KVIC), Ministry of MSME',
        benefits: '15% to 35% government capital subsidy on bank project loans up to ₹50 Lakhs for manufacturing and ₹20 Lakhs for service units.',
        eligibility: 'Any individual aged 18+, minimum 8th standard pass for project costs above ₹10 Lakhs. Applicable to new enterprise setups.',
        officialUrl: 'https://www.kviconline.gov.in/pmegpeportal',
        portalName: 'kviconline.gov.in/pmegpeportal',
        tags: ['Capital Subsidy (Up to 35%)', 'MSME Manufacturing', 'Startup Credit'],
        documents: ['Detailed Project Report (DPR)', 'Educational Certificate', 'Aadhaar & PAN', 'Caste/Category Certificate', 'Rural Area Certificate (if applicable)']
      },
      {
        id: 'loan_pmsvanidhi',
        name: 'PM SVANidhi (Micro-Credit for Street Vendors)',
        department: 'Ministry of Housing and Urban Affairs (MoHUA), GoI',
        benefits: '1st Tranche: ₹10,000 | 2nd Tranche: ₹20,000 | 3rd Tranche: ₹50,000 with 7% interest subsidy & up to ₹1,200 annual digital cashback.',
        eligibility: 'Urban and peri-urban street vendors possessing Certificate of Vending or surveyed under ULB identification lists.',
        officialUrl: 'https://pmsvanidhi.mohua.gov.in',
        portalName: 'pmsvanidhi.mohua.gov.in',
        tags: ['Street Vendors', 'Interest Subsidy', 'Digital Repayment Incentive'],
        documents: ['Aadhaar Card', 'Vending Certificate / Urban Local Body Survey Card', 'Aadhaar-Linked Bank Account']
      },
      {
        id: 'loan_annasaheb',
        name: 'Annasaheb Patil Arthik-Magas Vikas Mahamandal (Maharashtra)',
        department: 'Skill Development & Entrepreneurship Department, Government of Maharashtra',
        benefits: '100% interest reimbursement up to ₹12 Lakhs on bank enterprise loans (Max 12% interest reimbursed for 5 years).',
        eligibility: 'Youth resident of Maharashtra, aged 18 to 45 years, annual family income ≤ ₹8 Lakhs, valid business plan.',
        officialUrl: 'https://sje.maharashtra.gov.in',
        portalName: 'sje.maharashtra.gov.in',
        tags: ['Maharashtra Youth', '100% Interest Reimbursement', 'Self-Employment'],
        documents: ['Aadhaar Card', 'Maharashtra Domicile Certificate', 'Project Feasibility Report', 'Income Certificate', 'Bank Sanction Letter']
      }
    ]
  },

  hospitality: {
    categoryKey: 'hospitality',
    categoryName: 'Hospitality, Healthcare & Wellness',
    categoryIcon: 'HeartPulse',
    badgeText: '🏥 Hospital Treatment & Healthcare',
    description: 'Cashless hospital treatment, health assurance cards, and sanitation welfare.',
    schemes: [
      {
        id: 'health_pmjay',
        name: 'Ayushman Bharat — Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
        department: 'National Health Authority (NHA), Ministry of Health & Family Welfare',
        benefits: '₹5,00,000 cashless medical protection per family per year for secondary and tertiary hospitalization across 28,000+ empaneled hospitals.',
        eligibility: 'Families identified under SECC 2011 database + Universal healthcare coverage for all senior citizens aged 70 and above.',
        officialUrl: 'https://pmjay.gov.in',
        portalName: 'pmjay.gov.in',
        tags: ['Cashless Hospitalization', 'Universal Senior Citizens (70+)', 'Critical Surgeries'],
        documents: ['Aadhaar Card', 'Ration Card', 'Family ID Document', 'Active Mobile Number']
      },
      {
        id: 'health_mjpjay',
        name: 'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY Maharashtra)',
        department: 'State Health Assurance Society, Public Health Department, Maharashtra',
        benefits: 'Cashless hospital treatment cover up to ₹5,00,000 per family across 996 recognized medical procedures and surgeries.',
        eligibility: 'All yellow, orange, and white ration card holding families residing in Maharashtra.',
        officialUrl: 'https://www.jeevandayee.gov.in',
        portalName: 'jeevandayee.gov.in',
        tags: ['Maharashtra State Coverage', '996 Surgeries Included', 'Network Hospitals'],
        documents: ['Ration Card (Yellow/Orange/White)', 'Aadhaar Card / Voter ID', 'Doctor Referral Diagnosis Slip']
      },
      {
        id: 'health_abha',
        name: 'ABHA — Ayushman Bharat Health Account (Digital Health ID)',
        department: 'Ayushman Bharat Digital Mission (ABDM), National Health Authority',
        benefits: '14-digit universal health account to access, store, and digitally share medical prescriptions, lab reports, and claims.',
        eligibility: 'All citizens of India (Zero enrollment charges, created in 60 seconds with Aadhaar OTP).',
        officialUrl: 'https://abha.abdm.gov.in',
        portalName: 'abha.abdm.gov.in',
        tags: ['14-Digit Digital ID', 'Paperless Records', 'National Health Network'],
        documents: ['Aadhaar Card (linked with mobile for OTP verification)']
      },
      {
        id: 'health_pmsby',
        name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY Accident Assurance)',
        department: 'Department of Financial Services, Ministry of Finance, GoI',
        benefits: '₹2 Lakh accidental death / total permanent disability coverage at an annual statutory premium of only ₹20.',
        eligibility: 'All bank account holders aged 18 to 70 years giving auto-debit consent.',
        officialUrl: 'https://financialservices.gov.in/beta/en/pradhan-mantri-suraksha-bima-yojana-pmsby',
        portalName: 'financialservices.gov.in',
        tags: ['Annual Premium ₹20', 'Accidental Insurance', 'Direct Bank Debit'],
        documents: ['Active Savings Bank Account Passbook', 'Aadhaar Card']
      }
    ]
  },

  agriculture: {
    categoryKey: 'agriculture',
    categoryName: 'Agriculture, Farming & Rural Welfare',
    categoryIcon: 'Sprout',
    badgeText: '🌾 Farmer Income & Crop Security',
    description: 'Direct income support, subsidized crop insurance, and agricultural infrastructure loans.',
    schemes: [
      {
        id: 'agri_pmkisan',
        name: 'PM Kisan Samman Nidhi (पीएम किसान सन्मान निधी)',
        department: 'Department of Agriculture and Farmers Welfare, Ministry of Agriculture, GoI',
        benefits: '₹6,000 annual direct income support deposited in 3 equal installments of ₹2,000 directly via DBT into bank accounts.',
        eligibility: 'Small and marginal farmer families having cultivable land in their names as per state land revenue records.',
        officialUrl: 'https://pmkisan.gov.in',
        portalName: 'pmkisan.gov.in',
        tags: ['₹6,000 Annual DBT', 'Landholding Farmers', 'Central Welfare'],
        documents: ['7/12 & 8A Land Extract (in Maharashtra)', 'Aadhaar Card with biometric/OTP e-KYC', 'Aadhaar-Seeded Bank Passbook']
      },
      {
        id: 'agri_namo_shetkari',
        name: 'Namo Shetkari Mahasanman Nidhi Yojana (Maharashtra)',
        department: 'Department of Agriculture, Government of Maharashtra',
        benefits: 'Additional ₹6,000 annual direct cash transfer from Maharashtra State Government (Total ₹12,000 per year when combined with PM-Kisan).',
        eligibility: 'All active and verified PM-Kisan beneficiaries residing in Maharashtra with validated land ownership.',
        officialUrl: 'https://mahadbt.maharashtra.gov.in',
        portalName: 'mahadbt.maharashtra.gov.in',
        tags: ['Maharashtra Farmer Bonus', 'Total ₹12,000/Year', 'Direct Benefit Transfer'],
        documents: ['PM-Kisan Registration Number', '7/12 Land Record', 'Aadhaar Card']
      },
      {
        id: 'agri_pmfby',
        name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY Crop Insurance)',
        department: 'Ministry of Agriculture and Farmers Welfare, GoI',
        benefits: 'Comprehensive pre-sowing to post-harvest crop loss insurance with farmer premium subsidized to just ₹1 per application in Maharashtra.',
        eligibility: 'All farmers cultivating notified crops in notified administrative talukas/districts.',
        officialUrl: 'https://pmfby.gov.in',
        portalName: 'pmfby.gov.in',
        tags: ['₹1 Farmer Premium (MH)', 'Drought / Flood Protection', 'Post-Harvest Cover'],
        documents: ['Crop Sowing Certificate (Pik Pahani)', '7/12 Land Extract', 'Aadhaar Card', 'Bank Passbook']
      }
    ]
  },

  women: {
    categoryKey: 'women',
    categoryName: 'Women, Child & Family Empowerment',
    categoryIcon: 'Users',
    badgeText: '👩 Women & Child Direct Welfare',
    description: 'Monthly direct financial support, girl child savings, and female entrepreneurship.',
    schemes: [
      {
        id: 'women_ladki_bahin',
        name: 'Mukhyamantri Majhi Ladki Bahin Yojana (माझी लाडकी बहीण योजना)',
        department: 'Women and Child Development Department, Maharashtra',
        benefits: '₹1,500 monthly direct cash support (₹18,000 per year) directly credited into Aadhaar-seeded personal bank accounts.',
        eligibility: 'Women residents of Maharashtra aged 21 to 65 years with annual family income up to ₹2.50 Lakhs.',
        officialUrl: 'https://ladkibahin.maharashtra.gov.in',
        portalName: 'ladkibahin.maharashtra.gov.in',
        tags: ['₹1,500 Monthly Cash Support', 'Maharashtra Women', 'DBT Direct Account'],
        documents: ['Aadhaar Card', 'Maharashtra Domicile Certificate / Ration Card', 'Income Certificate', 'Bank Passbook with Active NPCI Seeding']
      },
      {
        id: 'women_sukanya',
        name: 'Sukanya Samriddhi Yojana (SSY Girl Child Prosperity)',
        department: 'National Savings Institute, Ministry of Finance, GoI',
        benefits: 'Government guaranteed highest small savings return (8.2% p.a.) with 100% tax exemption on deposit, interest, and maturity.',
        eligibility: 'Legal parents or guardians of girl children aged up to 10 years at account opening. Up to 2 girls per household.',
        officialUrl: 'https://www.indiapost.gov.in',
        portalName: 'indiapost.gov.in',
        tags: ['8.2% Guaranteed Interest', 'Triple Tax Exemption (EEE)', 'Post Office & Banks'],
        documents: ['Birth Certificate of Girl Child', 'Identity Proof of Parent / Guardian', 'Address Proof', 'Passport Photos']
      },
      {
        id: 'women_lakhpati',
        name: 'Lakhpati Didi Initiative (Self-Help Group Livelihood Mission)',
        department: 'Ministry of Rural Development, Deendayal Antyodaya Yojana - NRLM',
        benefits: 'Skill development training, micro-enterprise loans at subsidized interest, and market linkages to attain sustainable annual income ≥ ₹1 Lakh.',
        eligibility: 'Active female members of registered Self-Help Groups (SHGs) engaged in agriculture, livestock, micro-processing, or services.',
        officialUrl: 'https://nrlm.gov.in',
        portalName: 'nrlm.gov.in',
        tags: ['Rural Women SHG', 'Livelihood Training', 'Zero-Collateral SHG Credit'],
        documents: ['Self-Help Group (SHG) Member Passbook', 'Aadhaar Card', 'Bank Account details']
      }
    ]
  }
};
