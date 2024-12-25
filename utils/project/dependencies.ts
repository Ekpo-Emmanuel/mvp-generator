import { ProjectConfig } from '../types/projectTypes';

export const getDependencies = (config: ProjectConfig) => {
  const deps: Record<string, string> = {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "clsx": "^2.1.1",
  };

  // Framework-specific dependencies
  switch (config.framework) {
    case "nextjs":
      deps["next"] = "15.1.2";
      break;
    case "remix":
      deps["@remix-run/react"] = "^2.0.0";
      deps["@remix-run/node"] = "^2.0.0";
      break;
    case "vite":
      deps["@vitejs/plugin-react"] = "^4.0.0";
      break;
  }

  // Auth-specific dependencies
  switch (config.auth) {
    case "clerk":
      deps["@clerk/nextjs"] = "^4.23.2";
      break;
    case "firebase":
      deps["firebase"] = "^10.1.0";
      break;
    case "supabase":
      deps["@supabase/supabase-js"] = "^2.31.0";
      break;
    case "auth0":
      deps["@auth0/nextjs-auth0"] = "^3.1.0";
      break;
  }

  // Database-specific dependencies
  switch (config.database) {
    case "supabase":
      if (!deps["@supabase/supabase-js"]) {
        deps["@supabase/supabase-js"] = "^2.31.0";
      }
      break;
    case "mongodb":
      deps["mongodb"] = "^5.7.0";
      break;
    case "xata":
      deps["@xata.io/client"] = "^0.24.0";
      break;
  }

  return deps;
};

export const getDevDependencies = (config: ProjectConfig) => {
  const devDeps: Record<string, string> = {
    "typescript": "^5.1.6",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
  };

  ///// Framework-specific dependencies
  if (config.framework === "nextjs") {
    // Next.js specific dev dependencies
    devDeps["eslint"] = "^9";
    devDeps["eslint-config-next"] = "15.1.2";
    devDeps["@eslint/eslintrc"] = "^3";
  } else if (config.framework === "vite") {
    // Vite specific dev dependencies
    devDeps["@vitejs/plugin-react"] = "^4.3.4";
    devDeps["vite"] = "^6.0.1";
    devDeps["@eslint/js"] = "^9.15.0";
    devDeps["eslint"] = "^9.15.0";
    devDeps["eslint-plugin-react-hooks"] = "^5.0.0";
    devDeps["eslint-plugin-react-refresh"] = "^0.4.14";
    devDeps["globals"] = "^15.12.0";
    devDeps["typescript-eslint"] = "^8.15.0";
  } else if (config.framework === "remix") {
    // Add Remix specific dependencies if needed
    // Example: devDeps["@remix-run/dev"] = "x.x.x"; // Uncomment and set version as needed
  }

  //// Styling-specific dependencies
  if (config.styling === "tailwind") {
    devDeps["postcss"] = "^8";
    devDeps["tailwindcss"] = "^3.4.17";
    
    // Additional dependencies for Vite with Tailwind CSS
    if (config.framework === "vite") {
      devDeps["autoprefixer"] = "^10.4.20";
    }
  }

  return devDeps;
};
