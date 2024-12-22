import { useState } from 'react'
import { motion } from 'framer-motion'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from '@/lib/utils'

interface FrameworkStepProps {
  selectedFramework: string
  onSelect: (framework: string) => void
}

const frameworks = [
  { value: 'nextjs', label: 'Next.js', description: 'React framework with hybrid static & server rendering' },
  { value: 'express', label: 'Express.js', description: 'Fast, unopinionated, minimalist web framework for Node.js', disabled: true },
  { value: 'nestjs', label: 'NestJS', description: 'Progressive Node.js framework for scalable server-side apps', disabled: true }
]

export default function FrameworkStep({ selectedFramework, onSelect }: FrameworkStepProps) {
  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium mb-4">Select a Framework</h2>
      <RadioGroup value={selectedFramework} onValueChange={onSelect} className="space-y-2">
        {frameworks.map((framework) => (
          <div
            key={framework.value}
            className={cn(
              "relative p-4 rounded-lg transition-all duration-200 ease-in-out",
              framework.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted cursor-pointer"
            )}
            onMouseEnter={() => setHoveredFramework(framework.value)}
            onMouseLeave={() => setHoveredFramework(null)}
          >
            <RadioGroupItem
              value={framework.value}
              id={framework.value}
              disabled={framework.disabled}
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            <Label
              htmlFor={framework.value}
              className="block ml-8 cursor-pointer"
            >
              <span className="font-normal">{framework.label}</span>
              <span className="block text-sm font-extralight mt-1">
                {framework.description}
              </span>
              {framework.disabled && (
                <span className="block text-sm text-blue-500 dark:text-blue-400 font-light mt-1">
                  Coming Soon
                </span>
              )}
            </Label>
            {hoveredFramework === framework.value && !framework.disabled && (
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

