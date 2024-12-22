import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SummarySidebarProps {
  selectedOptions: {
    framework: string;
    authentication: string[];
    database: string;
    styling: string;
  }
}

export default function SummarySidebar({ selectedOptions }: SummarySidebarProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateProject = async () => {
    setIsGenerating(true)
    try {
      const selections = {
        framework: 'Next.js',
        authentication: ['Clerk'],
        database: 'Xata',
        styling: 'Tailwind CSS',
      };
      const response = await axios.post(
        "/api/generate", 
        selections,
        {
          responseType: "blob", 
        }
      );

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
    }
  }

  return (
    <div className="md:w-80 border-t md:border-l md:border-t-0 pt-8 md:pt-0 md:pl-8 w-full mt-4 md:mt-0">
      <Button 
        className="w-full md:hidden mb-8" 
        onClick={handleGenerateProject}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Generate Project'}
      </Button>
      <h2 className="text-2xl font-semibold mb-4">Summary</h2>
      <ScrollArea className="md:h-[calc(100vh-300px)]">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Framework</h3>
            <p className="text-sm text-muted-foreground">{selectedOptions.framework || 'Not selected'}</p>
          </div>
          <div>
            <h3 className="font-medium">Authentication</h3>
            <p className="text-sm text-muted-foreground">
              {selectedOptions.authentication.length > 0
                ? selectedOptions.authentication.join(', ')
                : 'Not selected'}
            </p>
          </div>
          <div>
            <h3 className="font-medium">Database</h3>
            <p className="text-sm text-muted-foreground">{selectedOptions.database || 'Not selected'}</p>
          </div>
          <div>
            <h3 className="font-medium">Styling</h3>
            <p className="text-sm text-muted-foreground">{selectedOptions.styling || 'Not selected'}</p>
          </div>
        </div>
      </ScrollArea>
      <Button 
        className="w-full mt-8 hidden md:flex" 
        onClick={handleGenerateProject}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Generate Project'}
      </Button>
    </div>
  )
}
