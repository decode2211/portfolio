'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FolderOpen, Save, CheckCircle, AlertCircle, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

type Metric  = { label: string; value: string }
type Project = {
  title:        string
  subtitle:     string
  description:  string
  github:       string
  demo:         string
  featured:     boolean
  technologies: string[]
  highlights:   string[]
  metrics:      Metric[]
}

const defaultProjects: Project[] = [
  {
    title: 'Us, Always', subtitle: 'Full-Stack Relationship Web App',
    description: 'Built a full-stack backend for a private relationship web app.',
    github: 'https://github.com/decode2211/loveaajkal', demo: '#', featured: true,
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Prisma ORM', 'Socket.io', 'JWT', 'TypeScript'],
    highlights: ['JWT httpOnly cookie authentication system', 'Real-time bidirectional events via Socket.io'],
    metrics: [{ label: 'Auth', value: 'JWT' }, { label: 'Real-time', value: 'Socket.io' }, { label: 'Storage', value: 'Cloudinary' }],
  },
  {
    title: 'PFZ Prediction', subtitle: 'ML Pipeline & Oceanographic Data Analysis',
    description: 'Built a scalable ML pipeline to preprocess and model 8.5GB+ satellite data.',
    github: 'https://github.com/decode2211/PFZ_mapping', demo: 'https://www.youtube.com/watch?v=ITZa-UxaPpw', featured: true,
    technologies: ['Python', 'FastAPI', 'Scikit-learn', 'JavaScript'],
    highlights: ['Feature engineering, geospatial preprocessing & supervised model training'],
    metrics: [{ label: 'Dataset', value: '8.5GB+' }, { label: 'API', value: 'FastAPI' }, { label: 'Viz', value: 'Interactive' }],
  },
]

type Toast = { type: 'success' | 'error'; message: string } | null

