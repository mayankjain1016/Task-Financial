"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FallingText } from "@/components/animations/falling-text";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Removing mouse tracking state since we no longer have a 3D tilted object
  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] w-full flex flex-col items-center justify-start overflow-hidden bg-white pt-32 perspective-[2000px]"
    >
      {/* Background - Pristine White with Massive Glowing Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        
        {/* Massive Ambient Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vw] rounded-full bg-blue-500/10 blur-[150px] z-10" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2], x: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[30%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-400/10 blur-[150px] z-10" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2], x: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-indigo-500/10 blur-[150px] z-10" 
        />
      </div>

      <div className="container relative z-20 px-4 md:px-8 w-full max-w-[1400px] mx-auto flex flex-col items-center text-center h-full">
        
        {/* TOP: Cinematic Typography Lockup */}
        <div className="flex flex-col items-center max-w-4xl w-full z-30 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/40 backdrop-blur-md shadow-[0_4px_20px_rgba(37,99,235,0.1)] border border-white/60 text-[11px] font-black tracking-[0.3em] text-blue-600 mb-8 uppercase"
          >
            <Sparkles className="w-3 h-3 text-blue-500" /> Introducing Task Financial
          </motion.div>

          <h1 className="text-6xl md:text-[6rem] lg:text-[8rem] font-heading font-black tracking-tighter leading-[0.95] mb-8">
            <motion.span 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block text-slate-900"
            >
              Banking.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 pb-4"
            >
              Perfected.
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mb-12"
          >
            The world's most powerful financial infrastructure. Designed for scale, built for the modern enterprise.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link href="/apply">
              <Button size="lg" className="h-16 px-10 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-lg font-bold shadow-[0_15px_40px_rgba(15,23,42,0.2)] transition-all hover:scale-105 relative overflow-hidden group">
                <span className="relative z-10 flex items-center">Open Account <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-[150%] skew-x-12 animate-[sweep_3s_ease-in-out_infinite] z-0 pointer-events-none" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* BOTTOM: Massive Full-Width Interactive Centerpiece */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="relative w-full max-w-[1200px] h-[450px] mt-24 mb-12 rounded-[3rem] bg-white/40 backdrop-blur-3xl border border-white shadow-[0_30px_100px_rgba(15,23,42,0.05)] overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/60 to-white/10 pointer-events-none z-10" />
          
          <div className="absolute top-8 left-10 right-10 flex justify-between items-center z-20 pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shadow-inner">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Live Asset Engine</h3>
                <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Interactive Sandbox</p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-100 shadow-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Move mouse to pull &bull; Click to explode</span>
            </div>
          </div>

          <div className="absolute inset-0 z-0">
            <FallingText 
              text="🍎Apple 🟩NVDA ₿BTC 💰Gold 💵Cash 📜Bonds 🚀Scale 📈Growth 🏦Bank 💎Asset 📊Data 🌐Web"
              highlightWords={["🍎Apple", "🟩NVDA", "₿BTC", "🚀Scale", "💎Asset"]}
              gravity={0.4}
              fontSize="1.5rem"
              trigger="auto"
              backgroundColor="transparent"
              itemClass="bg-white/90 backdrop-blur-md text-slate-800 border-2 border-white shadow-[0_10px_30px_rgba(15,23,42,0.1)] hover:scale-110 hover:z-50 transition-transform cursor-pointer font-black px-6 py-3 rounded-full"
              highlightClass="!bg-gradient-to-br !from-blue-600 !to-cyan-500 !border-blue-400 !text-white !shadow-[0_15px_40px_rgba(37,99,235,0.5)]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
