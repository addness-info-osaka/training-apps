'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Dumbbell, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

const SAMPLE_RESPONSES = [
  "こんにちは！🤖 今日のトレーニングはどのような内容をお考えですか？あなたの目標に合わせてメニューを提案いたします！",
  "素晴らしい質問ですね！💪 筋肥大を目指すなら、8-12回で限界を迎える重量で3-4セット行うことをお勧めします。タンパク質も体重1kgあたり2g程度を目安に摂取しましょう。",
  "今日の体調はいかがですか？😊 疲労を感じている場合は軽めのアクティブリカバリーがおすすめです。ストレッチやウォーキングから始めてみましょう。",
  "栄養についてのご質問ですね！🍎 トレーニング後30分以内のプロテイン摂取が筋合成に効果的です。炭水化物も一緒に摂ると回復が早まりますよ。",
  "モチベーションが下がってしまったんですね...😔 そんな時は小さな目標から始めましょう！今週は週2回のトレーニングを目標にしてみませんか？"
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'こんにちは！私はあなた専用のAIパーソナルトレーナーです。💪 トレーニングや栄養、モチベーションについて何でもお聞きください！',
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI response (in real app, this would call OpenAI API)
    setTimeout(() => {
      const randomResponse = SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)]
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="border-b border-white/10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>戻る</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-yellow-400" />
              <h1 className="text-xl font-bold text-white">AIパーソナルトレーナー</h1>
            </div>
            <div className="w-12" /> {/* Spacer */}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          {/* Messages */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-yellow-400 text-purple-900'
                      : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`flex-1 px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-yellow-400 text-purple-900 ml-8'
                      : 'bg-white/10 text-white mr-8'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-purple-700' : 'text-white/60'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('ja-JP', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1 px-4 py-3 bg-white/10 text-white mr-8 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="トレーニングや栄養について質問してください..."
                  className="w-full px-4 py-3 bg-white/10 text-white placeholder-white/60 rounded-xl border border-white/20 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 resize-none"
                  rows={2}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-yellow-400 text-purple-900 p-3 rounded-xl hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setInputMessage('今日のおすすめワークアウトメニューを教えて')}
            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-colors text-left"
          >
            <div className="font-semibold mb-1">💪 今日のメニュー</div>
            <div className="text-sm text-white/70">おすすめワークアウトを提案</div>
          </button>
          <button 
            onClick={() => setInputMessage('筋肥大に効果的な栄養摂取方法を教えて')}
            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-colors text-left"
          >
            <div className="font-semibold mb-1">🍎 栄養アドバイス</div>
            <div className="text-sm text-white/70">食事・サプリメント相談</div>
          </button>
          <button 
            onClick={() => setInputMessage('モチベーションが下がってます。アドバイスください')}
            className="bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl transition-colors text-left"
          >
            <div className="font-semibold mb-1">🔥 モチベーション</div>
            <div className="text-sm text-white/70">やる気アップのコツ</div>
          </button>
        </div>
      </div>
    </div>
  )
} 