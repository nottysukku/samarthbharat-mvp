import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Play, Users, Star, Search } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function TrainingVideosPage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', name: 'All', nameHi: 'सभी' },
    { id: 'crop', name: 'Crop Management', nameHi: 'फसल प्रबंधन' },
    { id: 'pest', name: 'Pest Control', nameHi: 'कीट नियंत्रण' },
    { id: 'irrigation', name: 'Irrigation', nameHi: 'सिंचाई' },
    { id: 'organic', name: 'Organic Farming', nameHi: 'जैविक खेती' },
  ]

  const videos = [
    {
      id: 1,
      title: 'Modern Wheat Cultivation Techniques',
      titleHi: 'आधुनिक गेहूं की खेती तकनीक',
      category: 'crop',
      duration: '25:30',
      views: 15000,
      rating: 4.8,
      instructor: 'Dr. Rajesh Kumar',
      instructorHi: 'डॉ. राजेश कुमार',
      language: 'Hindi',
      thumbnail: 'https://via.placeholder.com/400x225/4ade80/ffffff?text=Wheat+Cultivation',
      topics: ['Seed selection', 'Sowing techniques', 'Fertilizer application', 'Harvesting'],
      topicsHi: ['बीज चयन', 'बुवाई तकनीक', 'उर्वरक अनुप्रयोग', 'कटाई']
    },
    {
      id: 2,
      title: 'Integrated Pest Management',
      titleHi: 'एकीकृत कीट प्रबंधन',
      category: 'pest',
      duration: '18:45',
      views: 12000,
      rating: 4.6,
      instructor: 'Dr. Priya Sharma',
      instructorHi: 'डॉ. प्रिया शर्मा',
      language: 'Hindi + English',
      thumbnail: 'https://via.placeholder.com/400x225/ef4444/ffffff?text=Pest+Management',
      topics: ['Pest identification', 'Natural pesticides', 'Preventive measures', 'Monitoring'],
      topicsHi: ['कीट पहचान', 'प्राकृतिक कीटनाशक', 'निवारक उपाय', 'निगरानी']
    },
    {
      id: 3,
      title: 'Drip Irrigation System Installation',
      titleHi: 'ड्रिप सिंचाई प्रणाली स्थापना',
      category: 'irrigation',
      duration: '30:15',
      views: 20000,
      rating: 4.9,
      instructor: 'Eng. Amit Patel',
      instructorHi: 'इंजी. अमित पटेल',
      language: 'Hindi',
      thumbnail: 'https://via.placeholder.com/400x225/3b82f6/ffffff?text=Drip+Irrigation',
      topics: ['System design', 'Installation steps', 'Maintenance', 'Cost benefits'],
      topicsHi: ['प्रणाली डिजाइन', 'स्थापना चरण', 'रखरखाव', 'लागत लाभ']
    },
    {
      id: 4,
      title: 'Organic Farming Complete Guide',
      titleHi: 'जैविक खेती पूर्ण गाइड',
      category: 'organic',
      duration: '45:00',
      views: 25000,
      rating: 4.7,
      instructor: 'Dr. Sunita Verma',
      instructorHi: 'डॉ. सुनीता वर्मा',
      language: 'Hindi',
      thumbnail: 'https://via.placeholder.com/400x225/10b981/ffffff?text=Organic+Farming',
      topics: ['Organic certification', 'Composting', 'Natural fertilizers', 'Market access'],
      topicsHi: ['जैविक प्रमाणन', 'कम्पोस्टिंग', 'प्राकृतिक उर्वरक', 'बाजार पहुंच']
    },
    {
      id: 5,
      title: 'Rice Paddy Management',
      titleHi: 'धान प्रबंधन',
      category: 'crop',
      duration: '22:30',
      views: 18000,
      rating: 4.5,
      instructor: 'Dr. Mohan Singh',
      instructorHi: 'डॉ. मोहन सिंह',
      language: 'Hindi',
      thumbnail: 'https://via.placeholder.com/400x225/f59e0b/ffffff?text=Rice+Paddy',
      topics: ['Nursery preparation', 'Transplanting', 'Water management', 'Disease control'],
      topicsHi: ['नर्सरी तैयारी', 'रोपाई', 'जल प्रबंधन', 'रोग नियंत्रण']
    },
    {
      id: 6,
      title: 'Vegetable Farming in Polyhouse',
      titleHi: 'पॉलीहाउस में सब्जी की खेती',
      category: 'crop',
      duration: '35:20',
      views: 22000,
      rating: 4.8,
      instructor: 'Eng. Ravi Kumar',
      instructorHi: 'इंजी. रवि कुमार',
      language: 'Hindi + English',
      thumbnail: 'https://via.placeholder.com/400x225/8b5cf6/ffffff?text=Polyhouse+Farming',
      topics: ['Polyhouse setup', 'Climate control', 'Crop selection', 'Yield optimization'],
      topicsHi: ['पॉलीहाउस सेटअप', 'जलवायु नियंत्रण', 'फसल चयन', 'उपज अनुकूलन']
    }
  ]

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.titleHi.includes(searchQuery)
    return matchesCategory && matchesSearch
  })

  const playlists = [
    {
      id: 1,
      name: 'Beginner Farmer Course',
      nameHi: 'शुरुआती किसान पाठ्यक्रम',
      videos: 12,
      duration: '6 hours',
      enrolled: 5000
    },
    {
      id: 2,
      name: 'Advanced Crop Management',
      nameHi: 'उन्नत फसल प्रबंधन',
      videos: 15,
      duration: '8 hours',
      enrolled: 3000
    },
    {
      id: 3,
      name: 'Organic Farming Certification',
      nameHi: 'जैविक खेती प्रमाणन',
      videos: 10,
      duration: '5 hours',
      enrolled: 2000
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-teal-600 text-white shadow-lg border-b-4 border-orange-500">
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
                  <h1 className="text-xl font-bold">प्रशिक्षण और वीडियो</h1>
                  <p className="text-sm opacity-90">Training & Videos</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search videos / वीडियो खोजें"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.nameHi} / {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Playlists */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Playlists / विशेष प्लेलिस्ट</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow">
                <BookOpen size={32} className="mb-3" />
                <h3 className="text-xl font-bold mb-1">{playlist.nameHi}</h3>
                <p className="text-sm opacity-90 mb-4">{playlist.name}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Videos:</span>
                    <span className="font-semibold">{playlist.videos}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold">{playlist.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Enrolled:</span>
                    <span className="font-semibold">{playlist.enrolled.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-white text-teal-600 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                  Start Learning / सीखना शुरू करें
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            All Videos / सभी वीडियो ({filteredVideos.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="text-white" size={64} />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-semibold">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{video.titleHi}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-1">{video.title}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="text-sm font-semibold text-gray-900">{video.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1">
                      <Users size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-600">{video.views.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-2">
                    <span className="font-semibold">Instructor:</span> {video.instructorHi}
                  </p>
                  <p className="text-xs text-gray-600 mb-3">Language: {video.language}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {video.topicsHi.slice(0, 3).map((topic, idx) => (
                      <span key={idx} className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Play size={16} />
                    Watch Now / अभी देखें
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
