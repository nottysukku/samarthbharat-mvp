import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, FileText, Download, ExternalLink } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function LegalSupportPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const resources = [
    {
      id: 1,
      title: 'Founder Agreement Template',
      titleHi: 'संस्थापक समझौता टेम्पलेट',
      category: 'Contracts',
      categoryHi: 'अनुबंध',
      description: 'Agreement between co-founders',
      descriptionHi: 'सह-संस्थापकों के बीच समझौता',
      type: 'Template',
      url: '#',
      color: 'bg-blue-600'
    },
    {
      id: 2,
      title: 'NDA Template',
      titleHi: 'एनडीए टेम्पलेट',
      category: 'Contracts',
      categoryHi: 'अनुबंध',
      description: 'Non-disclosure agreement',
      descriptionHi: 'गैर-प्रकटीकरण समझौता',
      type: 'Template',
      url: '#',
      color: 'bg-purple-600'
    },
    {
      id: 3,
      title: 'Employment Contract',
      titleHi: 'रोजगार अनुबंध',
      category: 'Contracts',
      categoryHi: 'अनुबंध',
      description: 'Employee agreement template',
      descriptionHi: 'कर्मचारी समझौता टेम्पलेट',
      type: 'Template',
      url: '#',
      color: 'bg-green-600'
    },
    {
      id: 4,
      title: 'Trademark Registration Guide',
      titleHi: 'ट्रेडमार्क पंजीकरण गाइड',
      category: 'IP Rights',
      categoryHi: 'आईपी अधिकार',
      description: 'How to register trademark',
      descriptionHi: 'ट्रेडमार्क कैसे पंजीकृत करें',
      type: 'Guide',
      url: '#',
      color: 'bg-orange-600'
    },
    {
      id: 5,
      title: 'Patent Filing Process',
      titleHi: 'पेटेंट फाइलिंग प्रक्रिया',
      category: 'IP Rights',
      categoryHi: 'आईपी अधिकार',
      description: 'Step-by-step patent guide',
      descriptionHi: 'चरण-दर-चरण पेटेंट गाइड',
      type: 'Guide',
      url: '#',
      color: 'bg-red-600'
    },
    {
      id: 6,
      title: 'Copyright Protection',
      titleHi: 'कॉपीराइट सुरक्षा',
      category: 'IP Rights',
      categoryHi: 'आईपी अधिकार',
      description: 'Protect your creative work',
      descriptionHi: 'अपने रचनात्मक कार्य की रक्षा करें',
      type: 'Guide',
      url: '#',
      color: 'bg-pink-600'
    },
    {
      id: 7,
      title: 'Privacy Policy Template',
      titleHi: 'गोपनीयता नीति टेम्पलेट',
      category: 'Compliance',
      categoryHi: 'अनुपालन',
      description: 'GDPR compliant policy',
      descriptionHi: 'जीडीपीआर अनुपालन नीति',
      type: 'Template',
      url: '#',
      color: 'bg-indigo-600'
    },
    {
      id: 8,
      title: 'Terms & Conditions',
      titleHi: 'नियम और शर्तें',
      category: 'Compliance',
      categoryHi: 'अनुपालन',
      description: 'Website T&C template',
      descriptionHi: 'वेबसाइट टी एंड सी टेम्पलेट',
      type: 'Template',
      url: '#',
      color: 'bg-teal-600'
    },
    {
      id: 9,
      title: 'Data Protection Guide',
      titleHi: 'डेटा सुरक्षा गाइड',
      category: 'Compliance',
      categoryHi: 'अनुपालन',
      description: 'Comply with data laws',
      descriptionHi: 'डेटा कानूनों का पालन करें',
      type: 'Guide',
      url: '#',
      color: 'bg-cyan-600'
    },
    {
      id: 10,
      title: 'Shareholder Agreement',
      titleHi: 'शेयरधारक समझौता',
      category: 'Contracts',
      categoryHi: 'अनुबंध',
      description: 'Agreement with investors',
      descriptionHi: 'निवेशकों के साथ समझौता',
      type: 'Template',
      url: '#',
      color: 'bg-amber-600'
    }
  ]

  const categories = ['all', 'Contracts', 'IP Rights', 'Compliance']

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory)

  const legalServices = [
    {
      name: 'LegalZoom India',
      nameHi: 'लीगलज़ूम इंडिया',
      services: ['Company registration', 'Trademark', 'Contracts'],
      servicesHi: ['कंपनी पंजीकरण', 'ट्रेडमार्क', 'अनुबंध'],
      url: '#'
    },
    {
      name: 'Vakilsearch',
      nameHi: 'वकीलसर्च',
      services: ['Legal compliance', 'IP filing', 'Documentation'],
      servicesHi: ['कानूनी अनुपालन', 'आईपी फाइलिंग', 'दस्तावेज़ीकरण'],
      url: '#'
    },
    {
      name: 'MyAdvo',
      nameHi: 'माईएडवो',
      services: ['Legal consultation', 'Contract review', 'Dispute resolution'],
      servicesHi: ['कानूनी परामर्श', 'अनुबंध समीक्षा', 'विवाद समाधान'],
      url: '#'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-amber-700 text-white shadow-lg border-b-4 border-orange-500">
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
                <Shield size={32} />
                <div>
                  <h1 className="text-xl font-bold">कानूनी सहायता</h1>
                  <p className="text-sm opacity-90">Legal Support</p>
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
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === cat ? 'bg-amber-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Resources / सभी संसाधन' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`${resource.color} p-4 text-white`}>
                <FileText size={32} className="mb-2" />
                <h3 className="text-lg font-bold mb-1">{resource.titleHi}</h3>
                <p className="text-sm opacity-90">{resource.title}</p>
              </div>

              <div className="p-4">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {resource.categoryHi}
                </span>

                <p className="mt-3 text-sm text-gray-700 mb-1">{resource.descriptionHi}</p>
                <p className="text-xs text-gray-600 mb-4">{resource.description}</p>

                <a
                  href={resource.url}
                  className="w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download / डाउनलोड करें
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Services */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Legal Service Providers / कानूनी सेवा प्रदाता
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {legalServices.map((service, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.nameHi}</h3>
                <p className="text-sm text-gray-600 mb-3">{service.name}</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Services / सेवाएं:</p>
                  <ul className="space-y-1">
                    {service.servicesHi.map((s, i) => (
                      <li key={i} className="text-sm text-gray-600">
                        • {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={service.url}
                  className="w-full bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center justify-center gap-2 text-sm"
                >
                  <ExternalLink size={16} />
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
