import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function FeatureBanner() {
  return (
    <div>
        <Alert variant="warning" className="rounded-none border-x-0 border-t-0 max-w-7xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Work in Progress</AlertTitle>
            <AlertDescription>
                Currently, only Next.js and Clerk authentication are fully implemented. Other features are coming soon!
            </AlertDescription>
        </Alert>
    </div>
  )
}
