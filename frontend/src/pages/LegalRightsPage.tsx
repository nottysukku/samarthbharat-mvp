import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, FileText, Phone, CheckCircle } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

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
      description: 'Right to receive MSP for notified crops',
      details: [
        'Government announces MSP for 23 crops',
        'Farmers can sell at MSP to government agencies',
        'Protection against price crashes'
      ]
    },
    {
      title: 'Land Rights',
      description: 'Protection of agricultural land ownership',
      details: [
        'Right to own and cultivate land',
        'Protection against illegal land grabbing',
        'Inheritance rights for agricultural land'
      ]
    },
    {
      title: 'Water Rights',
      description: 'Access to irrigation water',
      details: [
        'Right to fair water distribution',
        'Access to canal water',
        'Groundwater usage rights'
      ]
    },
    {
      title: 'Credit Rights',
      description: 'Access to institutional credit',
      details: [
        'Right to get loans from banks',
        'Crop insurance benefits',
        'Interest subvention schemes'
      ]
    }
  ]

  const complaintTypes = [
    { id: 'msp', name: 'MSP Not Received' },
    { id: 'land', name: 'Land Dispute' },
    { id: 'water', name: 'Water Shortage' },
    { id: 'loan', name: 'Loan Issues' },
    { id: 'other', name: 'Other' }
  ]

  const recentComplaints = [
    {
      id: 'C001',
      type: 'MSP Not Received',
      date: '10 Jan 2024',
      status: 'Under Review'
    },
    {
      id: 'C002',
      type: 'Water Shortage',
      date: '05 Jan 2024',
      status: 'Resolved'
    }
  ]

  const helplines = [
    { name: 'Kisan Call Center', number: '1800-180-1551', available: '24x7' },
    { name: 'PM-KISAN Helpline', number: '155261', available: '9 AM - 6 PM' },
    { name: 'Crop Insurance', number: '1800-200-7710', available: '10 AM - 6 PM' },
  ]

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Complaint submitted successfully!')
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
              <span className="font-medium"><T>Back</T></span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <Shield size={32} />
                <div>
                  <h1 className="text-xl font-bold"><T>Legal Rights & Complaints</T></h1>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Your Rights */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="text-purple-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900"><T>Your Rights</T></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {rights.map((right, idx) => (
              <div key={idx} className="border-l-4 border-purple-600 bg-purple-50 p-4 rounded-r-lg">
                <h3 className="font-bold text-gray-900 text-lg mb-1"><T>{right.title}</T></h3>
                <p className="text-gray-700 mb-3"><T>{right.description}</T></p>
                <div className="space-y-1">
                  {right.details.map((detail, dIdx) => (
                    <div key={dIdx}>
                      <p className="text-sm text-gray-700 flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <T>{detail}</T>
                      </p>
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
            <h2 className="text-2xl font-bold text-gray-900"><T>File a Complaint</T></h2>
          </div>
          <form onSubmit={handleSubmitComplaint} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <T>Complaint Type</T>
              </label>
              <select
                value={complaintForm.type}
                onChange={(e) => setComplaintForm({ ...complaintForm, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              >
                <option value=""><T>Select Type</T></option>
                {complaintTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    <T>{type.name}</T>
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <T>Location</T>
              </label>
              <input
                type="text"
                value={complaintForm.location}
                onChange={(e) => setComplaintForm({ ...complaintForm, location: e.target.value })}
                placeholder="Village, District"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <T>Description</T>
              </label>
              <textarea
                value={complaintForm.description}
                onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                placeholder="Describe your complaint in detail"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              <T>Submit Complaint</T>
            </button>
          </form>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4"><T>Your Complaints</T></h2>
          <div className="space-y-3">
            {recentComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">#{complaint.id} - <T>{complaint.type}</T></p>
                  <p className="text-xs text-gray-500 mt-1"><T>Filed on</T>: {complaint.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    complaint.status === 'Resolved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  <T>{complaint.status}</T>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Helplines */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Phone size={24} />
            <h2 className="text-2xl font-bold"><T>Emergency Helplines</T></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {helplines.map((helpline, idx) => (
              <div key={idx} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <p className="font-bold text-lg mb-1"><T>{helpline.name}</T></p>
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
