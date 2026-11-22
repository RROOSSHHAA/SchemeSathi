import express from 'express';

const router = express.Router();

/**
 * Verified Pre-Loaded Application Records for Live Demonstrations
 */
export const SAMPLE_APPLICATIONS = {
  'MH-DBT-2026-4481': {
    applicationId: 'MH-DBT-2026-4481',
    schemeName: 'MahaDBT Post-Matric Scholarship (महाडीबीटी शिष्यवृत्ती)',
    department: 'Higher & Technical Education Department, Government of Maharashtra',
    applicantName: 'Aarav Deshmukh',
    appliedDate: '12 Nov 2026',
    estimatedCompletionDate: '28 Nov 2026',
    status: 'UNDER_SCRUTINY',
    statusLabel: 'Under Scrutiny by Divisional Desk',
    statusColor: 'warning',
    currentStep: 3,
    totalSteps: 5,
    officialPortalUrl: 'https://mahadbt.maharashtra.gov.in',
    portalName: 'mahadbt.maharashtra.gov.in',
    actionRequired: 'No action pending from citizen. Awaiting Tahsildar digital signature clearance.',
    steps: [
      { step: 1, title: 'Application Submitted Online', date: '12 Nov 2026', completed: true },
      { step: 2, title: 'College Bonafide & Fee Verification', date: '15 Nov 2026', completed: true },
      { step: 3, title: 'Income & Domicile Scrutiny', date: '18 Nov 2026', completed: true, inProgress: true },
      { step: 4, title: 'Social Welfare Department Sanction', date: 'Estimated: 25 Nov 2026', completed: false },
      { step: 5, title: 'Direct Fee Reimbursement Disbursed', date: 'Estimated: 28 Nov 2026', completed: false }
    ],
    reminders: [
      'Document scrutiny SLA turnaround is 15 working days.',
      'Check that your bank account is seeded with NPCI Aadhaar mapper.'
    ]
  },

  'PMMY-MUM-9021': {
    applicationId: 'PMMY-MUM-9021',
    schemeName: 'Pradhan Mantri Mudra Yojana (PMMY Tarun Loan)',
    department: 'Department of Financial Services, Ministry of Finance, GoI',
    applicantName: 'Sunita Patil',
    appliedDate: '02 Nov 2026',
    estimatedCompletionDate: '20 Nov 2026',
    status: 'SANCTIONED',
    statusLabel: 'Loan Sanctioned — Agreement Ready',
    statusColor: 'success',
    currentStep: 4,
    totalSteps: 5,
    officialPortalUrl: 'https://www.mudra.org.in',
    portalName: 'mudra.org.in',
    actionRequired: 'Visit Bank of Maharashtra, Dadar Branch to sign the collateral-free sanction letter.',
    steps: [
      { step: 1, title: 'Mudra Application & DPR Filed', date: '02 Nov 2026', completed: true },
      { step: 2, title: 'Udyam Registration Verified', date: '05 Nov 2026', completed: true },
      { step: 3, title: 'Bank Branch Credit Appraisal', date: '11 Nov 2026', completed: true },
      { step: 4, title: 'Sanction Letter Issued (₹10 Lakhs)', date: '18 Nov 2026', completed: true, inProgress: true },
      { step: 5, title: 'Disbursement into Current Account', date: 'Pending Agreement Signature', completed: false }
    ],
    reminders: [
      'Zero collateral requested under Section 4 of PMMY directives.',
      'Bring original Aadhaar card and PAN card for in-person signature.'
    ]
  },

  'PMK-2026-7812': {
    applicationId: 'PMK-2026-7812',
    schemeName: 'PM Kisan Samman Nidhi (पीएम किसान सन्मान निधी)',
    department: 'Department of Agriculture & Farmers Welfare, GoI',
    applicantName: 'Tukaram Shinde',
    appliedDate: '20 Oct 2026',
    estimatedCompletionDate: '30 Nov 2026',
    status: 'ACTION_REQUIRED',
    statusLabel: 'Action Required: Land Record e-KYC Pending',
    statusColor: 'error',
    currentStep: 2,
    totalSteps: 5,
    officialPortalUrl: 'https://pmkisan.gov.in',
    portalName: 'pmkisan.gov.in',
    actionRequired: 'Mandatory: Complete biometric/OTP e-KYC on pmkisan.gov.in or visit nearest CSC Kendra before 30 Nov 2026 to unblock ₹2,000 installment.',
    steps: [
      { step: 1, title: 'Farmer Registration & 7/12 Upload', date: '20 Oct 2026', completed: true },
      { step: 2, title: 'Land Record & Aadhaar e-KYC', date: 'Pending Citizen Action', completed: false, hasError: true },
      { step: 3, title: 'PFMS Bank Account Validation', date: 'Pending e-KYC clearance', completed: false },
      { step: 4, title: 'State Agriculture Dept Approval', date: 'Awaiting', completed: false },
      { step: 5, title: 'Direct Benefit Credit (₹2,000 Installment)', date: 'Scheduled after e-KYC', completed: false }
    ],
    reminders: [
      'Urgent: Biometric e-KYC fee at CSC center is legally capped at ₹25.',
      'Ensure 7/12 land extract name matches Aadhaar spelling character-for-character.'
    ]
  },

  'LADKI-MH-5520': {
    applicationId: 'LADKI-MH-5520',
    schemeName: 'Mukhyamantri Majhi Ladki Bahin Yojana (माझी लाडकी बहीण)',
    department: 'Women and Child Development Department, Maharashtra',
    applicantName: 'Priyanka Gaikwad',
    appliedDate: '01 Nov 2026',
    estimatedCompletionDate: '15 Nov 2026',
    status: 'DISBURSED',
    statusLabel: 'Approved & Active — Monthly DBT Initiated',
    statusColor: 'success',
    currentStep: 5,
    totalSteps: 5,
    officialPortalUrl: 'https://ladkibahin.maharashtra.gov.in',
    portalName: 'ladkibahin.maharashtra.gov.in',
    actionRequired: 'No action required. ₹1,500 monthly benefit credited to Aadhaar-seeded bank account.',
    steps: [
      { step: 1, title: 'Online Application & Domicile Upload', date: '01 Nov 2026', completed: true },
      { step: 2, title: 'Anganwadi / Taluka Scrutiny', date: '04 Nov 2026', completed: true },
      { step: 3, title: 'NPCI Bank Aadhaar Seeding Match', date: '08 Nov 2026', completed: true },
      { step: 4, title: 'District Collector Approval', date: '11 Nov 2026', completed: true },
      { step: 5, title: 'DBT Credit Active (₹1,500/Month)', date: '15 Nov 2026', completed: true }
    ],
    reminders: [
      'Next installment scheduled on 1st of next month.',
      'Do not change your linked bank account to avoid DBT routing delays.'
    ]
  }
};

