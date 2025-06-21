import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FitGPT Studio - AIパーソナルトレーナー',
  description: '科学的根拠に基づく筋トレ・健康管理AIアシスタント',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
} 