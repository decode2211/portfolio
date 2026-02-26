'use client'

import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import LeetCode from './components/LeetCode'
import Skills from './components/Skills'
import Contact from './components/Contact'

export const dynamic = 'force-dynamic'

export default function Home() {
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