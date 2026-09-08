'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import LeetCode from './components/LeetCode'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ctrl + Shift + A → hidden admin portal trigger
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        router.push('/admin/login')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])

  return (
    <main className="min-h-screen bg-dark-bg">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <LeetCode />
      <Skills />
      <Contact />
    </main>
  )
}