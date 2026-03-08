import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Users, Clock, IndianRupee, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function NetworkingEventsPage() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState('all')

  const events = [
    {
      id: 1,
      name: 'Startup Grind Bangalore',
      type: 'Networking',
      date: '15 Jan 2024',
      time: '6:00 PM - 9:00 PM',
      location: 'Bangalore',
      venue: '91Springboard, Koramangala',
      attendees: 150,
      cost: 'Free',
      description: 'Monthly networking event for entrepreneurs',
      url: '#',
      color: 'bg-blue-600'
    },
    {
      id: 2,
      name: 'TechSparks 2024',
      type: 'Conference',
      date: '20-22 Jan 2024',
      time: '9:00 AM - 6:00 PM',
      location: 'Mumbai',
      venue: 'Jio World Convention Centre',
      attendees: 5000,
      cost: '₹5,000',
      description: 'India\'s largest startup conference',
      url: '#',
      color: 'bg-purple-600'
    },
    {
      id: 3,
      name: 'Investor Connect Delhi',
      type: 'Pitch Event',
      date: '25 Jan 2024',
      time: '2:00 PM - 6:00 PM',
      location: 'Delhi',
      venue: 'India Habitat Centre',
      attendees: 200,
      cost: '₹1,000',
      description: 'Pitch to angel investors and VCs',
      url: '#',
      color: 'bg-green-600'
    },
    {
      id: 4,
      name: 'Women Entrepreneurs Meetup',
      type: 'Networking',
      date: '28 Jan 2024',
      time: '5:00 PM - 8:00 PM',
      location: 'Hyderabad',
      venue: 'T-Hub',
      attendees: 100,
      cost: 'Free',
      description: 'Networking for women entrepreneurs',
      url: '#',
      color: 'bg-pink-600'
    },
    {
      id: 5,
      name: 'Product Demo Day',
      type: 'Demo Day',
      date: '30 Jan 2024',
      time: '3:00 PM - 7:00 PM',
      location: 'Pune',
      venue: 'Venture Center',
      attendees: 80,
      cost: 'Free',
      description: 'Showcase your product to investors',
      url: '#',
      color: 'bg-orange-600'
    },
    {
      id: 6,
      name: 'Startup Weekend',
      type: 'Workshop',
      date: '2-4 Feb 2024',
      time: 'Full Day',
      location: 'Chennai',
      venue: 'IIT Madras Research Park',
      attendees: 120,
      cost: '₹2,000',
      description: '54-hour startup building event',
      url: '#',
      color: 'bg-indigo-600'
    }
  ]

  const eventTypes = ['all', 'Networking', 'Conference', 'Pitch Event', 'Demo Day', 'Workshop']

  const filteredEvents = selectedType === 'all' 
    ? events 
    : events.filter(e => e.type === selectedType)

  const handleRegister = (event: any) => {
    toast.success(`Registered for ${event.name}!`)
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
                <Calendar size={32} />
                <div>
                  <h1 className="text-xl font-bold"><T>Networking Events</T></h1>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {eventTypes.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedType === type ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? <T>All Events</T> : <T>{type}</T>}
              </button>
            ))}
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className={`${event.color} text-white rounded-lg shadow-lg overflow-hidden`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1"><T>{event.name}</T></h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                      <T>{event.type}</T>
                    </span>
                  </div>
                  <Calendar size={40} className="opacity-75" />
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <div>
                      <p className="text-xs opacity-75"><T>Date</T></p>
                      <p className="text-sm font-semibold">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <div>
                      <p className="text-xs opacity-75"><T>Time</T></p>
                      <p className="text-sm font-semibold">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <IndianRupee size={18} />
                    <div>
                      <p className="text-xs opacity-75"><T>Cost</T></p>
                      <p className="text-sm font-semibold"><T>{event.cost}</T></p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin size={16} />
                      <p className="text-sm font-semibold"><T>Location</T></p>
                    </div>
                    <p className="text-sm"><T>{event.location}</T></p>
                    <p className="text-xs opacity-75"><T>{event.venue}</T></p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Users size={16} />
                      <p className="text-sm font-semibold"><T>Expected Attendees</T></p>
                    </div>
                    <p className="text-sm">{event.attendees}+ <T>participants</T></p>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <p className="font-semibold text-sm mb-1"><T>{event.description}</T></p>
                </div>

                <button
                  onClick={() => handleRegister(event)}
                  className="w-full bg-white text-gray-900 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold flex items-center justify-center gap-2"
                >
                  <ExternalLink size={20} />
                  <T>Register Now</T>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
