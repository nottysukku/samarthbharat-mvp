import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  value: string
  label: string
  gradient: string
  delay?: number
}

export default function StatsCard({ icon: Icon, value, label, gradient, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="inline-block"
      >
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} mb-4 inline-flex`}>
          <Icon className="text-white" size={32} />
        </div>
      </motion.div>
      
      <motion.h3 
        className="text-4xl font-bold text-white mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      >
        {value}
      </motion.h3>
      
      <p className="text-white/70 text-sm font-medium">{label}</p>
    </motion.div>
  )
}
