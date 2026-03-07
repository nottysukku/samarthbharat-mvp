import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Image as ImageIcon, Mic, Shield } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface QuickAction {
  id: string
  label: string
  icon: string
  action: string
}

export default function ChatPage() {
  const { userType } = useParams<{ userType: string }>()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [quickActions, setQuickActions] = useState<QuickAction[]>([])
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const userTypeConfig = {
    farmer: {
      title: 'किसान सहायक',
      subtitle: 'Farmer Assistant',
      color: 'green',
      bgColor: 'bg-green-700',
      icon: '🌾'
    },
    student: {
      title: 'छात्र सहायक',
      subtitle: 'Student Assistant',
      color: 'blue',
      bgColor: 'bg-blue-700',
      icon: '📚'
    },
    startup: {
      title: 'व्यवसाय सहायक',
      subtitle: 'Business Assistant',
      color: 'orange',
      bgColor: 'bg-orange-600',
      icon: '💼'
    }
  }

  const config = userTypeConfig[userType as keyof typeof userTypeConfig] || userTypeConfig.farmer

  useEffect(() => {
    const greeting = {
      id: Date.now().toString(),
      role: 'assistant' as const,
      content: `नमस्ते! Welcome to SamarthBharat ${config.title}. How can I help you today?`,
      timestamp: new Date()
    }
    setMessages([greeting])
    loadQuickActions()
    toast.success('Chat started!')
  }, [userType])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadQuickActions = async () => {
    try {
      const response = await axios.post('/api/chat/message', {
        message: 'init',
        userType,
        conversationId: null
      })
      if (response.data.quickActions) {
        setQuickActions(response.data.quickActions)
      }
    } catch (error) {
      console.error('Failed to load quick actions:', error)
    }
  }

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input || '📷 Image uploaded',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await axios.post('/api/chat/message', {
        message: input,
        userType,
        conversationId: null,
        attachments: selectedImage ? [{ type: 'image', filename: selectedImage.name }] : []
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      
      if (response.data.quickActions) {
        setQuickActions(response.data.quickActions)
      }
      
      toast.success('Response received!')
    } catch (error) {
      console.error('Failed to send message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      toast.error('Failed to send message')
    } finally {
      setIsLoading(false)
      setSelectedImage(null)
      setImagePreview(null)
    }
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      toast.success('Image selected!')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Indian Flag Stripe */}
      <div className="gov-header"></div>

      {/* Header */}
      <header className={`${config.bgColor} text-white shadow-lg border-b-4 border-orange-500`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white hover:bg-white/20 px-3 py-2 rounded transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl">{config.icon}</span>
                <div>
                  <h1 className="text-xl font-bold">{config.title}</h1>
                  <p className="text-sm opacity-90">{config.subtitle}</p>
                </div>
              </div>
            </div>
            <div className="w-20 flex justify-end">
              <Shield size={24} />
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-lg px-5 py-3 shadow-md ${
                message.role === 'user'
                  ? `${config.bgColor} text-white`
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white rounded-lg px-5 py-3 shadow-md border border-gray-200">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <div className="px-4 py-2 max-w-4xl mx-auto w-full bg-white border-t border-gray-200">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.action)}
                className={`flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-200 transition-colors whitespace-nowrap text-sm font-medium`}
              >
                <span>{action.icon}</span>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview */}
      {imagePreview && (
        <div className="px-4 py-2 max-w-4xl mx-auto w-full bg-white border-t border-gray-200">
          <div className="bg-gray-100 rounded-lg p-2 inline-block border border-gray-300">
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="h-24 rounded" />
              <button
                onClick={() => {
                  setSelectedImage(null)
                  setImagePreview(null)
                  toast.success('Image removed')
                }}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow-lg hover:bg-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t-2 border-gray-300 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors border border-gray-300"
              title="Upload image"
            >
              <ImageIcon size={22} />
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />

            <button
              onClick={handleSend}
              disabled={isLoading || (!input.trim() && !selectedImage)}
              className={`p-3 ${config.bgColor} text-white rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Send size={22} />
            </button>
          </div>

          <div className="flex gap-2 mt-3 justify-center">
            <button
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-gray-300"
            >
              <Mic size={18} />
              <span>Voice Input</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
