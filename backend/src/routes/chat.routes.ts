import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateChatResponse, ChatMessage } from '../services/bedrock';
import { getCachedLLMResponse, cacheLLMResponse, saveChatMessage, getChatHistory, trackUsage } from '../services/dynamodb';
import { logger } from '../utils/logger';

const router = Router();

// In-memory conversation context (within session; DynamoDB for persistence)
const conversationContexts = new Map<string, ChatMessage[]>();

router.post('/message', async (req, res) => {
  try {
    const { message, userType, conversationId, attachments } = req.body;

    const convId = conversationId || uuidv4();
    const userMsg = message || '';
    const type = userType || 'farmer';

    // Build conversation history
    let history = conversationContexts.get(convId) || [];
    history.push({ role: 'user', content: userMsg });

    // Keep last 10 messages for context window
    if (history.length > 10) history = history.slice(-10);

    let responseText: string;

    try {
      // COST EFFICIENCY: Check DynamoDB cache first → hash(prompt) → cached response
      const cached = await getCachedLLMResponse(userMsg, type);
      if (cached) {
        responseText = cached;
        logger.info('Using cached LLM response (cost saved!)');
      } else {
        // Call Amazon Bedrock
        responseText = await generateChatResponse(type, history);

        // Cache the response for future identical queries
        await cacheLLMResponse(userMsg, type, responseText);
      }
    } catch (bedrockError: any) {
      logger.error('Bedrock error, using fallback:', bedrockError.message);
      // Fallback to intelligent mock if Bedrock fails
      responseText = getFallbackResponse(userMsg, type);
    }

    // Add assistant response to context
    history.push({ role: 'assistant', content: responseText });
    conversationContexts.set(convId, history);

    // Save to DynamoDB (async, non-blocking)
    const timestamp = new Date().toISOString();
    saveChatMessage({ conversationId: convId, messageId: uuidv4(), role: 'user', content: userMsg, userType: type, timestamp });
    saveChatMessage({ conversationId: convId, messageId: uuidv4(), role: 'assistant', content: responseText, userType: type, timestamp });
    trackUsage('chat_message', { userType: type, messageLength: userMsg.length });

    res.json({
      conversationId: convId,
      response: responseText,
      suggestions: getSuggestions(type),
      quickActions: getQuickActions(type),
    });
  } catch (error: any) {
    logger.error('Chat error:', error);
    res.status(500).json({
      error: { code: 'CHAT_ERROR', message: 'Failed to process message' },
    });
  }
});

router.get('/history', async (req, res) => {
  try {
    const { conversationId } = req.query;
    if (!conversationId) {
      return res.json({ conversations: [], total: 0 });
    }
    const messages = await getChatHistory(conversationId as string);
    res.json({ conversations: messages, total: messages.length });
  } catch (error) {
    res.json({ conversations: [], total: 0 });
  }
});

// ── Fallback responses when Bedrock is unavailable ──
function getFallbackResponse(message: string, userType: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('price') || lower.includes('mandi')) {
    return "I can show you current mandi prices. Which crop are you interested in? We have prices for Wheat, Rice, Cotton, Potato, Onion, Tomato, and many more. Visit the Mandi Prices page for live data.";
  }
  if (lower.includes('weather')) {
    return "I can provide weather forecasts for your area. Please share your location or pincode. You can also check the Weather page for a detailed 7-day forecast with farming advisories.";
  }
  if (lower.includes('scheme') || lower.includes('yojana')) {
    return "For farmers: PM-KISAN (₹6,000/year), Fasal Bima Yojana, Kisan Credit Card. For students: NSP scholarships, PM Scholarship. For startups: Startup India, MUDRA Loan. Would you like details on any specific scheme?";
  }
  if (lower.includes('scholarship')) {
    return "I can help find scholarships! Tell me: 1) Your education level (10th/12th/Graduate), 2) Category (General/SC/ST/OBC), 3) Family income. Popular options: National Scholarship Portal, PM Scholarship, State Merit scholarships.";
  }
  if (lower.includes('funding') || lower.includes('loan')) {
    return "Startup funding options: 1) MUDRA Loan (up to ₹10L, no collateral), 2) Startup India Seed Fund (up to ₹50L), 3) Stand-Up India (₹10L-₹1Cr for SC/ST/Women). Which interests you?";
  }

  const fallbacks: Record<string, string> = {
    farmer: "I'm your AI farming assistant. I can help with crop diseases, mandi prices, weather forecasts, government schemes, and more. What would you like to know?",
    student: "I'm your AI study assistant. I can help with scholarships, study roadmaps, exam prep, career guidance, and more. What are you looking for?",
    startup: "I'm your AI business assistant. I can help with funding, compliance, business registration, market research, and more. How can I help?",
  };
  return fallbacks[userType] || fallbacks.farmer;
}

function getSuggestions(userType: string): string[] {
  const map: Record<string, string[]> = {
    farmer: ["Check mandi prices", "Find government schemes", "Get weather forecast", "Diagnose crop disease"],
    student: ["Find scholarships", "Create study plan", "Career guidance", "Exam resources"],
    startup: ["Funding schemes", "Business compliance", "Market research", "Register business"],
  };
  return map[userType] || map.farmer;
}

function getQuickActions(userType: string) {
  const actions: Record<string, any[]> = {
    farmer: [
      { id: 'mandi-prices', label: 'Check Mandi Prices', icon: '💰', action: "Show me today's mandi prices" },
      { id: 'weather', label: 'Weather Forecast', icon: '🌤️', action: "What's the weather forecast?" },
      { id: 'crop-disease', label: 'Diagnose Crop Disease', icon: '🌾', action: 'I want to diagnose a crop disease' },
    ],
    student: [
      { id: 'scholarships', label: 'Find Scholarships', icon: '🎓', action: 'Show me available scholarships' },
      { id: 'roadmap', label: 'Generate Study Plan', icon: '📅', action: 'Create a study roadmap for me' },
      { id: 'resources', label: 'Study Resources', icon: '📚', action: 'I need study materials' },
    ],
    startup: [
      { id: 'funding', label: 'Funding Schemes', icon: '💵', action: 'Show me funding options' },
      { id: 'compliance', label: 'Compliance Guide', icon: '📝', action: 'Help me with business compliance' },
      { id: 'market', label: 'Market Research', icon: '📊', action: 'I need market research help' },
    ],
  };
  return actions[userType] || actions.farmer;
}

export default router;
