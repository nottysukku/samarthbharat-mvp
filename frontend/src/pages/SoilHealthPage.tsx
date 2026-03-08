import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Leaf, TrendingUp, AlertCircle, CheckCircle, Download, Sparkles, Loader2 } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function SoilHealthPage() {
  const navigate = useNavigate()
  const [selectedField, setSelectedField] = useState('field1')
  const [aiAdvice, setAiAdvice] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  const getAIAdvice = async () => {
    const soil = soilData[selectedField]
    if (!soil) return
    setAiLoading(true)
    setAiAdvice('')
    try {
      const res = await fetch(`${API}/api/ai/soil-analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ soilType: soil.soilType, ph: String(soil.ph), crop: 'Wheat', region: 'North India' }),
      })
      const data = await res.json()
      setAiAdvice(data.response || 'Could not get advice.')
    } catch {
      setAiAdvice('Could not reach the server. Please try again.')
    } finally {
      setAiLoading(false)
    }
  }

  const fields = [
    { id: 'field1', name: 'Field 1 - North', area: '5 acres' },
    { id: 'field2', name: 'Field 2 - South', area: '3 acres' },
    { id: 'field3', name: 'Field 3 - East', area: '4 acres' },
  ]

  const soilData: any = {
    field1: {
      cardNumber: 'SHC/2024/DL/001234',
      testDate: '15 Jan 2024',
      nextTest: '15 Jan 2025',
      soilType: 'Loamy',
      ph: 6.8,
      nitrogen: 'Medium',
      phosphorus: 'High',
      potassium: 'Low',
      organicCarbon: 0.65,
      ec: 0.42,
      recommendations: [
        {
          nutrient: 'Nitrogen',
          status: 'medium',
          recommendation: 'Apply 120 kg/ha Urea',
          timing: 'Split application: 50% at sowing, 25% at 30 days, 25% at 60 days'
        },
        {
          nutrient: 'Phosphorus',
          status: 'high',
          recommendation: 'No additional P required',
          timing: 'Maintain current levels'
        },
        {
          nutrient: 'Potassium',
          status: 'low',
          recommendation: 'Apply 80 kg/ha Muriate of Potash',
          timing: 'Full dose at sowing'
        }
      ],
      crops: [
        { name: 'Wheat', suitability: 'Highly Suitable', score: 95 },
        { name: 'Rice', suitability: 'Suitable', score: 80 },
        { name: 'Sugarcane', suitability: 'Moderately Suitable', score: 65 },
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
              <span className="font-medium"><T>Back</T></span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <Leaf size={32} />
                <div>
                  <h1 className="text-xl font-bold"><T>Soil Health Card</T></h1>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Field Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4"><T>Select Field</T></h2>
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
                <p className="font-bold text-gray-900"><T>{field.name}</T></p>
                <p className="text-xs text-gray-500 mt-1">{field.area}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Card Overview */}
        <div className="bg-gradient-to-r from-amber-700 to-orange-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2"><T>Soil Health Card</T></h2>
              <p className="text-sm opacity-90"><T>Card No</T>: {currentData.cardNumber}</p>
            </div>
            <button className="bg-white text-amber-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
              <Download size={20} />
              <T>Download PDF</T>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/30">
            <div>
              <p className="text-sm opacity-75"><T>Test Date</T></p>
              <p className="text-lg font-semibold">{currentData.testDate}</p>
            </div>
            <div>
              <p className="text-sm opacity-75"><T>Next Test Due</T></p>
              <p className="text-lg font-semibold">{currentData.nextTest}</p>
            </div>
            <div>
              <p className="text-sm opacity-75"><T>Soil Type</T></p>
              <p className="text-lg font-semibold"><T>{currentData.soilType}</T></p>
            </div>
          </div>
        </div>

        {/* Soil Parameters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6"><T>Soil Parameters</T></h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
              <p className="text-sm text-gray-600 mb-1"><T>pH Level</T></p>
              <p className="text-3xl font-bold text-gray-900">{currentData.ph}</p>
              <p className="text-sm text-green-600 mt-2">✓ <T>Optimal Range</T> (6.5-7.5)</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
              <p className="text-sm text-gray-600 mb-1"><T>Nitrogen</T></p>
              <p className="text-3xl font-bold text-gray-900"><T>{currentData.nitrogen}</T></p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
              <p className="text-sm text-gray-600 mb-1"><T>Phosphorus</T></p>
              <p className="text-3xl font-bold text-gray-900"><T>{currentData.phosphorus}</T></p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <p className="text-sm text-gray-600 mb-1"><T>Potassium</T></p>
              <p className="text-3xl font-bold text-gray-900"><T>{currentData.potassium}</T></p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
              <p className="text-sm text-gray-600 mb-1"><T>Organic Carbon</T></p>
              <p className="text-3xl font-bold text-gray-900">{currentData.organicCarbon}%</p>
              <p className="text-sm text-gray-600 mt-2"><T>Good Level</T></p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-600">
              <p className="text-sm text-gray-600 mb-1">EC (dS/m)</p>
              <p className="text-3xl font-bold text-gray-900">{currentData.ec}</p>
              <p className="text-sm text-green-600 mt-2">✓ <T>Normal Salinity</T></p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-green-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900"><T>Fertilizer Recommendations</T></h3>
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
                  <h4 className="font-bold text-gray-900 text-lg"><T>{rec.nutrient}</T></h4>
                  {rec.status === 'low' && <AlertCircle className="text-red-600" size={24} />}
                  {rec.status === 'high' && <CheckCircle className="text-green-600" size={24} />}
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold text-gray-900"><T>{rec.recommendation}</T></p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700"><T>Application Timing</T>:</p>
                    <p className="text-sm text-gray-600"><T>{rec.timing}</T></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Suitability */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6"><T>Crop Suitability</T></h3>
          <div className="space-y-4">
            {currentData.crops.map((crop: any, idx: number) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900"><T>{crop.name}</T></h4>
                    <p className="text-sm text-gray-600"><T>{crop.suitability}</T></p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{crop.score}%</p>
                    <p className="text-xs text-gray-600"><T>Suitability</T></p>
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

        {/* AI Soil Expert */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-md p-6 border-l-4 border-green-600">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-green-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900"><T>AI Soil Expert</T> / AI मिट्टी विशेषज्ञ</h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm"><T>Get AI-powered fertilizer and crop recommendations based on your soil data</T></p>
          <button
            onClick={getAIAdvice}
            disabled={aiLoading}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50 mb-4"
          >
            {aiLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {aiLoading ? 'Analyzing...' : 'Get AI Recommendations'}
          </button>
          {aiAdvice && (
            <div className="bg-white rounded-lg p-6 border border-green-200 whitespace-pre-wrap text-sm text-gray-800 max-h-[500px] overflow-y-auto leading-relaxed">
              {aiAdvice}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
