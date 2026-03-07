import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface TimelineStepProps {
  icon: LucideIcon
  title: string
  description: string
  step: number
  isLast?: boolean
  delay?: number
}

export default function TimelineStep({ 
  icon: Icon, 
  title, 
  description, 
  step, 
  isLast = false,
  delay = 0 
}: TimelineStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-6 relative"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-white/30 to-transparent" />
      )}

      {/* Icon circle */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex-shrink-0"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-lg">
          <Icon className="text-white" size={28} />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center text-sm font-bold shadow-lg">
          {step}
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <motion.div
          whileHover={{ x: 5 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-white/70 leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
