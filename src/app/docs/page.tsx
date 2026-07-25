import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex flex-col items-center justify-center">
      <div className="bg-white p-10 md:p-14 rounded-3xl shadow-sm border border-slate-100 max-w-2xl w-full text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
          Documentation
        </h1>
        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
          We are currently writing the comprehensive documentation for our enterprise APIs, 
          SDKs, and core platform integrations. Check back soon for detailed guides and technical references.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white">
            <ArrowLeft className="w-4 h-4 mr-2" /> Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
