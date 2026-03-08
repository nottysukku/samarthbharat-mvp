import { Router } from 'express';
import { generateChatResponse } from '../services/bedrock';
import { cacheService } from '../config/redis';
import { logger } from '../utils/logger';
import { createHash } from 'crypto';

const router = Router();

/**
 * POST /api/ai/generate
 * Generic AI generation endpoint — any frontend page can use this
 * Body: { prompt: string, context?: string, userType?: string }
 */
router.post('/generate', async (req, res) => {
  try {
    const { prompt, context, userType } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    // Check in-memory cache
    const cacheKey = `ai:${createHash('md5').update(prompt + (context || '') + (userType || '')).digest('hex')}`;
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return res.json({ response: cached, _cached: true });
    }

    const systemContext = context || '';
    const fullPrompt = systemContext ? `${systemContext}\n\nUser question: ${prompt}` : prompt;

    const response = await generateChatResponse(
      userType || 'farmer',
      [{ role: 'user', content: fullPrompt }]
    );

    // Cache for 1 hour
    await cacheService.set(cacheKey, response, 3600);

    res.json({ response });
  } catch (error: any) {
    logger.error('AI generate error:', error.message);
    res.status(500).json({ error: 'AI generation failed', fallback: true });
  }
});

/**
 * POST /api/ai/scholarships
 * AI-powered scholarship search
 */
router.post('/scholarships', async (req, res) => {
  try {
    const { category, state, income, caste, education } = req.body;
    const prompt = `List 5-8 Indian government scholarships for a student with these details:
- Category: ${category || 'General'}
- State: ${state || 'Any'}
- Family income: ${income || 'Below 2.5 Lakh'}
- Caste/Community: ${caste || 'Not specified'}
- Education level: ${education || 'Undergraduate'}

For each scholarship, provide: Name, Amount (₹), Deadline, Eligibility, How to apply (portal link).
Format as a JSON array.`;

    const response = await generateChatResponse('student', [{ role: 'user', content: prompt }]);
    res.json({ response, scholarships: tryParseJSON(response) });
  } catch (error: any) {
    logger.error('Scholarship search error:', error.message);
    res.json({
      response: 'Scholarship search is temporarily unavailable.',
      scholarships: getDefaultScholarships(),
    });
  }
});

/**
 * POST /api/ai/career-guidance
 * AI-powered career guidance
 */
router.post('/career-guidance', async (req, res) => {
  try {
    const { interest, education, skills, goal } = req.body;
    const prompt = `Provide career guidance for an Indian student/professional:
- Interest areas: ${interest || 'Technology'}
- Current education: ${education || 'B.Tech'}
- Skills: ${skills || 'Not specified'}
- Career goal: ${goal || 'Get a good job'}

Provide: Recommended career paths, required skills, salary ranges in India, top companies, free courses/resources.
Keep response practical and India-focused.`;

    const response = await generateChatResponse('student', [{ role: 'user', content: prompt }]);
    res.json({ response });
  } catch (error: any) {
    logger.error('Career guidance error:', error.message);
    res.json({ response: 'Career guidance is temporarily unavailable. Visit ncs.gov.in for career resources.' });
  }
});

/**
 * POST /api/ai/study-roadmap
 * AI-powered study plan generation
 */
router.post('/study-roadmap', async (req, res) => {
  try {
    const { exam, months, hoursPerDay, currentLevel } = req.body;
    const prompt = `Create a detailed study roadmap for an Indian student:
- Target exam: ${exam || 'UPSC'}
- Preparation time: ${months || 6} months
- Hours per day: ${hoursPerDay || 6} hours
- Current level: ${currentLevel || 'Beginner'}

Provide: Month-by-month plan, daily schedule breakdown, recommended books/resources (free), revision strategy, mock test schedule.
Keep it practical and actionable.`;

    const response = await generateChatResponse('student', [{ role: 'user', content: prompt }]);
    res.json({ response });
  } catch (error: any) {
    logger.error('Study roadmap error:', error.message);
    res.json({ response: 'Study roadmap generation is temporarily unavailable.' });
  }
});

/**
 * POST /api/ai/business-plan
 * AI-powered business advice
 */
router.post('/business-plan', async (req, res) => {
  try {
    const { businessType, investment, location, experience } = req.body;
    const prompt = `Provide business guidance for an Indian entrepreneur:
- Business type: ${businessType || 'Small retail'}  
- Available investment: ₹${investment || '5 Lakh'}
- Location: ${location || 'Tier-2 city'}
- Experience: ${experience || 'New to business'}

Provide: Business plan outline, required licenses/registrations, government schemes for funding (MUDRA, Startup India, etc.), estimated monthly costs, marketing tips.
Focus on practical, India-specific advice.`;

    const response = await generateChatResponse('startup', [{ role: 'user', content: prompt }]);
    res.json({ response });
  } catch (error: any) {
    logger.error('Business plan error:', error.message);
    res.json({ response: 'Business planning is temporarily unavailable. Visit startupindia.gov.in for resources.' });
  }
});

/**
 * POST /api/ai/soil-analysis
 * AI-powered soil health advice
 */
router.post('/soil-analysis', async (req, res) => {
  try {
    const { soilType, ph, crop, region } = req.body;
    const prompt = `Provide soil health analysis and recommendations for an Indian farmer:
- Soil type: ${soilType || 'Alluvial'}
- pH level: ${ph || '6.5-7.0'}
- Target crop: ${crop || 'Wheat'}
- Region: ${region || 'North India'}

Provide: Fertilizer recommendations (with quantities per acre), irrigation advice, crop rotation suggestions, soil improvement tips.
Use simple language. Include brand names of commonly available fertilizers in India.`;

    const response = await generateChatResponse('farmer', [{ role: 'user', content: prompt }]);
    res.json({ response });
  } catch (error: any) {
    logger.error('Soil analysis error:', error.message);
    res.json({ response: 'Soil analysis is temporarily unavailable. Visit soilhealth.dac.gov.in for your soil health card.' });
  }
});

// Helper to try parsing JSON from AI response
function tryParseJSON(text: string): any[] | null {
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
    return null;
  } catch {
    return null;
  }
}

// Default scholarships fallback
function getDefaultScholarships() {
  return [
    { name: 'National Scholarship Portal (NSP)', amount: '₹12,000-50,000/year', deadline: 'Oct 31', portal: 'scholarships.gov.in' },
    { name: 'PM Scholarship Scheme', amount: '₹36,000-60,000/year', deadline: 'Dec 31', portal: 'desw.gov.in' },
    { name: 'Post-Matric Scholarship for SC Students', amount: 'Full fees + ₹550/month', deadline: 'Nov 30', portal: 'scholarships.gov.in' },
    { name: 'AICTE Pragati Scheme (Girls)', amount: '₹50,000/year', deadline: 'Dec 31', portal: 'aicte-india.org' },
    { name: 'Central Sector Scholarship', amount: '₹12,000-20,000/year', deadline: 'Oct 31', portal: 'scholarships.gov.in' },
  ];
}

export default router;
