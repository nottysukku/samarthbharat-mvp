import DashboardPage from './DashboardPage'
import { Calendar, DollarSign, Users } from 'lucide-react'

export default function ScholarshipFinderPage() {
  const scholarships = [
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

  return (
    <DashboardPage
      title="Scholarship Finder"
      titleHi="छात्रवृत्ति खोजक"
      description="Find scholarships with deadlines, eligibility criteria, and application links."
      icon="🎓"
      color="bg-yellow-600"
    >
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
