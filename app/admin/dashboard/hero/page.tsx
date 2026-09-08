'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Save, CheckCircle, AlertCircle } from 'lucide-react'

const defaultData = {
  name:        'Dev Vashist',
  role:        'ML Engineer & Data Scientist',
  tagline:     'I build intelligent systems, scalable products, and AI that moves fast.',
  subtitle:    'Machine Learning & Data Science Engineer specializing in AI-driven systems, full-stack architecture, and low-latency applications.',
  ctaLabel:    'View Projects',
  ctaHref:     'https://github.com/decode2211',
  resumeHref:  'https://www.overleaf.com/project/6a46470ca7e337a78be62919',
  leetcodeHref:'https://leetcode.com/u/devyash1122/',
  stat1Value:  '100+',
  stat1Label:  'LeetCode',
  stat2Value:  '9.3',
  stat2Label:  'CGPA',
  stat3Value:  '3',
  stat3Label:  'Hackathon Winner',
}

type Toast = { type: 'success' | 'error'; message: string } | null

function FormField({
  label, name, value, onChange, textarea = false, placeholder = ''
}: {
  label: string; name: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  textarea?: boolean; placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      {textarea ? (
        <textarea
          name={name} value={value} onChange={onChange} placeholder={placeholder} rows={3}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 focus:bg-white/[0.06] resize-none transition-all duration-200"
        />
      ) : (
        <input
          type="text" name={name} value={value} onChange={onChange} placeholder={placeholder}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 focus:bg-white/[0.06] transition-all duration-200"
        />
      )}
    </div>
  )
}

export default function HeroEditPage() {
  const [form, setForm]   = useState(defaultData)
  const [toast, setToast] = useState<Toast>(null)
  const [saving, setSaving] = useState(false)

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    // TODO: POST /api/admin/content  { section: 'hero', data: form }
    setSaving(false)
    setToast({ type: 'success', message: 'Hero section saved!' })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="max-w-2xl space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-neon-blue" />
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Hero Section</span>
        </div>
        <h1 className="text-xl font-bold text-white">Edit Hero</h1>
        <p className="text-gray-500 text-sm mt-1">Name, role, tagline, stats and CTA buttons.</p>
      </motion.div>

      {/* Toast */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2.5 text-sm px-4 py-3 rounded-lg border ${
            toast.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}
        >
          {toast.type === 'success'
            ? <CheckCircle className="w-4 h-4 shrink-0" />
            : <AlertCircle className="w-4 h-4 shrink-0" />}
          {toast.message}
        </motion.div>
      )}

      <motion.form
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        onSubmit={onSave}
        className="space-y-5"
      >
        {/* Identity */}
        <Section title="Identity">
          <FormField label="Full Name"  name="name"     value={form.name}     onChange={onChange} placeholder="Dev Vashist" />
          <FormField label="Role / Title" name="role"   value={form.role}     onChange={onChange} placeholder="ML Engineer & Data Scientist" />
          <FormField label="Tagline"    name="tagline"  value={form.tagline}  onChange={onChange} textarea placeholder="One-liner that grabs attention" />
          <FormField label="Subtitle"   name="subtitle" value={form.subtitle} onChange={onChange} textarea placeholder="Longer description below the tagline" />
        </Section>

        {/* Stats */}
        <Section title="Hero Stats (3 cards)">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Stat 1 — Value" name="stat1Value" value={form.stat1Value} onChange={onChange} placeholder="100+" />
            <FormField label="Stat 1 — Label" name="stat1Label" value={form.stat1Label} onChange={onChange} placeholder="LeetCode" />
            <FormField label="Stat 2 — Value" name="stat2Value" value={form.stat2Value} onChange={onChange} placeholder="9.3" />
            <FormField label="Stat 2 — Label" name="stat2Label" value={form.stat2Label} onChange={onChange} placeholder="CGPA" />
            <FormField label="Stat 3 — Value" name="stat3Value" value={form.stat3Value} onChange={onChange} placeholder="3" />
            <FormField label="Stat 3 — Label" name="stat3Label" value={form.stat3Label} onChange={onChange} placeholder="Hackathon Winner" />
          </div>
        </Section>

        {/* Links */}
        <Section title="CTA & Links">
          <FormField label="Primary CTA Label" name="ctaLabel"    value={form.ctaLabel}    onChange={onChange} placeholder="View Projects" />
          <FormField label="Primary CTA URL"   name="ctaHref"     value={form.ctaHref}     onChange={onChange} placeholder="https://github.com/..." />
          <FormField label="Resume URL"         name="resumeHref"  value={form.resumeHref}  onChange={onChange} placeholder="https://..." />
          <FormField label="LeetCode URL"       name="leetcodeHref" value={form.leetcodeHref} onChange={onChange} placeholder="https://leetcode.com/..." />
        </Section>

        <SaveButton saving={saving} />
      </motion.form>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5 space-y-4"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</div>
      {children}
    </div>
  )
}

function SaveButton({ saving }: { saving: boolean }) {
  return (
    <button
      type="submit" disabled={saving}
      className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
      style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 100%)', boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}
    >
      {saving
        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
        : <><Save className="w-4 h-4" />Save Changes</>}
    </button>
  )
}
