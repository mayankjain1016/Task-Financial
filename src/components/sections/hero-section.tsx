"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Sparkles, Fingerprint, Banknote, Landmark, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FallingText } from "@/components/animations/falling-text";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // 3D Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30; // Max 15 degrees rotation Y
    const y = (clientY / innerHeight - 0.5) * -30; // Max 15 degrees rotation X
    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateY = useSpring(mouseX, { damping: 30, stiffness: 100, mass: 0.5 });
  const rotateX = useSpring(mouseY, { damping: 30, stiffness: 100, mass: 0.5 });

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden bg-[#030712] pt-28 pb-8"
    >
      {/* Background Ambient Glows & Blueprint Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 blueprint-grid opacity-[0.1]" />
        
        {/* Massive Infinite Background Marquee (Outlined) */}
        <div className="absolute top-1/3 -translate-y-1/2 left-0 w-full flex items-center overflow-hidden select-none z-0 mix-blend-screen">
          <motion.div
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            className="flex whitespace-nowrap min-w-max"
          >
            {[1, 2].map((_, i) => (
              <span key={i} className="text-[15rem] md:text-[25rem] font-heading font-black leading-none text-transparent [-webkit-text-stroke:4px_rgba(255,255,255,0.03)] tracking-tighter uppercase mr-12">
                TASK FINANCIAL • PREMIUM LENDING •
              </span>
            ))}
          </motion.div>
        </div>
        
        {/* Animated Mesh Gradient Orbs - More vibrant for dark mode */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/20 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/20 blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 40, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-purple-600/20 blur-[120px]" 
        />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="container relative z-10 px-4 md:px-8 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-10"
      >
        {/* Left Column: Premium Fintech Copy */}
        <div className="flex-1 flex flex-col items-start text-left z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/20 text-xs font-bold tracking-widest text-white mb-8 uppercase"
          >
            <Sparkles className="w-4 h-4 text-primary" /> Premium Financial Services
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-heading font-black text-white tracking-tighter leading-[1.05] mb-6 flex flex-col">
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
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-indigo-500 pb-2"
              >
                Redefined.
              </motion.span>
            </div>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-300 font-medium max-w-xl leading-relaxed mb-10"
          >
            Access exclusive lending products, manage your wealth, and scale your business with absolute precision. All from your pocket.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link href="/apply" className="w-full sm:w-auto group">
              <Button size="lg" className="relative overflow-hidden w-full h-14 px-8 bg-white hover:bg-slate-200 text-slate-900 rounded-full text-base font-bold shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]">
                <span className="relative z-10 flex items-center">Get Started <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                {/* Shiny Sweep Effect */}
                <motion.div 
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/10 to-transparent w-[150%] skew-x-12 z-0"
                />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto group">
              <Button size="lg" variant="outline" className="w-full h-14 px-8 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white border-white/20 rounded-full text-base font-bold transition-all shadow-sm">
                View Products <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 w-full max-w-lg h-[180px] relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[inset_0_2px_20px_rgba(255,255,255,0.02)] group"
          >
            <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500">
              <p className="text-xs font-bold uppercase tracking-widest text-white bg-black/40 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg">Interact with features</p>
            </div>
            <FallingText 
              text="Fast Secure Premium Wealth Loans Scale Trust Growth 24/7 Smart"
              highlightWords={["Secure", "Premium", "Wealth", "Trust"]}
              gravity={0.8}
              fontSize="0.875rem"
              trigger="auto"
              backgroundColor="transparent"
              highlightClass="!bg-primary/20 !border-primary/50 !text-white"
            />
          </motion.div>
        </div>

        {/* Right Column: Premium iPhone Mockup */}
        <div className="flex-1 relative w-full h-[600px] hidden lg:flex items-center justify-center perspective-[2000px]">
          
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 scale-[0.85] origin-center"
            style={{ rotateX, rotateY }}
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* The iPhone Hardware */}
              <div className="relative w-[320px] h-[650px] bg-slate-900 rounded-[3.5rem] border-[12px] border-slate-800 shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col transform-style-3d">
                
                {/* Realistic Glass Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent w-[200%] -rotate-45 translate-x-[-50%] pointer-events-none z-40" />

                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 flex items-center justify-between px-2">
                  <div className="w-2 h-2 rounded-full bg-green-900 flex items-center justify-center"><div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" /></div>
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                </div>
                
                {/* Screen Content - Dark Mode Financial App */}
                <div className="w-full h-full bg-[#0A0F1C] flex flex-col pt-14 pb-8 px-6 text-white relative">
                  
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />

                  {/* Header */}
                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                        <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Welcome Back</p>
                        <p className="text-sm font-semibold tracking-tight">Jonathan Doe</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-md flex items-center justify-center text-slate-300 border border-slate-700">
                      <Fingerprint className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Total Balance Card */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="w-full bg-gradient-to-br from-primary to-indigo-700 rounded-[2rem] p-6 mb-8 shadow-xl shadow-primary/30 relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full blur-xl -ml-10 -mb-10" />
                    
                    <p className="text-xs text-blue-100 font-semibold mb-1 relative z-10 tracking-wide uppercase">Total Balance</p>
                    <h3 className="text-3xl font-black mb-6 relative z-10 tracking-tight">₹45,23,500</h3>
                    
                    <div className="flex justify-between items-end relative z-10">
                      <div className="flex items-center gap-1.5 text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg backdrop-blur-md">
                        <ArrowRight className="w-3 h-3 -rotate-45" /> +12.5%
                      </div>
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-primary bg-slate-800 flex items-center justify-center overflow-hidden"><img src="https://i.pravatar.cc/100?img=33" alt="U" className="w-full h-full object-cover" /></div>
                        <div className="w-8 h-8 rounded-full border-2 border-primary bg-slate-800 flex items-center justify-center overflow-hidden"><img src="https://i.pravatar.cc/100?img=44" alt="U" className="w-full h-full object-cover" /></div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-4 gap-4 mb-8 relative z-10">
                    {[
                      { icon: <ArrowRight className="w-5 h-5" />, label: "Send" },
                      { icon: <Banknote className="w-5 h-5" />, label: "Add" },
                      { icon: <Landmark className="w-5 h-5" />, label: "Loan" },
                      { icon: <CreditCard className="w-5 h-5" />, label: "Card" },
                    ].map((action, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + (i * 0.1) }}
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-slate-800/80 backdrop-blur-sm flex items-center justify-center text-slate-300 border border-slate-700/50 shadow-inner group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                          {action.icon}
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 tracking-wide group-hover:text-slate-300">{action.label}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Animated Mini Chart */}
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 1.2 }}
                    className="w-full bg-slate-800/50 rounded-2xl p-4 mb-6 border border-slate-700/50 relative z-10"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekly Growth</p>
                      <Sparkles className="w-3 h-3 text-primary" />
                    </div>
                    <div className="flex items-end gap-2 h-12">
                      {[40, 70, 45, 90, 65, 100, 80].map((height, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: 1.5 + (i * 0.1), duration: 0.8, type: "spring" }}
                          className={`flex-1 rounded-t-sm ${i === 5 ? 'bg-primary' : 'bg-slate-600'}`}
                        />
                      ))}
                    </div>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating UI Elements Around the Phone */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-8 top-[30%] bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 z-20 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mb-0.5">Loan Approved</p>
              <p className="text-base font-black text-white tracking-tight">₹25,00,000</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -left-12 bottom-[25%] bg-black/40 backdrop-blur-md p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 z-20 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Secure Connection</p>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-1">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-1/2 h-full bg-primary"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Cinematic Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Scroll to explore</p>
        <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-primary" 
          />
        </div>
      </motion.div>

    </section>
  );
}
