import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, MessageSquare, DollarSign, FileText, TrendingUp, Users, 
  Building, Scale, BookOpen, Target, Briefcase, Network, Shield
} from 'lucide-react'

export default function StartupDashboard() {
  const navigate = useNavigate()

  const features = [
    {
      id: 'chat',
      title: 'AI Business Assistant',
      titleHi: 'एआई व्यवसाय सहायक',
      description: 'Get business advice',
      descriptionHi: 'व्यवसाय सलाह प्राप्त करें',
      icon: MessageSquare,
      color: 'bg-blue-600',
      action: () => navigate('/chat/startup')
    },
    {
      id: 'funding',
      title: 'Funding Schemes',
      titleHi: 'फंडिंग योजनाएं',
      description: 'MUDRA, Startup India, MSME',
      descriptionHi: 'मुद्रा, स्टार्टअप इंडिया, एमएसएमई',
      icon: DollarSign,
      color: 'bg-green-600',
      action: () => navigate('/funding-schemes')
    },
    {
      id: 'compliance',
      title: 'Compliance Guide',
      titleHi: 'अनुपालन मार्गदर्शिका',
      description: 'GST, labor laws, regulations',
      descriptionHi: 'जीएसटी, श्रम कानून, नियम',
      icon: Scale,
      color: 'bg-purple-600',
      action: () => navigate('/compliance-guide')
    },
    {
      id: 'registration',
      title: 'Business Registration',
      titleHi: 'व्यवसाय पंजीकरण',
      description: 'Register your startup',
      descriptionHi: 'अपना स्टार्टअप पंजीकृत करें',
      icon: FileText,
      color: 'bg-orange-600',
      action: () => navigate('/business-registration')
    },
    {
      id: 'market',
      title: 'Market Research',
      titleHi: 'बाजार अनुसंधान',
      description: 'Industry trends & insights',
      descriptionHi: 'उद्योग रुझान और अंतर्दृष्टि',
      icon: TrendingUp,
      color: 'bg-cyan-600',
      action: () => navigate('/market-research')
    },
    {
      id: 'incubators',
      title: 'Incubators & Accelerators',
      titleHi: 'इनक्यूबेटर और एक्सेलेरेटर',
      description: 'Find support programs',
      descriptionHi: 'सहायता कार्यक्रम खोजें',
      icon: Building,
      color: 'bg-indigo-600',
      action: () => navigate('/incubators')
    },
    {
      id: 'mentorship',
      title: 'Mentorship Network',
      titleHi: 'मेंटरशिप नेटवर्क',
      description: 'Connect with mentors',
      descriptionHi: 'मेंटर्स से जुड़ें',
      icon: Users,
      color: 'bg-pink-600',
      action: () => navigate('/mentorship-network')
    },
    {
      id: 'resources',
      title: 'Business Resources',
      titleHi: 'व्यवसाय संसाधन',
      description: 'Templates, guides, tools',
      descriptionHi: 'टेम्पलेट, गाइड, उपकरण',
      icon: BookOpen,
      color: 'bg-teal-600',
      action: () => navigate('/business-resources')
    },
    {
      id: 'networking',
      title: 'Networking Events',
      titleHi: 'नेटवर्किंग इवेंट्स',
      description: 'Connect with entrepreneurs',
      descriptionHi: 'उद्यमियों से जुड़ें',
      icon: Network,
      color: 'bg-violet-600',
      action: () => navigate('/networking-events')
    },
    {
      id: 'pitch',
      title: 'Pitch Deck Builder',
      titleHi: 'पिच डेक बिल्डर',
      description: 'Create investor presentations',
      descriptionHi: 'निवेशक प्रस्तुतियाँ बनाएं',
      icon: Target,
      color: 'bg-red-600',
      action: () => navigate('/pitch-deck')
    },
    {
      id: 'legal',
      title: 'Legal Support',
      titleHi: 'कानूनी सहायता',
      description: 'Contracts, IP, agreements',
      descriptionHi: 'अनुबंध, आईपी, समझौते',
      icon: Shield,
      color: 'bg-amber-700',
      action: () => navigate('/legal-support')
    },
    {
      id: 'hiring',
      title: 'Hiring Resources',
      titleHi: 'भर्ती संसाधन',
      description: 'Find talent, job boards',
      descriptionHi: 'प्रतिभा खोजें, जॉब बोर्ड',
      icon: Briefcase,
      color: 'bg-emerald-600',
      action: () => navigate('/hiring-resources')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      {/* Header */}
      <header className="bg-orange-600 text-white shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl">💼</span>
                <div>
                  <h1 className="text-xl font-bold">स्टार्टअप डैशबोर्ड</h1>
                  <p className="text-sm opacity-90">Startup Dashboard</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-orange-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            नमस्ते उद्यमी! Welcome Entrepreneur!
          </h2>
          <p className="text-gray-600">
            Access funding schemes, compliance guides, market research, mentorship, and all resources to grow your startup.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={feature.action}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 text-left group"
            >
              <div className={`absolute inset-0 ${feature.color} opacity-90 group-hover:opacity-95 transition-opacity`}></div>
              <div className="relative z-10 p-6 text-white">
                <feature.icon className="mb-4" size={40} />
                <h3 className="text-lg font-bold mb-1">{feature.titleHi}</h3>
                <p className="text-sm opacity-90 mb-2">{feature.title}</p>
                <p className="text-xs opacity-75">{feature.descriptionHi}</p>
                <p className="text-xs opacity-75">{feature.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
            <h4 className="text-sm text-gray-600 mb-1">Funding Schemes</h4>
            <p className="text-2xl font-bold text-gray-900">15</p>
            <p className="text-sm text-gray-600">Government funding options</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
            <h4 className="text-sm text-gray-600 mb-1">Incubators</h4>
            <p className="text-2xl font-bold text-gray-900">50+</p>
            <p className="text-sm text-gray-600">Across India</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-cyan-600">
            <h4 className="text-sm text-gray-600 mb-1">Mentors Available</h4>
            <p className="text-2xl font-bold text-gray-900">200+</p>
            <p className="text-sm text-gray-600">Industry experts</p>
          </div>
        </div>
      </main>
    </div>
  )
}
