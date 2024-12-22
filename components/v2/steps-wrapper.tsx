'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FrameworkStep from '@/components/v2/steps/framework-step'
import AuthenticationStep from '@/components/v2/steps/authentication-step'
import DatabaseStep from '@/components/v2/steps/database-step'
import StylingStep from '@/components/v2/steps/styling-step'
import SummaryStep from '@/components/v2/steps/summary-step'
import { StepIndicator } from '@/components/v2/step-indicator'
import { StepNavigation } from './step-navigation'

const steps = ['Framework', 'Authentication', 'Database', 'Styling', 'Summary']

export default function StepsWrapper() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState({
    framework: '',
    authentication: [],
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
    <div className="space-y-12 pb-16">
      <div className="max-w-sm">
        <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
      </div>
      <div className="text-card-foreground">
        <div className="p-0">
          <div>
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
          <div className="fixed left-0 bottom-0 w-full bg-mute">
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
