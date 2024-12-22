import React from 'react';
import { CheckCircle2 } from 'lucide-react';
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
                    <CheckCircle2 className="w-8 h-8 text-primary" strokeWidth={1} />
                    ) : (
                    <motion.div 
                        className={clsx(
                            "w-8 h-8 flex items-center justify-center text-sm font-medium rounded-full text-primary-foreground",
                            index === currentStep ? 'bg-primary' : 'opacity-20 border border-primary text-black dark:text-white'
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