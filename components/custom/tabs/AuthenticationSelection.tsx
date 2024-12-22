import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface AuthenticationSelectionProps {
  selectedOptions: {
    authentication: string[];
  };
  handleOptionChange: (category: string, value: string) => void;
}

export default function AuthenticationSelection({ selectedOptions, handleOptionChange }: AuthenticationSelectionProps) {
  const options = ["Clerk", "Auth0", "Firebase"];

  return (
    <Card>
      <CardContent className="pt-6">
        <Label>Select Authentication Options</Label>
        <div className="grid gap-4 mt-4">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option.toLowerCase()}
                checked={selectedOptions.authentication.includes(option.toLowerCase())}
                onCheckedChange={() => handleOptionChange('authentication', option.toLowerCase())}
              />
              <label htmlFor={option.toLowerCase()} className="text-sm font-medium">
                {option}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
