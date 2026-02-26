'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Instagram, ExternalLink, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "devvashist1117@gmail.com",
      href: "mailto:devvashist1117@gmail.com?subject=Let's%20Work%20Together",
      color: "hover:text-neon-blue"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+91 9810248310",
      href: "tel:+919810248310",
      color: "hover:text-green-400"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      value: "Connect with me",
      href: "https://www.linkedin.com/in/dev-vashist-063585286/",
      color: "hover:text-blue-400"
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      value: "View my code",
      href: "https://github.com/decode2211",
      color: "hover:text-gray-300"
    }
  ]

  const achievements = [
    "200+ LeetCode problems solved",
    "3 Hackathon wins",
    "Open source contributor",
    "SIH 2025 internal round qualified"
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
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to build something amazing together? Let's discuss your next project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={index}
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex items-center gap-4 p-4 glass rounded-xl transition-all duration-300 group ${method.color} hover:neon-glow hover:-translate-y-1`}
                    >
                      <div className="text-gray-400 group-hover:scale-110 transition-transform">
                        {method.icon}
                      </div>
                      <div>
                        <div className="font-semibold">{method.label}</div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300">
                          {method.value}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-neon-blue" />
                  <span className="font-semibold">Location</span>
                </div>
                <p className="text-gray-300">India • Open to Remote Opportunities</p>
              </motion.div>
            </motion.div>

            {/* Achievements & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Quick Stats */}
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-neon-blue mb-2">200+</div>
                    <div className="text-sm text-gray-400">Problems Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-neon-purple mb-2">1.5+</div>
                    <div className="text-sm text-gray-400">Years Hands-on Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-neon-blue mb-2">10+</div>
                    <div className="text-sm text-gray-400">Projects Built</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-neon-purple mb-2">Remote</div>
                    <div className="text-sm text-gray-400">Open to Opportunities</div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="glass p-6 rounded-xl">
                <h4 className="font-bold mb-4">Recent Achievements</h4>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-neon-purple rounded-full flex-shrink-0" />
                      <span className="text-gray-300">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-2xl text-center"
              >
                <h4 className="text-xl font-bold mb-4">Ready to collaborate?</h4>
                <p className="text-gray-300 mb-6">
                  Let's build something incredible together. I'm always excited to work on innovative projects.
                </p>
                <a
                  href="mailto:devvashist1117@gmail.com?subject=Let's%20Work%20Together"
                  className="inline-flex items-center gap-2 glass px-8 py-4 rounded-xl neon-glow hover:scale-105 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-semibold">Start a Conversation</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}