import { cn } from '@/lib/utils'
import FirebaseSvg from '../svgs/firebase'
import MongoDBSvg from '../svgs/mongodb'

interface DatabaseStepProps {
  selectedDatabase: string
  onSelect: (database: string) => void
}

const databases = [
  { 
      value: 'supabase', 
      label: 'Supabase', 
      icon: 'M13.297 23.016c-.598.75-1.809.34-1.824-.621l-.207-14.036h9.437c1.707 0 2.66 1.977 1.598 3.317Zm0 0c-.598.75-1.809.34-1.824-.621l-.207-14.036h9.437c1.707 0 2.66 1.977 1.598 3.317ZM9.457.434c.598-.754 1.809-.34 1.82.617l.094 14.035h-9.32c-1.707 0-2.66-1.973-1.598-3.313Zm3.84 22.582c-.598.75-1.809.34-1.824-.621l-.207-14.036h9.437c1.707 0 2.66 1.977 1.598 3.317Zm0 0',
      disabled: true,
      description: 'Open source Firebase alternative',
  },
  { 
      value: 'firebase', 
      label: 'Firebase', 
      // icon: 'M18.874 9.935 16.6 5.584a.677.677 0 0 0-1.198-.004l-.002.004-9.985 17.894zm7.978 15.267L24.04 7.707a.676.676 0 0 0-1.149-.369L5.147 25.203l9.817 5.532c.286.163.628.26.992.26s.707-.096 1.002-.265l-.01.005zM5.865 20.589 8.82 1.581a.679.679 0 0 1 1.267-.22l.002.004 3.178 5.962z',
      customIcon: <FirebaseSvg fill="currentColor" className="size-10 -translate-x-1"/>,
      disabled: true ,
      description: 'Database by Google',
  },
  { 
      value: 'xata', 
      label: 'Xata', 
      icon: 'M.5 6.602a8.58 8.58 0 0 0 2.524 6.066l5.723 5.703c.199.198.521.198.707-.011a8.577 8.577 0 0 0-.362-11.769l-5.229-5.21C3.392.91 2.62.908 2.221 1.439A8.58 8.58 0 0 0 .5 6.602 M20.976 12.634a8.58 8.58 0 0 0 .803-11.229c-.4-.532-1.17-.528-1.642-.059l-5.229 5.211a8.58 8.58 0 0 0-.362 11.769c.186.21.508.209.707.011z M19.1 22.914c.471.47 1.24.475 1.66-.04 1.165-1.428 1.94-3.076 2.193-4.696.277-1.77-.089-3.378-1.02-4.541-.175-.219-.498-.218-.697-.02l-5.364 5.345a.507.507 0 0 0-.001.718z M3.24 22.909c.42.515 1.19.511 1.66.04l3.23-3.233a.507.507 0 0 0-.002-.718l-5.364-5.346c-.198-.197-.522-.199-.697.02-.93 1.163-1.297 2.771-1.02 4.541.253 1.62 1.028 3.268 2.193 4.696',
      disabled: true ,
      description: 'Serverless database platform',
  },
  { 
      value: 'mongodb', 
      label: 'MongoDB', 
      customIcon: <MongoDBSvg fill="currentColor" className="size-10 -translate-x-3"/>,
      disabled: true ,
      description: 'Document-based database',
  },
  // {
  //   value: "convex",
  //   label: "Convex Dev",
  //   customIcon: (
  //     <svg
  //     xmlns="http://www.w3.org/2000/svg"
  //     width="126"
  //     height="20"
  //     fill="currentColor"
  //     className=""
  //   >
  //     <g clipPath="url(#logo_svg__a)">
  //       <path d="M3.185 17.467Q.358 14.938.358 10 .357 5.063 3.243 2.533 6.125.004 11.127.003q2.075-.001 3.672.305a11.6 11.6 0 0 1 3.055 1.034v5.339q-2.269-1.133-5.15-1.133-2.54 0-3.749 1.01Q7.744 7.57 7.745 10q-.001 2.35 1.192 3.4 1.19 1.054 3.77 1.053 2.73 0 5.19-1.335v5.585q-2.73 1.295-6.807 1.294c-3.388 0-6.02-.844-7.905-2.53m16.353-7.47q0-4.897 2.653-7.448 2.654-2.55 8-2.549c3.59 0 6.273.85 8.058 2.549q2.67 2.549 2.671 7.448 0 9.996-10.73 9.997-10.652.004-10.652-9.997M32.75 13.4q.786-1.055.786-3.4 0-2.307-.786-3.38-.788-1.073-2.56-1.073-1.73.002-2.5 1.073-.768 1.073-.768 3.38 0 2.35.768 3.4.768 1.054 2.5 1.053 1.77-.002 2.56-1.053M42.603.404h6.767l.193 1.458q1.116-.81 2.845-1.336A12.3 12.3 0 0 1 55.985 0q3.422 0 5 1.782c1.051 1.188 1.576 3.02 1.576 5.505v12.305h-7.228V8.055q0-1.296-.558-1.862c-.372-.38-.995-.565-1.867-.565q-.806 0-1.653.385a4.6 4.6 0 0 0-1.424.992v12.587h-7.228zm19.979.001h7.536l3.461 11.252L77.041.405h7.536l-7.192 19.187H69.77zm24.27 17.537c-2.171-1.714-3.187-4.69-3.187-7.903 0-3.13.808-5.708 2.654-7.49S90.976 0 94.526 0q4.898 0 7.71 2.388 2.81 2.39 2.811 6.517v3.362H91.302c.342.998.775 1.72 1.839 2.166q1.598.67 4.45.668 1.703 0 3.47-.282c.415-.068 1.098-.174 1.458-.254v4.665c-1.796.513-4.19.77-6.89.77-3.632-.003-6.605-.343-8.777-2.058m10.601-9.804c0-.95-1.04-2.995-3.129-2.995-1.884 0-3.129 2.013-3.129 2.995z"></path>
  //       <path d="M110.723 9.836 103.955.405h7.844l13.843 19.187h-7.92l-3.077-4.292-3.078 4.292h-7.883zm6.825-9.431h7.808l-5.993 8.4-3.965-5.383z"></path>
  //     </g>
  //     <defs>
  //       <clipPath id="logo_svg__a">
  //         <path d="M0 0h126v20H0z"></path>
  //       </clipPath>
  //     </defs>
  //   </svg>
  //   ),
  //   disabled: true,
  //   description: "ACID-compliant database for TypeScript apps."
  // },
]

export default function DatabaseStep({ selectedDatabase, onSelect }: DatabaseStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {databases.map((database) => (
          <div
            key={database.value}
            onClick={() => !database.disabled && onSelect(database.value)}
            className={cn(
              "flex w-full flex-col rounded-xl border bg-card p-6 text-card-foreground transition-colors sm:p-10 space-y-5",
              database.disabled
                ? "cursor-not-allowed opacity-40" 
                : "hover:bg-gradient-to-br from-muted/50 to-background cursor-pointer", 
                selectedDatabase === database.value && "bg-gradient-to-br dark:from-muted dark:to-background from-primary-foreground to-muted" 
            )}
          >
            {database.customIcon ? (
              database.customIcon
            ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d={database.icon}></path>
            </svg>
            )}

            <div>
              <h3 className="font-medium">{database.label}</h3>
              <p className="text-[12px] sm:text-sm text-muted-foreground tracking-tight">{database.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

