import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Download, FileText, Video, ExternalLink } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function BusinessResourcesPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const resources = [
    {
      id: 1,
      title: 'Business Plan Template',
      titleHi: 'व्यवसाय योजना टेम्पलेट',
      category: 'Templates',
      categoryHi: 'टेम्पलेट',
      type: 'PDF',
      description: 'Comprehensive business plan template',
      descriptionHi: 'व्यापक व्यवसाय योजना टेम्पलेट',
      downloads: 5420,
      url: '#',
      color: 'bg-blue-600'
    },
    {
      id: 2,
      title: 'Pitch Deck Template',
      titleHi: 'पिच डेक टेम्पलेट',
      category: 'Templates',
      categoryHi: 'टेम्पलेट',
      type: 'PPT',
      description: 'Investor pitch deck template',
      descriptionHi: 'निवेशक पिच डेक टेम्पलेट',
      downloads: 4850,
      url: '#',
      color: 'bg-purple-600'
    },
    {
      id: 3,
      title: 'Financial Model Template',
      titleHi: 'वित्तीय मॉडल टेम्पलेट',
      category: 'Templates',
      categoryHi: 'टेम्पलेट',
      type: 'Excel',
      description: '3-year financial projection model',
      descriptionHi: '3-वर्षीय वित्तीय प्रक्षेपण मॉडल',
      downloads: 3920,
      url: '#',
      color: 'bg-green-600'
    },
    {
      id: 4,
      title: 'Startup Funding Guide',
      titleHi: 'स्टार्टअप फंडिंग गाइड',
      category: 'Guides',
      categoryHi: 'गाइड',
      type: 'PDF',
      description: 'Complete guide to raising funds',
      descriptionHi: 'फंड जुटाने की पूर्ण गाइड',
      downloads: 6200,
      url: '#',
      color: 'bg-orange-600'
    },
    {
      id: 5,
      title: 'Marketing Strategy Guide',
      titleHi: 'मार्केटिंग रणनीति गाइड',
      category: 'Guides',
      categoryHi: 'गाइड',
      type: 'PDF',
      description: 'Digital marketing strategies for startups',
      descriptionHi: 'स्टार्टअप के लिए डिजिटल मार्केटिंग रणनीतियां',
      downloads: 5100,
      url: '#',
      color: 'bg-pink-600'
    },
    {
      id: 6,
      title: 'Legal Compliance Checklist',
      titleHi: 'कानूनी अनुपालन चेकलिस्ट',
      category: 'Guides',
      categoryHi: 'गाइड',
      type: 'PDF',
      description: 'Essential legal requirements',
      descriptionHi: 'आवश्यक कानूनी आवश्यकताएं',
      downloads: 4300,
      url: '#',
      color: 'bg-red-600'
    },
    {
      id: 7,
      title: 'How to Build MVP',
      titleHi: 'एमवीपी कैसे बनाएं',
      category: 'Videos',
      categoryHi: 'वीडियो',
      type: 'Video',
      description: 'Step-by-step MVP development',
      descriptionHi: 'चरण-दर-चरण एमवीपी विकास',
      downloads: 8900,
      url: '#',
      color: 'bg-indigo-600'
    },
    {
      id: 8,
      title: 'Fundraising Masterclass',
      titleHi: 'फंडरेजिंग मास्टरक्लास',
      category: 'Videos',
      categoryHi: 'वीडियो',
      type: 'Video',
      description: 'Learn from successful founders',
      descriptionHi: 'सफल संस्थापकों से सीखें',
      downloads: 7600,
      url: '#',
      color: 'bg-teal-600'
    },
    {
      id: 9,
      title: 'Startup Toolkit',
      titleHi: 'स्टार्टअप टूलकिट',
      category: 'Tools',
      categoryHi: 'उपकरण',
      type: 'Link',
      description: 'Essential tools for startups',
      descriptionHi: 'स्टार्टअप के लिए आवश्यक उपकरण',
      downloads: 9200,
      url: '#',
      color: 'bg-cyan-600'
    },
    {
      id: 10,
      title: 'Market Research Template',
      titleHi: 'बाजार अनुसंधान टेम्पलेट',
      category: 'Templates',
      categoryHi: 'टेम्पलेट',
      type: 'Excel',
      description: 'Analyze your target market',
      descriptionHi: 'अपने लक्षित बाजार का विश्लेषण करें',
      downloads: 3400,
      url: '#',
      color: 'bg-amber-600'
    }
  ]

  const categories = ['all', 'Templates', 'Guides', 'Videos', 'Tools']

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-teal-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <BookOpen size={32} />
                <div>
                  <h1 className="text-xl font-bold">व्यवसाय संसाधन</h1>
                  <p className="text-sm opacity-90">Business Resources</p>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === cat ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Resources / सभी संसाधन' : cat}
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
                  {resource.type === 'Video' ? <Video size={32} /> : <FileText size={32} />}
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">{resource.titleHi}</h3>
                <p className="text-sm opacity-90">{resource.title}</p>
              </div>

              <div className="p-4">
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {resource.categoryHi}
                </span>

                <p className="mt-3 text-sm text-gray-700 mb-1">{resource.descriptionHi}</p>
                <p className="text-xs text-gray-600 mb-4">{resource.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Download size={16} />
                    <span>{resource.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>

                <a
                  href={resource.url}
                  className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  {resource.type === 'Video' || resource.type === 'Link' ? <ExternalLink size={18} /> : <Download size={18} />}
                  {resource.type === 'Video' || resource.type === 'Link' ? 'View / देखें' : 'Download / डाउनलोड करें'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
