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
        <Label>Select an Integation Option (Coming soon)</Label>
        <RadioGroup onValueChange={(value) => handleOptionChange('styling', value)} className="grid gap-4 mt-4">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option.toLowerCase().replace(' ', '-')} id={option.toLowerCase().replace(' ', '-')} disabled/>
              <Label htmlFor={option.toLowerCase().replace(' ', '-')}  className="opacity-50">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
