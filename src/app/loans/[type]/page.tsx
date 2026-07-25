import { notFound } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EMICalculator } from "@/components/widgets/emi-calculator";
import { CheckCircle2, FileText } from "lucide-react";

const loanData = {
  "personal-loan": {
    title: "Personal Loan",
    tagline: "Fund your personal dreams instantly.",
    description: "Get access to collateral-free funds for medical emergencies, travel, or home renovation with our premium personal loans.",
    defaultRate: 12.5,
    defaultAmount: 200000,
    defaultTenure: 36,
    eligibility: [
      "Age: 21 to 60 years",
      "Employment: Salaried or Self-employed",
      "Minimum Income: ₹25,000/month",
      "CIBIL Score: 700+",
    ],
    documents: [
      "Identity Proof (Aadhaar/PAN/Passport)",
      "Address Proof",
      "Last 3 months bank statements",
      "Last 3 months salary slips",
    ],
    faqs: [
      { q: "Is collateral required?", a: "No, our personal loans are entirely unsecured." },
      { q: "How long does approval take?", a: "Approval is usually granted within 4 hours if all documents are in order." }
    ]
  },
  "group-loan": {
    title: "Group Loan",
    tagline: "Empowering communities together.",
    description: "Joint liability group loans designed to foster entrepreneurship and community growth with flexible repayment structures.",
    defaultRate: 20.0,
    defaultAmount: 50000,
    defaultTenure: 12,
    eligibility: [
      "Group Size: 3 to 10 members",
      "Age: 18 to 65 years",
      "Income generating activity required",
      "Members must reside in the same locality",
    ],
    documents: [
      "KYC documents for all members",
      "Group resolution document",
      "Business proof (if applicable)",
    ],
    faqs: [
      { q: "What happens if one member defaults?", a: "In a joint liability group, all members are collectively responsible for the repayment of the loan." },
      { q: "Are pre-payments allowed?", a: "Yes, pre-payments are allowed after 3 EMIs without penalty." }
    ]
  },
  "gold-loan": {
    title: "Gold Loan",
    tagline: "Unlock the power of your gold.",
    description: "Secure, low-interest financing against your gold ornaments with the highest per-gram valuation.",
    defaultRate: 9.5,
    defaultAmount: 100000,
    defaultTenure: 12,
    eligibility: [
      "Age: 18 to 75 years",
      "Pledge gold ornaments of 18K to 24K purity",
      "No income proof required",
    ],
    documents: [
      "Identity Proof (Aadhaar/PAN/Voter ID)",
      "Address Proof",
      "Passport size photograph",
    ],
    faqs: [
      { q: "How is my gold stored?", a: "Your gold is stored securely in bank-grade vaults under 24/7 surveillance." },
      { q: "What is the LTV (Loan to Value)?", a: "We provide up to 75% LTV as per RBI guidelines." }
    ]
  },
  "business-loan": {
    title: "Business Loan",
    tagline: "Scale your enterprise with confidence.",
    description: "Collateral-free working capital and term loans to fuel your business expansion, inventory purchase, or equipment upgrades.",
    defaultRate: 15.0,
    defaultAmount: 1000000,
    defaultTenure: 48,
    eligibility: [
      "Business Vintage: Minimum 3 years",
      "Annual Turnover: ₹50 Lakhs+",
      "Business profitable for last 2 years",
    ],
    documents: [
      "KYC of Promoters/Directors",
      "Last 2 years Audited Financials",
      "GST returns for last 12 months",
      "6 months bank statement",
    ],
    faqs: [
      { q: "Do you finance startups?", a: "Currently, we require a minimum vintage of 3 years to offer collateral-free business loans." },
      { q: "Can I get a top-up loan?", a: "Yes, top-up loans are available after 12 successful EMI payments." }
    ]
  }
};

export function generateStaticParams() {
  return [
    { type: 'personal-loan' },
    { type: 'group-loan' },
    { type: 'gold-loan' },
    { type: 'business-loan' },
  ];
}

export default async function LoanProductPage({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = await params;
  const loan = loanData[resolvedParams.type as keyof typeof loanData];

  if (!loan) {
    notFound();
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{loan.title}</h1>
          <p className="text-xl text-accent mb-6 font-medium italic">{loan.tagline}</p>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            {loan.description}
          </p>
          <Link href="/apply" className={buttonVariants({ size: "lg", className: "rounded-full bg-accent text-accent-foreground hover:bg-accent/90 h-14 px-8 text-lg" })}>
            Apply Now
          </Link>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Eligibility */}
            <div className="bg-primary/5 p-8 rounded-2xl border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-heading font-semibold">Eligibility Criteria</h3>
              </div>
              <ul className="space-y-4">
                {loan.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents */}
            <div className="bg-primary/5 p-8 rounded-2xl border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-heading font-semibold">Documents Required</h3>
              </div>
              <ul className="space-y-4">
                {loan.documents.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Calculate {loan.title} EMI</h2>
          </div>
          <EMICalculator 
            title={`${loan.title} Calculator`}
            defaultAmount={loan.defaultAmount}
            defaultRate={loan.defaultRate}
            defaultTenure={loan.defaultTenure}
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Specific FAQs</h2>
          <Accordion className="w-full">
            {loan.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-lg font-medium hover:text-accent transition-colors text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
