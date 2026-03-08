import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Users, MessageSquare, TrendingUp, Award, Clock, CheckCircle, Zap, Target } from 'lucide-react'
import GlassCard from '../components/GlassCard'
import AnimatedCounter from '../components/AnimatedCounter'
import ProgressBar from '../components/ProgressBar'
import LanguageSelector from '../components/LanguageSelector'
import T from '../components/T'

export default function StatsPage() {
  const navigate = useNavigate()

  const stats = [
    { icon: Users, label: 'Total Users', value: 12547, color: 'from-blue-500 to-cyan-500', suffix: '' },
    { icon: MessageSquare, label: 'Messages Sent', value: 45892, color: 'from-green-500 to-emerald-500', suffix: '' },
    { icon: TrendingUp, label: 'Success Rate', value: 96, color: 'from-orange-500 to-red-500', suffix: '%' },
    { icon: Award, label: 'Schemes Found', value: 523, color: 'from-purple-500 to-pink-500', suffix: '' },
  ]

  const categoryStats = [
    { name: 'Farmers', users: 6500, messages: 25000, satisfaction: 94 },
    { name: 'Students', users: 4200, messages: 15000, satisfaction: 97 },
    { name: 'Startups', users: 1847, messages: 5892, satisfaction: 92 },
  ]

  const recentActivity = [
    { icon: CheckCircle, text: 'New scheme added: PM-KISAN', time: '2 mins ago', color: 'text-green-400' },
    { icon: Users, text: '50 new users registered', time: '15 mins ago', color: 'text-blue-400' },
    { icon: Zap, text: 'System performance optimized', time: '1 hour ago', color: 'text-yellow-400' },
    { icon: Target, text: 'Monthly goal achieved', time: '3 hours ago', color: 'text-purple-400' },
  ]

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
              <span className="font-medium"><T>Back to Home</T></span>
            </motion.button>
            
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-white">📊 <T>Statistics Dashboard</T></h1>
              <p className="text-sm text-white/70 mt-1"><T>Real-time platform analytics</T></p>
            </div>
            
            <LanguageSelector />
          </div>
        </GlassCard>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="p-6 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  className={`inline-flex p-4 rounded-full bg-gradient-to-br ${stat.color} mb-4`}
                >
                  <stat.icon className="text-white" size={32} />
                </motion.div>
                <h3 className="text-4xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-white/70"><T>{stat.label}</T></p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="text-blue-400" />
              <T>Category Breakdown</T>
            </h2>
            <div className="space-y-6">
              {categoryStats.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                    <div className="flex gap-6 text-sm text-white/70">
                      <span>{category.users.toLocaleString()} users</span>
                      <span>{category.messages.toLocaleString()} messages</span>
                    </div>
                  </div>
                  <ProgressBar 
                    progress={category.satisfaction} 
                    color={idx === 0 ? 'from-green-500 to-emerald-500' : idx === 1 ? 'from-blue-500 to-indigo-500' : 'from-orange-500 to-red-500'}
                    showLabel
                  />
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="text-purple-400" />
              <T>Recent Activity</T>
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all"
                >
                  <activity.icon className={`${activity.color} flex-shrink-0`} size={24} />
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.text}</p>
                    <p className="text-white/50 text-sm">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </main>
    </div>
  )
}
