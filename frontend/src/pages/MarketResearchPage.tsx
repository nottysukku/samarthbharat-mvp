import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, BarChart, PieChart, Users, IndianRupee, Target, Globe } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function MarketResearchPage() {
  const navigate = useNavigate()
  const [selectedIndustry, setSelectedIndustry] = useState('all')

  const industries = [
    {
      id: 1,
      name: 'E-commerce',
      nameHi: 'ई-कॉमर्स',
      marketSize: '₹7.5 Lakh Crore',
      growth: '+23% YoY',
      growthHi: '+23% वार्षिक',
      topPlayers: ['Amazon', 'Flipkart', 'Meesho'],
      opportunities: ['D2C brands', 'Quick commerce', 'Social commerce', 'Rural markets'],
      opportunitiesHi: ['डी2सी ब्रांड', 'त्वरित वाणिज्य', 'सोशल कॉमर्स', 'ग्रामीण बाजार'],
      challenges: ['High competition', 'Logistics costs', 'Customer acquisition'],
      challengesHi: ['उच्च प्रतिस्पर्धा', 'लॉजिस्टिक्स लागत', 'ग्राहक अधिग्रहण'],
      color: 'bg-blue-600'
    },
    {
      id: 2,
      name: 'EdTech',
      nameHi: 'एडटेक',
      marketSize: '₹3.5 Lakh Crore',
      growth: '+39% YoY',
      growthHi: '+39% वार्षिक',
      topPlayers: ['Byju\'s', 'Unacademy', 'PhysicsWallah'],
      opportunities: ['Vernacular content', 'Skill training', 'Test prep', 'K-12 education'],
      opportunitiesHi: ['स्थानीय भाषा सामग्री', 'कौशल प्रशिक्षण', 'परीक्षा तैयारी', 'के-12 शिक्षा'],
      challenges: ['User retention', 'Content quality', 'Monetization'],
      challengesHi: ['उपयोगकर्ता प्रतिधारण', 'सामग्री गुणवत्ता', 'मुद्रीकरण'],
      color: 'bg-purple-600'
    },
    {
      id: 3,
      name: 'FinTech',
      nameHi: 'फिनटेक',
      marketSize: '₹6.2 Lakh Crore',
      growth: '+31% YoY',
      growthHi: '+31% वार्षिक',
      topPlayers: ['Paytm', 'PhonePe', 'Google Pay'],
      opportunities: ['Digital lending', 'Wealth management', 'Insurance tech', 'Neo banking'],
      opportunitiesHi: ['डिजिटल ऋण', 'धन प्रबंधन', 'बीमा तकनीक', 'नियो बैंकिंग'],
      challenges: ['Regulations', 'Security', 'Trust building'],
      challengesHi: ['नियम', 'सुरक्षा', 'विश्वास निर्माण'],
      color: 'bg-green-600'
    },
    {
      id: 4,
      name: 'HealthTech',
      nameHi: 'हेल्थटेक',
      marketSize: '₹2.7 Lakh Crore',
      growth: '+27% YoY',
      growthHi: '+27% वार्षिक',
      topPlayers: ['Practo', '1mg', 'PharmEasy'],
      opportunities: ['Telemedicine', 'Health records', 'Diagnostics', 'Mental health'],
      opportunitiesHi: ['टेलीमेडिसिन', 'स्वास्थ्य रिकॉर्ड', 'निदान', 'मानसिक स्वास्थ्य'],
      challenges: ['Doctor onboarding', 'Data privacy', 'Quality assurance'],
      challengesHi: ['डॉक्टर ऑनबोर्डिंग', 'डेटा गोपनीयता', 'गुणवत्ता आश्वासन'],
      color: 'bg-red-600'
    },
    {
      id: 5,
      name: 'AgriTech',
      nameHi: 'एग्रीटेक',
      marketSize: '₹1.2 Lakh Crore',
      growth: '+25% YoY',
      growthHi: '+25% वार्षिक',
      topPlayers: ['DeHaat', 'Ninjacart', 'AgroStar'],
      opportunities: ['Farm management', 'Supply chain', 'Precision farming', 'Market linkage'],
      opportunitiesHi: ['खेत प्रबंधन', 'आपूर्ति श्रृंखला', 'सटीक खेती', 'बाजार संपर्क'],
      challenges: ['Farmer adoption', 'Internet connectivity', 'Payment collection'],
      challengesHi: ['किसान अपनाना', 'इंटरनेट कनेक्टिविटी', 'भुगतान संग्रह'],
      color: 'bg-green-700'
    },
    {
      id: 6,
      name: 'FoodTech',
      nameHi: 'फूडटेक',
      marketSize: '₹4.2 Lakh Crore',
      growth: '+18% YoY',
      growthHi: '+18% वार्षिक',
      topPlayers: ['Zomato', 'Swiggy', 'Blinkit'],
      opportunities: ['Cloud kitchens', 'Quick delivery', 'Healthy food', 'Catering'],
      opportunitiesHi: ['क्लाउड किचन', 'त्वरित डिलीवरी', 'स्वस्थ भोजन', 'कैटरिंग'],
      challenges: ['Delivery costs', 'Quality control', 'Competition'],
      challengesHi: ['डिलीवरी लागत', 'गुणवत्ता नियंत्रण', 'प्रतिस्पर्धा'],
      color: 'bg-orange-600'
    },
    {
      id: 7,
      name: 'SaaS',
      nameHi: 'सास',
      marketSize: '₹3.8 Lakh Crore',
      growth: '+35% YoY',
      growthHi: '+35% वार्षिक',
      topPlayers: ['Zoho', 'Freshworks', 'Chargebee'],
      opportunities: ['SMB tools', 'Industry-specific', 'AI integration', 'Global markets'],
      opportunitiesHi: ['एसएमबी उपकरण', 'उद्योग-विशिष्ट', 'एआई एकीकरण', 'वैश्विक बाजार'],
      challenges: ['Customer acquisition', 'Churn rate', 'Competition'],
      challengesHi: ['ग्राहक अधिग्रहण', 'चर्न दर', 'प्रतिस्पर्धा'],
      color: 'bg-indigo-600'
    },
    {
      id: 8,
      name: 'Logistics',
      nameHi: 'लॉजिस्टिक्स',
      marketSize: '₹8.4 Lakh Crore',
      growth: '+12% YoY',
      growthHi: '+12% वार्षिक',
      topPlayers: ['Delhivery', 'Ecom Express', 'Shadowfax'],
      opportunities: ['Last-mile delivery', 'Warehousing', 'Cold chain', 'Hyperlocal'],
      opportunitiesHi: ['अंतिम-मील डिलीवरी', 'भंडारण', 'कोल्ड चेन', 'हाइपरलोकल'],
      challenges: ['Infrastructure', 'Fuel costs', 'Driver shortage'],
      challengesHi: ['बुनियादी ढांचा', 'ईंधन लागत', 'ड्राइवर की कमी'],
      color: 'bg-teal-600'
    }
  ]

  const filteredIndustries = selectedIndustry === 'all' 
    ? industries 
    : industries.filter(i => i.name === selectedIndustry)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-cyan-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <TrendingUp size={32} />
                <div>
                  <h1 className="text-xl font-bold">बाजार अनुसंधान</h1>
                  <p className="text-sm opacity-90">Market Research</p>
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Industry / उद्योग चुनें
          </label>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="all">All Industries / सभी उद्योग</option>
            {industries.map(ind => (
              <option key={ind.id} value={ind.name}>{ind.nameHi} ({ind.name})</option>
            ))}
          </select>
        </div>

        {/* Industries List */}
        <div className="space-y-6">
          {filteredIndustries.map((industry) => (
            <div key={industry.id} className={`${industry.color} text-white rounded-lg shadow-lg overflow-hidden`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{industry.nameHi}</h3>
                    <p className="text-lg opacity-90">{industry.name}</p>
                  </div>
                  <BarChart size={40} className="opacity-75" />
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <IndianRupee size={20} />
                      <p className="text-sm opacity-75">Market Size</p>
                    </div>
                    <p className="text-2xl font-bold">{industry.marketSize}</p>
                    <p className="text-xs opacity-75">बाजार आकार</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={20} />
                      <p className="text-sm opacity-75">Growth Rate</p>
                    </div>
                    <p className="text-2xl font-bold">{industry.growth}</p>
                    <p className="text-xs opacity-75">{industry.growthHi}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={20} />
                      <p className="text-sm opacity-75">Top Players</p>
                    </div>
                    <p className="text-sm font-semibold">{industry.topPlayers.join(', ')}</p>
                    <p className="text-xs opacity-75">शीर्ष खिलाड़ी</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Target size={20} />
                      <p className="font-semibold">Opportunities / अवसर</p>
                    </div>
                    <ul className="space-y-2">
                      {industry.opportunitiesHi.map((opp, idx) => (
                        <li key={idx} className="text-sm">
                          <p className="font-semibold">• {opp}</p>
                          <p className="text-xs opacity-75 ml-3">{industry.opportunities[idx]}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe size={20} />
                      <p className="font-semibold">Challenges / चुनौतियां</p>
                    </div>
                    <ul className="space-y-2">
                      {industry.challengesHi.map((chal, idx) => (
                        <li key={idx} className="text-sm">
                          <p className="font-semibold">• {chal}</p>
                          <p className="text-xs opacity-75 ml-3">{industry.challenges[idx]}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Insights */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-600">
            <PieChart className="text-blue-600 mb-3" size={32} />
            <h4 className="font-bold text-gray-900 mb-2">Total Market Size</h4>
            <p className="text-2xl font-bold text-blue-600">₹37.5 Lakh Cr</p>
            <p className="text-sm text-gray-600">कुल बाजार आकार</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
            <TrendingUp className="text-green-600 mb-3" size={32} />
            <h4 className="font-bold text-gray-900 mb-2">Avg Growth Rate</h4>
            <p className="text-2xl font-bold text-green-600">+26% YoY</p>
            <p className="text-sm text-gray-600">औसत वृद्धि दर</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
            <Users className="text-purple-600 mb-3" size={32} />
            <h4 className="font-bold text-gray-900 mb-2">Active Startups</h4>
            <p className="text-2xl font-bold text-purple-600">75,000+</p>
            <p className="text-sm text-gray-600">सक्रिय स्टार्टअप</p>
          </div>
        </div>
      </main>
    </div>
  )
}
