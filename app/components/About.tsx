'use client'

import { motion } from 'framer-motion'
import { Code, Database, Brain, Zap } from 'lucide-react'

export default function About() {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack Development",
      description: "React, Node.js, PostgreSQL, AWS"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI & Machine Learning",
      description: "TensorFlow, PyTorch, Real-time ML Inference"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Science & Analytics",
      description: "EDA, Statistical Analysis, Feature Engineering"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "MLOps & Deployment",
      description: "Model Deployment, Low-latency Pipelines, CI/CD"
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-12"
        >
          {/* Main content */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold">
              About <span className="text-gradient">Me</span>
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              I build intelligent systems, scalable products, and AI that moves fast. 
              Software Developer & Data Science Engineer specializing in AI-driven systems, 
              full-stack architecture, and low-latency applications. Expert in machine learning, 
              statistical analysis, and real-time ML inference. 200+ LeetCode problems solved. 
              I ship fast, scalable, production-grade software with cutting-edge ML capabilities.
            </p>
          </div>

          {/* Education & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-neon-blue mb-2">9.3</div>
                <div className="text-gray-400">CGPA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-neon-purple mb-2">3</div>
                <div className="text-gray-400">Hackathon Winner</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-white mb-2">SRM AP</div>
                <div className="text-gray-400">Electronics and ML Engineer</div>
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-xl hover:neon-glow transition-all duration-300 group"
              >
                <div className="text-neon-blue mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}