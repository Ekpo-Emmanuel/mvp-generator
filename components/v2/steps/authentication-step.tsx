import { useState } from 'react'
import { motion } from 'framer-motion'
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from '@/lib/utils'

interface AuthenticationStepProps {
  selectedAuth: string[]
  onSelect: (auth: string[]) => void
}

const authOptions = [
  { value: 'clerk', label: 'Clerk', description: 'Complete user management solution' },
  { value: 'auth0', label: 'Auth0', description: 'Flexible authentication platform', disabled: true },
  { value: 'firebase', label: 'Firebase', description: 'Google\'s mobile platform with authentication', disabled: true }
]

export default function AuthenticationStep({ selectedAuth, onSelect }: AuthenticationStepProps) {
  const [hoveredAuth, setHoveredAuth] = useState<string | null>(null)

  const handleChange = (auth: string) => {
    if (selectedAuth.includes(auth)) {
      onSelect(selectedAuth.filter(a => a !== auth))
    } else {
      onSelect([...selectedAuth, auth])
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium mb-4">Select Authentication Options</h2>
      <div className="space-y-2">
        {authOptions.map((auth) => (
          <div
            key={auth.value}
            className={cn(
              "relative p-4 rounded-lg transition-all duration-200 ease-in-out",
              auth.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted cursor-pointer"
            )}
            onMouseEnter={() => setHoveredAuth(auth.value)}
            onMouseLeave={() => setHoveredAuth(null)}
          >
            <Checkbox
              id={auth.value}
              checked={selectedAuth.includes(auth.value)}
              onCheckedChange={() => handleChange(auth.value)}
              disabled={auth.disabled}
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            <Label
              htmlFor={auth.value}
              className="block ml-8 cursor-pointer"
            >
              <span className="font-normal">{auth.label}</span>
              <span className="block text-sm font-extralight mt-1">
                {auth.description}
              </span>
              {auth.disabled && (
                <span className="block text-sm text-blue-500 dark:text-blue-400 mt-1">
                  Coming Soon
                </span>
              )}
            </Label>
            {hoveredAuth === auth.value && !auth.disabled && (
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
      </div>
    </div>
  )
}

