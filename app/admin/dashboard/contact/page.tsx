'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Save, CheckCircle, AlertCircle, Plus, Trash2 } from 'lucide-react'

const defaultData = {
  email:       'devvashist1117@gmail.com',
  phone:       '+91 9810248310',
  location:    'India · Open to Remote Opportunities',
  linkedin:    'https://www.linkedin.com/in/dev-vashist-063585286/',
  github:      'https://github.com/decode2211',
  leetcode:    'https://leetcode.com/u/devyash1122/',
  instagram:   '',
  achievements: [
    '143+ LeetCode problems solved',
    '3 Hackathon wins',
    'Open source contributor',
    'SIH 2025 internal round qualified',
  ],
  stats: [
    { label: 'Problems Solved',         value: '143+' },
    { label: 'Years Hands-on Experience', value: '1.5+' },
    { label: 'Projects Built',          value: '10+' },
    { label: 'Availability',            value: 'Remote' },
  ],
}

type Toast = { type: 'success' | 'error'; message: string } | null

function Field({ label, value, onChange, placeholder = '', type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 transition-all" />
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

export default function ContactEditPage() {
  const [form, setForm]     = useState(defaultData)
  const [toast, setToast]   = useState<Toast>(null)
  const [saving, setSaving] = useState(false)

  function set(key: keyof typeof defaultData, val: string) { setForm(p => ({ ...p, [key]: val })) }

  function updateAch(i: number, val: string) { setForm(p => { const a = [...p.achievements]; a[i] = val; return { ...p, achievements: a } }) }
  function addAch()    { setForm(p => ({ ...p, achievements: [...p.achievements, ''] })) }
  function removeAch(i: number) { setForm(p => ({ ...p, achievements: p.achievements.filter((_, idx) => idx !== i) })) }

  function updateStat(i: number, key: 'label' | 'value', val: string) {
    setForm(p => { const s = [...p.stats]; s[i] = { ...s[i], [key]: val }; return { ...p, stats: s } })
  }
  function addStat()    { setForm(p => ({ ...p, stats: [...p.stats, { label: '', value: '' }] })) }
  function removeStat(i: number) { setForm(p => ({ ...p, stats: p.stats.filter((_, idx) => idx !== i) })) }

  async function onSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    // TODO: POST /api/admin/content { section: 'contact', data: form }
    setSaving(false)
    setToast({ type: 'success', message: 'Contact section saved!' })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Mail className="w-4 h-4 text-pink-400" />
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Contact Section</span>
        </div>
        <h1 className="text-xl font-bold text-white">Edit Contact</h1>
        <p className="text-gray-500 text-sm mt-1">Email, social links, location and stats.</p>
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

        <SectionBox title="Contact Info">
          <Field label="Email"    value={form.email}    onChange={v => set('email', v)}    type="email" placeholder="you@example.com" />
          <Field label="Phone"    value={form.phone}    onChange={v => set('phone', v)}    placeholder="+91 …" />
          <Field label="Location" value={form.location} onChange={v => set('location', v)} placeholder="City, Country · Remote OK" />
        </SectionBox>

        <SectionBox title="Social Links">
          <Field label="LinkedIn URL"  value={form.linkedin}  onChange={v => set('linkedin', v)}  placeholder="https://linkedin.com/in/…" />
          <Field label="GitHub URL"    value={form.github}    onChange={v => set('github', v)}    placeholder="https://github.com/…" />
          <Field label="LeetCode URL"  value={form.leetcode}  onChange={v => set('leetcode', v)}  placeholder="https://leetcode.com/u/…" />
          <Field label="Instagram URL" value={form.instagram} onChange={v => set('instagram', v)} placeholder="https://instagram.com/… (optional)" />
        </SectionBox>

        <SectionBox title="Quick Stats">
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
            <button type="button" onClick={addStat} className="flex items-center gap-1.5 text-xs text-neon-blue/70 hover:text-neon-blue transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Stat
            </button>
          </div>
        </SectionBox>

        <SectionBox title="Recent Achievements">
          <div className="space-y-2">
            {form.achievements.map((a, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-purple shrink-0" />
                <input type="text" value={a} onChange={e => updateAch(i, e.target.value)} placeholder={`Achievement ${i + 1}`}
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-neon-blue/50 transition-all" />
                <button type="button" onClick={() => removeAch(i)} className="text-red-500/50 hover:text-red-400 transition-colors p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button type="button" onClick={addAch} className="flex items-center gap-1.5 text-xs text-neon-blue/70 hover:text-neon-blue transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add Achievement
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
