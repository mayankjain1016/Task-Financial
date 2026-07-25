"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface EMICalculatorProps {
  defaultAmount?: number;
  defaultTenure?: number; // in months
  defaultRate?: number; // annual percentage
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
      return { emi: 0, totalInterest: 0, totalPayment: 0, principalPercent: 100, interestPercent: 0 };
    }

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPaymentValue = emiValue * N;
    const totalInterestValue = totalPaymentValue - P;
    
    const principalPct = (P / totalPaymentValue) * 100;
    const interestPct = (totalInterestValue / totalPaymentValue) * 100;

    return {
      emi: emiValue,
      totalInterest: totalInterestValue,
      totalPayment: totalPaymentValue,
      principalPercent: principalPct,
      interestPercent: interestPct,
    };
  }, [amount, tenure, rate]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] ring-1 ring-slate-100 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Left Side - Inputs (Spans 3 cols) */}
        <div className="p-8 md:p-14 lg:col-span-3 space-y-12">
          
          {/* Amount Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Loan Amount</Label>
              <div className="flex items-center group relative">
                <span className="text-slate-300 text-2xl font-light absolute -left-6 top-1">₹</span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-40 text-right font-semibold text-3xl md:text-4xl text-slate-900 border-none bg-transparent p-0 focus-visible:ring-0 shadow-none"
                />
              </div>
            </div>
            <Slider
              value={[amount]}
              min={minAmount}
              max={maxAmount}
              step={10000}
              onValueChange={(vals) => setAmount(vals[0])}
              className="py-1"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-300">
              <span>{formatCurrency(minAmount)}</span>
              <span>{formatCurrency(maxAmount)}</span>
            </div>
          </div>

          {/* Tenure Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Tenure</Label>
              <div className="flex items-baseline">
                <Input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-20 text-right font-semibold text-3xl md:text-4xl text-slate-900 border-none bg-transparent p-0 focus-visible:ring-0 shadow-none mr-2"
                />
                <span className="text-slate-400 font-medium text-lg">mo</span>
              </div>
            </div>
            <Slider
              value={[tenure]}
              min={minTenure}
              max={maxTenure}
              step={1}
              onValueChange={(vals) => setTenure(vals[0])}
              className="py-1"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-300">
              <span>{minTenure} mo</span>
              <span>{maxTenure} mo</span>
            </div>
          </div>

          {/* Rate Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Interest Rate</Label>
              <div className="flex items-baseline">
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  step={0.1}
                  className="w-24 text-right font-semibold text-3xl md:text-4xl text-slate-900 border-none bg-transparent p-0 focus-visible:ring-0 shadow-none mr-1"
                />
                <span className="text-slate-400 font-medium text-lg">%</span>
              </div>
            </div>
            <Slider
              value={[rate]}
              min={5}
              max={36}
              step={0.1}
              onValueChange={(vals) => setRate(vals[0])}
              className="py-1"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-300">
              <span>5%</span>
              <span>36%</span>
            </div>
          </div>
        </div>

        {/* Right Side - Results (Spans 2 cols) */}
        <div className="lg:col-span-2 bg-slate-50/50 p-8 md:p-14 flex flex-col justify-between border-l border-slate-100">
          <div>
            <div className="mb-12">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Your Monthly EMI</p>
              <div className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900">
                <span className="text-3xl text-slate-300 font-light mr-1">₹</span>
                {emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>

            {/* Sleek Horizontal Bar Chart */}
            <div className="mb-10">
              <div className="flex justify-between text-sm mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                  <span className="text-slate-500 font-medium">Principal</span>
                </div>
                <span className="font-bold text-slate-900">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between text-sm mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-slate-500 font-medium">Interest</span>
                </div>
                <span className="font-bold text-slate-900">{formatCurrency(totalInterest)}</span>
              </div>
              
              {/* The Bar */}
              <div className="w-full h-2.5 bg-blue-500 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-slate-900 rounded-full transition-all duration-500" 
                  style={{ width: `${principalPercent}%` }} 
                />
              </div>
            </div>

            <div className="flex justify-between items-center py-5 border-t border-slate-200 mt-2">
              <span className="text-slate-500 font-semibold text-sm">Total Amount Payable</span>
              <span className="text-2xl font-bold tracking-tight text-slate-900">{formatCurrency(totalPayment)}</span>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/apply">
              <Button className="w-full h-14 rounded-xl text-sm font-bold tracking-wide bg-slate-900 hover:bg-slate-800 text-white transition-all">
                Apply With This Plan <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
