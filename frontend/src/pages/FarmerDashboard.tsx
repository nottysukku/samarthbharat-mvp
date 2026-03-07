import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, MessageSquare, TrendingUp, Cloud, Leaf, FileText, 
  Phone, MapPin, Camera, AlertTriangle, BookOpen, Users, Shield
} from 'lucide-react'

export default function FarmerDashboard() {
  const navigate = useNavigate()

  const features = [
    {
      id: 'chat',
      title: 'AI Assistant',
      titleHi: 'एआई सहायक',
      description: 'Chat with AI for farming advice',
      descriptionHi: 'खेती सलाह के लिए एआई से बात करें',
      icon: MessageSquare,
      color: 'bg-blue-600',
      action: () => navigate('/chat/farmer')
    },
    {
      id: 'mandi',
      title: 'Mandi Prices',
      titleHi: 'मंडी भाव',
      description: 'Real-time crop prices',
      descriptionHi: 'वास्तविक समय फसल मूल्य',
      icon: TrendingUp,
      color: 'bg-green-600',
      action: () => navigate('/mandi-prices')
    },
    {
      id: 'weather',
      title: 'Weather Forecast',
      titleHi: 'मौसम पूर्वानुमान',
      description: '7-day weather & advisories',
      descriptionHi: '7-दिन मौसम और सलाह',
      icon: Cloud,
      color: 'bg-cyan-600',
      action: () => navigate('/weather')
    },
    {
      id: 'disease',
      title: 'Crop Disease Diagnosis',
      titleHi: 'फसल रोग निदान',
      description: 'Upload photo for diagnosis',
      descriptionHi: 'निदान के लिए फोटो अपलोड करें',
      icon: Camera,
      color: 'bg-red-600',
      action: () => navigate('/crop-diagnosis')
    },
    {
      id: 'schemes',
      title: 'Government Schemes',
      titleHi: 'सरकारी योजनाएं',
      description: 'PM-KISAN, subsidies, insurance',
      descriptionHi: 'पीएम-किसान, सब्सिडी, बीमा',
      icon: FileText,
      color: 'bg-orange-600',
      action: () => navigate('/schemes/farmer')
    },
    {
      id: 'soil',
      title: 'Soil Health Card',
      titleHi: 'मृदा स्वास्थ्य कार्ड',
      description: 'Check soil health status',
      descriptionHi: 'मिट्टी स्वास्थ्य स्थिति जांचें',
      icon: Leaf,
      color: 'bg-amber-700',
      action: () => navigate('/soil-health')
    },
    {
      id: 'legal',
      title: 'Legal Rights & Complaints',
      titleHi: 'कानूनी अधिकार और शिकायतें',
      description: 'Know your rights, file complaints',
      descriptionHi: 'अपने अधिकार जानें, शिकायत दर्ज करें',
      icon: Shield,
      color: 'bg-purple-600',
      action: () => navigate('/legal-rights')
    },
    {
      id: 'market',
      title: 'Market Linkage',
      titleHi: 'बाजार संपर्क',
      description: 'Connect with buyers',
      descriptionHi: 'खरीदारों से जुड़ें',
      icon: Users,
      color: 'bg-indigo-600',
      action: () => navigate('/market-linkage')
    },
    {
      id: 'training',
      title: 'Training & Videos',
      titleHi: 'प्रशिक्षण और वीडियो',
      description: 'Learn modern farming techniques',
      descriptionHi: 'आधुनिक खेती तकनीक सीखें',
      icon: BookOpen,
      color: 'bg-teal-600',
      action: () => navigate('/training')
    },
    {
      id: 'emergency',
      title: 'Emergency Helpline',
      titleHi: 'आपातकालीन हेल्पलाइन',
      description: 'Call for urgent help',
      descriptionHi: 'तत्काल सहायता के लिए कॉल करें',
      icon: Phone,
      color: 'bg-red-700',
      action: () => navigate('/emergency-helpline')
    },
    {
      id: 'nearby',
      title: 'Nearby Services',
      titleHi: 'आस-पास की सेवाएं',
      description: 'Find mandis, banks, KVKs',
      descriptionHi: 'मंडी, बैंक, केवीके खोजें',
      icon: MapPin,
      color: 'bg-pink-600',
      action: () => navigate('/nearby-services')
    },
    {
      id: 'alerts',
      title: 'Weather Alerts',
      titleHi: 'मौसम चेतावनी',
      description: 'Severe weather notifications',
      descriptionHi: 'गंभीर मौसम सूचनाएं',
      icon: AlertTriangle,
      color: 'bg-yellow-600',
      action: () => navigate('/weather-alerts')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
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
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl">🌾</span>
                <div>
                  <h1 className="text-xl font-bold">किसान डैशबोर्ड</h1>
                  <p className="text-sm opacity-90">Farmer Dashboard</p>
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
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-green-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            नमस्ते किसान भाई! Welcome Farmer!
          </h2>
          <p className="text-gray-600">
            Access all farming services, government schemes, market prices, and expert advice in one place.
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
            <h4 className="text-sm text-gray-600 mb-1">Today's Top Price</h4>
            <p className="text-2xl font-bold text-gray-900">₹2,100/quintal</p>
            <p className="text-sm text-gray-600">Wheat - Azadpur Mandi</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
            <h4 className="text-sm text-gray-600 mb-1">Weather Today</h4>
            <p className="text-2xl font-bold text-gray-900">28°C</p>
            <p className="text-sm text-gray-600">Partly Cloudy - 20% Rain</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-600">
            <h4 className="text-sm text-gray-600 mb-1">Active Schemes</h4>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Government schemes for you</p>
          </div>
        </div>
      </main>
    </div>
  )
}
