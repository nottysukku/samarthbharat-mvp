import { useState, useEffect } from 'react'
import DashboardPage from './DashboardPage'
import { TrendingUp, MapPin, Calendar, Search } from 'lucide-react'
import axios from 'axios'
import T from '../components/T'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function MandiPricesPage() {
  const [prices, setPrices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchCrop, setSearchCrop] = useState('')
  const [searchLocation, setSearchLocation] = useState('')

  useEffect(() => {
    fetchPrices()
  }, [])

  const fetchPrices = async (crop?: string, location?: string) => {
    setLoading(true)
    try {
      const params: any = {}
      if (crop) params.crop = crop
      if (location) params.location = location
      const response = await axios.get(`${API}/api/mandi/prices`, { params })
      setPrices(response.data.prices || [])
    } catch (err) {
      console.error('Mandi prices fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchPrices(searchCrop, searchLocation)
  }

  return (
    <DashboardPage
      title="Mandi Prices"
      description="Real-time crop prices from mandis across India. Updated daily."
      icon="📊"
      color="bg-green-600"
    >
      {/* Search Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={searchCrop}
            onChange={(e) => setSearchCrop(e.target.value)}
            placeholder="Search by crop (e.g. Wheat, Rice)..."
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="Search by location..."
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <Search size={18} />
            <span><T>Search</T></span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600"><T>Loading prices...</T></p>
        </div>
      ) : (
      <div className="grid gap-4">
        {prices.map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900"><T>{item.crop}</T></h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{item.market || item.mandi} <T>Mandi</T></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{item.date || 'Today'}</span>
                  </div>
                  {item.state && <span className="text-gray-500">({item.state})</span>}
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">₹{item.modalPrice || item.price}</p>
                <p className="text-sm text-gray-600"><T>per quintal</T></p>
                {item.minPrice && item.maxPrice && (
                  <p className="text-xs text-gray-500 mt-1">₹{item.minPrice} - ₹{item.maxPrice}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {prices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500"><T>No prices found. Try different search criteria.</T></p>
          </div>
        )}
      </div>
      )}
    </DashboardPage>
  )
}