export default function ProjectsEditPage() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects)
  const [open, setOpen]         = useState<number | null>(0)
  const [toast, setToast]       = useState<Toast>(null)
  const [saving, setSaving]     = useState(false)

  async function onSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    // TODO: POST /api/admin/content { section: 'projects', data: projects }
    setSaving(false)
    setToast({ type: 'success', message: 'Projects section saved!' })
    setTimeout(() => setToast(null), 3000)
  }

  function update(pi: number, key: keyof Project, val: unknown) {
    setProjects(p => { const arr = [...p]; (arr[pi] as Record<string, unknown>)[key] = val; return arr })
  }
  function addProject() {
    setProjects(p => [...p, { title: '', subtitle: '', description: '', github: '', demo: '', featured: false, technologies: [], highlights: [''], metrics: [{ label: '', value: '' }] }])
    setOpen(projects.length)
  }
  function removeProject(i: number) { setProjects(p => p.filter((_, idx) => idx !== i)); if (open === i) setOpen(null) }

  function updateBullet(pi: number, bi: number, val: string) {
    setProjects(p => { const a = [...p]; a[pi].highlights[bi] = val; return a })
  }
  function addBullet(pi: number) { setProjects(p => { const a = [...p]; a[pi].highlights.push(''); return a }) }
  function removeBullet(pi: number, bi: number) {
    setProjects(p => { const a = [...p]; a[pi].highlights = a[pi].highlights.filter((_, i) => i !== bi); return a })
  }

  function updateMetric(pi: number, mi: number, key: keyof Metric, val: string) {
    setProjects(p => { const a = [...p]; a[pi].metrics[mi] = { ...a[pi].metrics[mi], [key]: val }; return a })
  }
  function addMetric(pi: number) { setProjects(p => { const a = [...p]; a[pi].metrics.push({ label: '', value: '' }); return a }) }
  function removeMetric(pi: number, mi: number) {
    setProjects(p => { const a = [...p]; a[pi].metrics = a[pi].metrics.filter((_, i) => i !== mi); return a })
  }

  const inputCls = 'bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 transition-all w-full'

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <FolderOpen className="w-4 h-4 text-emerald-400" />
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Projects Section</span>
        </div>
        <h1 className="text-xl font-bold text-white">Edit Projects</h1>
        <p className="text-gray-500 text-sm mt-1">Project cards, links, metrics and highlights.</p>
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

        {projects.map((proj, pi) => (
          <div key={pi} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <button type="button" onClick={() => setOpen(open === pi ? null : pi)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{proj.title || `Project ${pi + 1}`}</span>
                  {proj.featured && <span className="text-[10px] px-1.5 py-0.5 rounded bg-neon-purple/20 text-neon-purple border border-neon-purple/20">Featured</span>}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{proj.subtitle || 'Subtitle'}</div>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={e => { e.stopPropagation(); removeProject(pi) }} className="text-red-500/40 hover:text-red-400 transition-colors p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
                {open === pi ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {open === pi && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <div className="px-5 pb-5 pt-4 space-y-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5 col-span-2 sm:col-span-1">
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Title</label>
                        <input type="text" value={proj.title} onChange={e => update(pi, 'title', e.target.value)} placeholder="Project name" className={inputCls} />
                      </div>
                      <div className="space-y-1.5 col-span-2 sm:col-span-1">
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Subtitle</label>
                        <input type="text" value={proj.subtitle} onChange={e => update(pi, 'subtitle', e.target.value)} placeholder="One-liner" className={inputCls} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Description</label>
                      <textarea value={proj.description} onChange={e => update(pi, 'description', e.target.value)} rows={3} placeholder="What you built…" className={`${inputCls} resize-none`} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-500 uppercase tracking-wider">GitHub URL</label>
                        <input type="text" value={proj.github} onChange={e => update(pi, 'github', e.target.value)} placeholder="https://github.com/…" className={inputCls} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Demo URL</label>
                        <input type="text" value={proj.demo} onChange={e => update(pi, 'demo', e.target.value)} placeholder="https://… or #" className={inputCls} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id={`featured-${pi}`} checked={proj.featured} onChange={e => update(pi, 'featured', e.target.checked)}
                        className="w-4 h-4 accent-neon-purple rounded" />
                      <label htmlFor={`featured-${pi}`} className="text-sm text-gray-400">Mark as Featured</label>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Technologies (comma-separated)</label>
                      <input type="text" value={proj.technologies.join(', ')} onChange={e => update(pi, 'technologies', e.target.value.split(',').map(s => s.trim()))} placeholder="Python, FastAPI, React…" className={inputCls} />
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {proj.technologies.filter(Boolean).map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-white/[0.06] text-gray-400 border border-white/[0.08]">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Key Highlights</label>
                      {proj.highlights.map((b, bi) => (
                        <div key={bi} className="flex gap-2 items-center">
                          <span className="text-gray-600 text-sm shrink-0">•</span>
                          <input type="text" value={b} onChange={e => updateBullet(pi, bi, e.target.value)} placeholder={`Highlight ${bi + 1}`} className={`flex-1 ${inputCls}`} />
                          <button type="button" onClick={() => removeBullet(pi, bi)} className="text-red-500/40 hover:text-red-400 transition-colors p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addBullet(pi)} className="flex items-center gap-1.5 text-xs text-neon-blue/70 hover:text-neon-blue transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Add Highlight
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Metrics (stat cards)</label>
                      {proj.metrics.map((m, mi) => (
                        <div key={mi} className="flex gap-2 items-center">
                          <input type="text" value={m.value} onChange={e => updateMetric(pi, mi, 'value', e.target.value)} placeholder="Value" className="w-24 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-neon-blue/50 transition-all" />
                          <input type="text" value={m.label} onChange={e => updateMetric(pi, mi, 'label', e.target.value)} placeholder="Label" className={`flex-1 ${inputCls}`} />
                          <button type="button" onClick={() => removeMetric(pi, mi)} className="text-red-500/40 hover:text-red-400 transition-colors p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      ))}
                      <button type="button" onClick={() => addMetric(pi)} className="flex items-center gap-1.5 text-xs text-neon-blue/70 hover:text-neon-blue transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Add Metric
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <button type="button" onClick={addProject}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm text-gray-500 hover:text-gray-300 border border-dashed border-white/[0.1] hover:border-white/20 transition-all">
          <Plus className="w-4 h-4" /> Add Project
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
