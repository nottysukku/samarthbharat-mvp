import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
  color?: string
  height?: string
  showLabel?: boolean
}

export default function ProgressBar({ 
  progress, 
  color = 'from-blue-500 to-purple-500', 
  height = 'h-2',
  showLabel = false 
}: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className={`w-full bg-white/20 rounded-full overflow-hidden ${height} backdrop-blur-sm`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${color} rounded-full relative`}
        >
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
      {showLabel && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-white/70 mt-1 text-right"
        >
          {progress}%
        </motion.p>
      )}
    </div>
  )
}
