import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, DollarSign, Calendar, CheckCircle, ExternalLink } from 'lucide-react'

export default function FarmerSchemesPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Schemes', nameHi: 'सभी योजनाएं' },
    { id: 'subsidy', name: 'Subsidies', nameHi: 'सब्सिडी' },
    { id: 'insurance', name: 'Insurance', nameHi: 'बीमा' },
    { id: 'loan', name: 'Loans', nameHi: 'ऋण' },
    { id: 'income', name: 'Income Support', nameHi: 'आय सहायता' },
  ]

  const schemes = [
    {
      id: 1,
      category: 'income',
      name: 'PM-KISAN',
      nameHi: 'पीएम-किसान',
      fullName: 'Pradhan Mantri Kisan Samman Nidhi',
      fullNameHi: 'प्रधानमंत्री किसान सम्मान निधि',
      benefit: '₹6,000/year in 3 installments',
      benefitHi: '₹6,000/वर्ष 3 किस्तों में',
      eligibility: 'All landholding farmers',
      eligibilityHi: 'सभी भूमिधारक किसान',
      documents: ['Aadhaar', 'Bank Account', 'Land Records'],
      documentsHi: ['आधार', 'बैंक खाता', 'भूमि रिकॉर्ड'],
      applicationLink: 'https://pmkisan.gov.in',
      deadline: 'Open',
      deadlineHi: 'खुला',
      status: 'Active',
      statusHi: 'सक्रिय'
    },
    {
      id: 2,
      category: 'insurance',
      name: 'PMFBY',
      nameHi: 'पीएमएफबीवाई',
      fullName: 'Pradhan Mantri Fasal Bima Yojana',
      fullNameHi: 'प्रधानमंत्री फसल बीमा योजना',
      benefit: 'Crop insurance with 2% premium for Kharif, 1.5% for Rabi',
      benefitHi: 'खरीफ के लिए 2% प्रीमियम, रबी के लिए 1.5% के साथ फसल बीमा',
      eligibility: 'All farmers growing notified crops',
      eligibilityHi: 'अधिसूचित फसलें उगाने वाले सभी किसान',
      documents: ['Aadhaar', 'Bank Account', 'Land Documents', 'Sowing Certificate'],
      documentsHi: ['आधार', 'बैंक खाता', 'भूमि दस्तावेज', 'बुवाई प्रमाण पत्र'],
      applicationLink: 'https://pmfby.gov.in',
      deadline: '31 July 2024 (Kharif)',
      deadlineHi: '31 जुलाई 2024 (खरीफ)',
      status: 'Active',
      statusHi: 'सक्रिय'
    },
    {
      id: 3,
      category: 'subsidy',
      name: 'Soil Health Card Scheme',
      nameHi: 'मृदा स्वास्थ्य कार्ड योजना',
      fullName: 'Soil Health Card Scheme',
      fullNameHi: 'मृदा स्वास्थ्य कार्ड योजना',
      benefit: 'Free soil testing and recommendations',
      benefitHi: 'मुफ्त मिट्टी परीक्षण और सिफारिशें',
      eligibility: 'All farmers',
      eligibilityHi: 'सभी किसान',
      documents: ['Aadhaar', 'Land Records'],
      documentsHi: ['आधार', 'भूमि रिकॉर्ड'],
      applicationLink: 'https://soilhealth.dac.gov.in',
      deadline: 'Open',
      deadlineHi: 'खुला',
      status: 'Active',
      statusHi: 'सक्रिय'
    },
    {
      id: 4,
      category: 'loan',
      name: 'Kisan Credit Card',
      nameHi: 'किसान क्रेडिट कार्ड',
      fullName: 'Kisan Credit Card Scheme',
      fullNameHi: 'किसान क्रेडिट कार्ड योजना',
      benefit: 'Short-term credit up to ₹3 lakh at 7% interest',
      benefitHi: '7% ब्याज पर ₹3 लाख तक का अल्पकालिक ऋण',
      eligibility: 'Farmers with land ownership or lease',
      eligibilityHi: 'भूमि स्वामित्व या पट्टे वाले किसान',
      documents: ['Aadhaar', 'PAN', 'Land Documents', 'Bank Account'],
      documentsHi: ['आधार', 'पैन', 'भूमि दस्तावेज', 'बैंक खाता'],
      applicationLink: 'Apply at nearest bank',
      deadline: 'Open',
      deadlineHi: 'खुला',
      status: 'Active',
      statusHi: 'सक्रिय'
    },
    {
      id: 5,
      category: 'subsidy',
      name: 'Micro Irrigation Subsidy',
      nameHi: 'सूक्ष्म सिंचाई सब्सिडी',
      fullName: 'Pradhan Mantri Krishi Sinchayee Yojana',
      fullNameHi: 'प्रधानमंत्री कृषि सिंचाई योजना',
      benefit: 'Up to 55% subsidy on drip/sprinkler irrigation',
      benefitHi: 'ड्रिप/स्प्रिंकलर सिंचाई पर 55% तक सब्सिडी',
      eligibility: 'All farmers',
      eligibilityHi: 'सभी किसान',
      documents: ['Aadhaar', 'Land Documents', 'Bank Account', 'Quotation'],
      documentsHi: ['आधार', 'भूमि दस्तावेज', 'बैंक खाता', 'कोटेशन'],
      applicationLink: 'Apply through Agriculture Department',
      deadline: '31 March 2024',
      deadlineHi: '31 मार्च 2024',
      status: 'Active',
      statusHi: 'सक्रिय'
    },
    {
      id: 6,
      category: 'subsidy',
      name: 'Farm Mechanization Subsidy',
      nameHi: 'कृषि यंत्रीकरण सब्सिडी',
      fullName: 'Sub-Mission on Agricultural Mechanization',
      fullNameHi: 'कृषि यंत्रीकरण पर उप-मिशन',
      benefit: '40-50% subsidy on farm equipment',
      benefitHi: 'कृषि उपकरण पर 40-50% सब्सिडी',
      eligibility: 'Small and marginal farmers',
      eligibilityHi: 'लघु और सीमांत किसान',
      documents: ['Aadhaar', 'Land Documents', 'Caste Certificate (if applicable)'],
      documentsHi: ['आधार', 'भूमि दस्तावेज', 'जाति प्रमाण पत्र (यदि लागू हो)'],
      applicationLink: 'Apply through Agriculture Department',
      deadline: 'Open',
      deadlineHi: 'खुला',
      status: 'Active',
      statusHi: 'सक्रिय'
    }
  ]

  const filteredSchemes = selectedCategory === 'all'
    ? schemes
    : schemes.filter(s => s.category === selectedCategory)

  const myApplications = [
    {
      id: 1,
      scheme: 'PM-KISAN',
      schemeHi: 'पीएम-किसान',
      appliedDate: '01 Jan 2024',
      status: 'Approved',
      statusHi: 'स्वीकृत',
      amount: '₹2,000'
    },
    {
      id: 2,
      scheme: 'PMFBY',
      schemeHi: 'पीएमएफबीवाई',
      appliedDate: '15 Dec 2023',
      status: 'Under Review',
      statusHi: 'समीक्षाधीन',
      amount: 'Pending'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-orange-600 text-white shadow-lg border-b-4 border-orange-500">
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
                  <h1 className="text-xl font-bold">सरकारी योजनाएं</h1>
                  <p className="text-sm opacity-90">Government Schemes</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* My Applications */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Applications / मेरे आवेदन</h2>
          <div className="space-y-3">
            {myApplications.map((app) => (
              <div key={app.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{app.schemeHi} / {app.scheme}</p>
                  <p className="text-sm text-gray-600">Applied: {app.appliedDate}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      app.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {app.statusHi}
                  </span>
                  {app.amount !== 'Pending' && (
                    <p className="text-lg font-bold text-green-600 mt-1">{app.amount}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Filter by Category / श्रेणी से फ़िल्टर करें</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.nameHi} / {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Available Schemes / उपलब्ध योजनाएं ({filteredSchemes.length})
          </h2>
          <div className="space-y-6">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{scheme.nameHi}</h3>
                    <p className="text-lg text-gray-700 mb-2">{scheme.name}</p>
                    <p className="text-sm text-gray-600 mb-1">{scheme.fullNameHi}</p>
                    <p className="text-xs text-gray-500">{scheme.fullName}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {scheme.statusHi}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <DollarSign className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Benefit / लाभ</p>
                      <p className="text-sm text-gray-900">{scheme.benefitHi}</p>
                      <p className="text-xs text-gray-600">{scheme.benefit}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="text-orange-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Deadline / समय सीमा</p>
                      <p className="text-sm text-gray-900">{scheme.deadlineHi}</p>
                      <p className="text-xs text-gray-600">{scheme.deadline}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Eligibility / पात्रता</p>
                  <p className="text-sm text-gray-900">{scheme.eligibilityHi}</p>
                  <p className="text-xs text-gray-600">{scheme.eligibility}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Required Documents / आवश्यक दस्तावेज</p>
                  <div className="flex flex-wrap gap-2">
                    {scheme.documentsHi.map((doc, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <CheckCircle size={14} />
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                    Apply Now / अभी आवेदन करें
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center justify-center gap-2">
                    <ExternalLink size={18} />
                    More Details / अधिक विवरण
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
