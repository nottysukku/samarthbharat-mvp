import DashboardPage from './DashboardPage'
import { AlertCircle } from 'lucide-react'

interface PlaceholderPageProps {
  title: string
  titleHi: string
  description: string
  icon: string
  color: string
  features?: string[]
}

export default function PlaceholderPage({ title, titleHi, description, icon, color, features = [] }: PlaceholderPageProps) {
  return (
    <DashboardPage
      title={title}
      titleHi={titleHi}
      description={description}
      icon={icon}
      color={color}
    >
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Coming Soon / जल्द आ रहा है</h3>
            <p className="text-gray-700 mb-4">
              This feature is under development and will be available soon. We are working hard to bring you the best experience.
            </p>
            <p className="text-gray-700">
              यह सुविधा विकास के अधीन है और जल्द ही उपलब्ध होगी। हम आपको सर्वोत्तम अनुभव प्रदान करने के लिए कड़ी मेहनत कर रहे हैं।
            </p>
          </div>
        </div>
      </div>

      {features.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Planned Features / नियोजित सुविधाएं</h3>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DashboardPage>
  )
}
