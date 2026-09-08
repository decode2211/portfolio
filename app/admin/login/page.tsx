'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Lock, User, Zap, AlertCircle, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Small artificial delay for UX feel
    await new Promise((r) => setTimeout(r, 600))

    const adminUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

    if (username === adminUser && password === adminPass) {
      // Store session in localStorage (replace with next-auth when ready)
      localStorage.setItem('admin_session', JSON.stringify({ loggedIn: true, ts: Date.now() }))
      router.push('/admin/dashboard')
    } else {
      setError('Invalid username or password.')
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center relative overflow-hidden">

      {/* Background ambient blobs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-neon-blue/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-neon-purple/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/3 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Top glow line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-blue/60 to-transparent mb-0 rounded-t-2xl" />

        <div
          className="rounded-2xl p-8 space-y-7"
          style={{
            background: 'rgba(17, 17, 17, 0.85)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,255,0.05)',
          }}
        >

          {/* Logo / Brand */}
          <div className="flex flex-col items-center gap-3 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(139,92,246,0.15) 100%)',
                border: '1px solid rgba(0,212,255,0.25)',
                boxShadow: '0 0 24px rgba(0,212,255,0.15)',
              }}
            >
              <Zap className="w-7 h-7 text-neon-blue" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h1 className="text-xl font-bold text-white tracking-tight">
                Admin Portal
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Dev Vashist · Portfolio CMS
              </p>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  autoComplete="username"
                  required
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-11 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.08)] transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-150"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2.5 text-red-400 text-sm bg-red-500/8 border border-red-500/20 rounded-lg px-3.5 py-2.5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full relative overflow-hidden rounded-lg py-3 px-6 font-semibold text-sm text-white flex items-center justify-center gap-2.5 mt-2 transition-opacity duration-200 disabled:opacity-60"
              style={{
                background: 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 100%)',
                boxShadow: '0 0 24px rgba(0,212,255,0.25)',
              }}
            >
              {/* Shimmer overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-white/10 pointer-events-none"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.4 }}
              />

              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4 text-white/80"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Footer hint */}
          <p className="text-center text-xs text-gray-600">
            Restricted access · Portfolio admin only
          </p>
        </div>

        {/* Bottom glow line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent mt-0 rounded-b-2xl" />
      </motion.div>
    </div>
  )
}
