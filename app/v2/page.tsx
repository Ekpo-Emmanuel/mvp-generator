'use client'

import StepsWrapper from '@/components/v2/steps-wrapper'
import { ModeToggle } from '@/components/mode-toggle'

export default function Home2() {
  return (
    <div className="bg-background text-foreground p-4 ">
        <div className="max-w-4xl mx-auto space-y-20 h-full">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold tracking-tighter">MVP Setup</h1>
                <ModeToggle />
            </div>
            <StepsWrapper title="MVP Setup Steps" />
        </div>
    </div>
  )
}
