'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, ExternalLink } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0 bg-dark-bg" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Clean Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 max-w-2xl"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm font-medium text-gray-400 uppercase tracking-wider"
            >
              Hello, I'm
            </motion.div>

            {/* Name - Main Visual Anchor */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Yashika
              </span>
              <br />
              <span className="text-gradient">Bhatia</span>
            </motion.h1>

            {/* Value Proposition - Secondary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-2xl lg:text-3xl font-medium text-white leading-relaxed">
                I build intelligent systems,<br />
                scalable products, and <span className="text-neon-blue font-semibold">AI that moves fast</span>.
              </h2>
              
              <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                Software Developer & Data Science Engineer specializing in AI-driven systems, 
                full-stack architecture, and low-latency applications.
              </p>
            </motion.div>

            {/* Stats - Minimal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex gap-8 text-sm"
            >
              <div>
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-gray-500">LeetCode</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">8.87</div>
                <div className="text-gray-500">CGPA</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-gray-500">Hackathon Winner</div>
              </div>
            </motion.div>

            {/* CTA Buttons - Clean */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="https://github.com/yashika2211"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="https://drive.google.com/uc?export=download&id=13kmbhiv5ulLuGK_saNS__qYt6GbHazJW"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-600 text-white px-8 py-4 rounded-lg font-medium hover:border-gray-400 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </a>
              
              <a 
                href="https://leetcode.com/u/yashikabhatia2209/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-600 text-white px-8 py-4 rounded-lg font-medium hover:border-gray-400 transition-all duration-300 flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LeetCode</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Minimal Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-96 h-96 relative flex items-center justify-center">
              {/* Subtle animated element */}
              <div className="w-64 h-64 rounded-full border border-gray-800 flex items-center justify-center relative">
                <div className="w-48 h-48 rounded-full border border-gray-700 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 flex items-center justify-center">
                    <div className="text-4xl">⚡</div>
                  </div>
                </div>
                {/* Subtle rotating element */}
                <div className="absolute inset-0 rounded-full border-t border-neon-blue/30 animate-spin" style={{animationDuration: '20s'}} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}