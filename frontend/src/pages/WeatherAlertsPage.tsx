import { useNavigate } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, Cloud, Wind, Droplets, Bell } from 'lucide-react'

export default function WeatherAlertsPage() {
  const navigate = useNavigate()

  const activeAlerts = [
    {
      id: 1,
      type: 'warning',
      severity: 'High',
      severityHi: 'उच्च',
      title: 'Heavy Rainfall Warning',
      titleHi: 'भारी वर्षा चेतावनी',
      description: 'Heavy to very heavy rainfall expected in next 24-48 hours',
      descriptionHi: 'अगले 24-48 घंटों में भारी से अत्यधिक भारी वर्षा की संभावना',
      validFrom: '15 Jan 2024, 6:00 AM',
      validUntil: '17 Jan 2024, 6:00 AM',
      affectedAreas: ['Delhi', 'Haryana', 'Western UP'],
      affectedAreasHi: ['दिल्ली', 'हरियाणा', 'पश्चिमी यूपी'],
      actions: [
        'Postpone harvesting activities',
        'Ensure proper drainage in fields',
        'Protect stored crops from water',
        'Keep livestock in safe shelter'
      ],
      actionsHi: [
        'कटाई गतिविधियों को स्थगित करें',
        'खेतों में उचित जल निकासी सुनिश्चित करें',
        'संग्रहीत फसलों को पानी से बचाएं',
        'पशुधन को सुरक्षित आश्रय में रखें'
      ],
      icon: Droplets,
      color: 'red'
    },
    {
      id: 2,
      type: 'advisory',
      severity: 'Medium',
      severityHi: 'मध्यम',
      title: 'Strong Wind Advisory',
      titleHi: 'तेज हवा सलाह',
      description: 'Wind speed may reach 40-50 km/h with gusts up to 60 km/h',
      descriptionHi: 'हवा की गति 40-50 किमी/घंटा तक पहुंच सकती है, झोंके 60 किमी/घंटा तक',
      validFrom: '16 Jan 2024, 12:00 PM',
      validUntil: '16 Jan 2024, 8:00 PM',
      affectedAreas: ['Delhi NCR', 'Gurgaon', 'Noida'],
      affectedAreasHi: ['दिल्ली एनसीआर', 'गुड़गांव', 'नोएडा'],
      actions: [
        'Secure loose items in farm',
        'Protect young plants',
        'Avoid spraying pesticides',
        'Check irrigation systems'
      ],
      actionsHi: [
        'खेत में ढीली वस्तुओं को सुरक्षित करें',
        'युवा पौधों की रक्षा करें',
        'कीटनाशकों का छिड़काव न करें',
        'सिंचाई प्रणाली की जांच करें'
      ],
      icon: Wind,
      color: 'yellow'
    },
    {
      id: 3,
      type: 'watch',
      severity: 'Low',
      severityHi: 'कम',
      title: 'Fog Watch',
      titleHi: 'कोहरा निगरानी',
      description: 'Dense fog likely during morning hours, visibility may drop below 50 meters',
      descriptionHi: 'सुबह के समय घना कोहरा संभव, दृश्यता 50 मीटर से कम हो सकती है',
      validFrom: '17 Jan 2024, 5:00 AM',
      validUntil: '17 Jan 2024, 10:00 AM',
      affectedAreas: ['Punjab', 'Haryana', 'Delhi'],
      affectedAreasHi: ['पंजाब', 'हरियाणा', 'दिल्ली'],
      actions: [
        'Delay morning farm activities',
        'Drive carefully if transporting goods',
        'Keep emergency contacts handy',
        'Monitor weather updates'
      ],
      actionsHi: [
        'सुबह की खेती गतिविधियों में देरी करें',
        'माल परिवहन करते समय सावधानी से गाड़ी चलाएं',
        'आपातकालीन संपर्क तैयार रखें',
        'मौसम अपडेट की निगरानी करें'
      ],
      icon: Cloud,
      color: 'gray'
    }
  ]

  const pastAlerts = [
    {
      id: 4,
      title: 'Heatwave Warning',
      titleHi: 'लू चेतावनी',
      date: '10 Jan 2024',
      severity: 'High',
      severityHi: 'उच्च'
    },
    {
      id: 5,
      title: 'Thunderstorm Alert',
      titleHi: 'आंधी-तूफान अलर्ट',
      date: '05 Jan 2024',
      severity: 'Medium',
      severityHi: 'मध्यम'
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
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle size={32} />
                <div>
                  <h1 className="text-xl font-bold">मौसम चेतावनी</h1>
                  <p className="text-sm opacity-90">Weather Alerts</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="text-yellow-600" size={24} />
              <h2 className="text-xl font-bold text-gray-900">Alert Notifications / अलर्ट सूचनाएं</h2>
            </div>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              Manage Settings / सेटिंग्स प्रबंधित करें
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg border-2 ${notifications.sms ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}>
              <p className="font-semibold text-gray-900">SMS</p>
              <p className="text-sm text-gray-600">{notifications.sms ? 'Enabled / सक्षम' : 'Disabled / अक्षम'}</p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${notifications.whatsapp ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}>
              <p className="font-semibold text-gray-900">WhatsApp</p>
              <p className="text-sm text-gray-600">{notifications.whatsapp ? 'Enabled / सक्षम' : 'Disabled / अक्षम'}</p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${notifications.app ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}>
              <p className="font-semibold text-gray-900">App Push</p>
              <p className="text-sm text-gray-600">{notifications.app ? 'Enabled / सक्षम' : 'Disabled / अक्षम'}</p>
            </div>
            <div className={`p-4 rounded-lg border-2 ${notifications.enabled ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}>
              <p className="font-semibold text-gray-900">All Alerts</p>
              <p className="text-sm text-gray-600">{notifications.enabled ? 'Enabled / सक्षम' : 'Disabled / अक्षम'}</p>
            </div>
          </div>
        </div>

        {/* Active Alerts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Alerts / सक्रिय अलर्ट</h2>
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
                          <h3 className="text-xl font-bold text-gray-900">{alert.titleHi}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              alert.color === 'red'
                                ? 'bg-red-100 text-red-800'
                                : alert.color === 'yellow'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {alert.severityHi} Severity
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{alert.title}</p>
                        <p className="text-gray-700 mb-2">{alert.descriptionHi}</p>
                        <p className="text-sm text-gray-600">{alert.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Valid From / से मान्य</p>
                      <p className="text-sm text-gray-900">{alert.validFrom}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Valid Until / तक मान्य</p>
                      <p className="text-sm text-gray-900">{alert.validUntil}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Affected Areas / प्रभावित क्षेत्र</p>
                    <div className="flex flex-wrap gap-2">
                      {alert.affectedAreasHi.map((area, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Recommended Actions / अनुशंसित कार्रवाई</p>
                    <ul className="space-y-2">
                      {alert.actionsHi.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          <div>
                            <p className="text-sm text-gray-900">{action}</p>
                            <p className="text-xs text-gray-600">{alert.actions[idx]}</p>
                          </div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Alerts / पिछले अलर्ट</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-3">
              {pastAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{alert.titleHi}</p>
                    <p className="text-sm text-gray-600">{alert.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
                  </div>
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {alert.severityHi}
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
