"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { Check, AlertTriangle, LoaderCircle } from 'lucide-react'
import confetti from "canvas-confetti";
import axios from "axios"


interface SummaryStepProps {
  selectedOptions: {
    framework: string
    authentication: string[]
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
      <h2 className="text-xl font-medium mb-4">Project Summary</h2>
      <div className="grid gap-4 grid-cols-2">
        <motion.div variants={itemVariants} className="rounded-lg p-4 border">
          <h3 className="text-md mb-1 flex items-center">
            Framework
          </h3>
          <p className="text-sm font-extralight">{selectedOptions.framework || 'Not selected'}</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-lg p-4 border">
          <h3 className="text-md mb-1 flex items-center">
            
            Authentication
          </h3>
          <p className="text-sm font-extralight">
            {selectedOptions.authentication.length > 0 ? selectedOptions.authentication.join(', ') : 'Not selected'}
          </p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-lg p-4 border">
          <h3 className="text-md mb-1 flex items-center">
            
            Database
          </h3>
          <p className="text-sm font-extralight">Coming Soon</p>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-lg p-4 border">
          <h3 className="text-md mb-1 flex items-center">
            Styling
          </h3>
          <p className="text-sm font-extralight">Coming Soon</p>
        </motion.div>
      </div>
      <motion.div variants={itemVariants}>
        <Button 
          onClick={handleGenerateProject}
          disabled={isGenerating}
          className="w-full mt-6 transition-colors duration-200"
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
    </motion.div>
  )
}

