import React from 'react'
import Link from 'next/link'
import { 
  MessageCircle, 
  Video, 
  Youtube, 
  BarChart3, 
  Dumbbell,
  Play,
  Users,
  TrendingUp
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-yellow-400" />
              <span className="text-xl font-bold text-white">FitGPT Studio</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">機能</a>
              <a href="#live" className="text-white/80 hover:text-white transition-colors">ライブ</a>
              <a href="#archive" className="text-white/80 hover:text-white transition-colors">アーカイブ</a>
              <button className="bg-yellow-400 text-purple-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                今すぐ始める
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              あなた専用の
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                AIパーソナルトレーナー
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              AIチャットボット × ライブ配信 × YouTube動画で、
              <br />
              あなたの理想のカラダづくりを24時間サポート
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat" className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 text-center">
                🤖 AIトレーナーと話す
              </Link>
              <Link href="/live" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all text-center">
                📺 ライブ配信を見る
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            4つのコア機能
          </h2>
          <p className="text-xl text-white/70">
            科学的根拠とAIテクノロジーで、最高の結果を実現
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* AI Chat */}
          <Link href="/chat" className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all group block">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">AIチャットボット</h3>
            <p className="text-white/70 mb-6">
              24時間いつでも相談可能。あなたの目標に合わせたパーソナライズされたアドバイスを提供。
            </p>
            <ul className="text-sm text-white/60 space-y-2">
              <li>• トレーニングメニュー提案</li>
              <li>• 栄養・食事アドバイス</li>
              <li>• モチベーション管理</li>
            </ul>
          </Link>

          {/* Live Streaming */}
          <Link href="/live" className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all group block">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Video className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">ライブ配信</h3>
            <p className="text-white/70 mb-6">
              プロトレーナーによるリアルタイムワークアウト。一緒に汗を流しましょう。
            </p>
            <ul className="text-sm text-white/60 space-y-2">
              <li>• 毎日のライブワークアウト</li>
              <li>• リアルタイムQ&A</li>
              <li>• コミュニティ交流</li>
            </ul>
          </Link>

          {/* YouTube Archive */}
          <Link href="/archive" className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all group block">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Youtube className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">動画アーカイブ</h3>
            <p className="text-white/70 mb-6">
              過去の人気動画を定期配信。あなたのレベルに合った動画を自動でお届け。
            </p>
            <ul className="text-sm text-white/60 space-y-2">
              <li>• レベル別動画配信</li>
              <li>• 専門家解説付き</li>
              <li>• プログレッシブ学習</li>
            </ul>
          </Link>

          {/* Progress Tracking */}
          <Link href="/progress" className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/20 transition-all group block">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">プログレス管理</h3>
            <p className="text-white/70 mb-6">
              詳細な記録と分析で、あなたの成長を見える化。モチベーション維持をサポート。
            </p>
            <ul className="text-sm text-white/60 space-y-2">
              <li>• ワークアウト記録</li>
              <li>• 体調・栄養管理</li>
              <li>• AI分析レポート</li>
            </ul>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-black/20 backdrop-blur-md py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">10,000+</div>
              <div className="text-white/70">アクティブユーザー</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-white/70">ライブセッション/月</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-white/70">ユーザー満足度</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          今すぐあなたの変革を始めよう
        </h2>
        <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
          14日間無料トライアル。いつでもキャンセル可能。
        </p>
        <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 px-12 py-4 rounded-xl font-bold text-xl hover:from-yellow-300 hover:to-orange-300 transition-all transform hover:scale-105">
          🚀 無料で始める
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Dumbbell className="h-6 w-6 text-yellow-400" />
              <span className="text-lg font-bold text-white">FitGPT Studio</span>
            </div>
            <div className="text-white/60 text-sm">
              © 2024 FitGPT Studio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 