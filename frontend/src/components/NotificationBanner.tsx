import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NotificationBannerProps {
  message: string
  type?: 'info' | 'success' | 'warning'
  autoHide?: boolean
  duration?: number
}

export default function NotificationBanner({ 
  message, 
  type = 'info', 
  autoHide = true,
  duration = 5000 
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [autoHide, duration])

  const colors = {
    info: 'from-blue-500 to-cyan-500',
    success: 'from-green-500 to-emerald-500',
    warning: 'from-orange-500 to-red-500'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <div className={`backdrop-blur-xl bg-gradient-to-r ${colors[type]} rounded-2xl shadow-2xl p-4 border border-white/20`}>
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <Bell className="text-white" size={24} />
              </motion.div>
              
              <p className="flex-1 text-white font-medium text-sm">
                {message}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="text-white" size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
