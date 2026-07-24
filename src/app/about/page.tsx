import { CheckCircle2, Target, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="bg-primary text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">About Task Financial</h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            Founded with the vision to make credit accessible, transparent, and swift for every Indian. 
            We blend the reliability of traditional banking with the agility of modern fintech.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-primary/5 rounded-2xl border border-border/50">
              <Target className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-heading font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">To democratize access to credit through technology, ensuring every individual and business has the capital they need to grow.</p>
            </div>
            <div className="text-center p-8 bg-primary/5 rounded-2xl border border-border/50">
              <ShieldCheck className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-heading font-bold mb-4">Our Values</h3>
              <p className="text-muted-foreground">Transparency, integrity, and customer-first approach. No hidden fees, no complex jargon.</p>
            </div>
            <div className="text-center p-8 bg-primary/5 rounded-2xl border border-border/50">
              <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-heading font-bold mb-4">Our Commitment</h3>
              <p className="text-muted-foreground">Delivering best-in-class financial products with a seamless digital experience and 100% data security.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
