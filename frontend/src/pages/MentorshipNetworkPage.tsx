import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, Briefcase, Star, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function MentorshipNetworkPage() {
  const navigate = useNavigate()
  const [selectedExpertise, setSelectedExpertise] = useState('all')

  const mentors = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      nameHi: 'राजेश कुमार',
      expertise: 'Technology',
      expertiseHi: 'प्रौद्योगिकी',
      title: 'Ex-CTO, Flipkart',
      titleHi: 'पूर्व-सीटीओ, फ्लिपकार्ट',
      experience: '20+ years',
      experienceHi: '20+ वर्ष',
      specialization: ['Product Development', 'Team Building', 'Scaling'],
      specializationHi: ['उत्पाद विकास', 'टीम निर्माण', 'स्केलिंग'],
      availability: 'Weekends',
      availabilityHi: 'सप्ताहांत',
      rating: 4.9,
      sessions: 150,
      email: 'rajesh.k@mentor.com',
      color: 'bg-blue-600'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      nameHi: 'प्रिया शर्मा',
      expertise: 'Marketing',
      expertiseHi: 'मार्केटिंग',
      title: 'Marketing Head, Zomato',
      titleHi: 'मार्केटिंग हेड, जोमैटो',
      experience: '15+ years',
      experienceHi: '15+ वर्ष',
      specialization: ['Digital Marketing', 'Brand Building', 'Growth Hacking'],
      specializationHi: ['डिजिटल मार्केटिंग', 'ब्रांड निर्माण', 'ग्रोथ हैकिंग'],
      availability: 'Evenings',
      availabilityHi: 'शाम',
      rating: 4.8,
      sessions: 120,
      email: 'priya.s@mentor.com',
      color: 'bg-pink-600'
    },
    {
      id: 3,
      name: 'Amit Patel',
      nameHi: 'अमित पटेल',
      expertise: 'Finance',
      expertiseHi: 'वित्त',
      title: 'CFO, Paytm',
      titleHi: 'सीएफओ, पेटीएम',
      experience: '18+ years',
      experienceHi: '18+ वर्ष',
      specialization: ['Fundraising', 'Financial Planning', 'Investor Relations'],
      specializationHi: ['फंडरेजिंग', 'वित्तीय योजना', 'निवेशक संबंध'],
      availability: 'Flexible',
      availabilityHi: 'लचीला',
      rating: 4.9,
      sessions: 180,
      email: 'amit.p@mentor.com',
      color: 'bg-green-600'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      nameHi: 'स्नेहा रेड्डी',
      expertise: 'Operations',
      expertiseHi: 'संचालन',
      title: 'COO, Swiggy',
      titleHi: 'सीओओ, स्विगी',
      experience: '12+ years',
      experienceHi: '12+ वर्ष',
      specialization: ['Supply Chain', 'Process Optimization', 'Logistics'],
      specializationHi: ['आपूर्ति श्रृंखला', 'प्रक्रिया अनुकूलन', 'लॉजिस्टिक्स'],
      availability: 'Weekdays',
      availabilityHi: 'सप्ताह के दिन',
      rating: 4.7,
      sessions: 95,
      email: 'sneha.r@mentor.com',
      color: 'bg-orange-600'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      nameHi: 'विक्रम सिंह',
      expertise: 'Legal',
      expertiseHi: 'कानूनी',
      title: 'Corporate Lawyer',
      titleHi: 'कॉर्पोरेट वकील',
      experience: '16+ years',
      experienceHi: '16+ वर्ष',
      specialization: ['Startup Law', 'Contracts', 'IP Rights'],
      specializationHi: ['स्टार्टअप कानून', 'अनुबंध', 'आईपी अधिकार'],
      availability: 'Weekends',
      availabilityHi: 'सप्ताहांत',
      rating: 4.8,
      sessions: 110,
      email: 'vikram.s@mentor.com',
      color: 'bg-purple-600'
    },
    {
      id: 6,
      name: 'Ananya Gupta',
      nameHi: 'अनन्या गुप्ता',
      expertise: 'HR',
      expertiseHi: 'एचआर',
      title: 'CHRO, Ola',
      titleHi: 'सीएचआरओ, ओला',
      experience: '14+ years',
      experienceHi: '14+ वर्ष',
      specialization: ['Talent Acquisition', 'Culture Building', 'Retention'],
      specializationHi: ['प्रतिभा अधिग्रहण', 'संस्कृति निर्माण', 'प्रतिधारण'],
      availability: 'Evenings',
      availabilityHi: 'शाम',
      rating: 4.9,
      sessions: 140,
      email: 'ananya.g@mentor.com',
      color: 'bg-indigo-600'
    }
  ]

  const expertiseAreas = ['all', 'Technology', 'Marketing', 'Finance', 'Operations', 'Legal', 'HR']

  const filteredMentors = selectedExpertise === 'all' 
    ? mentors 
    : mentors.filter(m => m.expertise === selectedExpertise)

  const handleConnect = (mentor: any) => {
    toast.success(`Request sent to ${mentor.name}!`)
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
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <Users size={32} />
                <div>
                  <h1 className="text-xl font-bold">मेंटरशिप नेटवर्क</h1>
                  <p className="text-sm opacity-90">Mentorship Network</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Filter by Expertise / विशेषज्ञता के अनुसार फ़िल्टर करें
          </label>
          <select
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="all">All Expertise / सभी विशेषज्ञता</option>
            {expertiseAreas.slice(1).map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`${mentor.color} p-4 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                    {mentor.name.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="fill-yellow-300 text-yellow-300" size={16} />
                    <span className="font-bold">{mentor.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{mentor.nameHi}</h3>
                <p className="text-sm opacity-90">{mentor.name}</p>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase size={18} className="text-gray-600" />
                    <p className="font-semibold text-gray-900">{mentor.titleHi}</p>
                  </div>
                  <p className="text-sm text-gray-600">{mentor.title}</p>
                </div>

                <div className="mb-4">
                  <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {mentor.expertiseHi}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">{mentor.experienceHi}</span>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Specialization / विशेषज्ञता:</p>
                  <div className="flex flex-wrap gap-1">
                    {mentor.specializationHi.map((spec, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-600">Availability</p>
                    <p className="font-semibold text-gray-900">{mentor.availabilityHi}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Sessions</p>
                    <p className="font-semibold text-gray-900">{mentor.sessions}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleConnect(mentor)}
                  className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} />
                  Connect / कनेक्ट करें
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
