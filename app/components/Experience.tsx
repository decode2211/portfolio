'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'

export default function Experience() {
  const experiences = [
    {
      company: "Mind Mauji Pvt. Ltd.",
      role: "Machine Learning Intern",
      period: "Jun 2025 – Aug 2025",
      location: "On-site / Hybrid",
      description:
        "Built an AI-driven Resume vs Job Description matching system using NLP and machine learning techniques to automate recruitment screening workflows.",
      technologies: [
        "Python",
        "NLP",
        "Machine Learning",
        "Pandas",
        "NumPy",
        "Streamlit",
        "MySQL",
        "Data Preprocessing"
      ],
      highlights: [
        "Processed 500+ resumes across multiple job roles using NLP-based similarity scoring",
        "Reduced manual resume screening effort by ~40% through predictive candidate–job fit models",
        "Architected reusable data cleaning and preprocessing pipelines",
        "Developed Streamlit web app integrated with MySQL for structured reporting",
        "Collaborated with recruiters & engineers to translate business needs into ML solutions",
        "Evaluated model performance and presented insights to technical & non-technical stakeholders"
      ]
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
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Professional <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-xl text-gray-300">
              Building the future, one line of code at a time
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue to-neon-purple" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 bg-neon-blue rounded-full border-4 border-dark-bg" />
                  
                  {/* Experience card */}
                  <div className="glass-card p-8 rounded-2xl hover:neon-glow transition-all duration-300 group">
                    <div className="flex flex-wrap justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                        <div className="flex items-center gap-4 text-neon-blue font-semibold">
                          <span>{exp.company}</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6">{exp.description}</p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-white">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300">
                            <div className="w-1.5 h-1.5 bg-neon-purple rounded-full mt-2 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold mb-3 text-white">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-glass rounded-full text-sm border border-glass-border hover:border-neon-blue transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}