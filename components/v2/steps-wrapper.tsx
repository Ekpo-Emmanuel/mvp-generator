'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FrameworkStep from '@/components/v2/steps/framework-step'
import AuthenticationStep from '@/components/v2/steps/authentication-step'
import DatabaseStep from '@/components/v2/steps/database-step'
import StylingStep from '@/components/v2/steps/styling-step'
import SummaryStep from '@/components/v2/steps/summary/summary-step'
import { StepNavigation } from './step-navigation'

const steps = [
  {
    title: 'Framework', 
    description: 'Select the framework for your project.',
  },
  {
    title: 'Authentication', 
    description: 'Choose your authentication method.',
  },
  {
    title: 'Database', 
    description: 'Select a database option (available soon).',
  },
  {
    title: 'Styling', 
    description: 'Pick a styling solution for your project.',
  },
  {
    title: 'Summary',
    description: 'Review your selections before generating the project.',
  },
];


export default function StepsWrapper() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState({
    framework: '',
    authentication: '',
    database: '',
    styling: '',
  })

  const handleOptionChange = useCallback((category: string, value: string | string[]) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: value
    }))
  }, [])

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }, [currentStep])

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }, [currentStep])

  const renderStep = useCallback(() => {
    switch (currentStep) {
      case 0:
        return <FrameworkStep selectedFramework={selectedOptions.framework} onSelect={(value) => handleOptionChange('framework', value)} />
      case 1:
        return <AuthenticationStep selectedAuth={selectedOptions.authentication} onSelect={(value) => handleOptionChange('authentication', value)} />
      case 2:
        return <DatabaseStep selectedDatabase={selectedOptions.database} onSelect={(value) => handleOptionChange('database', value)} />
      case 3:
        return <StylingStep selectedStyling={selectedOptions.styling} onSelect={(value) => handleOptionChange('styling', value)} />
      case 4:
        return <SummaryStep selectedOptions={selectedOptions} />
      default:
        return null
    }
  }, [currentStep, selectedOptions, handleOptionChange])

  return (
    <div className="space-y-12 pb-16 w-full">
      <div className="text-card-foreground">
        <div className="space-y-12 md:space-y-14">
          <div className="sticky top-[49px] z-10 bg-background py-4 pt-10">
            <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
            <p className="text-sm text-foreground opacity-70">{steps[currentStep].description}</p>
          </div>
          <div className="">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="fixed left-0 z-50 bottom-0 w-full bg-background">
            <StepNavigation
              currentStep={currentStep}
              totalSteps={steps.length}
              onBack={handleBack}
              onNext={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
