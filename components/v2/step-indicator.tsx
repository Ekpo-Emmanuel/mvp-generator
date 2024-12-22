import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion'
import { Button } from '../ui/button';
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
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                    ) : (
                    <motion.div 
                        initial={false}
                        animate={{
                            scale: index === currentStep ? 1.1 : 1,
                            transition: { type: 'spring', stiffness: 500, damping: 30 }
                        }}
                        className={clsx(
                            "w-8 h-8 flex items-center justify-center text-sm font-medium rounded-full text-primary-foreground",
                            index === currentStep ? 'bg-primary' : 'bg-muted text-black/20 dark:text-white/20'
                        )}
                    >
                        {index + 1}
                    </motion.div>
                )}
            </div>

            {/* Connector Line */}
            {index < totalSteps - 1 && (
                <div className="w-full h-[2px] mx-2">
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