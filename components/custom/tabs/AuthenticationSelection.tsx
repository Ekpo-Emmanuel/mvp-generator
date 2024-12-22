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
  const options = [
    { name: 'Clerk', value: 'clerk' },
    { name: 'Auth0', value: 'auth0', disabled: true },
    { name: 'Firebase', value: 'firebase', disabled: true }
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <Label>Select Authentication Options</Label>
        <div className="grid gap-4 mt-4">
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value}
              checked={selectedOptions.authentication.includes(option.value)}
              onCheckedChange={() => handleOptionChange('authentication', option.value)}
              disabled={option.disabled}
            />
            <label
              htmlFor={option.value}
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${option.disabled ? 'opacity-50' : ''}`}
            >
              {option.name} {option.disabled && '(Coming Soon)'}
            </label>
          </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
