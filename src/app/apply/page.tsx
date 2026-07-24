"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { CheckCircle2, ChevronRight, FileUp, Building2, User, Landmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  pan: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
  loanType: z.string().min(1, "Please select a loan type"),
  loanAmount: z.string().min(4, "Please enter a valid amount"),
  tenure: z.string().min(1, "Please select tenure"),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, trigger, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      termsAccepted: false,
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["firstName", "lastName", "email", "phone", "pan"]);
    } else if (step === 2) {
      isValid = await trigger(["loanType", "loanAmount", "tenure"]);
    }
    
    if (isValid) {
      setStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const steps = [
    { num: 1, title: "Personal Info", icon: User },
    { num: 2, title: "Loan Details", icon: Landmark },
    { num: 3, title: "Review & Submit", icon: FileUp },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-primary/5 flex items-center justify-center">
        <Card className="max-w-xl w-full border-border/50 shadow-xl p-12 text-center">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-heading font-bold mb-4">Application Submitted!</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Thank you for applying with Task Financial. Your application reference number is <strong>TF-{Math.floor(Math.random() * 1000000)}</strong>. 
            Our team will review your application and get back to you within 4 hours.
          </p>
          <Button onClick={() => window.location.href = '/'} size="lg" className="rounded-full">
            Return to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] pt-32 pb-20 bg-background relative">
      <div className="absolute top-0 left-0 w-full h-64 bg-primary -z-10" />
      
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 text-primary-foreground">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Apply for a Loan</h1>
          <p className="text-primary-foreground/80 text-lg">Fast, secure, and 100% digital process.</p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center mb-12 relative max-w-2xl mx-auto">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-border/50 -z-10 -translate-y-1/2 rounded-full" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-accent -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
          
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                step >= s.num ? 'bg-accent border-accent text-accent-foreground' : 'bg-background border-border/50 text-muted-foreground'
              } transition-colors duration-300 shadow-sm`}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium mt-3 hidden md:block uppercase tracking-wider ${
                step >= s.num ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <Card className="border-border/50 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              
              {/* STEP 1: Personal Info */}
              {step === 1 && (
                <div className="p-8 md:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-heading font-semibold mb-6 text-primary border-b pb-4">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" {...register("firstName")} className={errors.firstName ? "border-destructive" : ""} />
                      {errors.firstName && <span className="text-xs text-destructive">{errors.firstName.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" {...register("lastName")} className={errors.lastName ? "border-destructive" : ""} />
                      {errors.lastName && <span className="text-xs text-destructive">{errors.lastName.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" {...register("email")} className={errors.email ? "border-destructive" : ""} />
                      {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="9876543210" {...register("phone")} className={errors.phone ? "border-destructive" : ""} />
                      {errors.phone && <span className="text-xs text-destructive">{errors.phone.message}</span>}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="pan">PAN Number</Label>
                      <Input id="pan" placeholder="ABCDE1234F" className={`uppercase ${errors.pan ? "border-destructive" : ""}`} {...register("pan")} />
                      {errors.pan && <span className="text-xs text-destructive">{errors.pan.message}</span>}
                      <p className="text-xs text-muted-foreground mt-1">We need your PAN to fetch your credit profile securely.</p>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-end">
                    <Button type="button" onClick={nextStep} className="rounded-full px-8">
                      Next Step <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Loan Details */}
              {step === 2 && (
                <div className="p-8 md:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-heading font-semibold mb-6 text-primary border-b pb-4">Loan Requirements</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Loan Type</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                        {['Personal Loan', 'Group Loan', 'Gold Loan', 'Business Loan'].map(type => (
                          <div 
                            key={type}
                            className={`border rounded-xl p-4 text-center cursor-pointer transition-all ${
                              watch("loanType") === type 
                                ? "border-accent bg-accent/5 ring-1 ring-accent" 
                                : "hover:border-primary/30"
                            }`}
                            onClick={() => {
                              setValue("loanType", type, { shouldValidate: true });
                            }}
                          >
                            <span className="font-medium text-sm block">{type}</span>
                          </div>
                        ))}
                      </div>
                      {errors.loanType && <span className="text-xs text-destructive">{errors.loanType.message}</span>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Desired Loan Amount (₹)</Label>
                      <Input id="loanAmount" type="number" placeholder="500000" {...register("loanAmount")} className={errors.loanAmount ? "border-destructive" : ""} />
                      {errors.loanAmount && <span className="text-xs text-destructive">{errors.loanAmount.message}</span>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tenure">Preferred Tenure</Label>
                      <Select onValueChange={(val: string | null) => { if (val) setValue("tenure", val, { shouldValidate: true }) }}>
                        <SelectTrigger className={errors.tenure ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select months" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12 Months</SelectItem>
                          <SelectItem value="24">24 Months</SelectItem>
                          <SelectItem value="36">36 Months</SelectItem>
                          <SelectItem value="48">48 Months</SelectItem>
                          <SelectItem value="60">60 Months</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.tenure && <span className="text-xs text-destructive">{errors.tenure.message}</span>}
                    </div>
                  </div>

                  <div className="mt-10 flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-8">
                      Back
                    </Button>
                    <Button type="button" onClick={nextStep} className="rounded-full px-8">
                      Review <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Review */}
              {step === 3 && (
                <div className="p-8 md:p-12 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-heading font-semibold mb-6 text-primary border-b pb-4">Review & Submit</h2>
                  
                  <div className="bg-muted p-6 rounded-xl space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Applicant Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Name</p>
                          <p className="font-medium">{watch("firstName")} {watch("lastName")}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">PAN</p>
                          <p className="font-medium uppercase">{watch("pan")}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Contact</p>
                          <p className="font-medium">{watch("phone")}</p>
                          <p className="font-medium text-sm text-muted-foreground">{watch("email")}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-px bg-border w-full" />
                    
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Loan Request</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Type</p>
                          <p className="font-medium">{watch("loanType")}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Amount & Tenure</p>
                          <p className="font-medium">₹{Number(watch("loanAmount") || 0).toLocaleString('en-IN')} for {watch("tenure")} months</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-3 p-4 border rounded-xl bg-primary/5">
                      <Checkbox 
                        id="terms" 
                        checked={watch("termsAccepted")}
                        onCheckedChange={(c) => setValue("termsAccepted", c as boolean, { shouldValidate: true })}
                        className="mt-1"
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-relaxed"
                        >
                          I authorize Task Financial to verify my credit profile using the provided PAN. 
                          I agree to the <Link href="/terms" className="text-primary underline hover:text-accent">Terms of Service</Link> and <Link href="/privacy-policy" className="text-primary underline hover:text-accent">Privacy Policy</Link>.
                        </label>
                        {errors.termsAccepted && <span className="text-xs text-destructive mt-1">{errors.termsAccepted.message}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-8">
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="rounded-full px-8 bg-accent text-accent-foreground hover:bg-accent/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </div>
              )}

            </form>
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-muted-foreground mt-8">
          <Lock className="inline w-3 h-3 mr-1" /> Your data is encrypted and securely transmitted via 256-bit SSL.
        </p>
      </div>
    </div>
  );
}

function Lock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
