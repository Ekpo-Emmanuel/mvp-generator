import { cn } from "@/lib/utils";
import FirebaseSvg from '../svgs/firebase'
import ClerkSvg from "../svgs/clerk";


interface AuthenticationStepProps {
  selectedAuth: string;
  onSelect: (auth: string) => void;
}

const authOptions = [
  {
    value: "clerk",
    label: "Clerk",
    customIcon: <ClerkSvg />,
    disabled: false,
    description: 'Complete user management',
  },
  {
    value: "auth0",
    label: "Auth0",
    icon: "M21.98 7.45 19.621 0H4.348L2.02 7.45c-1.352 4.312.03 9.202 3.816 12.015L12.008 24l6.156-4.55c3.754-2.813 5.184-7.688 3.816-12.016l-6.16 4.578 2.34 7.453-6.156-4.598-6.156 4.578 2.355-7.433-6.187-4.547 7.632-.047L12.008 0l2.355 7.402Zm0 0",
    disabled: true,
    description: 'Enterprise-ready auth platform',
  },
  {
    value: "firebase",
    label: "Firebase",
    customIcon: <FirebaseSvg fill="currentColor" className="size-10 -translate-x-[6px]"/>,
    disabled: true,
    description: 'Authentication by Google',
  },
  { 
    value: 'supabase', 
    label: 'Supabase', 
    icon: 'M13.297 23.016c-.598.75-1.809.34-1.824-.621l-.207-14.036h9.437c1.707 0 2.66 1.977 1.598 3.317Zm0 0c-.598.75-1.809.34-1.824-.621l-.207-14.036h9.437c1.707 0 2.66 1.977 1.598 3.317ZM9.457.434c.598-.754 1.809-.34 1.82.617l.094 14.035h-9.32c-1.707 0-2.66-1.973-1.598-3.313Zm3.84 22.582c-.598.75-1.809.34-1.824-.621l-.207-14.036h9.437c1.707 0 2.66 1.977 1.598 3.317Zm0 0',
    disabled: true,
    description: 'Open source auth provider',
  },
];

export default function AuthenticationStep({
  selectedAuth,
  onSelect,
}: AuthenticationStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {authOptions.map((auth) => (
          <div
            key={auth.value}
            onClick={() => !auth.disabled && onSelect(auth.value)}
            className={cn(
              "flex w-full flex-col rounded-xl border bg-card p-6 text-card-foreground transition-colors sm:p-10 space-y-5",
              auth.disabled
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gradient-to-br from-muted/50 to-background cursor-pointer",
              selectedAuth === auth.value && "bg-gradient-to-br dark:from-muted dark:to-background from-primary-foreground to-muted"
            )}
          >
            {auth.customIcon ? (
              auth.customIcon
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d={auth.icon}></path>
              </svg>
            )}
            <div>
              <h3 className="font-medium">{auth.label}</h3>
              <p className="text-[12px] sm:text-sm text-muted-foreground tracking-tight">{auth.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* {selectedAuth && (
          <div className="col-span-2 mt-4">
            <p className="text-sm">Selected Auth: <strong>{selectedAuth}</strong></p>
          </div>
        )} */}
    </div>
  );
}
