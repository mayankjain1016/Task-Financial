"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Task Financial helped me secure a business loan within 48 hours. The transparent processing fees and prompt support from their team made the entire experience seamless.",
    name: "Rajesh Kumar",
    role: "Small Business Owner",
    location: "Mumbai",
  },
  {
    id: 2,
    quote: "I was looking for a personal loan with minimal documentation. Their 100% paperless process is genuinely impressive. Highly recommended for quick funds.",
    name: "Sneha Sharma",
    role: "IT Professional",
    location: "Bengaluru",
  },
  {
    id: 3,
    quote: "Getting a gold loan was never this easy. The valuation was fair and the interest rates are very competitive compared to other NBFCs.",
    name: "Amit Patel",
    role: "Retailer",
    location: "Ahmedabad",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 md:px-12 py-8">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 z-10 hidden md:block">
        <Button variant="outline" size="icon" className="rounded-full shadow-md" onClick={handlePrev}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 z-10 hidden md:block">
        <Button variant="outline" size="icon" className="rounded-full shadow-md" onClick={handleNext}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="overflow-hidden relative h-[300px] md:h-[250px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-card border rounded-2xl shadow-sm"
          >
            <Quote className="w-10 h-10 text-accent/50 mb-6" />
            <p className="text-lg md:text-xl font-medium text-foreground italic mb-8 max-w-2xl">
              &quot;{testimonials[currentIndex].quote}&quot;
            </p>
            <div>
              <h4 className="font-heading font-semibold text-lg text-primary">{testimonials[currentIndex].name}</h4>
              <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}, {testimonials[currentIndex].location}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentIndex === idx ? "bg-accent w-6" : "bg-border hover:bg-border/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
