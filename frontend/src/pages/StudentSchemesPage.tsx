import { useState } from 'react'
import DashboardPage from './DashboardPage'
import { DollarSign, Calendar, FileText, ExternalLink, Sparkles, Loader2, GraduationCap } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function StudentSchemesPage() {
  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  const schemes = [
    {
      name: 'PM Vidyalaxmi Scheme',
      nameHi: 'पीएम विद्यालक्ष्मी योजना',
      amount: 'Up to ₹10,00,000',
      description: 'Education loan with interest subsidy for students from economically weaker sections',
      eligibility: 'Students from families with income < ₹8 LPA',
      deadline: 'Ongoing',
      portal: 'vidyalakshmi.co.in',
      category: 'Education Loan',
    },
    {
      name: 'Post Matric Scholarship (SC/ST/OBC)',
      nameHi: 'पोस्ट मैट्रिक छात्रवृत्ति',
      amount: 'Up to ₹1,20,000/year',
      description: 'Scholarship covering tuition, maintenance, and non-refundable fees',
      eligibility: 'SC/ST/OBC students, family income < ₹2.5 LPA',
      deadline: 'October 31 (varies by state)',
      portal: 'scholarships.gov.in',
      category: 'Scholarship',
    },
    {
      name: 'Central Sector Scheme (CSSS)',
      nameHi: 'केंद्रीय क्षेत्र योजना',
      amount: '₹10,000 - ₹20,000/year',
      description: 'Merit-based scholarship for students scoring above 80th percentile in Class 12',
      eligibility: 'Top 20% of Class 12 boards, family income < ₹8 LPA',
      deadline: 'October 31',
      portal: 'scholarships.gov.in',
      category: 'Merit Scholarship',
    },
    {
      name: 'INSPIRE Scholarship (DST)',
      nameHi: 'इंस्पायर छात्रवृत्ति',
      amount: '₹80,000/year for 5 years',
      description: 'For top 1% in Class 12 pursuing BSc/BS/integrated MS in natural & basic sciences',
      eligibility: 'Top 1% in Class 12 boards in science stream',
      deadline: 'September 30',
      portal: 'online-inspire.gov.in',
      category: 'Science',
    },
    {
      name: 'Pragati Scholarship (AICTE)',
      nameHi: 'प्रगति छात्रवृत्ति',
      amount: '₹50,000/year',
      description: 'For girl students in AICTE-approved technical degree/diploma programs',
      eligibility: 'Girl students, family income < ₹8 LPA',
      deadline: 'December 31',
      portal: 'aicte-pragati-saksham-gov.in',
      category: 'Girls in Tech',
    },
    {
      name: 'National Means-cum-Merit Scholarship',
      nameHi: 'राष्ट्रीय साधन-सह-मेधा छात्रवृत्ति',
      amount: '₹12,000/year (Class 9-12)',
      description: 'For economically weaker section students who scored well in Class 8 exam',
      eligibility: 'Cleared NMMS exam, family income < ₹3.5 LPA',
      deadline: 'September 30',
      portal: 'scholarships.gov.in',
      category: 'School Level',
    },
  ]

  const askAI = async () => {
    setAiLoading(true)
    setAiResponse('')
    try {
      const res = await fetch(`${API}/api/ai/scholarships`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          educationLevel: 'undergraduate',
          fieldOfStudy: 'general',
          category: 'all',
          income: 'below 8 LPA',
        }),
      })
      const data = await res.json()
      setAiResponse(data.response || 'Could not fetch scholarships.')
    } catch {
      setAiResponse('Could not reach the server.')
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <DashboardPage
      title="Student Schemes & Scholarships"
      description="Government scholarships and education schemes / छात्रों के लिए सरकारी छात्रवृत्ति"
      icon="🎓"
      color="bg-blue-600"
    >
      {/* AI Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 mb-6 border-l-4 border-blue-600">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-blue-600" size={24} />
          <h3 className="text-lg font-bold text-gray-900">AI Scholarship Finder / AI छात्रवृत्ति खोजक</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">Ask AI to find scholarships matching your profile</p>
        <button
          onClick={askAI}
          disabled={aiLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          {aiLoading ? <Loader2 size={18} className="animate-spin" /> : <GraduationCap size={18} />}
          {aiLoading ? 'Finding scholarships...' : 'Find Scholarships with AI'}
        </button>
        {aiResponse && (
          <div className="mt-4 bg-white rounded-lg p-4 border border-blue-200 whitespace-pre-wrap text-sm text-gray-800 max-h-96 overflow-y-auto">
            {aiResponse}
          </div>
        )}
      </div>

      {/* Scheme Cards */}
      <div className="grid gap-6">
        {schemes.map((scheme, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{scheme.nameHi}</h3>
                <p className="text-sm text-gray-600">{scheme.name}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
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
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
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
