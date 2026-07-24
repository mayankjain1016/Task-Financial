"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Layout, Zap, Shield, HeartHandshake, ArrowRight } from 'lucide-react'

export function WhyChooseUs() {
  const features = [
    {
      title: "Fast Approvals",
      icon: <Zap className="w-6 h-6 text-primary" />,
      desc: "We process your applications instantly. Get approvals in minutes and funds in your account within 24 hours.",
    },
    {
      title: "Transparent Rates",
      icon: <Layout className="w-6 h-6 text-primary" />,
      desc: "No hidden charges, no surprises. We believe in 100% transparency for all our processing fees and interest rates.",
    },
    {
      title: "Bank-Grade Security",
      icon: <Shield className="w-6 h-6 text-primary" />,
      desc: "Your data is protected by enterprise-level encryption and security protocols used by top national banks.",
    },
    {
      title: "Dedicated Support",
      icon: <HeartHandshake className="w-6 h-6 text-primary" />,
      desc: "We don't just provide loans; we partner with you for your financial growth with dedicated relationship managers.",
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  }

  return (
    <section className="py-32 bg-secondary/50 border-y border-primary/10 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="flex-1 text-left lg:sticky lg:top-32"
          >
            <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-8 border-b border-primary/10 pb-4 inline-block">
              Why Choose Us
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black mb-8 text-foreground leading-[1] tracking-tighter">
              More than <br/>
              <span className="text-transparent text-outline hover:text-outline-hover transition-all duration-500" style={{ WebkitTextStroke: '1px rgba(15,23,42,0.3)' }}>loans and</span> <br/>
              banking.
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md font-medium mb-12">
              Working with Task Financial means choosing a partner that puts your financial security first. We bring top-tier enterprise lending to your fingertips.
            </p>
            <button className="group flex items-center gap-4 text-foreground text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors duration-300">
              Start Application
              <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors duration-300">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1 w-full flex flex-col"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative border-b border-primary/10 last:border-0 py-10"
              >
                <div className="flex items-start gap-8">
                  <div className="w-12 h-12 rounded-none border border-primary/10 flex items-center justify-center bg-card group-hover:bg-primary group-hover:border-primary transition-colors duration-500 shrink-0">
                    <div className="group-hover:brightness-0 group-hover:invert transition-all duration-500">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-4 tracking-tight">
                      {feature.title}
                    </h4>
                    <p className="text-muted-foreground font-medium leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
