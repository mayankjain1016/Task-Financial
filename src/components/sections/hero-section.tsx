"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Magic Spotlight Hover Effect for Cards
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden bg-[#FAFAFA] pt-32 pb-24 selection:bg-blue-500/30"
    >
      {/* Background - Ultra Minimalist Technical Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Subtle glowing ambient lights */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] rounded-full bg-blue-400/5 blur-[120px] mix-blend-multiply" />
      </div>

      <div className="container relative z-20 px-4 md:px-8 w-full max-w-[1200px] mx-auto flex flex-col items-center text-center">
        
        {/* TOP: Ultra-Refined Typography */}
        <div className="flex flex-col items-center w-full z-30 pt-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-xl border border-black/5 text-[11px] font-semibold tracking-widest text-slate-600 mb-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Introducing Task Financial v2.0
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-slate-900 leading-[1.1] mb-6 max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block"
            >
              Precision banking for
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600"
            >
              modern scale.
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-500 font-normal leading-relaxed max-w-2xl mb-10"
          >
            A seamlessly integrated financial stack designed with absolute precision. Manage capital, issue cards, and scale operations instantly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link href="/apply">
              <Button size="lg" className="h-12 px-8 bg-black hover:bg-slate-800 text-white rounded-full text-sm font-medium shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] transition-all hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5">
                Start Building <ArrowRight className="ml-2 w-4 h-4 opacity-70" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="h-12 px-8 bg-white/50 hover:bg-white text-slate-700 border-black/10 rounded-full text-sm font-medium transition-all shadow-sm backdrop-blur-md">
                Read the Docs
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* BOTTOM: Unified Application Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="relative w-full max-w-[1100px] rounded-3xl bg-white border border-black/5 shadow-[0_20px_80px_rgb(0,0,0,0.07)] overflow-hidden group/dashboard transition-all duration-700 hover:shadow-[0_30px_100px_rgb(0,0,0,0.1)] flex flex-col"
        >
          {/* Magic Spotlight for the whole dashboard */}
          <div 
            className="absolute inset-0 opacity-0 group-hover/dashboard:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
            style={{
              background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.04), transparent 40%)`
            }}
          />

          {/* MacOS Window Header */}
          <div className="relative z-10 w-full h-12 bg-slate-50/80 backdrop-blur-md border-b border-black/5 flex items-center px-4 justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20" />
            </div>
            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-widest flex gap-4">
              <span>TaskFinancial_Production</span>
              <span>v2.0.4</span>
            </div>
            <div className="w-16" /> {/* Spacer to center the title */}
          </div>

          {/* Dashboard Body (Sidebar + Main View) */}
          <div className="relative z-10 flex flex-col md:flex-row w-full flex-1 min-h-[450px]">
            
            {/* Left Sidebar */}
            <div className="w-full md:w-64 bg-slate-50/50 border-r border-black/5 p-6 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Views</p>
                <div className="space-y-1">
                  <div className="px-3 py-2 bg-white rounded-lg border border-black/5 shadow-sm text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" /> Overview
                  </div>
                  <div className="px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100/50 hover:text-slate-800 transition-colors flex items-center gap-2 cursor-pointer">
                     Transfers
                  </div>
                  <div className="px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-100/50 hover:text-slate-800 transition-colors flex items-center gap-2 cursor-pointer">
                     API Keys
                  </div>
                </div>
              </div>

              {/* Infrastructure Stats in Sidebar */}
              <div className="mt-8">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Infrastructure</p>
                <h4 className="text-xl font-semibold text-slate-900 mb-1">99.999%</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-3">Uptime across 140+ global regions.</p>
                
                {/* Connected Nodes Graphic */}
                <div className="relative z-10 w-full h-8 flex items-center justify-between px-1">
                  <div className="absolute left-2 right-2 h-[1px] bg-slate-200 top-1/2 -translate-y-1/2 z-0" />
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                    className="absolute left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent top-1/2 -translate-y-1/2 z-0 opacity-50"
                  />
                  {[1,2,3,4].map((i) => (
                      <div key={i} className="relative z-10 w-2.5 h-2.5 rounded-full bg-white border-2 border-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                        {i === 2 && <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50" />}
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Central View */}
            <div className="flex-1 p-8 flex flex-col relative bg-white">
              {/* Header of Main View */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Total Capital</p>
                  <h3 className="text-5xl font-semibold text-slate-900 tracking-tight">$14,240,000.00</h3>
                </div>
                <div className="px-3 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-semibold border border-green-100 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> +12.4%
                </div>
              </div>

              {/* Massive SVG Line Chart */}
              <div className="relative w-full h-48 mb-8 flex-shrink-0">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="mainChartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}
                    d="M0,30 L0,25 Q10,15 20,28 T40,20 T60,22 T80,10 T100,12 L100,30 Z"
                    fill="url(#mainChartGradient)"
                  />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}
                    d="M0,25 Q10,15 20,28 T40,20 T60,22 T80,10 T100,12"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                  <motion.circle
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.3 }}
                    cx="100" cy="12" r="1.5"
                    fill="#fff"
                    stroke="#3b82f6"
                    strokeWidth="0.8"
                    className="drop-shadow-[0_0_6px_rgba(59,130,246,1)]"
                  />
                </svg>
              </div>

              {/* Bottom Row within Main View (Live Transfers & Code) */}
              <div className="flex flex-col xl:flex-row gap-6 mt-auto">
                
                {/* Live Transfers Mini-Panel */}
                <div className="flex-1 bg-slate-50/80 rounded-2xl p-5 border border-black/5 flex items-center gap-5">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-20 animate-ping" />
                    <div className="relative w-full h-full rounded-xl bg-white border border-blue-100 flex items-center justify-center shadow-sm z-10">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-0.5">Live Transfers</h4>
                    <p className="text-xs text-slate-500 mb-1">Global payouts running.</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Processing</span>
                      <span className="text-sm font-bold text-slate-900">4,092 / sec</span>
                    </div>
                  </div>
                </div>

                {/* Code Terminal Mini-Panel */}
                <div className="flex-[1.5] bg-[#0A0A0A] rounded-2xl p-5 border border-black/10 shadow-inner font-mono text-[10px] sm:text-xs text-slate-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                    </div>
                    <div className="px-2 py-0.5 rounded bg-white/10 text-[9px] text-cyan-300 border border-white/5 uppercase tracking-widest">
                      API Ready
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p><span className="text-pink-400">import</span> {'{ TaskFinance }'} <span className="text-pink-400">from</span> <span className="text-emerald-300">'@task/sdk'</span>;</p>
                    <p className="mt-2"><span className="text-pink-400">const</span> <span className="text-blue-300">client</span> = <span className="text-pink-400">new</span> <span className="text-amber-200">TaskFinance</span>({'{'}</p>
                    <p className="pl-4"><span className="text-sky-300">apiKey</span>: process.env.TASK_KEY,</p>
                    <p className="flex items-center">{'});'} <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-3.5 bg-blue-400 ml-1 inline-block" /></p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
