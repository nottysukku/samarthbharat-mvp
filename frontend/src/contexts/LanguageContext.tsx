import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'

export type Language = {
  code: string
  name: string
  nativeName: string
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
]

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (code: string) => void
  translate: (text: string) => Promise<string>
  isTranslating: boolean
  languageVersion: number
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Global translation cache persists across re-renders
const globalCache = new Map<string, string>()

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0])
  const [isTranslating, setIsTranslating] = useState(false)
  const [languageVersion, setLanguageVersion] = useState(0)
  const pendingRef = useRef(0)

  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage')
    if (savedLang) {
      const lang = SUPPORTED_LANGUAGES.find(l => l.code === savedLang)
      if (lang) setCurrentLanguage(lang)
    }
  }, [])

  const setLanguage = useCallback((code: string) => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.code === code)
    if (lang) {
      setCurrentLanguage(lang)
      localStorage.setItem('selectedLanguage', code)
      setLanguageVersion(v => v + 1)
    }
  }, [])

  const translate = useCallback(async (text: string): Promise<string> => {
    if (!text || text.trim().length === 0) return text
    if (currentLanguage.code === 'en') return text

    const cacheKey = `${currentLanguage.code}:${text}`
    if (globalCache.has(cacheKey)) {
      return globalCache.get(cacheKey)!
    }

    pendingRef.current++
    setIsTranslating(true)

    try {
      const response = await fetch(`${API_URL}/api/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          targetLanguage: currentLanguage.code,
        }),
      })

      if (!response.ok) throw new Error('Translation failed')

      const data = await response.json()
      const translated = data.translatedText || text

      globalCache.set(cacheKey, translated)
      return translated
    } catch (error) {
      console.error('Translation error:', error)
      return text
    } finally {
      pendingRef.current--
      if (pendingRef.current === 0) {
        setIsTranslating(false)
      }
    }
  }, [currentLanguage.code])

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translate, isTranslating, languageVersion }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
