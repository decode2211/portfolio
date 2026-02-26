'use client'

import { motion } from 'framer-motion'
import { Code, Database, Cloud, Wrench } from 'lucide-react'

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: <Code className="w-6 h-6" />,
      color: "from-neon-blue to-blue-600",
      skills: [
        { name: "Python", level: 95 },
        { name: "Nodejs", level: 80 },
        { name: "Java", level: 92 },
        { name: "C++", level: 80 },
      ]
    },
    {
      title: "Frontend",
      icon: <Code className="w-6 h-6" />,
      color: "from-neon-purple to-purple-600",
      skills: [
        { name: "React", level: 92 },
        { name: "Next.js", level: 88 },
        { name: "HTML/CSS", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Framer Motion", level: 85 }
      ]
    },
    {
      title: "Backend & Database",
      icon: <Database className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 88 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 82 },
        { name: "Redis", level: 80 }
      ]
    },
    {
      title: "Data Science & ML",
      icon: <Database className="w-6 h-6" />,
      color: "from-pink-400 to-pink-600",
      skills: [
        { name: "TensorFlow", level: 90 },
        { name: "PyTorch", level: 80 },
        { name: "NumPy", level: 95 },
        { name: "Pandas", level: 92 },
        { name: "scikit-learn", level: 88 }
      ]
    },
    {
      title: "ML Frameworks & Tools",
      icon: <Database className="w-6 h-6" />,
      color: "from-purple-400 to-purple-600",
      skills: [
        { name: "Matplotlib", level: 90 },
        { name: "Seaborn", level: 88 },
        { name: "Plotly", level: 85 },
        { name: "Streamlit", level: 92 },
        { name: "FastAPI", level: 85 }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-orange-400 to-orange-600",
      skills: [
        { name: "AWS (EC2, S3, Lambda)", level: 85 },
        { name: "Docker", level: 88 },
        { name: "CI/CD", level: 82 },
        { name: "REST APIs", level: 90 },
        { name: "Model Deployment", level: 80 }
      ]
    },
    {
      title: "Tools & Others",
      icon: <Wrench className="w-6 h-6" />,
      color: "from-yellow-400 to-yellow-600",
      skills: [
        { name: "Git", level: 95 },
        { name: "Postman", level: 90 },
        { name: "Figma", level: 85 },
        { name: "VS Code", level: 95 },
        { name: "Linux", level: 82 }
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive expertise across the full technology stack
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl hover:neon-glow transition-all duration-300 group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 
                    }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-200">{skill.name}</span>
                      <span className="text-sm text-gray-400">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ 
                          duration: 1, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                          ease: "easeOut"
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 space-y-12"
        >
          {/* Data Science & ML Expertise */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8">Data Science & Machine Learning Expertise</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Core Data Science */}
              <div className="glass-card p-6 rounded-xl">
                <h4 className="font-bold text-neon-blue mb-4">Core Data Science</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "EDA", "Data Preprocessing", "Feature Engineering", 
                    "Statistical Analysis", "Hypothesis Testing"
                  ].map((skill, index) => (
                    <span key={index} className="px-3 py-1 glass rounded-full text-sm border border-glass-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Machine Learning */}
              <div className="glass-card p-6 rounded-xl">
                <h4 className="font-bold text-neon-purple mb-4">Machine Learning</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Supervised Learning", "Unsupervised Learning", "Time-series Analysis",
                    "Model Evaluation", "Hyperparameter Tuning"
                  ].map((skill, index) => (
                    <span key={index} className="px-3 py-1 glass rounded-full text-sm border border-glass-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deep Learning & MLOps */}
              <div className="glass-card p-6 rounded-xl">
                <h4 className="font-bold text-green-400 mb-4">Deep Learning & MLOps</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Deep Learning Fundamentals", "Real-time ML Inference", 
                    "Low-latency Pipelines", "Model Deployment"
                  ].map((skill, index) => (
                    <span key={index} className="px-3 py-1 glass rounded-full text-sm border border-glass-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Technologies */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8">Additional Technologies</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {[
                "GraphQL", "WebSockets", "Microservices", "REST APIs", 
                "Computer Vision", "NLP", "Data Visualization",
                "Agile", "Scrum", "Test-Driven Development", "Performance Optimization"
              ].map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 glass rounded-full text-sm border border-glass-border hover:border-neon-blue hover:neon-glow transition-all duration-300 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}