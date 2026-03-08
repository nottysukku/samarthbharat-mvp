import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, GraduationCap, MapPin, Star, DollarSign, TrendingUp, Bookmark } from 'lucide-react'
import toast from 'react-hot-toast'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function CollegeFinderPage() {
  const navigate = useNavigate()
  const [filterType, setFilterType] = useState('all')

  const colleges = [
    {
      id: 1,
      name: 'IIT Bombay',
      location: 'Mumbai, Maharashtra',
      ranking: 1,
      fees: '₹2,00,000/year',
      placement: '98%',
      courses: ['B.Tech', 'M.Tech', 'PhD'],
      rating: 4.9,
      type: 'IIT'
    },
    {
      id: 2,
      name: 'IIT Delhi',
      location: 'New Delhi',
      ranking: 2,
      fees: '₹2,00,000/year',
      placement: '97%',
      courses: ['B.Tech', 'M.Tech', 'MBA'],
      rating: 4.9,
      type: 'IIT'
    },
    {
      id: 3,
      name: 'AIIMS Delhi',
      location: 'New Delhi',
      ranking: 1,
      fees: '₹5,000/year',
      placement: '100%',
      courses: ['MBBS', 'MD', 'MS'],
      rating: 5.0,
      type: 'Medical'
    },
    {
      id: 4,
      name: 'NIT Trichy',
      location: 'Tiruchirappalli, Tamil Nadu',
      ranking: 8,
      fees: '₹1,50,000/year',
      placement: '95%',
      courses: ['B.Tech', 'M.Tech', 'MCA'],
      rating: 4.7,
      type: 'NIT'
    },
    {
      id: 5,
      name: 'IIM Ahmedabad',
      location: 'Ahmedabad, Gujarat',
      ranking: 1,
      fees: '₹25,00,000/2 years',
      placement: '100%',
      courses: ['MBA', 'PGPX', 'PhD'],
      rating: 4.9,
      type: 'IIM'
    },
    {
      id: 6,
      name: 'Delhi University',
      location: 'New Delhi',
      ranking: 12,
      fees: '₹50,000/year',
      placement: '85%',
      courses: ['BA', 'BSc', 'BCom', 'MA'],
      rating: 4.5,
      type: 'State'
    },
    {
      id: 7,
      name: 'BITS Pilani',
      location: 'Pilani, Rajasthan',
      ranking: 15,
      fees: '₹4,50,000/year',
      placement: '96%',
      courses: ['B.E', 'M.E', 'MBA'],
      rating: 4.8,
      type: 'Private'
    },
    {
      id: 8,
      name: 'Jadavpur University',
      location: 'Kolkata, West Bengal',
      ranking: 18,
      fees: '₹60,000/year',
      placement: '90%',
      courses: ['B.Tech', 'M.Tech', 'MA'],
      rating: 4.6,
      type: 'State'
    },
    {
      id: 9,
      name: 'NIT Surathkal',
      location: 'Mangalore, Karnataka',
      ranking: 10,
      fees: '₹1,50,000/year',
      placement: '94%',
      courses: ['B.Tech', 'M.Tech', 'MBA'],
      rating: 4.7,
      type: 'NIT'
    },
    {
      id: 10,
      name: 'Manipal Institute',
      location: 'Manipal, Karnataka',
      ranking: 25,
      fees: '₹3,50,000/year',
      placement: '88%',
      courses: ['B.Tech', 'MBBS', 'BBA'],
      rating: 4.5,
      type: 'Private'
    },
    {
      id: 11,
      name: 'Anna University',
      location: 'Chennai, Tamil Nadu',
      ranking: 22,
      fees: '₹70,000/year',
      placement: '87%',
      courses: ['B.E', 'M.E', 'MBA'],
      rating: 4.4,
      type: 'State'
    },
    {
      id: 12,
      name: 'VIT Vellore',
      location: 'Vellore, Tamil Nadu',
      ranking: 20,
      fees: '₹1,98,000/year',
      placement: '92%',
      courses: ['B.Tech', 'M.Tech', 'MBA'],
      rating: 4.6,
      type: 'Private'
    },
    {
      id: 13,
      name: 'Pune University',
      location: 'Pune, Maharashtra',
      ranking: 28,
      fees: '₹55,000/year',
      placement: '83%',
      courses: ['BA', 'BSc', 'BCom', 'BBA'],
      rating: 4.3,
      type: 'State'
    },
    {
      id: 14,
      name: 'Amity University',
      location: 'Noida, Uttar Pradesh',
      ranking: 35,
      fees: '₹2,50,000/year',
      placement: '80%',
      courses: ['B.Tech', 'BBA', 'LLB'],
      rating: 4.2,
      type: 'Private'
    },
    {
      id: 15,
      name: 'Jamia Millia Islamia',
      location: 'New Delhi',
      ranking: 30,
      fees: '₹45,000/year',
      placement: '86%',
      courses: ['BA', 'B.Tech', 'MA'],
      rating: 4.4,
      type: 'Central'
    }
  ]

  const filteredColleges = filterType === 'all' 
    ? colleges 
    : colleges.filter(c => c.type === filterType)

  const handleSaveCollege = (_collegeId: number) => {
    toast.success('College saved!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-violet-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <GraduationCap size={32} />
                <div>
                  <h1 className="text-xl font-bold"><T>College Finder</T></h1>
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
            {['all', 'IIT', 'NIT', 'IIM', 'Medical', 'State', 'Private', 'Central'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filterType === type ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <T>{type === 'all' ? 'All' : type}</T>
              </button>
            ))}
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="space-y-6">
          {filteredColleges.map((college) => (
            <div key={college.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{college.name}</h3>
                    <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-semibold">
                      <T>Rank</T> #{college.ranking}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin size={18} />
                    <span><T>{college.location}</T></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 fill-yellow-500" size={18} />
                    <span className="font-semibold text-gray-900">{college.rating}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSaveCollege(college.id)}
                  className="text-violet-600 hover:text-violet-700"
                >
                  <Bookmark size={28} />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="text-green-600" size={20} />
                    <p className="text-sm text-gray-600"><T>Fees</T></p>
                  </div>
                  <p className="font-bold text-gray-900">{college.fees}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="text-blue-600" size={20} />
                    <p className="text-sm text-gray-600"><T>Placement</T></p>
                  </div>
                  <p className="font-bold text-gray-900">{college.placement}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="text-purple-600" size={20} />
                    <p className="text-sm text-gray-600"><T>Type</T></p>
                  </div>
                  <p className="font-bold text-gray-900">{college.type}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2"><T>Courses Offered</T></p>
                <div className="flex flex-wrap gap-2">
                  {college.courses.map((course, idx) => (
                    <span key={idx} className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-700">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-violet-600 text-white py-2 rounded-lg hover:bg-violet-700 transition-colors font-semibold">
                  <T>View Details</T>
                </button>
                <button className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                  <T>Compare</T>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
