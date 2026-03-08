import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Building, MapPin, Calendar, ExternalLink, Phone, Mail } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function IncubatorsPage() {
  const navigate = useNavigate()
  const [selectedCity, setSelectedCity] = useState('all')

  const incubators = [
    {
      id: 1,
      name: 'T-Hub',
      city: 'Hyderabad',
      type: 'Technology',
      focus: ['AI/ML', 'IoT', 'FinTech', 'HealthTech'],
      support: ['Mentorship', 'Funding', 'Office space', 'Networking'],
      duration: '6-12 months',
      phone: '+91-40-1234-5678',
      email: 'apply@t-hub.co',
      website: 'https://t-hub.co',
      color: 'bg-blue-600'
    },
    {
      id: 2,
      name: 'NASSCOM 10000 Startups',
      city: 'Bangalore',
      type: 'Technology',
      focus: ['SaaS', 'Mobile', 'Cloud', 'Analytics'],
      support: ['Mentorship', 'Market access', 'Funding', 'Training'],
      duration: '3-6 months',
      phone: '+91-80-2345-6789',
      email: 'startups@nasscom.in',
      website: 'https://10000startups.com',
      color: 'bg-purple-600'
    },
    {
      id: 3,
      name: 'Atal Incubation Centre',
      city: 'Delhi',
      type: 'Government',
      focus: ['Manufacturing', 'Agriculture', 'Healthcare', 'Education'],
      support: ['Seed funding', 'Infrastructure', 'Mentorship', 'Legal support'],
      duration: '12-18 months',
      phone: '+91-11-3456-7890',
      email: 'aic@niti.gov.in',
      website: 'https://aim.gov.in',
      color: 'bg-orange-600'
    },
    {
      id: 4,
      name: 'IIT Bombay SINE',
      city: 'Mumbai',
      type: 'Academic',
      focus: ['Deep tech', 'Hardware', 'Biotech', 'CleanTech'],
      support: ['Lab access', 'Funding', 'Faculty mentors', 'Prototyping'],
      duration: '12-24 months',
      phone: '+91-22-2576-4321',
      email: 'sine@iitb.ac.in',
      website: 'https://sine.iitb.ac.in',
      color: 'bg-indigo-600'
    },
    {
      id: 5,
      name: 'Zone Startups India',
      city: 'Bangalore',
      type: 'Private',
      focus: ['E-commerce', 'Consumer tech', 'B2B SaaS', 'Marketplace'],
      support: ['Co-working', 'Investor connect', 'Events', 'Community'],
      duration: '6 months',
      phone: '+91-80-4567-8901',
      email: 'hello@zonestartups.com',
      website: 'https://zonestartups.com',
      color: 'bg-green-600'
    },
    {
      id: 6,
      name: 'IAN Incubator',
      city: 'Gurgaon',
      type: 'Angel Network',
      focus: ['All sectors', 'Early stage', 'Growth stage'],
      support: ['Angel funding', 'Mentorship', 'Network', 'Follow-on funding'],
      duration: '3-9 months',
      phone: '+91-124-567-8901',
      email: 'incubator@indianangelnetwork.com',
      website: 'https://www.indianangelnetwork.com',
      color: 'bg-red-600'
    }
  ]

  const cities = ['all', 'Bangalore', 'Hyderabad', 'Delhi', 'Mumbai', 'Gurgaon']

  const filteredIncubators = selectedCity === 'all' 
    ? incubators 
    : incubators.filter(i => i.city === selectedCity)

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
              <span className="font-medium"><T>Back</T></span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <Building size={32} />
                <div>
                  <h1 className="text-xl font-bold"><T>Incubators & Accelerators</T></h1>
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <T>Filter by City</T>
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all"><T>All Cities</T></option>
            {cities.slice(1).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Incubators List */}
        <div className="space-y-6">
          {filteredIncubators.map((incubator) => (
            <div key={incubator.id} className={`${incubator.color} text-white rounded-lg shadow-lg overflow-hidden`}>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1"><T>{incubator.name}</T></h3>
                    <div className="flex items-center gap-4">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                        <T>{incubator.type}</T>
                      </span>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span className="text-sm">{incubator.city}</span>
                      </div>
                    </div>
                  </div>
                  <Building size={40} className="opacity-75" />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-sm font-semibold mb-2 opacity-90"><T>Focus Areas</T>:</p>
                    <div className="flex flex-wrap gap-2">
                      {incubator.focus.map((area, idx) => (
                        <span key={idx} className="bg-white/20 px-2 py-1 rounded text-xs">
                          <T>{area}</T>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-sm font-semibold mb-2 opacity-90"><T>Support Provided</T>:</p>
                    <div className="flex flex-wrap gap-2">
                      {incubator.support.map((sup, idx) => (
                        <span key={idx} className="bg-white/20 px-2 py-1 rounded text-xs">
                          <T>{sup}</T>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <div>
                      <p className="text-xs opacity-75"><T>Duration</T></p>
                      <p className="text-sm font-semibold"><T>{incubator.duration}</T></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} />
                    <div>
                      <p className="text-xs opacity-75"><T>Phone</T></p>
                      <p className="text-sm font-semibold">{incubator.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} />
                    <div>
                      <p className="text-xs opacity-75"><T>Email</T></p>
                      <p className="text-sm font-semibold truncate">{incubator.email}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={incubator.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-gray-900 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold flex items-center justify-center gap-2"
                >
                  <ExternalLink size={20} />
                  <T>Apply Now</T>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
