import { useNavigate } from 'react-router-dom'
import { Shield, Users, FileText, Phone, Mail, MapPin } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function LandingPage() {
  const navigate = useNavigate()

  const sections = [
    {
      type: 'farmer',
      title: 'Farmer / Worker',
      description: 'Crop disease, Mandi prices, Weather, Govt schemes',
      icon: '🌾',
      bgColor: 'bg-green-700',
      route: '/dashboard/farmer'
    },
    {
      type: 'student',
      title: 'Student / Aspirant',
      description: 'Scholarships, Study plans, Exam resources, Career guidance',
      icon: '📚',
      bgColor: 'bg-blue-700',
      route: '/dashboard/student'
    },
    {
      type: 'startup',
      title: 'Startup / Business',
      description: 'Funding schemes, Compliance guide, Market research',
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
                  <T>Government of India Initiative</T>
                </p>
              </div>
            </div>
            <LanguageSelector />
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
                <T>Welcome to SamarthBharat</T>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                <T>AI-Powered Digital Assistant for Government Schemes, Agricultural Support, Education Resources, and Business Guidance</T>
              </p>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center border-b-2 border-orange-500 pb-2">
            <T>Select Your Category</T>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((section) => (
              <button
                key={section.type}
                onClick={() => navigate(section.route)}
                className={`${section.bgColor} text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-gray-200 hover:border-orange-500`}
              >
                <div className="text-6xl mb-4 text-center">{section.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-center"><T>{section.title}</T></h3>
                <div className="border-t border-white/30 pt-4">
                  <p className="text-sm mb-2"><T>{section.description}</T></p>
                </div>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-white text-gray-900 px-4 py-2 rounded font-semibold text-sm">
                    <T>Open Dashboard</T> →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-l-4 border-orange-500">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            <T>Our Services</T>
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4 border border-gray-200 rounded">
              <div className="text-4xl mb-2">🤖</div>
              <h4 className="font-semibold text-gray-900 mb-1"><T>AI Assistant</T></h4>
              <p className="text-sm text-gray-600"><T>24/7 intelligent support</T></p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded">
              <div className="text-4xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-900 mb-1"><T>Multi-Channel</T></h4>
              <p className="text-sm text-gray-600"><T>Web, WhatsApp, Voice</T></p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded">
              <div className="text-4xl mb-2">🌐</div>
              <h4 className="font-semibold text-gray-900 mb-1"><T>Multilingual</T></h4>
              <p className="text-sm text-gray-600"><T>Hindi, English & more</T></p>
            </div>
            <div className="text-center p-4 border border-gray-200 rounded">
              <div className="text-4xl mb-2">🔒</div>
              <h4 className="font-semibold text-gray-900 mb-1"><T>Secure</T></h4>
              <p className="text-sm text-gray-600"><T>Your data is safe</T></p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-green-600">
            <Users className="mx-auto mb-2 text-green-600" size={40} />
            <h4 className="text-3xl font-bold text-gray-900 mb-1">10,000+</h4>
            <p className="text-gray-600"><T>Active Users</T></p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-blue-600">
            <FileText className="mx-auto mb-2 text-blue-600" size={40} />
            <h4 className="text-3xl font-bold text-gray-900 mb-1">500+</h4>
            <p className="text-gray-600"><T>Government Schemes</T></p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-orange-600">
            <Shield className="mx-auto mb-2 text-orange-600" size={40} />
            <h4 className="text-3xl font-bold text-gray-900 mb-1">95%</h4>
            <p className="text-gray-600"><T>Success Rate</T></p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-blue-900 text-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center"><T>Contact Information</T></h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={20} />
              <div>
                <p className="font-semibold"><T>Helpline</T></p>
                <p>1800-XXX-XXXX (<T>Toll Free</T>)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <div>
                <p className="font-semibold"><T>Email</T></p>
                <p>support@samarthbharat.gov.in</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <div>
                <p className="font-semibold"><T>Address</T></p>
                <p>New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Language Support */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            <strong><T>Available in</T>:</strong> हिंदी, English, தமிழ், తెలుగు, বাংলা, मराठी, ગુજરાતી, ಕನ್ನಡ, മലയാളം, ਪੰਜਾਬੀ
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12 border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-4">
            <p className="text-sm mb-2"> 
              © {new Date().getFullYear()} SamarthBharat | <T>Government of India Initiative</T>
            </p>
            <p className="text-xs text-gray-400">
              <T>Empowering underserved Indian communities through AI technology</T>
            </p>
          </div>
          <div className="flex justify-center gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-white"><T>Privacy Policy</T></a>
            <a href="#" className="hover:text-white"><T>Terms of Service</T></a>
            <a href="#" className="hover:text-white"><T>Accessibility</T></a>
            <a href="#" className="hover:text-white"><T>Sitemap</T></a>
          </div>
        </div>
      </footer>
    </div>
  )
}
