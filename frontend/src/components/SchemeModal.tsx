import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, CheckCircle } from 'lucide-react'

interface Scheme {
  id: string
  name: string
  description: string
  eligibility: string[]
  benefits: string[]
  applicationLink?: string
}

interface SchemeModalProps {
  scheme: Scheme | null
  isOpen: boolean
  onClose: () => void
}

export default function SchemeModal({ scheme, isOpen, onClose }: SchemeModalProps) {
  if (!scheme) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-t-3xl">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold pr-8">{scheme.name}</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{scheme.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Eligibility</h3>
                  <ul className="space-y-2">
                    {scheme.eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {scheme.benefits.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {scheme.applicationLink && (
                  <a
                    href={scheme.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-shadow"
                  >
                    <span>Apply Now</span>
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
