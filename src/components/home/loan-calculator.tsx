"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronDown, ChevronUp, ArrowRight, Info, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { cn } from "@/lib/utils";

type LoanType = "Personal Loan" | "Group Loan" | "Gold Loan" | "Business Loan";

const loanConfigs: Record<LoanType, { minAmount: number; maxAmount: number; defaultRate: number; minRate: number; maxRate: number, defaultAmount: number }> = {
  "Personal Loan": { minAmount: 50000, maxAmount: 4000000, defaultRate: 14.5, minRate: 10.5, maxRate: 24, defaultAmount: 500000 },
  "Group Loan": { minAmount: 10000, maxAmount: 500000, defaultRate: 18, minRate: 18, maxRate: 26, defaultAmount: 100000 },
  "Gold Loan": { minAmount: 10000, maxAmount: 10000000, defaultRate: 9.5, minRate: 9, maxRate: 15, defaultAmount: 200000 },
  "Business Loan": { minAmount: 100000, maxAmount: 100000000, defaultRate: 15, minRate: 12, maxRate: 22, defaultAmount: 1000000 },
};

function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const motionValue = useMotionValue(value);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 400,
  });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  const display = useTransform(springValue, (current) => 
    `${prefix}${Math.round(current).toLocaleString('en-IN')}`
  );

  return <motion.span>{display}</motion.span>;
}

