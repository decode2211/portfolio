'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Save, CheckCircle, AlertCircle, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

type Job = {
  company:     string
  role:        string
  period:      string
  location:    string
  description: string
  highlights:  string[]
  technologies: string[]
}

const defaultJobs: Job[] = [
  {
    company:     'Mind Mauji Pvt. Ltd.',
    role:        'Machine Learning Intern',
    period:      'Jun 2025 – Aug 2025',
    location:    'On-site / Hybrid',
    description: 'Built an AI-driven Resume vs Job Description matching system using NLP and machine learning techniques to automate recruitment screening workflows.',
    highlights: [
      'Processed 500+ resumes across multiple job roles using NLP-based similarity scoring',
      'Reduced manual resume screening effort by ~40% through predictive candidate–job fit models',
      'Architected reusable data cleaning and preprocessing pipelines',
    ],
    technologies: ['Python', 'NLP', 'Machine Learning', 'Pandas', 'NumPy', 'Streamlit', 'MySQL'],
  },
]

type Toast = { type: 'success' | 'error'; message: string } | null

function Input({ value, onChange, placeholder, className = '' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; className?: string
}) {
  return (
    <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className={`bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 transition-all w-full ${className}`} />
  )
}

export default function ExperienceEditPage() {
  const [jobs, setJobs]     = useState<Job[]>(defaultJobs)
  const [open, setOpen]     = useState<number | null>(0)
  const [toast, setToast]   = useState<Toast>(null)
  const [saving, setSaving] = useState(false)

  async function onSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    // TODO: POST /api/admin/content { section: 'experience', data: jobs }
    setSaving(false)
    setToast({ type: 'success', message: 'Experience section saved!' })
    setTimeout(() => setToast(null), 3000)
  }

  function updateJob(i: number, key: keyof Job, val: string) {
    setJobs(p => { const j = [...p]; (j[i] as Record<string, unknown>)[key] = val; return j })
  }
  function addJob() {
    const newJob: Job = { company: '', role: '', period: '', location: '', description: '', highlights: [''], technologies: [] }
    setJobs(p => [...p, newJob])
    setOpen(jobs.length)
  }
  function removeJob(i: number) { setJobs(p => p.filter((_, idx) => idx !== i)); if (open === i) setOpen(null) }

  function updateBullet(ji: number, bi: number, val: string) {
    setJobs(p => { const j = [...p]; j[ji].highlights[bi] = val; return j })
  }
  function addBullet(ji: number) { setJobs(p => { const j = [...p]; j[ji].highlights.push(''); return j }) }
  function removeBullet(ji: number, bi: number) {
    setJobs(p => { const j = [...p]; j[ji].highlights = j[ji].highlights.filter((_, i) => i !== bi); return j })
  }

  function updateTechRaw(ji: number, val: string) {
    setJobs(p => { const j = [...p]; j[ji].technologies = val.split(',').map(s => s.trim()); return j })
  }

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Briefcase className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Experience Section</span>
        </div>
        <h1 className="text-xl font-bold text-white">Edit Experience</h1>
        <p className="text-gray-500 text-sm mt-1">Jobs, roles, bullet points and tech stack.</p>
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

      <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} onSubmit={onSave} className="space-y-4">

        {jobs.map((job, ji) => (
          <div key={ji} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            {/* Accordion header */}
            <button type="button" onClick={() => setOpen(open === ji ? null : ji)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div>
                <div className="text-sm font-semibold text-white">{job.role || `Job ${ji + 1}`}</div>
                <div className="text-xs text-gray-500 mt-0.5">{job.company || 'Company name'}</div>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={e => { e.stopPropagation(); removeJob(ji) }} className="text-red-500/40 hover:text-red-400 transition-colors p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
                {open === ji ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {open === ji && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-4 space-y-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Company</label>
                        <Input value={job.company} onChange={v => updateJob(ji, 'company', v)} placeholder="Company name" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Role</label>
                        <Input value={job.role} onChange={v => updateJob(ji, 'role', v)} placeholder="Job title" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Period</label>
                        <Input value={job.period} onChange={v => updateJob(ji, 'period', v)} placeholder="Jun 2025 – Aug 2025" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Location</label>
                        <Input value={job.location} onChange={v => updateJob(ji, 'location', v)} placeholder="Remote / On-site" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Description</label>
                      <textarea value={job.description} onChange={e => updateJob(ji, 'description', e.target.value)} rows={3} placeholder="Summary of your role…"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 resize-none transition-all" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Key Highlights</label>
                      {job.highlights.map((b, bi) => (
                        <div key={bi} className="flex gap-2 items-center">
                          <span className="text-gray-600 text-sm shrink-0">•</span>
                          <input type="text" value={b} onChange={e => updateBullet(ji, bi, e.target.value)} placeholder={`Highlight ${bi + 1}`}
                            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 transition-all" />
                          <button type="button" onClick={() => removeBullet(ji, bi)} className="text-red-500/40 hover:text-red-400 transition-colors p-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addBullet(ji)} className="flex items-center gap-1.5 text-xs text-neon-blue/70 hover:text-neon-blue transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Add Bullet
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Technologies (comma-separated)</label>
                      <input type="text" value={job.technologies.join(', ')} onChange={e => updateTechRaw(ji, e.target.value)}
                        placeholder="Python, TensorFlow, FastAPI…"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 transition-all" />
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {job.technologies.filter(Boolean).map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-white/[0.06] text-gray-400 border border-white/[0.08]">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <button type="button" onClick={addJob}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm text-gray-500 hover:text-gray-300 border border-dashed border-white/[0.1] hover:border-white/20 transition-all">
          <Plus className="w-4 h-4" /> Add Job
        </button>

        <button type="submit" disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 100%)', boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}>
          {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</> : <><Save className="w-4 h-4" />Save Changes</>}
        </button>
      </motion.form>
    </div>
  )
}
