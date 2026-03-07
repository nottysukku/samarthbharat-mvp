import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, Upload, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export default function CropDiagnosisPage() {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [diagnosis, setDiagnosis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const mockDiagnoses = [
    {
      disease: 'Leaf Blight',
      diseaseHi: 'पत्ती झुलसा',
      confidence: 92,
      severity: 'Moderate',
      severityHi: 'मध्यम',
      symptoms: ['Brown spots on leaves', 'Yellowing edges', 'Wilting'],
      symptomsHi: ['पत्तियों पर भूरे धब्बे', 'पीले किनारे', 'मुरझाना'],
      treatment: [
        'Remove infected leaves immediately',
        'Apply copper-based fungicide',
        'Improve air circulation',
        'Reduce overhead watering'
      ],
      treatmentHi: [
        'संक्रमित पत्तियों को तुरंत हटा दें',
        'तांबा आधारित कवकनाशी लगाएं',
        'हवा का संचार बढ़ाएं',
        'ऊपर से पानी देना कम करें'
      ],
      prevention: [
        'Use disease-resistant varieties',
        'Maintain proper spacing between plants',
        'Practice crop rotation'
      ],
      preventionHi: [
        'रोग प्रतिरोधी किस्मों का उपयोग करें',
        'पौधों के बीच उचित दूरी बनाए रखें',
        'फसल चक्र का अभ्यास करें'
      ]
    },
    {
      disease: 'Powdery Mildew',
      diseaseHi: 'चूर्णिल आसिता',
      confidence: 88,
      severity: 'Mild',
      severityHi: 'हल्का',
      symptoms: ['White powdery coating', 'Stunted growth', 'Leaf curling'],
      symptomsHi: ['सफेद पाउडर जैसी परत', 'बौनी वृद्धि', 'पत्ती मुड़ना'],
      treatment: [
        'Apply sulfur-based fungicide',
        'Spray neem oil solution',
        'Remove heavily infected parts',
        'Increase sunlight exposure'
      ],
      treatmentHi: [
        'सल्फर आधारित कवकनाशी लगाएं',
        'नीम तेल का घोल स्प्रे करें',
        'अधिक संक्रमित भागों को हटा दें',
        'सूर्य के प्रकाश का संपर्क बढ़ाएं'
      ],
      prevention: [
        'Ensure good air circulation',
        'Avoid overhead irrigation',
        'Plant in full sun locations'
      ],
      preventionHi: [
        'अच्छा वायु संचार सुनिश्चित करें',
        'ऊपर से सिंचाई से बचें',
        'पूर्ण धूप वाले स्थानों में रोपें'
      ]
    }
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        setDiagnosis(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeCrop = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      const randomDiagnosis = mockDiagnoses[Math.floor(Math.random() * mockDiagnoses.length)]
      setDiagnosis(randomDiagnosis)
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-red-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <Camera size={32} />
                <div>
                  <h1 className="text-xl font-bold">फसल रोग निदान</h1>
                  <p className="text-sm opacity-90">Crop Disease Diagnosis</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Upload Crop Image / फसल की तस्वीर अपलोड करें
          </h2>

          <div className="max-w-2xl mx-auto">
            {!selectedImage ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="text-gray-400 mb-4" size={48} />
                  <p className="mb-2 text-lg font-semibold text-gray-700">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                  <p className="text-sm text-gray-500 mt-2">
                    अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Uploaded crop"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null)
                      setDiagnosis(null)
                    }}
                    className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <XCircle size={24} />
                  </button>
                </div>

                {!diagnosis && !isAnalyzing && (
                  <button
                    onClick={analyzeCrop}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold text-lg"
                  >
                    Analyze Crop / फसल का विश्लेषण करें
                  </button>
                )}

                {isAnalyzing && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-gray-700">Analyzing image...</p>
                    <p className="text-sm text-gray-600">छवि का विश्लेषण किया जा रहा है...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Diagnosis Results */}
        {diagnosis && (
          <div className="space-y-6">
            {/* Disease Identification */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {diagnosis.diseaseHi} / {diagnosis.disease}
                  </h3>
                  <p className="text-gray-600">
                    Severity: {diagnosis.severityHi} / {diagnosis.severity}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-600">{diagnosis.confidence}%</div>
                  <p className="text-sm text-gray-600">Confidence</p>
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="text-orange-600" size={24} />
                <h3 className="text-xl font-bold text-gray-900">Symptoms / लक्षण</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">हिंदी</h4>
                  <ul className="space-y-2">
                    {diagnosis.symptomsHi.map((symptom: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span className="text-gray-700">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">English</h4>
                  <ul className="space-y-2">
                    {diagnosis.symptoms.map((symptom: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">•</span>
                        <span className="text-gray-700">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Treatment */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="text-green-600" size={24} />
                <h3 className="text-xl font-bold text-gray-900">Treatment / उपचार</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">हिंदी</h4>
                  <ol className="space-y-2">
                    {diagnosis.treatmentHi.map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 font-semibold">{idx + 1}.</span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">English</h4>
                  <ol className="space-y-2">
                    {diagnosis.treatment.map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 font-semibold">{idx + 1}.</span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Prevention */}
            <div className="bg-blue-50 rounded-lg shadow-md p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Prevention Tips / रोकथाम युक्तियाँ</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2">
                    {diagnosis.preventionHi.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600">✓</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    {diagnosis.prevention.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600">✓</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
