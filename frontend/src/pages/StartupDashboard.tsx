import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, MessageSquare, DollarSign, FileText, TrendingUp, Users, 
  Building, Scale, BookOpen, Target, Briefcase, Network, Shield
} from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function StartupDashboard() {
  const navigate = useNavigate()

  const features = [
    {
      id: 'chat',
      title: 'AI Business Assistant',
      description: 'Get business advice',
      icon: MessageSquare,
      color: 'bg-blue-600',
      action: () => navigate('/chat/startup')
    },
    {
      id: 'funding',
      title: 'Funding Schemes',
      description: 'MUDRA, Startup India, MSME',
      icon: DollarSign,
      color: 'bg-green-600',
      action: () => navigate('/funding-schemes')
    },
    {
      id: 'compliance',
      title: 'Compliance Guide',
      description: 'GST, labor laws, regulations',
      icon: Scale,
      color: 'bg-purple-600',
      action: () => navigate('/compliance-guide')
    },
    {
      id: 'registration',
      title: 'Business Registration',
      description: 'Register your startup',
      icon: FileText,
      color: 'bg-orange-600',
      action: () => navigate('/business-registration')
    },
    {
      id: 'market',
      title: 'Market Research',
      description: 'Industry trends & insights',
      icon: TrendingUp,
      color: 'bg-cyan-600',
      action: () => navigate('/market-research')
    },
    {
      id: 'incubators',
      title: 'Incubators & Accelerators',
      description: 'Find support programs',
      icon: Building,
      color: 'bg-indigo-600',
      action: () => navigate('/incubators')
    },
    {
      id: 'mentorship',
      title: 'Mentorship Network',
      description: 'Connect with mentors',
      icon: Users,
      color: 'bg-pink-600',
      action: () => navigate('/mentorship-network')
    },
    {
      id: 'resources',
      title: 'Business Resources',
      description: 'Templates, guides, tools',
      icon: BookOpen,
      color: 'bg-teal-600',
      action: () => navigate('/business-resources')
    },
    {
      id: 'networking',
      title: 'Networking Events',
      description: 'Connect with entrepreneurs',
      icon: Network,
      color: 'bg-violet-600',
      action: () => navigate('/networking-events')
    },
    {
      id: 'pitch',
      title: 'Pitch Deck Builder',
      description: 'Create investor presentations',
      icon: Target,
      color: 'bg-red-600',
      action: () => navigate('/pitch-deck')
    },
    {
      id: 'legal',
      title: 'Legal Support',
      description: 'Contracts, IP, agreements',
      icon: Shield,
      color: 'bg-amber-700',
      action: () => navigate('/legal-support')
    },
    {
      id: 'hiring',
      title: 'Hiring Resources',
      description: 'Find talent, job boards',
      icon: Briefcase,
      color: 'bg-emerald-600',
      action: () => navigate('/hiring-resources')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
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
              <span className="font-medium"><T>Back</T></span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl">💼</span>
                <div>
                  <h1 className="text-xl font-bold"><T>Startup Dashboard</T></h1>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-orange-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            <T>Welcome Entrepreneur!</T>
          </h2>
          <p className="text-gray-600">
            <T>Access funding schemes, compliance guides, market research, mentorship, and all resources to grow your startup.</T>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 stagger-children">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={feature.action}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:-translate-y-1 text-left group card-hover"
            >
              <div className={`absolute inset-0 ${feature.color} opacity-90 group-hover:opacity-95 transition-opacity`}></div>
              <div className="relative z-10 p-6 text-white">
                <feature.icon className="mb-4" size={40} />
                <h3 className="text-lg font-bold mb-1"><T>{feature.title}</T></h3>
                <p className="text-sm opacity-90"><T>{feature.description}</T></p>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
            <h4 className="text-sm text-gray-600 mb-1"><T>Funding Schemes</T></h4>
            <p className="text-2xl font-bold text-gray-900">15</p>
            <p className="text-sm text-gray-600"><T>Government funding options</T></p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
            <h4 className="text-sm text-gray-600 mb-1"><T>Incubators</T></h4>
            <p className="text-2xl font-bold text-gray-900">50+</p>
            <p className="text-sm text-gray-600"><T>Across India</T></p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-cyan-600">
            <h4 className="text-sm text-gray-600 mb-1"><T>Mentors Available</T></h4>
            <p className="text-2xl font-bold text-gray-900">200+</p>
            <p className="text-sm text-gray-600"><T>Industry experts</T></p>
          </div>
        </div>
      </main>
    </div>
  )
}
