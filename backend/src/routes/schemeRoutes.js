import express from 'express';
import { supabase } from '../config/supabase.js';
import { FALLBACK_SCHEMES } from '../services/demoShield.js';
import { verifySchemeWithYouCom } from '../services/youService.js';
import { getNearestCSCCenters, findOfficialSchemePDF } from '../services/serpService.js';

const router = express.Router();

/**
 * GET /api/v1/schemes
 * Returns all active government schemes with live or cached fallback
 */
router.get('/', async (req, res, next) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('schemes').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return res.status(200).json({ success: true, count: data.length, source: 'supabase', data });
      }
    }
    return res.status(200).json({ success: true, count: FALLBACK_SCHEMES.length, source: 'demoshield_cache', data: FALLBACK_SCHEMES });
  } catch (err) {
    return res.status(200).json({ success: true, count: FALLBACK_SCHEMES.length, source: 'demoshield_fallback', data: FALLBACK_SCHEMES });
  }
});

/**
 * POST /api/v1/schemes/match
 * 30-Second Smart Profile Matching Engine
 * Body: { age, income, state, gender, occupation, pincode }
 */
router.post('/match', async (req, res, next) => {
  try {
    const { age = 25, income = 200000, state = 'Maharashtra', gender = 'ALL', occupation = 'Small Business', pincode = '400072' } = req.body;

    let allSchemes = FALLBACK_SCHEMES;

    if (supabase) {
      try {
        const { data, error } = await supabase.from('schemes').select('*');
        if (!error && data && data.length > 0) {
          allSchemes = data;
        }
      } catch (e) {
        console.warn('Supabase query error, fallback active:', e.message);
      }
    }

    const numAge = Number(age) || 25;
    const numIncome = Number(income) || 200000;
    const normGender = (gender || 'ALL').toUpperCase();
    const normOcc = (occupation || '').toLowerCase();

    // Matching Algorithm
    const matched = allSchemes.map(scheme => {
      let score = 70; // baseline score

      // Age matching
      if (scheme.min_age !== null && numAge >= scheme.min_age) score += 10;
      if (scheme.max_age !== null && numAge <= scheme.max_age) score += 10;

      // Income limit matching
      if (scheme.max_income_limit !== null) {
        if (numIncome <= Number(scheme.max_income_limit)) {
          score += 15;
        } else {
          score -= 30; // disqualified or low match
        }
      } else {
        score += 10; // universal scheme
      }

      // Gender matching
      if (scheme.target_gender && scheme.target_gender !== 'ALL') {
        if (scheme.target_gender === normGender || (normGender === 'FEMALE' && scheme.target_gender === 'WOMEN')) {
          score += 25;
        } else {
          score -= 40;
        }
      }

      // Occupation matching
      const targetOccs = (scheme.target_occupations || []).map(o => String(o).toLowerCase());
      if (targetOccs.includes('all') || targetOccs.some(o => normOcc.includes(o) || o.includes(normOcc))) {
        score += 20;
      }

      const matchPercentage = Math.min(Math.max(score, 45), 99);

      return {
        ...scheme,
        matchScore: matchPercentage,
        isHighlyRecommended: matchPercentage >= 85
      };
    })
    .filter(s => s.matchScore >= 50)
    .sort((a, b) => b.matchScore - a.matchScore);

    // Enhance top 2 schemes with live You.com citations in parallel
    const topSchemes = await Promise.all(
      matched.slice(0, 4).map(async (item) => {
        const youData = await verifySchemeWithYouCom(item.title, { age: numAge, occupation, state });
        return {
          ...item,
          youComVerification: youData
        };
      })
    );

    const remainingSchemes = matched.slice(4);

    return res.status(200).json({
      success: true,
      profile: { age: numAge, income: numIncome, state, gender, occupation, pincode },
      totalMatched: matched.length,
      data: [...topSchemes, ...remainingSchemes]
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/v1/schemes/csc-centers
 * Queries SerpApi for nearest Jan Seva Kendras (CSC)
 */
router.get('/csc-centers', async (req, res, next) => {
  try {
    const { pincode = '400072', district = 'Andheri East, Mumbai' } = req.query;
    const locationQuery = `${district} ${pincode}`.trim();
    const centers = await getNearestCSCCenters(locationQuery);

    return res.status(200).json({
      success: true,
      query: locationQuery,
      count: centers.length,
      data: centers
    });
  } catch (error) {
    next(error);
  }
});

export default router;
