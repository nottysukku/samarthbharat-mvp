import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Target, CheckCircle, Clock, BookOpen, TrendingUp } from 'lucide-react'

export default function StudyRoadmapPage() {
  const navigate = useNavigate()
  const [selectedExam, setSelectedExam] = useState('jee')

  const exams = [
    { id: 'jee', name: 'JEE Main', nameHi: 'जेईई मेन' },
    { id: 'neet', name: 'NEET', nameHi: 'नीट' },
    { id: 'upsc', name: 'UPSC CSE', nameHi: 'यूपीएससी सीएसई' },
    { id: 'ssc', name: 'SSC CGL', nameHi: 'एसएससी सीजीएल' },
  ]

  const roadmaps: any = {
    jee: {
      duration: '12 months',
      durationHi: '12 महीने',
      phases: [
        {
          phase: 'Foundation (Months 1-3)',
          phaseHi: 'आधार (महीने 1-3)',
          topics: [
            { subject: 'Physics', subjectHi: 'भौतिकी', chapters: ['Mechanics', 'Thermodynamics', 'Waves'], progress: 100 },
            { subject: 'Chemistry', subjectHi: 'रसायन विज्ञान', chapters: ['Physical Chemistry', 'Organic Basics'], progress: 100 },
            { subject: 'Mathematics', subjectHi: 'गणित', chapters: ['Algebra', 'Trigonometry', 'Coordinate Geometry'], progress: 100 },
          ],
          status: 'completed'
        },
        {
          phase: 'Intermediate (Months 4-7)',
          phaseHi: 'मध्यवर्ती (महीने 4-7)',
          topics: [
            { subject: 'Physics', subjectHi: 'भौतिकी', chapters: ['Electromagnetism', 'Optics', 'Modern Physics'], progress: 60 },
            { subject: 'Chemistry', subjectHi: 'रसायन विज्ञान', chapters: ['Inorganic Chemistry', 'Organic Reactions'], progress: 55 },
            { subject: 'Mathematics', subjectHi: 'गणित', chapters: ['Calculus', 'Vectors', '3D Geometry'], progress: 70 },
          ],
          status: 'in-progress'
        },
        {
          phase: 'Advanced (Months 8-10)',
          phaseHi: 'उन्नत (महीने 8-10)',
          topics: [
            { subject: 'Physics', subjectHi: 'भौतिकी', chapters: ['Advanced Problems', 'Previous Year Questions'], progress: 0 },
            { subject: 'Chemistry', subjectHi: 'रसायन विज्ञान', chapters: ['Complex Reactions', 'Application Problems'], progress: 0 },
            { subject: 'Mathematics', subjectHi: 'गणित', chapters: ['Advanced Calculus', 'Complex Numbers'], progress: 0 },
          ],
          status: 'pending'
        },
        {
          phase: 'Revision & Mock Tests (Months 11-12)',
          phaseHi: 'पुनरीक्षण और मॉक टेस्ट (महीने 11-12)',
          topics: [
            { subject: 'Full Syllabus Revision', subjectHi: 'पूर्ण पाठ्यक्रम पुनरीक्षण', chapters: ['All Topics'], progress: 0 },
            { subject: 'Mock Tests', subjectHi: 'मॉक टेस्ट', chapters: ['20+ Full Length Tests'], progress: 0 },
          ],
          status: 'pending'
        }
      ],
      weeklySchedule: [
        { day: 'Monday', dayHi: 'सोमवार', morning: 'Physics', afternoon: 'Chemistry', evening: 'Mathematics' },
        { day: 'Tuesday', dayHi: 'मंगलवार', morning: 'Mathematics', afternoon: 'Physics', evening: 'Chemistry' },
        { day: 'Wednesday', dayHi: 'बुधवार', morning: 'Chemistry', afternoon: 'Mathematics', evening: 'Physics' },
        { day: 'Thursday', dayHi: 'गुरुवार', morning: 'Physics', afternoon: 'Chemistry', evening: 'Practice Tests' },
        { day: 'Friday', dayHi: 'शुक्रवार', morning: 'Mathematics', afternoon: 'Physics', evening: 'Chemistry' },
        { day: 'Saturday', dayHi: 'शनिवार', morning: 'Full Mock Test', afternoon: 'Analysis', evening: 'Revision' },
        { day: 'Sunday', dayHi: 'रविवार', morning: 'Weak Topics', afternoon: 'Doubt Clearing', evening: 'Rest' },
      ]
    }
  }

  const currentRoadmap = roadmaps[selectedExam]

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
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <Target size={32} />
                <div>
                  <h1 className="text-xl font-bold">अध्ययन रोडमैप</h1>
                  <p className="text-sm opacity-90">Study Roadmap</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Exam Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Your Exam / अपनी परीक्षा चुनें</h2>
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
                <p className="font-bold text-gray-900">{exam.nameHi}</p>
                <p className="text-sm text-gray-600">{exam.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Roadmap Overview */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {exams.find(e => e.id === selectedExam)?.nameHi} Roadmap
              </h2>
              <p className="opacity-90">Duration: {currentRoadmap.duration} / अवधि: {currentRoadmap.durationHi}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">45%</div>
              <p className="text-sm opacity-90">Overall Progress</p>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{phase.phaseHi}</h3>
                  <p className="text-sm text-gray-600">{phase.phase}</p>
                </div>
                <div className="flex items-center gap-2">
                  {phase.status === 'completed' && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <CheckCircle size={16} />
                      Completed
                    </span>
                  )}
                  {phase.status === 'in-progress' && (
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Clock size={16} />
                      In Progress
                    </span>
                  )}
                  {phase.status === 'pending' && (
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Pending
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {phase.topics.map((topic: any, topicIdx: number) => (
                  <div key={topicIdx} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {topic.subjectHi} / {topic.subject}
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
                          {chapter}
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
            <h3 className="text-xl font-bold text-gray-900">Weekly Schedule / साप्ताहिक कार्यक्रम</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Day / दिन</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Morning (6-10 AM)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Afternoon (2-6 PM)</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Evening (7-10 PM)</th>
                </tr>
              </thead>
              <tbody>
                {currentRoadmap.weeklySchedule.map((day: any, idx: number) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900">{day.dayHi}</div>
                      <div className="text-sm text-gray-600">{day.day}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {day.morning}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {day.afternoon}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {day.evening}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Study Tips */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md p-6 border-l-4 border-indigo-600">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-indigo-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">Study Tips / अध्ययन युक्तियाँ</h3>
          </div>
          <ul className="grid md:grid-cols-2 gap-3">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">✓</span>
              <span className="text-gray-700">Study in focused 2-hour blocks with 15-min breaks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">✓</span>
              <span className="text-gray-700">Revise previous day's topics every morning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">✓</span>
              <span className="text-gray-700">Solve at least 50 problems daily</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600">✓</span>
              <span className="text-gray-700">Take one full mock test every week</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
