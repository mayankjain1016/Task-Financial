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


      </div>
    </section>
  );
}
