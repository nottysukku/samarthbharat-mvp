import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Briefcase, Filter, TrendingUp, GraduationCap, IndianRupee, Building2, Phone, BookOpen, Sparkles, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function CareerGuidancePage() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('all')
  const [selectedEducation, setSelectedEducation] = useState('all')
  const [sortBy, setSortBy] = useState('salary')
  const [aiCareer, setAiCareer] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [careerQuestion, setCareerQuestion] = useState('')

  const askCareerAI = async () => {
    if (!careerQuestion.trim()) return
    setAiLoading(true)
    setAiCareer('')
    try {
      const res = await fetch(`${API}/api/ai/career-guidance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interest: careerQuestion, education: 'Undergraduate', skills: '', goal: careerQuestion }),
      })
      const data = await res.json()
      setAiCareer(data.response || 'Could not get guidance.')
    } catch {
      setAiCareer('Could not reach the server. Please try again.')
    } finally {
      setAiLoading(false)
    }
  }

  const careers = [
    {
      id: 1,
      title: 'Software Engineer',
      titleHi: 'सॉफ्टवेयर इंजीनियर',
      category: 'Engineering',
      categoryHi: 'इंजीनियरिंग',
      avgSalary: '₹8-15 LPA',
      salaryValue: 11.5,
      qualifications: ['B.Tech/B.E. in Computer Science', 'Programming skills', 'Problem-solving ability'],
      qualificationsHi: ['कंप्यूटर साइंस में बी.टेक/बी.ई.', 'प्रोग्रामिंग कौशल', 'समस्या समाधान क्षमता'],
      educationLevel: 'Bachelors',
      growthProspect: 'Excellent',
      growthProspectHi: 'उत्कृष्ट',
      growthValue: 95,
      demand: 'Very High',
      demandValue: 95,
      topCompanies: ['TCS', 'Infosys', 'Wipro', 'Google', 'Microsoft'],
      description: 'Design, develop and maintain software applications',
      descriptionHi: 'सॉफ्टवेयर एप्लिकेशन डिज़ाइन, विकसित और बनाए रखें'
    },
    {
      id: 2,
      title: 'Doctor (MBBS)',
      titleHi: 'डॉक्टर (एमबीबीएस)',
      category: 'Medical',
      categoryHi: 'चिकित्सा',
      avgSalary: '₹10-25 LPA',
      salaryValue: 17.5,
      qualifications: ['MBBS degree', 'Medical license', 'Clinical experience'],
      qualificationsHi: ['एमबीबीएस डिग्री', 'मेडिकल लाइसेंस', 'क्लिनिकल अनुभव'],
      educationLevel: 'Professional',
      growthProspect: 'Excellent',
      growthProspectHi: 'उत्कृष्ट',
      growthValue: 90,
      demand: 'Very High',
      demandValue: 92,
      topCompanies: ['AIIMS', 'Apollo Hospitals', 'Fortis', 'Max Healthcare', 'Manipal Hospitals'],
      description: 'Diagnose and treat patients, provide medical care',
      descriptionHi: 'रोगियों का निदान और उपचार करें, चिकित्सा देखभाल प्रदान करें'
    },
    {
      id: 3,
      title: 'Civil Services Officer (IAS/IPS)',
      titleHi: 'सिविल सेवा अधिकारी (आईएएस/आईपीएस)',
      category: 'Government',
      categoryHi: 'सरकारी',
      avgSalary: '₹7-12 LPA',
      salaryValue: 9.5,
      qualifications: ['Graduate degree', 'UPSC exam cleared', 'Leadership skills'],
      qualificationsHi: ['स्नातक डिग्री', 'यूपीएससी परीक्षा उत्तीर्ण', 'नेतृत्व कौशल'],
      educationLevel: 'Bachelors',
      growthProspect: 'Excellent',
      growthProspectHi: 'उत्कृष्ट',
      growthValue: 88,
      demand: 'High',
      demandValue: 85,
      topCompanies: ['Central Government', 'State Government', 'District Administration', 'Police Department', 'Revenue Department'],
      description: 'Administrative and policy-making roles in government',
      descriptionHi: 'सरकार में प्रशासनिक और नीति निर्माण भूमिकाएं'
    },
    {
      id: 4,
      title: 'Chartered Accountant',
      titleHi: 'चार्टर्ड अकाउंटेंट',
      category: 'Business',
      categoryHi: 'व्यवसाय',
      avgSalary: '₹8-18 LPA',
      salaryValue: 13,
      qualifications: ['CA qualification', 'Financial expertise', 'Analytical skills'],
      qualificationsHi: ['सीए योग्यता', 'वित्तीय विशेषज्ञता', 'विश्लेषणात्मक कौशल'],
      educationLevel: 'Professional',
      growthProspect: 'Very Good',
      growthProspectHi: 'बहुत अच्छा',
      growthValue: 85,
      demand: 'High',
      demandValue: 88,
      topCompanies: ['Deloitte', 'PwC', 'EY', 'KPMG', 'Grant Thornton'],
      description: 'Financial auditing, taxation, and advisory services',
      descriptionHi: 'वित्तीय लेखा परीक्षा, कराधान और सलाहकार सेवाएं'
    },
    {
      id: 5,
      title: 'Data Scientist',
      titleHi: 'डेटा साइंटिस्ट',
      category: 'Engineering',
      categoryHi: 'इंजीनियरिंग',
      avgSalary: '₹10-20 LPA',
      salaryValue: 15,
      qualifications: ['B.Tech/M.Tech or Statistics degree', 'Python/R programming', 'Machine Learning'],
      qualificationsHi: ['बी.टेक/एम.टेक या सांख्यिकी डिग्री', 'पायथन/आर प्रोग्रामिंग', 'मशीन लर्निंग'],
      educationLevel: 'Bachelors',
      growthProspect: 'Excellent',
      growthProspectHi: 'उत्कृष्ट',
      growthValue: 98,
      demand: 'Very High',
      demandValue: 96,
      topCompanies: ['Amazon', 'Flipkart', 'Google', 'Microsoft', 'IBM'],
      description: 'Analyze data and build predictive models',
      descriptionHi: 'डेटा का विश्लेषण करें और भविष्यवाणी मॉडल बनाएं'
    },
    {
      id: 6,
      title: 'Graphic Designer',
      titleHi: 'ग्राफिक डिजाइनर',
      category: 'Arts',
      categoryHi: 'कला',
      avgSalary: '₹3-8 LPA',
      salaryValue: 5.5,
      qualifications: ['Design degree/diploma', 'Adobe Creative Suite', 'Creative portfolio'],
      qualificationsHi: ['डिजाइन डिग्री/डिप्लोमा', 'एडोब क्रिएटिव सूट', 'रचनात्मक पोर्टफोलियो'],
      educationLevel: 'Diploma',
      growthProspect: 'Good',
      growthProspectHi: 'अच्छा',
      growthValue: 75,
      demand: 'Medium',
      demandValue: 70,
      topCompanies: ['Ogilvy', 'Dentsu', 'Leo Burnett', 'Publicis', 'WPP'],
      description: 'Create visual content for brands and media',
      descriptionHi: 'ब्रांड और मीडिया के लिए दृश्य सामग्री बनाएं'
    },
    {
      id: 7,
      title: 'Research Scientist',
      titleHi: 'अनुसंधान वैज्ञानिक',
      category: 'Science',
      categoryHi: 'विज्ञान',
      avgSalary: '₹6-15 LPA',
      salaryValue: 10.5,
      qualifications: ['M.Sc/Ph.D. in Science', 'Research experience', 'Publication record'],
      qualificationsHi: ['विज्ञान में एम.एससी/पीएचडी', 'अनुसंधान अनुभव', 'प्रकाशन रिकॉर्ड'],
      educationLevel: 'Masters',
      growthProspect: 'Very Good',
      growthProspectHi: 'बहुत अच्छा',
      growthValue: 82,
      demand: 'Medium',
      demandValue: 75,
      topCompanies: ['ISRO', 'DRDO', 'CSIR', 'BARC', 'IITs'],
      description: 'Conduct scientific research and experiments',
      descriptionHi: 'वैज्ञानिक अनुसंधान और प्रयोग करें'
    },
    {
      id: 8,
      title: 'Marketing Manager',
      titleHi: 'मार्केटिंग मैनेजर',
      category: 'Business',
      categoryHi: 'व्यवसाय',
      avgSalary: '₹7-14 LPA',
      salaryValue: 10.5,
      qualifications: ['MBA/BBA degree', 'Marketing experience', 'Digital marketing skills'],
      qualificationsHi: ['एमबीए/बीबीए डिग्री', 'मार्केटिंग अनुभव', 'डिजिटल मार्केटिंग कौशल'],
      educationLevel: 'Masters',
      growthProspect: 'Very Good',
      growthProspectHi: 'बहुत अच्छा',
      growthValue: 83,
      demand: 'High',
      demandValue: 86,
      topCompanies: ['HUL', 'P&G', 'ITC', 'Nestle', 'Amazon'],
      description: 'Plan and execute marketing strategies',
      descriptionHi: 'मार्केटिंग रणनीतियों की योजना बनाएं और निष्पादित करें'
    },
    {
      id: 9,
      title: 'Mechanical Engineer',
      titleHi: 'मैकेनिकल इंजीनियर',
      category: 'Engineering',
      categoryHi: 'इंजीनियरिंग',
      avgSalary: '₹4-10 LPA',
      salaryValue: 7,
      qualifications: ['B.Tech in Mechanical Engineering', 'CAD/CAM skills', 'Manufacturing knowledge'],
      qualificationsHi: ['मैकेनिकल इंजीनियरिंग में बी.टेक', 'सीएडी/सीएएम कौशल', 'विनिर्माण ज्ञान'],
      educationLevel: 'Bachelors',
      growthProspect: 'Good',
      growthProspectHi: 'अच्छा',
      growthValue: 78,
      demand: 'Medium',
      demandValue: 72,
      topCompanies: ['Tata Motors', 'Mahindra', 'L&T', 'Bharat Forge', 'Ashok Leyland'],
      description: 'Design and develop mechanical systems',
      descriptionHi: 'यांत्रिक प्रणालियों को डिजाइन और विकसित करें'
    },
    {
      id: 10,
      title: 'Pharmacist',
      titleHi: 'फार्मासिस्ट',
      category: 'Medical',
      categoryHi: 'चिकित्सा',
      avgSalary: '₹3-7 LPA',
      salaryValue: 5,
      qualifications: ['B.Pharm/D.Pharm degree', 'Pharmacy license', 'Drug knowledge'],
      qualificationsHi: ['बी.फार्म/डी.फार्म डिग्री', 'फार्मेसी लाइसेंस', 'दवा ज्ञान'],
      educationLevel: 'Bachelors',
      growthProspect: 'Good',
      growthProspectHi: 'अच्छा',
      growthValue: 76,
      demand: 'Medium',
      demandValue: 74,
      topCompanies: ['Sun Pharma', 'Cipla', 'Dr. Reddys', 'Apollo Pharmacy', 'MedPlus'],
      description: 'Dispense medications and provide pharmaceutical care',
      descriptionHi: 'दवाएं वितरित करें और फार्मास्युटिकल देखभाल प्रदान करें'
    },
    {
      id: 11,
      title: 'Bank Manager',
      titleHi: 'बैंक मैनेजर',
      category: 'Government',
      categoryHi: 'सरकारी',
      avgSalary: '₹6-12 LPA',
      salaryValue: 9,
      qualifications: ['Graduate degree', 'Banking exam cleared', 'Financial knowledge'],
      qualificationsHi: ['स्नातक डिग्री', 'बैंकिंग परीक्षा उत्तीर्ण', 'वित्तीय ज्ञान'],
      educationLevel: 'Bachelors',
      growthProspect: 'Very Good',
      growthProspectHi: 'बहुत अच्छा',
      growthValue: 84,
      demand: 'High',
      demandValue: 80,
      topCompanies: ['SBI', 'HDFC Bank', 'ICICI Bank', 'PNB', 'Bank of Baroda'],
      description: 'Manage banking operations and customer relations',
      descriptionHi: 'बैंकिंग संचालन और ग्राहक संबंध प्रबंधित करें'
    },
    {
      id: 12,
      title: 'Content Writer',
      titleHi: 'कंटेंट राइटर',
      category: 'Arts',
      categoryHi: 'कला',
      avgSalary: '₹3-6 LPA',
      salaryValue: 4.5,
      qualifications: ['Graduate degree', 'Writing skills', 'SEO knowledge'],
      qualificationsHi: ['स्नातक डिग्री', 'लेखन कौशल', 'एसईओ ज्ञान'],
      educationLevel: 'Bachelors',
      growthProspect: 'Good',
      growthProspectHi: 'अच्छा',
      growthValue: 72,
      demand: 'Medium',
      demandValue: 68,
      topCompanies: ['Times Internet', 'Zee Media', 'NDTV', 'Quint', 'Scroll'],
      description: 'Create engaging content for digital platforms',
      descriptionHi: 'डिजिटल प्लेटफॉर्म के लिए आकर्षक सामग्री बनाएं'
    },
    {
      id: 13,
      title: 'Biotechnology Researcher',
      titleHi: 'बायोटेक्नोलॉजी शोधकर्ता',
      category: 'Science',
      categoryHi: 'विज्ञान',
      avgSalary: '₹5-12 LPA',
      salaryValue: 8.5,
      qualifications: ['M.Sc/Ph.D. in Biotechnology', 'Lab skills', 'Research aptitude'],
      qualificationsHi: ['बायोटेक्नोलॉजी में एम.एससी/पीएचडी', 'प्रयोगशाला कौशल', 'अनुसंधान योग्यता'],
      educationLevel: 'Masters',
      growthProspect: 'Very Good',
      growthProspectHi: 'बहुत अच्छा',
      growthValue: 80,
      demand: 'Medium',
      demandValue: 73,
      topCompanies: ['Biocon', 'Serum Institute', 'Bharat Biotech', 'Panacea Biotec', 'Wockhardt'],
      description: 'Research and develop biotechnology solutions',
      descriptionHi: 'बायोटेक्नोलॉजी समाधान अनुसंधान और विकसित करें'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', nameHi: 'सभी श्रेणियां' },
    { id: 'Engineering', name: 'Engineering', nameHi: 'इंजीनियरिंग' },
    { id: 'Medical', name: 'Medical', nameHi: 'चिकित्सा' },
    { id: 'Business', name: 'Business', nameHi: 'व्यवसाय' },
    { id: 'Government', name: 'Government', nameHi: 'सरकारी' },
    { id: 'Arts', name: 'Arts', nameHi: 'कला' },
    { id: 'Science', name: 'Science', nameHi: 'विज्ञान' }
  ]

  const salaryRanges = [
    { id: 'all', name: 'All Salaries', nameHi: 'सभी वेतन' },
    { id: 'low', name: '₹3-6 LPA', nameHi: '₹3-6 लाख', min: 0, max: 6 },
    { id: 'medium', name: '₹6-12 LPA', nameHi: '₹6-12 लाख', min: 6, max: 12 },
    { id: 'high', name: '₹12+ LPA', nameHi: '₹12+ लाख', min: 12, max: 100 }
  ]

  const educationLevels = [
    { id: 'all', name: 'All Levels', nameHi: 'सभी स्तर' },
    { id: 'Diploma', name: 'Diploma', nameHi: 'डिप्लोमा' },
    { id: 'Bachelors', name: 'Bachelors', nameHi: 'स्नातक' },
    { id: 'Masters', name: 'Masters', nameHi: 'स्नातकोत्तर' },
    { id: 'Professional', name: 'Professional', nameHi: 'व्यावसायिक' }
  ]

  const sortOptions = [
    { id: 'salary', name: 'Salary (High to Low)', nameHi: 'वेतन (उच्च से निम्न)' },
    { id: 'growth', name: 'Growth Prospect', nameHi: 'विकास संभावना' },
    { id: 'demand', name: 'Market Demand', nameHi: 'बाजार मांग' }
  ]

  // Filter and sort careers
  const filteredCareers = careers
    .filter(career => {
      if (selectedCategory !== 'all' && career.category !== selectedCategory) return false
      if (selectedEducation !== 'all' && career.educationLevel !== selectedEducation) return false
      if (selectedSalaryRange !== 'all') {
        const range = salaryRanges.find(r => r.id === selectedSalaryRange)
        if (range && range.min !== undefined && range.max !== undefined) {
          if (career.salaryValue < range.min || career.salaryValue > range.max) return false
        }
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'salary') return b.salaryValue - a.salaryValue
      if (sortBy === 'growth') return b.growthValue - a.growthValue
      if (sortBy === 'demand') return b.demandValue - a.demandValue
      return 0
    })

  const handleExplorePath = (career: any) => {
    toast.success(`Exploring ${career.title} career path`)
  }

  const handleContactCounselor = () => {
    toast.success('Connecting you with a career counselor')
  }

  const getGrowthColor = (growth: string) => {
    if (growth === 'Excellent') return 'text-green-600'
    if (growth === 'Very Good') return 'text-blue-600'
    if (growth === 'Good') return 'text-yellow-600'
    return 'text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-blue-600 text-white shadow-lg border-b-4 border-orange-500">
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
                <Briefcase size={32} />
                <div>
                  <h1 className="text-xl font-bold">करियर मार्गदर्शन</h1>
                  <p className="text-sm opacity-90">Career Guidance</p>
                </div>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Careers</p>
                <p className="text-3xl font-bold">{careers.length}</p>
                <p className="text-xs opacity-75">कुल करियर</p>
              </div>
              <Briefcase size={48} className="opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Avg Salary</p>
                <p className="text-3xl font-bold">₹9.5L</p>
                <p className="text-xs opacity-75">औसत वेतन</p>
              </div>
              <IndianRupee size={48} className="opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Categories</p>
                <p className="text-3xl font-bold">6</p>
                <p className="text-xs opacity-75">श्रेणियां</p>
              </div>
              <GraduationCap size={48} className="opacity-50" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">High Growth</p>
                <p className="text-3xl font-bold">8</p>
                <p className="text-xs opacity-75">उच्च विकास</p>
              </div>
              <TrendingUp size={48} className="opacity-50" />
            </div>
          </div>
        </div>

        {/* Contact Counselor Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Phone size={48} />
              <div>
                <h2 className="text-2xl font-bold mb-1">Need Career Guidance? / करियर मार्गदर्शन चाहिए?</h2>
                <p className="opacity-90">Talk to our expert career counselors / हमारे विशेषज्ञ करियर परामर्शदाताओं से बात करें</p>
              </div>
            </div>
            <button
              onClick={handleContactCounselor}
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Contact Now / अभी संपर्क करें
            </button>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Filter & Sort / फ़िल्टर और सॉर्ट करें</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category / श्रेणी
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nameHi} / {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Salary Range Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Salary Range / वेतन सीमा
              </label>
              <select
                value={selectedSalaryRange}
                onChange={(e) => setSelectedSalaryRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {salaryRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.nameHi}
                  </option>
                ))}
              </select>
            </div>

            {/* Education Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Education Level / शिक्षा स्तर
              </label>
              <select
                value={selectedEducation}
                onChange={(e) => setSelectedEducation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {educationLevels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.nameHi} / {level.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By / क्रमबद्ध करें
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.nameHi}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredCareers.length} of {careers.length} careers / 
            {careers.length} में से {filteredCareers.length} करियर दिखा रहे हैं
          </div>
        </div>

        {/* Careers List */}
        <div className="space-y-6">
          {filteredCareers.map((career) => (
            <div key={career.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{career.titleHi}</h3>
                    <p className="text-lg text-gray-700 mb-2">{career.title}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {career.categoryHi}
                      </span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {career.educationLevel}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600 mb-1">
                      <IndianRupee size={24} />
                      <span className="text-2xl font-bold">{career.avgSalary}</span>
                    </div>
                    <p className="text-sm text-gray-600">Average Salary</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 mb-1">{career.descriptionHi}</p>
                  <p className="text-sm text-gray-600">{career.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Qualifications */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <GraduationCap size={18} className="text-green-600" />
                      Qualifications / योग्यता
                    </p>
                    <ul className="space-y-1">
                      {career.qualificationsHi.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          <p className="font-medium text-gray-900">• {item}</p>
                          <p className="text-xs text-gray-600 ml-3">{career.qualifications[idx]}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Growth & Demand */}
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <TrendingUp size={18} className="text-orange-600" />
                      Growth & Demand / विकास और मांग
                    </p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Growth Prospect</span>
                          <span className={`text-sm font-bold ${getGrowthColor(career.growthProspect)}`}>
                            {career.growthProspectHi}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${career.growthValue}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Market Demand</span>
                          <span className="text-sm font-bold text-blue-600">{career.demand}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${career.demandValue}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Companies */}
                <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Building2 size={18} className="text-indigo-600" />
                    Top Companies / शीर्ष कंपनियां
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {career.topCompanies.map((company, idx) => (
                      <span key={idx} className="bg-white border border-indigo-200 px-3 py-1 rounded-full text-sm text-gray-700">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleExplorePath(career)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <BookOpen size={20} />
                    Explore Path / पथ देखें
                  </button>
                  <button
                    onClick={handleContactCounselor}
                    className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-bold flex items-center gap-2"
                  >
                    <Phone size={20} />
                    Contact Counselor / परामर्शदाता से संपर्क करें
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCareers.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Briefcase size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No careers found / कोई करियर नहीं मिला</h3>
            <p className="text-gray-600">Try adjusting your filters / अपने फ़िल्टर समायोजित करने का प्रयास करें</p>
          </div>
        )}

        {/* AI Career Advisor */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 border-l-4 border-indigo-600">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-indigo-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">AI Career Advisor / AI करियर सलाहकार</h3>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={careerQuestion}
              onChange={e => setCareerQuestion(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && askCareerAI()}
              placeholder="e.g. I want to become a data scientist, what should I do?"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
              onClick={askCareerAI}
              disabled={aiLoading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              {aiLoading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              {aiLoading ? 'Thinking...' : 'Ask AI'}
            </button>
          </div>
          {aiCareer && (
            <div className="bg-white rounded-lg p-6 border border-indigo-200 whitespace-pre-wrap text-sm text-gray-800 max-h-[500px] overflow-y-auto leading-relaxed">
              {aiCareer}
            </div>
          )}
        </div>

        {/* Career Tips */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <div className="flex items-start gap-3">
            <TrendingUp className="text-blue-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Career Tips / करियर सुझाव</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Research thoroughly before choosing a career path / करियर पथ चुनने से पहले अच्छी तरह से शोध करें</li>
                <li>• Consider your interests and strengths / अपनी रुचियों और ताकत पर विचार करें</li>
                <li>• Talk to professionals in the field / क्षेत्र के पेशेवरों से बात करें</li>
                <li>• Stay updated with industry trends / उद्योग के रुझानों से अपडेट रहें</li>
                <li>• Invest in continuous learning and skill development / निरंतर सीखने और कौशल विकास में निवेश करें</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
