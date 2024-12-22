import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DatabaseSelectionProps {
  handleOptionChange: (category: string, value: string) => void;
}

export default function DatabaseSelection({ handleOptionChange }: DatabaseSelectionProps) {
  const options = ["Supabase", "Xata", "MongoDB"];

  return (
    <Card>
      <CardContent className="pt-6">
        <Label>Select a Database</Label>
        <RadioGroup onValueChange={(value) => handleOptionChange('database', value)}>
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase()} id={option.toLowerCase()} />
              <Label htmlFor={option.toLowerCase()}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
