import { useState } from 'react'
import DashboardPage from './DashboardPage'
import { DollarSign, Calendar, FileText, ExternalLink, Sparkles, Loader2 } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function FarmerSchemesPage() {
  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  const schemes = [
    {
      name: 'PM-KISAN',
      nameHi: 'पीएम-किसान सम्मान निधि',
      amount: '₹6,000/year',
      description: 'Direct income support of ₹6,000 per year in 3 installments to farmer families',
      eligibility: 'All farmer families with cultivable land',
      deadline: 'Ongoing — register anytime',
      portal: 'pmkisan.gov.in',
      category: 'Income Support',
    },
    {
      name: 'PM Fasal Bima Yojana',
      nameHi: 'पीएम फसल बीमा योजना',
      amount: 'Up to ₹2,00,000',
      description: 'Crop insurance scheme covering natural calamities, pests, and diseases',
      eligibility: 'All farmers growing notified crops',
      deadline: 'Kharif: July 31, Rabi: Dec 31',
      portal: 'pmfby.gov.in',
      category: 'Insurance',
    },
    {
      name: 'Kisan Credit Card (KCC)',
      nameHi: 'किसान क्रेडिट कार्ड',
      amount: 'Up to ₹3,00,000 @ 4%',
      description: 'Short-term credit for crop production, post-harvest, and allied activities',
      eligibility: 'All farmers, sharecroppers, tenant farmers',
      deadline: 'Ongoing',
      portal: 'Apply at any bank branch',
      category: 'Credit',
    },
    {
      name: 'Soil Health Card Scheme',
      nameHi: 'मृदा स्वास्थ्य कार्ड योजना',
      amount: 'Free soil testing',
      description: 'Provides soil health reports with nutrient-based fertilizer recommendations',
      eligibility: 'All farmers',
      deadline: 'Ongoing',
      portal: 'soilhealth.dac.gov.in',
      category: 'Advisory',
    },
    {
      name: 'PM Krishi Sinchai Yojana',
      nameHi: 'पीएम कृषि सिंचाई योजना',
      amount: 'Up to 55% subsidy on micro-irrigation',
      description: 'Subsidy on drip irrigation, sprinkler systems, and water-saving equipment',
      eligibility: 'All farmers',
      deadline: 'Ongoing',
      portal: 'pmksy.gov.in',
      category: 'Irrigation',
    },
  ]

  const askAI = async () => {
    setAiLoading(true)
    setAiResponse('')
    try {
      const res = await fetch(`${API}/api/ai/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'List all major government schemes available for Indian farmers in 2024-2025 with amounts and eligibility. Include state-specific schemes.',
          context: 'You are an expert on Indian agricultural policy and farmer welfare schemes.',
          userType: 'farmer',
        }),
      })
      const data = await res.json()
      setAiResponse(data.response || 'Could not fetch schemes.')
    } catch {
      setAiResponse('Could not reach the server.')
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <DashboardPage
      title="Farmer Schemes"
      description="Government schemes and subsidies for farmers / किसानों के लिए सरकारी योजनाएं"
      icon="🌾"
      color="bg-green-600"
    >
      {/* AI Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-md p-6 mb-6 border-l-4 border-green-600">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-green-600" size={24} />
          <h3 className="text-lg font-bold text-gray-900">AI Scheme Finder / AI योजना खोजक</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">Ask AI to find specific schemes based on your situation</p>
        <button
          onClick={askAI}
          disabled={aiLoading}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          {aiLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
          {aiLoading ? 'Finding schemes...' : 'Find All Schemes with AI'}
        </button>
        {aiResponse && (
          <div className="mt-4 bg-white rounded-lg p-4 border border-green-200 whitespace-pre-wrap text-sm text-gray-800 max-h-96 overflow-y-auto">
            {aiResponse}
          </div>
        )}
      </div>

      {/* Scheme Cards */}
      <div className="grid gap-6">
        {schemes.map((scheme, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{scheme.nameHi}</h3>
                <p className="text-sm text-gray-600">{scheme.name}</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                {scheme.category}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{scheme.description}</p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="font-semibold text-gray-900 text-sm">{scheme.amount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="font-semibold text-gray-900 text-sm">{scheme.deadline}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Eligibility</p>
                  <p className="font-semibold text-gray-900 text-sm">{scheme.eligibility}</p>
                </div>
              </div>
            </div>
            <a
              href={`https://${scheme.portal}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <ExternalLink size={16} />
              Apply Now / अभी आवेदन करें
            </a>
          </div>
        ))}
      </div>
    </DashboardPage>
  )
}
