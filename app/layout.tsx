import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CursorGlow from './components/CursorGlow'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dev Vashist - ML Engineer & Data Scientist',
  description: 'Software Developer & Data Science Engineer specializing in AI-driven systems, full-stack architecture, and low-latency applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CursorGlow />
        {children}
      </body>
    </html>
  )
}