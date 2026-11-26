import React from "react";
import { motion } from "framer-motion";

interface ProjectSetupProps {
  selectedOptions: {
    framework: string;
    authentication: string;
    database: string;
    styling: string;
  };
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-1 rounded bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-mono text-xs">
      {children}
    </code>
  );
}

function frameworkLabel(framework: string) {
  switch (framework) {
    case "nextjs":
      return "Next.js";
    case "vite":
      return "Vite";
    case "remix":
      return "Remix";
    case "manual":
      return "React";
    default:
      return framework || "your app";
  }
}

function envFile(framework: string) {
  return framework === "nextjs" ? ".env.local" : ".env";
}

function devUrl(framework: string) {
  return framework === "nextjs" ? "http://localhost:3000" : "http://localhost:5173";
}

function authKeys(auth: string, framework: string) {
  if (auth === "clerk") {
    if (framework === "nextjs") return "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY";
    if (framework === "remix") return "CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY";
    return "VITE_CLERK_PUBLISHABLE_KEY";
  }
  if (auth === "auth0") {
    if (framework === "nextjs") return "AUTH0_SECRET, AUTH0_BASE_URL, AUTH0_ISSUER_BASE_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET";
    return "VITE_AUTH0_DOMAIN and VITE_AUTH0_CLIENT_ID";
  }
  if (auth === "firebase") {
    return framework === "nextjs" ? "NEXT_PUBLIC_FIREBASE_* keys" : "VITE_FIREBASE_* keys";
  }
  if (auth === "supabase") {
    return framework === "nextjs"
      ? "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
      : "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY";
  }
  return "";
}

function dbKeys(database: string, framework: string) {
  if (database === "mongodb") return "MONGODB_URI";
  if (database === "xata") return "XATA_API_KEY, XATA_DATABASE_URL, XATA_BRANCH";
  if (database === "supabase") {
    return framework === "nextjs"
      ? "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
      : "VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY";
  }
  if (database === "firebase") {
    return framework === "nextjs" ? "NEXT_PUBLIC_FIREBASE_* keys" : "VITE_FIREBASE_* keys";
  }
  return "";
}

function authRoute(auth: string, framework: string) {
  if (auth === "clerk") return framework === "nextjs" || framework === "remix" ? "/sign-in and /dashboard" : "Clerk SignInButton on the home screen";
  if (auth === "auth0") return framework === "nextjs" ? "/api/auth/login" : "the Auth0 login button on the home screen";
  if (auth === "firebase" || auth === "supabase") return "/sign-in";
  return "";
}

export default function ProjectSetup({ selectedOptions }: ProjectSetupProps) {
  const { framework, authentication, database, styling } = selectedOptions;
  const spaDb = (framework === "vite" || framework === "manual") && (database === "mongodb" || database === "xata");
  const needsEnv = authentication !== "none" || database !== "none";
  const keys = [authKeys(authentication, framework), dbKeys(database, framework)].filter(Boolean);
  const uniqueKeys = [...new Set(keys)];

  return (
    <motion.div
      className="bg-muted rounded-lg p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      <h4 className="text-sm font-semibold mb-4 text-gray-900 dark:text-primary">
        Getting Started
      </h4>
      <p className="text-xs text-muted-foreground mb-4">
        {frameworkLabel(framework)}
        {authentication && authentication !== "none" ? ` + ${authentication}` : " with no auth"}
        {database && database !== "none" ? ` + ${database}` : ", no database"}
        {styling ? `, ${styling === "css" ? "plain CSS" : styling}` : ""}
      </p>
      <ol className="list-decimal list-inside space-y-3 text-sm text-gray-600 dark:text-gray-300">
        <li>
          Download and extract <Code>{framework || "project"}-project.zip</Code>
        </li>
        {needsEnv ? (
          <li>
            Copy <Code>.env.example</Code> to <Code>{envFile(framework)}</Code>
            {uniqueKeys.length > 0 ? (
              <>
                {" "}
                and set {uniqueKeys.join("; ")}
              </>
            ) : null}
          </li>
        ) : (
          <li>No env keys required for this stack</li>
        )}
        <li>
          Install dependencies with <Code>npm install</Code>
        </li>
        <li>
          Start the {frameworkLabel(framework)} app with <Code>npm run dev</Code>
          {spaDb
            ? " (Vite plus a local Express API on port 3001)"
            : null}
          . Open <Code>{devUrl(framework)}</Code>
        </li>
        {authentication && authentication !== "none" ? (
          <li>
            Auth: use {authRoute(authentication, framework)} after keys are in {envFile(framework)}
          </li>
        ) : null}
        {database === "mongodb" || database === "xata" ? (
          <li>
            Confirm the database client at <Code>/api/db/ping</Code>
          </li>
        ) : null}
        {database === "supabase" && authentication !== "supabase" ? (
          <li>
            Database client lives in the generated <Code>lib/supabase.ts</Code> (or <Code>src/lib</Code> / <Code>app/lib</Code>)
          </li>
        ) : null}
        {database === "firebase" && authentication !== "firebase" ? (
          <li>
            Firestore client lives in the generated Firebase lib file
          </li>
        ) : null}
        {styling === "bootstrap" ? (
          <li>Bootstrap CSS loads from the jsDelivr CDN in the layout</li>
        ) : null}
        {styling === "tailwind" ? (
          <li>Tailwind is already wired in the generated config and global CSS</li>
        ) : null}
      </ol>
    </motion.div>
  );
}
