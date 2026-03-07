import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface DashboardPageProps {
  title: string
  titleHi: string
  description: string
  icon: string
  color: string
  children: React.ReactNode
}

export default function DashboardPage({ title, titleHi, description, icon, color, children }: DashboardPageProps) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      {/* Header */}
      <header className={`${color} text-white shadow-lg border-b-4 border-orange-500`}>
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
                <span className="text-3xl">{icon}</span>
                <div>
                  <h1 className="text-xl font-bold">{titleHi}</h1>
                  <p className="text-sm opacity-90">{title}</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-orange-500">
          <p className="text-gray-600">{description}</p>
        </div>

        {children}
      </main>
    </div>
  )
}
