import { cn } from '@/lib/utils'

interface StylingStepProps {
  selectedStyling: string
  onSelect: (styling: string) => void
}

const stylingOptions = [
  { 
    value: 'tailwind', 
    label: 'Tailwind CSS', 
    description: 'A utility-first CSS styling',
    disabled: false,
    icon: "M12 6.035q-4-.001-5 3.977 1.501-1.986 3.5-1.492c.762.19 1.305.738 1.906 1.347C13.386 10.855 14.523 12 17 12q4 .001 5-3.977-1.498 1.99-3.5 1.493c-.762-.192-1.305-.739-1.906-1.344-.98-.992-2.114-2.137-4.594-2.137M7 12c-2.668 0-4.332 1.324-5 3.977q1.501-1.992 3.5-1.493c.762.192 1.305.739 1.906 1.344.98.992 2.117 2.137 4.594 2.137q4.003.001 5-3.977c-1 1.325-2.164 1.82-3.5 1.492-.762-.19-1.305-.738-1.906-1.347C10.614 13.145 9.477 12 7 12m0 0",
  },
  { 
    value: 'bootstrap', 
    label: 'Bootstrap', 
    description: "The world's most popular CSS styling" ,
    disabled: true,
    icon: "M4.984 2C3.617 2 2.602 3.2 2.648 4.5c.043 1.246-.015 2.863-.421 4.184-.407 1.324-1.098 2.16-2.227 2.27v1.214c1.129.105 1.82.945 2.227 2.266.406 1.32.464 2.937.421 4.187-.046 1.297.97 2.496 2.336 2.496h14.032c1.37 0 2.382-1.195 2.34-2.496-.044-1.25.011-2.867.417-4.187.41-1.32 1.098-2.16 2.227-2.266v-1.215c-1.129-.11-1.816-.945-2.227-2.27-.406-1.32-.46-2.937-.418-4.183.043-1.3-.968-2.5-2.34-2.5ZM16.27 13.77c0 1.789-1.332 2.875-3.551 2.875h-3.77a.405.405 0 0 1-.406-.407V6.883a.405.405 0 0 1 .406-.41h3.75c1.848 0 3.059 1.004 3.059 2.539 0 1.078-.817 2.043-1.856 2.21v.06c1.418.155 2.368 1.132 2.368 2.488m-3.961-6.004H10.16V10.8h1.809c1.402 0 2.172-.563 2.172-1.57 0-.946-.664-1.465-1.832-1.465m-2.149 4.242v3.347h2.227c1.46 0 2.23-.585 2.23-1.687 0-1.098-.793-1.66-2.324-1.66Zm0 0",
  },
  { 
    value: 'css', 
    label: 'Plain CSS', 
    description: 'Write your own custom CSS styles',
    disabled: false,
    icon: "m22.645.023-1.997 21.625L12 23.977l-8.648-2.329L1.355.023ZM18.62 4.422H5.242l.324 2.61h6.786l-.36.152-6.191 2.578.207 2.55 5.984.02 3.207.012-.203 3.402-3.004.844-.023.004-2.903-.73-.175-2.114H6.184l.351 4.078 5.457 1.613h.012l5.426-1.582.703-8.097h-6.156l.015-.008L18.36 7.03Zm0 0",
  }
]

export default function StylingStep({ selectedStyling, onSelect }: StylingStepProps) {
  return (
    <div className="space-y-4">
       <div className="grid grid-cols-2 gap-4">
        {stylingOptions.map((styling) => (
          <div
            key={styling.value}
            onClick={() => !styling.disabled && onSelect(styling.value)}
            className={cn(
              "flex w-full flex-col rounded-xl border bg-card p-6 text-card-foreground transition-colors sm:p-10",
              styling.disabled
                ? "cursor-not-allowed opacity-40" 
                : "hover:bg-muted/50 cursor-pointer", 
                selectedStyling === styling.value && "bg-muted hover:bg-muted" 
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d={styling.icon}></path>
            </svg>
            <p className="font-medium mt-2">{styling.label}</p>
            <p className="text-sm text-muted-foreground">{styling.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

