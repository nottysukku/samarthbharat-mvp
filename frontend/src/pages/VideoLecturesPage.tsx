import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Video, Play, Users, Clock, Star, ExternalLink } from 'lucide-react'

export default function VideoLecturesPage() {
  const navigate = useNavigate()
  const [selectedSubject, setSelectedSubject] = useState('all')

  const subjects = [
    { id: 'all', name: 'All Subjects', nameHi: 'सभी विषय' },
    { id: 'physics', name: 'Physics', nameHi: 'भौतिकी' },
    { id: 'chemistry', name: 'Chemistry', nameHi: 'रसायन विज्ञान' },
    { id: 'maths', name: 'Mathematics', nameHi: 'गणित' },
    { id: 'biology', name: 'Biology', nameHi: 'जीव विज्ञान' },
  ]

  const channels = [
    {
      id: 1,
      name: 'Physics Wallah',
      nameHi: 'फिजिक्स वाला',
      subject: 'physics',
      subscribers: '9.5M',
      videos: 2500,
      rating: 4.9,
      language: 'Hindi',
      topics: ['JEE', 'NEET', 'Class 11-12'],
      topicsHi: ['जेईई', 'नीट', 'कक्षा 11-12'],
      thumbnail: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Physics+Wallah',
      link: 'https://youtube.com/@PhysicsWallah'
    },
    {
      id: 2,
      name: 'Unacademy JEE',
      nameHi: 'अनएकेडमी जेईई',
      subject: 'maths',
      subscribers: '5.2M',
      videos: 1800,
      rating: 4.8,
      language: 'Hindi + English',
      topics: ['JEE Main', 'JEE Advanced', 'Problem Solving'],
      topicsHi: ['जेईई मेन', 'जेईई एडवांस्ड', 'समस्या समाधान'],
      thumbnail: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Unacademy+JEE',
      link: 'https://youtube.com/@UnacademyJEE'
    },
    {
      id: 3,
      name: 'Vedantu JEE',
      nameHi: 'वेदांतु जेईई',
      subject: 'chemistry',
      subscribers: '4.8M',
      videos: 2200,
      rating: 4.7,
      language: 'Hindi',
      topics: ['Organic Chemistry', 'Inorganic', 'Physical Chemistry'],
      topicsHi: ['कार्बनिक रसायन', 'अकार्बनिक', 'भौतिक रसायन'],
      thumbnail: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=Vedantu+JEE',
      link: 'https://youtube.com/@VedantuJEE'
    },
    {
      id: 4,
      name: 'NEET Wallah',
      nameHi: 'नीट वाला',
      subject: 'biology',
      subscribers: '3.5M',
      videos: 1500,
      rating: 4.8,
      language: 'Hindi',
      topics: ['NEET Biology', 'Botany', 'Zoology'],
      topicsHi: ['नीट जीव विज्ञान', 'वनस्पति विज्ञान', 'प्राणी विज्ञान'],
      thumbnail: 'https://via.placeholder.com/300x200/10b981/ffffff?text=NEET+Wallah',
      link: 'https://youtube.com/@NEETWallah'
    },
    {
      id: 5,
      name: 'Khan Academy India',
      nameHi: 'खान एकेडमी इंडिया',
      subject: 'maths',
      subscribers: '2.1M',
      videos: 3000,
      rating: 4.9,
      language: 'Hindi + English',
      topics: ['Basics', 'Advanced Maths', 'Problem Solving'],
      topicsHi: ['मूल बातें', 'उन्नत गणित', 'समस्या समाधान'],
      thumbnail: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Khan+Academy',
      link: 'https://youtube.com/@KhanAcademyIndia'
    },
    {
      id: 6,
      name: 'Aman Dhattarwal',
      nameHi: 'अमन धत्तरवाल',
      subject: 'all',
      subscribers: '4.2M',
      videos: 800,
      rating: 4.7,
      language: 'Hindi',
      topics: ['Study Tips', 'Motivation', 'Career Guidance'],
      topicsHi: ['अध्ययन युक्तियाँ', 'प्रेरणा', 'करियर मार्गदर्शन'],
      thumbnail: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Aman+Dhattarwal',
      link: 'https://youtube.com/@AmanDhattarwal'
    }
  ]

  const playlists = [
    {
      id: 1,
      title: 'Complete JEE Physics',
      titleHi: 'पूर्ण जेईई भौतिकी',
      channel: 'Physics Wallah',
      videos: 150,
      duration: '200 hours',
      views: '50M'
    },
    {
      id: 2,
      title: 'Organic Chemistry Full Course',
      titleHi: 'कार्बनिक रसायन पूर्ण पाठ्यक्रम',
      channel: 'Vedantu JEE',
      videos: 120,
      duration: '180 hours',
      views: '35M'
    },
    {
      id: 3,
      title: 'NEET Biology Marathon',
      titleHi: 'नीट जीव विज्ञान मैराथन',
      channel: 'NEET Wallah',
      videos: 100,
      duration: '150 hours',
      views: '28M'
    }
  ]

  const filteredChannels = selectedSubject === 'all'
    ? channels
    : channels.filter(c => c.subject === selectedSubject || c.subject === 'all')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-red-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <Video size={32} />
                <div>
                  <h1 className="text-xl font-bold">वीडियो व्याख्यान</h1>
                  <p className="text-sm opacity-90">Video Lectures</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Subject Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Filter by Subject / विषय से फ़िल्टर करें</h2>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedSubject === subject.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {subject.nameHi} / {subject.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Playlists */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Playlists / विशेष प्लेलिस्ट</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="bg-gradient-to-br from-red-600 to-pink-600 text-white rounded-lg shadow-lg p-6">
                <Play className="mb-3" size={32} />
                <h3 className="text-xl font-bold mb-1">{playlist.titleHi}</h3>
                <p className="text-sm opacity-90 mb-4">{playlist.title}</p>
                <div className="space-y-2 text-sm">
                  <p>Channel: {playlist.channel}</p>
                  <p>Videos: {playlist.videos}</p>
                  <p>Duration: {playlist.duration}</p>
                  <p>Views: {playlist.views}</p>
                </div>
                <button className="w-full mt-4 bg-white text-red-600 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center gap-2">
                  <Play size={18} />
                  Watch Now / अभी देखें
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* YouTube Channels */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recommended Channels / अनुशंसित चैनल ({filteredChannels.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChannels.map((channel) => (
              <div key={channel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={channel.thumbnail} alt={channel.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{channel.nameHi}</h3>
                  <p className="text-sm text-gray-600 mb-3">{channel.name}</p>

                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{channel.subscribers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Video size={16} />
                      <span>{channel.videos}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="font-semibold text-gray-900">{channel.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">Language: {channel.language}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {channel.topicsHi.map((topic, idx) => (
                      <span key={idx} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>

                  <a
                    href={channel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={18} />
                    Visit Channel / चैनल पर जाएं
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
