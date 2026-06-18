'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Zap, Brain, TrendingUp, Heart, Shield } from 'lucide-react'

export default function Projects() {

  const projects = [
    {
      title: "Us, Always",
      subtitle: "Full-Stack Relationship Web App",
      description:
        "Built a full-stack backend for a private relationship web app; designed a PostgreSQL schema with Prisma ORM covering users, milestones, media, and quiz entries with relational integrity.",
      icon: <Heart className="w-8 h-8" />,
      technologies: ["Node.js", "Express", "PostgreSQL", "Prisma ORM", "Socket.io", "JWT", "TypeScript"],
      metrics: [
        { label: "Auth", value: "JWT" },
        { label: "Real-time", value: "Socket.io" },
        { label: "Storage", value: "Cloudinary" }
      ],
      highlights: [
        "JWT httpOnly cookie authentication system",
        "Real-time bidirectional events via Socket.io (shared watch queue, live sync)",
        "RESTful APIs for all core features including photo uploads via Cloudinary"
      ],
      github: "#",
      demo: "#",
      featured: true
    },

    {
      title: "PFZ Prediction & Biodiversity Analysis",
      subtitle: "ML Pipeline & Oceanographic Data Analysis",
      description:
        "Built a scalable ML pipeline to preprocess and model 8.5GB+ satellite and oceanographic data for predicting potential fishing zones; analyzed large-scale datasets to identify biodiversity patterns and mixed layer depth variations.",
      icon: <TrendingUp className="w-8 h-8" />,
      technologies: ["Python", "FastAPI", "Scikit-learn", "JavaScript", "HTML", "CSS"],
      metrics: [
        { label: "Dataset", value: "8.5GB+" },
        { label: "API", value: "FastAPI" },
        { label: "Viz", value: "Interactive" }
      ],
      highlights: [
        "Feature engineering, geospatial preprocessing & supervised model training",
        "Predictions served via FastAPI REST APIs with HTML/CSS/JS frontend dashboard",
        "Ocean biodiversity trend analysis with mixed layer depth evaluation"
      ],
      github: "#",
      demo: "#",
      featured: true
    },

    {
      title: "Fraud Detection System (AML)",
      subtitle: "Ensemble ML for Financial Crime Detection",
      description:
        "Developed ensemble ML models on large-scale financial datasets to detect fraudulent transactions and money-laundering activity using XGBoost and LightGBM.",
      icon: <Shield className="w-8 h-8" />,
      technologies: ["Python", "XGBoost", "LightGBM", "Pandas"],
      metrics: [
        { label: "Models", value: "Ensemble" },
        { label: "Metric", value: "AUC-ROC" },
        { label: "Target", value: "AML" }
      ],
      highlights: [
        "Engineered features: transaction velocity, network relationships & behavioral patterns",
        "Evaluated using AUC-ROC, precision-recall, and F1-score",
        "Detected fraudulent transactions across large-scale financial datasets"
      ],
      github: "#",
      demo: "#",
      featured: false
    },

    {
      title: "Deep Reinforcement Learning Agent (DQN)",
      subtitle: "Sequential Decision-Making with Deep Q-Networks",
      description:
        "Implemented a Deep Q-Network agent for sequential decision-making using Gymnasium, applying experience replay, target networks, and reward shaping for stable convergence.",
      icon: <Brain className="w-8 h-8" />,
      technologies: ["Python", "PyTorch", "Gymnasium", "TensorBoard"],
      metrics: [
        { label: "Algorithm", value: "DQN" },
        { label: "Framework", value: "PyTorch" },
        { label: "Tracking", value: "TensorBoard" }
      ],
      highlights: [
        "Experience replay, target networks & reward shaping for stable convergence",
        "Monitored training via TensorBoard: episode rewards, loss curves & Q-value progression",
        "Sequential decision-making in Gymnasium environments"
      ],
      github: "#",
      demo: "#",
      featured: false
    },

    {
      title: "Explainable AI (XAI) Reasoning System",
      subtitle: "Human-Interpretable AI Decision Traces",
      description:
        "Built an XAI pipeline to generate structured, human-interpretable reasoning traces for model decisions using NLP and LLM APIs; optimized for low-latency real-time inference.",
      icon: <Zap className="w-8 h-8" />,
      technologies: ["Python", "NLP", "LLM APIs", "Prompt Engineering"],
      metrics: [
        { label: "Output", value: "Structured" },
        { label: "Latency", value: "Real-time" },
        { label: "Method", value: "XAI" }
      ],
      highlights: [
        "Structured, human-interpretable reasoning traces for model decisions",
        "NLP and LLM APIs with optimized prompt engineering",
        "Low-latency real-time inference pipeline"
      ],
      github: "#",
      demo: "#",
      featured: false
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Interactive case studies showcasing production-grade applications with real-world impact
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-20">
          {projects.map((project, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >

              {/* LEFT SIDE */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>

                <div className="flex items-center gap-4">
                  <div className="p-3 glass rounded-xl text-neon-blue">
                    {project.icon}
                  </div>

                  {project.featured && (
                    <span className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                  <p className="text-neon-blue font-semibold mb-4">
                    {project.subtitle}
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="glass p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-neon-blue">
                        {metric.value}
                      </div>
                      <div className="text-sm text-gray-400">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3 text-gray-300">
                        <div className="w-1.5 h-1.5 bg-neon-purple rounded-full mt-2"/>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-glass rounded-full text-sm border border-glass-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a href={project.github} target="_blank"
                     className="flex items-center gap-2 glass-card px-6 py-3 rounded-xl">
                    <Github className="w-4 h-4"/>
                    Code
                  </a>

                  <a href={project.demo} target="_blank"
                     className="flex items-center gap-2 glass px-6 py-3 rounded-xl">
                    <ExternalLink className="w-4 h-4"/>
                    Live Demo
                  </a>
                </div>

              </div>

              {/* RIGHT SIDE VISUAL */}
              <div>
                <div className="glass-card p-8 rounded-2xl">
                  <div className="aspect-video flex items-center justify-center text-5xl">
                    🚀
                  </div>
                </div>
              </div>

            </motion.div>

          ))}
        </div>

      </div>
    </section>
  )
}