export function LoanCalculatorSection() {
  const [loanType, setLoanType] = useState<LoanType>("Personal Loan");
  const config = loanConfigs[loanType];

  const [amount, setAmount] = useState(config.defaultAmount);
  const [tenureMonths, setTenureMonths] = useState(36);
  const [rate, setRate] = useState(config.defaultRate);
  
  const [showAmortization, setShowAmortization] = useState(false);

  // Sync state when loan type changes
  useEffect(() => {
    setRate(loanConfigs[loanType].defaultRate);
    setAmount((prev) => {
      const min = loanConfigs[loanType].minAmount;
      const max = loanConfigs[loanType].maxAmount;
      if (prev < min) return min;
      if (prev > max) return max;
      return prev;
    });
  }, [loanType]);

  // Calculations
  const emi = useMemo(() => {
    const P = amount;
    const R = rate / 12 / 100;
    const N = tenureMonths;
    if (P === 0 || N === 0) return 0;
    if (R === 0) return P / N;
    return (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  }, [amount, rate, tenureMonths]);

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - amount;

  const chartData = [
    { name: 'Principal', value: amount, color: 'hsl(var(--primary))' },
    { name: 'Interest', value: totalInterest, color: 'hsl(var(--muted-foreground) / 0.3)' }
  ];

  // Amortization Schedule
  const yearlySchedule = useMemo(() => {
     let balance = amount;
     const schedule = [];
     const R = rate / 12 / 100;
     
     let currentYear = 1;
     let yearPrincipal = 0;
     let yearInterest = 0;

     for (let month = 1; month <= tenureMonths; month++) {
       const interestForMonth = balance * R;
       const principalForMonth = emi - interestForMonth;
       
       yearInterest += interestForMonth;
       yearPrincipal += principalForMonth;
       balance -= principalForMonth;

       if (month % 12 === 0 || month === tenureMonths) {
         schedule.push({
           year: currentYear,
           principal: yearPrincipal,
           interest: yearInterest,
           balance: Math.max(0, balance)
         });
         currentYear++;
         yearPrincipal = 0;
         yearInterest = 0;
       }
     }
     return schedule;
  }, [amount, rate, tenureMonths, emi]);

  const formatRupee = (val: number) => `₹${Math.round(val).toLocaleString('en-IN')}`;

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-3 text-[10px] font-semibold tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            Interactive Tool
          </div>
          <h2 className="text-2xl md:text-4xl font-bold font-heading text-foreground mb-3 tracking-tight">
            Calculate Your EMI
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Design your perfect loan with our precision calculator.
          </p>
        </div>

        {/* Bento Box Layout - Compact */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 md:gap-5">
            
          {/* Left Side: Inputs (7 cols) */}
          <div className="xl:col-span-7 flex flex-col gap-4 md:gap-5">
            
            {/* Bento Card 1: Loan Type */}
            <div className="bg-card border border-border shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-[20px] p-5 md:p-6">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">Select Product</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {(Object.keys(loanConfigs) as LoanType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setLoanType(type)}
                    className={`relative px-2 py-2.5 text-xs font-semibold rounded-xl transition-all z-10 ${
                      loanType === type ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted'
                    }`}
                  >
                    {loanType === type && (
                      <motion.div
                        layoutId="activeBentoTab"
                        className="absolute inset-0 bg-primary rounded-xl shadow-sm -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {type.replace(' Loan', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Bento Card 2: Sliders */}
            <div className="bg-card border border-border shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-[20px] p-5 md:p-6 space-y-8">
              
              {/* Amount */}
              <div className="group">
                <div className="flex justify-between items-end mb-3">
                  <label className="text-sm font-bold text-foreground">Loan Amount</label>
                  <div className="text-primary font-extrabold text-xl md:text-2xl flex items-baseline bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">
                    <span className="text-primary/60 text-lg mr-1">₹</span>
                    <input 
                      type="text" 
                      value={amount.toLocaleString('en-IN')}
                      onChange={(e) => {
                        let val = Number(e.target.value.replace(/\D/g, ''));
                        if (val > config.maxAmount) val = config.maxAmount;
                        setAmount(val);
                      }}
                      className="bg-transparent outline-none w-28 text-right p-0 border-none focus:ring-0"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min={config.minAmount} max={config.maxAmount} step={5000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary outline-none focus:outline-none focus:ring-0"
                />
                <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mt-2">
                  <span>{formatRupee(config.minAmount)}</span>
                  <span>{formatRupee(config.maxAmount)}</span>
                </div>
              </div>

              {/* Tenure & Rate Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tenure */}
                <div className="group">
                  <div className="flex justify-between items-end mb-3">
                    <label className="text-sm font-bold text-foreground">Tenure</label>
                    <div className="text-foreground font-bold text-lg flex items-baseline">
                      <input 
                        type="number" 
                        value={tenureMonths}
                        onChange={(e) => {
                          let val = Number(e.target.value);
                          if (val > 84) val = 84;
                          if (val < 6) val = 6;
                          setTenureMonths(val);
                        }}
                        className="bg-transparent outline-none w-12 text-right p-0 border-none focus:ring-0"
                      />
                      <span className="text-muted-foreground text-xs ml-1">mo</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min={6} max={84} step={1}
                    value={tenureMonths}
                    onChange={(e) => setTenureMonths(Number(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary outline-none focus:outline-none focus:ring-0"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mt-2">
                    <span>6 mo</span>
                    <span>84 mo</span>
                  </div>
                </div>

                {/* Rate */}
                <div className="group">
                  <div className="flex justify-between items-end mb-3">
                    <label className="text-sm font-bold text-foreground">Interest Rate</label>
                    <div className="text-foreground font-bold text-lg flex items-baseline">
                      <input 
                        type="number" 
                        value={rate}
                        step={0.1}
                        onChange={(e) => {
                          let val = Number(e.target.value);
                          if (val > config.maxRate) val = config.maxRate;
                          if (val < config.minRate) val = config.minRate;
                          setRate(val);
                        }}
                        className="bg-transparent outline-none w-12 text-right p-0 border-none focus:ring-0"
                      />
                      <span className="text-muted-foreground text-xs ml-1">%</span>
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min={config.minRate} max={config.maxRate} step={0.1}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary outline-none focus:outline-none focus:ring-0"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mt-2">
                    <span>{config.minRate}%</span>
                    <span>{config.maxRate}%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Results (5 cols) */}
          <div className="xl:col-span-5 flex flex-col h-full">
            <div className="bg-card border border-border shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-[20px] p-6 flex flex-col h-full relative overflow-hidden">
              
              {/* Subtle Background Accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

              <div className="text-center mb-6 relative z-10">
                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Estimated EMI</div>
                <div className="text-4xl md:text-5xl font-black tracking-tight text-primary flex items-center justify-center">
                  <span className="text-2xl text-primary/50 mr-1.5 font-semibold">₹</span>
                  <AnimatedNumber value={emi} />
                </div>
              </div>

              {/* Chart */}
              <div className="h-[160px] w-full mb-6 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                      isAnimationActive={false} 
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => `₹${Math.round(value).toLocaleString('en-IN')}`}
                      contentStyle={{ borderRadius: '10px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', fontWeight: 600, fontSize: '12px', padding: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center Label for Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Total</span>
                  <span className="text-sm font-bold text-foreground mt-0.5">
                    <AnimatedNumber value={totalPayment} prefix="₹" />
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6 relative z-10">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="text-xs font-semibold text-muted-foreground">Principal amount</span>
                  </div>
                  <span className="text-sm font-bold text-foreground"><AnimatedNumber value={amount} prefix="₹" /></span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="text-xs font-semibold text-muted-foreground">Total interest</span>
                  </div>
                  <span className="text-sm font-bold text-foreground"><AnimatedNumber value={totalInterest} prefix="₹" /></span>
                </div>
              </div>

              <div className="mt-auto space-y-2 relative z-10">
                <Link 
                  href={`/apply?type=${encodeURIComponent(loanType)}&amount=${amount}`}
                  className="w-full py-3.5 bg-primary text-primary-foreground font-bold text-sm rounded-xl shadow-[0_4px_14px_0_rgba(var(--primary),0.39)] hover:shadow-[0_6px_20px_rgba(var(--primary),0.23)] hover:scale-[1.02] transition-all flex items-center justify-center"
                >
                  Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                
                <button 
                  onClick={() => setShowAmortization(!showAmortization)}
                  className="w-full py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5"
                >
                  {showAmortization ? "Hide" : "View"} Repayment Schedule
                  {showAmortization ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          </div>
          
        </div>

        {/* Amortization Dropdown */}
        <AnimatePresence>
          {showAmortization && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-card border border-border shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-[20px] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-semibold border-b border-border">
                      <tr>
                        <th className="px-5 py-3.5">Year</th>
                        <th className="px-5 py-3.5 text-right">Principal</th>
                        <th className="px-5 py-3.5 text-right">Interest</th>
                        <th className="px-5 py-3.5 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {yearlySchedule.map((row) => (
                        <tr key={row.year} className="hover:bg-muted/30 transition-colors">
                          <td className="px-5 py-3.5 font-bold text-foreground">{row.year}</td>
                          <td className="px-5 py-3.5 text-right text-muted-foreground">{formatRupee(row.principal)}</td>
                          <td className="px-5 py-3.5 text-right text-muted-foreground">{formatRupee(row.interest)}</td>
                          <td className="px-5 py-3.5 text-right font-bold text-foreground">{formatRupee(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
