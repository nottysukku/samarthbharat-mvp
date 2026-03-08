import { logger } from '../utils/logger';

// ─── Configuration (lazy getters — dotenv loads after imports) ─────
function getConfig() {
  return {
    AWS_REGION: process.env.AWS_REGION || 'us-east-1',
    BEDROCK_MODEL_ID: process.env.BEDROCK_MODEL_ID || 'amazon.nova-lite-v1:0',
    BEARER_TOKEN: process.env.AWS_BEARER_TOKEN_BEDROCK || '',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  };
}

// System prompts per user type for contextual AI responses
const SYSTEM_PROMPTS: Record<string, string> = {
  farmer: `You are SamarthBharat Farmer Assistant — an AI helper for Indian farmers.
You help with:
- Crop disease diagnosis and treatment advice
- Government schemes (PM-KISAN, Fasal Bima Yojana, Kisan Credit Card, etc.)
- Mandi/market prices for crops
- Weather-based farming advisories
- Soil health and irrigation tips
- Legal rights for farmers (MSP, land rights, etc.)

RULES:
- Keep responses concise and practical (2-4 paragraphs max)
- Use simple language — many users have limited education
- Always mention specific scheme names, dosages, or numbers when relevant
- If asked about crop disease from an image, provide: disease name, severity, treatment steps, and prevention
- Respond in the same language the user writes in (Hindi or English)
- Include actionable next steps
- If unsure, recommend visiting the nearest Krishi Vigyan Kendra (KVK)`,

  student: `You are SamarthBharat Student Assistant — an AI helper for Indian students from underserved communities.
You help with:
- Scholarship discovery (NSP, state scholarships, minority scholarships, etc.)
- Study roadmaps for competitive exams (UPSC, JEE, NEET, SSC, Banking)
- Career guidance and mentorship
- Free educational resources and courses
- Exam preparation strategies
- College admissions guidance

RULES:
- Keep responses encouraging and supportive
- Provide specific scholarship names, deadlines, and eligibility criteria
- Create structured study plans when asked (weekly/monthly)
- Recommend free resources (YouTube channels, NPTEL, Swayam, etc.)
- Respond in the same language the user writes in
- Always include next actionable steps`,

  startup: `You are SamarthBharat Business Assistant — an AI helper for Indian entrepreneurs and startups.
You help with:
- Startup India registration and benefits
- Funding schemes (MUDRA Loan, Seed Fund, Stand-Up India, MSME schemes)
- Business compliance (GST, labor laws, FSSAI, etc.)
- Market research and business planning
- Incubator and accelerator connections
- Legal support for businesses

RULES:
- Be professional and action-oriented
- Provide specific scheme names, loan amounts, eligibility criteria
- Break complex compliance into step-by-step guides
- Include relevant government portal links when applicable
- Respond in the same language the user writes in
- Focus on practical, immediately actionable advice`,
};

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ─── Provider 1: Amazon Bedrock (Bearer Token) ────────────────────
async function callBedrock(systemPrompt: string, messages: ChatMessage[], imageBase64?: string): Promise<string> {
  const { BEARER_TOKEN, AWS_REGION, BEDROCK_MODEL_ID } = getConfig();
  if (!BEARER_TOKEN) throw new Error('No Bedrock bearer token configured');

  const bedrockUrl = `https://bedrock-runtime.${AWS_REGION}.amazonaws.com/model/${encodeURIComponent(BEDROCK_MODEL_ID)}/invoke`;

  // Nova models: content items must NOT have a 'type' key
  // Format: [{ text: "..." }] for text, [{ text: "..." }, { image: { format, source: { bytes } } }] for images
  const userMessages = messages.map(m => {
    if (m.role === 'user' && imageBase64) {
      return {
        role: 'user',
        content: [
          { text: m.content || 'Please analyze this crop image for diseases.' },
          { image: { format: 'jpeg', source: { bytes: imageBase64 } } },
        ],
      };
    }
    return { role: m.role === 'user' ? 'user' : 'assistant', content: [{ text: m.content }] };
  });

  let body: string;
  if (BEDROCK_MODEL_ID.includes('nova')) {
    body = JSON.stringify({
      schemaVersion: 'messages-v1',
      system: [{ text: systemPrompt }],
      messages: userMessages,
      inferenceConfig: { maxTokens: 1024, temperature: 0.7, topP: 0.9 },
    });
  } else if (BEDROCK_MODEL_ID.includes('claude') || BEDROCK_MODEL_ID.includes('anthropic')) {
    body = JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1024,
      system: systemPrompt,
      messages: userMessages,
      temperature: 0.7,
    });
  } else {
    body = JSON.stringify({
      schemaVersion: 'messages-v1',
      system: [{ text: systemPrompt }],
      messages: userMessages,
      inferenceConfig: { maxTokens: 1024, temperature: 0.7, topP: 0.9 },
    });
  }

  // Try up to 3 times with exponential backoff
  for (let attempt = 0; attempt < 3; attempt++) {
    const resp = await fetch(bedrockUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      body,
    });

    if (resp.status === 429) {
      const wait = Math.pow(2, attempt) * 1000;
      logger.warn(`Bedrock throttled, retrying in ${wait}ms (attempt ${attempt + 1}/3)`);
      await new Promise(r => setTimeout(r, wait));
      continue;
    }

    if (!resp.ok) {
      const errText = await resp.text().catch(() => '');
      throw new Error(`Bedrock HTTP ${resp.status}: ${errText.slice(0, 200)}`);
    }

    const data = await resp.json() as any;
    if (BEDROCK_MODEL_ID.includes('nova')) {
      return data.output?.message?.content?.[0]?.text || data.output?.text || JSON.stringify(data);
    }
    if (BEDROCK_MODEL_ID.includes('claude') || BEDROCK_MODEL_ID.includes('anthropic')) {
      return data.content?.[0]?.text || data.completion || JSON.stringify(data);
    }
    return data.output?.text || data.content?.[0]?.text || data.completion || JSON.stringify(data);
  }
  throw new Error('Bedrock max retries exceeded');
}

