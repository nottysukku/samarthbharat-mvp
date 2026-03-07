import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, FileText, Phone, CheckCircle } from 'lucide-react'

export default function LegalRightsPage() {
  const navigate = useNavigate()
  const [complaintForm, setComplaintForm] = useState({
    type: '',
    description: '',
    location: ''
  })

  const rights = [
    {
      title: 'Minimum Support Price (MSP)',
      titleHi: 'न्यूनतम समर्थन मूल्य',
      description: 'Right to receive MSP for notified crops',
      descriptionHi: 'अधिसूचित फसलों के लिए एमएसपी प्राप्त करने का अधिकार',
      details: [
        'Government announces MSP for 23 crops',
        'Farmers can sell at MSP to government agencies',
        'Protection against price crashes'
      ],
      detailsHi: [
        'सरकार 23 फसलों के लिए एमएसपी की घोषणा करती है',
        'किसान सरकारी एजेंसियों को एमएसपी पर बेच सकते हैं',
        'मूल्य गिरावट से सुरक्षा'
      ]
    },
    {
      title: 'Land Rights',
      titleHi: 'भूमि अधिकार',
      description: 'Protection of agricultural land ownership',
      descriptionHi: 'कृषि भूमि स्वामित्व की सुरक्षा',
      details: [
        'Right to own and cultivate land',
        'Protection against illegal land grabbing',
        'Inheritance rights for agricultural land'
      ],
      detailsHi: [
        'भूमि के स्वामित्व और खेती का अधिकार',
        'अवैध भूमि हड़पने से सुरक्षा',
        'कृषि भूमि के लिए विरासत अधिकार'
      ]
    },
    {
      title: 'Water Rights',
      titleHi: 'जल अधिकार',
      description: 'Access to irrigation water',
      descriptionHi: 'सिंचाई के पानी तक पहुंच',
      details: [
        'Right to fair water distribution',
        'Access to canal water',
        'Groundwater usage rights'
      ],
      detailsHi: [
        'उचित जल वितरण का अधिकार',
        'नहर के पानी तक पहुंच',
        'भूजल उपयोग अधिकार'
      ]
    },
    {
      title: 'Credit Rights',
      titleHi: 'ऋण अधिकार',
      description: 'Access to institutional credit',
      descriptionHi: 'संस्थागत ऋण तक पहुंच',
      details: [
        'Right to get loans from banks',
        'Crop insurance benefits',
        'Interest subvention schemes'
      ],
      detailsHi: [
        'बैंकों से ऋण प्राप्त करने का अधिकार',
        'फसल बीमा लाभ',
        'ब्याज सब्सिडी योजनाएं'
      ]
    }
  ]

  const complaintTypes = [
    { id: 'msp', name: 'MSP Not Received', nameHi: 'एमएसपी नहीं मिला' },
    { id: 'land', name: 'Land Dispute', nameHi: 'भूमि विवाद' },
    { id: 'water', name: 'Water Shortage', nameHi: 'पानी की कमी' },
    { id: 'loan', name: 'Loan Issues', nameHi: 'ऋण समस्याएं' },
    { id: 'other', name: 'Other', nameHi: 'अन्य' }
  ]

  const recentComplaints = [
    {
      id: 'C001',
      type: 'MSP Not Received',
      typeHi: 'एमएसपी नहीं मिला',
      date: '10 Jan 2024',
      status: 'Under Review',
      statusHi: 'समीक्षाधीन'
    },
    {
      id: 'C002',
      type: 'Water Shortage',
      typeHi: 'पानी की कमी',
      date: '05 Jan 2024',
      status: 'Resolved',
      statusHi: 'हल हो गया'
    }
  ]

  const helplines = [
    { name: 'Kisan Call Center', nameHi: 'किसान कॉल सेंटर', number: '1800-180-1551', available: '24x7' },
    { name: 'PM-KISAN Helpline', nameHi: 'पीएम-किसान हेल्पलाइन', number: '155261', available: '9 AM - 6 PM' },
    { name: 'Crop Insurance', nameHi: 'फसल बीमा', number: '1800-200-7710', available: '10 AM - 6 PM' },
  ]

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Complaint submitted successfully! / शिकायत सफलतापूर्वक दर्ज की गई!')
    setComplaintForm({ type: '', description: '', location: '' })
  }

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
                <Shield size={32} />
                <div>
                  <h1 className="text-xl font-bold">कानूनी अधिकार और शिकायतें</h1>
                  <p className="text-sm opacity-90">Legal Rights & Complaints</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Your Rights */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="text-purple-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Your Rights / आपके अधिकार</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {rights.map((right, idx) => (
              <div key={idx} className="border-l-4 border-purple-600 bg-purple-50 p-4 rounded-r-lg">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{right.titleHi}</h3>
                <p className="text-sm text-gray-600 mb-3">{right.title}</p>
                <p className="text-gray-700 mb-2">{right.descriptionHi}</p>
                <p className="text-sm text-gray-600 mb-3">{right.description}</p>
                <div className="space-y-1">
                  {right.details.map((detail, dIdx) => (
                    <div key={dIdx}>
                      <p className="text-sm text-gray-700 flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                        {right.detailsHi[dIdx]}
                      </p>
                      <p className="text-xs text-gray-500 ml-6">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* File Complaint */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="text-red-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">File a Complaint / शिकायत दर्ज करें</h2>
          </div>
          <form onSubmit={handleSubmitComplaint} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Complaint Type / शिकायत का प्रकार
              </label>
              <select
                value={complaintForm.type}
                onChange={(e) => setComplaintForm({ ...complaintForm, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              >
                <option value="">Select Type / प्रकार चुनें</option>
                {complaintTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.nameHi} / {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location / स्थान
              </label>
              <input
                type="text"
                value={complaintForm.location}
                onChange={(e) => setComplaintForm({ ...complaintForm, location: e.target.value })}
                placeholder="Village, District / गांव, जिला"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description / विवरण
              </label>
              <textarea
                value={complaintForm.description}
                onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                placeholder="Describe your complaint in detail / अपनी शिकायत का विस्तार से वर्णन करें"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Submit Complaint / शिकायत दर्ज करें
            </button>
          </form>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Complaints / आपकी शिकायतें</h2>
          <div className="space-y-3">
            {recentComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">#{complaint.id} - {complaint.typeHi}</p>
                  <p className="text-sm text-gray-600">{complaint.type}</p>
                  <p className="text-xs text-gray-500 mt-1">Filed on: {complaint.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    complaint.status === 'Resolved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {complaint.statusHi}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Helplines */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Phone size={24} />
            <h2 className="text-2xl font-bold">Emergency Helplines / आपातकालीन हेल्पलाइन</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {helplines.map((helpline, idx) => (
              <div key={idx} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="font-bold text-lg mb-1">{helpline.nameHi}</p>
                <p className="text-sm opacity-90 mb-2">{helpline.name}</p>
                <p className="text-2xl font-bold mb-1">{helpline.number}</p>
                <p className="text-xs opacity-75">{helpline.available}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
