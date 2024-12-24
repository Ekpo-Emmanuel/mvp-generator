"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { LoaderCircle } from 'lucide-react'
import confetti from "canvas-confetti";
import axios from "axios"
import { Card } from "@/components/ui/card";


interface SummaryStepProps {
  selectedOptions: {
    framework: string
    authentication: string
    database: string
    styling: string
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function SummaryStep({ selectedOptions }: SummaryStepProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const handleConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = [
      "#a786ff", // Lavender
      "#fd8bbc", // Pink
      "#eca184", // Peach
      "#f8deb1", // Light Orange
      "#ff6f61", // Coral
      "#ffe135", // Banana Yellow
      "#78c6a3", // Mint Green
      "#6ec5ff", // Sky Blue
      "#ff9cee", // Light Pink
      "#ffcc33", // Golden Yellow
      "#ff7f50", // Coral Orange
      "#b19cd9", // Pastel Purple
    ];
    
 
    const frame = () => {
      if (Date.now() > end) return;
 
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
 
      requestAnimationFrame(frame);
    };
 
    frame();
  };

  const handleGenerateProject = async () => {
    setIsTimerActive(true);
  };

  useEffect(() => {
    if (isTimerActive) {
      const timer = setTimeout(async () => {
        setIsGenerating(true);

        try {
          const selections = {
            framework: "Next.js",
            authentication: ["Clerk"],
            database: "Xata",
            styling: "Tailwind CSS",
          };

          const response = await axios.post("/api/generate", selections, {
            responseType: "blob",
          });

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${selectedOptions.framework || "project"}.zip`);
          document.body.appendChild(link);
          link.click();

          // Cleanup
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Error generating project:", error);
          alert("Failed to generate project. Please try again.");
        } finally {
          setIsGenerating(false);
          setIsTimerActive(false);
          handleConfetti();
        }
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [isTimerActive, selectedOptions]);

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
          Some features are still in development. The generated project will include basic templates and placeholders.
        </p>
      </div>

      <Card className="p-4 md:p-6">
        <h3 className="text-lg font-semibold mb-4">Your Selections</h3>
        <dl className="space-y-2">
          <div className="flex justify-between group py-2 rounded-lg transition-colors">
            <dt className="text-muted-foreground text-sm font-light cursor-default">Framework:</dt>
            <dd className="font-medium text-sm">{selectedOptions.framework || 'Not selected'}</dd>
          </div>
          <div className="flex justify-between group py-2 rounded-lg transition-colors">
            <dt className="text-muted-foreground text-sm font-light cursor-default">Authentication:</dt>
            <dd className="font-medium text-sm">{selectedOptions.authentication || 'Not selected'}</dd>
          </div>
          <div className="flex justify-between group py-2 rounded-lg transition-colors">
            <dt className="text-muted-foreground text-sm font-light cursor-default">Database:</dt>
            {/* <dd className="font-medium">{selectedOptions.database || 'Not selected'}</dd> */}
            <dd className="flex items-center justify-center gap-2 font-medium rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 text-xs">Coming soon</dd>
          </div>
          <div className="flex justify-between group py-2 rounded-lg transition-colors">
            <dt className="text-muted-foreground text-sm font-light cursor-default">Styling:</dt>
            <dd className="font-medium">{selectedOptions.styling || 'Not selected'}</dd>
            {/* <dd className="font-medium text-sm">Coming soon</dd> */}
          </div>
        </dl>
      </Card>

      <motion.div variants={itemVariants}>
        <Button 
          onClick={handleGenerateProject}
          disabled={isGenerating}
          className="w-full transition-colors duration-200"
          size="lg"
        >
          {isGenerating 
            ? (
              <span className="flex items-center justify-center w-full h-full absolute text-white">
                <LoaderCircle className="animate-spin" />
              </span>
            ) 
            : 'Generate Project'
          }
        </Button>
      </motion.div>

      <div className="text-sm text-muted-foreground space-y-2">
        <h4 className="font-medium">Getting Started:</h4>
        <ol className="list-decimal list-inside space-y-1">
          <li>Download and extract the generated zip file</li>
          <li>Install dependencies using <code className="bg-muted px-1 rounded text-primary">npm install</code></li>
          <li>Start the development server with <code className="bg-muted px-1 rounded text-primary">npm run dev</code></li>
        </ol>
      </div>
    </motion.div>
  )
}

