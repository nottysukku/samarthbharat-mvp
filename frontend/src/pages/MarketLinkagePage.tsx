import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, TrendingUp, MapPin, Phone, Star } from 'lucide-react'

export default function MarketLinkagePage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('buyers')

  const buyers = [
    {
      id: 1,
      name: 'Reliance Fresh',
      nameHi: 'रिलायंस फ्रेश',
      type: 'Retail Chain',
      typeHi: 'खुदरा श्रृंखला',
      crops: ['Vegetables', 'Fruits', 'Grains'],
      cropsHi: ['सब्जियां', 'फल', 'अनाज'],
      location: 'Delhi NCR',
      locationHi: 'दिल्ली एनसीआर',
      rating: 4.5,
      contact: '+91-9876543210',
      minOrder: '500 kg',
      paymentTerms: '15 days',
      paymentTermsHi: '15 दिन'
    },
    {
      id: 2,
      name: 'BigBasket',
      nameHi: 'बिगबास्केट',
      type: 'Online Platform',
      typeHi: 'ऑनलाइन प्लेटफॉर्म',
      crops: ['Organic Vegetables', 'Fruits'],
      cropsHi: ['जैविक सब्जियां', 'फल'],
      location: 'Pan India',
      locationHi: 'पैन इंडिया',
      rating: 4.7,
      contact: '+91-9876543211',
      minOrder: '1000 kg',
      paymentTerms: '7 days',
      paymentTermsHi: '7 दिन'
    },
    {
      id: 3,
      name: 'Mother Dairy',
      nameHi: 'मदर डेयरी',
      type: 'Cooperative',
      typeHi: 'सहकारी',
      crops: ['Milk', 'Vegetables', 'Fruits'],
      cropsHi: ['दूध', 'सब्जियां', 'फल'],
      location: 'Delhi, Haryana, UP',
      locationHi: 'दिल्ली, हरियाणा, यूपी',
      rating: 4.8,
      contact: '+91-9876543212',
      minOrder: '200 kg',
      paymentTerms: '10 days',
      paymentTermsHi: '10 दिन'
    }
  ]

  const fpos = [
    {
      id: 1,
      name: 'Delhi Farmers Producer Organization',
      nameHi: 'दिल्ली किसान उत्पादक संगठन',
      members: 500,
      crops: ['Wheat', 'Rice', 'Vegetables'],
      cropsHi: ['गेहूं', 'चावल', 'सब्जियां'],
      benefits: ['Bulk selling', 'Better prices', 'Storage facilities'],
      benefitsHi: ['थोक बिक्री', 'बेहतर कीमतें', 'भंडारण सुविधाएं'],
      contact: '+91-9876543213'
    },
    {
      id: 2,
      name: 'Haryana Organic FPO',
      nameHi: 'हरियाणा जैविक एफपीओ',
      members: 300,
      crops: ['Organic Vegetables', 'Organic Grains'],
      cropsHi: ['जैविक सब्जियां', 'जैविक अनाज'],
      benefits: ['Organic certification', 'Premium prices', 'Export opportunities'],
      benefitsHi: ['जैविक प्रमाणन', 'प्रीमियम कीमतें', 'निर्यात अवसर'],
      contact: '+91-9876543214'
    }
  ]

  const contracts = [
    {
      id: 1,
      buyer: 'Reliance Fresh',
      crop: 'Tomato',
      cropHi: 'टमाटर',
      quantity: '1000 kg/month',
      price: '₹25/kg',
      duration: '6 months',
      durationHi: '6 महीने',
      status: 'Active',
      statusHi: 'सक्रिय'
    },
    {
      id: 2,
      buyer: 'BigBasket',
      crop: 'Organic Wheat',
      cropHi: 'जैविक गेहूं',
      quantity: '500 kg/month',
      price: '₹35/kg',
      duration: '12 months',
      durationHi: '12 महीने',
      status: 'Pending Approval',
      statusHi: 'अनुमोदन लंबित'
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
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <Users size={32} />
                <div>
                  <h1 className="text-xl font-bold">बाजार संपर्क</h1>
                  <p className="text-sm opacity-90">Market Linkage</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
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
              <p className="font-bold text-gray-900">Buyers / खरीदार</p>
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
              <p className="font-bold text-gray-900">FPOs / एफपीओ</p>
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
              <p className="font-bold text-gray-900">My Contracts / मेरे अनुबंध</p>
            </button>
          </div>
        </div>

        {/* Buyers List */}
        {selectedCategory === 'buyers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Buyers / उपलब्ध खरीदार</h2>
            {buyers.map((buyer) => (
              <div key={buyer.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{buyer.nameHi}</h3>
                    <p className="text-sm text-gray-600">{buyer.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {buyer.typeHi}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 fill-yellow-500" size={16} />
                        <span className="text-sm font-semibold text-gray-900">{buyer.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Connect / संपर्क करें
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Crops Interested / रुचि वाली फसलें</p>
                    <div className="flex flex-wrap gap-2">
                      {buyer.crops.map((_, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {buyer.cropsHi[idx]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Location / स्थान</p>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-900">{buyer.locationHi}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600">Min Order</p>
                    <p className="font-semibold text-gray-900">{buyer.minOrder}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Payment Terms</p>
                    <p className="font-semibold text-gray-900">{buyer.paymentTermsHi}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Contact</p>
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
            <h2 className="text-2xl font-bold text-gray-900">Farmer Producer Organizations / किसान उत्पादक संगठन</h2>
            {fpos.map((fpo) => (
              <div key={fpo.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{fpo.nameHi}</h3>
                    <p className="text-sm text-gray-600">{fpo.name}</p>
                    <p className="text-sm text-gray-600 mt-2">{fpo.members} Members / सदस्य</p>
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Join FPO / एफपीओ में शामिल हों
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Crops / फसलें</p>
                  <div className="flex flex-wrap gap-2">
                    {fpo.crops.map((_, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {fpo.cropsHi[idx]}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Benefits / लाभ</p>
                  <ul className="space-y-1">
                    {fpo.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-sm text-gray-700">{fpo.benefitsHi[idx]} / {benefit}</span>
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
              <h2 className="text-2xl font-bold text-gray-900">My Contracts / मेरे अनुबंध</h2>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                New Contract / नया अनुबंध
              </button>
            </div>
            {contracts.map((contract) => (
              <div key={contract.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {contract.cropHi} / {contract.crop}
                    </h3>
                    <p className="text-sm text-gray-600">Buyer: {contract.buyer}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      contract.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {contract.statusHi}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Quantity</p>
                    <p className="font-semibold text-gray-900">{contract.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Price</p>
                    <p className="font-semibold text-gray-900">{contract.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">{contract.durationHi}</p>
                  </div>
                  <div>
                    <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm">
                      View Details →
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
