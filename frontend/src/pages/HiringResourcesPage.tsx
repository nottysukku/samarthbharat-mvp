import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Briefcase, Users, ExternalLink, FileText } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function HiringResourcesPage() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState('all')

  const jobBoards = [
    {
      id: 1,
      name: 'Naukri.com',
      nameHi: 'नौकरी.कॉम',
      type: 'Job Board',
      typeHi: 'जॉब बोर्ड',
      description: 'India\'s largest job portal',
      descriptionHi: 'भारत का सबसे बड़ा जॉब पोर्टल',
      features: ['Large candidate pool', 'Resume database', 'Screening tools'],
      featuresHi: ['बड़ा उम्मीदवार पूल', 'रिज्यूमे डेटाबेस', 'स्क्रीनिंग टूल्स'],
      url: 'https://naukri.com',
      color: 'bg-blue-600'
    },
    {
      id: 2,
      name: 'LinkedIn',
      nameHi: 'लिंक्डइन',
      type: 'Job Board',
      typeHi: 'जॉब बोर्ड',
      description: 'Professional networking platform',
      descriptionHi: 'पेशेवर नेटवर्किंग प्लेटफॉर्म',
      features: ['Professional profiles', 'Company branding', 'Targeted reach'],
      featuresHi: ['पेशेवर प्रोफाइल', 'कंपनी ब्रांडिंग', 'लक्षित पहुंच'],
      url: 'https://linkedin.com',
      color: 'bg-indigo-600'
    },
    {
      id: 3,
      name: 'AngelList',
      nameHi: 'एंजेललिस्ट',
      type: 'Job Board',
      typeHi: 'जॉब बोर्ड',
      description: 'Startup hiring platform',
      descriptionHi: 'स्टार्टअप हायरिंग प्लेटफॉर्म',
      features: ['Startup-focused', 'Equity options', 'Tech talent'],
      featuresHi: ['स्टार्टअप-केंद्रित', 'इक्विटी विकल्प', 'टेक प्रतिभा'],
      url: 'https://angel.co',
      color: 'bg-purple-600'
    },
    {
      id: 4,
      name: 'Indeed',
      nameHi: 'इंडीड',
      type: 'Job Board',
      typeHi: 'जॉब बोर्ड',
      description: 'Global job search engine',
      descriptionHi: 'वैश्विक जॉब सर्च इंजन',
      features: ['Free posting', 'Wide reach', 'Easy to use'],
      featuresHi: ['मुफ्त पोस्टिंग', 'व्यापक पहुंच', 'उपयोग में आसान'],
      url: 'https://indeed.co.in',
      color: 'bg-green-600'
    }
  ]

  const templates = [
    {
      id: 1,
      name: 'Job Description Template',
      nameHi: 'जॉब विवरण टेम्पलेट',
      type: 'Template',
      typeHi: 'टेम्पलेट',
      description: 'Write effective job descriptions',
      descriptionHi: 'प्रभावी जॉब विवरण लिखें',
      url: '#',
      color: 'bg-orange-600'
    },
    {
      id: 2,
      name: 'Interview Questions Bank',
      nameHi: 'इंटरव्यू प्रश्न बैंक',
      type: 'Template',
      typeHi: 'टेम्पलेट',
      description: 'Role-specific interview questions',
      descriptionHi: 'भूमिका-विशिष्ट इंटरव्यू प्रश्न',
      url: '#',
      color: 'bg-pink-600'
    },
    {
      id: 3,
      name: 'Offer Letter Template',
      nameHi: 'ऑफर लेटर टेम्पलेट',
      type: 'Template',
      typeHi: 'टेम्पलेट',
      description: 'Professional offer letter format',
      descriptionHi: 'पेशेवर ऑफर लेटर प्रारूप',
      url: '#',
      color: 'bg-red-600'
    },
    {
      id: 4,
      name: 'Onboarding Checklist',
      nameHi: 'ऑनबोर्डिंग चेकलिस्ट',
      type: 'Template',
      typeHi: 'टेम्पलेट',
      description: 'New employee onboarding guide',
      descriptionHi: 'नए कर्मचारी ऑनबोर्डिंग गाइड',
      url: '#',
      color: 'bg-teal-600'
    }
  ]

  const guides = [
    {
      id: 1,
      name: 'Hiring Best Practices',
      nameHi: 'हायरिंग सर्वोत्तम प्रथाएं',
      type: 'Guide',
      typeHi: 'गाइड',
      description: 'Complete hiring guide for startups',
      descriptionHi: 'स्टार्टअप के लिए पूर्ण हायरिंग गाइड',
      url: '#',
      color: 'bg-cyan-600'
    },
    {
      id: 2,
      name: 'Remote Hiring Guide',
      nameHi: 'रिमोट हायरिंग गाइड',
      type: 'Guide',
      typeHi: 'गाइड',
      description: 'How to hire remote employees',
      descriptionHi: 'रिमोट कर्मचारियों को कैसे हायर करें',
      url: '#',
      color: 'bg-amber-600'
    }
  ]

  const types = ['all', 'Job Board', 'Template', 'Guide']

  const allResources = [...jobBoards, ...templates, ...guides]
  const filteredResources = selectedType === 'all' 
    ? allResources 
    : allResources.filter(r => r.type === selectedType)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-emerald-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <Briefcase size={32} />
                <div>
                  <h1 className="text-xl font-bold">भर्ती संसाधन</h1>
                  <p className="text-sm opacity-90">Hiring Resources</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedType === type ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'All Resources / सभी संसाधन' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`${resource.color} p-4 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  {resource.type === 'Job Board' ? <Users size={32} /> : <FileText size={32} />}
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                    {resource.typeHi}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">{resource.nameHi}</h3>
                <p className="text-sm opacity-90">{resource.name}</p>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-700 mb-1">{resource.descriptionHi}</p>
                <p className="text-xs text-gray-600 mb-4">{resource.description}</p>

                {'features' in resource && 'featuresHi' in resource && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Features / विशेषताएं:</p>
                    <ul className="space-y-1">
                      {(resource.featuresHi as string[]).map((feature: string, idx: number) => (
                        <li key={idx} className="text-xs text-gray-600">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <ExternalLink size={18} />
                  {resource.type === 'Job Board' ? 'Visit / विजिट करें' : 'Download / डाउनलोड करें'}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Hiring Tips */}
        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg shadow-md p-6 border-l-4 border-emerald-600">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Hiring Tips for Startups / स्टार्टअप के लिए हायरिंग टिप्स
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Define role clearly before hiring / हायरिंग से पहले भूमिका स्पष्ट रूप से परिभाषित करें</li>
            <li>• Look for cultural fit, not just skills / केवल कौशल नहीं, सांस्कृतिक फिट देखें</li>
            <li>• Use structured interviews / संरचित इंटरव्यू का उपयोग करें</li>
            <li>• Check references thoroughly / संदर्भों की अच्छी तरह जांच करें</li>
            <li>• Offer competitive compensation / प्रतिस्पर्धी मुआवजा प्रदान करें</li>
            <li>• Provide growth opportunities / विकास के अवसर प्रदान करें</li>
            <li>• Create smooth onboarding process / सुचारू ऑनबोर्डिंग प्रक्रिया बनाएं</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
