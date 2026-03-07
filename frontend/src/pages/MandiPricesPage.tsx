import DashboardPage from './DashboardPage'
import { TrendingUp, MapPin, Calendar } from 'lucide-react'

export default function MandiPricesPage() {
  const mockPrices = [
    { crop: 'Wheat', cropHi: 'गेहूं', price: '₹2,100', mandi: 'Azadpur', change: '+5%', trend: 'up' },
    { crop: 'Rice', cropHi: 'चावल', price: '₹3,200', mandi: 'Narela', change: '+2%', trend: 'up' },
    { crop: 'Potato', cropHi: 'आलू', price: '₹1,800', mandi: 'Ghazipur', change: '-3%', trend: 'down' },
    { crop: 'Onion', cropHi: 'प्याज', price: '₹2,500', mandi: 'Azadpur', change: '+8%', trend: 'up' },
    { crop: 'Tomato', cropHi: 'टमाटर', price: '₹1,200', mandi: 'Okhla', change: '-5%', trend: 'down' },
  ]

  return (
    <DashboardPage
      title="Mandi Prices"
      titleHi="मंडी भाव"
      description="Real-time crop prices from mandis across India. Updated daily."
      icon="📊"
      color="bg-green-600"
    >
      <div className="grid gap-4">
        {mockPrices.map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{item.cropHi} / {item.crop}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{item.mandi} Mandi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>Today</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{item.price}</p>
                <p className="text-sm text-gray-600">per quintal</p>
                <div className={`flex items-center gap-1 mt-2 ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp size={16} className={item.trend === 'down' ? 'rotate-180' : ''} />
                  <span className="font-semibold">{item.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  )
}
