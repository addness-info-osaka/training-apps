'use client'

import React, { useState } from 'react'
import { BarChart3, Calendar, Plus, TrendingUp, ArrowLeft, Target, Activity, Award } from 'lucide-react'
import Link from 'next/link'

interface WorkoutRecord {
  id: string
  date: Date
  exercise: string
  sets: number
  reps: number
  weight: number
  duration?: number
  category: string
}

interface BodyMetrics {
  date: Date
  weight: number
  bodyFat: number
  muscleMass: number
}

const WORKOUT_RECORDS: WorkoutRecord[] = [
  { id: '1', date: new Date('2024-01-15'), exercise: 'ベンチプレス', sets: 3, reps: 10, weight: 80, category: 'chest' },
  { id: '2', date: new Date('2024-01-15'), exercise: 'スクワット', sets: 3, reps: 12, weight: 100, category: 'legs' },
  { id: '3', date: new Date('2024-01-13'), exercise: 'デッドリフト', sets: 3, reps: 8, weight: 120, category: 'back' },
  { id: '4', date: new Date('2024-01-13'), exercise: 'ショルダープレス', sets: 3, reps: 10, weight: 40, category: 'shoulders' },
  { id: '5', date: new Date('2024-01-11'), exercise: 'ベンチプレス', sets: 3, reps: 10, weight: 77.5, category: 'chest' },
  { id: '6', date: new Date('2024-01-11'), exercise: 'スクワット', sets: 3, reps: 12, weight: 95, category: 'legs' },
  { id: '7', date: new Date('2024-01-09'), exercise: 'HIIT', sets: 1, reps: 1, weight: 0, duration: 20, category: 'cardio' },
]

const BODY_METRICS: BodyMetrics[] = [
  { date: new Date('2024-01-15'), weight: 72.5, bodyFat: 12.8, muscleMass: 63.2 },
  { date: new Date('2024-01-10'), weight: 72.8, bodyFat: 13.2, muscleMass: 62.9 },
  { date: new Date('2024-01-05'), weight: 73.1, bodyFat: 13.6, muscleMass: 62.5 },
  { date: new Date('2024-01-01'), weight: 73.5, bodyFat: 14.0, muscleMass: 62.1 },
]

