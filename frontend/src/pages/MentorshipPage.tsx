import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Star, Calendar, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function MentorshipPage() {
  const navigate = useNavigate()
  const [selectedExpertise, setSelectedExpertise] = useState('all')

  const mentors = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      expertise: 'Engineering',
      experience: '15 years',
      rating: 4.9,
      reviews: 127,
      availability: ['Mon', 'Wed', 'Fri'],
      languages: ['Hindi', 'English'],
      specialization: 'IIT JEE, GATE Preparation',
      sessions: 450,
      price: 'Free'
    },
    {
      id: 2,
      name: 'Prof. Priya Sharma',
      expertise: 'Medical',
      experience: '12 years',
      rating: 4.8,
      reviews: 98,
      availability: ['Tue', 'Thu', 'Sat'],
      languages: ['Hindi', 'English'],
      specialization: 'NEET, AIIMS Preparation',
      sessions: 380,
      price: 'Free'
    },
    {
      id: 3,
      name: 'Amit Patel',
      expertise: 'Business',
      experience: '10 years',
      rating: 4.7,
      reviews: 156,
      availability: ['Mon', 'Tue', 'Wed'],
      languages: ['Hindi', 'English', 'Gujarati'],
      specialization: 'MBA, CAT Preparation',
      sessions: 290,
      price: 'Free'
    },
    {
      id: 4,
      name: 'Dr. Sunita Verma',
      expertise: 'Science',
      experience: '18 years',
      rating: 4.9,
      reviews: 203,
      availability: ['Wed', 'Thu', 'Fri'],
      languages: ['Hindi', 'English'],
      specialization: 'UPSC, State PSC',
      sessions: 520,
      price: 'Free'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      expertise: 'Arts',
      experience: '8 years',
      rating: 4.6,
      reviews: 89,
      availability: ['Tue', 'Thu', 'Sat'],
      languages: ['Hindi', 'English'],
      specialization: 'UPSC Optional, Essay Writing',
      sessions: 210,
      price: 'Free'
    },
    {
      id: 6,
      name: 'Neha Gupta',
      expertise: 'Programming',
      experience: '7 years',
      rating: 4.8,
      reviews: 142,
      availability: ['Mon', 'Wed', 'Fri'],
      languages: ['Hindi', 'English'],
      specialization: 'Coding, DSA, Web Development',
      sessions: 310,
      price: 'Free'
    },
    {
      id: 7,
      name: 'Arun Mehta',
      expertise: 'Government',
      experience: '20 years',
      rating: 4.9,
      reviews: 245,
      availability: ['Mon', 'Tue', 'Thu'],
      languages: ['Hindi', 'English'],
      specialization: 'SSC, Banking, Railway Exams',
      sessions: 680,
      price: 'Free'
    },
    {
      id: 8,
      name: 'Kavita Reddy',
      expertise: 'Commerce',
      experience: '11 years',
      rating: 4.7,
      reviews: 118,
      availability: ['Tue', 'Wed', 'Sat'],
      languages: ['Hindi', 'English', 'Telugu'],
      specialization: 'CA, CS, CMA Preparation',
      sessions: 340,
      price: 'Free'
    },
    {
      id: 9,
      name: 'Rahul Joshi',
      expertise: 'Law',
      experience: '9 years',
      rating: 4.6,
      reviews: 76,
      availability: ['Mon', 'Thu', 'Fri'],
      languages: ['Hindi', 'English'],
      specialization: 'CLAT, Judiciary Exams',
      sessions: 190,
      price: 'Free'
    },
    {
      id: 10,
      name: 'Anjali Desai',
      expertise: 'Design',
      experience: '6 years',
      rating: 4.8,
      reviews: 134,
      availability: ['Wed', 'Fri', 'Sat'],
      languages: ['Hindi', 'English'],
      specialization: 'UI/UX, Graphic Design, Portfolio',
      sessions: 260,
      price: 'Free'
    }
  ]

  const filteredMentors = selectedExpertise === 'all' 
    ? mentors 
    : mentors.filter(m => m.expertise === selectedExpertise)

  const handleBookSession = (_mentorId: number) => {
    toast.success('Session booking request sent!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-pink-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <Users size={32} />
                <div>
                  <h1 className="text-xl font-bold"><T>Mentorship Programs</T></h1>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {['all', 'Engineering', 'Medical', 'Business', 'Science', 'Arts', 'Government', 'Commerce', 'Law', 'Design', 'Programming'].map((exp) => (
              <button
                key={exp}
                onClick={() => setSelectedExpertise(exp)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedExpertise === exp ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {exp === 'all' ? <T>All</T> : <T>{exp}</T>}
              </button>
            ))}
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {mentor.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{mentor.experience} <T>experience</T></p>
                  <div className="flex items-center gap-2">
                    <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">
                      <T>{mentor.expertise}</T>
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="font-semibold text-gray-900">{mentor.rating}</span>
                      <span className="text-sm text-gray-600">({mentor.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1"><T>Specialization</T></p>
                  <p className="font-semibold text-gray-900"><T>{mentor.specialization}</T></p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1"><T>Languages</T></p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.languages.map((lang, idx) => (
                      <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-700">
                        <T>{lang}</T>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1"><T>Availability</T></p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.availability.map((day, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                        <T>{day}</T>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{mentor.sessions} <T>sessions completed</T></span>
                  <span className="font-bold text-green-600"><T>{mentor.price}</T></span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleBookSession(mentor.id)}
                  className="bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Calendar size={18} />
                  <T>Book Session</T>
                </button>
                <button
                  onClick={() => toast.success('Message sent!')}
                  className="bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} />
                  <T>Message</T>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
