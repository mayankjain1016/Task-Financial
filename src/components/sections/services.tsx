"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollParallax, MouseParallax } from "@/components/animations/parallax";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Personal Loans',
    description: 'Instant liquidity without collateral. Our personal loans are approved within 4 hours with minimal documentation.',
    number: '01'
  },
  {
    title: 'Business Loans',
    description: 'Fuel your enterprise. Get up to ₹50 Lakhs unsecured working capital to scale your operations rapidly.',
    number: '02'
  },
  {
    title: 'Gold Loans',
    description: 'Unlock the value of your gold. Highest per-gram rate with secure vault storage and immediate disbursal.',
    number: '03'
  },
  {
    title: 'Group Loans',
    description: 'Empowering communities. Joint liability group loans designed for micro-entrepreneurs and rural advancement.',
    number: '04'
  }
];

export function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !panelsRef.current) return;

    const panels = gsap.utils.toArray(".service-panel") as HTMLElement[];
    
    const ctx = gsap.context(() => {
      // Create a pinned timeline for overlapping panels
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Scroll for 3 screen heights
          scrub: 1,
          pin: true,
        }
      });

      // Initially hide panels except first
      gsap.set(panels.slice(1), { yPercent: 100, opacity: 0, scale: 0.9, rotationX: 10 });

      panels.forEach((panel: HTMLElement, i) => {
        if (i === 0) return; // Skip first panel as it's already visible
        
        // Animate out previous panel
        tl.to(panels[i - 1], {
          yPercent: -20,
          scale: 0.95,
          opacity: 0.5,
          rotationX: -5,
          ease: "none"
        }, i);

        // Animate in current panel
        tl.to(panel, {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          ease: "power2.out"
        }, i);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-background overflow-hidden flex items-center justify-center border-t border-border">
      
      {/* Background Layer (Parallax) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ScrollParallax speed={0.3} className="w-full h-full">
          <div className="absolute inset-0 blueprint-grid opacity-20"></div>
          {/* Large background typography */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
            <h2 className="text-[25vw] font-black tracking-tighter whitespace-nowrap">PRODUCTS</h2>
          </div>
        </ScrollParallax>
      </div>

      <div className="container relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between gap-12 py-20 mx-auto max-w-7xl px-4">
        
        {/* Left: Static Title */}
        <div className="w-full md:w-1/3 flex flex-col items-start z-20">
          <MouseParallax strength={0.02}>
            <p className="text-xs uppercase tracking-widest font-mono text-primary mb-4">
              [ Loan Offerings ]
            </p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
              Financial <br />
              <span className="text-transparent text-outline hover:text-outline-hover transition-colors duration-500">Products</span>
            </h2>
          </MouseParallax>
        </div>

        {/* Right: Floating Panels Container */}
        <div ref={panelsRef} className="w-full md:w-2/3 h-[60vh] relative perspective-[1000px]">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-panel absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <MouseParallax strength={0.04} className="w-full h-full flex items-center justify-center">
                <div className="glass-panel w-full max-w-lg p-10 md:p-14 rounded-3xl flex flex-col gap-8 shadow-2xl border border-border relative overflow-hidden group bg-card/80">
                  
                  {/* Decorative Blueprint Line inside panel */}
                  <div className="absolute top-0 right-10 w-[1px] h-full bg-primary/20"></div>
                  
                  <div className="text-[8vw] sm:text-[5vw] font-black leading-none text-primary/10 absolute top-4 right-8 select-none pointer-events-none">
                    {service.number}
                  </div>
                  
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 leading-none tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium max-w-sm">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex items-center gap-4 group-hover:gap-6 transition-all duration-300">
                    <div className="w-8 h-[2px] bg-primary"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary cursor-pointer hover:text-foreground transition-colors">
                      Learn More
                    </span>
                  </div>
                </div>
              </MouseParallax>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
