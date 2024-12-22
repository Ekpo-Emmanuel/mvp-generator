'use client';

import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

export function StepNavigation({ currentStep, totalSteps, onBack, onNext }: StepNavigationProps) {
  return (
    <div className="flex justify-between px-4 lg:px-0 py-4 max-w-4xl mx-auto">
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
      <Button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className={cn(
          "bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 ease-in-out",
          currentStep === totalSteps - 1 ? "opacity-50 cursor-not-allowed" : ""
        )}
      >
        {currentStep === totalSteps - 2 ? (
          <>
            Finish <Check className="ml-2 h-4 w-4" strokeWidth={2} />
          </>
        ) : (
          <>
            Next <ChevronRight className="ml-2 h-4 w-4" strokeWidth={2} />
          </>
        )}
      </Button>
    </div>
  );
}
