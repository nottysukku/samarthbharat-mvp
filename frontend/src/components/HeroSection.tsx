import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  ctaText?: string
  onCtaClick?: () => void
}

export default function HeroSection({ 
  title, 
  subtitle, 
  description, 
  ctaText, 
  onCtaClick 
}: HeroSectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16 relative"
    >
      {/* Animated background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl -z-10"
      />

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="inline-block mb-4"
      >
        <Sparkles className="text-yellow-400 mx-auto" size={48} />
      </motion.div>

      <motion.h2 
        className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h2>

      <motion.p 
        className="text-2xl md:text-3xl text-white/90 mb-3 font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {subtitle}
      </motion.p>

      <motion.p 
        className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {description}
      </motion.p>

      {ctaText && onCtaClick && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCtaClick}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-shadow inline-flex items-center gap-2"
        >
          {ctaText}
          <ArrowRight size={20} />
        </motion.button>
      )}
    </motion.div>
  )
}
