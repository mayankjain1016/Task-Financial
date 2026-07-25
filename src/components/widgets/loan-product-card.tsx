import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LoanProductCardProps {
  title: string;
  description: string;
  rateRange: string;
  icon: React.ReactNode;
  href: string;
}

export function LoanProductCard({ title, description, rateRange, icon, href }: LoanProductCardProps) {
  return (
    <Card className="relative flex flex-col h-full border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden bg-white/70 backdrop-blur-xl rounded-3xl">
      
      {/* Animated Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Top Highlight line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-full transition-all duration-700 opacity-0 group-hover:opacity-100" />

      <CardHeader className="relative z-10 p-8 pb-4">
        <div className="flex justify-between items-start mb-6">
          <div className="w-16 h-16 bg-slate-50 border border-slate-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.03)] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-500">
            {icon}
          </div>
          <div className="bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Top Rated</span>
          </div>
        </div>
        <CardTitle className="font-heading text-3xl text-slate-900 group-hover:text-primary transition-colors duration-300">{title}</CardTitle>
        <CardDescription className="text-sm mt-3 leading-relaxed text-slate-500 font-medium">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 relative z-10 p-8 pt-4">
        <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all duration-500">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">Interest Rate</p>
          <p className="text-2xl font-black text-slate-900 flex items-end gap-1">
            {rateRange} <span className="text-sm font-medium text-slate-500 mb-1">p.a.</span>
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="relative z-10 p-8 pt-0 mt-auto">
        <Link href={href} className={buttonVariants({ variant: "outline", className: "w-full h-14 rounded-full border-slate-200 text-slate-700 font-bold group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group/btn shadow-sm" })}>
          <span className="relative z-10 flex items-center gap-2">
            Explore Product <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-[150%] skew-x-12 -translate-x-[150%] group-hover/btn:animate-[sweep_2s_ease-in-out_infinite] z-0" />
        </Link>
      </CardFooter>
    </Card>
  );
}
