'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, LayoutDashboard, User, Briefcase, FolderOpen,
  Code2, Trophy, Mail, LogOut, ExternalLink, Menu, X,
  ChevronRight, Cpu
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard',            label: 'Overview',    icon: LayoutDashboard },
  { href: '/admin/dashboard/hero',       label: 'Hero',        icon: Zap },
  { href: '/admin/dashboard/about',      label: 'About',       icon: User },
  { href: '/admin/dashboard/experience', label: 'Experience',  icon: Briefcase },
  { href: '/admin/dashboard/projects',   label: 'Projects',    icon: FolderOpen },
  { href: '/admin/dashboard/skills',     label: 'Skills',      icon: Cpu },
  { href: '/admin/dashboard/leetcode',   label: 'LeetCode',    icon: Trophy },
  { href: '/admin/dashboard/contact',    label: 'Contact',     icon: Mail },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter()
  const pathname = usePathname()
  const [checking, setChecking]   = useState(true)
  const [sidebarOpen, setSidebar] = useState(false)

  // Auth guard
  useEffect(() => {
    if (pathname === '/admin/login') { setChecking(false); return }
    const raw = localStorage.getItem('admin_session')
    if (!raw) { router.replace('/admin/login'); return }
    try {
      const s = JSON.parse(raw)
      if (!s.loggedIn || Date.now() - s.ts > 86400000) {
        localStorage.removeItem('admin_session')
        router.replace('/admin/login')
      } else {
        setChecking(false)
      }
    } catch {
      router.replace('/admin/login')
    }
  }, [pathname, router])

  function logout() {
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

  // Login page — no sidebar
  if (pathname === '/admin/login') return <>{children}</>

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={`${mobile ? 'w-full' : 'w-64'} flex flex-col h-full`}
      style={{
        background: 'rgba(12, 12, 12, 0.95)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Brand */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(0,212,255,0.2) 0%, rgba(139,92,246,0.2) 100%)',
              border: '1px solid rgba(0,212,255,0.3)',
            }}
          >
            <Zap className="w-4 h-4 text-neon-blue" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Dev Vashist</div>
            <div className="text-[11px] text-gray-500">Portfolio CMS</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-3 mb-3">
          Sections
        </div>
        {navItems.map((item) => {
          const Icon    = item.icon
          const active  = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebar(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-150 group relative
                ${active
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]'}
              `}
              style={active ? {
                background: 'linear-gradient(90deg, rgba(0,212,255,0.12) 0%, rgba(139,92,246,0.06) 100%)',
                border: '1px solid rgba(0,212,255,0.15)',
              } : {}}
            >
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-neon-blue"
                />
              )}
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-neon-blue' : ''}`} />
              {item.label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-neon-blue/60" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-5 pt-3 border-t border-white/[0.06] space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-300 hover:bg-white/[0.04] transition-all duration-150"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          Preview Site
        </a>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500/70 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-150"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-dark-bg flex" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-64 shrink-0 fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebar(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
            >
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Mobile topbar */}
        <div
          className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] sticky top-0 z-20"
          style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)' }}
        >
          <button
            onClick={() => setSidebar(true)}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-sm font-medium text-white">
            {navItems.find(n => n.href === pathname)?.label ?? 'Admin'}
          </div>
          <button
            onClick={logout}
            className="ml-auto text-red-500/60 hover:text-red-400 transition-colors p-1"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Page content */}
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 p-6 lg:p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
