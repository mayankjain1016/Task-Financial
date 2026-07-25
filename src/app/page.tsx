"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Users, HandCoins, Landmark, Building2, CheckCircle2, ChevronRight, FileCheck, Banknote, Clock } from "lucide-react";
import { EMICalculator } from "@/components/widgets/emi-calculator";
import { TrustBadges } from "@/components/widgets/trust-badges";
import { LoanProductCard } from "@/components/widgets/loan-product-card";
import { StatCounter } from "@/components/widgets/stat-counter";
import { TestimonialCarousel } from "@/components/widgets/testimonial-carousel";
import { HeroSection } from "@/components/sections/hero-section";
import { motion } from "framer-motion";

const loanProducts = [
  {
    title: "Personal Loan",
    description: "Fast approval, minimal docs, competitive rates for your personal needs.",
    rateRange: "10.5% - 24% p.a.",
    icon: <Users className="w-6 h-6 text-accent" />,
    href: "/loans/personal-loan",
  },
  {
    title: "Group Loan",
    description: "Empowering communities with joint liability group loans.",
    rateRange: "18% - 26% p.a.",
    icon: <HandCoins className="w-6 h-6 text-accent" />,
    href: "/loans/group-loan",
  },
  {
    title: "Gold Loan",
    description: "Unlock the value of your gold with secure, low-interest financing.",
    rateRange: "9% - 15% p.a.",
    icon: <Landmark className="w-6 h-6 text-accent" />,
    href: "/loans/gold-loan",
  },
  {
    title: "Business Loan",
    description: "Fuel your enterprise growth with tailored business credit.",
    rateRange: "12% - 22% p.a.",
    icon: <Building2 className="w-6 h-6 text-accent" />,
    href: "/loans/business-loan",
  },
];

const faqs = [
  {
    q: "What is the minimum CIBIL score required?",
    a: "We generally require a CIBIL score of 650 or above for unsecured loans. However, gold loans and group loans have more flexible credit score requirements.",
  },
  {
    q: "How long does the loan approval process take?",
    a: "For personal and gold loans, approval is typically given within 4 hours, and disbursal within 24 hours of document verification.",
  },
  {
    q: "Are there any hidden charges?",
    a: "No. Task Financial prides itself on 100% transparency. Our processing fees and foreclosure charges are clearly stated in your loan agreement.",
  },
  {
    q: "Can I prepay or foreclose my loan early?",
    a: "Yes, you can prepay your loan. Foreclosure charges may apply depending on the loan type and tenure completed. Please check the specific loan details for exact percentages.",
  },
];

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      <HeroSection />

      {/* Trust Strip - Overlapping the Hero */}
      <div className="relative z-20 container mx-auto px-4 max-w-6xl -mt-16 mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="bg-card backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-border/50 p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border/50">
            <StatCounter value={50000} label="Customers Served" prefix="+" />
            <StatCounter value={1500} label="Crores Disbursed" prefix="₹" suffix=" Cr+" />
            <StatCounter value={24} label="Hours Disbursal Time" suffix=" Hrs" />
          </div>
        </motion.div>
      </div>

      {/* Loan Products */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 z-0" />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">Enterprise Financial Solutions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tailored credit facilities designed to meet your specific life goals and business requirements with absolute precision.
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loanProducts.map((product, i) => (
              <FadeIn key={product.title} delay={i * 0.1}>
                <div className="group h-full bg-card rounded-2xl border border-border hover:border-accent/50 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {product.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">{product.description}</p>
                  <div className="text-accent font-semibold mb-6 text-sm">{product.rateRange}</div>
                  <Link href={product.href} className="inline-flex items-center text-sm font-medium text-primary hover:text-accent transition-colors">
                    Learn more <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 container mx-auto px-4 md:px-8 max-w-7xl">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">Why Task Financial?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine the trust of traditional banking with the agility of modern fintech.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <TrustBadges />
        </FadeIn>
      </section>

      {/* Rate Comparison Table - Enterprise Style */}
      <section className="py-24 bg-secondary text-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] mix-blend-multiply pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                No hidden fees. What you see is what you pay. Compare our competitive interest rates.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="bg-card backdrop-blur-md rounded-3xl border border-border overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-muted border-b border-border">
                      <th className="p-6 font-semibold tracking-wide text-muted-foreground uppercase text-xs">Loan Type</th>
                      <th className="p-6 font-semibold tracking-wide text-muted-foreground uppercase text-xs">Interest Rate (p.a.)</th>
                      <th className="p-6 font-semibold tracking-wide text-muted-foreground uppercase text-xs">Processing Fee</th>
                      <th className="p-6 font-semibold tracking-wide text-muted-foreground uppercase text-xs">Tenure</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-sm md:text-base">
                    {[
                      { type: "Personal Loan", rate: "10.5% - 24%", fee: "Up to 2.5%", tenure: "12 - 60 Months" },
                      { type: "Group Loan", rate: "18% - 26%", fee: "Up to 2%", tenure: "12 - 24 Months" },
                      { type: "Gold Loan", rate: "9% - 15%", fee: "Zero", tenure: "6 - 36 Months" },
                      { type: "Business Loan", rate: "12% - 22%", fee: "Up to 3%", tenure: "12 - 84 Months" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-muted/50 transition-colors">
                        <td className="p-6 font-medium text-foreground">{row.type}</td>
                        <td className="p-6 text-primary font-bold">{row.rate}</td>
                        <td className="p-6 text-foreground/80">{row.fee}</td>
                        <td className="p-6 text-foreground/80">{row.tenure}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">Calculate Your EMI</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Use our real-time interactive calculator to plan your finances effectively before applying.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <EMICalculator />
          </FadeIn>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our streamlined process ensures you get funds when you need them, without the hassle.
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-[2px] bg-border z-0" />
            
            {[
              { step: 1, title: "Apply Online", desc: "Fill our secure 2-minute application form.", icon: <CheckCircle2 className="w-8 h-8" /> },
              { step: 2, title: "Verify KYC", desc: "Upload documents for instant digital verification.", icon: <FileCheck className="w-8 h-8" /> },
              { step: 3, title: "Get Approved", desc: "Receive immediate approval based on your credit profile.", icon: <Clock className="w-8 h-8" /> },
              { step: 4, title: "Funds Disbursed", desc: "Amount credited directly to your bank account.", icon: <Banknote className="w-8 h-8" /> },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.15}>
                <div className="flex flex-col items-center text-center relative z-10 group">
                  <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center mb-6 shadow-sm group-hover:-translate-y-2 group-hover:border-accent group-hover:shadow-accent/20 transition-all duration-300 text-muted-foreground group-hover:text-accent">
                    {item.icon}
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm mb-4 absolute top-16 right-1/2 translate-x-12 translate-y-2 ring-4 ring-background">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 container mx-auto px-4 md:px-8 max-w-7xl">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">Client Success Stories</h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <TestimonialCarousel />
        </FadeIn>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Accordion className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-lg font-medium hover:text-accent transition-colors text-left py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div className="container mx-auto max-w-4xl text-center px-4 relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight text-primary-foreground">Ready to take the next step?</h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have accelerated their financial journey with us.
            </p>
            <Link href="/apply" className={buttonVariants({ size: "lg", className: "h-14 px-10 text-lg rounded-full bg-background text-foreground hover:bg-background/90 shadow-xl transition-all hover:scale-105" })}>
              Start Your Application <CheckCircle2 className="ml-2 w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
