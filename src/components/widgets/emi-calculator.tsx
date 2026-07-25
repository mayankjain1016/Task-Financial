"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

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

  const { emi, totalInterest, totalPayment, principalPercent, interestPercent } = useMemo(() => {
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
    <div className="w-full max-w-5xl mx-auto bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden relative">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600" />
      
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Left Side - Inputs (Spans 3 cols) */}
        <div className="p-8 md:p-12 lg:col-span-3 space-y-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Configure Loan</h3>
          </div>

          {/* Amount Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-end mb-2">
              <Label className="text-sm font-semibold text-slate-600">Loan Amount</Label>
              <div className="flex items-center">
                <span className="text-slate-400 text-lg mr-1 font-medium">₹</span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-32 h-10 text-right font-bold text-xl text-slate-900 border-none bg-slate-50 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-lg"
                />
              </div>
            </div>
            <Slider
              value={[amount]}
              min={minAmount}
              max={maxAmount}
              step={10000}
              onValueChange={(vals) => setAmount(vals[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs font-medium text-slate-400 mt-1">
              <span>{formatCurrency(minAmount)}</span>
              <span>{formatCurrency(maxAmount)}</span>
            </div>
          </div>

          {/* Tenure Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-end mb-2">
              <Label className="text-sm font-semibold text-slate-600">Tenure</Label>
              <div className="flex items-center">
                <Input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-20 h-10 text-right font-bold text-xl text-slate-900 border-none bg-slate-50 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-lg mr-2"
                />
                <span className="text-slate-400 font-medium">Months</span>
              </div>
            </div>
            <Slider
              value={[tenure]}
              min={minTenure}
              max={maxTenure}
              step={1}
              onValueChange={(vals) => setTenure(vals[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs font-medium text-slate-400 mt-1">
              <span>{minTenure} Months</span>
              <span>{maxTenure} Months</span>
            </div>
          </div>

          {/* Rate Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-end mb-2">
              <Label className="text-sm font-semibold text-slate-600">Interest Rate</Label>
              <div className="flex items-center">
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  step={0.1}
                  className="w-24 h-10 text-right font-bold text-xl text-slate-900 border-none bg-slate-50 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-lg mr-1"
                />
                <span className="text-slate-400 font-medium">% p.a.</span>
              </div>
            </div>
            <Slider
              value={[rate]}
              min={5}
              max={36}
              step={0.1}
              onValueChange={(vals) => setRate(vals[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs font-medium text-slate-400 mt-1">
              <span>5%</span>
              <span>36%</span>
            </div>
          </div>
        </div>

        {/* Right Side - Results (Spans 2 cols) */}
        <div className="lg:col-span-2 bg-slate-50 p-8 md:p-12 flex flex-col justify-between border-l border-slate-100">
          <div>
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Your Monthly EMI</p>
              <div className="text-5xl md:text-6xl font-extrabold tracking-tighter text-slate-900">
                <span className="text-4xl text-slate-400 font-medium mr-1">₹</span>
                {emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
            </div>

            {/* Visual Chart Breakdown */}
            <div className="flex items-center gap-6 mb-8 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <div 
                className="w-20 h-20 rounded-full shrink-0 relative"
                style={{
                  background: `conic-gradient(#3b82f6 ${principalPercent}%, #93c5fd ${principalPercent}% 100%)`
                }}
              >
                {/* Inner circle for doughnut effect */}
                <div className="absolute inset-2 bg-white rounded-full shadow-inner" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-slate-600 font-medium">Principal</span>
                  </div>
                  <span className="font-bold text-slate-900">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-300" />
                    <span className="text-slate-600 font-medium">Interest</span>
                  </div>
                  <span className="font-bold text-slate-900">{formatCurrency(totalInterest)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-slate-200/60 mt-4">
              <span className="text-slate-500 font-medium">Total Amount Payable</span>
              <span className="text-xl font-bold text-slate-900">{formatCurrency(totalPayment)}</span>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/apply">
              <Button className="w-full h-14 rounded-xl text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-[0_8px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.3)] transition-all">
                Apply With This Plan <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-[11px] text-center text-slate-400 mt-4 font-medium">
              *Calculations are approximate and for informational purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
