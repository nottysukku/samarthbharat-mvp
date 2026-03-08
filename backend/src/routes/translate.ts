import express from 'express'
import axios from 'axios'

const router = express.Router()

// Translation cache to reduce API calls
const translationCache = new Map<string, string>()

const LANG_MAP: Record<string, string> = {
  hi: 'hi', ta: 'ta', te: 'te', bn: 'bn', mr: 'mr',
  gu: 'gu', kn: 'kn', ml: 'ml', pa: 'pa', or: 'or'
}

async function translateText(text: string, target: string): Promise<string> {
  const cacheKey = `${target}:${text}`
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!
  }

  // Try MyMemory API (free, no key needed)
  try {
    const langPair = `en|${LANG_MAP[target] || target}`
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`
    const response = await axios.get(url, { timeout: 5000 })
    const translated = response.data?.responseData?.translatedText
    if (translated && translated !== text && !translated.includes('MYMEMORY WARNING')) {
      translationCache.set(cacheKey, translated)
      return translated
    }
  } catch (e) {
    console.log('MyMemory fallback failed, trying Gemini...')
  }

  // Fallback: Gemini translation  
  try {
    const geminiKey = process.env.GEMINI_API_KEY
    if (geminiKey) {
      const langNames: Record<string, string> = {
        hi: 'Hindi', ta: 'Tamil', te: 'Telugu', bn: 'Bengali', mr: 'Marathi',
        gu: 'Gujarati', kn: 'Kannada', ml: 'Malayalam', pa: 'Punjabi', or: 'Odia'
      }
      const langName = langNames[target] || target
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`
      const response = await axios.post(url, {
        contents: [{ parts: [{ text: `Translate the following English text to ${langName}. Return ONLY the translated text, nothing else:\n\n${text}` }] }]
      }, { timeout: 8000 })
      const translated = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      if (translated) {
        translationCache.set(cacheKey, translated)
        return translated
      }
    }
  } catch (e) {
    console.log('Gemini translation failed')
  }

  return text
}

router.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage } = req.body

    if (!text || !targetLanguage) {
      return res.status(400).json({ error: 'Missing text or targetLanguage' })
    }

    if (targetLanguage === 'en') {
      return res.json({ translatedText: text })
    }

    const translatedText = await translateText(text, targetLanguage)
    res.json({ translatedText })
  } catch (error: any) {
    console.error('Translation error:', error?.message)
    res.status(500).json({ error: 'Translation failed' })
  }
})

router.post('/translate-batch', async (req, res) => {
  try {
    const { texts, targetLanguage } = req.body

    if (!texts || !Array.isArray(texts) || !targetLanguage) {
      return res.status(400).json({ error: 'Missing texts array or targetLanguage' })
    }

    if (targetLanguage === 'en') {
      return res.json({ translations: texts })
    }

    const translations = await Promise.all(
      texts.map((text: string) => translateText(text, targetLanguage))
    )

    res.json({ translations })
  } catch (error: any) {
    console.error('Batch translation error:', error?.message)
    res.status(500).json({ error: 'Batch translation failed' })
  }
})

export default router
