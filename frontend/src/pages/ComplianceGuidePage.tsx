import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Scale, FileText, CheckCircle, AlertTriangle, Calendar, Download } from 'lucide-react'

export default function ComplianceGuidePage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('gst')

  const categories = [
    { id: 'gst', name: 'GST', nameHi: 'जीएसटी', icon: FileText },
    { id: 'labor', name: 'Labor Laws', nameHi: 'श्रम कानून', icon: Scale },
    { id: 'tax', name: 'Income Tax', nameHi: 'आयकर', icon: FileText },
    { id: 'company', name: 'Company Act', nameHi: 'कंपनी अधिनियम', icon: FileText },
  ]

  const complianceData: any = {
    gst: {
      overview: {
        title: 'GST Compliance Overview',
        titleHi: 'जीएसटी अनुपालन अवलोकन',
        description: 'Goods and Services Tax compliance requirements for businesses',
        descriptionHi: 'व्यवसायों के लिए वस्तु और सेवा कर अनुपालन आवश्यकताएं'
      },
      requirements: [
        {
          title: 'GST Registration',
          titleHi: 'जीएसटी पंजीकरण',
          description: 'Mandatory for businesses with turnover > ₹40 lakh (₹20 lakh for services)',
          descriptionHi: 'टर्नओवर > ₹40 लाख (सेवाओं के लिए ₹20 लाख) वाले व्यवसायों के लिए अनिवार्य',
          deadline: 'Within 30 days of crossing threshold',
          deadlineHi: 'सीमा पार करने के 30 दिनों के भीतर',
          status: 'required'
        },
        {
          title: 'Monthly GSTR-1 Filing',
          titleHi: 'मासिक जीएसटीआर-1 फाइलिंग',
          description: 'Details of outward supplies of goods and services',
          descriptionHi: 'वस्तुओं और सेवाओं की बाहरी आपूर्ति का विवरण',
          deadline: '11th of next month',
          deadlineHi: 'अगले महीने की 11 तारीख',
          status: 'required'
        },
        {
          title: 'Monthly GSTR-3B Filing',
          titleHi: 'मासिक जीएसटीआर-3बी फाइलिंग',
          description: 'Summary return with tax payment',
          descriptionHi: 'कर भुगतान के साथ सारांश रिटर्न',
          deadline: '20th of next month',
          deadlineHi: 'अगले महीने की 20 तारीख',
          status: 'required'
        },
        {
          title: 'Annual GSTR-9 Filing',
          titleHi: 'वार्षिक जीएसटीआर-9 फाइलिंग',
          description: 'Annual return consolidating all monthly returns',
          descriptionHi: 'सभी मासिक रिटर्न को समेकित करने वाला वार्षिक रिटर्न',
          deadline: '31st December of next financial year',
          deadlineHi: 'अगले वित्तीय वर्ष की 31 दिसंबर',
          status: 'required'
        }
      ],
      documents: [
        { name: 'PAN Card', nameHi: 'पैन कार्ड', required: true },
        { name: 'Aadhaar Card', nameHi: 'आधार कार्ड', required: true },
        { name: 'Business Registration Proof', nameHi: 'व्यवसाय पंजीकरण प्रमाण', required: true },
        { name: 'Bank Account Details', nameHi: 'बैंक खाता विवरण', required: true },
        { name: 'Business Address Proof', nameHi: 'व्यवसाय पता प्रमाण', required: true },
      ],
      penalties: [
        { violation: 'Late filing of returns', violationHi: 'रिटर्न की देर से फाइलिंग', penalty: '₹50/day (max ₹5,000)' },
        { violation: 'Non-registration', violationHi: 'गैर-पंजीकरण', penalty: '10% of tax due or ₹10,000' },
        { violation: 'Wrong invoice details', violationHi: 'गलत चालान विवरण', penalty: '₹25,000' },
      ]
    },
    labor: {
      overview: {
        title: 'Labor Law Compliance',
        titleHi: 'श्रम कानून अनुपालन',
        description: 'Essential labor law requirements for employers',
        descriptionHi: 'नियोक्ताओं के लिए आवश्यक श्रम कानून आवश्यकताएं'
      },
      requirements: [
        {
          title: 'Minimum Wages Act',
          titleHi: 'न्यूनतम मजदूरी अधिनियम',
          description: 'Pay minimum wages as per state government notification',
          descriptionHi: 'राज्य सरकार की अधिसूचना के अनुसार न्यूनतम मजदूरी का भुगतान करें',
          deadline: 'Monthly',
          deadlineHi: 'मासिक',
          status: 'required'
        },
        {
          title: 'EPF Registration',
          titleHi: 'ईपीएफ पंजीकरण',
          description: 'Mandatory for establishments with 20+ employees',
          descriptionHi: '20+ कर्मचारियों वाले प्रतिष्ठानों के लिए अनिवार्य',
          deadline: 'Within 1 month of crossing threshold',
          deadlineHi: 'सीमा पार करने के 1 महीने के भीतर',
          status: 'required'
        },
        {
          title: 'ESI Registration',
          titleHi: 'ईएसआई पंजीकरण',
          description: 'For establishments with 10+ employees',
          descriptionHi: '10+ कर्मचारियों वाले प्रतिष्ठानों के लिए',
          deadline: 'Within 15 days of applicability',
          deadlineHi: 'लागू होने के 15 दिनों के भीतर',
          status: 'required'
        },
        {
          title: 'Professional Tax',
          titleHi: 'व्यावसायिक कर',
          description: 'State-specific tax on employment',
          descriptionHi: 'रोजगार पर राज्य-विशिष्ट कर',
          deadline: 'Monthly',
          deadlineHi: 'मासिक',
          status: 'required'
        }
      ],
      documents: [
        { name: 'Employment Contracts', nameHi: 'रोजगार अनुबंध', required: true },
        { name: 'Attendance Records', nameHi: 'उपस्थिति रिकॉर्ड', required: true },
        { name: 'Wage Register', nameHi: 'मजदूरी रजिस्टर', required: true },
        { name: 'Leave Records', nameHi: 'छुट्टी रिकॉर्ड', required: true },
      ],
      penalties: [
        { violation: 'Non-payment of minimum wages', violationHi: 'न्यूनतम मजदूरी का भुगतान न करना', penalty: 'Imprisonment up to 6 months' },
        { violation: 'Non-registration under EPF', violationHi: 'ईपीएफ के तहत गैर-पंजीकरण', penalty: '₹1 lakh fine' },
        { violation: 'Non-maintenance of records', violationHi: 'रिकॉर्ड का रखरखाव न करना', penalty: '₹25,000 fine' },
      ]
    }
  }

  const currentData = complianceData[selectedCategory]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-purple-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <Scale size={32} />
                <div>
                  <h1 className="text-xl font-bold">अनुपालन मार्गदर्शिका</h1>
                  <p className="text-sm opacity-90">Compliance Guide</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Category / श्रेणी चुनें</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <category.icon className="mx-auto mb-2 text-purple-600" size={32} />
                <p className="font-bold text-gray-900">{category.nameHi}</p>
                <p className="text-sm text-gray-600">{category.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-2">{currentData.overview.titleHi}</h2>
          <p className="text-lg opacity-90 mb-2">{currentData.overview.title}</p>
          <p className="opacity-90">{currentData.overview.descriptionHi}</p>
          <p className="text-sm opacity-75">{currentData.overview.description}</p>
        </div>

        {/* Compliance Requirements */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="text-green-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">Compliance Requirements / अनुपालन आवश्यकताएं</h3>
          </div>
          <div className="space-y-4">
            {currentData.requirements.map((req: any, idx: number) => (
              <div key={idx} className="border-l-4 border-purple-600 bg-purple-50 p-4 rounded-r-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{req.titleHi}</h4>
                    <p className="text-sm text-gray-600 mb-2">{req.title}</p>
                  </div>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Required
                  </span>
                </div>
                <p className="text-gray-700 mb-1">{req.descriptionHi}</p>
                <p className="text-sm text-gray-600 mb-3">{req.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-purple-600" />
                  <span className="font-semibold text-gray-900">Deadline:</span>
                  <span className="text-gray-700">{req.deadlineHi} / {req.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">Required Documents / आवश्यक दस्तावेज</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {currentData.documents.map((doc: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-blue-600" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">{doc.nameHi}</p>
                    <p className="text-sm text-gray-600">{doc.name}</p>
                  </div>
                </div>
                {doc.required && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                    Required
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Penalties */}
        <div className="bg-red-50 rounded-lg shadow-md p-6 border-l-4 border-red-600">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="text-red-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">Penalties for Non-Compliance / गैर-अनुपालन के लिए दंड</h3>
          </div>
          <div className="space-y-3">
            {currentData.penalties.map((penalty: any, idx: number) => (
              <div key={idx} className="bg-white p-4 rounded-lg border border-red-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">{penalty.violationHi}</p>
                    <p className="text-sm text-gray-600">{penalty.violation}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-red-600">{penalty.penalty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Templates */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md p-6 border-l-4 border-indigo-600">
          <div className="flex items-center gap-2 mb-4">
            <Download className="text-indigo-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">Download Templates / टेम्पलेट डाउनलोड करें</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="bg-white p-4 rounded-lg border-2 border-indigo-200 hover:border-indigo-400 transition-colors text-left">
              <FileText className="text-indigo-600 mb-2" size={24} />
              <p className="font-semibold text-gray-900">Compliance Checklist</p>
              <p className="text-sm text-gray-600">PDF Format</p>
            </button>
            <button className="bg-white p-4 rounded-lg border-2 border-indigo-200 hover:border-indigo-400 transition-colors text-left">
              <FileText className="text-indigo-600 mb-2" size={24} />
              <p className="font-semibold text-gray-900">Document Templates</p>
              <p className="text-sm text-gray-600">Word Format</p>
            </button>
            <button className="bg-white p-4 rounded-lg border-2 border-indigo-200 hover:border-indigo-400 transition-colors text-left">
              <FileText className="text-indigo-600 mb-2" size={24} />
              <p className="font-semibold text-gray-900">Compliance Calendar</p>
              <p className="text-sm text-gray-600">Excel Format</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
