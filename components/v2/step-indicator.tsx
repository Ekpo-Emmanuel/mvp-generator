import React from 'react';
import { CheckCircle2, Check } from 'lucide-react';
import { motion } from 'framer-motion'
import clsx from "clsx"


interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
            {/* Step Indicator */}
            <div className="flex flex-col items-center cursor-default">
                {index < currentStep ? (
                    <motion.div 
                        className={clsx(
                            "w-8 h-8 flex items-center justify-center text-sm font-medium z-10 rounded-full  border border-primary bg-background dark:bg-primary",
                        )}
                    >
                        <Check className="w-4 h-4 dark:text-background" strokeWidth={2} />
                    </motion.div>
                    ) : (
                    <motion.div 
                        className={clsx(
                            "w-8 h-8 flex items-center justify-center text-sm font-medium z-10 rounded-full text-primary-foreground",
                            index === currentStep ? 'bg-primary' : 'border bg-background '
                        )}
                    >
                        {index + 1}
                    </motion.div>
                )}
            </div>

            {/* Connector Line */}
            {index < totalSteps - 1 && (
                <div className="w-full h-[2px] mx-2 z-50">
                    <motion.div
                        className={`h-full ${index < currentStep ? 'bg-primary' : 'bg-gray-200'} rounded-full`}
                        initial={{ width: '0%' }}
                        animate={{ width: index < currentStep ? '100%' : '0%' }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                </div>
            )}
        </React.Fragment>
      ))}
    </div>
  );
};