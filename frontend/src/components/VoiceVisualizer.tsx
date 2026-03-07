import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'

interface VoiceVisualizerProps {
  isRecording: boolean
}

export default function VoiceVisualizer({ isRecording }: VoiceVisualizerProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: isRecording ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative inline-block"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
            <Mic size={48} className="text-white" />
          </div>
          
          {isRecording && (
            <>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-red-500 rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 bg-pink-500 rounded-full"
              />
            </>
          )}
        </motion.div>
        
        <motion.p
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white text-xl font-semibold mt-6"
        >
          {isRecording ? 'Listening...' : 'Starting...'}
        </motion.p>
        
        {isRecording && (
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{
                  height: [20, 40, 20],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
                className="w-2 bg-white rounded-full"
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
