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

        {/* BOTTOM: Spotlight Hover Grid Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-4 group/grid"
        >
          {/* Card 1: Main Metric */}
          <div className="relative md:col-span-2 h-[260px] rounded-3xl bg-white/60 backdrop-blur-xl border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-8 flex flex-col justify-between group/card transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:bg-white">
            <div 
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.08), transparent 40%)`
              }}
            />
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Total Capital</p>
                <h3 className="text-4xl font-semibold text-slate-900 tracking-tight">$14,240,000.00</h3>
              </div>
              <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium border border-green-100 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> +12.4%
              </div>
            </div>
            {/* Premium Animated SVG Line Chart */}
            <div className="relative z-10 w-full h-24 mt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                  d="M0,30 L0,20 Q10,10 20,25 T40,15 T60,20 T80,5 T100,10 L100,30 Z"
                  fill="url(#chartGradient)"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                  d="M0,20 Q10,10 20,25 T40,15 T60,20 T80,5 T100,10"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
                <motion.circle
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.5 }}
                  cx="100" cy="10" r="2"
                  fill="#fff"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  className="drop-shadow-[0_0_4px_rgba(59,130,246,0.8)]"
                />
              </svg>
            </div>
          </div>

          {/* Card 2: Recent Activity */}
          <div className="relative md:col-span-1 h-[260px] rounded-3xl bg-white/60 backdrop-blur-xl border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-8 flex flex-col justify-between group/card transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:bg-white">
             <div 
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x - 666}px ${mousePosition.y}px, rgba(59,130,246,0.08), transparent 40%)` 
              }}
            />
            <div className="relative z-10">
              <div className="relative w-12 h-12 mb-5">
                <div className="absolute inset-0 bg-blue-500 rounded-xl opacity-20 animate-ping" />
                <div className="relative w-full h-full rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-inner z-10">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-1">Live Transfers</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Global payouts processing seamlessly with zero latency.</p>
            </div>
            <div className="relative z-10 w-full flex items-center justify-between py-3 border-t border-black/5 mt-2">
               <span className="text-xs font-medium text-slate-400">Processing</span>
               <span className="text-xs font-semibold text-slate-900">4,092 / sec</span>
            </div>
          </div>

          {/* Card 3: Global Network */}
          <div className="relative md:col-span-1 h-[260px] rounded-3xl bg-white/60 backdrop-blur-xl border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-8 flex flex-col justify-between group/card transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:bg-white">
             <div 
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y - 276}px, rgba(59,130,246,0.08), transparent 40%)` 
              }}
            />
            <div className="relative z-10">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-4">Infrastructure</p>
              <h4 className="text-2xl font-semibold text-slate-900 mb-2">99.999%</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Uptime across 140+ global regions. Built for absolute reliability.</p>
            </div>
            {/* Connected Nodes Graphic */}
            <div className="relative z-10 w-full h-12 mt-4 flex items-center justify-between px-2">
               {/* Connecting Line */}
               <div className="absolute left-4 right-4 h-[1px] bg-slate-200 top-1/2 -translate-y-1/2 z-0" />
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                 className="absolute left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent top-1/2 -translate-y-1/2 z-0 opacity-50"
               />
               
               {/* Nodes */}
               {[1,2,3,4,5].map((i) => (
                  <div key={i} className="relative z-10 w-3 h-3 rounded-full bg-white border-2 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    {i === 3 && (
                      <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50" />
                    )}
                  </div>
               ))}
            </div>
          </div>

          {/* Card 4: Code Integration */}
          <div className="relative md:col-span-2 h-[260px] rounded-3xl bg-[#0A0A0A] border border-black/[0.04] shadow-[0_15px_40px_rgb(0,0,0,0.1)] overflow-hidden p-8 flex flex-col justify-center group/card transition-all duration-500 hover:-translate-y-1">
            <div 
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x - 333}px ${mousePosition.y - 276}px, rgba(255,255,255,0.07), transparent 40%)`
              }}
            />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-[10px] font-mono text-slate-300 mb-4 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> API Ready
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Deploy in minutes</h4>
                <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                  Integrate our powerful SDKs directly into your codebase with just three lines of code.
                </p>
              </div>
              
              {/* Code Snippet Mockup */}
              <div className="flex-1 w-full bg-white/5 rounded-2xl border border-white/10 p-5 font-mono text-xs text-slate-300 shadow-2xl backdrop-blur-md">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                </div>
                <div className="space-y-1.5">
                  <p><span className="text-pink-400">import</span> {'{ TaskFinance }'} <span className="text-pink-400">from</span> <span className="text-emerald-300">'@task/sdk'</span>;</p>
                  <p className="mt-4"><span className="text-pink-400">const</span> <span className="text-blue-300">client</span> = <span className="text-pink-400">new</span> <span className="text-amber-200">TaskFinance</span>({'{'}</p>
                  <p className="pl-4"><span className="text-sky-300">apiKey</span>: process.env.TASK_KEY,</p>
                  <p className="flex items-center">{'});'} <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-3.5 bg-blue-400 ml-1 inline-block" /></p>
                </div>
              </div>
            </div>
          </div>
          
        </motion.div>

      </div>
    </section>
  );
}
