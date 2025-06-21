'use client'

import React, { useState, useEffect } from 'react'
import { Play, Users, Calendar, Clock, ArrowLeft, Video, MessageCircle, Heart } from 'lucide-react'
import Link from 'next/link'

interface LiveStream {
  id: string
  title: string
  instructor: string
  viewers: number
  duration: string
  thumbnail: string
  isLive: boolean
  scheduledTime?: Date
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

const LIVE_STREAMS: LiveStream[] = [
  {
    id: '1',
    title: '🔥 朝の全身HIITワークアウト',
    instructor: '田中トレーナー',
    viewers: 1250,
    duration: '30分',
    thumbnail: 'https://via.placeholder.com/400x225/6366f1/ffffff?text=HIIT+Workout',
    isLive: true,
    description: '朝の代謝アップに最適な高強度インターバルトレーニング。初心者から上級者まで対応可能。',
    difficulty: 'intermediate'
  },
  {
    id: '2',
    title: '💪 筋力アップ：胸・肩・三頭筋',
    instructor: '山田コーチ',
    viewers: 0,
    duration: '45分',
    thumbnail: 'https://via.placeholder.com/400x225/8b5cf6/ffffff?text=Upper+Body',
    isLive: false,
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2時間後
    description: '上半身の筋力強化に特化したワークアウト。ダンベルとバーベルを使用します。',
    difficulty: 'advanced'
  },
  {
    id: '3',
    title: '🧘‍♀️ ヨガ＆ストレッチでリラックス',
    instructor: '佐藤インストラクター',
    viewers: 0,
    duration: '25分',
    thumbnail: 'https://via.placeholder.com/400x225/06b6d4/ffffff?text=Yoga+Stretch',
    isLive: false,
    scheduledTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4時間後
    description: '一日の疲れを癒やすリラックスヨガ。呼吸法とストレッチで心身を整えます。',
    difficulty: 'beginner'
  }
]

const PAST_STREAMS: LiveStream[] = [
  {
    id: '4',
    title: '🏃‍♂️ 脂肪燃焼カーディオ30分',
    instructor: '田中トレーナー',
    viewers: 2100,
    duration: '30分',
    thumbnail: 'https://via.placeholder.com/400x225/ef4444/ffffff?text=Cardio+Blast',
    isLive: false,
    description: '効率的な脂肪燃焼を目指すカーディオワークアウト。器具不要で自宅でできます。',
    difficulty: 'intermediate'
  },
  {
    id: '5',
    title: '🦵 下半身強化：スクワット特訓',
    instructor: '鈴木トレーナー',
    viewers: 1800,
    duration: '40分',
    thumbnail: 'https://via.placeholder.com/400x225/f59e0b/ffffff?text=Leg+Day',
    isLive: false,
    description: '下半身の筋力とパワーを向上させるスクワット中心のトレーニング。',
    difficulty: 'advanced'
  }
]

export default function LivePage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500'
      case 'intermediate': return 'bg-yellow-500'
      case 'advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '初級'
      case 'intermediate': return '中級'
      case 'advanced': return '上級'
      default: return ''
    }
  }

  const formatTimeUntilStart = (scheduledTime: Date) => {
    const diff = scheduledTime.getTime() - currentTime.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}時間${minutes}分後`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>戻る</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Video className="h-8 w-8 text-red-500" />
              <h1 className="text-xl font-bold text-white">ライブ配信</h1>
            </div>
            <div className="w-12" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Live Now Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-2xl font-bold text-white">🔴 ライブ配信中</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {LIVE_STREAMS.filter(stream => stream.isLive).map(stream => (
              <div key={stream.id} className="relative">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/20 transition-all">
                  <div className="relative">
                    <img 
                      src={stream.thumbnail} 
                      alt={stream.title}
                      className="w-full h-64 object-cover"
                    />
                    {/* Live indicator */}
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      <span>LIVE</span>
                    </div>
                    {/* Difficulty badge */}
                    <div className={`absolute top-4 right-4 ${getDifficultyColor(stream.difficulty)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                      {getDifficultyText(stream.difficulty)}
                    </div>
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors cursor-pointer">
                      <div className="bg-white/20 backdrop-blur-md rounded-full p-4 hover:bg-white/30 transition-colors">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{stream.title}</h3>
                    <p className="text-white/70 mb-4">{stream.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{stream.viewers.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{stream.duration}</span>
                        </span>
                      </div>
                      <span className="text-white/80 font-medium">{stream.instructor}</span>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-colors">
                        今すぐ参加
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-colors">
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Streams */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">📅 予定されている配信</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LIVE_STREAMS.filter(stream => !stream.isLive && stream.scheduledTime).map(stream => (
              <div key={stream.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/20 transition-all">
                <div className="relative">
                  <img 
                    src={stream.thumbnail} 
                    alt={stream.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute top-4 right-4 ${getDifficultyColor(stream.difficulty)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                    {getDifficultyText(stream.difficulty)}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm">
                    {formatTimeUntilStart(stream.scheduledTime!)}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{stream.title}</h3>
                  <p className="text-white/70 text-sm mb-4">{stream.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{stream.duration}</span>
                      </span>
                    </div>
                    <span className="text-white/80 font-medium">{stream.instructor}</span>
                  </div>

                  <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-xl font-semibold transition-colors">
                    リマインダー設定
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Streams */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <Play className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">📼 過去の配信</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAST_STREAMS.map(stream => (
              <div key={stream.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/20 transition-all cursor-pointer">
                <div className="relative">
                  <img 
                    src={stream.thumbnail} 
                    alt={stream.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className={`absolute top-4 right-4 ${getDifficultyColor(stream.difficulty)} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                    {getDifficultyText(stream.difficulty)}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-colors">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{stream.title}</h3>
                  
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{stream.viewers.toLocaleString()}</span>
                    </span>
                    <span>{stream.instructor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 