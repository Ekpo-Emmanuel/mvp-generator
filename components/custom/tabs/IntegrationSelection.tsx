import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface IntegrationSelectionProps {
  handleOptionChange: (category: string, value: string) => void;
}

export default function IntegrationSelection({ handleOptionChange }: IntegrationSelectionProps) {
  const options = ["Drizzle ORM", "Prisma"];

  return (
    <Card>
      <CardContent className="pt-6">
        <Label>Select a Styling Option</Label>
        <RadioGroup onValueChange={(value) => handleOptionChange('styling', value)}>
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase().replace(' ', '-')} id={option.toLowerCase().replace(' ', '-')} />
              <Label htmlFor={option.toLowerCase().replace(' ', '-')}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
