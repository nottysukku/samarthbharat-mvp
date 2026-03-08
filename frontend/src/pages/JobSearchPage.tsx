import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, MapPin, Briefcase, Clock, IndianRupee, Building, ExternalLink, BookmarkPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function JobSearchPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const jobs = [
    {
      id: 1,
      title: 'Software Developer',
      company: 'Infosys',
      location: 'Bangalore',
      type: 'Full-time',
      experience: 'Fresher',
      salary: '₹3.5-5 LPA',
      posted: '2 days ago',
      skills: ['Java', 'Python', 'SQL'],
      description: 'Looking for fresh graduates with programming skills',
      applyUrl: 'https://careers.infosys.com'
    },
    {
      id: 2,
      title: 'Data Analyst',
      company: 'TCS',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '0-1 years',
      salary: '₹4-6 LPA',
      posted: '1 day ago',
      skills: ['Excel', 'SQL', 'Power BI'],
      description: 'Entry-level data analyst position',
      applyUrl: 'https://careers.tcs.com'
    },
    {
      id: 3,
      title: 'Digital Marketing Executive',
      company: 'Flipkart',
      location: 'Delhi',
      type: 'Full-time',
      experience: 'Fresher',
      salary: '₹3-4.5 LPA',
      posted: '3 days ago',
      skills: ['SEO', 'Social Media', 'Google Ads'],
      description: 'Manage digital marketing campaigns',
      applyUrl: 'https://careers.flipkart.com'
    },
    {
      id: 4,
      title: 'Content Writer',
      company: 'Zomato',
      location: 'Gurgaon',
      type: 'Full-time',
      experience: '0-2 years',
      salary: '₹2.5-4 LPA',
      posted: '5 days ago',
      skills: ['Writing', 'SEO', 'Research'],
      description: 'Create engaging content for platform',
      applyUrl: 'https://careers.zomato.com'
    },
    {
      id: 5,
      title: 'Customer Support Executive',
      company: 'Amazon',
      location: 'Hyderabad',
      type: 'Full-time',
      experience: 'Fresher',
      salary: '₹2-3 LPA',
      posted: '1 week ago',
      skills: ['Communication', 'Problem Solving'],
      description: 'Handle customer queries and support',
      applyUrl: 'https://amazon.jobs'
    },
    {
      id: 6,
      title: 'Graphic Designer',
      company: 'Swiggy',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '0-1 years',
      salary: '₹3-5 LPA',
      posted: '4 days ago',
      skills: ['Photoshop', 'Illustrator', 'Figma'],
      description: 'Design marketing materials and campaigns',
      applyUrl: 'https://careers.swiggy.com'
    },
    {
      id: 7,
      title: 'HR Intern',
      company: 'Wipro',
      location: 'Pune',
      type: 'Internship',
      experience: 'Fresher',
      salary: '₹15,000/month',
      posted: '2 days ago',
      skills: ['Communication', 'MS Office'],
      description: '6-month internship with PPO opportunity',
      applyUrl: 'https://careers.wipro.com'
    },
    {
      id: 8,
      title: 'Sales Executive',
      company: 'HDFC Bank',
      location: 'Chennai',
      type: 'Full-time',
      experience: 'Fresher',
      salary: '₹2.5-4 LPA',
      posted: '3 days ago',
      skills: ['Sales', 'Communication', 'Negotiation'],
      description: 'Sell banking products and services',
      applyUrl: 'https://careers.hdfcbank.com'
    },
    {
      id: 9,
      title: 'Business Analyst',
      company: 'Accenture',
      location: 'Kolkata',
      type: 'Full-time',
      experience: '0-1 years',
      salary: '₹4-6 LPA',
      posted: '1 week ago',
      skills: ['Excel', 'SQL', 'Business Analysis'],
      description: 'Analyze business requirements and processes',
      applyUrl: 'https://careers.accenture.com'
    },
    {
      id: 10,
      title: 'UI/UX Designer',
      company: 'Paytm',
      location: 'Noida',
      type: 'Full-time',
      experience: 'Fresher',
      salary: '₹3.5-5.5 LPA',
      posted: '2 days ago',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      description: 'Design user interfaces for mobile app',
      applyUrl: 'https://careers.paytm.com'
    }
  ]

  const locations = ['all', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai']
  const jobTypes = ['all', 'Full-time', 'Internship', 'Part-time']

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation
    const matchesType = selectedType === 'all' || job.type === selectedType
    return matchesSearch && matchesLocation && matchesType
  })

  const handleApply = (job: any) => {
    window.open(job.applyUrl, '_blank')
    toast.success(`Opening ${job.company} application portal`)
  }

  const handleSave = (job: any) => {
    toast.success(`Saved ${job.title} at ${job.company}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-emerald-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <Search size={32} />
                <div>
                  <h1 className="text-xl font-bold"><T>Job Search</T></h1>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <T>Search Jobs</T>
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title or company"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <T>Location</T>
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all"><T>All Locations</T></option>
                {locations.slice(1).map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <T>Job Type</T>
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all"><T>All Types</T></option>
                {jobTypes.slice(1).map(type => (
                  <option key={type} value={type}><T>{type}</T></option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <T>Showing</T> {filteredJobs.length} <T>jobs</T>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1"><T>{job.title}</T></h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="text-emerald-600" size={18} />
                    <span className="font-semibold text-gray-900">{job.company}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSave(job)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <BookmarkPlus className="text-gray-600" size={24} />
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-500" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="text-gray-500" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900"><T>{job.type}</T></p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee className="text-gray-500" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{job.salary}</p>
                    <p className="text-xs text-gray-600"><T>Salary</T></p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-gray-500" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900"><T>{job.posted}</T></p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1"><T>Experience</T>:</p>
                <p className="font-semibold text-gray-900"><T>{job.experience}</T></p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2"><T>Required Skills</T>:</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, idx) => (
                    <span key={idx} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700"><T>{job.description}</T></p>
              </div>

              <button
                onClick={() => handleApply(job)}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-bold flex items-center justify-center gap-2"
              >
                <ExternalLink size={20} />
                <T>Apply Now</T>
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Search size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2"><T>No jobs found</T></h3>
            <p className="text-gray-600"><T>Try adjusting your search filters</T></p>
          </div>
        )}
      </main>
    </div>
  )
}
