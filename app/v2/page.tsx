'use client'

import StepsWrapper from '@/components/v2/steps-wrapper'
import { ModeToggle } from '@/components/mode-toggle'

export default function Home2() {
  return (
    <div className="bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-10 h-full">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-end gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="logo-72"
              width="22"
              fill="none"
              viewBox="0 0 53 44"
              className="text-primary dark:text-primary"
            >
              <path
                d="m23.3 0 28.746 28.63V44H38.631v-9.845L17.752 13.361h-4.337V44H0V0zM38.63 15.27V0h13.415v15.27z"
                className="fill-current"
              />
            </svg>
          </div>
          <ModeToggle />
        </div>
        <div className="p-4">
          <StepsWrapper />
        </div>
      </div>
    </div>
  )
}
