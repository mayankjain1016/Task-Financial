import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

interface LoanProductCardProps {
  title: string;
  description: string;
  rateRange: string;
  icon: React.ReactNode;
  href: string;
}

export function LoanProductCard({ title, description, rateRange, icon, href }: LoanProductCardProps) {
  return (
    <Card className="flex flex-col h-full border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
      <CardHeader>
        <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
          {icon}
        </div>
        <CardTitle className="font-heading text-2xl">{title}</CardTitle>
        <CardDescription className="text-sm mt-2 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Interest Rate</p>
          <p className="text-lg font-semibold text-primary">{rateRange}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={href} className={buttonVariants({ variant: "outline", className: "w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all flex items-center justify-center gap-2" })}>
          Learn More <ArrowRight className="w-4 h-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
