import { useState, useRef, useEffect } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useLanguage, SUPPORTED_LANGUAGES } from '../contexts/LanguageContext'

export default function LanguageSelector() {
  const { currentLanguage, setLanguage, isTranslating } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm px-3 py-2 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 group"
      >
        <div className={`transition-transform duration-500 ${isTranslating ? 'animate-spin' : 'group-hover:rotate-12'}`}>
          <Globe size={18} />
        </div>
        <span className="text-sm font-semibold hidden sm:inline">{currentLanguage.nativeName}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2"
          style={{
            animation: 'dropdownIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="px-4 py-3 bg-gradient-to-r from-orange-500 via-white to-green-600 text-center">
            <p className="text-xs font-bold text-gray-800">🇮🇳 Select Language / भाषा चुनें</p>
          </div>
          <div className="max-h-72 overflow-y-auto py-1">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-all duration-200 hover:bg-orange-50 hover:pl-5 ${
                  currentLanguage.code === lang.code ? 'bg-orange-50 border-l-3 border-orange-500' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.code === 'en' ? '🌐' : lang.code === 'hi' ? '🏛️' : lang.code === 'bn' ? '🪷' : lang.code === 'te' ? '🎭' : lang.code === 'mr' ? '🏰' : lang.code === 'ta' ? '🛕' : lang.code === 'gu' ? '🦁' : lang.code === 'kn' ? '🪘' : lang.code === 'ml' ? '🌴' : '🌾'}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{lang.nativeName}</p>
                    <p className="text-xs text-gray-500">{lang.name}</p>
                  </div>
                </div>
                {currentLanguage.code === lang.code && (
                  <div className="bg-orange-500 text-white rounded-full p-0.5">
                    <Check size={12} />
                  </div>
                )}
              </button>
            ))}
          </div>
          {isTranslating && (
            <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
              <div className="flex items-center gap-2 text-xs text-blue-700">
                <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                Translating...
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
