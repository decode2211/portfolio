'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, LogOut, ExternalLink } from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem('admin_session')
    if (!session) {
      router.replace('/admin/login')
    } else {
      const parsed = JSON.parse(session)
      const age = Date.now() - parsed.ts
      // Expire after 24 hours
      if (!parsed.loggedIn || age > 86400000) {
        localStorage.removeItem('admin_session')
        router.replace('/admin/login')
      } else {
        setChecking(false)
      }
    }
  }, [router])

  function handleLogout() {
    localStorage.removeItem('admin_session')
    router.replace('/admin/login')
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-gray-500 text-sm animate-pulse">Verifying session…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-neon-blue/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-neon-purple/8 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center space-y-6 max-w-md mx-4"
      >
        <div className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(139,92,246,0.15) 100%)',
            border: '1px solid rgba(0,212,255,0.25)',
            boxShadow: '0 0 24px rgba(0,212,255,0.15)',
          }}
        >
          <Zap className="w-8 h-8 text-neon-blue" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, Dev.</h1>
          <p className="text-gray-500 text-sm mt-1">Dashboard is being built. More sections coming soon.</p>
        </div>

        <div className="flex gap-3 justify-center">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white border border-white/10 hover:border-white/20 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Preview Site
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-red-400 border border-red-500/20 hover:border-red-500/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  )
}
