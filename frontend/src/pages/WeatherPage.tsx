import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle } from 'lucide-react'

export default function WeatherPage() {
  const navigate = useNavigate()

  const currentWeather = {
    temp: 28,
    condition: 'Partly Cloudy',
    conditionHi: 'आंशिक रूप से बादल',
    humidity: 65,
    windSpeed: 12,
    rainfall: 20,
    location: 'Delhi',
    locationHi: 'दिल्ली'
  }

  const forecast = [
    { day: 'Mon', dayHi: 'सोम', temp: 29, condition: 'Sunny', icon: Sun, rain: 10 },
    { day: 'Tue', dayHi: 'मंगल', temp: 27, condition: 'Cloudy', icon: Cloud, rain: 30 },
    { day: 'Wed', dayHi: 'बुध', temp: 26, condition: 'Rainy', icon: CloudRain, rain: 80 },
    { day: 'Thu', dayHi: 'गुरु', temp: 25, condition: 'Rainy', icon: CloudRain, rain: 70 },
    { day: 'Fri', dayHi: 'शुक्र', temp: 27, condition: 'Cloudy', icon: Cloud, rain: 40 },
    { day: 'Sat', dayHi: 'शनि', temp: 28, condition: 'Sunny', icon: Sun, rain: 15 },
    { day: 'Sun', dayHi: 'रवि', temp: 30, condition: 'Sunny', icon: Sun, rain: 5 },
  ]

  const advisories = [
    {
      title: 'Irrigation Advisory',
      titleHi: 'सिंचाई सलाह',
      message: 'Light rain expected. Reduce irrigation for next 2 days.',
      messageHi: 'हल्की बारिश की उम्मीद। अगले 2 दिनों के लिए सिंचाई कम करें।',
      type: 'info'
    },
    {
      title: 'Pest Alert',
      titleHi: 'कीट चेतावनी',
      message: 'High humidity may increase pest activity. Monitor crops closely.',
      messageHi: 'उच्च आर्द्रता से कीट गतिविधि बढ़ सकती है। फसलों की बारीकी से निगरानी करें।',
      type: 'warning'
    },
    {
      title: 'Harvesting Suggestion',
      titleHi: 'कटाई सुझाव',
      message: 'Good weather for harvesting on Monday and Tuesday.',
      messageHi: 'सोमवार और मंगलवार को कटाई के लिए अच्छा मौसम।',
      type: 'success'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-cyan-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <Cloud size={32} />
                <div>
                  <h1 className="text-xl font-bold">मौसम पूर्वानुमान</h1>
                  <p className="text-sm opacity-90">Weather Forecast</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Current Weather */}
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{currentWeather.location} / {currentWeather.locationHi}</h2>
              <p className="text-xl opacity-90">{currentWeather.condition} / {currentWeather.conditionHi}</p>
            </div>
            <div className="text-right">
              <p className="text-6xl font-bold">{currentWeather.temp}°C</p>
              <Cloud size={64} className="ml-auto mt-2" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/30">
            <div className="flex items-center gap-2">
              <Droplets size={24} />
              <div>
                <p className="text-sm opacity-75">Humidity</p>
                <p className="text-lg font-semibold">{currentWeather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind size={24} />
              <div>
                <p className="text-sm opacity-75">Wind Speed</p>
                <p className="text-lg font-semibold">{currentWeather.windSpeed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain size={24} />
              <div>
                <p className="text-sm opacity-75">Rain Chance</p>
                <p className="text-lg font-semibold">{currentWeather.rainfall}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">7-Day Forecast / 7-दिन का पूर्वानुमान</h3>
          <div className="grid grid-cols-7 gap-4">
            {forecast.map((day, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
                <p className="font-semibold text-gray-900 mb-1">{day.dayHi}</p>
                <p className="text-xs text-gray-600 mb-3">{day.day}</p>
                <day.icon className="mx-auto mb-3 text-cyan-600" size={32} />
                <p className="text-2xl font-bold text-gray-900 mb-2">{day.temp}°</p>
                <div className="flex items-center justify-center gap-1 text-xs text-blue-600">
                  <CloudRain size={14} />
                  <span>{day.rain}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agricultural Advisories */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Agricultural Advisories / कृषि सलाह</h3>
          <div className="space-y-4">
            {advisories.map((advisory, idx) => (
              <div
                key={idx}
                className={`border-l-4 p-4 rounded-r-lg ${
                  advisory.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-500'
                    : advisory.type === 'success'
                    ? 'bg-green-50 border-green-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  {advisory.type === 'warning' && <AlertTriangle className="text-yellow-600 flex-shrink-0" size={24} />}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{advisory.titleHi} / {advisory.title}</h4>
                    <p className="text-gray-700 mb-1">{advisory.messageHi}</p>
                    <p className="text-sm text-gray-600">{advisory.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
