import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search } from 'lucide-react'
import { useState } from 'react'
import GlassCard from '../components/GlassCard'
import FlipCard from '../components/FlipCard'

export default function SchemesPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const schemes = [
    {
      id: 1,
      title: 'PM-KISAN',
      description: 'Direct income support to farmers with landholding',
      benefits: [
        '₹6000 per year in 3 installments',
        'Direct bank transfer',
        'No intermediaries',
        'Covers all landholding farmers'
      ],
      icon: '🌾',
      gradient: 'from-green-500 to-emerald-600',
      category: 'farmer',
      link: 'https://pmkisan.gov.in/'
    },
    {
      id: 2,
      title: 'National Scholarship Portal',
      description: 'Centralized platform for various scholarship schemes',
      benefits: [
        'Pre-matric & post-matric scholarships',
        'Merit-based awards',
        'Need-based support',
        'Easy online application'
      ],
      icon: '📚',
      gradient: 'from-blue-500 to-indigo-600',
      category: 'student',
      link: 'https://scholarships.gov.in/'
    },
    {
      id: 3,
      title: 'Startup India',
      description: 'Government initiative to build a strong ecosystem for nurturing innovation',
      benefits: [
        'Tax exemptions for 3 years',
        'Easy compliance',
        'IPR fast-tracking',
        'Funding support'
      ],
      icon: '💼',
      gradient: 'from-orange-500 to-red-600',
      category: 'startup',
      link: 'https://www.startupindia.gov.in/'
    },
    {
      id: 4,
      title: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme for farmers',
      benefits: [
        'Low premium rates',
        'Coverage for all crops',
        'Natural calamity protection',
        'Quick claim settlement'
      ],
      icon: '🌱',
      gradient: 'from-green-600 to-teal-600',
      category: 'farmer',
      link: 'https://pmfby.gov.in/'
    },
    {
      id: 5,
      title: 'MUDRA Loan',
      description: 'Micro-units development and refinance agency loans',
      benefits: [
        'Up to ₹10 lakh loan',
        'No collateral required',
        'Low interest rates',
        'Easy processing'
      ],
      icon: '💰',
      gradient: 'from-purple-500 to-pink-600',
      category: 'startup',
      link: 'https://www.mudra.org.in/'
    },
    {
      id: 6,
      title: 'Skill India',
      description: 'Initiative to train youth in industry-relevant skills',
      benefits: [
        'Free training programs',
        'Industry certification',
        'Placement assistance',
        'Entrepreneurship support'
      ],
      icon: '🎓',
      gradient: 'from-cyan-500 to-blue-600',
      category: 'student',
      link: 'https://www.skillindia.gov.in/'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Schemes', icon: '🌟' },
    { id: 'farmer', label: 'Farmers', icon: '🌾' },
    { id: 'student', label: 'Students', icon: '📚' },
    { id: 'startup', label: 'Startups', icon: '💼' }
  ]

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen relative overflow-hidden pb-8">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10"
      >
        <GlassCard className="m-4 p-6">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white hover:text-white/80 transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Home</span>
            </motion.button>
            
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-white">🎯 Government Schemes</h1>
              <p className="text-sm text-white/70 mt-1">Explore available schemes and benefits</p>
            </div>
            
            <div className="w-32"></div>
          </div>
        </GlassCard>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="text"
                  placeholder="Search schemes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? 'bg-white text-gray-900'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme, idx) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <FlipCard
                title={scheme.title}
                description={scheme.description}
                benefits={scheme.benefits}
                link={scheme.link}
                icon={scheme.icon}
                gradient={scheme.gradient}
              />
            </motion.div>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <GlassCard className="p-12">
              <p className="text-2xl text-white/70">No schemes found</p>
              <p className="text-white/50 mt-2">Try adjusting your search or filters</p>
            </GlassCard>
          </motion.div>
        )}
      </main>
    </div>
  )
}
