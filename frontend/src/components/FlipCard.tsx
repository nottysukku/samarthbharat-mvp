import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, CheckCircle } from 'lucide-react'

interface FlipCardProps {
  title: string
  description: string
  benefits: string[]
  link?: string
  icon: string
  gradient: string
}

export default function FlipCard({ title, description, benefits, link, icon, gradient }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="relative h-80 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className={`h-full bg-gradient-to-br ${gradient} rounded-3xl p-6 shadow-2xl flex flex-col justify-between`}>
            <div>
              <div className="text-6xl mb-4">{icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
              <p className="text-white/90 text-sm line-clamp-3">{description}</p>
            </div>
            <div className="text-white/70 text-sm font-medium">
              Click to see benefits →
            </div>
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Key Benefits</h3>
              <ul className="space-y-2">
                {benefits.slice(0, 4).map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/90 text-sm">
                    <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={16} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 bg-white text-gray-900 py-2 px-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                <span>Learn More</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
