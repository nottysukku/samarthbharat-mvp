import { useState } from 'react'
import DashboardPage from './DashboardPage'
import { Calendar, DollarSign, Users, Search, Loader2, Sparkles } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const defaultScholarships = [
  {
    name: 'National Scholarship Portal',
    nameHi: 'राष्ट्रीय छात्रवृत्ति पोर्टल',
    amount: '₹50,000/year',
    deadline: '30 days left',
    eligibility: 'Class 11-12, Income < ₹8 lakh',
    category: 'Merit-based'
  },
  {
    name: 'PM Scholarship Scheme',
    nameHi: 'पीएम छात्रवृत्ति योजना',
    amount: '₹25,000/year',
    deadline: '45 days left',
    eligibility: 'Ex-servicemen children',
    category: 'Government'
  },
  {
    name: 'Post Matric Scholarship',
    nameHi: 'पोस्ट मैट्रिक छात्रवृत्ति',
    amount: '₹35,000/year',
    deadline: '20 days left',
    eligibility: 'SC/ST/OBC students',
    category: 'Social Welfare'
  },
]

export default function ScholarshipFinderPage() {
  const [scholarships] = useState(defaultScholarships)
  const [aiResponse, setAiResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const askAI = async () => {
    if (!searchQuery.trim()) return
    setLoading(true)
    setAiResponse('')
    try {
      const res = await fetch(`${API}/api/ai/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: searchQuery,
          context: 'You are an expert on Indian government scholarships. Help find scholarships matching the user query. Provide specific names, amounts, deadlines, eligibility, and application portals.',
          userType: 'student',
        }),
      })
      const data = await res.json()
      setAiResponse(data.response || data.error || 'No results found')
    } catch {
      setAiResponse('Could not reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardPage
      title="Scholarship Finder"
      description="Find scholarships with deadlines, eligibility criteria, and application links."
      icon="🎓"
      color="bg-yellow-600"
    >
      {/* AI Scholarship Search */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-md p-6 mb-6 border-l-4 border-yellow-600">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-yellow-600" size={24} />
          <h3 className="text-lg font-bold text-gray-900">AI Scholarship Search / AI छात्रवृत्ति खोज</h3>
        </div>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && askAI()}
            placeholder="e.g. Scholarships for SC student in UP doing B.Tech..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          />
          <button
            onClick={askAI}
            disabled={loading}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {aiResponse && (
          <div className="bg-white rounded-lg p-4 border border-yellow-200 whitespace-pre-wrap text-sm text-gray-800 max-h-96 overflow-y-auto">
            {aiResponse}
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {scholarships.map((scholarship, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-600 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{scholarship.nameHi}</h3>
                <p className="text-sm text-gray-600">{scholarship.name}</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                {scholarship.category}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign size={20} className="text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Amount</p>
                  <p className="font-semibold text-gray-900">{scholarship.amount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-red-600" />
                <div>
                  <p className="text-xs text-gray-600">Deadline</p>
                  <p className="font-semibold text-gray-900">{scholarship.deadline}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Eligibility</p>
                  <p className="font-semibold text-gray-900 text-sm">{scholarship.eligibility}</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition-colors font-semibold">
              Apply Now / अभी आवेदन करें
            </button>
          </div>
        ))}
      </div>
    </DashboardPage>
  )
}