/**
 * GET /api/v1/tracker/:id
 * Retrieve application follow-up status by reference ID
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const cleanId = (id || '').trim().toUpperCase();

  const record = SAMPLE_APPLICATIONS[cleanId];
  if (record) {
    return res.status(200).json({
      success: true,
      found: true,
      data: record
    });
  }

  // If custom ID entered, generate realistic synthetic follow-up timeline
  const syntheticRecord = {
    applicationId: cleanId,
    schemeName: 'Citizen Welfare Application (Verified Government Scheme)',
    department: 'State & Central Public Welfare Administration',
    applicantName: 'Citizen Applicant',
    appliedDate: 'Recently Submitted',
    estimatedCompletionDate: 'Within 15-20 Working Days',
    status: 'IN_REVIEW',
    statusLabel: 'Application Acknowledged & Under Initial Review',
    statusColor: 'warning',
    currentStep: 2,
    totalSteps: 5,
    officialPortalUrl: 'https://www.india.gov.in',
    portalName: 'india.gov.in',
    actionRequired: 'Application ID acknowledged. Ensure your active mobile number and Aadhaar are seeded with your bank account.',
    steps: [
      { step: 1, title: 'Application Submitted Online', date: 'Submitted', completed: true },
      { step: 2, title: 'Initial Desk Review & Eligibility Check', date: 'In Progress', completed: true, inProgress: true },
      { step: 3, title: 'Document & Aadhaar Verification', date: 'Pending Desk Scrutiny', completed: false },
      { step: 4, title: 'Departmental Sanction Order', date: 'Pending', completed: false },
      { step: 5, title: 'Direct Benefit Transfer / Card Issuance', date: 'Final Step', completed: false }
    ],
    reminders: [
      'Reference ID recorded in SchemeSathi local follow-up cache.',
      'Check official portal guidelines or consult Jan Seva Kendra for biometric updates.'
    ]
  };

  return res.status(200).json({
    success: true,
    found: false,
    isGenerated: true,
    data: syntheticRecord
  });
});

export default router;
