import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, Cloud, Wind, Droplets, Bell } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function WeatherAlertsPage() {
  const navigate = useNavigate()

  const activeAlerts = [
    {
      id: 1,
      type: 'warning',
      severity: 'High',
      title: 'Heavy Rainfall Warning',
      description: 'Heavy to very heavy rainfall expected in next 24-48 hours',
      validFrom: '15 Jan 2024, 6:00 AM',
      validUntil: '17 Jan 2024, 6:00 AM',
      affectedAreas: ['Delhi', 'Haryana', 'Western UP'],
      actions: [
        'Postpone harvesting activities',
        'Ensure proper drainage in fields',
        'Protect stored crops from water',
        'Keep livestock in safe shelter'
      ],
      icon: Droplets,
      color: 'red'
    },
    {
      id: 2,
      type: 'advisory',
      severity: 'Medium',
      title: 'Strong Wind Advisory',
      description: 'Wind speed may reach 40-50 km/h with gusts up to 60 km/h',
      validFrom: '16 Jan 2024, 12:00 PM',
      validUntil: '16 Jan 2024, 8:00 PM',
      affectedAreas: ['Delhi NCR', 'Gurgaon', 'Noida'],
      actions: [
        'Secure loose items in farm',
        'Protect young plants',
        'Avoid spraying pesticides',
        'Check irrigation systems'
      ],
      icon: Wind,
      color: 'yellow'
    },
    {
      id: 3,
      type: 'watch',
      severity: 'Low',
      title: 'Fog Watch',
      description: 'Dense fog likely during morning hours, visibility may drop below 50 meters',
      validFrom: '17 Jan 2024, 5:00 AM',
      validUntil: '17 Jan 2024, 10:00 AM',
      affectedAreas: ['Punjab', 'Haryana', 'Delhi'],
      actions: [
        'Delay morning farm activities',
        'Drive carefully if transporting goods',
        'Keep emergency contacts handy',
        'Monitor weather updates'
      ],
      icon: Cloud,
      color: 'gray'
    }
  ]

  const pastAlerts = [
    {
      id: 4,
      title: 'Heatwave Warning',
      date: '10 Jan 2024',
      severity: 'High'
    },
    {
      id: 5,
      title: 'Thunderstorm Alert',
      date: '05 Jan 2024',
      severity: 'Medium'
    }
  ]

  const notifications = {
    enabled: true,
    sms: true,
    whatsapp: true,
    app: true
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-yellow-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <AlertTriangle size={32} />
                <div>
                  <h1 className="text-xl font-bold"><T>Weather Alerts</T></h1>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="text-yellow-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900"><T>Alert Notifications</T></h2>
            </div>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              <T>Manage Settings</T>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg border-2 ${notifications.sms ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}>
              <p className="font-semibold text-gray-900">SMS</p>
              <p className="text-sm text-gray-600"><T>{notifications.sms ? 'Enabled' : 'Disabled'}</T></p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${notifications.whatsapp ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}>
              <p className="font-semibold text-gray-900">WhatsApp</p>
              <p className="text-sm text-gray-600"><T>{notifications.whatsapp ? 'Enabled' : 'Disabled'}</T></p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${notifications.app ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}>
              <p className="font-semibold text-gray-900">App Push</p>
              <p className="text-sm text-gray-600"><T>{notifications.app ? 'Enabled' : 'Disabled'}</T></p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${notifications.enabled ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}>
              <p className="font-semibold text-gray-900"><T>All Alerts</T></p>
              <p className="text-sm text-gray-600"><T>{notifications.enabled ? 'Enabled' : 'Disabled'}</T></p>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4"><T>Active Alerts</T></h2>
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                  alert.color === 'red'
                    ? 'border-red-600'
                    : alert.color === 'yellow'
                    ? 'border-yellow-600'
                    : 'border-gray-600'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-3 rounded-lg ${
                          alert.color === 'red'
                            ? 'bg-red-100'
                            : alert.color === 'yellow'
                            ? 'bg-yellow-100'
                            : 'bg-gray-100'
                        }`}
                      >
                        <alert.icon
                          className={
                            alert.color === 'red'
                              ? 'text-red-600'
                              : alert.color === 'yellow'
                              ? 'text-yellow-600'
                              : 'text-gray-600'
                          }
                          size={32}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900"><T>{alert.title}</T></h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              alert.color === 'red'
                                ? 'bg-red-100 text-red-800'
                                : alert.color === 'yellow'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <T>{alert.severity}</T> <T>Severity</T>
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2"><T>{alert.description}</T></p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1"><T>Valid From</T></p>
                      <p className="text-sm text-gray-900">{alert.validFrom}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1"><T>Valid Until</T></p>
                      <p className="text-sm text-gray-900">{alert.validUntil}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2"><T>Affected Areas</T></p>
                    <div className="flex flex-wrap gap-2">
                      {alert.affectedAreas.map((area, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          <T>{area}</T>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2"><T>Recommended Actions</T></p>
                    <ul className="space-y-2">
                      {alert.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          <p className="text-sm text-gray-900"><T>{action}</T></p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Alerts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4"><T>Past Alerts</T></h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-3">
              {pastAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900"><T>{alert.title}</T></p>
                    <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
                  </div>
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                    <T>{alert.severity}</T>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
