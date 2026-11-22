import express from 'express';
import { issueNexconnToken } from '../services/nexconnService.js';
import { classifyIntent } from '../services/chatIntent.js';
import { buildQuestionAnswer, collectQuestionEvidence } from '../services/questionAnswerService.js';

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
 * POST /api/v1/chat/multi-agent
 */
router.post('/multi-agent', async (req, res, next) => {
  try {
    const userMessage = typeof req.body?.userMessage === 'string' ? req.body.userMessage.trim() : '';
    const schemeTitle = typeof req.body?.schemeTitle === 'string' ? req.body.schemeTitle.trim() : '';
    const query = userMessage || schemeTitle;
    if (!query) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'QUESTION_REQUIRED',
          message: 'Please enter a question.'
        }
      });
    }

    const intent = classifyIntent(query);

    let councilResponses = [];
    let citations = [];
    let sourceStatus = {};

    if (intent === 'GREETING') {
      councilResponses = [
        {
          id: `msg-${Date.now()}-1`,
          sender: 'Priya Sharma',
          role: 'Compliance & Verification Officer',
          avatarBadge: '🛡️ Officer',
          themeColor: 'cyan',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Namaste! 🙏 Main SchemeSathi se hoon. Aap scheme ka naam, apna state, ya kis tarah ki madad chahiye batayein. Main jawab official sources se mili jaankari aur citations ke saath dunga.'
        }
      ];
    } else {
      const evidence = await collectQuestionEvidence(query, intent);
      const answer = buildQuestionAnswer(query, evidence, intent);
      citations = answer.citations;
      sourceStatus = evidence.sourceStatus;

      councilResponses = [
        {
          id: `msg-${Date.now()}-1`,
          sender: 'Priya Sharma',
          role: 'Compliance & Verification Officer',
          avatarBadge: '🛡️ Officer',
          themeColor: 'cyan',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: answer.text
        }
      ];
    }

    return res.status(200).json({
      success: true,
      query,
      intent,
      sourceStatus,
      citations,
      messages: councilResponses
    });
  } catch (error) {
    next(error);
  }
});

export default router;
