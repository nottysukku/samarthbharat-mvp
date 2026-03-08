import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, MessageSquare, Award, BookOpen, Calendar, FileText, 
  Video, TrendingUp, Users, Briefcase, Target, GraduationCap, Search
} from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function StudentDashboard() {
  const navigate = useNavigate()

  const features = [
    {
      id: 'chat',
      title: 'AI Study Assistant',
      description: 'Get instant study help',
      icon: MessageSquare,
      color: 'bg-blue-600',
      action: () => navigate('/chat/student')
    },
    {
      id: 'scholarships',
      title: 'Scholarship Finder',
      description: 'Find scholarships with deadlines',
      icon: Award,
      color: 'bg-yellow-600',
      action: () => navigate('/scholarships')
    },
    {
      id: 'roadmap',
      title: 'Study Roadmap',
      description: 'Personalized study plan',
      icon: Target,
      color: 'bg-purple-600',
      action: () => navigate('/study-roadmap')
    },
    {
      id: 'resources',
      title: 'Exam Resources',
      description: 'PDFs, videos, practice tests',
      icon: BookOpen,
      color: 'bg-green-600',
      action: () => navigate('/exam-resources')
    },
    {
      id: 'videos',
      title: 'Video Lectures',
      description: 'Curated YouTube playlists',
      icon: Video,
      color: 'bg-red-600',
      action: () => navigate('/video-lectures')
    },
    {
      id: 'calendar',
      title: 'Exam Calendar',
      description: 'Track exam dates & deadlines',
      icon: Calendar,
      color: 'bg-indigo-600',
      action: () => navigate('/exam-calendar')
    },
    {
      id: 'schemes',
      title: 'Education Schemes',
      description: 'Government education programs',
      icon: FileText,
      color: 'bg-orange-600',
      action: () => navigate('/schemes/student')
    },
    {
      id: 'career',
      title: 'Career Guidance',
      description: 'Explore career paths',
      icon: Briefcase,
      color: 'bg-teal-600',
      action: () => navigate('/career-guidance')
    },
    {
      id: 'skills',
      title: 'Skill Development',
      description: 'Free certification courses',
      icon: TrendingUp,
      color: 'bg-cyan-600',
      action: () => navigate('/skill-development')
    },
    {
      id: 'mentorship',
      title: 'Mentorship Programs',
      description: 'Connect with mentors',
      icon: Users,
      color: 'bg-pink-600',
      action: () => navigate('/mentorship')
    },
    {
      id: 'colleges',
      title: 'College Finder',
      description: 'Find best colleges',
      icon: GraduationCap,
      color: 'bg-violet-600',
      action: () => navigate('/college-finder')
    },
    {
      id: 'jobs',
      title: 'Job Search',
      description: 'Entry-level job opportunities',
      icon: Search,
      color: 'bg-emerald-600',
      action: () => navigate('/job-search')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 page-enter">
      <div className="gov-header"></div>

      {/* Header */}
      <header className="bg-blue-700 text-white shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium"><T>Back</T></span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl">📚</span>
                <div>
                  <h1 className="text-xl font-bold"><T>Student Dashboard</T></h1>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            <T>Welcome Student!</T>
          </h2>
          <p className="text-gray-600">
            <T>Access scholarships, study materials, exam resources, career guidance, and more in one place.</T>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 stagger-children">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={feature.action}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:-translate-y-1 text-left group card-hover"
            >
              <div className={`absolute inset-0 ${feature.color} opacity-90 group-hover:opacity-95 transition-opacity`}></div>
              <div className="relative z-10 p-6 text-white">
                <feature.icon className="mb-4" size={40} />
                <h3 className="text-lg font-bold mb-1"><T>{feature.title}</T></h3>
                <p className="text-sm opacity-90"><T>{feature.description}</T></p>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-yellow-600">
            <h4 className="text-sm text-gray-600 mb-1"><T>Active Scholarships</T></h4>
            <p className="text-2xl font-bold text-gray-900">45</p>
            <p className="text-sm text-gray-600"><T>Deadline within 30 days</T></p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
            <h4 className="text-sm text-gray-600 mb-1"><T>Study Resources</T></h4>
            <p className="text-2xl font-bold text-gray-900">500+</p>
            <p className="text-sm text-gray-600"><T>PDFs, Videos, Tests</T></p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
            <h4 className="text-sm text-gray-600 mb-1"><T>Career Paths</T></h4>
            <p className="text-2xl font-bold text-gray-900">100+</p>
            <p className="text-sm text-gray-600"><T>Explore opportunities</T></p>
          </div>
        </div>
      </main>
    </div>
  )
}
