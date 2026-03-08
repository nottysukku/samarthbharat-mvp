import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Target, FileText, Download, CheckCircle } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function PitchDeckBuilderPage() {
  const navigate = useNavigate()

  const slides = [
    {
      id: 1,
      title: 'Cover Slide',
      titleHi: 'कवर स्लाइड',
      description: 'Company name, tagline, logo',
      descriptionHi: 'कंपनी का नाम, टैगलाइन, लोगो',
      tips: ['Keep it simple', 'Use high-quality logo', 'Add contact info'],
      tipsHi: ['इसे सरल रखें', 'उच्च गुणवत्ता वाला लोगो उपयोग करें', 'संपर्क जानकारी जोड़ें'],
      color: 'bg-blue-600'
    },
    {
      id: 2,
      title: 'Problem Statement',
      titleHi: 'समस्या विवरण',
      description: 'What problem are you solving?',
      descriptionHi: 'आप किस समस्या का समाधान कर रहे हैं?',
      tips: ['Be specific', 'Use real data', 'Show pain points'],
      tipsHi: ['विशिष्ट रहें', 'वास्तविक डेटा उपयोग करें', 'दर्द बिंदु दिखाएं'],
      color: 'bg-red-600'
    },
    {
      id: 3,
      title: 'Solution',
      titleHi: 'समाधान',
      description: 'Your product/service',
      descriptionHi: 'आपका उत्पाद/सेवा',
      tips: ['Show how it solves problem', 'Highlight unique features', 'Use visuals'],
      tipsHi: ['दिखाएं कि यह समस्या कैसे हल करता है', 'अद्वितीय सुविधाओं को हाइलाइट करें', 'दृश्य उपयोग करें'],
      color: 'bg-green-600'
    },
    {
      id: 4,
      title: 'Market Opportunity',
      titleHi: 'बाजार अवसर',
      description: 'TAM, SAM, SOM',
      descriptionHi: 'टीएएम, एसएएम, एसओएम',
      tips: ['Show market size', 'Growth potential', 'Target segments'],
      tipsHi: ['बाजार आकार दिखाएं', 'विकास क्षमता', 'लक्षित खंड'],
      color: 'bg-purple-600'
    },
    {
      id: 5,
      title: 'Business Model',
      titleHi: 'व्यवसाय मॉडल',
      description: 'How you make money',
      descriptionHi: 'आप पैसे कैसे कमाते हैं',
      tips: ['Revenue streams', 'Pricing strategy', 'Unit economics'],
      tipsHi: ['राजस्व धाराएं', 'मूल्य निर्धारण रणनीति', 'यूनिट अर्थशास्त्र'],
      color: 'bg-orange-600'
    },
    {
      id: 6,
      title: 'Traction',
      titleHi: 'कर्षण',
      description: 'Growth metrics',
      descriptionHi: 'विकास मेट्रिक्स',
      tips: ['Show growth', 'Key metrics', 'Milestones achieved'],
      tipsHi: ['विकास दिखाएं', 'प्रमुख मेट्रिक्स', 'मील के पत्थर हासिल किए'],
      color: 'bg-cyan-600'
    },
    {
      id: 7,
      title: 'Competition',
      titleHi: 'प्रतिस्पर्धा',
      description: 'Competitive landscape',
      descriptionHi: 'प्रतिस्पर्धी परिदृश्य',
      tips: ['Show competitors', 'Your advantages', 'Differentiation'],
      tipsHi: ['प्रतियोगियों को दिखाएं', 'आपके फायदे', 'विभेदन'],
      color: 'bg-indigo-600'
    },
    {
      id: 8,
      title: 'Team',
      titleHi: 'टीम',
      description: 'Founding team',
      descriptionHi: 'संस्थापक टीम',
      tips: ['Show expertise', 'Relevant experience', 'Advisors'],
      tipsHi: ['विशेषज्ञता दिखाएं', 'प्रासंगिक अनुभव', 'सलाहकार'],
      color: 'bg-pink-600'
    },
    {
      id: 9,
      title: 'Financial Projections',
      titleHi: 'वित्तीय अनुमान',
      description: '3-5 year projections',
      descriptionHi: '3-5 वर्ष के अनुमान',
      tips: ['Revenue forecast', 'Key assumptions', 'Break-even point'],
      tipsHi: ['राजस्व पूर्वानुमान', 'प्रमुख धारणाएं', 'ब्रेक-ईवन पॉइंट'],
      color: 'bg-teal-600'
    },
    {
      id: 10,
      title: 'Funding Ask',
      titleHi: 'फंडिंग मांग',
      description: 'How much and why',
      descriptionHi: 'कितना और क्यों',
      tips: ['Amount needed', 'Use of funds', 'Milestones to achieve'],
      tipsHi: ['आवश्यक राशि', 'धन का उपयोग', 'हासिल करने के लिए मील के पत्थर'],
      color: 'bg-amber-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-red-600 text-white shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <Target size={32} />
                <div>
                  <h1 className="text-xl font-bold">पिच डेक बिल्डर</h1>
                  <p className="text-sm opacity-90">Pitch Deck Builder</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Build Your Perfect Pitch Deck / अपना परफेक्ट पिच डेक बनाएं
          </h2>
          <p className="text-gray-700 mb-4">
            A pitch deck is a presentation that entrepreneurs use to communicate their business idea to investors. 
            Follow this guide to create a compelling pitch deck.
          </p>
          <p className="text-gray-700 mb-4">
            पिच डेक एक प्रस्तुति है जिसका उपयोग उद्यमी अपने व्यावसायिक विचार को निवेशकों तक पहुंचाने के लिए करते हैं।
            एक आकर्षक पिच डेक बनाने के लिए इस गाइड का पालन करें।
          </p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-bold flex items-center gap-2">
            <Download size={20} />
            Download Template / टेम्पलेट डाउनलोड करें
          </button>
        </div>

        {/* Slides */}
        <div className="space-y-6">
          {slides.map((slide) => (
            <div key={slide.id} className={`${slide.color} text-white rounded-lg shadow-lg overflow-hidden`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                        {slide.id}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{slide.titleHi}</h3>
                        <p className="text-lg opacity-90">{slide.title}</p>
                      </div>
                    </div>
                  </div>
                  <FileText size={32} className="opacity-75" />
                </div>

                <div className="mb-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <p className="font-semibold mb-1">{slide.descriptionHi}</p>
                  <p className="text-sm opacity-75">{slide.description}</p>
                </div>

                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <p className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle size={18} />
                    Key Tips / मुख्य सुझाव:
                  </p>
                  <ul className="space-y-2">
                    {slide.tipsHi.map((tip, idx) => (
                      <li key={idx} className="text-sm">
                        <p className="font-semibold">• {tip}</p>
                        <p className="text-xs opacity-75 ml-3">{slide.tips[idx]}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Best Practices */}
        <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg shadow-md p-6 border-l-4 border-red-600">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Best Practices / सर्वोत्तम प्रथाएं
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Keep it to 10-15 slides / इसे 10-15 स्लाइड तक रखें</li>
            <li>• Use simple, clear language / सरल, स्पष्ट भाषा का उपयोग करें</li>
            <li>• Include visuals and charts / दृश्य और चार्ट शामिल करें</li>
            <li>• Practice your pitch / अपनी पिच का अभ्यास करें</li>
            <li>• Tailor to your audience / अपने दर्शकों के अनुसार तैयार करें</li>
            <li>• Be honest about challenges / चुनौतियों के बारे में ईमानदार रहें</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
