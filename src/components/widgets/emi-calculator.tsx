"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

interface EMICalculatorProps {
  defaultAmount?: number;
  defaultTenure?: number;
  defaultRate?: number;
  minAmount?: number;
  maxAmount?: number;
  minTenure?: number;
  maxTenure?: number;
}

export function EMICalculator({
  defaultAmount = 500000,
  defaultTenure = 36,
  defaultRate = 10.5,
  minAmount = 10000,
  maxAmount = 5000000,
  minTenure = 6,
  maxTenure = 84,
}: EMICalculatorProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [tenure, setTenure] = useState(defaultTenure);
  const [rate, setRate] = useState(defaultRate);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const { emi, totalInterest, totalPayment, principalPercent } = useMemo(() => {
    const P = amount || 0;
    const R = (rate || 0) / 12 / 100;
    const N = tenure || 0;

    if (P <= 0 || R <= 0 || N <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0, principalPercent: 100 };
    }

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPaymentValue = emiValue * N;
    const totalInterestValue = totalPaymentValue - P;
    const principalPct = (P / totalPaymentValue) * 100;

    return {
      emi: emiValue,
      totalInterest: totalInterestValue,
      totalPayment: totalPaymentValue,
      principalPercent: principalPct,
    };
  }, [amount, tenure, rate]);

  // Circumference for the SVG circle (r=40 -> 2 * PI * 40 ~= 251.2)
  const circleCircumference = 251.2;
  const strokeDashoffset = circleCircumference - (circleCircumference * principalPercent) / 100;

  // Clamp helper for sliders to prevent Radix UI crash
  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

  return (
    <div className="w-full max-w-4xl mx-auto relative group">
      {/* Soft background glow matching the light theme */}
      <div className="absolute -inset-2 bg-primary/5 rounded-[2.5rem] blur-xl opacity-50 transition-opacity duration-700" />
      
      <div className="relative bg-card rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-border/50 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Sliders */}
        <div className="md:w-3/5 p-6 md:p-10 border-b md:border-b-0 md:border-r border-border/50 relative bg-white/50 backdrop-blur-sm">
          <div className="relative z-10 flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-sm">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold font-heading text-foreground">Interactive Planner</h3>
          </div>

          <div className="relative z-10 space-y-8">
            {/* Amount */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Principal</span>
                <div className="flex items-center text-foreground group">
                  <span className="text-muted-foreground/60 text-xl font-light mr-1">₹</span>
                  <Input
                    type="number"
                    value={amount || ""}
                    onChange={(e) => setAmount(e.target.value === "" ? 0 : Number(e.target.value))}
                    className="w-32 text-right font-bold text-2xl md:text-3xl bg-transparent border-none p-0 focus-visible:ring-0 text-foreground shadow-none"
                  />
                </div>
              </div>
              <div className="relative">
                <Slider
                  value={[clamp(amount, minAmount, maxAmount)]}
                  min={minAmount}
                  max={maxAmount}
                  step={10000}
                  onValueChange={(vals) => setAmount(vals[0])}
                  className="py-1 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-sm"
                />
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tenure</span>
                <div className="flex items-baseline text-foreground">
                  <Input
                    type="number"
                    value={tenure || ""}
                    onChange={(e) => setTenure(e.target.value === "" ? 0 : Number(e.target.value))}
                    className="w-16 text-right font-bold text-2xl md:text-3xl bg-transparent border-none p-0 focus-visible:ring-0 text-foreground mr-1 shadow-none"
                  />
                  <span className="text-muted-foreground font-medium text-lg">mo</span>
                </div>
              </div>
              <Slider
                value={[clamp(tenure, minTenure, maxTenure)]}
                min={minTenure}
                max={maxTenure}
                step={1}
                onValueChange={(vals) => setTenure(vals[0])}
                className="py-1 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-sm"
              />
            </div>

            {/* Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Rate (p.a.)</span>
                <div className="flex items-baseline text-foreground">
                  <Input
                    type="number"
                    value={rate || ""}
                    onChange={(e) => setRate(e.target.value === "" ? 0 : Number(e.target.value))}
                    step={0.1}
                    className="w-20 text-right font-bold text-2xl md:text-3xl bg-transparent border-none p-0 focus-visible:ring-0 text-foreground mr-1 shadow-none"
                  />
                  <span className="text-muted-foreground font-medium text-lg">%</span>
                </div>
              </div>
              <Slider
                value={[clamp(rate, 5, 36)]}
                min={5}
                max={36}
                step={0.1}
                onValueChange={(vals) => setRate(vals[0])}
                className="py-1 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Results & Magic */}
        <div className="md:w-2/5 bg-primary/[0.02] p-6 md:p-10 flex flex-col justify-between relative">
          
          <div>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-4">
                Secure Calculation
              </div>
              <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold mb-1">Est. Monthly EMI</p>
              <div className="text-4xl md:text-5xl font-extrabold tracking-tighter text-primary">
                <span className="text-2xl text-primary/50 font-light mr-1">₹</span>
                {emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>

            {/* Elegant Circular Data Ring */}
            <div className="relative w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                {/* Background ring (Interest) */}
                <circle
                  cx="50" cy="50" r="40"
                  className="stroke-primary/10"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Foreground ring (Principal) */}
                <circle
                  cx="50" cy="50" r="40"
                  className="stroke-primary transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Inner Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20">
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5">Principal</span>
                <span className="text-xl font-extrabold text-foreground">{Math.round(principalPercent)}%</span>
              </div>
            </div>

            {/* Legend / Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-white border border-border/50 shadow-sm text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Principal</span>
                </div>
                <div className="font-bold text-foreground text-sm">{formatCurrency(amount || 0)}</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-border/50 shadow-sm text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-primary/20" />
                  <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Interest</span>
                </div>
                <div className="font-bold text-foreground text-sm">{formatCurrency(totalInterest)}</div>
              </div>
            </div>

            <div className="flex justify-between items-center py-3 border-t border-border/60">
              <span className="text-muted-foreground font-bold text-xs uppercase tracking-wider">Total Payable</span>
              <span className="text-lg font-extrabold tracking-tight text-foreground">{formatCurrency(totalPayment)}</span>
            </div>
          </div>

          <div className="mt-6">
            <Link href="/apply">
              <Button className="w-full h-12 rounded-xl text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                Apply With This Plan <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
