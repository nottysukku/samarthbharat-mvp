import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  role: string
  avatar: string
  rating: number
  text: string
  delay?: number
}

export default function TestimonialCard({ 
  name, 
  role, 
  avatar, 
  rating, 
  text, 
  delay = 0 
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl relative"
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-4 right-4 text-white/20"
      >
        <Quote size={48} />
      </motion.div>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-2xl font-bold text-white">
          {avatar}
        </div>
        <div>
          <h4 className="text-white font-bold text-lg">{name}</h4>
          <p className="text-white/70 text-sm">{role}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, idx) => (
          <Star
            key={idx}
            size={16}
            className={idx < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}
          />
        ))}
      </div>

      <p className="text-white/90 text-sm leading-relaxed italic">
        "{text}"
      </p>
    </motion.div>
  )
}