// ─── Provider 2: Google Gemini ─────────────────────────────────────
async function callGemini(systemPrompt: string, messages: ChatMessage[], imageBase64?: string): Promise<string> {
  const { GEMINI_API_KEY } = getConfig();
  if (!GEMINI_API_KEY) throw new Error('No Gemini API key configured');

  // Try gemini-2.0-flash (latest free model), fall back to gemini-pro
  const model = imageBase64 ? 'gemini-2.0-flash' : 'gemini-2.0-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  const parts: any[] = [];
  const conversationText = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
  parts.push({ text: `${systemPrompt}\n\n${conversationText}` });

  if (imageBase64) {
    parts.push({ inline_data: { mime_type: 'image/jpeg', data: imageBase64 } });
  }

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024, topP: 0.9 },
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text().catch(() => '');
    throw new Error(`Gemini HTTP ${resp.status}: ${errText.slice(0, 200)}`);
  }

  const data = await resp.json() as any;
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty Gemini response');
  return text;
}

// ─── Provider 3: OpenAI ────────────────────────────────────────────
async function callOpenAI(systemPrompt: string, messages: ChatMessage[], imageBase64?: string): Promise<string> {
  const { OPENAI_API_KEY } = getConfig();
  if (!OPENAI_API_KEY) throw new Error('No OpenAI API key configured');

  const openaiMessages: any[] = [{ role: 'system', content: systemPrompt }];
  for (const m of messages) {
    if (m.role === 'user' && imageBase64) {
      openaiMessages.push({
        role: 'user',
        content: [
          { type: 'text', text: m.content || 'Please analyze this crop image for diseases.' },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}` } },
        ],
      });
    } else {
      openaiMessages.push({ role: m.role, content: m.content });
    }
  }

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages: openaiMessages, max_tokens: 1024, temperature: 0.7 }),
  });

  if (!resp.ok) {
    const errText = await resp.text().catch(() => '');
    throw new Error(`OpenAI HTTP ${resp.status}: ${errText.slice(0, 200)}`);
  }

  const data = await resp.json() as any;
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty OpenAI response');
  return text;
}

// ─── Main Exported Functions (Cascading Fallback) ──────────────────

/**
 * Generate chat response: Bedrock → Gemini → OpenAI → throw
 */
export async function generateChatResponse(
  userType: string,
  messages: ChatMessage[],
  imageBase64?: string
): Promise<string> {
  const systemPrompt = SYSTEM_PROMPTS[userType] || SYSTEM_PROMPTS.farmer;
  const providers = [
    { name: 'Bedrock', fn: () => callBedrock(systemPrompt, messages, imageBase64) },
    { name: 'Gemini', fn: () => callGemini(systemPrompt, messages, imageBase64) },
    { name: 'OpenAI', fn: () => callOpenAI(systemPrompt, messages, imageBase64) },
  ];

  for (const provider of providers) {
    try {
      logger.info(`Trying AI provider: ${provider.name}`);
      const result = await provider.fn();
      logger.info(`✅ ${provider.name} responded (${result.length} chars)`);
      return result;
    } catch (err: any) {
      logger.warn(`❌ ${provider.name} failed: ${err.message}`);
    }
  }

  logger.warn('All AI providers failed, using smart fallback');
  throw new Error('All AI providers unavailable');
}

/**
 * Analyze crop image: Bedrock Vision → Gemini Vision → OpenAI Vision → throw
 */
export async function analyzeCropImage(imageBase64: string, description?: string): Promise<string> {
  const systemPrompt = `You are an expert agricultural scientist and plant pathologist.
Analyze the crop/plant image provided and return a diagnosis in this EXACT JSON format:
{
  "disease": "Name of the disease or 'Healthy' if no disease found",
  "confidence": 85,
  "severity": "Mild/Moderate/Severe",
  "symptoms": ["symptom 1", "symptom 2", "symptom 3"],
  "treatment": ["step 1", "step 2", "step 3", "step 4"],
  "prevention": ["tip 1", "tip 2", "tip 3"],
  "additionalNotes": "Any additional advice for the farmer"
}
Be specific about fungicide/pesticide names and dosages.`;

  const messages: ChatMessage[] = [{
    role: 'user',
    content: description || 'Please analyze this crop image for any diseases, pests, or health issues. Provide detailed diagnosis with treatment recommendations.',
  }];

  const providers = [
    { name: 'Bedrock', fn: () => callBedrock(systemPrompt, messages, imageBase64) },
    { name: 'Gemini', fn: () => callGemini(systemPrompt, messages, imageBase64) },
    { name: 'OpenAI', fn: () => callOpenAI(systemPrompt, messages, imageBase64) },
  ];

  for (const provider of providers) {
    try {
      logger.info(`Trying Vision provider: ${provider.name}`);
      const result = await provider.fn();
      logger.info(`✅ ${provider.name} Vision responded (${result.length} chars)`);
      return result;
    } catch (err: any) {
      logger.warn(`❌ ${provider.name} Vision failed: ${err.message}`);
    }
  }

  throw new Error('All Vision providers unavailable');
}

export default { generateChatResponse, analyzeCropImage };
