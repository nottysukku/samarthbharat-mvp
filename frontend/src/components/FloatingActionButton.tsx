import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { useState, ReactNode } from 'react'

interface Action {
  icon: ReactNode
  label: string
  onClick: () => void
  color: string
}

interface FloatingActionButtonProps {
  actions: Action[]
}

export default function FloatingActionButton({ actions }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3"
          >
            {actions.map((action, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  action.onClick()
                  setIsOpen(false)
                }}
                className={`${action.color} text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center gap-3 pr-6`}
              >
                <div className="flex items-center justify-center w-6 h-6">
                  {action.icon}
                </div>
                <span className="text-sm font-semibold whitespace-nowrap">{action.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-5 rounded-full shadow-2xl hover:shadow-3xl transition-shadow"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </motion.div>
      </motion.button>
    </div>
  )
}
