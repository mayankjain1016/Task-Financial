"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "HDFC Bank", sector: "Banking Partner" },
  { name: "ICICI Bank", sector: "Banking Partner" },
  { name: "Axis Bank", sector: "Banking Partner" },
  { name: "Bajaj Finserv", sector: "Lending Partner" },
  { name: "Muthoot Finance", sector: "Gold Loan Partner" },
  { name: "Kotak Mahindra", sector: "Banking Partner" },
  { name: "SBI", sector: "Public Sector Partner" },
  { name: "Paytm", sector: "Digital Partner" }
];

const ClientCard = ({ client }: { client: { name: string; sector: string } }) => (
  <div className="group relative w-[200px] md:w-[280px] h-[150px] md:h-[210px] shrink-0 border border-border flex flex-col items-center justify-center p-6 mx-3 cursor-pointer bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 rounded-xl overflow-hidden">
    {/* Hover Top Line */}
    <div className="absolute top-0 left-0 w-full h-[3px] bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
    
    {/* Content */}
    <span className="text-lg md:text-xl font-black tracking-tight text-foreground/80 group-hover:text-primary transition-colors duration-300 mb-2 text-center">
      {client.name}
    </span>
    <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300 text-center">
      {client.sector}
    </span>
  </div>
);

export function Clients() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Fade in the marquee container
      gsap.fromTo(".marquee-container",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-background relative overflow-hidden border-t border-border">
      
      {/* Soft background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 text-center md:text-left max-w-7xl mx-auto">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">
              Our Network
            </h3>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">Leaders</span>
            </h2>
          </div>
          <p className="text-muted-foreground font-medium text-sm max-w-sm">
            We partner with India's top financial institutions to bring you the best rates and most secure loan products.
          </p>
        </div>
        
        {/* Marquee Showcase */}
        <div className="marquee-container w-full overflow-hidden border-y border-border py-8 flex flex-col gap-6 relative">
          
          {/* Row 1: Scrolling Left */}
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...clients, ...clients].map((client, index) => (
              <ClientCard key={`row1-${index}`} client={client} />
            ))}
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
            {[...[...clients].reverse(), ...[...clients].reverse()].map((client, index) => (
              <ClientCard key={`row2-${index}`} client={client} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
