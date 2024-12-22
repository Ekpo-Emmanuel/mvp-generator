import { useState } from 'react'
import { motion } from 'framer-motion'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from '@/lib/utils'

interface StylingStepProps {
  selectedStyling: string
  onSelect: (styling: string) => void
}

const stylingOptions = [
  { 
    value: 'tailwind', 
    label: 'Tailwind CSS', 
    description: 'A utility-first CSS framework',
  },
  { 
    value: 'bootstrap', 
    label: 'Bootstrap', 
    description: "The world's most popular CSS framework" ,
    disabled: true,
  },
  { 
    value: 'css', 
    label: 'Plain CSS', 
    description: 'Write your own custom CSS styles',
    disabled: true,
  }
]

export default function StylingStep({ selectedStyling, onSelect }: StylingStepProps) {
  const [hoveredStyling, setHoveredStyling] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium mb-4">Select a Styling Option (Coming Soon)</h2>
      <RadioGroup value={selectedStyling} onValueChange={onSelect} className="space-y-2">
        {stylingOptions.map((styling) => (
          <div
            key={styling.value}
            className={cn(
              "relative p-4 rounded-lg transition-all duration-200 ease-in-out",
              styling.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted cursor-pointer"
            )}
            onMouseEnter={() => setHoveredStyling(styling.value)}
            onMouseLeave={() => setHoveredStyling(null)}
          >
            <RadioGroupItem
              value={styling.value}
              id={styling.value}
              disabled={styling.disabled}
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            <Label
              htmlFor={styling.value}
              className="block ml-8 cursor-pointer"
            >
              <span className="font-normal">{styling.label}</span>
              <span className="block text-sm font-extralight mt-1 tracking-tight">
                {styling.description}
              </span>
            </Label>
            {hoveredStyling === styling.value && (
              <motion.div
                className="absolute inset-0 border rounded-lg pointer-events-none"
                layoutId="outline"
                initial={false}
                animate={{ opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

