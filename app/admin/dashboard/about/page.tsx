'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Save, CheckCircle, AlertCircle, Plus, Trash2 } from 'lucide-react'

type Stat = { label: string; value: string }
type Highlight = { title: string; description: string }

const defaultData = {
  bio: 'I build intelligent systems, scalable products, and AI that moves fast. Software Developer & Data Science Engineer specializing in AI-driven systems, full-stack architecture, and low-latency applications. Expert in machine learning, statistical analysis, and real-time ML inference. 143+ LeetCode problems solved. I ship fast, scalable, production-grade software with cutting-edge ML capabilities.',
  university:  'SRM AP',
  degree:      'Electronics and ML Engineer',
  cgpa:        '9.3',
  stats: [
    { label: 'CGPA',             value: '9.3' },
    { label: 'Hackathon Winner', value: '3' },
  ] as Stat[],
  highlights: [
    { title: 'Full-Stack Development', description: 'React, Node.js, PostgreSQL, AWS' },
    { title: 'AI & Machine Learning',  description: 'TensorFlow, PyTorch, Real-time ML Inference' },
    { title: 'Data Science & Analytics', description: 'EDA, Statistical Analysis, Feature Engineering' },
    { title: 'MLOps & Deployment',     description: 'Model Deployment, Low-latency Pipelines, CI/CD' },
  ] as Highlight[],
}

type Toast = { type: 'success' | 'error'; message: string } | null

function Field({
  label, value, onChange, textarea = false, placeholder = ''
}: {
  label: string; value: string
  onChange: (v: string) => void
  textarea?: boolean; placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>
      {textarea ? (
        <textarea
          value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={4}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 resize-none transition-all duration-200"
        />
      ) : (
        <input
          type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 transition-all duration-200"
        />
      )}
    </div>
  )
}

function SectionBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5 space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{title}</div>
      {children}
    </div>
  )
}

export default function AboutEditPage() {
  const [form, setForm]     = useState(defaultData)
  const [toast, setToast]   = useState<Toast>(null)
  const [saving, setSaving] = useState(false)

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    // TODO: POST /api/admin/content { section: 'about', data: form }
    setSaving(false)
    setToast({ type: 'success', message: 'About section saved!' })
    setTimeout(() => setToast(null), 3000)
  }

  // Stats helpers
  function updateStat(i: number, key: keyof Stat, val: string) {
    setForm(p => { const s = [...p.stats]; s[i] = { ...s[i], [key]: val }; return { ...p, stats: s } })
  }
  function addStat() { setForm(p => ({ ...p, stats: [...p.stats, { label: '', value: '' }] })) }
  function removeStat(i: number) { setForm(p => ({ ...p, stats: p.stats.filter((_, idx) => idx !== i) })) }

  // Highlights helpers
  function updateHL(i: number, key: keyof Highlight, val: string) {
    setForm(p => { const h = [...p.highlights]; h[i] = { ...h[i], [key]: val }; return { ...p, highlights: h } })
  }
  function addHL() { setForm(p => ({ ...p, highlights: [...p.highlights, { title: '', description: '' }] })) }
  function removeHL(i: number) { setForm(p => ({ ...p, highlights: p.highlights.filter((_, idx) => idx !== i) })) }

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <User className="w-4 h-4 text-neon-purple" />
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">About Section</span>
        </div>
        <h1 className="text-xl font-bold text-white">Edit About</h1>
        <p className="text-gray-500 text-sm mt-1">Bio, education, stats and skill highlights.</p>
      </motion.div>

      {toast && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2.5 text-sm px-4 py-3 rounded-lg border ${
            toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {toast.message}
        </motion.div>
      )}

      <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} onSubmit={onSave} className="space-y-5">

        {/* Bio */}
        <SectionBox title="Bio">
          <Field label="Bio / Description" value={form.bio} onChange={v => setForm(p => ({ ...p, bio: v }))} textarea placeholder="Write your bio here…" />
        </SectionBox>

        {/* Education */}
        <SectionBox title="Education">
          <div className="grid grid-cols-2 gap-4">
            <Field label="University" value={form.university} onChange={v => setForm(p => ({ ...p, university: v }))} placeholder="SRM AP" />
            <Field label="Degree"     value={form.degree}     onChange={v => setForm(p => ({ ...p, degree: v }))}     placeholder="B.Tech CS" />
            <Field label="CGPA"       value={form.cgpa}       onChange={v => setForm(p => ({ ...p, cgpa: v }))}       placeholder="9.3" />
          </div>
        </SectionBox>

        {/* Stats */}
        <SectionBox title="Stats Cards">
          <div className="space-y-3">
            {form.stats.map((s, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input type="text" value={s.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="Value"
                  className="w-24 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-neon-blue/50 transition-all" />
                <input type="text" value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Label"
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-neon-blue/50 transition-all" />
                <button type="button" onClick={() => removeStat(i)} className="text-red-500/50 hover:text-red-400 transition-colors p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addStat}
              className="flex items-center gap-1.5 text-xs text-neon-blue/70 hover:text-neon-blue transition-colors mt-1">
              <Plus className="w-3.5 h-3.5" /> Add Stat
            </button>
          </div>
        </SectionBox>

        {/* Highlights */}
        <SectionBox title="Skill Highlights (Grid Cards)">
          <div className="space-y-4">
            {form.highlights.map((h, i) => (
              <div key={i} className="rounded-lg p-3 space-y-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Card {i + 1}</span>
                  <button type="button" onClick={() => removeHL(i)} className="text-red-500/50 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input type="text" value={h.title} onChange={e => updateHL(i, 'title', e.target.value)} placeholder="Title"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-neon-blue/50 transition-all" />
                <input type="text" value={h.description} onChange={e => updateHL(i, 'description', e.target.value)} placeholder="Description"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-neon-blue/50 transition-all" />
              </div>
            ))}
            <button type="button" onClick={addHL}
              className="flex items-center gap-1.5 text-xs text-neon-blue/70 hover:text-neon-blue transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Highlight Card
            </button>
          </div>
        </SectionBox>

        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 100%)', boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}>
          {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</> : <><Save className="w-4 h-4" />Save Changes</>}
        </button>
      </motion.form>
    </div>
  )
}
