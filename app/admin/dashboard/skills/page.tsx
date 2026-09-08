'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Save, CheckCircle, AlertCircle, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

type Skill    = { name: string; level: number | undefined }
type Category = { title: string; showProgress: boolean; skills: Skill[] }

const defaultCategories: Category[] = [
  { title: 'Languages',  showProgress: true,  skills: [{ name: 'Python', level: 95 }, { name: 'Java', level: 92 }, { name: 'C++', level: 80 }] },
  { title: 'Frontend',   showProgress: true,  skills: [{ name: 'React', level: 92 }, { name: 'Next.js', level: 88 }, { name: 'Tailwind CSS', level: 90 }] },
  { title: 'Backend & Database', showProgress: false, skills: [{ name: 'Node.js', level: undefined }, { name: 'PostgreSQL', level: undefined }, { name: 'FastAPI', level: undefined }] },
  { title: 'Data Science & ML', showProgress: true,  skills: [{ name: 'TensorFlow', level: 90 }, { name: 'PyTorch', level: 80 }, { name: 'Pandas', level: 92 }] },
  { title: 'Cloud & DevOps', showProgress: false, skills: [{ name: 'AWS', level: undefined }, { name: 'Docker', level: undefined }] },
  { title: 'Tools',      showProgress: false, skills: [{ name: 'Git', level: undefined }, { name: 'Postman', level: undefined }] },
]

type Toast = { type: 'success' | 'error'; message: string } | null

export default function SkillsEditPage() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories)
  const [open, setOpen]             = useState<number | null>(0)
  const [toast, setToast]           = useState<Toast>(null)
  const [saving, setSaving]         = useState(false)

  async function onSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    await new Promise(r => setTimeout(r, 700))
    // TODO: POST /api/admin/content { section: 'skills', data: categories }
    setSaving(false)
    setToast({ type: 'success', message: 'Skills section saved!' })
    setTimeout(() => setToast(null), 3000)
  }

  function updateCatTitle(ci: number, val: string) {
    setCategories(p => { const a = [...p]; a[ci].title = val; return a })
  }
  function toggleProgress(ci: number) {
    setCategories(p => { const a = [...p]; a[ci].showProgress = !a[ci].showProgress; return a })
  }
  function addCategory() {
    setCategories(p => [...p, { title: '', showProgress: false, skills: [{ name: '', level: undefined }] }])
    setOpen(categories.length)
  }
  function removeCategory(ci: number) { setCategories(p => p.filter((_, i) => i !== ci)); if (open === ci) setOpen(null) }

  function updateSkill(ci: number, si: number, key: keyof Skill, val: string) {
    setCategories(p => {
      const a = [...p]
      if (key === 'level') a[ci].skills[si].level = val === '' ? undefined : Number(val)
      else a[ci].skills[si].name = val
      return a
    })
  }
  function addSkill(ci: number) { setCategories(p => { const a = [...p]; a[ci].skills.push({ name: '', level: undefined }); return a }) }
  function removeSkill(ci: number, si: number) {
    setCategories(p => { const a = [...p]; a[ci].skills = a[ci].skills.filter((_, i) => i !== si); return a })
  }

  const inputCls = 'bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-neon-blue/50 transition-all'

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Cpu className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Skills Section</span>
        </div>
        <h1 className="text-xl font-bold text-white">Edit Skills</h1>
        <p className="text-gray-500 text-sm mt-1">Skill categories, names and proficiency levels.</p>
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

        {categories.map((cat, ci) => (
          <div key={ci} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <button type="button" onClick={() => setOpen(open === ci ? null : ci)}
              className="w-full flex items-center justify-between px-5 py-4 text-left" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div>
                <div className="text-sm font-semibold text-white">{cat.title || `Category ${ci + 1}`}</div>
                <div className="text-xs text-gray-500 mt-0.5">{cat.skills.length} skill{cat.skills.length !== 1 ? 's' : ''} · {cat.showProgress ? 'Progress bars' : 'Tags'}</div>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={e => { e.stopPropagation(); removeCategory(ci) }} className="text-red-500/40 hover:text-red-400 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                {open === ci ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {open === ci && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <div className="px-5 pb-5 pt-4 space-y-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
                    <div className="flex gap-3 items-end">
                      <div className="flex-1 space-y-1.5">
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Category Title</label>
                        <input type="text" value={cat.title} onChange={e => updateCatTitle(ci, e.target.value)} placeholder="Languages" className={`${inputCls} w-full`} />
                      </div>
                      <label className="flex items-center gap-2 pb-2 cursor-pointer select-none">
                        <div
                          onClick={() => toggleProgress(ci)}
                          className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${cat.showProgress ? 'bg-neon-blue/70' : 'bg-white/10'}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${cat.showProgress ? 'left-4' : 'left-0.5'}`} />
                        </div>
                        <span className="text-xs text-gray-400">Progress bars</span>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Skills</label>
                      {cat.skills.map((skill, si) => (
                        <div key={si} className="flex gap-2 items-center">
                          <input type="text" value={skill.name} onChange={e => updateSkill(ci, si, 'name', e.target.value)} placeholder="Skill name"
                            className={`flex-1 ${inputCls}`} />
                          {cat.showProgress && (
                            <div className="flex items-center gap-1.5 w-24">
                              <input type="number" min={0} max={100} value={skill.level ?? ''} onChange={e => updateSkill(ci, si, 'level', e.target.value)} placeholder="0–100"
                                className={`w-full ${inputCls} text-center`} />
                              <span className="text-xs text-gray-600 shrink-0">%</span>
                            </div>
                          )}
                          <button type="button" onClick={() => removeSkill(ci, si)} className="text-red-500/40 hover:text-red-400 transition-colors p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      ))}
                      {cat.showProgress && cat.skills.map((skill, si) => skill.level !== undefined && (
                        <div key={`bar-${si}`} className="flex items-center gap-2 px-1">
                          <span className="text-xs text-gray-600 w-28 truncate">{skill.name}</span>
                          <div className="flex-1 h-1.5 rounded-full bg-white/10">
                            <div className="h-1.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all" style={{ width: `${skill.level}%` }} />
                          </div>
                          <span className="text-xs text-gray-600 w-8 text-right">{skill.level}%</span>
                        </div>
                      ))}
                      <button type="button" onClick={() => addSkill(ci)} className="flex items-center gap-1.5 text-xs text-neon-blue/70 hover:text-neon-blue transition-colors">
                        <Plus className="w-3.5 h-3.5" /> Add Skill
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <button type="button" onClick={addCategory}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm text-gray-500 hover:text-gray-300 border border-dashed border-white/[0.1] hover:border-white/20 transition-all">
          <Plus className="w-4 h-4" /> Add Category
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
