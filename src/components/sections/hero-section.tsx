"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Activity, Banknote, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FallingText } from "@/components/animations/falling-text";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 40; // Max 20 degrees rotation Y
    const y = (clientY / innerHeight - 0.5) * -40; // Max 20 degrees rotation X
    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateY = useSpring(mouseX, { damping: 30, stiffness: 100, mass: 0.5 });
  const rotateX = useSpring(mouseY, { damping: 30, stiffness: 100, mass: 0.5 });

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-slate-50 pt-20 pb-12 perspective-[2000px]"
    >
      {/* Background - Stripe-style Slanted Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Massive slanted background block */}
        <div className="absolute top-0 left-0 w-[150vw] h-[80vh] bg-white -skew-y-[8deg] origin-top-left shadow-[0_40px_100px_rgba(0,0,0,0.02)] z-0" />
        
        {/* Subtle background grid on the slate-50 area */}
        <div className="absolute inset-0 blueprint-grid opacity-[0.1]" />

        {/* Ambient Glowing Orbs behind the Right Cluster */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 blur-[120px] z-10" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[30%] w-[40vw] h-[40vw] rounded-full bg-cyan-300/20 blur-[100px] z-10" 
        />
      </div>

      <div className="container relative z-20 px-4 md:px-8 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8 pt-8">
        
        {/* LEFT COLUMN: Clean, Massive Typography */}
        <div className="flex-1 flex flex-col items-start text-left max-w-xl z-30">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 shadow-sm border border-blue-100 text-[10px] font-black tracking-widest text-blue-600 mb-8 uppercase"
          >
            <Sparkles className="w-3 h-3 text-blue-500" /> Premium Financial Infrastructure
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-heading font-black text-slate-900 tracking-tighter leading-[1.05] mb-6 flex flex-col">
            <div className="overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="inline-block"
              >
                Banking,
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 pb-2"
              >
                Redefined.
              </motion.span>
            </div>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-10"
          >
            Access exclusive lending products, manage your wealth, and scale your business with absolute precision. Built for the modern enterprise.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex gap-4 w-full sm:w-auto"
          >
            <Link href="/apply">
              <Button size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base font-bold shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all hover:scale-105 hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] relative overflow-hidden group">
                <span className="relative z-10 flex items-center">Start Building <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[150%] skew-x-12 animate-[sweep_3s_ease-in-out_infinite] z-0 pointer-events-none" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-14 px-8 bg-white hover:bg-slate-50 text-slate-700 border-slate-200 rounded-full text-base font-bold transition-all shadow-sm">
                Contact Sales
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: The Floating 3D Cluster */}
        <div className="flex-1 relative w-full h-[600px] flex items-center justify-center transform-style-3d z-30">
          
          <motion.div 
            style={{ rotateX, rotateY }}
            className="relative w-full h-full flex items-center justify-center transform-style-3d"
          >
            {/* 1. Main Dashboard Mockup (Tilted in 3D) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="absolute z-20 w-[400px] h-[550px] bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_30px_100px_rgba(15,23,42,0.1)] overflow-hidden flex flex-col transform rotate-y-[-10deg] rotate-x-[5deg]"
            >
              <div className="w-full h-12 bg-slate-50/50 border-b border-slate-100 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="w-full flex justify-between items-center mb-2">
                  <div className="w-24 h-4 bg-slate-200 rounded" />
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Activity className="w-4 h-4" /></div>
                </div>
                <div className="w-48 h-10 bg-slate-100 rounded-lg mb-4" />
                <div className="flex gap-4 h-32">
                  <div className="flex-1 bg-blue-50 rounded-xl" />
                  <div className="flex-1 bg-indigo-50 rounded-xl" />
                </div>
                <div className="flex-1 bg-slate-50 rounded-xl mt-2 border border-slate-100 overflow-hidden flex items-end px-4 gap-2 pb-2">
                  {/* Fake Bar Chart */}
                  {[40, 70, 45, 90, 65, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.8 + (i * 0.1), duration: 0.8 }}
                      className="flex-1 bg-blue-500 rounded-t-md"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 2. Floating Total Balance Card (Popping out) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0, y: [-10, 10, -10] }}
              transition={{ opacity: { duration: 0.8, delay: 0.6 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute z-30 -left-12 top-[20%] bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.3)] border border-slate-700 w-64 transform translate-z-[50px]"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-blue-400" />
                </div>
                <Sparkles className="w-4 h-4 text-slate-500" />
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Total Balance</p>
              <h3 className="text-3xl font-black text-white tracking-tight">₹45.2M</h3>
            </motion.div>

            {/* 3. Floating Physics Sandbox (Popping out on right) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, y: [10, -10, 10] }}
              transition={{ opacity: { duration: 0.8, delay: 0.8 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
              className="absolute z-40 -right-8 bottom-[15%] bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_20px_60px_rgba(37,99,235,0.15)] border border-white w-80 transform translate-z-[80px]"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Assets</p>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              {/* Mini Interactive Sandbox */}
              <div className="w-full h-40 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative shadow-inner group">
                <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <p className="text-[9px] text-blue-600 font-bold tracking-widest uppercase bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border border-blue-100 text-center leading-relaxed">Move mouse to pull.<br/>Click to Explode!</p>
                </div>
                <FallingText 
                  text="🍎Apple 🟩NVDA ₿BTC 💰Gold 💵Cash 📜Bonds 🚀Scale"
                  highlightWords={["🍎Apple", "🟩NVDA", "₿BTC"]}
                  gravity={0.5}
                  fontSize="0.85rem"
                  trigger="auto"
                  backgroundColor="transparent"
                  itemClass="bg-white text-slate-700 border-slate-200 shadow-sm hover:scale-110 hover:z-50 transition-transform cursor-pointer font-bold px-3 py-1.5"
                  highlightClass="!bg-blue-600 !border-blue-500 !text-white !shadow-[0_8px_20px_rgba(37,99,235,0.4)]"
                />
              </div>
            </motion.div>

            {/* 4. Floating Security Badge (Behind) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }}
              transition={{ opacity: { duration: 0.6, delay: 1 }, y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute z-10 right-4 top-[10%] bg-blue-100/50 backdrop-blur-md p-3 rounded-full border border-blue-200 shadow-xl transform translate-z-[-30px]"
            >
              <ShieldCheck className="w-8 h-8 text-blue-600" />
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
