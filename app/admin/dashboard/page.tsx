'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Zap, User, Briefcase, FolderOpen, Cpu,
  Trophy, Mail, ArrowRight, Activity
} from 'lucide-react'

const sections = [
  {
    href:    '/admin/dashboard/hero',
    label:   'Hero',
    icon:    Zap,
    desc:    'Name, role, tagline, CTA buttons',
    color:   'from-neon-blue/20 to-neon-blue/5',
    border:  'rgba(0,212,255,0.2)',
    iconCol: 'text-neon-blue',
  },
  {
    href:    '/admin/dashboard/about',
    label:   'About',
    icon:    User,
    desc:    'Bio, education, highlights',
    color:   'from-neon-purple/20 to-neon-purple/5',
    border:  'rgba(139,92,246,0.2)',
    iconCol: 'text-neon-purple',
  },
  {
    href:    '/admin/dashboard/experience',
    label:   'Experience',
    icon:    Briefcase,
    desc:    'Jobs, roles, tech stack, bullet points',
    color:   'from-blue-500/20 to-blue-500/5',
    border:  'rgba(59,130,246,0.2)',
    iconCol: 'text-blue-400',
  },
  {
    href:    '/admin/dashboard/projects',
    label:   'Projects',
    icon:    FolderOpen,
    desc:    'Project cards, links, metrics',
    color:   'from-emerald-500/20 to-emerald-500/5',
    border:  'rgba(16,185,129,0.2)',
    iconCol: 'text-emerald-400',
  },
  {
    href:    '/admin/dashboard/skills',
    label:   'Skills',
    icon:    Cpu,
    desc:    'Categories, skill names, proficiency',
    color:   'from-yellow-500/20 to-yellow-500/5',
    border:  'rgba(234,179,8,0.2)',
    iconCol: 'text-yellow-400',
  },
  {
    href:    '/admin/dashboard/leetcode',
    label:   'LeetCode',
    icon:    Trophy,
    desc:    'Stats, streak, difficulty breakdown',
    color:   'from-orange-500/20 to-orange-500/5',
    border:  'rgba(249,115,22,0.2)',
    iconCol: 'text-orange-400',
  },
  {
    href:    '/admin/dashboard/contact',
    label:   'Contact',
    icon:    Mail,
    desc:    'Email, social links, location',
    color:   'from-pink-500/20 to-pink-500/5',
    border:  'rgba(236,72,153,0.2)',
    iconCol: 'text-pink-400',
  },
]

const stats = [
  { label: 'Sections',    value: '7',    sub: 'Editable' },
  { label: 'Projects',    value: '5',    sub: 'Featured' },
  { label: 'Experience',  value: '1',    sub: 'Role' },
  { label: 'Skills',      value: '30+',  sub: 'Listed' },
]

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8 max-w-5xl">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-neon-blue" />
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Dashboard</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome back, Dev.</h1>
        <p className="text-gray-500 text-sm mt-1">
          Select a section below to edit your portfolio content.
        </p>
      </motion.div>

      {/* Quick stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-xl p-4 text-center"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.sub} {s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Section cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.14 }}
      >
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Edit Sections
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.18 + i * 0.05 }}
              >
                <Link
                  href={s.href}
                  className="group flex flex-col gap-3 rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${s.color})`,
                    border: `1px solid ${s.border}`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(0,0,0,0.3)' }}
                    >
                      <Icon className={`w-4 h-4 ${s.iconCol}`} />
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all duration-150" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{s.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.desc}</div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
