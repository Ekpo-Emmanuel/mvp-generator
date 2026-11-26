"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LoaderCircle, AlertCircle } from "lucide-react";
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

const SummaryStep = ({ selectedOptions }: SummaryStepProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const canGenerate =
    Boolean(selectedOptions.framework) &&
    Boolean(selectedOptions.authentication) &&
    Boolean(selectedOptions.database) &&
    Boolean(selectedOptions.styling);

  const handleGenerateProject = async () => {
    if (!canGenerate) {
      setError("Pick a value on every step first.");
      return;
    }

    setError("");
    setIsGenerating(true);
    try {
      const blob = await generateProjectFiles({
        framework: selectedOptions.framework,
        auth: selectedOptions.authentication,
        database: selectedOptions.database,
        styling: selectedOptions.styling,
      });
      downloadFile(blob, `${selectedOptions.framework}-project.zip`);
      handleConfetti();
    } catch (err) {
      console.error("Error generating your project:", err);
      setError("Generate failed. Try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            {!canGenerate && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 flex md:items-center space-x-4">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  Finish framework, auth, database, and styling before generate.
                </p>
              </div>
            )}
            <div className="p-6 space-y-6">
              <h3 className="text-xl font-semibold dark:text-gray-100">Your Selections</h3>
              <dl className="space-y-1">
                <SelectionItem label="Framework" value={selectedOptions.framework} />
                <SelectionItem label="Authentication" value={selectedOptions.authentication} />
                <SelectionItem label="Database" value={selectedOptions.database} />
                <SelectionItem label="Styling" value={selectedOptions.styling} />
              </dl>
            </div>
          </Card>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <motion.div variants={itemVariants}>
            <Button
              onClick={handleGenerateProject}
              className="w-full transition-colors duration-200"
              size="lg"
              disabled={isGenerating || !canGenerate}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center w-full h-full">
                  <LoaderCircle className="animate-spin" />
                  <span className="ml-2">Generating project...</span>
                </span>
              ) : (
                <>
                  <AiSvg />
                  Generate Project
                </>
              )}
            </Button>
          </motion.div>
        </div>

        <ProjectSetup selectedOptions={selectedOptions} />
      </div>
    </motion.div>
  );
};

export default SummaryStep;
