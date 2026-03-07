import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Mock AI responses
const mockResponses: Record<string, string[]> = {
  farmer: [
    "I can help you with crop diseases, mandi prices, weather forecasts, and government schemes for farmers. What would you like to know?",
    "For crop disease diagnosis, please upload an image of your crop. I'll analyze it and provide treatment recommendations.",
    "You can check current mandi prices by asking 'What are today's wheat prices?' or similar queries.",
    "I can also help you find government schemes like PM-KISAN, Fasal Bima Yojana, and Kisan Credit Card."
  ],
  student: [
    "I can help you with scholarships, study resources, exam preparation, and career guidance. What are you looking for?",
    "For scholarship information, tell me your education level and category. I'll find relevant scholarships for you.",
    "I can generate a personalized study roadmap for competitive exams like UPSC, JEE, NEET, SSC, and Banking exams.",
    "Looking for study materials? I can recommend PDFs, YouTube channels, and online courses for your exam preparation."
  ],
  startup: [
    "I can help you with funding schemes, business compliance, market research, and networking opportunities. How can I assist?",
    "For startup funding, I can guide you through Startup India Seed Fund, MUDRA loans, and MSME schemes.",
    "Need help with compliance? I can explain GST registration, labor laws, and other regulatory requirements.",
    "I can also help you with business planning, market analysis, and connecting with incubators and mentors."
  ]
};

router.post('/message', async (req, res) => {
  try {
    const { message, userType, conversationId, attachments } = req.body;
    
    const newConversationId = conversationId || uuidv4();
    
    // TODO: Replace with real Claude AI integration
    // const response = await claudeService.generateResponse(message, userType);
    
    // Mock response based on user type
    const responses = mockResponses[userType as keyof typeof mockResponses] || mockResponses.farmer;
    const mockResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Check for specific keywords
    let response = mockResponse;
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('mandi')) {
      response = "I can show you current mandi prices. Which crop are you interested in? We have prices for Wheat, Rice, Cotton, Potato, Onion, Tomato, and many more.";
    } else if (lowerMessage.includes('weather')) {
      response = "I can provide weather forecasts for your area. Please share your location or pincode, and I'll give you a 7-day forecast with farming advisories.";
    } else if (lowerMessage.includes('scheme') || lowerMessage.includes('yojana')) {
      response = "I can help you find government schemes. For farmers, we have PM-KISAN, Fasal Bima, and Kisan Credit Card. For students, there are scholarships like NSP and PM Scholarship. For startups, check out Startup India and MUDRA loans.";
    } else if (lowerMessage.includes('scholarship')) {
      response = "Great! I can help you find scholarships. Please tell me: 1) Your current education level (Class 12, Graduation, etc.), 2) Your category (General/SC/ST/OBC), and 3) Your family income range.";
    } else if (lowerMessage.includes('roadmap') || lowerMessage.includes('study plan')) {
      response = "I can create a personalized study roadmap for you! Which exam are you preparing for? (UPSC, JEE, NEET, SSC, Banking, or others)";
    } else if (lowerMessage.includes('funding') || lowerMessage.includes('loan')) {
      response = "For startup funding, I recommend: 1) Startup India Seed Fund (up to ₹50 lakh), 2) MUDRA Loan (up to ₹10 lakh, no collateral), 3) Stand-Up India (₹10 lakh to ₹1 crore for SC/ST/Women). Which one interests you?";
    }
    
    // Handle image attachments
    if (attachments && attachments.length > 0) {
      response = "I've analyzed your crop image. Based on the symptoms, it appears to be a fungal infection. Here's what I recommend:\n\n1. Disease: Leaf Blight\n2. Severity: Moderate\n3. Treatment: Apply fungicide (Mancozeb 75% WP) at 2g per liter\n4. Prevention: Ensure proper drainage and avoid overhead irrigation\n5. Follow-up: Monitor for 7 days and reapply if needed\n\nWould you like more details about treatment or prevention?";
    }
    
    res.json({
      conversationId: newConversationId,
      response,
      suggestions: [
        "Check mandi prices",
        "Find government schemes",
        "Get weather forecast"
      ],
      quickActions: getQuickActions(userType)
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'CHAT_ERROR',
        message: 'Failed to process message'
      }
    });
  }
});

router.get('/history', async (req, res) => {
  const { conversationId } = req.query;
  
  // TODO: Fetch from MongoDB
  res.json({
    conversations: [],
    total: 0
  });
});

function getQuickActions(userType: string) {
  const actions: Record<string, any[]> = {
    farmer: [
      { id: 'mandi-prices', label: 'Check Mandi Prices', icon: '💰', action: 'Show me today\'s mandi prices' },
      { id: 'weather', label: 'Weather Forecast', icon: '🌤️', action: 'What\'s the weather forecast?' },
      { id: 'crop-disease', label: 'Diagnose Crop Disease', icon: '🌾', action: 'I want to diagnose a crop disease' }
    ],
    student: [
      { id: 'scholarships', label: 'Find Scholarships', icon: '🎓', action: 'Show me available scholarships' },
      { id: 'roadmap', label: 'Generate Study Plan', icon: '📅', action: 'Create a study roadmap for me' },
      { id: 'resources', label: 'Study Resources', icon: '📚', action: 'I need study materials' }
    ],
    startup: [
      { id: 'funding', label: 'Funding Schemes', icon: '💵', action: 'Show me funding options' },
      { id: 'compliance', label: 'Compliance Guide', icon: '📝', action: 'Help me with business compliance' },
      { id: 'market', label: 'Market Research', icon: '📊', action: 'I need market research help' }
    ]
  };
  
  return actions[userType] || actions.farmer;
}

export default router;
