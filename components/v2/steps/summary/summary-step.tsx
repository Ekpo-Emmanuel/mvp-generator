"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { LoaderCircle, AlertCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { generateProjectFiles } from "@/utils/projectGenerator";
import { SelectionItem } from "./selecton-item";
import ProjectSetup from "./project-setup";
import { downloadFile } from "@/utils/downloadFile";
import { containerVariants, itemVariants } from "@/utils/styleVariants";
import { handleConfetti } from "@/utils/generateConfetti";
import AiSvg from "./ai-svg";

interface SummaryStepProps {
  selectedOptions: {
    framework: string;
    authentication: string;
    database: string;
    styling: string;
  };
}

const loadingMessages = [
  "Generating Project...",
  "Setting up workspace...",
  "Initializing environment...",
  "Building environment...",
  "Finalizing..."
];

const SummaryStep = ({ selectedOptions }: SummaryStepProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  const handleGenerateProject = () => {
    setIsGenerating(true);
    setIsTimerActive(true);
    
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingMessage(loadingMessages[messageIndex]);
    }, 2000); 

    
    const timer = setTimeout(async () => {
      clearInterval(messageInterval);
      try {
        const selections = {
          framework: "nextjs",
          auth: "clerk",
          database: "Xata",
          styling: "tailwind",
        };
        const blob = await generateProjectFiles(selections);
        downloadFile(blob, `${selectedOptions.framework || "generated-project"}.zip`);
        console.log("Your project has been generated and downloaded successfully.");
      } catch (error) {
        console.error("Error generating your project:", error);
      } finally {
        setIsGenerating(false);
        setIsTimerActive(false);
        handleConfetti(); 
      }
    }, 10000);

    return () => clearTimeout(timer);
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="overflow-hidden">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 flex md:items-center space-x-4 cursor-default">
          <div className="mt-0.5">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-yellow-800 dark:text-yellow-200 text-sm">
            Some features are still in development. The generated project will include basic templates and placeholders.
          </p>
        </div>
        <div className="p-6 space-y-6">
          <h3 className="text-xl font-semibold  dark:text-gray-100">Your Selections</h3>
          <dl className="space-y-1">
            <SelectionItem label="Framework" value={selectedOptions.framework} />
            <SelectionItem label="Authentication" value={selectedOptions.authentication} />
            <SelectionItem label="Database" value={selectedOptions.database}  comingSoon />
            <SelectionItem label="Styling" value={selectedOptions.styling} />
          </dl>
        </div>
      </Card>

      <motion.div variants={itemVariants}>
        <Button 
          onClick={handleGenerateProject}
          className="w-full transition-colors duration-200"
          size="lg"
        >
        {isGenerating ? (
            <span className="flex items-center justify-center w-full h-full">
              <LoaderCircle className="animate-spin" />
              <span className="ml-2">{loadingMessage}</span>
            </span>
          ) : (
            <>
              <AiSvg />
              Generate Project
            </>
          )}
        </Button>
      </motion.div>

      <ProjectSetup />
    </motion.div>
  );
};

export default SummaryStep;
