import { useState } from 'react'
import { motion } from 'framer-motion'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from '@/lib/utils'

interface DatabaseStepProps {
  selectedDatabase: string
  onSelect: (database: string) => void
}

const databases = [
  { value: 'supabase', label: 'Supabase', description: 'Open source Firebase alternative' },
  { value: 'xata', label: 'Xata', description: 'Serverless database platform' },
  { value: 'mongodb', label: 'MongoDB', description: 'Document-oriented NoSQL database' }
]

export default function DatabaseStep({ selectedDatabase, onSelect }: DatabaseStepProps) {
  const [hoveredDatabase, setHoveredDatabase] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium mb-4">Select a Database (Coming Soon)</h2>
      <RadioGroup value={selectedDatabase} onValueChange={onSelect} className="space-y-2">
        {databases.map((database) => (
          <div
            key={database.value}
            className={cn(
              "relative p-4 rounded-lg transition-all duration-200 ease-in-out opacity-50 cursor-not-allowed hover:bg-muted"
            )}
            onMouseEnter={() => setHoveredDatabase(database.value)}
            onMouseLeave={() => setHoveredDatabase(null)}
          >
            <RadioGroupItem
              value={database.value}
              id={database.value}
              disabled
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            <Label
              htmlFor={database.value}
              className="block ml-8 cursor-pointer"
            >
              <span className="font-normal">{database.label}</span>
              <span className="block text-sm font-extralight mt-1">
                {database.description}
              </span>
            </Label>
            {hoveredDatabase === database.value && (
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

