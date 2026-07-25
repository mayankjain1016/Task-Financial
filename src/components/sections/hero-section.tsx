"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Wifi, Activity } from "lucide-react";
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
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white pt-24 pb-12 perspective-[2000px]"
    >
      {/* Complex Liquid Background & Grids */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 blueprint-grid opacity-[0.2]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        
        {/* Dynamic Mesh Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4], x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/15 blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3], x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-cyan-400/15 blur-[140px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[30vw] rounded-full bg-indigo-500/10 blur-[100px]" 
        />
      </div>

      <div className="container relative z-10 px-4 md:px-8 w-full max-w-7xl mx-auto flex flex-col pt-12">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 w-full h-[800px]">
          
          {/* Card 1: Main Typography (Spans 2 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-2 md:row-span-1 rounded-[2.5rem] bg-white/60 backdrop-blur-3xl border border-blue-100 shadow-[0_10px_40px_rgba(37,99,235,0.05)] p-10 flex flex-col justify-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl -mr-20 -mt-20 rounded-full group-hover:scale-150 transition-transform duration-1000" />
            
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 w-max shadow-sm border border-blue-100/50 text-[10px] font-black tracking-[0.2em] text-blue-600 mb-8 uppercase"
            >
              <Sparkles className="w-3 h-3 text-blue-500" /> Task Financial Platform
            </motion.div>

            <h1 className="text-5xl lg:text-[4.5rem] font-heading font-black text-slate-900 tracking-tighter leading-[1] mb-6">
              Banking, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500">
                Redefined.
              </span>
            </h1>

            <p className="text-lg text-slate-600 font-medium max-w-lg leading-relaxed mb-8">
              Access exclusive lending products, manage your wealth, and scale your business with absolute precision.
            </p>

            <div className="flex gap-4">
              <Link href="/apply">
                <Button size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base font-bold shadow-xl shadow-blue-600/30 transition-all hover:scale-105">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="h-14 px-8 bg-white hover:bg-blue-50 text-blue-700 border-blue-200 rounded-full text-base font-bold transition-all shadow-sm">
                  View Products
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Card 2: 3D Holographic Credit Card (Spans 1 column, 2 rows) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:col-span-1 md:row-span-2 rounded-[2.5rem] bg-gradient-to-b from-slate-900 to-blue-950 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.4)] perspective-[1000px]"
          >
            {/* Dark background details */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
            <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-blue-500/20 to-transparent blur-3xl" />
            
            <div className="w-full flex justify-between items-center mb-10 relative z-10">
              <h4 className="font-bold text-white text-lg">Premium Card</h4>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
            </div>

            {/* The 3D Interactive Card */}
            <motion.div 
              style={{ rotateX, rotateY }}
              className="w-full aspect-[2/3] max-w-[280px] rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/20 p-6 flex flex-col justify-between relative transform-style-3d shadow-2xl group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[sweep_2s_ease-in-out_infinite] pointer-events-none rounded-3xl z-40" />
              
              <div className="w-full flex justify-between items-start z-10">
                <div className="w-12 h-8 rounded bg-white/20 backdrop-blur-sm" />
                <Wifi className="w-6 h-6 text-white/50 rotate-90" />
              </div>

              <div className="z-10">
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2">Total Balance</p>
                <h3 className="text-3xl font-black text-white tracking-tighter">₹12,45,000</h3>
              </div>

              <div className="w-full flex justify-between items-end z-10">
                <p className="text-white font-bold tracking-widest">**** **** **** 4092</p>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-red-500/80 mix-blend-screen" />
                  <div className="w-6 h-6 rounded-full bg-yellow-500/80 mix-blend-screen" />
                </div>
              </div>
            </motion.div>

            <p className="text-blue-200/60 text-xs font-semibold mt-10 tracking-widest uppercase relative z-10">Hover to rotate</p>
          </motion.div>

          {/* Card 3: Interactive Physics Sandbox */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="md:col-span-1 md:row-span-1 rounded-[2.5rem] bg-white/60 backdrop-blur-3xl border border-blue-100 shadow-[0_10px_40px_rgba(37,99,235,0.05)] p-8 relative overflow-hidden group"
          >
            <div className="flex justify-between items-center mb-4 relative z-10">
              <h4 className="font-bold text-slate-900">Portfolio Assets</h4>
              <div className="px-3 py-1 rounded bg-blue-50 text-[10px] font-bold text-blue-600 tracking-widest uppercase">Interactive</div>
            </div>
            
            <div className="absolute inset-0 top-16 bottom-4 left-4 right-4 bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden shadow-inner">
              <FallingText 
                text="Apple Tesla NVDA BTC Gold Bonds Cash Scale Growth"
                highlightWords={["Apple", "NVDA", "BTC"]}
                gravity={0.8}
                fontSize="0.75rem"
                trigger="auto"
                backgroundColor="transparent"
                itemClass="bg-white text-slate-700 border-slate-200 shadow-sm"
                highlightClass="!bg-blue-600 !border-blue-600 !text-white !shadow-[0_8px_20px_rgba(37,99,235,0.3)]"
              />
            </div>
          </motion.div>

          {/* Card 4: Animated Live Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="md:col-span-1 md:row-span-1 rounded-[2.5rem] bg-white/60 backdrop-blur-3xl border border-blue-100 shadow-[0_10px_40px_rgba(37,99,235,0.05)] p-8 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-6 z-10">
              <div>
                <h4 className="font-bold text-slate-900">Cash Flow</h4>
                <p className="text-xs text-slate-500 font-semibold tracking-wide">+14% this month</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            <div className="flex-1 flex items-end gap-1.5 z-10 h-full mt-4">
              {Array.from({ length: 18 }).map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${20 + Math.random() * 80}%` }}
                  transition={{ delay: 1 + (i * 0.05), duration: 1.5, type: 'spring', repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }}
                  className={`flex-1 rounded-t-sm ${i % 3 === 0 ? 'bg-blue-600' : 'bg-slate-200'} origin-bottom`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
