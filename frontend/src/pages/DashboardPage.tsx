import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

interface DashboardPageProps {
  title: string
  description: string
  icon: string
  color: string
  children: React.ReactNode
  backPath?: string
}

function getParentDashboard(pathname: string): string {
  const farmerPages = ['/mandi-prices', '/weather', '/crop-diagnosis', '/schemes/farmer', '/soil-health', '/legal-rights', '/market-linkage', '/training', '/nearby-services', '/weather-alerts']
  const studentPages = ['/scholarships', '/study-roadmap', '/exam-resources', '/schemes/student', '/career-guidance', '/job-search', '/video-lectures', '/exam-calendar', '/skill-development', '/mentorship', '/college-finder', '/emergency-helpline']
  const startupPages = ['/funding-schemes', '/compliance-guide', '/business-registration', '/market-research', '/incubators', '/mentorship-network', '/business-resources', '/networking-events', '/pitch-deck', '/legal-support', '/hiring-resources']
  
  if (farmerPages.includes(pathname)) return '/dashboard/farmer'
  if (studentPages.includes(pathname)) return '/dashboard/student'
  if (startupPages.includes(pathname)) return '/dashboard/startup'
  return '/'
}

export default function DashboardPage({ title, description, icon, color, children, backPath }: DashboardPageProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    const target = backPath || getParentDashboard(location.pathname)
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate(target)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      <div className="gov-header"></div>

      {/* Header */}
      <header className={`${color} text-white shadow-lg border-b-4 border-orange-500`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-medium hidden sm:inline"><T>Back</T></span>
              </button>
              <button
                onClick={() => navigate('/')}
                className="hover:bg-white/20 p-2 rounded transition-colors"
                title="Home"
              >
                <Home size={18} />
              </button>
            </div>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl">{icon}</span>
                <div>
                  <h1 className="text-xl font-bold"><T>{title}</T></h1>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 animate-slide-up">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-orange-500">
          <p className="text-gray-600"><T>{description}</T></p>
        </div>

        {children}
      </main>
    </div>
  )
}
