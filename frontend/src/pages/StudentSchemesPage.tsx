import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Award, Filter, Calendar, IndianRupee, FileText, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function StudentSchemesPage() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('amount')

  const schemes = [
    {
      id: 1,
      name: 'National Scholarship Portal (NSP)',
      nameHi: 'राष्ट्रीय छात्रवृत्ति पोर्टल',
      type: 'Merit',
      typeHi: 'मेधा',
      amount: '₹50,000/year',
      amountValue: 50000,
      eligibility: ['Family income < ₹8 lakh', 'Minimum 60% marks', 'Indian citizen'],
      eligibilityHi: ['पारिवारिक आय < ₹8 लाख', 'न्यूनतम 60% अंक', 'भारतीय नागरिक'],
      deadline: '31 Dec 2024',
      deadlineValue: new Date('2024-12-31'),
      status: 'Open',
      statusHi: 'खुला',
      documents: ['Aadhaar Card', 'Income Certificate', 'Marksheet', 'Bank Account'],
      documentsHi: ['आधार कार्ड', 'आय प्रमाण पत्र', 'मार्कशीट', 'बैंक खाता'],
      website: 'https://scholarships.gov.in',
      popularity: 95
    },
    {
      id: 2,
      name: 'PM Scholarship Scheme',
      nameHi: 'प्रधानमंत्री छात्रवृत्ति योजना',
      type: 'Government',
      typeHi: 'सरकारी',
      amount: '₹25,000/year',
      amountValue: 25000,
      eligibility: ['Children of armed forces', 'Minimum 60% marks', 'Age 18-25 years'],
      eligibilityHi: ['सशस्त्र बलों के बच्चे', 'न्यूनतम 60% अंक', 'आयु 18-25 वर्ष'],
      deadline: '15 Jan 2025',
      deadlineValue: new Date('2025-01-15'),
      status: 'Open',
      statusHi: 'खुला',
      documents: ['Service Certificate', 'Aadhaar Card', 'Marksheet', 'Domicile Certificate'],
      documentsHi: ['सेवा प्रमाण पत्र', 'आधार कार्ड', 'मार्कशीट', 'अधिवास प्रमाण पत्र'],
      website: 'https://ksb.gov.in',
      popularity: 88
    },
    {
      id: 3,
      name: 'Merit-cum-Means Scholarship',
      nameHi: 'मेरिट-कम-मीन्स छात्रवृत्ति',
      type: 'Merit',
      typeHi: 'मेधा',
      amount: '₹1,00,000/year',
      amountValue: 100000,
      eligibility: ['Family income < ₹6 lakh', 'Minimum 80% marks', 'Professional courses'],
      eligibilityHi: ['पारिवारिक आय < ₹6 लाख', 'न्यूनतम 80% अंक', 'व्यावसायिक पाठ्यक्रम'],
      deadline: '28 Feb 2025',
      deadlineValue: new Date('2025-02-28'),
      status: 'Upcoming',
      statusHi: 'आगामी',
      documents: ['Income Certificate', 'Marksheet', 'Admission Letter', 'Aadhaar Card'],
      documentsHi: ['आय प्रमाण पत्र', 'मार्कशीट', 'प्रवेश पत्र', 'आधार कार्ड'],
      website: 'https://scholarships.gov.in',
      popularity: 92
    },
    {
      id: 4,
      name: 'Minority Scholarship',
      nameHi: 'अल्पसंख्यक छात्रवृत्ति',
      type: 'Minority',
      typeHi: 'अल्पसंख्यक',
      amount: '₹30,000/year',
      amountValue: 30000,
      eligibility: ['Minority community', 'Family income < ₹8 lakh', 'Minimum 50% marks'],
      eligibilityHi: ['अल्पसंख्यक समुदाय', 'पारिवारिक आय < ₹8 लाख', 'न्यूनतम 50% अंक'],
      deadline: '20 Jan 2025',
      deadlineValue: new Date('2025-01-20'),
      status: 'Open',
      statusHi: 'खुला',
      documents: ['Community Certificate', 'Income Certificate', 'Marksheet', 'Aadhaar Card'],
      documentsHi: ['समुदाय प्रमाण पत्र', 'आय प्रमाण पत्र', 'मार्कशीट', 'आधार कार्ड'],
      website: 'https://scholarships.gov.in',
      popularity: 85
    },
    {
      id: 5,
      name: 'SC/ST Post-Matric Scholarship',
      nameHi: 'एससी/एसटी पोस्ट-मैट्रिक छात्रवृत्ति',
      type: 'SC/ST',
      typeHi: 'एससी/एसटी',
      amount: '₹35,000/year',
      amountValue: 35000,
      eligibility: ['SC/ST category', 'Family income < ₹2.5 lakh', 'Post-matric studies'],
      eligibilityHi: ['एससी/एसटी श्रेणी', 'पारिवारिक आय < ₹2.5 लाख', 'पोस्ट-मैट्रिक अध्ययन'],
      deadline: '10 Feb 2025',
      deadlineValue: new Date('2025-02-10'),
      status: 'Open',
      statusHi: 'खुला',
      documents: ['Caste Certificate', 'Income Certificate', 'Marksheet', 'Fee Receipt'],
      documentsHi: ['जाति प्रमाण पत्र', 'आय प्रमाण पत्र', 'मार्कशीट', 'शुल्क रसीद'],
      website: 'https://scholarships.gov.in',
      popularity: 90
    },
    {
      id: 6,
      name: 'OBC Post-Matric Scholarship',
      nameHi: 'ओबीसी पोस्ट-मैट्रिक छात्रवृत्ति',
      type: 'OBC',
      typeHi: 'ओबीसी',
      amount: '₹20,000/year',
      amountValue: 20000,
      eligibility: ['OBC category', 'Family income < ₹3 lakh', 'Post-matric studies'],
      eligibilityHi: ['ओबीसी श्रेणी', 'पारिवारिक आय < ₹3 लाख', 'पोस्ट-मैट्रिक अध्ययन'],
      deadline: '05 Jan 2025',
      deadlineValue: new Date('2025-01-05'),
      status: 'Closed',
      statusHi: 'बंद',
      documents: ['Caste Certificate', 'Income Certificate', 'Marksheet', 'Admission Proof'],
      documentsHi: ['जाति प्रमाण पत्र', 'आय प्रमाण पत्र', 'मार्कशीट', 'प्रवेश प्रमाण'],
      website: 'https://scholarships.gov.in',
      popularity: 82
    },
    {
      id: 7,
      name: 'Girl Child Education Scholarship',
      nameHi: 'बालिका शिक्षा छात्रवृत्ति',
      type: 'Merit',
      typeHi: 'मेधा',
      amount: '₹15,000/year',
      amountValue: 15000,
      eligibility: ['Female students', 'Family income < ₹5 lakh', 'Minimum 55% marks'],
      eligibilityHi: ['महिला छात्र', 'पारिवारिक आय < ₹5 लाख', 'न्यूनतम 55% अंक'],
      deadline: '25 Jan 2025',
      deadlineValue: new Date('2025-01-25'),
      status: 'Open',
      statusHi: 'खुला',
      documents: ['Birth Certificate', 'Income Certificate', 'Marksheet', 'Aadhaar Card'],
      documentsHi: ['जन्म प्रमाण पत्र', 'आय प्रमाण पत्र', 'मार्कशीट', 'आधार कार्ड'],
      website: 'https://scholarships.gov.in',
      popularity: 87
    },
    {
      id: 8,
      name: 'Central Sector Scholarship',
      nameHi: 'केंद्रीय क्षेत्र छात्रवृत्ति',
      type: 'Merit',
      typeHi: 'मेधा',
      amount: '₹12,000/year',
      amountValue: 12000,
      eligibility: ['Top 20% in Class 12', 'Family income < ₹4.5 lakh', 'Regular course'],
      eligibilityHi: ['कक्षा 12 में शीर्ष 20%', 'पारिवारिक आय < ₹4.5 लाख', 'नियमित पाठ्यक्रम'],
      deadline: '30 Jan 2025',
      deadlineValue: new Date('2025-01-30'),
      status: 'Open',
      statusHi: 'खुला',
      documents: ['Class 12 Marksheet', 'Income Certificate', 'College ID', 'Bank Details'],
      documentsHi: ['कक्षा 12 मार्कशीट', 'आय प्रमाण पत्र', 'कॉलेज आईडी', 'बैंक विवरण'],
      website: 'https://scholarships.gov.in',
      popularity: 80
    },
    {
      id: 9,
      name: 'State Merit Scholarship',
      nameHi: 'राज्य मेरिट छात्रवृत्ति',
      type: 'Merit',
      typeHi: 'मेधा',
      amount: '₹10,000/year',
      amountValue: 10000,
      eligibility: ['State domicile', 'Minimum 75% marks', 'Undergraduate courses'],
      eligibilityHi: ['राज्य अधिवास', 'न्यूनतम 75% अंक', 'स्नातक पाठ्यक्रम'],
      deadline: '15 Feb 2025',
      deadlineValue: new Date('2025-02-15'),
      status: 'Upcoming',
      statusHi: 'आगामी',
      documents: ['Domicile Certificate', 'Marksheet', 'College Admission Letter', 'Aadhaar Card'],
      documentsHi: ['अधिवास प्रमाण पत्र', 'मार्कशीट', 'कॉलेज प्रवेश पत्र', 'आधार कार्ड'],
      website: 'https://state.gov.in/scholarships',
      popularity: 78
    }
  ]

  const schemeTypes = [
    { id: 'all', name: 'All Types', nameHi: 'सभी प्रकार' },
    { id: 'Merit', name: 'Merit', nameHi: 'मेधा' },
    { id: 'Government', name: 'Government', nameHi: 'सरकारी' },
    { id: 'Minority', name: 'Minority', nameHi: 'अल्पसंख्यक' },
    { id: 'SC/ST', name: 'SC/ST', nameHi: 'एससी/एसटी' },
    { id: 'OBC', name: 'OBC', nameHi: 'ओबीसी' }
  ]

  const statusTypes = [
    { id: 'all', name: 'All Status', nameHi: 'सभी स्थिति' },
    { id: 'Open', name: 'Open', nameHi: 'खुला' },
    { id: 'Closed', name: 'Closed', nameHi: 'बंद' },
    { id: 'Upcoming', name: 'Upcoming', nameHi: 'आगामी' }
  ]

  const sortOptions = [
    { id: 'amount', name: 'Amount (High to Low)', nameHi: 'राशि (उच्च से निम्न)' },
    { id: 'deadline', name: 'Deadline (Nearest)', nameHi: 'समय सीमा (निकटतम)' },
    { id: 'popularity', name: 'Popularity', nameHi: 'लोकप्रियता' }
  ]

  // Filter and sort schemes
  const filteredSchemes = schemes
    .filter(scheme => {
      if (selectedType !== 'all' && scheme.type !== selectedType) return false
      if (selectedStatus !== 'all' && scheme.status !== selectedStatus) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'amount') return b.amountValue - a.amountValue
      if (sortBy === 'deadline') return a.deadlineValue.getTime() - b.deadlineValue.getTime()
      if (sortBy === 'popularity') return b.popularity - a.popularity
      return 0
    })

  const handleApply = (scheme: any) => {
    window.open(scheme.website, '_blank')
    toast.success(`Opening ${scheme.name} application portal`)
  }

  const handleSetReminder = (scheme: any) => {
    toast.success(`Reminder set for ${scheme.name} deadline`)
  }

  const getStatusColor = (status: string) => {
    if (status === 'Open') return 'bg-green-100 text-green-800'
    if (status === 'Closed') return 'bg-red-100 text-red-800'
    if (status === 'Upcoming') return 'bg-yellow-100 text-yellow-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    if (status === 'Open') return <CheckCircle size={16} />
    if (status === 'Closed') return <AlertCircle size={16} />
    if (status === 'Upcoming') return <Clock size={16} />
    return null
  }

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
                <Award size={32} />
                <div>
                  <h1 className="text-xl font-bold">छात्रवृत्ति योजनाएं</h1>
                  <p className="text-sm opacity-90">Student Scholarship Schemes</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Schemes</p>
                <p className="text-3xl font-bold">{schemes.length}</p>
                <p className="text-xs opacity-75">कुल योजनाएं</p>
              </div>
              <Award size={48} className="opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Open for Application</p>
                <p className="text-3xl font-bold">{schemes.filter(s => s.status === 'Open').length}</p>
                <p className="text-xs opacity-75">आवेदन के लिए खुला</p>
              </div>
              <CheckCircle size={48} className="opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Max Amount</p>
                <p className="text-3xl font-bold">₹1L</p>
                <p className="text-xs opacity-75">अधिकतम राशि</p>
              </div>
              <IndianRupee size={48} className="opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-orange-600" />
            <h2 className="text-xl font-bold text-gray-900">Filter & Sort / फ़िल्टर और सॉर्ट करें</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Scheme Type / योजना प्रकार
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {schemeTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.nameHi} / {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status / स्थिति
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {statusTypes.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.nameHi} / {status.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By / क्रमबद्ध करें
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.nameHi}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredSchemes.length} of {schemes.length} schemes / 
            {schemes.length} में से {filteredSchemes.length} योजनाएं दिखा रहे हैं
          </div>
        </div>

        {/* Schemes List */}
        <div className="space-y-6">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{scheme.nameHi}</h3>
                    <p className="text-lg text-gray-700 mb-2">{scheme.name}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {scheme.typeHi}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getStatusColor(scheme.status)}`}>
                        {getStatusIcon(scheme.status)}
                        {scheme.statusHi}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600 mb-1">
                      <IndianRupee size={24} />
                      <span className="text-3xl font-bold">{scheme.amount.split('/')[0].replace('₹', '')}</span>
                    </div>
                    <p className="text-sm text-gray-600">per year / प्रति वर्ष</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Eligibility */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle size={18} className="text-blue-600" />
                      Eligibility / पात्रता
                    </p>
                    <ul className="space-y-1">
                      {scheme.eligibilityHi.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          <p className="font-medium text-gray-900">{item}</p>
                          <p className="text-xs text-gray-600">{scheme.eligibility[idx]}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Documents */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <FileText size={18} className="text-purple-600" />
                      Required Documents / आवश्यक दस्तावेज़
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {scheme.documentsHi.map((doc, idx) => (
                        <div key={idx} className="text-xs">
                          <p className="font-medium text-gray-900">{doc}</p>
                          <p className="text-gray-600">{scheme.documents[idx]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deadline */}
                <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-4 rounded-r-lg">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-yellow-600" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900">Application Deadline / आवेदन की अंतिम तिथि</p>
                      <p className="text-sm text-gray-700">{scheme.deadline}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApply(scheme)}
                    disabled={scheme.status === 'Closed'}
                    className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                      scheme.status === 'Closed'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-600 text-white hover:bg-orange-700'
                    }`}
                  >
                    <ExternalLink size={20} />
                    {scheme.status === 'Closed' ? 'Closed / बंद' : 'Apply Now / अभी आवेदन करें'}
                  </button>
                  <button
                    onClick={() => handleSetReminder(scheme)}
                    className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-bold flex items-center gap-2"
                  >
                    <Calendar size={20} />
                    Remind / याद दिलाएं
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredSchemes.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Award size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No schemes found / कोई योजना नहीं मिली</h3>
            <p className="text-gray-600">Try adjusting your filters / अपने फ़िल्टर समायोजित करने का प्रयास करें</p>
          </div>
        )}

        {/* Important Notice */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Important Information / महत्वपूर्ण जानकारी</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Apply early to avoid last-minute rush / अंतिम समय की भीड़ से बचने के लिए जल्दी आवेदन करें</li>
                <li>• Keep all documents ready before applying / आवेदन करने से पहले सभी दस्तावेज़ तैयार रखें</li>
                <li>• Check eligibility criteria carefully / पात्रता मानदंड ध्यान से जांचें</li>
                <li>• Save application reference number for tracking / ट्रैकिंग के लिए आवेदन संदर्भ संख्या सहेजें</li>
                <li>• Contact helpline for any queries / किसी भी प्रश्न के लिए हेल्पलाइन से संपर्क करें</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
