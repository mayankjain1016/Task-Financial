"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ShapeGrid from "@/components/ShapeGrid";

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
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAFAFA] pt-24 pb-16 selection:bg-blue-500/30"
    >
      {/* Background - Ultra Clean Light Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ShapeGrid 
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#00000008"
          hoverFillColor="#3b82f610"
          shape="square"
          hoverTrailAmount={0}
        />
        
        {/* Subtle glowing ambient light (Cyan/Blue) at top center */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] rounded-full bg-blue-400/10 blur-[120px] mix-blend-multiply pointer-events-none" />
      </div>

      <div className="container relative z-20 px-4 md:px-8 w-full max-w-[1200px] mx-auto flex flex-col items-center text-center">
        
        {/* TOP: Ultra-Refined Light Typography */}
        <div className="flex flex-col items-center w-full z-30 pt-4 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-xl border border-black/5 text-[11px] font-medium tracking-widest text-slate-600 mb-10 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" /> Task Financial v2.0
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-slate-900 leading-[1.05] mb-6 max-w-4xl drop-shadow-sm">
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
              className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-blue-500"
            >
              for modern scale.
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mb-10"
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
              <Button size="lg" className="h-12 px-8 bg-black hover:bg-slate-800 text-white rounded-full text-sm font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)]">
                Start Building <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="h-12 px-8 bg-white/50 hover:bg-white text-slate-700 border-black/10 rounded-full text-sm font-medium transition-all shadow-sm backdrop-blur-md">
                Read the Docs
              </Button>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
