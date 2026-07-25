"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface EMICalculatorProps {
  defaultAmount?: number;
  defaultTenure?: number; // in months
  defaultRate?: number; // annual percentage
  minAmount?: number;
  maxAmount?: number;
  minTenure?: number;
  maxTenure?: number;
  title?: string;
}

export function EMICalculator({
  defaultAmount = 500000,
  defaultTenure = 36,
  defaultRate = 10.5,
  minAmount = 10000,
  maxAmount = 5000000,
  minTenure = 6,
  maxTenure = 84,
  title = "EMI Calculator",
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

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const P = amount;
    const R = rate / 12 / 100;
    const N = tenure;

    if (P <= 0 || R <= 0 || N <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0 };
    }

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPaymentValue = emiValue * N;
    const totalInterestValue = totalPaymentValue - P;

    return {
      emi: emiValue,
      totalInterest: totalInterestValue,
      totalPayment: totalPaymentValue,
    };
  }, [amount, tenure, rate]);

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl border-border/50 bg-background/50 backdrop-blur-md">
      <CardHeader className="border-b border-border/50 pb-6">
        <CardTitle className="text-2xl font-heading">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Inputs Section */}
          <div className="p-6 md:p-8 space-y-8 border-b md:border-b-0 md:border-r border-border/50">
            {/* Amount */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base text-muted-foreground">Loan Amount</Label>
                <div className="flex items-center gap-2 border rounded-md px-3 py-1 bg-background">
                  <span className="text-muted-foreground">₹</span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="border-0 p-0 h-auto focus-visible:ring-0 w-24 text-right font-medium text-lg"
                  />
                </div>
              </div>
              <Slider
                value={[amount]}
                min={minAmount}
                max={maxAmount}
                step={10000}
                onValueChange={(vals) => setAmount(Array.isArray(vals) ? vals[0] : vals as number)}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(minAmount)}</span>
                <span>{formatCurrency(maxAmount)}</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base text-muted-foreground">Tenure (Months)</Label>
                <div className="flex items-center gap-2 border rounded-md px-3 py-1 bg-background">
                  <Input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="border-0 p-0 h-auto focus-visible:ring-0 w-16 text-right font-medium text-lg"
                  />
                  <span className="text-muted-foreground">Mo</span>
                </div>
              </div>
              <Slider
                value={[tenure]}
                min={minTenure}
                max={maxTenure}
                step={1}
                onValueChange={(vals) => setTenure(Array.isArray(vals) ? vals[0] : vals as number)}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{minTenure} Months</span>
                <span>{maxTenure} Months</span>
              </div>
            </div>

            {/* Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base text-muted-foreground">Interest Rate (p.a.)</Label>
                <div className="flex items-center gap-2 border rounded-md px-3 py-1 bg-background">
                  <Input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    step={0.1}
                    className="border-0 p-0 h-auto focus-visible:ring-0 w-16 text-right font-medium text-lg"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>
              <Slider
                value={[rate]}
                min={5}
                max={36}
                step={0.1}
                onValueChange={(vals) => setRate(Array.isArray(vals) ? vals[0] : vals as number)}
                className="py-4"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="p-6 md:p-8 bg-primary/5 flex flex-col justify-center h-full">
            <div className="space-y-6">
              <div className="text-center p-6 bg-background rounded-xl border shadow-sm">
                <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Your Monthly EMI</p>
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-primary">
                  {formatCurrency(emi)}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Principal Amount</span>
                  <span className="font-medium text-lg">{formatCurrency(amount)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Total Interest</span>
                  <span className="font-medium text-lg text-destructive">{formatCurrency(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="font-medium text-foreground">Total Amount Payable</span>
                  <span className="font-bold text-xl">{formatCurrency(totalPayment)}</span>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/apply" className={buttonVariants({ className: "w-full h-12 text-lg rounded-xl shadow-md transition-transform hover:-translate-y-0.5" })}>
                  Apply for this Loan
                </Link>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  *All calculations are approximate and for informational purposes only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
