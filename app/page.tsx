'use client'

import { useState } from "react";
import OptionTabs from "@/components/custom/OptionTabs";
import SummarySidebar from "@/components/summary-sidebar";
import { Button } from "@/components/ui/button";

interface SelectedOptions {
  framework: string;
  authentication: string[];
  database: string;
  styling: string;
}

const tabsOrder = ["framework", "authentication", "database", "styling"];

export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    framework: '',
    authentication: [],
    database: '',
    styling: '',
  });

  const [currentTab, setCurrentTab] = useState("framework");

  const handleOptionChange = (category: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: category === 'authentication'
        ? prev.authentication.includes(value)
          ? prev.authentication.filter((item) => item !== value)
          : [...prev.authentication, value]
        : value,
    }));
  };

  const handleTabChange = (direction: "back" | "next") => {
    const currentIndex = tabsOrder.indexOf(currentTab);
    const newIndex = direction === "back" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < tabsOrder.length) {
      setCurrentTab(tabsOrder[newIndex]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div className="flex-grow mr-8">
        <h1 className="text-4xl font-bold mb-8">Generate Your Project Setup</h1>
        <OptionTabs
          selectedOptions={selectedOptions}
          handleOptionChange={handleOptionChange}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
        />
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => handleTabChange("back")}
            disabled={currentTab === "framework"}
          >
            Back
          </Button>
          <Button
            onClick={() => handleTabChange("next")}
            disabled={currentTab === "styling"}
          >
            Next
          </Button>
        </div>
      </div>
      <SummarySidebar selectedOptions={selectedOptions} />
    </div>
  );
}
