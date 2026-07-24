import { ShieldCheck, Lock, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const badges = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-accent" />,
    title: "RBI Registered",
    description: "100% compliant and secure",
  },
  {
    icon: <Clock className="w-8 h-8 text-accent" />,
    title: "Fast Disbursal",
    description: "Funds in 24 hours*",
  },
  {
    icon: <FileText className="w-8 h-8 text-accent" />,
    title: "Minimal Docs",
    description: "Paperless KYC process",
  },
  {
    icon: <Lock className="w-8 h-8 text-accent" />,
    title: "Data Secure",
    description: "Bank-grade encryption",
  },
];

interface TrustBadgesProps {
  className?: string;
}

export function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8", className)}>
      {badges.map((badge, idx) => (
        <div key={idx} className="flex flex-col items-center text-center p-4">
          <div className="mb-4 p-4 bg-primary/5 rounded-full">
            {badge.icon}
          </div>
          <h4 className="font-heading font-semibold text-lg mb-1">{badge.title}</h4>
          <p className="text-sm text-muted-foreground">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}
