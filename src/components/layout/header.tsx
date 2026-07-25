"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { Building2, Landmark, Users, HandCoins, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const loans = [
  {
    title: "Personal Loan",
    href: "/loans/personal-loan",
    description: "Fast approval, minimal docs, competitive rates for your personal needs.",
    icon: <Users className="w-5 h-5 text-accent" />,
  },
  {
    title: "Group Loan",
    href: "/loans/group-loan",
    description: "Empowering communities with joint liability group loans.",
    icon: <HandCoins className="w-5 h-5 text-accent" />,
  },
  {
    title: "Gold Loan",
    href: "/loans/gold-loan",
    description: "Unlock the value of your gold with secure, low-interest financing.",
    icon: <Landmark className="w-5 h-5 text-accent" />,
  },
  {
    title: "Business Loan",
    href: "/loans/business-loan",
    description: "Fuel your enterprise growth with tailored business credit.",
    icon: <Building2 className="w-5 h-5 text-accent" />,
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = cn(
    "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-7xl rounded-full",
    {
      "top-4 bg-white/90 backdrop-blur-2xl border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-2": isScrolled,
      "top-6 bg-white/40 backdrop-blur-md border border-white/40 shadow-sm py-3": !isScrolled,
    }
  );

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/Logo.png" alt="Task Financial Logo" width={160} height={40} className="object-contain group-hover:scale-105 transition-transform" unoptimized />
          <span className="font-heading text-xl font-black tracking-tight text-slate-900">
            Task Financial
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="bg-transparent hover:bg-white/50 focus:bg-white/50 data-[state=open]:bg-white/50 text-slate-700 font-semibold rounded-full px-4"
                >
                  Products
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white/95 backdrop-blur-xl border-slate-100 rounded-3xl shadow-2xl">
                    {loans.map((loan) => (
                      <li key={loan.title}>
                          <Link
                            href={loan.href}
                            className="block select-none space-y-1 rounded-2xl p-4 leading-none no-underline outline-none transition-all hover:bg-slate-50 focus:bg-slate-50 group/link border border-transparent hover:border-slate-100"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover/link:bg-white group-hover/link:shadow-sm transition-all">
                                {loan.icon}
                              </div>
                              <div className="text-sm font-bold leading-none text-slate-900">
                                {loan.title}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-xs leading-relaxed text-slate-500 mt-3 font-medium">
                              {loan.description}
                            </p>
                          </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/calculators" className="bg-transparent hover:bg-white/50 text-slate-700 font-semibold rounded-full px-4 py-2 text-sm transition-colors">
                  Calculators
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" className="bg-transparent hover:bg-white/50 text-slate-700 font-semibold rounded-full px-4 py-2 text-sm transition-colors">
                  About Us
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-3 pl-4 border-l border-slate-300/50">
            <Link href="/login" className="text-sm font-bold text-slate-700 hover:text-slate-900 px-4 transition-colors">
              Log in
            </Link>
            <Link href="/apply" className={buttonVariants({ size: "default", className: "rounded-full shadow-lg bg-slate-900 text-white hover:bg-slate-800 transition-transform hover:-translate-y-0.5 font-bold px-6" })}>
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden p-2 text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4 text-foreground h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col gap-2">
            <h3 className="font-heading font-semibold text-lg text-muted-foreground uppercase tracking-wider mb-2">Our Loans</h3>
            {loans.map(loan => (
              <Link 
                key={loan.title} 
                href={loan.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {loan.icon}
                <span className="font-medium text-lg">{loan.title}</span>
              </Link>
            ))}
          </div>
          
          <div className="h-px w-full bg-border my-2" />
          
          <Link href="/calculators" className="p-3 text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Calculators</Link>
          <Link href="/about" className="p-3 text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <Link href="/contact" className="p-3 text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link href="/faq" className="p-3 text-lg font-medium" onClick={() => setMobileMenuOpen(false)}>FAQs</Link>
          
          <Link href="/apply" onClick={() => setMobileMenuOpen(false)} className={buttonVariants({ size: "lg", className: "w-full mt-4 rounded-full" })}>
            Apply Now
          </Link>
        </div>
      )}
    </header>
  );
}
