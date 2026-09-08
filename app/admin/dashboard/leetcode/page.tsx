'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Save, CheckCircle, AlertCircle } from 'lucide-react'

const defaultData = {
  username:   'devyash1122',
  profileUrl: 'https://leetcode.com/u/devyash1122/',
  total:      143,
  easy:       78,
  medium:     54,
  hard:       20,
  streak:     15,
  rating:     1800,
  easyTotal:  150,
  mediumTotal: 200,
  hardTotal:  50,
}

type Toast = { type: 'success' | 'error'; message: string } | null

function NumField({ label, name, value, onChange, min = 0 }: {
  label: string; name: string; value: number; onChange: (n: number) => void; min?: number
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>
      <input type="number" name={name} value={value} min={min}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-neon-blue/50 transition-all" />
    </div>
  )
}

function StrField({ label, name, value, onChange, placeholder = '' }: {
  label: string; name: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>
      <input type="text" name={name} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
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

export default function LeetCodeEditPage() {
  const [form, setForm]     = useState(defaultData)
  const [toast, setToast]   = useState<Toast>(null)
  const [saving, setSaving] = useState(false)

  function setNum(key: keyof typeof defaultData, val: number) { setForm(p => ({ ...p, [key]: val })) }
  function setStr(key: keyof typeof defaultData, val: string) { setForm(p => ({ ...p, [key]: val })) }

  async function onSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    // TODO: POST /api/admin/content { section: 'leetcode', data: form }
    setSaving(false)
    setToast({ type: 'success', message: 'LeetCode section saved!' })
    setTimeout(() => setToast(null), 3000)
  }

  // Live progress preview
  const easyPct   = Math.round((form.easy   / form.easyTotal)   * 100)
  const medPct    = Math.round((form.medium / form.mediumTotal) * 100)
  const hardPct   = Math.round((form.hard   / form.hardTotal)   * 100)

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-4 h-4 text-orange-400" />
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">LeetCode Section</span>
        </div>
        <h1 className="text-xl font-bold text-white">Edit LeetCode Stats</h1>
        <p className="text-gray-500 text-sm mt-1">Problem counts, streak, rating and difficulty breakdown.</p>
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

        <SectionBox title="Profile">
          <div className="grid grid-cols-2 gap-4">
            <StrField label="Username"    name="username"   value={form.username}   onChange={v => setStr('username', v)}   placeholder="devyash1122" />
            <StrField label="Profile URL" name="profileUrl" value={form.profileUrl} onChange={v => setStr('profileUrl', v)} placeholder="https://leetcode.com/u/…" />
          </div>
        </SectionBox>

        <SectionBox title="Solved Counts">
          <div className="grid grid-cols-2 gap-4">
            <NumField label="Total Solved" name="total"  value={form.total}  onChange={v => setNum('total', v)} />
            <NumField label="Easy Solved"  name="easy"   value={form.easy}   onChange={v => setNum('easy', v)} />
            <NumField label="Medium Solved" name="medium" value={form.medium} onChange={v => setNum('medium', v)} />
            <NumField label="Hard Solved"  name="hard"   value={form.hard}   onChange={v => setNum('hard', v)} />
          </div>
        </SectionBox>

        <SectionBox title="Difficulty Totals (for progress bar calculation)">
          <div className="grid grid-cols-3 gap-4">
            <NumField label="Easy Total"   name="easyTotal"   value={form.easyTotal}   onChange={v => setNum('easyTotal', v)} />
            <NumField label="Medium Total" name="mediumTotal" value={form.mediumTotal} onChange={v => setNum('mediumTotal', v)} />
            <NumField label="Hard Total"   name="hardTotal"   value={form.hardTotal}   onChange={v => setNum('hardTotal', v)} />
          </div>

          {/* Live preview */}
          <div className="space-y-3 pt-2">
            {[
              { label: 'Easy',   pct: easyPct,  color: 'bg-green-500' },
              { label: 'Medium', pct: medPct,   color: 'bg-yellow-500' },
              { label: 'Hard',   pct: hardPct,  color: 'bg-red-500' },
            ].map(bar => (
              <div key={bar.label} className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{bar.label}</span>
                  <span>{bar.pct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10">
                  <div className={`h-2 rounded-full ${bar.color} transition-all duration-500`} style={{ width: `${bar.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionBox>

        <SectionBox title="Activity & Rating">
          <div className="grid grid-cols-2 gap-4">
            <NumField label="Current Streak (days)" name="streak" value={form.streak} onChange={v => setNum('streak', v)} />
            <NumField label="Contest Rating"         name="rating" value={form.rating} onChange={v => setNum('rating', v)} />
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
