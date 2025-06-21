'use client'

import React, { useState } from 'react'
import { Youtube, Play, Clock, Eye, ArrowLeft, Search, Filter, Star } from 'lucide-react'
import Link from 'next/link'

interface Video {
  id: string
  title: string
  description: string
  duration: string
  views: number
  rating: number
  thumbnail: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  instructor: string
  uploadDate: Date
  featured?: boolean
}

const CATEGORIES = [
  { id: 'all', name: '全て', icon: '🎯' },
  { id: 'hiit', name: 'HIIT', icon: '🔥' },
  { id: 'strength', name: '筋トレ', icon: '💪' },
  { id: 'cardio', name: 'カーディオ', icon: '🏃‍♂️' },
  { id: 'yoga', name: 'ヨガ', icon: '🧘‍♀️' },
  { id: 'stretch', name: 'ストレッチ', icon: '🤸‍♀️' },
  { id: 'nutrition', name: '栄養学', icon: '🍎' }
]

const VIDEOS: Video[] = [
  {
    id: '1',
    title: '初心者向け全身HIIT15分 - 器具なしで脂肪燃焼',
    description: '自宅で簡単にできる高強度インターバルトレーニング。15分で効率的に脂肪を燃焼させましょう。',
    duration: '15:32',
    views: 125000,
    rating: 4.8,
    thumbnail: 'https://via.placeholder.com/480x270/ef4444/ffffff?text=HIIT+15min',
    category: 'hiit',
    difficulty: 'beginner',
    instructor: '田中フィットネス',
    uploadDate: new Date('2024-01-15'),
    featured: true
  },
  {
    id: '2',
    title: '胸筋パンプアップ！ダンベル集中トレーニング30分',
    description: '大胸筋の発達に効果的なダンベルエクササイズを厳選。初心者から上級者まで対応。',
    duration: '32:18',
    views: 98000,
    rating: 4.9,
    thumbnail: 'https://via.placeholder.com/480x270/8b5cf6/ffffff?text=Chest+Workout',
    category: 'strength',
    difficulty: 'intermediate',
    instructor: '山田トレーニング',
    uploadDate: new Date('2024-01-10'),
    featured: true
  },
  {
    id: '3',
    title: '朝ヨガルーティン20分 - 1日を元気に始めよう',
    description: '朝の身体をほぐし、心を整える優しいヨガフロー。初心者にもおすすめです。',
    duration: '21:45',
    views: 87000,
    rating: 4.7,
    thumbnail: 'https://via.placeholder.com/480x270/06b6d4/ffffff?text=Morning+Yoga',
    category: 'yoga',
    difficulty: 'beginner',
    instructor: '佐藤ヨガスタジオ',
    uploadDate: new Date('2024-01-08'),
    featured: false
  },
  {
    id: '4',
    title: '脚の日！スクワット最強バリエーション10選',
    description: '下半身強化に最適なスクワットバリエーション。レベル別に解説します。',
    duration: '28:12',
    views: 156000,
    rating: 4.8,
    thumbnail: 'https://via.placeholder.com/480x270/f59e0b/ffffff?text=Leg+Day',
    category: 'strength',
    difficulty: 'advanced',
    instructor: '鈴木パワーリフティング',
    uploadDate: new Date('2024-01-05'),
    featured: false
  },
  {
    id: '5',
    title: '有酸素運動で心肺機能アップ！楽しいダンスワークアウト',
    description: '音楽に合わせて楽しく踊りながら心肺機能を向上。ストレス発散にも効果的。',
    duration: '25:30',
    views: 73000,
    rating: 4.6,
    thumbnail: 'https://via.placeholder.com/480x270/10b981/ffffff?text=Dance+Workout',
    category: 'cardio',
    difficulty: 'intermediate',
    instructor: 'ダンスフィット太郎',
    uploadDate: new Date('2024-01-03'),
    featured: false
  },
  {
    id: '6',
    title: '筋肥大のための栄養学 - プロテイン活用法完全ガイド',
    description: 'トレーニング効果を最大化する栄養摂取のタイミングと方法を科学的に解説。',
    duration: '18:45',
    views: 64000,
    rating: 4.9,
    thumbnail: 'https://via.placeholder.com/480x270/f97316/ffffff?text=Nutrition+Guide',
    category: 'nutrition',
    difficulty: 'intermediate',
    instructor: '栄養士花子',
    uploadDate: new Date('2024-01-01'),
    featured: false
  }
]

export default function ArchivePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')

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

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  const formatUploadDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return '今日'
    if (days === 1) return '昨日'
    if (days < 7) return `${days}日前`
    if (days < 30) return `${Math.floor(days / 7)}週間前`
    return `${Math.floor(days / 30)}ヶ月前`
  }

  const filteredVideos = VIDEOS
    .filter(video => selectedCategory === 'all' || video.category === selectedCategory)
    .filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.uploadDate.getTime() - a.uploadDate.getTime()
        case 'popular':
          return b.views - a.views
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const featuredVideos = VIDEOS.filter(video => video.featured)

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
              <Youtube className="h-8 w-8 text-red-500" />
              <h1 className="text-xl font-bold text-white">動画アーカイブ</h1>
            </div>
            <div className="w-12" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Videos */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Star className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">⭐ おすすめ動画</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredVideos.map(video => (
              <div key={video.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/20 transition-all cursor-pointer">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                    おすすめ
                  </div>
                  <div className={`absolute top-4 right-4 ${getDifficultyColor(video.difficulty)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                    {getDifficultyText(video.difficulty)}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-4 hover:bg-white/30 transition-colors">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-white/70 mb-4 line-clamp-2">{video.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{formatViews(video.views)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{video.rating}</span>
                    </span>
                    <span>{video.instructor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
              <input
                type="text"
                placeholder="動画を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 text-white placeholder-white/60 rounded-xl border border-white/20 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-white/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              >
                <option value="newest">新しい順</option>
                <option value="popular">人気順</option>
                <option value="rating">評価順</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-yellow-400 text-purple-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <div key={video.id} className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/20 transition-all cursor-pointer">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-3 right-3 ${getDifficultyColor(video.difficulty)} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                  {getDifficultyText(video.difficulty)}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                  <div className="bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-colors">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-white/70 text-sm mb-3 line-clamp-2">{video.description}</p>
                
                <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                  <span>{video.instructor}</span>
                  <span>{formatUploadDate(video.uploadDate)}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{formatViews(video.views)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{video.rating}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <Youtube className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">動画が見つかりませんでした</h3>
            <p className="text-white/70">検索条件を変更してお試しください。</p>
          </div>
        )}
      </div>
    </div>
  )
} 