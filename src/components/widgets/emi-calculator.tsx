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
    const P = amount;
    const R = rate / 12 / 100;
    const N = tenure;

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

  return (
    <div className="w-full max-w-6xl mx-auto relative group">
      {/* Soft background glow matching the light theme */}
      <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl opacity-50 transition-opacity duration-700" />
      
      <div className="relative bg-card rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-border/60 overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side: Sliders */}
        <div className="lg:w-7/12 p-8 md:p-14 border-b lg:border-b-0 lg:border-r border-border/60 relative bg-white/50 backdrop-blur-sm">
          <div className="relative z-10 flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-sm">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-foreground">Interactive Planner</h3>
          </div>

          <div className="relative z-10 space-y-12">
            {/* Amount */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Principal</span>
                <div className="flex items-center text-foreground group">
                  <span className="text-muted-foreground/60 text-2xl font-light mr-1">₹</span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-36 text-right font-bold text-3xl md:text-4xl bg-transparent border-none p-0 focus-visible:ring-0 text-foreground shadow-none"
                  />
                </div>
              </div>
              <div className="relative">
                <Slider
                  value={[amount]}
                  min={minAmount}
                  max={maxAmount}
                  step={10000}
                  onValueChange={(vals) => setAmount(vals[0])}
                  className="py-1 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                />
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Tenure</span>
                <div className="flex items-baseline text-foreground">
                  <Input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-20 text-right font-bold text-3xl md:text-4xl bg-transparent border-none p-0 focus-visible:ring-0 text-foreground mr-2 shadow-none"
                  />
                  <span className="text-muted-foreground font-medium text-xl">mo</span>
                </div>
              </div>
              <Slider
                value={[tenure]}
                min={minTenure}
                max={maxTenure}
                step={1}
                onValueChange={(vals) => setTenure(vals[0])}
                className="py-1 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-[0_0_10px_rgba(0,0,0,0.1)]"
              />
            </div>

            {/* Rate */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Rate (p.a.)</span>
                <div className="flex items-baseline text-foreground">
                  <Input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    step={0.1}
                    className="w-24 text-right font-bold text-3xl md:text-4xl bg-transparent border-none p-0 focus-visible:ring-0 text-foreground mr-1 shadow-none"
                  />
                  <span className="text-muted-foreground font-medium text-xl">%</span>
                </div>
              </div>
              <Slider
                value={[rate]}
                min={5}
                max={36}
                step={0.1}
                onValueChange={(vals) => setRate(vals[0])}
                className="py-1 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-[0_0_10px_rgba(0,0,0,0.1)]"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Results & Magic */}
        <div className="lg:w-5/12 bg-primary/[0.02] p-8 md:p-14 flex flex-col justify-between relative">
          
          <div>
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                Secure Calculation
              </div>
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold mb-2">Est. Monthly EMI</p>
              <div className="text-5xl md:text-6xl font-extrabold tracking-tighter text-primary">
                <span className="text-3xl text-primary/50 font-light mr-1">₹</span>
                {emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>

            {/* Elegant Circular Data Ring */}
            <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center">
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
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-0.5">Principal</span>
                <span className="text-2xl font-extrabold text-foreground">{Math.round(principalPercent)}%</span>
              </div>
            </div>

            {/* Legend / Breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-white border border-border/50 shadow-sm text-center transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Principal</span>
                </div>
                <div className="font-bold text-foreground text-lg">{formatCurrency(amount)}</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-border/50 shadow-sm text-center transition-transform hover:-translate-y-1 duration-300">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/20" />
                  <span className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Interest</span>
                </div>
                <div className="font-bold text-foreground text-lg">{formatCurrency(totalInterest)}</div>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-border/60">
              <span className="text-muted-foreground font-bold text-sm uppercase tracking-wider">Total Payable</span>
              <span className="text-2xl font-extrabold tracking-tight text-foreground">{formatCurrency(totalPayment)}</span>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/apply">
              <Button className="w-full h-14 rounded-2xl text-base font-bold tracking-wide shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                Apply With This Plan <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
