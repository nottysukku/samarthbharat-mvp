import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle, MapPin, Search } from 'lucide-react'
import axios from 'axios'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function WeatherPage() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('Delhi')
  const [searchInput, setSearchInput] = useState('')
  const [currentWeather, setCurrentWeather] = useState<any>(null)
  const [forecast, setForecast] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWeather(location)
  }, [])

  const fetchWeather = async (loc: string) => {
    setLoading(true)
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${API}/api/weather/current`, { params: { location: loc } }),
        axios.get(`${API}/api/weather/forecast`, { params: { location: loc, days: 7 } }),
      ])
      setCurrentWeather(currentRes.data)
      setForecast(forecastRes.data.forecast || [])
      setLocation(currentRes.data.location || loc)
    } catch (err) {
      console.error('Weather fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim())
      setSearchInput('')
    }
  }

  const getWeatherIcon = (condition: string) => {
    const lower = condition?.toLowerCase() || ''
    if (lower.includes('rain') || lower.includes('drizzle')) return CloudRain
    if (lower.includes('cloud') || lower.includes('overcast')) return Cloud
    return Sun
  }

  const advisories = forecast.slice(0, 3).map((day, i) => ({
    title: i === 0 ? 'Today\'s Advisory' : `${day.date} Advisory`,
    message: day.advisory || 'Good farming conditions.',
    type: day.rainfall?.probability > 60 ? 'warning' : day.rainfall?.probability > 30 ? 'info' : 'success',
  }))

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      <div className="gov-header"></div>

      <header className="bg-cyan-600 text-white shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.length > 2 ? navigate(-1) : navigate('/dashboard/farmer')}
              className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium"><T>Back</T></span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <Cloud size={32} />
                <div>
                  <h1 className="text-xl font-bold"><T>Weather Forecast</T></h1>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Location Search */}
        <div className="mb-6 flex gap-2 max-w-md mx-auto">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter city or pincode..."
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <button onClick={handleSearch} className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
            <Search size={20} />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600"><T>Loading weather data...</T></p>
          </div>
        ) : (
        <>
        {/* Current Weather */}
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2"><T>{currentWeather?.location || location}</T></h2>
              <p className="text-xl opacity-90 capitalize"><T>{currentWeather?.condition || 'Loading...'}</T></p>
            </div>
            <div className="text-right">
              <p className="text-6xl font-bold">{currentWeather?.temp || '--'}°C</p>
              <Cloud size={64} className="ml-auto mt-2" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/30">
            <div className="flex items-center gap-2">
              <Droplets size={24} />
              <div>
                <p className="text-sm opacity-75"><T>Humidity</T></p>
                <p className="text-lg font-semibold">{currentWeather?.humidity || '--'}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind size={24} />
              <div>
                <p className="text-sm opacity-75"><T>Wind Speed</T></p>
                <p className="text-lg font-semibold">{currentWeather?.windSpeed || '--'} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain size={24} />
              <div>
                <p className="text-sm opacity-75"><T>Rain Chance</T></p>
                <p className="text-lg font-semibold">{forecast[0]?.rainfall?.probability || 0}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6"><T>7-Day Forecast</T></h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {forecast.slice(0, 7).map((day, idx) => {
              const DayIcon = getWeatherIcon(day.condition)
              const dayName = new Date(day.date).toLocaleDateString('en-IN', { weekday: 'short' })
              return (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors">
                  <p className="font-semibold text-gray-900 mb-1">{dayName}</p>
                  <DayIcon className="mx-auto mb-3 text-cyan-600" size={32} />
                  <p className="text-2xl font-bold text-gray-900 mb-1">{day.temperature?.max || '--'}°</p>
                  <p className="text-sm text-gray-500">{day.temperature?.min || '--'}°</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-blue-600 mt-2">
                    <CloudRain size={14} />
                    <span>{day.rainfall?.probability || 0}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Agricultural Advisories */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6"><T>Agricultural Advisories</T></h3>
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
                    <h4 className="font-bold text-gray-900 mb-1"><T>{advisory.title}</T></h4>
                    <p className="text-gray-700"><T>{advisory.message}</T></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
        )}
      </main>
    </div>
  )
}
