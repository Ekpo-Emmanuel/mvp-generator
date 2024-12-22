'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FrameworkSelection from "./tabs/FrameworkSelection";
import AuthenticationSelection from "./tabs/AuthenticationSelection";
import DatabaseSelection from "./tabs/DatabaseSelection";
import StylingSelection from "./tabs/StylingSelection";
import IntegrationSelection from "./tabs/IntegrationSelection";

interface OptionTabsProps {
  selectedOptions: {
    framework: string;
    authentication: string[];
    database: string;
    styling: string;
  };
  handleOptionChange: (category: string, value: string) => void;
  currentTab: string;
  onTabChange: (tab: string) => void;
}


export default function OptionTabs({ selectedOptions, handleOptionChange, currentTab, onTabChange }: OptionTabsProps) {
  return (
    <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="framework">Framework</TabsTrigger>
        <TabsTrigger value="authentication">Auth</TabsTrigger>
        <TabsTrigger value="database">Database</TabsTrigger>
        <TabsTrigger value="integration">Integration</TabsTrigger>
        <TabsTrigger value="styling">Styles</TabsTrigger>
      </TabsList>
      <TabsContent value="framework">
        <FrameworkSelection handleOptionChange={handleOptionChange} />
      </TabsContent>
      <TabsContent value="authentication">
        <AuthenticationSelection selectedOptions={selectedOptions} handleOptionChange={handleOptionChange} />
      </TabsContent>
      <TabsContent value="database">
        <DatabaseSelection handleOptionChange={handleOptionChange} />
      </TabsContent>
      <TabsContent value="integration">
        <IntegrationSelection handleOptionChange={handleOptionChange} />
      </TabsContent>
      <TabsContent value="styling">
        <StylingSelection handleOptionChange={handleOptionChange} />
      </TabsContent>
    </Tabs>
  );
}