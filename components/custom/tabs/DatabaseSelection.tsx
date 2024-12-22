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
        <Label>Select a Database (coming soon)</Label>
        <RadioGroup onValueChange={(value) => handleOptionChange('database', value)} className="grid gap-4 mt-4">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase()} id={option.toLowerCase()} disabled />
              <Label htmlFor={option.toLowerCase()} className="opacity-50">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
