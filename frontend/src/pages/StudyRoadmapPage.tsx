import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Target, CheckCircle, Clock, BookOpen, TrendingUp, Sparkles, Loader2 } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function StudyRoadmapPage() {
  const navigate = useNavigate()
  const [selectedExam, setSelectedExam] = useState('jee')
  const [aiRoadmap, setAiRoadmap] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  const exams = [
    { id: 'jee', name: 'JEE Main' },
    { id: 'neet', name: 'NEET' },
    { id: 'upsc', name: 'UPSC CSE' },
    { id: 'ssc', name: 'SSC CGL' },
  ]

  const roadmaps: any = {
    jee: {
      duration: '12 months',
      phases: [
        {
          phase: 'Foundation (Months 1-3)',
          topics: [
            { subject: 'Physics', chapters: ['Mechanics', 'Thermodynamics', 'Waves'], progress: 100 },
            { subject: 'Chemistry', chapters: ['Physical Chemistry', 'Organic Basics'], progress: 100 },
            { subject: 'Mathematics', chapters: ['Algebra', 'Trigonometry', 'Coordinate Geometry'], progress: 100 },
          ],
          status: 'completed'
        },
        {
          phase: 'Intermediate (Months 4-7)',
          topics: [
            { subject: 'Physics', chapters: ['Electromagnetism', 'Optics', 'Modern Physics'], progress: 60 },
            { subject: 'Chemistry', chapters: ['Inorganic Chemistry', 'Organic Reactions'], progress: 55 },
            { subject: 'Mathematics', chapters: ['Calculus', 'Vectors', '3D Geometry'], progress: 70 },
          ],
          status: 'in-progress'
        },
        {
          phase: 'Advanced (Months 8-10)',
          topics: [
            { subject: 'Physics', chapters: ['Advanced Problems', 'Previous Year Questions'], progress: 0 },
            { subject: 'Chemistry', chapters: ['Complex Reactions', 'Application Problems'], progress: 0 },
            { subject: 'Mathematics', chapters: ['Advanced Calculus', 'Complex Numbers'], progress: 0 },
          ],
          status: 'pending'
        },
        {
          phase: 'Revision & Mock Tests (Months 11-12)',
          topics: [
            { subject: 'Full Syllabus Revision', chapters: ['All Topics'], progress: 0 },
            { subject: 'Mock Tests', chapters: ['20+ Full Length Tests'], progress: 0 },
          ],
          status: 'pending'
        }
      ],
      weeklySchedule: [
        { day: 'Monday', morning: 'Physics', afternoon: 'Chemistry', evening: 'Mathematics' },
        { day: 'Tuesday', morning: 'Mathematics', afternoon: 'Physics', evening: 'Chemistry' },
        { day: 'Wednesday', morning: 'Chemistry', afternoon: 'Mathematics', evening: 'Physics' },
        { day: 'Thursday', morning: 'Physics', afternoon: 'Chemistry', evening: 'Practice Tests' },
        { day: 'Friday', morning: 'Mathematics', afternoon: 'Physics', evening: 'Chemistry' },
        { day: 'Saturday', morning: 'Full Mock Test', afternoon: 'Analysis', evening: 'Revision' },
        { day: 'Sunday', morning: 'Weak Topics', afternoon: 'Doubt Clearing', evening: 'Rest' },
      ]
    }
  }

  const currentRoadmap = roadmaps[selectedExam]

  const generateAIRoadmap = async () => {
    setAiLoading(true)
    setAiRoadmap('')
    try {
      const examName = exams.find(e => e.id === selectedExam)?.name || selectedExam
      const res = await fetch(`${API}/api/ai/study-roadmap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam: examName, months: 6, hoursPerDay: 6, currentLevel: 'Beginner' }),
      })
      const data = await res.json()
      setAiRoadmap(data.response || 'Could not generate roadmap.')
    } catch {
      setAiRoadmap('Could not reach the server. Please try again.')
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-purple-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <Target size={32} />
                <div>
                  <h1 className="text-xl font-bold"><T>Study Roadmap</T></h1>
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
          <h2 className="text-xl font-bold text-gray-900 mb-4"><T>Select Your Exam</T></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {exams.map((exam) => (
              <button
                key={exam.id}
                onClick={() => setSelectedExam(exam.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedExam === exam.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <p className="font-bold text-gray-900"><T>{exam.name}</T></p>
              </button>
            ))}
          </div>
        </div>

        {/* Roadmap Overview */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                <T>{exams.find(e => e.id === selectedExam)?.name} Roadmap</T>
              </h2>
              <p className="opacity-90"><T>Duration</T>: {currentRoadmap.duration}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">45%</div>
              <p className="text-sm opacity-90"><T>Overall Progress</T></p>
            </div>
          </div>
        </div>

        {/* Study Phases */}
        <div className="space-y-6 mb-8">
          {currentRoadmap.phases.map((phase: any, idx: number) => (
            <div
              key={idx}
              className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                phase.status === 'completed'
                  ? 'border-green-600'
                  : phase.status === 'in-progress'
                  ? 'border-purple-600'
                  : 'border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1"><T>{phase.phase}</T></h3>
                </div>
                <div className="flex items-center gap-2">
                  {phase.status === 'completed' && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <CheckCircle size={16} />
                      <T>Completed</T>
                    </span>
                  )}
                  {phase.status === 'in-progress' && (
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Clock size={16} />
                      <T>In Progress</T>
                    </span>
                  )}
                  {phase.status === 'pending' && (
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      <T>Pending</T>
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {phase.topics.map((topic: any, topicIdx: number) => (
                  <div key={topicIdx} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        <T>{topic.subject}</T>
                      </h4>
                      <span className="text-sm font-semibold text-purple-600">{topic.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${topic.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {topic.chapters.map((chapter: string, chIdx: number) => (
                        <span
                          key={chIdx}
                          className="bg-white px-3 py-1 rounded-full text-xs text-gray-700 border border-gray-200"
                        >
                          <T>{chapter}</T>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Schedule */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="text-purple-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900"><T>Weekly Schedule</T></h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900"><T>Day</T></th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900"><T>Morning (6-10 AM)</T></th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900"><T>Afternoon (2-6 PM)</T></th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900"><T>Evening (7-10 PM)</T></th>
                </tr>
              </thead>
              <tbody>
                {currentRoadmap.weeklySchedule.map((day: any, idx: number) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900"><T>{day.day}</T></div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        <T>{day.morning}</T>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        <T>{day.afternoon}</T>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        <T>{day.evening}</T>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Roadmap Generator */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg shadow-md p-6 border-l-4 border-purple-600">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-purple-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900"><T>AI-Powered Roadmap Generator</T></h3>
          </div>
          <p className="text-gray-600 mb-4 text-sm"><T>Get a personalized study plan generated by AI for your selected exam</T></p>
          <button
            onClick={generateAIRoadmap}
            disabled={aiLoading}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50 mb-4"
          >
            {aiLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {aiLoading ? 'Generating Roadmap...' : `Generate AI Roadmap for ${exams.find(e => e.id === selectedExam)?.name}`}
          </button>
          {aiRoadmap && (
            <div className="bg-white rounded-lg p-6 border border-purple-200 whitespace-pre-wrap text-sm text-gray-800 max-h-[500px] overflow-y-auto leading-relaxed">
              {aiRoadmap}
            </div>
          )}
        </div>

        {/* Study Tips */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md p-6 border-l-4 border-indigo-600">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-indigo-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900"><T>Study Tips</T></h3>
          </div>
          <ul className="grid md:grid-cols-2 gap-3">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">✓</span>
              <span className="text-gray-700"><T>Study in focused 2-hour blocks with 15-min breaks</T></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">✓</span>
              <span className="text-gray-700"><T>Revise previous day's topics every morning</T></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">✓</span>
              <span className="text-gray-700"><T>Solve at least 50 problems daily</T></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">✓</span>
              <span className="text-gray-700"><T>Take one full mock test every week</T></span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
