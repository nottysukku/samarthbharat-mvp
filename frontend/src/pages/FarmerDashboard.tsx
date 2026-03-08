import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, MessageSquare, TrendingUp, Cloud, Leaf, FileText, 
  Phone, MapPin, Camera, AlertTriangle, BookOpen, Users, Shield
} from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function FarmerDashboard() {
  const navigate = useNavigate()

  const features = [
    {
      id: 'chat',
      title: 'AI Assistant',
      description: 'Chat with AI for farming advice',
      icon: MessageSquare,
      color: 'bg-blue-600',
      action: () => navigate('/chat/farmer')
    },
    {
      id: 'mandi',
      title: 'Mandi Prices',
      description: 'Real-time crop prices',
      icon: TrendingUp,
      color: 'bg-green-600',
      action: () => navigate('/mandi-prices')
    },
    {
      id: 'weather',
      title: 'Weather Forecast',
      description: '7-day weather & advisories',
      icon: Cloud,
      color: 'bg-cyan-600',
      action: () => navigate('/weather')
    },
    {
      id: 'disease',
      title: 'Crop Disease Diagnosis',
      description: 'Upload photo for diagnosis',
      icon: Camera,
      color: 'bg-red-600',
      action: () => navigate('/crop-diagnosis')
    },
    {
      id: 'schemes',
      title: 'Government Schemes',
      description: 'PM-KISAN, subsidies, insurance',
      icon: FileText,
      color: 'bg-orange-600',
      action: () => navigate('/schemes/farmer')
    },
    {
      id: 'soil',
      title: 'Soil Health Card',
      description: 'Check soil health status',
      icon: Leaf,
      color: 'bg-amber-700',
      action: () => navigate('/soil-health')
    },
    {
      id: 'legal',
      title: 'Legal Rights & Complaints',
      description: 'Know your rights, file complaints',
      icon: Shield,
      color: 'bg-purple-600',
      action: () => navigate('/legal-rights')
    },
    {
      id: 'market',
      title: 'Market Linkage',
      description: 'Connect with buyers',
      icon: Users,
      color: 'bg-indigo-600',
      action: () => navigate('/market-linkage')
    },
    {
      id: 'training',
      title: 'Training & Videos',
      description: 'Learn modern farming techniques',
      icon: BookOpen,
      color: 'bg-teal-600',
      action: () => navigate('/training')
    },
    {
      id: 'emergency',
      title: 'Emergency Helpline',
      description: 'Call for urgent help',
      icon: Phone,
      color: 'bg-red-700',
      action: () => navigate('/emergency-helpline')
    },
    {
      id: 'nearby',
      title: 'Nearby Services',
      description: 'Find mandis, banks, KVKs',
      icon: MapPin,
      color: 'bg-pink-600',
      action: () => navigate('/nearby-services')
    },
    {
      id: 'alerts',
      title: 'Weather Alerts',
      description: 'Severe weather notifications',
      icon: AlertTriangle,
      color: 'bg-yellow-600',
      action: () => navigate('/weather-alerts')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      <div className="gov-header"></div>

      {/* Header */}
      <header className="bg-green-700 text-white shadow-lg border-b-4 border-orange-500">
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
                <span className="text-3xl">🌾</span>
                <div>
                  <h1 className="text-xl font-bold"><T>Farmer Dashboard</T></h1>
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
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-green-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            <T>Welcome Farmer!</T>
          </h2>
          <p className="text-gray-600">
            <T>Access all farming services, government schemes, market prices, and expert advice in one place.</T>
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
            <h4 className="text-sm text-gray-600 mb-1"><T>Today's Top Price</T></h4>
            <p className="text-2xl font-bold text-gray-900">₹2,100/quintal</p>
            <p className="text-sm text-gray-600"><T>Wheat</T> - Azadpur Mandi</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
            <h4 className="text-sm text-gray-600 mb-1"><T>Weather Today</T></h4>
            <p className="text-2xl font-bold text-gray-900">28°C</p>
            <p className="text-sm text-gray-600"><T>Partly Cloudy</T> - 20% <T>Rain</T></p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-600">
            <h4 className="text-sm text-gray-600 mb-1"><T>Active Schemes</T></h4>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600"><T>Government schemes for you</T></p>
          </div>
        </div>
      </main>
    </div>
  )
}
