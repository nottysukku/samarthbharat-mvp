import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export function useTranslation(text: string): string {
  const { currentLanguage, translate, languageVersion } = useLanguage()
  const [translatedText, setTranslatedText] = useState(text)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true

    if (currentLanguage.code === 'en') {
      setTranslatedText(text)
      return
    }

    translate(text).then((result) => {
      if (mountedRef.current) {
        setTranslatedText(result)
      }
    })

    return () => {
      mountedRef.current = false
    }
  }, [text, currentLanguage.code, languageVersion])

  return translatedText
}

export function useTranslations(texts: string[]): string[] {
  const { currentLanguage, translate, languageVersion } = useLanguage()
  const [translatedTexts, setTranslatedTexts] = useState(texts)
  const mountedRef = useRef(true)
  const textsKey = texts.join('|')

  useEffect(() => {
    mountedRef.current = true

    if (currentLanguage.code === 'en') {
      setTranslatedTexts(texts)
      return
    }

    Promise.all(texts.map(text => translate(text))).then((results) => {
      if (mountedRef.current) {
        setTranslatedTexts(results)
      }
    })

    return () => {
      mountedRef.current = false
    }
  }, [textsKey, currentLanguage.code, languageVersion])

  return translatedTexts
}
