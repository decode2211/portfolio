'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, ExternalLink, ChevronDown, Zap, Settings } from 'lucide-react'

export default function Hero() {
  const orbitIcons = [
    { label: 'AI', angle: 0 },
    { label: 'ML', angle: 90 },
    { label: '{ }', angle: 180 },
    { icon: Settings, angle: 270 },
  ]

  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0 bg-dark-bg" />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 -left-32 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl" />

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

      <div className="container mx-auto px-6 relative z-10 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Clean Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5 max-w-2xl"
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 border border-gray-700 rounded-full px-4 py-1.5 text-xs font-medium text-gray-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              Open to opportunities
            </motion.div>

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
              className="text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="text-gradient">Dev Vashist</span>
            </motion.h1>

            {/* Value Proposition - Secondary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-3"
            >
              <h2 className="text-xl lg:text-2xl font-medium text-white leading-relaxed">
                I build intelligent systems,<br />
                scalable products, and <span className="font-semibold">AI that moves fast</span>.
              </h2>

              <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                Machine Learning & Data Science Engineer specializing in AI-driven systems,
                full-stack architecture, and low-latency applications.
              </p>
            </motion.div>

            {/* Stats - Minimal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-3 gap-3 text-sm"
            >
              <div className="glass p-4 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-gray-500">LeetCode</div>
              </div>
              <div className="glass p-4 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold text-white">9.3</div>
                <div className="text-gray-500">CGPA</div>
              </div>
              <div className="glass p-4 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-gray-500">Hackathon Winner</div>
              </div>
            </motion.div>

            {/* CTA Buttons - Clean */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="https://github.com/decode2211"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://www.overleaf.com/read/zkmpyqmqnhfc#f0e38b"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-600 text-white px-8 py-4 rounded-lg font-medium hover:border-gray-400 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </a>

              <a
                href="https://leetcode.com/u/devyash1122/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white flex items-center gap-1.5 text-sm underline-offset-4 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LeetCode</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Richer Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-[26rem] h-[26rem] relative flex items-center justify-center">
              {/* Outer glow ring */}
              <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 blur-2xl" />
              <div className="absolute inset-0 m-auto w-72 h-72 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-full blur-3xl" />

              {/* Concentric rings */}
              <div className="w-60 h-60 rounded-full border border-gray-800 flex items-center justify-center relative">
                <div className="w-40 h-40 rounded-full border border-gray-700 flex items-center justify-center relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-blue/15 to-neon-purple/15 flex items-center justify-center border border-white/5">
                    <Zap className="w-8 h-8 text-neon-blue" />
                  </div>
                </div>

                {/* Rotating orbit ring */}
                <div
                  className="absolute inset-0 rounded-full border-t-2 border-neon-blue/40 animate-spin"
                  style={{ animationDuration: '20s' }}
                >
                  {orbitIcons.map((item, i) => {
                    const radius = 118
                    const rad = (item.angle * Math.PI) / 180
                    const x = radius * Math.cos(rad)
                    const y = radius * Math.sin(rad)
                    return (
                      <motion.div
                        key={item.angle}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
                        className="absolute w-11 h-11 rounded-lg glass border border-gray-700 flex items-center justify-center text-xs font-semibold text-neon-blue"
                        style={{
                          left: `calc(50% + ${x}px - 22px)`,
                          top: `calc(50% + ${y}px - 22px)`,
                          animation: 'spin 20s linear reverse infinite',
                        }}
                      >
                        {item.icon ? <item.icon className="w-5 h-5" /> : item.label}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col items-center gap-2 mt-10 text-gray-500"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}