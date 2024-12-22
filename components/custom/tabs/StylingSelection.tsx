import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import clsx from "clsx";

interface StylingSelectionProps {
  handleOptionChange: (category: string, value: string) => void;
}

export default function StylingSelection({ handleOptionChange }: StylingSelectionProps) {
  const options = [
    { name: 'TailwindCSS', value: 'Tailwind CSS' },
    { name: 'Bootstrap', value: 'Bootstrap', disabled: true },
    { name: 'PlainCSS', value: 'Plain CSS', disabled: true }
  ]

  return (
    <Card>
      <CardContent className="pt-6">
        <Label>Select a Styling Option</Label>
        <RadioGroup onValueChange={(value) => handleOptionChange('styling', value)} className="grid gap-4 mt-4">
          {options.map((option) => (
            <div key={option.name} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={option.value.toLowerCase().replace(' ', '-')} 
                id={option.value.toLowerCase().replace(' ', '-')} 
                disabled={option.disabled}
              />
              <Label 
                htmlFor={option.value.toLowerCase().replace(' ', '-')}  
                className={clsx(option.disabled && 'opacity-50')}
              >
                {option.value}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
