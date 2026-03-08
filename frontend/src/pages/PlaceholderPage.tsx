import DashboardPage from './DashboardPage'
import { AlertCircle } from 'lucide-react'
import T from '../components/T'

interface PlaceholderPageProps {
  title: string
  description: string
  icon: string
  color: string
  features?: string[]
}

export default function PlaceholderPage({ title, description, icon, color, features = [] }: PlaceholderPageProps) {
  return (
    <DashboardPage
      title={title}
      description={description}
      icon={icon}
      color={color}
    >
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2"><T>Coming Soon</T></h3>
            <p className="text-gray-700 mb-4">
              <T>This feature is under development and will be available soon. We are working hard to bring you the best experience.</T>
            </p>
          </div>
        </div>
      </div>

      {features.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4"><T>Planned Features</T></h3>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700"><T>{feature}</T></span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DashboardPage>
  )
}
