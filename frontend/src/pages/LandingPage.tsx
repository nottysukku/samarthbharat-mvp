import { useNavigate } from 'react-router-dom'
import { Shield, Users, FileText, Phone, Mail, MapPin } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()

  const sections = [
    {
      type: 'farmer',
      title: 'किसान / मजदूर',
      subtitle: 'Farmer / Worker',
      description: 'फसल रोग निदान, मंडी मूल्य, मौसम, सरकारी योजनाएं',
      descriptionEn: 'Crop disease, Mandi prices, Weather, Govt schemes',
      icon: '🌾',
      bgColor: 'bg-green-700',
      route: '/dashboard/farmer'
    },
    {
      type: 'student',
      title: 'छात्र / अभ्यर्थी',
      subtitle: 'Student / Aspirant',
      description: 'छात्रवृत्ति, अध्ययन योजना, परीक्षा संसाधन, करियर मार्गदर्शन',
      descriptionEn: 'Scholarships, Study plans, Exam resources, Career guidance',
      icon: '📚',
      bgColor: 'bg-blue-700',
      route: '/dashboard/student'
    },
    {
      type: 'startup',
      title: 'स्टार्टअप / व्यवसाय',
      subtitle: 'Startup / Business',
      description: 'फंडिंग योजनाएं, अनुपालन मार्गदर्शन, बाजार अनुसंधान',
      descriptionEn: 'Funding schemes, Compliance guide, Market research',
      icon: '💼',
      bgColor: 'bg-orange-600',
      route: '/dashboard/startup'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Indian Flag Stripe */}
      <div className="gov-header"></div>

      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
                <Shield className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  SamarthBharat
                </h1>
                <p className="text-sm text-gray-600">
                  समर्थ भारत | Government of India Initiative
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Crect fill='%23FF9933' width='60' height='20'/%3E%3Crect fill='%23FFFFFF' y='20' width='60' height='20'/%3E%3Crect fill='%23138808' y='40' width='60' height='20'/%3E%3Ccircle cx='30' cy='30' r='8' fill='%23000080' stroke='%23000080' stroke-width='1'/%3E%3C/svg%3E"
                alt="Indian Flag"
                className="w-12 h-12"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-white to-green-600 p-1 rounded-lg mb-8">
          <div className="bg-white p-8 rounded-lg">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                आपका स्वागत है
              </h2>
              <p className="text-2xl text-gray-700 mb-4">
                Welcome to SamarthBharat
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                AI-Powered Digital Assistant for Government Schemes, Agricultural Support, Education Resources, and Business Guidance
              </p>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center border-b-2 border-orange-500 pb-2">
            Select Your Category / अपनी श्रेणी चुनें
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((section) => (
              <button
                key={section.type}
                onClick={() => navigate(section.route)}
                className={`${section.bgColor} text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200 hover:border-orange-500`}
              >
                <div className="text-6xl mb-4 text-center">{section.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-center">{section.title}</h3>
                <p className="text-sm opacity-90 mb-4 text-center">{section.subtitle}</p>
                <div className="border-t border-white/30 pt-4">
                  <p className="text-sm mb-2">{section.description}</p>
                  <p className="text-xs opacity-75">{section.descriptionEn}</p>
                </div>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-white text-gray-900 px-4 py-2 rounded font-semibold text-sm">
                    Open Dashboard →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-l-4 border-orange-500">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Our Services / हमारी सेवाएं
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 border border-gray-200 rounded">
              <div className="text-4xl mb-2">🤖</div>
              <h4 className="font-semibold text-gray-900 mb-1">AI Assistant</h4>
              <p className="text-sm text-gray-600">24/7 intelligent support</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded">
              <div className="text-4xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-900 mb-1">Multi-Channel</h4>
              <p className="text-sm text-gray-600">Web, WhatsApp, Voice</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded">
              <div className="text-4xl mb-2">🌐</div>
              <h4 className="font-semibold text-gray-900 mb-1">Multilingual</h4>
              <p className="text-sm text-gray-600">Hindi, English & more</p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded">
              <div className="text-4xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-1">Secure</h4>
              <p className="text-sm text-gray-600">Your data is safe</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-green-600">
            <Users className="mx-auto mb-2 text-green-600" size={40} />
            <h4 className="text-3xl font-bold text-gray-900 mb-1">10,000+</h4>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-blue-600">
            <FileText className="mx-auto mb-2 text-blue-600" size={40} />
            <h4 className="text-3xl font-bold text-gray-900 mb-1">500+</h4>
            <p className="text-gray-600">Government Schemes</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-orange-600">
            <Shield className="mx-auto mb-2 text-orange-600" size={40} />
            <h4 className="text-3xl font-bold text-gray-900 mb-1">95%</h4>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-900 text-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">Contact Information / संपर्क जानकारी</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={20} />
              <div>
                <p className="font-semibold">Helpline</p>
                <p>1800-XXX-XXXX (Toll Free)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <div>
                <p className="font-semibold">Email</p>
                <p>support@samarthbharat.gov.in</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <div>
                <p className="font-semibold">Address</p>
                <p>New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Language Support */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Available in:</strong> हिंदी, English, தமிழ், తెలుగు, বাংলা, मराठी, ગુજરાતી, ಕನ್ನಡ, മലയാളം, ਪੰਜਾਬੀ
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-4">
            <p className="text-sm mb-2">
              © 2024 SamarthBharat | Government of India Initiative
            </p>
            <p className="text-xs text-gray-400">
              Empowering underserved Indian communities through AI technology
            </p>
          </div>
          <div className="flex justify-center gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Accessibility</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
