import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Download, FileText, Video, CheckSquare } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function ExamResourcesPage() {
  const navigate = useNavigate()
  const [selectedExam, setSelectedExam] = useState('jee')
  const [selectedType, setSelectedType] = useState('all')

  const exams = [
    { id: 'jee', name: 'JEE Main', nameHi: 'जेईई मेन' },
    { id: 'neet', name: 'NEET', nameHi: 'नीट' },
    { id: 'upsc', name: 'UPSC CSE', nameHi: 'यूपीएससी सीएसई' },
    { id: 'ssc', name: 'SSC CGL', nameHi: 'एसएससी सीजीएल' },
  ]

  const resourceTypes = [
    { id: 'all', name: 'All', nameHi: 'सभी', icon: BookOpen },
    { id: 'pdf', name: 'PDFs', nameHi: 'पीडीएफ', icon: FileText },
    { id: 'video', name: 'Videos', nameHi: 'वीडियो', icon: Video },
    { id: 'test', name: 'Practice Tests', nameHi: 'अभ्यास परीक्षण', icon: CheckSquare },
  ]

  const resources: any = {
    jee: [
      {
        id: 1,
        type: 'pdf',
        title: 'JEE Main Physics Formula Sheet',
        titleHi: 'जेईई मेन भौतिकी सूत्र पत्रक',
        subject: 'Physics',
        subjectHi: 'भौतिकी',
        pages: 50,
        downloads: 15000,
        rating: 4.8,
        size: '5 MB'
      },
      {
        id: 2,
        type: 'pdf',
        title: 'Organic Chemistry Notes',
        titleHi: 'कार्बनिक रसायन नोट्स',
        subject: 'Chemistry',
        subjectHi: 'रसायन विज्ञान',
        pages: 120,
        downloads: 12000,
        rating: 4.7,
        size: '12 MB'
      },
      {
        id: 3,
        type: 'video',
        title: 'Calculus Complete Course',
        titleHi: 'कैलकुलस पूर्ण पाठ्यक्रम',
        subject: 'Mathematics',
        subjectHi: 'गणित',
        duration: '15 hours',
        views: 50000,
        rating: 4.9
      },
      {
        id: 4,
        type: 'test',
        title: 'JEE Main Mock Test Series',
        titleHi: 'जेईई मेन मॉक टेस्ट सीरीज',
        subject: 'All Subjects',
        subjectHi: 'सभी विषय',
        tests: 20,
        questions: 1500,
        rating: 4.6
      },
      {
        id: 5,
        type: 'pdf',
        title: 'Previous Year Questions (2015-2023)',
        titleHi: 'पिछले वर्ष के प्रश्न (2015-2023)',
        subject: 'All Subjects',
        subjectHi: 'सभी विषय',
        pages: 300,
        downloads: 25000,
        rating: 4.9,
        size: '25 MB'
      },
      {
        id: 6,
        type: 'video',
        title: 'Electromagnetism Masterclass',
        titleHi: 'विद्युत चुंबकत्व मास्टरक्लास',
        subject: 'Physics',
        subjectHi: 'भौतिकी',
        duration: '8 hours',
        views: 30000,
        rating: 4.7
      }
    ]
  }

  const currentResources = resources[selectedExam] || []
  const filteredResources = selectedType === 'all'
    ? currentResources
    : currentResources.filter((r: any) => r.type === selectedType)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-green-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <BookOpen size={32} />
                <div>
                  <h1 className="text-xl font-bold">परीक्षा संसाधन</h1>
                  <p className="text-sm opacity-90">Exam Resources</p>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Exam Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Exam / परीक्षा चुनें</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {exams.map((exam) => (
              <button
                key={exam.id}
                onClick={() => setSelectedExam(exam.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedExam === exam.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <p className="font-bold text-gray-900">{exam.nameHi}</p>
                <p className="text-sm text-gray-600">{exam.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Resource Type Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Filter by Type / प्रकार से फ़िल्टर करें</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {resourceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedType === type.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <type.icon className="mx-auto mb-2 text-green-600" size={32} />
                <p className="font-bold text-gray-900 text-sm">{type.nameHi}</p>
                <p className="text-xs text-gray-600">{type.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Resources / संसाधन ({filteredResources.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource: any) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {resource.type === 'pdf' && <FileText className="text-red-600 mb-2" size={32} />}
                    {resource.type === 'video' && <Video className="text-blue-600 mb-2" size={32} />}
                    {resource.type === 'test' && <CheckSquare className="text-green-600 mb-2" size={32} />}
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{resource.titleHi}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">{resource.title}</p>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                      {resource.subjectHi}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  {resource.type === 'pdf' && (
                    <>
                      <p>Pages: {resource.pages}</p>
                      <p>Size: {resource.size}</p>
                      <p>Downloads: {resource.downloads.toLocaleString()}</p>
                    </>
                  )}
                  {resource.type === 'video' && (
                    <>
                      <p>Duration: {resource.duration}</p>
                      <p>Views: {resource.views.toLocaleString()}</p>
                    </>
                  )}
                  {resource.type === 'test' && (
                    <>
                      <p>Tests: {resource.tests}</p>
                      <p>Questions: {resource.questions}</p>
                    </>
                  )}
                  <p className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-gray-900">{resource.rating}</span>
                  </p>
                </div>

                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2">
                  {resource.type === 'pdf' && <Download size={18} />}
                  {resource.type === 'video' && <Video size={18} />}
                  {resource.type === 'test' && <CheckSquare size={18} />}
                  {resource.type === 'pdf' && 'Download / डाउनलोड करें'}
                  {resource.type === 'video' && 'Watch / देखें'}
                  {resource.type === 'test' && 'Start Test / टेस्ट शुरू करें'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
