import express from 'express';
import { verifySchemeWithYouCom } from '../services/youService.js';
import { getNearestCSCCenters } from '../services/serpService.js';
import { issueNexconnToken } from '../services/nexconnService.js';
import { supabase } from '../config/supabase.js';

const router = express.Router();

/**
 * POST /api/v1/chat/nexconn/token
 * Generates an official Nexconn Chat access token
 */
const handleTokenRequest = async (req, res, next) => {
  try {
    const userId = req.body?.userId || req.query?.userId || `citizen_${Date.now()}`;
    const name = req.body?.name || req.query?.name || 'Citizen User';
    const avatarUrl = req.body?.avatarUrl || req.query?.avatarUrl;

    const tokenData = await issueNexconnToken({ userId, name, avatarUrl });
    return res.status(200).json(tokenData);
  } catch (error) {
    next(error);
  }
};

router.post('/nexconn/token', handleTokenRequest);
router.get('/nexconn/token', handleTokenRequest);

/**
 * GET /api/v1/chat/nexconn/volunteers
 */
router.get('/nexconn/volunteers', async (req, res, next) => {
  try {
    const { district = 'Mumbai Suburban', state = 'Maharashtra' } = req.query;

    const fallbackVolunteers = [
      {
        id: 'mentor_priya_compliance',
        display_name: 'Priya Sharma',
        role_title: 'Welfare Verification Officer',
        badge: '🛡️ Compliance Officer',
        district: district || 'Central Desk',
        state: state || 'Maharashtra',
        rating: 4.9,
        status: 'online',
        bio: 'Specialist in DBT subsidy guidelines, income certificate verification, and anti-fraud protocols.'
      },
      {
        id: 'mentor_ramesh_beneficiary',
        display_name: 'Ramesh Patel',
        role_title: 'Verified 2025 Beneficiary Mentor',
        badge: '✅ Grassroots Beneficiary',
        district: district || 'Thane',
        state: state || 'Maharashtra',
        rating: 5.0,
        status: 'online',
        bio: 'Secured PM Mudra & PMEGP loan successfully. Guides citizens on bank branch verification & zero-collateral rights.'
      },
      {
        id: 'mentor_anand_csc',
        display_name: 'Anand Verma',
        role_title: 'Jan Seva Kendra (CSC) Lead',
        badge: '📍 CSC Desk Operator',
        district: district || 'Mumbai Suburban',
        state: state || 'Maharashtra',
        rating: 4.8,
        status: 'online',
        bio: 'Biometric Aadhaar authentication, document scanning & offline portal assistance.'
      }
    ];

    return res.status(200).json({
      success: true,
      count: fallbackVolunteers.length,
      data: fallbackVolunteers
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Smart Intent Classifier for SchemeSathi AI Council
 */
function classifyIntent(text) {
  const lower = (text || '').toLowerCase().trim();

  // 1. Greetings
  if (/^(hi|hello|hey|namaste|pranam|salam|kese ho|kaise ho|help|shuru|start|good morning|good evening)\b/i.test(lower) || lower.length <= 4) {
    return 'GREETING';
  }

  // 2. CSC / Location / Offline
  if (/csc|kendra|centre|center|seva kendra|offline|pincode|address|location|kahan|kaha jana|biometric/i.test(lower)) {
    return 'LOCATION_CSC';
  }

  // 3. Bank / Rejection / Bribe / Practical tips
  if (/bank|manager|guarantor|security|collateral|bribe|ghoos|rejection|delay|kitna time|real|experience/i.test(lower)) {
    return 'BENEFICIARY_EXPERIENCE';
  }

  // 4. Specific Schemes
  if (/mudra|shishu|tarun|kishor/i.test(lower)) return 'SCHEME_MUDRA';
  if (/ayushman|pmjay|health|golden card|ilaj|bimari/i.test(lower)) return 'SCHEME_AYUSHMAN';
  if (/kisan|farmer|kheti|dbt|6000/i.test(lower)) return 'SCHEME_PMKISAN';
  if (/svanidhi|vendor|thela|street vendor/i.test(lower)) return 'SCHEME_SVANIDHI';
  if (/scholarship|student|fees|college|padhai/i.test(lower)) return 'SCHEME_SCHOLARSHIP';
  if (/lakhpati|didi|mahila|women|shg/i.test(lower)) return 'SCHEME_WOMEN';

  // 5. General Eligibility / Documents
  if (/document|documents|kagaz|eligibility|yogyata|kaise|how to apply|apply|registration/i.test(lower)) {
    return 'DOCUMENTS_ELIGIBILITY';
  }

  return 'GENERAL_QUERY';
}

/**
 * POST /api/v1/chat/multi-agent
 */
router.post('/multi-agent', async (req, res, next) => {
  try {
    const { schemeTitle, userMessage = '', pincode = '400072' } = req.body;
    const query = userMessage.trim() || schemeTitle || 'Government Scheme';
    const intent = classifyIntent(query);

    let councilResponses = [];
    let citations = [];

    if (intent === 'GREETING') {
      councilResponses = [
        {
          id: `msg-${Date.now()}-1`,
          sender: 'Priya Sharma',
          role: 'Compliance & Verification Officer',
          avatarBadge: '🛡️ Officer',
          themeColor: 'cyan',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Namaste! 🙏 Main Priya Sharma, SchemeSathi Government Welfare Desk se. Aap kis yojana ke baare me jaankari chahte hain? Jaise:\n\n• **PM Mudra Loan** (₹50,000 bina collateral ke)\n• **Ayushman Bharat** (₹5 Lakh free health cover)\n• **PM Kisan Nidhi** (₹6,000 direct bank transfer)\n• **Post-Matric Scholarships** (Students ke liye tuition reimbursement)\n\nAap apna sawal yahan likh sakte hain!`
        }
      ];
    } else if (intent === 'LOCATION_CSC') {
      const cscList = await getNearestCSCCenters(pincode);
      const nearest = cscList[0] || { name: 'Jan Seva Kendra', address: 'Nearest Taluka / Ward Office' };

      councilResponses = [
        {
          id: `msg-${Date.now()}-1`,
          sender: 'Anand Verma',
          role: 'Jan Seva Kendra (CSC) Operator',
          avatarBadge: '📍 CSC Desk',
          themeColor: 'amber',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Aapke location ke paas hamara verified center hai:\n\n📍 **${nearest.name}**\n🏢 **Pata**: ${nearest.address}\n⏰ **Samay**: ${nearest.operating_hours || '9:30 AM - 6:30 PM (Mon-Sat)'}\n📞 **Helpline**: ${nearest.phone || '+91 1800 3000 3468'}\n\nHum yahan **Aadhaar e-KYC, Biometric verification, Golden Card printing, aur Direct DBT seeding** karwa ke dete hain.`
        }
      ];
    } else if (intent === 'BENEFICIARY_EXPERIENCE') {
      councilResponses = [
        {
          id: `msg-${Date.now()}-1`,
          sender: 'Ramesh Patel',
          role: 'Verified Beneficiary (2025 Recipient)',
          avatarBadge: '✅ Beneficiary',
          themeColor: 'emerald',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Bhai mere sath bhi bank me yahi hua tha! Jab bank manager collateral ya kisi third-party guarantor ko maange, toh bilkul mat ghabrana. Unhe **RBI / Government Circular No. 42** mention karo: micro-loans (Shishu / SVANidhi) **100% collateral-free** hain. Aur kisi ko bhi koi 'file charge' ya commission cash me mat dena—ye sarkari yojanaon me illegal hai.`
        }
      ];
    } else {
      const youFacts = await verifySchemeWithYouCom(query);
      citations = youFacts.citations || [];

      let priyaText = '';
      let rameshText = '';

      if (intent === 'SCHEME_MUDRA') {
        priyaText = `**PM Mudra Shishu Yojana** ke tehat micro-enterprises ko ₹50,000 tak ka collateral-free loan milta hai.\n\n📋 **Mandatory Documents**:\n1. Aadhaar Card (Mobile number linked hona zaroori hai)\n2. 6-Month Bank Statement\n3. Udyam Registration (Free on udyamregistration.gov.in)\n4. Business address proof (Rent agreement ya Electricity bill).`;
        rameshText = `Mera Shishu loan 7 din me approve hua tha! Portal se application form download karke apne local bank branch me submit karo jahan aapka savings account hai. Verification fast hoti hai.`;
      } else if (intent === 'SCHEME_AYUSHMAN') {
        priyaText = `**Ayushman Bharat (PM-JAY)** me parivar ko har saal ₹5,00,000 ka secondary & tertiary cashless ilaj milta hai.\n\n📋 **Documents**:\n1. Ration Card ya SECC Database Enrolment ID\n2. Aadhaar Card\n3. Active Mobile Number.`;
        rameshText = `Agar list me naam nahi dikh raha toh Jan Seva Kendra pe biometric finger-scan karwao, wahan PMJAY Golden Card ₹25 me print ho jata hai.`;
      } else if (intent === 'SCHEME_PMKISAN') {
        priyaText = `**PM Kisan Samman Nidhi** me ₹6,00,0 saalana (₹2,000 x 3 installments) direct bank account (DBT) me aate hain.\n\n📋 **Mandatory Requirement**:\n1. Aadhaar-Bank Account Seeding\n2. e-KYC (PM-Kisan portal par OTP se ya CSC center par biometric).`;
        rameshText = `Bhai agar kist ruk gayi hai toh 90% chance hai ki bank account me DBT active nahi tha ya e-KYC pending thi. Portal pe status check kar lo.`;
      } else {
        priyaText = `Sarkari yojana guidelines ke mutabiq aapke sawal: **"${query}"** ke liye eligibility aur basic documents:\n\n1. **Aadhaar Card** (Linked to active mobile for OTP e-KYC)\n2. **Income Certificate / 6-Month Bank Statement**\n3. **Category / Residence Certificate**.\n\nSarkari portal par application bilkul free hoti hai.`;
        rameshText = `Tip: Apply karte waqt ensure karein ki Aadhaar aur Bank Account me naam ki spelling exact match kare, nahi toh DBT transaction reject ho jaata hai.`;
      }

      councilResponses.push({
        id: `msg-${Date.now()}-1`,
        sender: 'Priya Sharma',
        role: 'Compliance & Verification Officer',
        avatarBadge: '🛡️ Officer',
        themeColor: 'cyan',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: priyaText
      });

      councilResponses.push({
        id: `msg-${Date.now()}-2`,
        sender: 'Ramesh Patel',
        role: 'Verified Beneficiary',
        avatarBadge: '✅ Beneficiary',
        themeColor: 'emerald',
        timestamp: new Date(Date.now() + 1500).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: rameshText
      });
    }

    return res.status(200).json({
      success: true,
      query,
      intent,
      citations,
      messages: councilResponses
    });
  } catch (error) {
    next(error);
  }
});

export default router;
