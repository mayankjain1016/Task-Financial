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
          <div className="relative md:col-span-2 h-[280px] rounded-3xl bg-white border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-8 flex flex-col justify-between group/card transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
            <div 
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59,130,246,0.06), transparent 40%)`
              }}
            />
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">Total Capital</p>
                <h3 className="text-4xl font-semibold text-slate-900 tracking-tight">$14,240,000.00</h3>
              </div>
              <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium border border-green-100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> +12.4%
              </div>
            </div>
            {/* Minimalist Chart Mockup */}
            <div className="relative z-10 w-full h-24 flex items-end gap-2 mt-4">
              {[40, 30, 50, 45, 70, 65, 80, 95, 85, 100].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 + (i * 0.05) }}
                  className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm opacity-90 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Card 2: Recent Activity */}
          <div className="relative md:col-span-1 h-[280px] rounded-3xl bg-white border border-black/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-8 flex flex-col justify-between group/card transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
             <div 
              className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x - 666}px ${mousePosition.y}px, rgba(59,130,246,0.06), transparent 40%)` // Offset x by preceding card widths roughly for continuous effect
              }}
            />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-1">Live Transfers</h4>
              <p className="text-sm text-slate-500 leading-relaxed">Global payouts processing seamlessly with zero latency.</p>
            </div>
            <div className="relative z-10 w-full flex items-center justify-between py-3 border-t border-black/5 mt-4">
               <span className="text-xs font-medium text-slate-400">Processing</span>
               <span className="text-xs font-semibold text-slate-900">4,092 / sec</span>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
