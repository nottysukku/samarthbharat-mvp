import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, CheckCircle, Clock, IndianRupee, ExternalLink, AlertCircle, Building } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function BusinessRegistrationPage() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState('all')

  const registrations = [
    {
      id: 1,
      name: 'Startup India Registration',
      nameHi: 'स्टार्टअप इंडिया पंजीकरण',
      type: 'Startup',
      typeHi: 'स्टार्टअप',
      cost: 'Free',
      costHi: 'मुफ्त',
      time: '1-2 days',
      timeHi: '1-2 दिन',
      benefits: ['Tax exemptions', 'IPR fast-track', 'Easy compliance', 'Funding access'],
      benefitsHi: ['कर छूट', 'आईपीआर फास्ट-ट्रैक', 'आसान अनुपालन', 'फंडिंग पहुंच'],
      documents: ['PAN Card', 'Aadhaar', 'Business Plan', 'Incorporation Certificate'],
      documentsHi: ['पैन कार्ड', 'आधार', 'व्यवसाय योजना', 'निगमन प्रमाणपत्र'],
      steps: ['Visit Startup India portal', 'Fill registration form', 'Upload documents', 'Get recognition certificate'],
      stepsHi: ['स्टार्टअप इंडिया पोर्टल पर जाएं', 'पंजीकरण फॉर्म भरें', 'दस्तावेज़ अपलोड करें', 'मान्यता प्रमाणपत्र प्राप्त करें'],
      url: 'https://www.startupindia.gov.in',
      color: 'bg-orange-600'
    },
    {
      id: 2,
      name: 'MSME/Udyam Registration',
      nameHi: 'एमएसएमई/उद्यम पंजीकरण',
      type: 'MSME',
      typeHi: 'एमएसएमई',
      cost: 'Free',
      costHi: 'मुफ्त',
      time: '1 day',
      timeHi: '1 दिन',
      benefits: ['Subsidy schemes', 'Easy loans', 'Tax benefits', 'Government tenders'],
      benefitsHi: ['सब्सिडी योजनाएं', 'आसान ऋण', 'कर लाभ', 'सरकारी निविदाएं'],
      documents: ['Aadhaar', 'PAN', 'Business details', 'Bank account'],
      documentsHi: ['आधार', 'पैन', 'व्यवसाय विवरण', 'बैंक खाता'],
      steps: ['Visit Udyam portal', 'Enter Aadhaar & PAN', 'Fill business details', 'Get Udyam certificate'],
      stepsHi: ['उद्यम पोर्टल पर जाएं', 'आधार और पैन दर्ज करें', 'व्यवसाय विवरण भरें', 'उद्यम प्रमाणपत्र प्राप्त करें'],
      url: 'https://udyamregistration.gov.in',
      color: 'bg-green-600'
    },
    {
      id: 3,
      name: 'GST Registration',
      nameHi: 'जीएसटी पंजीकरण',
      type: 'Tax',
      typeHi: 'कर',
      cost: 'Free',
      costHi: 'मुफ्त',
      time: '2-6 days',
      timeHi: '2-6 दिन',
      benefits: ['Legal compliance', 'Input tax credit', 'Interstate business', 'Credibility'],
      benefitsHi: ['कानूनी अनुपालन', 'इनपुट टैक्स क्रेडिट', 'अंतरराज्यीय व्यवसाय', 'विश्वसनीयता'],
      documents: ['PAN', 'Aadhaar', 'Business proof', 'Bank statement', 'Photos'],
      documentsHi: ['पैन', 'आधार', 'व्यवसाय प्रमाण', 'बैंक स्टेटमेंट', 'फोटो'],
      steps: ['Visit GST portal', 'Fill Part A & B', 'Upload documents', 'Verification', 'Get GSTIN'],
      stepsHi: ['जीएसटी पोर्टल पर जाएं', 'भाग ए और बी भरें', 'दस्तावेज़ अपलोड करें', 'सत्यापन', 'जीएसटीआईएन प्राप्त करें'],
      url: 'https://www.gst.gov.in',
      color: 'bg-blue-600'
    },
    {
      id: 4,
      name: 'Private Limited Company',
      nameHi: 'प्राइवेट लिमिटेड कंपनी',
      type: 'Company',
      typeHi: 'कंपनी',
      cost: '₹10,000-15,000',
      costHi: '₹10,000-15,000',
      time: '10-15 days',
      timeHi: '10-15 दिन',
      benefits: ['Limited liability', 'Separate legal entity', 'Easy funding', 'Credibility'],
      benefitsHi: ['सीमित देयता', 'अलग कानूनी इकाई', 'आसान फंडिंग', 'विश्वसनीयता'],
      documents: ['DIN', 'DSC', 'PAN', 'Address proof', 'MOA/AOA'],
      documentsHi: ['डीआईएन', 'डीएससी', 'पैन', 'पता प्रमाण', 'एमओए/एओए'],
      steps: ['Get DIN & DSC', 'Name approval', 'File incorporation', 'Get CIN', 'PAN & TAN'],
      stepsHi: ['डीआईएन और डीएससी प्राप्त करें', 'नाम अनुमोदन', 'निगमन फाइल करें', 'सीआईएन प्राप्त करें', 'पैन और टैन'],
      url: 'https://www.mca.gov.in',
      color: 'bg-purple-600'
    },
    {
      id: 5,
      name: 'LLP Registration',
      nameHi: 'एलएलपी पंजीकरण',
      type: 'Company',
      typeHi: 'कंपनी',
      cost: '₹7,000-10,000',
      costHi: '₹7,000-10,000',
      time: '7-10 days',
      timeHi: '7-10 दिन',
      benefits: ['Limited liability', 'Less compliance', 'Flexible structure', 'Tax benefits'],
      benefitsHi: ['सीमित देयता', 'कम अनुपालन', 'लचीली संरचना', 'कर लाभ'],
      documents: ['DIN', 'DSC', 'PAN', 'Address proof', 'LLP Agreement'],
      documentsHi: ['डीआईएन', 'डीएससी', 'पैन', 'पता प्रमाण', 'एलएलपी समझौता'],
      steps: ['Get DIN & DSC', 'Name reservation', 'File incorporation', 'Get LLPIN', 'LLP Agreement'],
      stepsHi: ['डीआईएन और डीएससी प्राप्त करें', 'नाम आरक्षण', 'निगमन फाइल करें', 'एलएलपीआईएन प्राप्त करें', 'एलएलपी समझौता'],
      url: 'https://www.mca.gov.in',
      color: 'bg-indigo-600'
    },
    {
      id: 6,
      name: 'One Person Company (OPC)',
      nameHi: 'वन पर्सन कंपनी (ओपीसी)',
      type: 'Company',
      typeHi: 'कंपनी',
      cost: '₹8,000-12,000',
      costHi: '₹8,000-12,000',
      time: '10-12 days',
      timeHi: '10-12 दिन',
      benefits: ['Single owner', 'Limited liability', 'Separate entity', 'Easy conversion'],
      benefitsHi: ['एकल मालिक', 'सीमित देयता', 'अलग इकाई', 'आसान रूपांतरण'],
      documents: ['DIN', 'DSC', 'PAN', 'Address proof', 'Nominee consent'],
      documentsHi: ['डीआईएन', 'डीएससी', 'पैन', 'पता प्रमाण', 'नामांकित सहमति'],
      steps: ['Get DIN & DSC', 'Name approval', 'File SPICe+', 'Get CIN', 'Nominee declaration'],
      stepsHi: ['डीआईएन और डीएससी प्राप्त करें', 'नाम अनुमोदन', 'एसपीआईसी+ फाइल करें', 'सीआईएन प्राप्त करें', 'नामांकित घोषणा'],
      url: 'https://www.mca.gov.in',
      color: 'bg-teal-600'
    },
    {
      id: 7,
      name: 'Partnership Firm',
      nameHi: 'साझेदारी फर्म',
      type: 'Partnership',
      typeHi: 'साझेदारी',
      cost: '₹3,000-5,000',
      costHi: '₹3,000-5,000',
      time: '3-5 days',
      timeHi: '3-5 दिन',
      benefits: ['Easy formation', 'Shared responsibility', 'More capital', 'Tax benefits'],
      benefitsHi: ['आसान गठन', 'साझा जिम्मेदारी', 'अधिक पूंजी', 'कर लाभ'],
      documents: ['PAN of partners', 'Address proof', 'Partnership deed', 'Rent agreement'],
      documentsHi: ['साझेदारों का पैन', 'पता प्रमाण', 'साझेदारी विलेख', 'किराया समझौता'],
      steps: ['Draft partnership deed', 'Get it notarized', 'Apply for PAN', 'Register with ROF'],
      stepsHi: ['साझेदारी विलेख तैयार करें', 'नोटरीकृत करवाएं', 'पैन के लिए आवेदन करें', 'आरओएफ के साथ पंजीकरण करें'],
      url: 'https://incometaxindia.gov.in',
      color: 'bg-pink-600'
    },
    {
      id: 8,
      name: 'Sole Proprietorship',
      nameHi: 'एकल स्वामित्व',
      type: 'Proprietorship',
      typeHi: 'स्वामित्व',
      cost: '₹2,000-3,000',
      costHi: '₹2,000-3,000',
      time: '1-2 days',
      timeHi: '1-2 दिन',
      benefits: ['Easy setup', 'Full control', 'Low cost', 'Simple taxation'],
      benefitsHi: ['आसान सेटअप', 'पूर्ण नियंत्रण', 'कम लागत', 'सरल कराधान'],
      documents: ['PAN', 'Aadhaar', 'Address proof', 'Bank account'],
      documentsHi: ['पैन', 'आधार', 'पता प्रमाण', 'बैंक खाता'],
      steps: ['Get PAN', 'Open bank account', 'Register for GST (if needed)', 'Get licenses'],
      stepsHi: ['पैन प्राप्त करें', 'बैंक खाता खोलें', 'जीएसटी के लिए पंजीकरण करें (यदि आवश्यक हो)', 'लाइसेंस प्राप्त करें'],
      url: 'https://udyamregistration.gov.in',
      color: 'bg-amber-600'
    }
  ]

  const types = ['all', 'Startup', 'MSME', 'Company', 'Tax', 'Partnership', 'Proprietorship']

  const filteredRegistrations = selectedType === 'all' 
    ? registrations 
    : registrations.filter(r => r.type === selectedType)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-orange-600 text-white shadow-lg border-b-4 border-green-600">
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
                <FileText size={32} />
                <div>
                  <h1 className="text-xl font-bold">व्यवसाय पंजीकरण</h1>
                  <p className="text-sm opacity-90">Business Registration</p>
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
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedType === type ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'All Types / सभी प्रकार' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Registrations List */}
        <div className="space-y-6">
          {filteredRegistrations.map((reg) => (
            <div key={reg.id} className={`${reg.color} text-white rounded-lg shadow-lg overflow-hidden`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{reg.nameHi}</h3>
                    <p className="text-lg opacity-90 mb-2">{reg.name}</p>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                      {reg.typeHi}
                    </span>
                  </div>
                  <Building size={40} className="opacity-75" />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <IndianRupee size={20} />
                    <div>
                      <p className="text-sm opacity-75">Cost / लागत</p>
                      <p className="font-semibold">{reg.costHi}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <div>
                      <p className="text-sm opacity-75">Time / समय</p>
                      <p className="font-semibold">{reg.timeHi}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2 opacity-90">Benefits / लाभ:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {reg.benefitsHi.map((benefit, idx) => (
                      <div key={idx} className="bg-white/10 rounded px-3 py-2 text-sm backdrop-blur-sm flex items-start gap-2">
                        <CheckCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">{benefit}</p>
                          <p className="text-xs opacity-75">{reg.benefits[idx]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2 opacity-90">Required Documents / आवश्यक दस्तावेज़:</p>
                  <div className="flex flex-wrap gap-2">
                    {reg.documentsHi.map((doc, idx) => (
                      <span key={idx} className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2 opacity-90">Registration Steps / पंजीकरण चरण:</p>
                  <div className="space-y-2">
                    {reg.stepsHi.map((step, idx) => (
                      <div key={idx} className="bg-white/10 rounded px-4 py-2 backdrop-blur-sm">
                        <p className="font-semibold text-sm">{idx + 1}. {step}</p>
                        <p className="text-xs opacity-75">{reg.steps[idx]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={reg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-gray-900 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold flex items-center justify-center gap-2"
                >
                  <ExternalLink size={20} />
                  Start Registration / पंजीकरण शुरू करें
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Important Information / महत्वपूर्ण जानकारी</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Choose the right business structure based on your needs / अपनी आवश्यकताओं के आधार पर सही व्यवसाय संरचना चुनें</li>
                <li>• Keep all documents ready before starting registration / पंजीकरण शुरू करने से पहले सभी दस्तावेज़ तैयार रखें</li>
                <li>• Consult a CA or lawyer for complex registrations / जटिल पंजीकरण के लिए सीए या वकील से परामर्श करें</li>
                <li>• Complete registration before starting business operations / व्यवसाय संचालन शुरू करने से पहले पंजीकरण पूरा करें</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
