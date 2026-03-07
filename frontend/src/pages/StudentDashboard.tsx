import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, MessageSquare, Award, BookOpen, Calendar, FileText, 
  Video, TrendingUp, Users, Briefcase, Target, GraduationCap, Search
} from 'lucide-react'

export default function StudentDashboard() {
  const navigate = useNavigate()

  const features = [
    {
      id: 'chat',
      title: 'AI Study Assistant',
      titleHi: 'एआई अध्ययन सहायक',
      description: 'Get instant study help',
      descriptionHi: 'तत्काल अध्ययन सहायता प्राप्त करें',
      icon: MessageSquare,
      color: 'bg-blue-600',
      action: () => navigate('/chat/student')
    },
    {
      id: 'scholarships',
      title: 'Scholarship Finder',
      titleHi: 'छात्रवृत्ति खोजक',
      description: 'Find scholarships with deadlines',
      descriptionHi: 'समय सीमा के साथ छात्रवृत्ति खोजें',
      icon: Award,
      color: 'bg-yellow-600',
      action: () => navigate('/scholarships')
    },
    {
      id: 'roadmap',
      title: 'Study Roadmap',
      titleHi: 'अध्ययन रोडमैप',
      description: 'Personalized study plan',
      descriptionHi: 'व्यक्तिगत अध्ययन योजना',
      icon: Target,
      color: 'bg-purple-600',
      action: () => navigate('/study-roadmap')
    },
    {
      id: 'resources',
      title: 'Exam Resources',
      titleHi: 'परीक्षा संसाधन',
      description: 'PDFs, videos, practice tests',
      descriptionHi: 'पीडीएफ, वीडियो, अभ्यास परीक्षण',
      icon: BookOpen,
      color: 'bg-green-600',
      action: () => navigate('/exam-resources')
    },
    {
      id: 'videos',
      title: 'Video Lectures',
      titleHi: 'वीडियो व्याख्यान',
      description: 'Curated YouTube playlists',
      descriptionHi: 'क्यूरेटेड यूट्यूब प्लेलिस्ट',
      icon: Video,
      color: 'bg-red-600',
      action: () => navigate('/video-lectures')
    },
    {
      id: 'calendar',
      title: 'Exam Calendar',
      titleHi: 'परीक्षा कैलेंडर',
      description: 'Track exam dates & deadlines',
      descriptionHi: 'परीक्षा तिथियां और समय सीमा ट्रैक करें',
      icon: Calendar,
      color: 'bg-indigo-600',
      action: () => navigate('/exam-calendar')
    },
    {
      id: 'schemes',
      title: 'Education Schemes',
      titleHi: 'शिक्षा योजनाएं',
      description: 'Government education programs',
      descriptionHi: 'सरकारी शिक्षा कार्यक्रम',
      icon: FileText,
      color: 'bg-orange-600',
      action: () => navigate('/schemes/student')
    },
    {
      id: 'career',
      title: 'Career Guidance',
      titleHi: 'करियर मार्गदर्शन',
      description: 'Explore career paths',
      descriptionHi: 'करियर पथ तलाशें',
      icon: Briefcase,
      color: 'bg-teal-600',
      action: () => navigate('/career-guidance')
    },
    {
      id: 'skills',
      title: 'Skill Development',
      titleHi: 'कौशल विकास',
      description: 'Free certification courses',
      descriptionHi: 'मुफ्त प्रमाणन पाठ्यक्रम',
      icon: TrendingUp,
      color: 'bg-cyan-600',
      action: () => navigate('/skill-development')
    },
    {
      id: 'mentorship',
      title: 'Mentorship Programs',
      titleHi: 'मेंटरशिप कार्यक्रम',
      description: 'Connect with mentors',
      descriptionHi: 'मेंटर्स से जुड़ें',
      icon: Users,
      color: 'bg-pink-600',
      action: () => navigate('/mentorship')
    },
    {
      id: 'colleges',
      title: 'College Finder',
      titleHi: 'कॉलेज खोजक',
      description: 'Find best colleges',
      descriptionHi: 'सर्वश्रेष्ठ कॉलेज खोजें',
      icon: GraduationCap,
      color: 'bg-violet-600',
      action: () => navigate('/college-finder')
    },
    {
      id: 'jobs',
      title: 'Job Search',
      titleHi: 'नौकरी खोज',
      description: 'Entry-level job opportunities',
      descriptionHi: 'प्रवेश स्तर की नौकरी के अवसर',
      icon: Search,
      color: 'bg-emerald-600',
      action: () => navigate('/job-search')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
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
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl">📚</span>
                <div>
                  <h1 className="text-xl font-bold">छात्र डैशबोर्ड</h1>
                  <p className="text-sm opacity-90">Student Dashboard</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            नमस्ते छात्र! Welcome Student!
          </h2>
          <p className="text-gray-600">
            Access scholarships, study materials, exam resources, career guidance, and more in one place.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={feature.action}
              className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 text-left group"
            >
              <div className={`absolute inset-0 ${feature.color} opacity-90 group-hover:opacity-95 transition-opacity`}></div>
              <div className="relative z-10 p-6 text-white">
                <feature.icon className="mb-4" size={40} />
                <h3 className="text-lg font-bold mb-1">{feature.titleHi}</h3>
                <p className="text-sm opacity-90 mb-2">{feature.title}</p>
                <p className="text-xs opacity-75">{feature.descriptionHi}</p>
                <p className="text-xs opacity-75">{feature.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-yellow-600">
            <h4 className="text-sm text-gray-600 mb-1">Active Scholarships</h4>
            <p className="text-2xl font-bold text-gray-900">45</p>
            <p className="text-sm text-gray-600">Deadline within 30 days</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-600">
            <h4 className="text-sm text-gray-600 mb-1">Study Resources</h4>
            <p className="text-2xl font-bold text-gray-900">500+</p>
            <p className="text-sm text-gray-600">PDFs, Videos, Tests</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-600">
            <h4 className="text-sm text-gray-600 mb-1">Career Paths</h4>
            <p className="text-2xl font-bold text-gray-900">100+</p>
            <p className="text-sm text-gray-600">Explore opportunities</p>
          </div>
        </div>
      </main>
    </div>
  )
}
