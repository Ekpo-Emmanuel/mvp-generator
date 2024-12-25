'use client';

import Header from '@/components/v2/header';
import StepsWrapper from '@/components/v2/steps-wrapper';

export default function Home2() {
  return (
    <section className="bg-background relative">
      <Header />
      <div className="text-foreground">
        <div className="max-w-4xl mx-auto h-full p-4 lg:p-0 flex items-center justify-center">
          <StepsWrapper />
        </div>
      </div>
    </section>
  );
}
