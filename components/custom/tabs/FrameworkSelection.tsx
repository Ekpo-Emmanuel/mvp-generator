import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FrameworkSelectionProps {
  handleOptionChange: (category: string, value: string) => void;
}

export default function FrameworkSelection({ handleOptionChange }: FrameworkSelectionProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Label htmlFor="framework">Select a Framework</Label>
        <Select onValueChange={(value) => handleOptionChange('framework', value)}>
          <SelectTrigger id="framework">
            <SelectValue placeholder="Choose a framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nextjs">Next.js</SelectItem>
            <SelectItem value="express" disabled>Express.js (Coming soon)</SelectItem>
            <SelectItem value="nestjs" disabled>NestJS (Coming soon)</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}