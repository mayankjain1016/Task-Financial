import Link from "next/link";
import Image from "next/image";
import { Landmark, Globe, MessageCircle, Share2, ShieldCheck, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border/10">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Trust */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <Image src="/Logo.png" alt="Task Financial Logo" width={160} height={48} className="object-contain" unoptimized />
              <span className="font-heading text-2xl font-bold tracking-tight">
                Task Financial
              </span>
            </Link>
            <p className="text-primary-foreground/70 leading-relaxed">
              Empowering your financial future with transparent, fast, and secure lending solutions.
            </p>
            <div className="flex items-center gap-3 bg-primary-foreground/10 p-3 rounded-lg w-fit">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">RBI Registered NBFC Partner</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Our Loans</h4>
            <ul className="space-y-4">
              <li><Link href="/loans/personal-loan" className="text-primary-foreground/70 hover:text-accent transition-colors">Personal Loan</Link></li>
              <li><Link href="/loans/group-loan" className="text-primary-foreground/70 hover:text-accent transition-colors">Group Loan</Link></li>
              <li><Link href="/loans/gold-loan" className="text-primary-foreground/70 hover:text-accent transition-colors">Gold Loan</Link></li>
              <li><Link href="/loans/business-loan" className="text-primary-foreground/70 hover:text-accent transition-colors">Business Loan</Link></li>
              <li><Link href="/calculators" className="text-primary-foreground/70 hover:text-accent transition-colors">EMI Calculator</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-primary-foreground/70 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/70 hover:text-accent transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="text-primary-foreground/70 hover:text-accent transition-colors">Help & FAQ</Link></li>
              <li><Link href="/privacy-policy" className="text-primary-foreground/70 hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-primary-foreground/70 hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link href="/grievance-redressal" className="text-primary-foreground/70 hover:text-accent transition-colors">Grievance Redressal</Link></li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Stay Updated</h4>
            <p className="text-primary-foreground/70 mb-4 text-sm">
              Subscribe to our newsletter for the latest financial insights and offers.
            </p>
            <form className="flex flex-col gap-2 mb-8">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-accent"
              />
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Subscribe
              </Button>
            </form>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all"><Globe className="w-4 h-4" /></Link>
              <Link href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all"><MessageCircle className="w-4 h-4" /></Link>
              <Link href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all"><Share2 className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Task Financial Services. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> 1800-123-4567</span>
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@taskfinancial.com</span>
          </div>
        </div>
        <div className="mt-8 text-xs text-primary-foreground/40 leading-relaxed text-center max-w-4xl mx-auto">
          Disclaimer: Task Financial acts as a lending platform in partnership with RBI registered NBFCs and Banks. 
          All loans are subject to credit approval and terms & conditions of the respective lending partner. 
          Interest rates and processing fees may vary based on the applicant&apos;s credit profile.
        </div>
      </div>
    </footer>
  );
}
