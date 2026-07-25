"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Sparkles, Banknote, Landmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-white pt-32 pb-0 perspective-[2000px]"
    >
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="absolute inset-0 blueprint-grid opacity-[0.15]" />
        
        {/* Central Glows */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl h-[500px] rounded-[100%] bg-blue-500/10 blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[60vw] max-w-2xl h-[400px] rounded-[100%] bg-cyan-400/10 blur-[100px]" 
        />
      </div>

      {/* Top Center Typography Section */}
      <motion.div 
        style={{ y, opacity }}
        className="container relative z-20 px-4 md:px-8 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-12 mb-20"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-50/80 backdrop-blur-md shadow-[0_0_20px_rgba(37,99,235,0.05)] border border-blue-100/50 text-xs font-bold tracking-widest text-blue-700 mb-8 uppercase"
        >
          <Sparkles className="w-4 h-4 text-blue-600" /> Introducing Task Financial 2.0
        </motion.div>

        <h1 className="text-6xl md:text-7xl lg:text-[7rem] font-heading font-black text-slate-900 tracking-tighter leading-[1] mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Banking,
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 pb-4"
          >
            Redefined.
          </motion.div>
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-xl md:text-2xl text-slate-600 font-medium max-w-3xl leading-relaxed mb-12"
        >
          Access exclusive lending products, manage your wealth, and scale your business with absolute precision. The future of finance is here.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link href="/apply" className="w-full sm:w-auto group">
            <Button size="lg" className="relative overflow-hidden w-full h-14 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-bold shadow-[0_10px_40px_rgba(37,99,235,0.3)] transition-all hover:scale-105 hover:shadow-[0_15px_60px_rgba(37,99,235,0.4)]">
              <span className="relative z-10 flex items-center">Start Building <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              <motion.div 
                animate={{ x: ["-200%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[150%] skew-x-12 z-0"
              />
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto group">
            <Button size="lg" variant="outline" className="w-full h-14 px-10 bg-white backdrop-blur-md hover:bg-blue-50 text-blue-600 border-blue-200 rounded-full text-lg font-bold transition-all shadow-sm">
              Contact Sales
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* The Rising Dashboard Mockup */}
      <motion.div 
        style={{ rotateX: useTransform(scrollYProgress, [0, 1], [15, 0]), y: useTransform(scrollYProgress, [0, 1], [100, -50]), scale: useTransform(scrollYProgress, [0, 1], [0.95, 1.05]) }}
        className="relative z-30 w-[95vw] max-w-6xl mx-auto h-[700px] rounded-t-[2.5rem] border border-b-0 border-slate-200/60 bg-white/60 backdrop-blur-3xl shadow-[0_-20px_80px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col items-center pt-6 px-6"
      >
        {/* MacOS Style Window Header */}
        <div className="w-full max-w-5xl flex items-center justify-between mb-8">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <div className="w-3 h-3 rounded-full bg-slate-300" />
          </div>
          <div className="px-3 py-1 rounded-md bg-slate-100 text-[10px] font-bold text-slate-400 tracking-widest uppercase flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" /> Secure Connection
          </div>
          <div className="w-12" /> {/* Spacer */}
        </div>

        {/* Mockup Dashboard Content */}
        <div className="w-full max-w-5xl h-full flex gap-6">
          {/* Sidebar */}
          <div className="w-64 h-full flex flex-col gap-2 border-r border-slate-200/50 pr-6">
            <div className="w-full h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center px-4 gap-3 font-semibold text-sm mb-4">
              <Landmark className="w-4 h-4" /> Dashboard
            </div>
            {['Transactions', 'Loans', 'Investments', 'Settings'].map((item, i) => (
              <div key={i} className="w-full h-10 rounded-xl hover:bg-slate-50 text-slate-500 flex items-center px-4 gap-3 font-medium text-sm transition-colors cursor-pointer">
                <div className="w-4 h-4 rounded bg-slate-200" /> {item}
              </div>
            ))}
          </div>

          {/* Main Dashboard Area */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="w-full flex justify-between items-end mb-4">
              <div>
                <p className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-1">Total Balance</p>
                <h3 className="text-5xl font-black text-slate-900 tracking-tight">₹4,52,35,000</h3>
              </div>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-lg">
                <Banknote className="w-4 h-4 mr-2" /> Request Transfer
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Active Loans', value: '3', trend: '+1', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Monthly Payment', value: '₹1.2L', trend: '-5%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Credit Score', value: '850', trend: 'Excellent', color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-slate-400">{stat.trend}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Fake Chart Area */}
            <div className="flex-1 rounded-2xl border border-slate-100 bg-white shadow-sm p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-slate-900">Cash Flow</h4>
                <div className="flex gap-2">
                  {['1W', '1M', '1Y'].map(t => <div key={t} className="px-3 py-1 rounded bg-slate-50 text-xs font-bold text-slate-500">{t}</div>)}
                </div>
              </div>
              <div className="flex-1 flex items-end gap-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${20 + Math.random() * 80}%` }}
                    transition={{ delay: 0.5 + (i * 0.05), duration: 1, type: 'spring' }}
                    className={`flex-1 rounded-t-sm ${i % 5 === 0 ? 'bg-blue-600' : 'bg-slate-200'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Fade Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-40 pointer-events-none" />
      </motion.div>
    </section>
  );
}
