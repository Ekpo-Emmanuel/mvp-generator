import { cn } from "@/lib/utils";

interface AuthenticationStepProps {
  selectedAuth: string;
  onSelect: (auth: string) => void;
}

const authOptions = [
  {
    value: "clerk",
    label: "Clerk",
    customIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="w-10 h-10"
      >
        <circle cx="12" cy="12" r="3.75" fill="currentColor"></circle>
        <path
          fill="currentColor"
          d="M18.756 20.879c.32.319.287.847-.088 1.098A11.94 11.94 0 0 1 11.998 24a11.94 11.94 0 0 1-6.669-2.023c-.375-.251-.407-.78-.088-1.098l2.74-2.74a.81.81 0 0 1 .944-.128A6.7 6.7 0 0 0 12 18.75a6.7 6.7 0 0 0 3.073-.739.81.81 0 0 1 .944.127l2.74 2.74Z"
        ></path>
        <path
          fill="currentColor"
          d="M18.67 2.023c.374.25.406.78.087 1.098l-2.74 2.74c-.248.248-.632.287-.944.128a6.75 6.75 0 0 0-9.085 9.085.81.81 0 0 1-.126.943l-2.74 2.74c-.32.32-.848.288-1.1-.087A11.94 11.94 0 0 1 0 12C0 5.373 5.373 0 12 0c2.468 0 4.762.745 6.67 2.023"
          opacity="0.5"
        ></path>
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M39.187 2.438c0-.104.084-.188.187-.188h2.813c.103 0 .187.084.187.188v19.125a.187.187 0 0 1-.187.187h-2.813a.19.19 0 0 1-.187-.188zm-3.97 15.255a.193.193 0 0 0-.258.008 4.9 4.9 0 0 1-1.514.976 5 5 0 0 1-1.95.375 4.2 4.2 0 0 1-1.653-.284 4.15 4.15 0 0 1-1.402-.903c-.726-.74-1.144-1.799-1.144-3.06 0-2.525 1.68-4.252 4.2-4.252a4.7 4.7 0 0 1 1.96.4 4.6 4.6 0 0 1 1.474 1.042.194.194 0 0 0 .267.016l1.899-1.643a.183.183 0 0 0 .018-.26c-1.428-1.596-3.665-2.42-5.793-2.42-4.284 0-7.322 2.89-7.322 7.14 0 2.104.755 3.874 2.028 5.125s3.087 1.985 5.18 1.985c2.624 0 4.736-1.007 5.975-2.298a.183.183 0 0 0-.015-.265zm22.65-1.952a.185.185 0 0 1-.185.164H47.83a.18.18 0 0 0-.178.226c.49 1.818 1.952 2.917 3.947 2.917a4.44 4.44 0 0 0 1.948-.404 4.4 4.4 0 0 0 1.477-1.107.14.14 0 0 1 .192-.017l1.98 1.725c.076.066.087.18.022.257-1.196 1.41-3.134 2.436-5.793 2.436-4.09 0-7.176-2.833-7.176-7.137 0-2.111.727-3.882 1.939-5.132a6.7 6.7 0 0 1 2.252-1.49 6.8 6.8 0 0 1 2.67-.49c4.145 0 6.827 2.916 6.827 6.942q-.009.556-.07 1.11m-10.155-2.613a.18.18 0 0 0 .175.228h6.55a.18.18 0 0 0 .178-.23c-.447-1.545-1.58-2.576-3.339-2.576a3.65 3.65 0 0 0-1.51.274 3.6 3.6 0 0 0-1.255.869c-.368.417-.64.907-.8 1.435ZM67.684 7.69a.187.187 0 0 1 .19.187v3.149c0 .11-.094.195-.203.187a12 12 0 0 0-.78-.042c-2.453 0-3.893 1.727-3.893 3.994v6.398a.187.187 0 0 1-.187.187h-2.813a.19.19 0 0 1-.187-.188V8.072c0-.104.084-.188.187-.188h2.813c.103 0 .187.084.187.188v1.893a.02.02 0 0 0 .035.012c1.1-1.468 2.722-2.285 4.436-2.285zm7.618 8.247a.06.06 0 0 1 .096.009l3.556 5.716a.19.19 0 0 0 .16.088h3.197a.188.188 0 0 0 .16-.286l-4.88-7.872a.19.19 0 0 1 .02-.225l4.701-5.186a.187.187 0 0 0-.139-.313H78.84a.19.19 0 0 0-.138.06l-5.439 5.929a.188.188 0 0 1-.325-.127V2.437a.187.187 0 0 0-.188-.187h-2.812a.19.19 0 0 0-.188.188v19.125c0 .103.084.187.188.187h2.812a.19.19 0 0 0 .188-.188v-3.009a.2.2 0 0 1 .05-.128l2.316-2.488Z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
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
    icon: "M18.874 9.935 16.6 5.584a.677.677 0 0 0-1.198-.004l-.002.004-9.985 17.894zm7.978 15.267L24.04 7.707a.676.676 0 0 0-1.149-.369L5.147 25.203l9.817 5.532c.286.163.628.26.992.26s.707-.096 1.002-.265l-.01.005zM5.865 20.589 8.82 1.581a.679.679 0 0 1 1.267-.22l.002.004 3.178 5.962z",
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
      <div className="grid grid-cols-2 gap-4">
        {authOptions.map((auth) => (
          <div
            key={auth.value}
            onClick={() => !auth.disabled && onSelect(auth.value)}
            className={cn(
              "flex w-full flex-col rounded-xl border bg-card p-6 text-card-foreground transition-colors sm:p-10",
              auth.disabled
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-muted/50 cursor-pointer",
              selectedAuth === auth.value && "bg-muted hover:bg-muted"
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
            <p className="font-medium mt-2">{auth.label}</p>
            <p className="text-sm text-muted-foreground">{auth.description}</p>
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