const EXERCISE_CATEGORIES = [
  { id: 'chest', name: '胸', color: 'bg-red-500', icon: '💪' },
  { id: 'back', name: '背中', color: 'bg-blue-500', icon: '🔙' },
  { id: 'legs', name: '脚', color: 'bg-green-500', icon: '🦵' },
  { id: 'shoulders', name: '肩', color: 'bg-yellow-500', icon: '👐' },
  { id: 'arms', name: '腕', color: 'bg-purple-500', icon: '💪' },
  { id: 'cardio', name: '有酸素', color: 'bg-pink-500', icon: '🏃‍♂️' },
]

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [showAddRecord, setShowAddRecord] = useState(false)

  const getTotalWorkouts = () => {
    const today = new Date()
    const startDate = new Date()
    
    if (selectedPeriod === 'week') {
      startDate.setDate(today.getDate() - 7)
    } else if (selectedPeriod === 'month') {
      startDate.setMonth(today.getMonth() - 1)
    } else {
      startDate.setFullYear(today.getFullYear() - 1)
    }

    return WORKOUT_RECORDS.filter(record => record.date >= startDate).length
  }

  const getMaxWeight = (exercise: string) => {
    const records = WORKOUT_RECORDS.filter(record => record.exercise === exercise)
    return records.length > 0 ? Math.max(...records.map(r => r.weight)) : 0
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })
  }

  const getLatestMetrics = () => {
    return BODY_METRICS[0] || { weight: 0, bodyFat: 0, muscleMass: 0 }
  }

  const getMetricsChange = () => {
    if (BODY_METRICS.length < 2) return { weight: 0, bodyFat: 0, muscleMass: 0 }
    
    const latest = BODY_METRICS[0]
    const previous = BODY_METRICS[1]
    
    return {
      weight: latest.weight - previous.weight,
      bodyFat: latest.bodyFat - previous.bodyFat,
      muscleMass: latest.muscleMass - previous.muscleMass
    }
  }

  const latestMetrics = getLatestMetrics()
  const metricsChange = getMetricsChange()

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
              <BarChart3 className="h-8 w-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">プログレス管理</h1>
            </div>
            <button
              onClick={() => setShowAddRecord(true)}
              className="bg-yellow-400 text-purple-900 p-2 rounded-lg hover:bg-yellow-300 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-1">
            {[
              { id: 'week', name: '1週間' },
              { id: 'month', name: '1ヶ月' },
              { id: 'year', name: '1年' }
            ].map(period => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedPeriod === period.id
                    ? 'bg-yellow-400 text-purple-900'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {period.name}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Workouts */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{getTotalWorkouts()}</h3>
            <p className="text-white/70 text-sm">ワークアウト回数</p>
          </div>

          {/* Max Bench Press */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{getMaxWeight('ベンチプレス')}kg</h3>
            <p className="text-white/70 text-sm">ベンチプレス最大</p>
          </div>

          {/* Body Weight */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className={`text-sm ${metricsChange.weight > 0 ? 'text-red-400' : 'text-green-400'}`}>
                {metricsChange.weight > 0 ? '+' : ''}{metricsChange.weight.toFixed(1)}kg
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{latestMetrics.weight}kg</h3>
            <p className="text-white/70 text-sm">体重</p>
          </div>

          {/* Body Fat */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className={`text-sm ${metricsChange.bodyFat > 0 ? 'text-red-400' : 'text-green-400'}`}>
                {metricsChange.bodyFat > 0 ? '+' : ''}{metricsChange.bodyFat.toFixed(1)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{latestMetrics.bodyFat}%</h3>
            <p className="text-white/70 text-sm">体脂肪率</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Workouts */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">🏋️‍♂️ 最近のワークアウト</h2>
              <Calendar className="h-5 w-5 text-white/60" />
            </div>

            <div className="space-y-4">
              {WORKOUT_RECORDS.slice(0, 6).map(record => {
                const category = EXERCISE_CATEGORIES.find(cat => cat.id === record.category)
                return (
                  <div key={record.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${category?.color || 'bg-gray-500'} flex items-center justify-center`}>
                        <span className="text-lg">{category?.icon || '💪'}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{record.exercise}</h3>
                        <p className="text-white/60 text-sm">{formatDate(record.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {record.duration ? (
                        <p className="text-white font-semibold">{record.duration}分</p>
                      ) : (
                        <>
                          <p className="text-white font-semibold">{record.weight}kg</p>
                          <p className="text-white/60 text-sm">{record.sets}×{record.reps}</p>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Body Metrics Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">📊 体組成変化</h2>
              <BarChart3 className="h-5 w-5 text-white/60" />
            </div>

            <div className="space-y-6">
              {/* Weight Chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">体重</span>
                  <span className="text-white font-semibold">{latestMetrics.weight}kg</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              {/* Body Fat Chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">体脂肪率</span>
                  <span className="text-white font-semibold">{latestMetrics.bodyFat}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>

              {/* Muscle Mass Chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">筋肉量</span>
                  <span className="text-white font-semibold">{latestMetrics.muscleMass}kg</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="bg-white/10 rounded-xl p-4 mt-6">
                <h3 className="text-white font-semibold mb-3">📈 今月の成果</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className={`text-lg font-bold ${metricsChange.weight > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {metricsChange.weight > 0 ? '+' : ''}{metricsChange.weight.toFixed(1)}
                    </p>
                    <p className="text-white/60 text-xs">体重(kg)</p>
                  </div>
                  <div>
                    <p className={`text-lg font-bold ${metricsChange.bodyFat > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {metricsChange.bodyFat > 0 ? '+' : ''}{metricsChange.bodyFat.toFixed(1)}
                    </p>
                    <p className="text-white/60 text-xs">体脂肪(%)</p>
                  </div>
                  <div>
                    <p className={`text-lg font-bold ${metricsChange.muscleMass > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {metricsChange.muscleMass > 0 ? '+' : ''}{metricsChange.muscleMass.toFixed(1)}
                    </p>
                    <p className="text-white/60 text-xs">筋肉量(kg)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 mt-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 rounded-xl flex items-center justify-center">
              <span className="text-lg">🤖</span>
            </div>
            <h2 className="text-xl font-bold text-white">AI分析レポート</h2>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-white leading-relaxed">
              素晴らしい進歩です！💪 過去1ヶ月間で{getTotalWorkouts()}回のワークアウトを完了し、
              体脂肪率が{Math.abs(metricsChange.bodyFat).toFixed(1)}%減少しています。
              筋肉量も{metricsChange.muscleMass > 0 ? '増加' : '維持'}されており、
              理想的なボディメイクが進んでいます。
              
              <br /><br />
              
              <strong>次週の推奨：</strong> ベンチプレスの重量を2.5kg増やし、
              有酸素運動を週2回に増やすことで、さらなる体脂肪減少が期待できます。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 