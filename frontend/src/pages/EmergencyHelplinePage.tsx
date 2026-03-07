import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Clock, MapPin, AlertCircle, MessageSquare } from 'lucide-react'

export default function EmergencyHelplinePage() {
  const navigate = useNavigate()

  const helplines = [
    {
      id: 1,
      name: 'Kisan Call Center',
      nameHi: 'किसान कॉल सेंटर',
      number: '1800-180-1551',
      category: 'General Agriculture',
      categoryHi: 'सामान्य कृषि',
      availability: '24x7',
      availabilityHi: '24x7',
      languages: ['Hindi', 'English', 'Regional'],
      languagesHi: ['हिंदी', 'अंग्रेजी', 'क्षेत्रीय'],
      services: ['Crop advice', 'Pest management', 'Weather info', 'Market prices'],
      servicesHi: ['फसल सलाह', 'कीट प्रबंधन', 'मौसम जानकारी', 'बाजार मूल्य'],
      color: 'bg-green-600'
    },
    {
      id: 2,
      name: 'PM-KISAN Helpline',
      nameHi: 'पीएम-किसान हेल्पलाइन',
      number: '155261',
      category: 'PM-KISAN Scheme',
      categoryHi: 'पीएम-किसान योजना',
      availability: '9 AM - 6 PM',
      availabilityHi: 'सुबह 9 - शाम 6',
      languages: ['Hindi', 'English'],
      languagesHi: ['हिंदी', 'अंग्रेजी'],
      services: ['Application status', 'Payment issues', 'Registration help', 'Document queries'],
      servicesHi: ['आवेदन स्थिति', 'भुगतान समस्याएं', 'पंजीकरण सहायता', 'दस्तावेज़ प्रश्न'],
      color: 'bg-blue-600'
    },
    {
      id: 3,
      name: 'Crop Insurance Helpline',
      nameHi: 'फसल बीमा हेल्पलाइन',
      number: '1800-200-7710',
      category: 'PMFBY Insurance',
      categoryHi: 'पीएमएफबीवाई बीमा',
      availability: '10 AM - 6 PM',
      availabilityHi: 'सुबह 10 - शाम 6',
      languages: ['Hindi', 'English', 'Regional'],
      languagesHi: ['हिंदी', 'अंग्रेजी', 'क्षेत्रीय'],
      services: ['Claim filing', 'Premium payment', 'Policy details', 'Crop loss reporting'],
      servicesHi: ['दावा दाखिल करना', 'प्रीमियम भुगतान', 'पॉलिसी विवरण', 'फसल नुकसान रिपोर्ट'],
      color: 'bg-orange-600'
    },
    {
      id: 4,
      name: 'Soil Health Card Helpline',
      nameHi: 'मृदा स्वास्थ्य कार्ड हेल्पलाइन',
      number: '1800-180-1551',
      category: 'Soil Testing',
      categoryHi: 'मिट्टी परीक्षण',
      availability: '9 AM - 5 PM',
      availabilityHi: 'सुबह 9 - शाम 5',
      languages: ['Hindi', 'English'],
      languagesHi: ['हिंदी', 'अंग्रेजी'],
      services: ['Card application', 'Test results', 'Recommendations', 'Sample collection'],
      servicesHi: ['कार्ड आवेदन', 'परीक्षण परिणाम', 'सिफारिशें', 'नमूना संग्रह'],
      color: 'bg-amber-700'
    },
    {
      id: 5,
      name: 'Kisan Credit Card Helpline',
      nameHi: 'किसान क्रेडिट कार्ड हेल्पलाइन',
      number: '1800-180-1902',
      category: 'Agricultural Credit',
      categoryHi: 'कृषि ऋण',
      availability: '10 AM - 5 PM',
      availabilityHi: 'सुबह 10 - शाम 5',
      languages: ['Hindi', 'English'],
      languagesHi: ['हिंदी', 'अंग्रेजी'],
      services: ['KCC application', 'Loan queries', 'Interest rates', 'Repayment info'],
      servicesHi: ['केसीसी आवेदन', 'ऋण प्रश्न', 'ब्याज दरें', 'पुनर्भुगतान जानकारी'],
      color: 'bg-purple-600'
    },
    {
      id: 6,
      name: 'Mandi Information',
      nameHi: 'मंडी सूचना',
      number: '1800-270-0224',
      category: 'Market Prices',
      categoryHi: 'बाजार मूल्य',
      availability: '6 AM - 8 PM',
      availabilityHi: 'सुबह 6 - रात 8',
      languages: ['Hindi', 'English', 'Regional'],
      languagesHi: ['हिंदी', 'अंग्रेजी', 'क्षेत्रीय'],
      services: ['Current prices', 'Mandi locations', 'Auction timings', 'Quality standards'],
      servicesHi: ['वर्तमान मूल्य', 'मंडी स्थान', 'नीलामी समय', 'गुणवत्ता मानक'],
      color: 'bg-teal-600'
    },
    {
      id: 7,
      name: 'Animal Husbandry Helpline',
      nameHi: 'पशुपालन हेल्पलाइन',
      number: '1962',
      category: 'Livestock & Dairy',
      categoryHi: 'पशुधन और डेयरी',
      availability: '24x7',
      availabilityHi: '24x7',
      languages: ['Hindi', 'English', 'Regional'],
      languagesHi: ['हिंदी', 'अंग्रेजी', 'क्षेत्रीय'],
      services: ['Disease diagnosis', 'Vaccination info', 'Breeding advice', 'Emergency care'],
      servicesHi: ['रोग निदान', 'टीकाकरण जानकारी', 'प्रजनन सलाह', 'आपातकालीन देखभाल'],
      color: 'bg-indigo-600'
    },
    {
      id: 8,
      name: 'Police Emergency',
      nameHi: 'पुलिस आपातकाल',
      number: '100',
      category: 'Law & Order',
      categoryHi: 'कानून और व्यवस्था',
      availability: '24x7',
      availabilityHi: '24x7',
      languages: ['Hindi', 'English', 'Regional'],
      languagesHi: ['हिंदी', 'अंग्रेजी', 'क्षेत्रीय'],
      services: ['Crime reporting', 'Emergency response', 'Theft complaints', 'Safety assistance'],
      servicesHi: ['अपराध रिपोर्टिंग', 'आपातकालीन प्रतिक्रिया', 'चोरी शिकायत', 'सुरक्षा सहायता'],
      color: 'bg-red-700'
    },
    {
      id: 9,
      name: 'Medical Emergency',
      nameHi: 'चिकित्सा आपातकाल',
      number: '108',
      category: 'Health Services',
      categoryHi: 'स्वास्थ्य सेवाएं',
      availability: '24x7',
      availabilityHi: '24x7',
      languages: ['Hindi', 'English', 'Regional'],
      languagesHi: ['हिंदी', 'अंग्रेजी', 'क्षेत्रीय'],
      services: ['Ambulance', 'Emergency care', 'Hospital info', 'First aid guidance'],
      servicesHi: ['एम्बुलेंस', 'आपातकालीन देखभाल', 'अस्पताल जानकारी', 'प्राथमिक चिकित्सा मार्गदर्शन'],
      color: 'bg-red-600'
    }
  ]

  const quickActions = [
    { id: 1, name: 'Call Kisan Center', nameHi: 'किसान केंद्र कॉल करें', number: '1800-180-1551', icon: Phone },
    { id: 2, name: 'Medical Emergency', nameHi: 'चिकित्सा आपातकाल', number: '108', icon: AlertCircle },
    { id: 3, name: 'Police Help', nameHi: 'पुलिस सहायता', number: '100', icon: AlertCircle },
  ]

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-red-700 text-white shadow-lg border-b-4 border-orange-500">
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
                <Phone size={32} />
                <div>
                  <h1 className="text-xl font-bold">आपातकालीन हेल्पलाइन</h1>
                  <p className="text-sm opacity-90">Emergency Helpline</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-red-700 to-red-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertCircle size={28} />
            Quick Emergency Actions / त्वरित आपातकालीन कार्रवाई
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleCall(action.number)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 transition-all transform hover:scale-105"
              >
                <action.icon className="mx-auto mb-2" size={32} />
                <p className="font-bold text-lg mb-1">{action.nameHi}</p>
                <p className="text-sm opacity-90 mb-2">{action.name}</p>
                <p className="text-2xl font-bold">{action.number}</p>
              </button>
            ))}
          </div>
        </div>

        {/* All Helplines */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Helplines / सभी हेल्पलाइन</h2>
          <div className="space-y-4">
            {helplines.map((helpline) => (
              <div key={helpline.id} className={`${helpline.color} text-white rounded-lg shadow-lg overflow-hidden`}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1">{helpline.nameHi}</h3>
                      <p className="text-lg opacity-90 mb-2">{helpline.name}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                          {helpline.categoryHi}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Phone size={32} className="mb-2" />
                      <p className="text-3xl font-bold">{helpline.number}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={20} />
                      <div>
                        <p className="text-sm opacity-75">Availability</p>
                        <p className="font-semibold">{helpline.availabilityHi}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare size={20} />
                      <div>
                        <p className="text-sm opacity-75">Languages</p>
                        <p className="font-semibold">{helpline.languagesHi.join(', ')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2 opacity-90">Services / सेवाएं:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {helpline.servicesHi.map((service, idx) => (
                        <div key={idx} className="bg-white/10 rounded px-3 py-2 text-sm backdrop-blur-sm">
                          <p className="font-semibold">{service}</p>
                          <p className="text-xs opacity-75">{helpline.services[idx]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCall(helpline.number)}
                    className="w-full bg-white text-gray-900 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    Call Now / अभी कॉल करें
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Important Notice / महत्वपूर्ण सूचना</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• All helplines are toll-free / सभी हेल्पलाइन टोल-फ्री हैं</li>
                <li>• Keep your Aadhaar and land documents ready / अपना आधार और भूमि दस्तावेज तैयार रखें</li>
                <li>• Note down reference number for follow-up / अनुवर्ती कार्रवाई के लिए संदर्भ संख्या नोट करें</li>
                <li>• For life-threatening emergencies, call 108 or 100 immediately / जीवन-घातक आपात स्थिति के लिए तुरंत 108 या 100 पर कॉल करें</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
