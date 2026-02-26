'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Zap, Brain, TrendingUp } from 'lucide-react'

export default function Projects() {

  const projects = [
    {
      title: "Movie Recommendation System",
      subtitle: "Machine Learning Recommendation Engine",
      description:
        "Implemented a content-based recommendation engine using TF-IDF and cosine similarity to generate explainable personalized movie suggestions.",
      icon: <Brain className="w-8 h-8" />,
      image: "/api/placeholder/600/400",
      technologies: ["Python", "Machine Learning", "TF-IDF", "Scikit-learn"],
      metrics: [
        { label: "Model", value: "Content-Based" },
        { label: "Technique", value: "TF-IDF" },
        { label: "Similarity", value: "Cosine" }
      ],
      highlights: [
        "Content-based recommendation engine",
        "Feature engineering for relevance",
        "Explainable top-N recommendations"
      ],
      github: "#",
      demo: "#",
      featured: true
    },

    {
      title: "Potential Fishing Zone (PFZ) Prediction API",
      subtitle: "FastAPI ML Prediction System",
      description:
        "Constructed a FastAPI backend delivering real-time ML predictions using satellite and oceanographic datasets with scalable deployment.",
      icon: <TrendingUp className="w-8 h-8" />,
      image: "/api/placeholder/600/400",
      technologies: ["FastAPI", "Python", "Machine Learning", "API"],
      metrics: [
        { label: "Prediction", value: "Real-time" },
        { label: "Framework", value: "FastAPI" },
        { label: "Deployment", value: "Scalable" }
      ],
      highlights: [
        "Real-time ML prediction API",
        "Satellite & oceanographic integration",
        "CORS-enabled frontend connectivity"
      ],
      github: "#",
      demo: "#",
      featured: true
    },

    {
      title: "Biodiversity Zones & Mixed Layer Depth Analysis",
      subtitle: "Oceanographic Data Analysis",
      description:
        "Analyzed large-scale oceanographic datasets to identify biodiversity patterns and mixed layer depth variations with interactive visualizations.",
      icon: <Zap className="w-8 h-8" />,
      image: "/api/placeholder/600/400",
      technologies: ["Python", "Data Analysis", "HTML", "CSS", "JavaScript"],
      metrics: [
        { label: "Dataset", value: "Large-scale" },
        { label: "Analysis", value: "Statistical" },
        { label: "Visualization", value: "Interactive" }
      ],
      highlights: [
        "Ocean biodiversity trend analysis",
        "Mixed layer depth evaluation",
        "Interactive visualization dashboards"
      ],
      github: "#",
      demo: "#",
      featured: false
    },

    {
      title: "Financial Tracker for Teenagers",
      subtitle: "Web-based Finance Management",
      description:
        "Developed a financial tracking web application enabling teenagers to manage income, expenses and savings through interactive dashboards.",
      icon: <TrendingUp className="w-8 h-8" />,
      image: "/api/placeholder/600/400",
      technologies: ["Node.js", "JavaScript", "HTML", "CSS"],
      metrics: [
        { label: "Tracking", value: "Real-time" },
        { label: "Dashboard", value: "Interactive" },
        { label: "Insights", value: "Structured" }
      ],
      highlights: [
        "Income & expense tracking",
        "Real-time dashboards",
        "User-friendly financial insights"
      ],
      github: "#",
      demo: "#",
      featured: false
    },

    {
      title: "Cadence",
      subtitle: "System Development Project",
      description:
        "Cadence is an ongoing project focused on building scalable intelligent systems using modern development and architectural practices.",
      icon: <Brain className="w-8 h-8" />,
      image: "/api/placeholder/600/400",
      technologies: ["In Progress"],
      metrics: [
        { label: "Status", value: "Developing" },
        { label: "Architecture", value: "Scalable" },
        { label: "Phase", value: "Active" }
      ],
      highlights: [
        "Currently under development",
        "Modern scalable architecture",
        "Future production deployment"
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