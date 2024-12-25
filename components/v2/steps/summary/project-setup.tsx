import React from "react";
import { motion } from "framer-motion";

export default function ProjectSetup() {
  return (
    <motion.div
      className="bg-muted rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      <h4 className="text-sm font-semibold mb-4 text-gray-900 dark:text-primary">
        Getting Started
      </h4>
      <ol className="list-decimal list-inside space-y-3 text-sm text-gray-600 dark:text-gray-300">
        <li>Download and extract the generated zip file</li>
        <li>
          Install dependencies using{" "}
          <code className="px-1.5 py-1 rounded bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-mono text-xs">
            npm install
          </code>
        </li>
        <li>
          Start the dev server with{" "}
          <code className="px-1.5 py-1 rounded bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-mono text-xs">
            npm run dev
          </code>
        </li>
      </ol>
    </motion.div>
  );
}
