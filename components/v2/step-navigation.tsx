'use client';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import LogoSvg from './svgs/logo';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

export function StepNavigation({ currentStep, totalSteps, onBack, onNext }: StepNavigationProps) {
  return (
    <div className="flex items-center justify-between px-4 lg:px-0 pb-4 pt-2 max-w-4xl mx-auto">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={currentStep === 0}
        className={cn(
          "transition-all duration-200 ease-in-out",
          currentStep === 0 ? "opacity-50 cursor-not-allowed" : "hover:text-accent-foreground"
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      {(currentStep + 1) !== totalSteps && (
        <p className="text-xs cursor-default tracking-tighter">
          {currentStep + 1} - {totalSteps - 1}
        </p>
      )}
      {currentStep === totalSteps - 1 && (
         <>
          <div className="grid gap-0">
              <span className="text-[9px] text-right cursor-default text-muted-foreground relative">
                For developers
              </span>
              <span className="text-[11px] cursor-default text-muted-foreground relative">
                <Link href="/v2" className="absolute top-0 left-0 scale-[0.5] -translate-x-5">
                  <LogoSvg className="fill-primary"/>
                </Link> by <Link href={`https://github.com/Ekpo-Emmanuel`} target="_blank" className="font-medium cursor-pointer text-primary">Emmanuel Ekpo</Link></span>
          </div>
        </>
      )}
      <Button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className={cn(
          "bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 ease-in-out",
          currentStep === totalSteps - 1 ? "opacity-50 cursor-not-allowed hidden" : ""
        )}
      >
        Next <ChevronRight className="ml-2 h-4 w-4" strokeWidth={2} />
      </Button>
    </div>
  );
}
