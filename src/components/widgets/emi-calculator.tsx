"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Fingerprint, Sparkles } from "lucide-react";

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

  return (
    <div className="w-full max-w-6xl mx-auto relative group">
      {/* Absolute glow behind the widget */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
      
      <div className="relative bg-[#0A0D14] rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Side: Sliders */}
        <div className="lg:w-7/12 p-8 md:p-14 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden">
          {/* Subtle noise/grid in background of dark area */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="relative z-10 flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-medium text-white tracking-wide">Interactive Planner</h3>
          </div>

          <div className="relative z-10 space-y-12">
            {/* Amount */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">Principal</span>
                <div className="flex items-center text-white">
                  <span className="text-slate-500 text-2xl font-light mr-1">₹</span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-36 text-right font-bold text-3xl md:text-4xl bg-transparent border-none p-0 focus-visible:ring-0 text-white"
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
                  className="py-1 [&_[role=slider]]:bg-blue-400 [&_[role=slider]]:border-blue-400 [&_[role=slider]]:shadow-[0_0_15px_rgba(96,165,250,0.5)] [&_.bg-primary]:bg-blue-500"
                />
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">Tenure</span>
                <div className="flex items-baseline text-white">
                  <Input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-20 text-right font-bold text-3xl md:text-4xl bg-transparent border-none p-0 focus-visible:ring-0 text-white mr-2"
                  />
                  <span className="text-slate-500 font-medium text-xl">mo</span>
                </div>
              </div>
              <Slider
                value={[tenure]}
                min={minTenure}
                max={maxTenure}
                step={1}
                onValueChange={(vals) => setTenure(vals[0])}
                className="py-1 [&_[role=slider]]:bg-cyan-400 [&_[role=slider]]:border-cyan-400 [&_[role=slider]]:shadow-[0_0_15px_rgba(34,211,238,0.5)] [&_.bg-primary]:bg-cyan-500"
              />
            </div>

            {/* Rate */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">Rate (p.a.)</span>
                <div className="flex items-baseline text-white">
                  <Input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    step={0.1}
                    className="w-24 text-right font-bold text-3xl md:text-4xl bg-transparent border-none p-0 focus-visible:ring-0 text-white mr-1"
                  />
                  <span className="text-slate-500 font-medium text-xl">%</span>
                </div>
              </div>
              <Slider
                value={[rate]}
                min={5}
                max={36}
                step={0.1}
                onValueChange={(vals) => setRate(vals[0])}
                className="py-1 [&_[role=slider]]:bg-indigo-400 [&_[role=slider]]:border-indigo-400 [&_[role=slider]]:shadow-[0_0_15px_rgba(129,140,248,0.5)] [&_.bg-primary]:bg-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Results & Magic */}
        <div className="lg:w-5/12 bg-gradient-to-b from-[#111622] to-[#0A0D14] p-8 md:p-14 flex flex-col justify-between relative">
          
          <div>
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium mb-6">
                <Fingerprint className="w-3.5 h-3.5 text-blue-400" /> Secure Calculation
              </div>
              <p className="text-slate-400 text-sm uppercase tracking-widest font-semibold mb-2">Est. Monthly EMI</p>
              <div className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(96,165,250,0.3)]">
                <span className="text-3xl text-slate-500 font-light mr-1">₹</span>
                {emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>

            {/* Glowing Data Bar */}
            <div className="mb-10 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
              <div className="flex justify-between text-sm mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  <span className="text-slate-300">Principal</span>
                </div>
                <span className="font-semibold text-white">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between text-sm mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                  <span className="text-slate-300">Interest</span>
                </div>
                <span className="font-semibold text-white">{formatCurrency(totalInterest)}</span>
              </div>
              
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-700 relative" 
                  style={{ width: `${principalPercent}%` }} 
                >
                  <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/50" />
                </div>
                <div className="h-full bg-indigo-500 flex-1 transition-all duration-700" />
              </div>
            </div>

            <div className="flex justify-between items-center py-4">
              <span className="text-slate-400 font-medium">Total Payable</span>
              <span className="text-2xl font-bold tracking-tight text-white">{formatCurrency(totalPayment)}</span>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/apply">
              <Button className="relative w-full h-14 rounded-xl text-base font-bold tracking-wide text-white overflow-hidden group border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-transform duration-300 group-hover:scale-105" />
                <span className="relative flex items-center justify-center">
                  Apply With This Plan <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
