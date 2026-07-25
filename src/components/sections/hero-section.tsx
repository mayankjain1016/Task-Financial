"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D Parallax Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map mouse position to rotation angles (subtle tilting)
  const rotateX = useTransform(mouseY, [-500, 500], [15, -15]);
  const rotateY = useTransform(mouseX, [-500, 500], [-15, 15]);

  // Smooth the rotations for a premium, heavy feel
  const smoothRotateX = useSpring(rotateX, { stiffness: 40, damping: 15 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 40, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505] selection:bg-blue-500/30 perspective-[2000px]"
    >
      {/* Background Deep Space */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* TOP: Ultra-Refined Typography (Anchored, not moving) */}
      <div className="absolute top-32 flex flex-col items-center w-full z-30 px-4 text-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[11px] font-medium tracking-widest text-slate-300 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Orbital Architecture
        </motion.div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1] max-w-4xl drop-shadow-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="block"
          >
            Banking,
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-600"
          >
            Perfected.
          </motion.span>
        </h1>
      </div>

      {/* 3D ORBITAL SYSTEM */}
      <motion.div 
        style={{ 
          rotateX: smoothRotateX, 
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full max-w-[1000px] h-[600px] mt-24 flex items-center justify-center pointer-events-none"
      >
        
        {/* THE CORE (Center Engine) */}
        <div className="absolute z-10 w-48 h-48 flex items-center justify-center" style={{ transform: "translateZ(0px)" }}>
           <div className="absolute inset-0 bg-blue-500 rounded-full blur-[80px] opacity-40 animate-pulse" />
           <div className="absolute inset-4 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full blur-[20px] opacity-60" />
           <div className="relative w-24 h-24 rounded-full bg-black border border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.5)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_3s_infinite_linear]" />
              <Activity className="w-8 h-8 text-cyan-400 opacity-80" />
           </div>
        </div>

        {/* ORBITAL PANEL 1: Total Capital (Foreground Left) */}
        <div 
          className="absolute left-[10%] top-[20%] w-72 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-2xl pointer-events-auto"
          style={{ transform: "translateZ(150px)" }}
        >
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1">Total Capital</p>
          <h3 className="text-3xl font-semibold text-white tracking-tight mb-4">$14,240,000.00</h3>
          {/* Animated SVG Line Chart */}
          <div className="w-full h-16">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="orbChartGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(34, 211, 238, 0.4)" />
                  <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                d="M0,30 L0,20 Q10,10 20,25 T40,15 T60,20 T80,5 T100,10 L100,30 Z" fill="url(#orbChartGrad)"
              />
              <motion.path
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                d="M0,20 Q10,10 20,25 T40,15 T60,20 T80,5 T100,10" fill="none" stroke="#22d3ee" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        {/* ORBITAL PANEL 2: Live Transfers (Background Right) */}
        <div 
          className="absolute right-[15%] top-[15%] w-64 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-2xl pointer-events-auto"
          style={{ transform: "translateZ(-100px)" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-blue-500 rounded-lg opacity-30 animate-ping" />
              <div className="relative w-full h-full rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Live Transfers</h4>
              <p className="text-[10px] text-slate-400">Processing globally.</p>
            </div>
          </div>
          <div className="w-full flex justify-between items-end border-t border-white/10 pt-3">
             <span className="text-[10px] text-slate-500 uppercase tracking-widest">Rate</span>
             <span className="text-sm font-mono text-cyan-300">4,092 / sec</span>
          </div>
        </div>

        {/* ORBITAL PANEL 3: Infrastructure (Midground Bottom Left) */}
        <div 
          className="absolute left-[20%] bottom-[15%] w-60 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 shadow-2xl pointer-events-auto"
          style={{ transform: "translateZ(50px)" }}
        >
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mb-1">Infrastructure</p>
          <h4 className="text-2xl font-semibold text-white mb-3">99.999%</h4>
          <div className="w-full h-4 flex items-center gap-1">
             {[1,2,3,4,5].map((i) => (
                <div key={i} className="flex-1 h-1 rounded-full bg-slate-700 overflow-hidden relative">
                   <div className={`absolute inset-y-0 left-0 bg-cyan-400 ${i === 3 ? 'w-full' : i === 5 ? 'w-1/2' : 'w-full'}`} />
                </div>
             ))}
          </div>
        </div>

        {/* ORBITAL PANEL 4: API Code (Foreground Bottom Right) */}
        <div 
          className="absolute right-[5%] bottom-[10%] w-80 rounded-2xl bg-[#050505]/80 backdrop-blur-2xl border border-white/10 p-5 shadow-2xl pointer-events-auto"
          style={{ transform: "translateZ(200px)" }}
        >
           <div className="flex gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
           </div>
           <div className="font-mono text-[10px] text-slate-300 space-y-1.5">
              <p><span className="text-pink-400">import</span> {'{ TaskFinance }'} <span className="text-pink-400">from</span> <span className="text-emerald-300">'@task/sdk'</span>;</p>
              <p className="mt-3"><span className="text-pink-400">const</span> <span className="text-blue-300">client</span> = <span className="text-pink-400">new</span> <span className="text-amber-200">TaskFinance</span>({'{'}</p>
              <p className="pl-4"><span className="text-sky-300">apiKey</span>: process.env.TASK_KEY,</p>
              <p className="flex items-center">{'});'} <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-3.5 bg-blue-400 ml-1 inline-block" /></p>
           </div>
        </div>

      </motion.div>

      {/* CTA Buttons (Anchored bottom) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 flex gap-4 z-30 pointer-events-auto"
      >
        <Link href="/apply">
          <Button size="lg" className="h-12 px-8 bg-white hover:bg-slate-200 text-black rounded-full text-sm font-semibold transition-all">
            Start Building <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </motion.div>

    </section>
  );
}
