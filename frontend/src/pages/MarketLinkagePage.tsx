import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, TrendingUp, MapPin, Phone, Star } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function MarketLinkagePage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('buyers')

  const buyers = [
    {
      id: 1,
      name: 'Reliance Fresh',
      type: 'Retail Chain',
      crops: ['Vegetables', 'Fruits', 'Grains'],
      location: 'Delhi NCR',
      rating: 4.5,
      contact: '+91-9876543210',
      minOrder: '500 kg',
      paymentTerms: '15 days'
    },
    {
      id: 2,
      name: 'BigBasket',
      type: 'Online Platform',
      crops: ['Organic Vegetables', 'Fruits'],
      location: 'Pan India',
      rating: 4.7,
      contact: '+91-9876543211',
      minOrder: '1000 kg',
      paymentTerms: '7 days'
    },
    {
      id: 3,
      name: 'Mother Dairy',
      type: 'Cooperative',
      crops: ['Milk', 'Vegetables', 'Fruits'],
      location: 'Delhi, Haryana, UP',
      rating: 4.8,
      contact: '+91-9876543212',
      minOrder: '200 kg',
      paymentTerms: '10 days'
    }
  ]

  const fpos = [
    {
      id: 1,
      name: 'Delhi Farmers Producer Organization',
      members: 500,
      crops: ['Wheat', 'Rice', 'Vegetables'],
      benefits: ['Bulk selling', 'Better prices', 'Storage facilities'],
      contact: '+91-9876543213'
    },
    {
      id: 2,
      name: 'Haryana Organic FPO',
      members: 300,
      crops: ['Organic Vegetables', 'Organic Grains'],
      benefits: ['Organic certification', 'Premium prices', 'Export opportunities'],
      contact: '+91-9876543214'
    }
  ]

  const contracts = [
    {
      id: 1,
      buyer: 'Reliance Fresh',
      crop: 'Tomato',
      quantity: '1000 kg/month',
      price: '₹25/kg',
      duration: '6 months',
      status: 'Active'
    },
    {
      id: 2,
      buyer: 'BigBasket',
      crop: 'Organic Wheat',
      quantity: '500 kg/month',
      price: '₹35/kg',
      duration: '12 months',
      status: 'Pending Approval'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-indigo-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <Users size={32} />
                <div>
                  <h1 className="text-xl font-bold"><T>Market Linkage</T></h1>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedCategory('buyers')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === 'buyers'
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <Users className="mx-auto mb-2 text-indigo-600" size={32} />
              <p className="font-bold text-gray-900"><T>Buyers</T></p>
            </button>
            <button
              onClick={() => setSelectedCategory('fpo')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === 'fpo'
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <TrendingUp className="mx-auto mb-2 text-indigo-600" size={32} />
              <p className="font-bold text-gray-900"><T>FPOs</T></p>
            </button>
            <button
              onClick={() => setSelectedCategory('contracts')}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === 'contracts'
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <Star className="mx-auto mb-2 text-indigo-600" size={32} />
              <p className="font-bold text-gray-900"><T>My Contracts</T></p>
            </button>
          </div>
        </div>

        {/* Buyers List */}
        {selectedCategory === 'buyers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900"><T>Available Buyers</T></h2>
            {buyers.map((buyer) => (
              <div key={buyer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1"><T>{buyer.name}</T></h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">
                        <T>{buyer.type}</T>
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 fill-yellow-500" size={16} />
                        <span className="text-sm font-semibold text-gray-900">{buyer.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    <T>Connect</T>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1"><T>Crops Interested</T></p>
                    <div className="flex flex-wrap gap-2">
                      {buyer.crops.map((crop, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          <T>{crop}</T>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1"><T>Location</T></p>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-900"><T>{buyer.location}</T></span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600"><T>Min Order</T></p>
                    <p className="font-semibold text-gray-900">{buyer.minOrder}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600"><T>Payment Terms</T></p>
                    <p className="font-semibold text-gray-900">{buyer.paymentTerms}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600"><T>Contact</T></p>
                    <div className="flex items-center gap-1">
                      <Phone size={14} className="text-indigo-600" />
                      <p className="font-semibold text-gray-900 text-sm">{buyer.contact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FPO List */}
        {selectedCategory === 'fpo' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900"><T>Farmer Producer Organizations</T></h2>
            {fpos.map((fpo) => (
              <div key={fpo.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1"><T>{fpo.name}</T></h3>
                    <p className="text-sm text-gray-600 mt-2">{fpo.members} <T>Members</T></p>
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <T>Join FPO</T>
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2"><T>Crops</T></p>
                  <div className="flex flex-wrap gap-2">
                    {fpo.crops.map((crop, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        <T>{crop}</T>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2"><T>Benefits</T></p>
                  <ul className="space-y-1">
                    {fpo.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-sm text-gray-700"><T>{benefit}</T></span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-indigo-600" />
                    <span className="text-sm font-semibold text-gray-900">{fpo.contact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contracts */}
        {selectedCategory === 'contracts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900"><T>My Contracts</T></h2>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <T>New Contract</T>
              </button>
            </div>
            {contracts.map((contract) => (
              <div key={contract.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      <T>{contract.crop}</T>
                    </h3>
                    <p className="text-sm text-gray-600"><T>Buyer</T>: {contract.buyer}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      contract.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    <T>{contract.status}</T>
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600"><T>Quantity</T></p>
                    <p className="font-semibold text-gray-900">{contract.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600"><T>Price</T></p>
                    <p className="font-semibold text-gray-900">{contract.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600"><T>Duration</T></p>
                    <p className="font-semibold text-gray-900">{contract.duration}</p>
                  </div>
                  <div>
                    <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm">
                      <T>View Details</T> →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
