import DashboardPage from './DashboardPage'
import { DollarSign, FileText, TrendingUp, Building } from 'lucide-react'

export default function FundingSchemesPage() {
  const schemes = [
    {
      name: 'MUDRA Loan',
      nameHi: 'मुद्रा ऋण',
      amount: 'Up to ₹10 lakh',
      interest: '8-12% p.a.',
      type: 'Collateral-free',
      description: 'For micro and small businesses',
      descriptionHi: 'सूक्ष्म और लघु व्यवसायों के लिए'
    },
    {
      name: 'Startup India Seed Fund',
      nameHi: 'स्टार्टअप इंडिया सीड फंड',
      amount: 'Up to ₹50 lakh',
      interest: 'Grant/Equity',
      type: 'Government',
      description: 'For early-stage startups',
      descriptionHi: 'प्रारंभिक चरण के स्टार्टअप के लिए'
    },
    {
      name: 'MSME Credit Guarantee',
      nameHi: 'एमएसएमई क्रेडिट गारंटी',
      amount: 'Up to ₹2 crore',
      interest: '9-14% p.a.',
      type: 'Guaranteed',
      description: 'For manufacturing & services',
      descriptionHi: 'विनिर्माण और सेवाओं के लिए'
    },
  ]

  return (
    <DashboardPage
      title="Funding Schemes"
      description="Government funding schemes for startups and businesses. MUDRA, Startup India, MSME loans and more."
      icon="💰"
      color="bg-green-600"
    >
      <div className="grid gap-6">
        {schemes.map((scheme, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{scheme.nameHi}</h3>
                <p className="text-sm text-gray-600">{scheme.name}</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                {scheme.type}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign size={20} className="text-green-600" />
                <div>
                  <p className="text-xs text-gray-600">Loan Amount</p>
                  <p className="font-semibold text-gray-900">{scheme.amount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Interest Rate</p>
                  <p className="font-semibold text-gray-900">{scheme.interest}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building size={20} className="text-purple-600" />
                <div>
                  <p className="text-xs text-gray-600">For</p>
                  <p className="font-semibold text-gray-900 text-sm">{scheme.description}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{scheme.descriptionHi}</p>

            <div className="flex gap-3">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                Apply Now / अभी आवेदन करें
              </button>
              <button className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center justify-center gap-2">
                <FileText size={18} />
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  )
}
