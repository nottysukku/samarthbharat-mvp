import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, Play, Award, Clock, BarChart } from 'lucide-react'
import toast from 'react-hot-toast'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function SkillDevelopmentPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const courses = [
    {
      id: 1,
      title: 'Python Programming',
      titleHi: 'पायथन प्रोग्रामिंग',
      platform: 'SWAYAM',
      duration: '12 weeks',
      level: 'Beginner',
      levelHi: 'शुरुआती',
      certification: true,
      progress: 45,
      enrolled: true,
      instructor: 'IIT Madras',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      titleHi: 'डेटा संरचना और एल्गोरिदम',
      platform: 'NPTEL',
      duration: '8 weeks',
      level: 'Intermediate',
      levelHi: 'मध्यवर्ती',
      certification: true,
      progress: 0,
      enrolled: false,
      instructor: 'IIT Delhi',
      rating: 4.9
    },
    {
      id: 3,
      title: 'Digital Marketing',
      titleHi: 'डिजिटल मार्केटिंग',
      platform: 'Google Digital Garage',
      duration: '6 weeks',
      level: 'Beginner',
      levelHi: 'शुरुआती',
      certification: true,
      progress: 100,
      enrolled: true,
      instructor: 'Google',
      rating: 4.7
    },
    {
      id: 4,
      title: 'Web Development',
      titleHi: 'वेब डेवलपमेंट',
      platform: 'Coursera',
      duration: '10 weeks',
      level: 'Beginner',
      levelHi: 'शुरुआती',
      certification: true,
      progress: 20,
      enrolled: true,
      instructor: 'University of Michigan',
      rating: 4.6
    },
    {
      id: 5,
      title: 'Machine Learning',
      titleHi: 'मशीन लर्निंग',
      platform: 'NPTEL',
      duration: '12 weeks',
      level: 'Advanced',
      levelHi: 'उन्नत',
      certification: true,
      progress: 0,
      enrolled: false,
      instructor: 'IIT Kharagpur',
      rating: 4.9
    },
    {
      id: 6,
      title: 'Android App Development',
      titleHi: 'एंड्रॉइड ऐप डेवलपमेंट',
      platform: 'Udacity',
      duration: '4 months',
      level: 'Intermediate',
      levelHi: 'मध्यवर्ती',
      certification: true,
      progress: 0,
      enrolled: false,
      instructor: 'Google',
      rating: 4.5
    },
    {
      id: 7,
      title: 'Financial Accounting',
      titleHi: 'वित्तीय लेखांकन',
      platform: 'SWAYAM',
      duration: '8 weeks',
      level: 'Beginner',
      levelHi: 'शुरुआती',
      certification: true,
      progress: 0,
      enrolled: false,
      instructor: 'IIM Bangalore',
      rating: 4.7
    },
    {
      id: 8,
      title: 'Graphic Design',
      titleHi: 'ग्राफिक डिजाइन',
      platform: 'Canva Design School',
      duration: '6 weeks',
      level: 'Beginner',
      levelHi: 'शुरुआती',
      certification: true,
      progress: 0,
      enrolled: false,
      instructor: 'Canva',
      rating: 4.6
    },
    {
      id: 9,
      title: 'Cloud Computing',
      titleHi: 'क्लाउड कंप्यूटिंग',
      platform: 'AWS Training',
      duration: '10 weeks',
      level: 'Intermediate',
      levelHi: 'मध्यवर्ती',
      certification: true,
      progress: 0,
      enrolled: false,
      instructor: 'Amazon',
      rating: 4.8
    },
    {
      id: 10,
      title: 'Business Communication',
      titleHi: 'व्यावसायिक संचार',
      platform: 'SWAYAM',
      duration: '6 weeks',
      level: 'Beginner',
      levelHi: 'शुरुआती',
      certification: true,
      progress: 0,
      enrolled: false,
      instructor: 'IIT Kanpur',
      rating: 4.5
    },
    {
      id: 11,
      title: 'Cyber Security',
      titleHi: 'साइबर सुरक्षा',
      platform: 'NPTEL',
      duration: '12 weeks',
      level: 'Advanced',
      levelHi: 'उन्नत',
      certification: true,
      progress: 0,
      enrolled: false,
      instructor: 'IIT Bombay',
      rating: 4.9
    },
    {
      id: 12,
      title: 'Excel for Business',
      titleHi: 'व्यवसाय के लिए एक्सेल',
      platform: 'Microsoft Learn',
      duration: '4 weeks',
      level: 'Beginner',
      levelHi: 'शुरुआती',
      certification: true,
      progress: 0,
      enrolled: false,
      instructor: 'Microsoft',
      rating: 4.6
    },
    {
      id: 13,
      title: 'Artificial Intelligence',
      titleHi: 'कृत्रिम बुद्धिमत्ता',
      platform: 'edX',
      duration: '16 weeks',
      level: 'Advanced',
      levelHi: 'उन्नत',
      certification: true,
      progress: 0,
      enrolled: false,
      instructor: 'MIT',
      rating: 4.9
    },
    {
      id: 14,
      title: 'Entrepreneurship',
      titleHi: 'उद्यमिता',
      platform: 'SWAYAM',
      duration: '8 weeks',
      level: 'Beginner',
      levelHi: 'शुरुआती',
      certification: true,
      progress: 0,
      enrolled: false,
      instructor: 'IIM Ahmedabad',
      rating: 4.7
    },
    {
      id: 15,
      title: 'Public Speaking',
      titleHi: 'सार्वजनिक भाषण',
      platform: 'Coursera',
      duration: '6 weeks',
      level: 'Beginner',
      levelHi: 'शुरुआती',
      certification: true,
      progress: 0,
      enrolled: false,
      instructor: 'University of Washington',
      rating: 4.8
    }
  ]

  const filteredCourses = filter === 'all' 
    ? courses 
    : filter === 'enrolled'
    ? courses.filter(c => c.enrolled)
    : courses.filter(c => c.level === filter)

  const handleEnroll = (_courseId: number) => {
    toast.success('Enrolled successfully! / सफलतापूर्वक नामांकित!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-cyan-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <TrendingUp size={32} />
                <div>
                  <h1 className="text-xl font-bold">कौशल विकास</h1>
                  <p className="text-sm opacity-90">Skill Development</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'all' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Courses / सभी पाठ्यक्रम
            </button>
            <button
              onClick={() => setFilter('enrolled')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'enrolled' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              My Courses / मेरे पाठ्यक्रम
            </button>
            <button
              onClick={() => setFilter('Beginner')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'Beginner' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Beginner / शुरुआती
            </button>
            <button
              onClick={() => setFilter('Intermediate')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'Intermediate' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Intermediate / मध्यवर्ती
            </button>
            <button
              onClick={() => setFilter('Advanced')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'Advanced' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Advanced / उन्नत
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 text-white">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{course.titleHi}</h3>
                    <p className="text-sm opacity-90">{course.title}</p>
                  </div>
                  {course.certification && (
                    <Award className="flex-shrink-0" size={24} />
                  )}
                </div>
                <p className="text-sm font-semibold">{course.platform}</p>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.levelHi}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Instructor / प्रशिक्षक</p>
                  <p className="font-semibold text-gray-900">{course.instructor}</p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-500">
                    {'★'.repeat(Math.floor(course.rating))}
                  </div>
                  <span className="text-sm text-gray-600">{course.rating}</span>
                </div>

                {course.enrolled && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700">Progress / प्रगति</span>
                      <span className="text-sm font-bold text-cyan-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-cyan-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleEnroll(course.id)}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    course.enrolled
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-cyan-600 text-white hover:bg-cyan-700'
                  }`}
                >
                  {course.enrolled ? (
                    <>
                      <Play size={18} />
                      Continue Learning / जारी रखें
                    </>
                  ) : (
                    <>
                      <Award size={18} />
                      Enroll Now / अभी नामांकन करें
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-cyan-600">
            <div className="flex items-center gap-3 mb-2">
              <BarChart className="text-cyan-600" size={32} />
              <div>
                <h4 className="text-sm text-gray-600">Enrolled Courses</h4>
                <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.enrolled).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
            <div className="flex items-center gap-3 mb-2">
              <Award className="text-green-600" size={32} />
              <div>
                <h4 className="text-sm text-gray-600">Certificates Earned</h4>
                <p className="text-2xl font-bold text-gray-900">{courses.filter(c => c.progress === 100).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-purple-600" size={32} />
              <div>
                <h4 className="text-sm text-gray-600">Avg Progress</h4>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(courses.filter(c => c.enrolled).reduce((sum, c) => sum + c.progress, 0) / courses.filter(c => c.enrolled).length)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
