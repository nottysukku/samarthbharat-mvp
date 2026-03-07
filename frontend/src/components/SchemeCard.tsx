import { motion } from 'framer-motion'
import { ExternalLink, Info } from 'lucide-react'
import { useState } from 'react'

interface SchemeCardProps {
  name: string
  description: string
  category: string
  benefits: string[]
  eligibility: string[]
  applicationLink?: string
  delay?: number
}

export default function SchemeCard({ 
  name, 
  description, 
  category, 
  benefits, 
  eligibility,
  applicationLink,
  delay = 0 
}: SchemeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const categoryColors: Record<string, string> = {
    farmer: 'from-green-500 to-emerald-600',
    student: 'from-blue-500 to-indigo-600',
    startup: 'from-orange-500 to-red-600',
    general: 'from-purple-500 to-pink-600'
  }

  const gradient = categoryColors[category.toLowerCase()] || categoryColors.general

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="h-80 perspective-1000"
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <motion.div
            whileHover={{ y: -5 }}
            className={`h-full backdrop-blur-xl bg-gradient-to-br ${gradient} rounded-3xl p-6 shadow-2xl border border-white/20 flex flex-col`}
          >
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                  {category}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFlipped(true)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                >
                  <Info size={18} className="text-white" />
                </motion.button>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                {name}
              </h3>

              <p className="text-white/90 text-sm leading-relaxed line-clamp-4">
                {description}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-xs font-medium">
                  {benefits.length} Benefits • {eligibility.length} Criteria
                </span>
                {applicationLink && (
                  <motion.a
                    href={applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white text-gray-900 rounded-full text-xs font-semibold hover:shadow-lg transition-shadow"
                  >
                    Apply
                    <ExternalLink size={12} />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="h-full backdrop-blur-xl bg-white/95 rounded-3xl p-6 shadow-2xl border border-white/20 overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900">Details</h4>
              <motion.button
                whileHover={{ scale: 1.1, rotate: -90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFlipped(false)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <Info size={18} className="text-gray-700" />
              </motion.button>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Benefits:</h5>
                <ul className="space-y-1">
                  {benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Eligibility:</h5>
                <ul className="space-y-1">
                  {eligibility.slice(0, 3).map((criteria, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
