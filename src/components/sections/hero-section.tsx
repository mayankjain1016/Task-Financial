"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Subtle mouse tracking for the spotlight effect
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
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#000000] pt-24 pb-16 selection:bg-blue-500/30"
    >
      {/* Background - Deep Technical Dark Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Subtle glowing ambient light (Cyan/Blue) at top center */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="container relative z-20 px-4 md:px-8 w-full max-w-[1200px] mx-auto flex flex-col items-center text-center">
        
        {/* TOP: Ultra-Refined Dark Typography */}
        <div className="flex flex-col items-center w-full z-30 pt-4 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-medium tracking-widest text-slate-300 mb-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" /> Task Financial v2.0
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white leading-[1.05] mb-6 max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block"
            >
              The financial engine
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-blue-400 to-cyan-400"
            >
              for modern scale.
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl mb-10"
          >
            A seamlessly integrated stack designed with absolute precision. Manage capital, issue cards, and scale operations instantly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link href="/apply">
              <Button size="lg" className="h-12 px-8 bg-white hover:bg-slate-200 text-black rounded-full text-sm font-semibold transition-all hover:scale-[1.02]">
                Start Building <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent hover:bg-white/5 text-white border-white/20 rounded-full text-sm font-medium transition-all">
                Read the Docs
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* BOTTOM: Ultra-Premium Dark Mode Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="relative w-full max-w-[1000px] rounded-[32px] bg-[#0A0A0A] border border-white/[0.08] shadow-[0_0_80px_rgba(59,130,246,0.15)] overflow-hidden group/dashboard"
        >
          {/* Dashboard Magic Spotlight */}
          <div 
            className="absolute inset-0 opacity-0 group-hover/dashboard:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
            style={{
              background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.03), transparent 40%)`
            }}
          />

          {/* MacOS Header */}
          <div className="relative z-10 w-full h-14 bg-[#111111] border-b border-white/[0.05] flex items-center px-6 justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
            <div className="text-[10px] font-mono text-slate-500 tracking-wider">
              task-financial/production
            </div>
            <div className="w-16" />
          </div>

          {/* Dashboard Body */}
          <div className="relative z-10 flex flex-col md:flex-row w-full min-h-[320px]">
            
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-[#050505] border-r border-white/[0.05] p-6 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Workspace</p>
                <div className="space-y-1">
                  <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/[0.05] text-sm font-medium text-white flex items-center gap-3">
                    <Activity className="w-4 h-4 text-cyan-400" /> Capital
                  </div>
                  <div className="px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-3 cursor-pointer">
                     <Sparkles className="w-4 h-4" /> Operations
                  </div>
                </div>
              </div>

              {/* Sidebar Mini-Stat */}
              <div className="mt-8 pt-6 border-t border-white/[0.05]">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Network Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                  <span className="text-sm text-slate-300 font-medium">100% Operational</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-[#0A0A0A] flex flex-col justify-between relative">
              {/* Internal glowing blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

              {/* Top Row Data */}
              <div className="relative z-10 flex justify-between items-start mb-4">
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-2">Total Managed Capital</p>
                  <h3 className="text-5xl font-semibold text-white tracking-tight">$14,240,000.00</h3>
                </div>
                <div className="px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full text-xs font-mono border border-green-500/20">
                  +12.4% YTD
                </div>
              </div>

              {/* Glowing Line Chart */}
              <div className="relative z-10 w-full h-24 mb-4">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="darkChartGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
                    d="M0,30 L0,20 Q10,10 20,25 T40,15 T60,20 T80,5 T100,10 L100,30 Z"
                    fill="url(#darkChartGrad)"
                  />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
                    d="M0,20 Q10,10 20,25 T40,15 T60,20 T80,5 T100,10"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                  />
                </svg>
              </div>

              {/* Terminal Snippet Bottom */}
              <div className="relative z-10 w-full bg-[#050505] rounded-xl border border-white/[0.08] p-4 flex items-center justify-between font-mono text-xs shadow-inner">
                 <div className="text-slate-400 flex items-center gap-2">
                    <span className="text-pink-500">npm</span> install @task/sdk
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1.5 text-slate-500">
                     <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Live
                   </div>
                   <div className="text-slate-300">4,092 req/s</div>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
