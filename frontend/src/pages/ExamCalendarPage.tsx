import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Bell, Download, ExternalLink } from 'lucide-react'

export default function ExamCalendarPage() {
  const navigate = useNavigate()
  const [selectedMonth, setSelectedMonth] = useState('jan')

  const months = [
    { id: 'jan', name: 'January', nameHi: 'जनवरी' },
    { id: 'feb', name: 'February', nameHi: 'फरवरी' },
    { id: 'mar', name: 'March', nameHi: 'मार्च' },
    { id: 'apr', name: 'April', nameHi: 'अप्रैल' },
  ]

  const exams: any = {
    jan: [
      {
        id: 1,
        name: 'JEE Main Session 1',
        nameHi: 'जेईई मेन सत्र 1',
        date: '24-31 Jan 2024',
        type: 'Engineering',
        typeHi: 'इंजीनियरिंग',
        applicationStart: '01 Dec 2023',
        applicationEnd: '31 Dec 2023',
        admitCard: '15 Jan 2024',
        result: '15 Feb 2024',
        website: 'https://jeemain.nta.nic.in',
        status: 'Upcoming',
        statusHi: 'आगामी'
      },
      {
        id: 2,
        name: 'NEET UG',
        nameHi: 'नीट यूजी',
        date: '28 Jan 2024',
        type: 'Medical',
        typeHi: 'चिकित्सा',
        applicationStart: '01 Dec 2023',
        applicationEnd: '20 Jan 2024',
        admitCard: '20 Jan 2024',
        result: '28 Feb 2024',
        website: 'https://neet.nta.nic.in',
        status: 'Registration Open',
        statusHi: 'पंजीकरण खुला'
      }
    ],
    feb: [
      {
        id: 3,
        name: 'UPSC Prelims',
        nameHi: 'यूपीएससी प्रारंभिक',
        date: '18 Feb 2024',
        type: 'Civil Services',
        typeHi: 'सिविल सेवा',
        applicationStart: '01 Jan 2024',
        applicationEnd: '31 Jan 2024',
        admitCard: '10 Feb 2024',
        result: '30 Mar 2024',
        website: 'https://upsc.gov.in',
        status: 'Upcoming',
        statusHi: 'आगामी'
      }
    ]
  }

  const currentExams = exams[selectedMonth] || []

  const upcomingDeadlines = [
    { exam: 'JEE Main', examHi: 'जेईई मेन', deadline: 'Application closes in 5 days', deadlineHi: 'आवेदन 5 दिनों में बंद' },
    { exam: 'NEET UG', examHi: 'नीट यूजी', deadline: 'Admit card in 3 days', deadlineHi: 'प्रवेश पत्र 3 दिनों में' },
    { exam: 'UPSC CSE', examHi: 'यूपीएससी सीएसई', deadline: 'Exam in 15 days', deadlineHi: 'परीक्षा 15 दिनों में' },
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
                <Calendar size={32} />
                <div>
                  <h1 className="text-xl font-bold">परीक्षा कैलेंडर</h1>
                  <p className="text-sm opacity-90">Exam Calendar</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Upcoming Deadlines */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={24} />
            <h2 className="text-2xl font-bold">Urgent Deadlines / तत्काल समय सीमा</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {upcomingDeadlines.map((item, idx) => (
              <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="font-bold text-lg mb-1">{item.examHi}</p>
                <p className="text-sm opacity-90 mb-2">{item.exam}</p>
                <p className="text-sm font-semibold">{item.deadlineHi}</p>
                <p className="text-xs opacity-75">{item.deadline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Month Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Month / महीना चुनें</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {months.map((month) => (
              <button
                key={month.id}
                onClick={() => setSelectedMonth(month.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMonth === month.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <p className="font-bold text-gray-900">{month.nameHi}</p>
                <p className="text-sm text-gray-600">{month.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Exams List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Exams in {months.find(m => m.id === selectedMonth)?.nameHi} ({currentExams.length})
          </h2>
          <div className="space-y-6">
            {currentExams.map((exam: any) => (
              <div key={exam.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{exam.nameHi}</h3>
                    <p className="text-lg text-gray-700 mb-2">{exam.name}</p>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {exam.typeHi}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      exam.status === 'Registration Open'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {exam.statusHi}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="text-indigo-600" size={20} />
                      <p className="font-semibold text-gray-900">Exam Date / परीक्षा तिथि</p>
                    </div>
                    <p className="text-gray-700">{exam.date}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="text-indigo-600" size={20} />
                      <p className="font-semibold text-gray-900">Application Period / आवेदन अवधि</p>
                    </div>
                    <p className="text-sm text-gray-700">{exam.applicationStart} to {exam.applicationEnd}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Admit Card / प्रवेश पत्र</p>
                    <p className="font-semibold text-gray-900">{exam.admitCard}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Result Date / परिणाम तिथि</p>
                    <p className="font-semibold text-gray-900">{exam.result}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Bell size={18} />
                    Set Reminder / रिमाइंडर सेट करें
                  </button>
                  <a
                    href={exam.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={18} />
                    Official Website
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Calendar */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md p-6 border-l-4 border-indigo-600">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Download Full Calendar / पूर्ण कैलेंडर डाउनलोड करें</h3>
              <p className="text-gray-600">Get the complete exam calendar for 2024 with all important dates</p>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2">
              <Download size={20} />
              Download PDF
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
