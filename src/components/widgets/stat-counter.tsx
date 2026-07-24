"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface StatCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function StatCounter({ value, label, prefix = "", suffix = "" }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        // Find the span inside the ref
        const span = ref.current.querySelector(".counter-val");
        if (span) {
          span.textContent = Math.floor(latest).toLocaleString("en-IN");
        }
      }
    });
  }, [springValue]);

  return (
    <div className="flex flex-col items-center text-center p-6 border rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow">
      <div ref={ref} className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2 flex items-center justify-center">
        {prefix && <span>{prefix}</span>}
        <span className="counter-val">0</span>
        {suffix && <span>{suffix}</span>}
      </div>
      <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{label}</p>
    </div>
  );
}
