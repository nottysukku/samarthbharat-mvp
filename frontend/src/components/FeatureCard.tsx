import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  color: string
  delay?: number
}

export default function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  delay = 0 
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="inline-block mb-4"
      >
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} inline-flex`}>
          <Icon className="text-white" size={32} />
        </div>
      </motion.div>
      
      <h4 className="font-semibold text-white mb-2 text-lg">{title}</h4>
      <p className="text-sm text-white/70 leading-relaxed">{description}</p>
    </motion.div>
  )
}
