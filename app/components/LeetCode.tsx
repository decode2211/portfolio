'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Trophy, Target, Zap, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function LeetCode() {
  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    streak: 0
  })

  const finalStats = {
    total: 200,
    easy: 80,
    medium: 100,
    hard: 20,
    streak: 15
  }

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        total: Math.floor(finalStats.total * progress),
        easy: Math.floor(finalStats.easy * progress),
        medium: Math.floor(finalStats.medium * progress),
        hard: Math.floor(finalStats.hard * progress),
        streak: Math.floor(finalStats.streak * progress)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedStats(finalStats)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  const difficultyData = [
    {
      label: 'Easy',
      count: animatedStats.easy,
      total: 150,
      color: 'bg-green-500',
      percentage: (animatedStats.easy / 150) * 100
    },
    {
      label: 'Medium',
      count: animatedStats.medium,
      total: 200,
      color: 'bg-yellow-500',
      percentage: (animatedStats.medium / 200) * 100
    },
    {
      label: 'Hard',
      count: animatedStats.hard,
      total: 50,
      color: 'bg-red-500',
      percentage: (animatedStats.hard / 50) * 100
    }
  ]

  const achievements = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Problem Solver",
      description: "200+ problems solved",
      color: "text-yellow-400"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Consistency",
      description: "15-day streak",
      color: "text-green-400"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Speed Demon",
      description: "Top 10% runtime",
      color: "text-blue-400"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Rising Star",
      description: "1800+ rating",
      color: "text-purple-400"
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
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              LeetCode <span className="text-gradient">Stats</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Consistent problem-solving and algorithmic thinking
            </p>
            <a
              href="https://leetcode.com/u/yashikabhatia2209/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 glass-card px-8 py-4 rounded-xl neon-glow hover:scale-105 transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="font-semibold">View Profile</span>
            </a>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Total Problems */}
              <div className="glass-card p-8 rounded-2xl text-center">
                <div className="text-6xl font-bold text-gradient mb-4">
                  {animatedStats.total}+
                </div>
                <div className="text-xl text-gray-300 mb-2">Problems Solved</div>
                <div className="flex items-center justify-center gap-2 text-neon-blue">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">{animatedStats.streak} day streak</span>
                </div>
              </div>

              {/* Difficulty Breakdown */}
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 text-center">Difficulty Breakdown</h3>
                <div className="space-y-6">
                  {difficultyData.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{item.label}</span>
                        <span className="text-sm text-gray-400">
                          {item.count}/{item.total}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <motion.div
                          className={`h-3 rounded-full ${item.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Achievements & Progress */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="glass p-6 rounded-xl text-center hover:neon-glow transition-all duration-300"
                  >
                    <div className={`${achievement.color} mb-3 flex justify-center`}>
                      {achievement.icon}
                    </div>
                    <h4 className="font-semibold mb-2 text-sm">{achievement.title}</h4>
                    <p className="text-xs text-gray-400">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Progress Chart Placeholder */}
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 text-center">Solving Pattern</h3>
                <div className="h-48 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-neon-blue mx-auto mb-4" />
                    <p className="text-gray-400">Consistent daily progress</p>
                    <div className="mt-4 flex justify-center space-x-1">
                      <div className="w-2 bg-gradient-to-t from-neon-purple to-neon-blue rounded-t h-10" />
                      <div className="w-2 bg-gradient-to-t from-neon-purple to-neon-blue rounded-t h-16" />
                      <div className="w-2 bg-gradient-to-t from-neon-purple to-neon-blue rounded-t h-8" />
                      <div className="w-2 bg-gradient-to-t from-neon-purple to-neon-blue rounded-t h-20" />
                      <div className="w-2 bg-gradient-to-t from-neon-purple to-neon-blue rounded-t h-12" />
                      <div className="w-2 bg-gradient-to-t from-neon-purple to-neon-blue rounded-t h-18" />
                      <div className="w-2 bg-gradient-to-t from-neon-purple to-neon-blue rounded-t h-14" />
                      <div className="w-2 bg-gradient-to-t from-neon-purple to-neon-blue rounded-t h-22" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass p-6 rounded-xl">
                <h4 className="font-semibold mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  {[
                    { problem: "Two Sum", difficulty: "Easy", status: "Solved" },
                    { problem: "Binary Tree Inorder", difficulty: "Medium", status: "Solved" },
                    { problem: "Merge K Sorted Lists", difficulty: "Hard", status: "Attempted" }
                  ].map((activity, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">{activity.problem}</span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          activity.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                          activity.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {activity.difficulty}
                        </span>
                        <span className={`text-xs ${
                          activity.status === 'Solved' ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}