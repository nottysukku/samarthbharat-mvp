import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Leaf, TrendingUp, AlertCircle, CheckCircle, Download } from 'lucide-react'

export default function SoilHealthPage() {
  const navigate = useNavigate()
  const [selectedField, setSelectedField] = useState('field1')

  const fields = [
    { id: 'field1', name: 'Field 1 - North', nameHi: 'खेत 1 - उत्तर', area: '5 acres' },
    { id: 'field2', name: 'Field 2 - South', nameHi: 'खेत 2 - दक्षिण', area: '3 acres' },
    { id: 'field3', name: 'Field 3 - East', nameHi: 'खेत 3 - पूर्व', area: '4 acres' },
  ]

  const soilData: any = {
    field1: {
      cardNumber: 'SHC/2024/DL/001234',
      testDate: '15 Jan 2024',
      nextTest: '15 Jan 2025',
      soilType: 'Loamy',
      soilTypeHi: 'दोमट',
      ph: 6.8,
      nitrogen: 'Medium',
      nitrogenHi: 'मध्यम',
      phosphorus: 'High',
      phosphorusHi: 'उच्च',
      potassium: 'Low',
      potassiumHi: 'कम',
      organicCarbon: 0.65,
      ec: 0.42,
      recommendations: [
        {
          nutrient: 'Nitrogen',
          nutrientHi: 'नाइट्रोजन',
          status: 'medium',
          recommendation: 'Apply 120 kg/ha Urea',
          recommendationHi: '120 किग्रा/हेक्टेयर यूरिया डालें',
          timing: 'Split application: 50% at sowing, 25% at 30 days, 25% at 60 days',
          timingHi: 'विभाजित अनुप्रयोग: बुवाई पर 50%, 30 दिन पर 25%, 60 दिन पर 25%'
        },
        {
          nutrient: 'Phosphorus',
          nutrientHi: 'फास्फोरस',
          status: 'high',
          recommendation: 'No additional P required',
          recommendationHi: 'अतिरिक्त फास्फोरस की आवश्यकता नहीं',
          timing: 'Maintain current levels',
          timingHi: 'वर्तमान स्तर बनाए रखें'
        },
        {
          nutrient: 'Potassium',
          nutrientHi: 'पोटैशियम',
          status: 'low',
          recommendation: 'Apply 80 kg/ha Muriate of Potash',
          recommendationHi: '80 किग्रा/हेक्टेयर म्यूरेट ऑफ पोटाश डालें',
          timing: 'Full dose at sowing',
          timingHi: 'बुवाई के समय पूरी खुराक'
        }
      ],
      crops: [
        { name: 'Wheat', nameHi: 'गेहूं', suitability: 'Highly Suitable', suitabilityHi: 'अत्यधिक उपयुक्त', score: 95 },
        { name: 'Rice', nameHi: 'चावल', suitability: 'Suitable', suitabilityHi: 'उपयुक्त', score: 80 },
        { name: 'Sugarcane', nameHi: 'गन्ना', suitability: 'Moderately Suitable', suitabilityHi: 'मध्यम उपयुक्त', score: 65 },
      ]
    }
  }

  const currentData = soilData[selectedField]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-amber-700 text-white shadow-lg border-b-4 border-orange-500">
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
                <Leaf size={32} />
                <div>
                  <h1 className="text-xl font-bold">मृदा स्वास्थ्य कार्ड</h1>
                  <p className="text-sm opacity-90">Soil Health Card</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Field Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Field / खेत चुनें</h2>
          <div className="grid grid-cols-3 gap-4">
            {fields.map((field) => (
              <button
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedField === field.id
                    ? 'border-amber-700 bg-amber-50'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <p className="font-bold text-gray-900">{field.nameHi}</p>
                <p className="text-sm text-gray-600">{field.name}</p>
                <p className="text-xs text-gray-500 mt-1">{field.area}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Card Overview */}
        <div className="bg-gradient-to-r from-amber-700 to-orange-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Soil Health Card</h2>
              <p className="text-sm opacity-90">Card No: {currentData.cardNumber}</p>
            </div>
            <button className="bg-white text-amber-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
              <Download size={20} />
              Download PDF
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/30">
            <div>
              <p className="text-sm opacity-75">Test Date</p>
              <p className="text-lg font-semibold">{currentData.testDate}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Next Test Due</p>
              <p className="text-lg font-semibold">{currentData.nextTest}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Soil Type</p>
              <p className="text-lg font-semibold">{currentData.soilTypeHi} / {currentData.soilType}</p>
            </div>
          </div>
        </div>

        {/* Soil Parameters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Soil Parameters / मृदा मापदंड</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
              <p className="text-sm text-gray-600 mb-1">pH Level</p>
              <p className="text-3xl font-bold text-gray-900">{currentData.ph}</p>
              <p className="text-sm text-green-600 mt-2">✓ Optimal Range (6.5-7.5)</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
              <p className="text-sm text-gray-600 mb-1">Nitrogen / नाइट्रोजन</p>
              <p className="text-3xl font-bold text-gray-900">{currentData.nitrogenHi}</p>
              <p className="text-sm text-gray-600 mt-2">{currentData.nitrogen}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-sm text-gray-600 mb-1">Phosphorus / फास्फोरस</p>
              <p className="text-3xl font-bold text-gray-900">{currentData.phosphorusHi}</p>
              <p className="text-sm text-gray-600 mt-2">{currentData.phosphorus}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-sm text-gray-600 mb-1">Potassium / पोटैशियम</p>
              <p className="text-3xl font-bold text-gray-900">{currentData.potassiumHi}</p>
              <p className="text-sm text-gray-600 mt-2">{currentData.potassium}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
              <p className="text-sm text-gray-600 mb-1">Organic Carbon</p>
              <p className="text-3xl font-bold text-gray-900">{currentData.organicCarbon}%</p>
              <p className="text-sm text-gray-600 mt-2">Good Level</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-600">
              <p className="text-sm text-gray-600 mb-1">EC (dS/m)</p>
              <p className="text-3xl font-bold text-gray-900">{currentData.ec}</p>
              <p className="text-sm text-green-600 mt-2">✓ Normal Salinity</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-green-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">Fertilizer Recommendations / उर्वरक सिफारिशें</h3>
          </div>
          <div className="space-y-4">
            {currentData.recommendations.map((rec: any, idx: number) => (
              <div
                key={idx}
                className={`border-l-4 p-4 rounded-r-lg ${
                  rec.status === 'low'
                    ? 'bg-red-50 border-red-600'
                    : rec.status === 'medium'
                    ? 'bg-yellow-50 border-yellow-600'
                    : 'bg-green-50 border-green-600'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-900 text-lg">{rec.nutrientHi} / {rec.nutrient}</h4>
                  {rec.status === 'low' && <AlertCircle className="text-red-600" size={24} />}
                  {rec.status === 'high' && <CheckCircle className="text-green-600" size={24} />}
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold text-gray-900">{rec.recommendationHi}</p>
                    <p className="text-sm text-gray-600">{rec.recommendation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">Application Timing:</p>
                    <p className="text-sm text-gray-600">{rec.timingHi}</p>
                    <p className="text-xs text-gray-500">{rec.timing}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Suitability */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Crop Suitability / फसल उपयुक्तता</h3>
          <div className="space-y-4">
            {currentData.crops.map((crop: any, idx: number) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">{crop.nameHi} / {crop.name}</h4>
                    <p className="text-sm text-gray-600">{crop.suitabilityHi} / {crop.suitability}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{crop.score}%</p>
                    <p className="text-xs text-gray-600">Suitability</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      crop.score >= 80 ? 'bg-green-600' : crop.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${crop.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
