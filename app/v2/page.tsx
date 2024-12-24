'use client'

import Header from '@/components/v2/header'
import StepsWrapper from '@/components/v2/steps-wrapper'

export default function Home2() {
  return (
    <section className="bg-background">
      <Header />
      <div className="text-foreground pt-24">
        <div className="max-w-4xl mx-auto space-y-10 h-full">
          <div className="p-4 lg:px-0">
            <StepsWrapper />
          </div>
        </div>
      </div>
    </section>
  )
}
