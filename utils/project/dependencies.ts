import { ProjectConfig } from "@/types/project";
import { isNext, isRemix, isSpa } from "@/utils/generate/kind";
import { VERSIONS } from "@/utils/generate/versions";

export const getDependencies = (config: ProjectConfig) => {
  const spa = isSpa(config.framework);
  const deps: Record<string, string> = {
    react: isRemix(config.framework) ? VERSIONS.reactRemix : VERSIONS.react,
    "react-dom": isRemix(config.framework) ? VERSIONS.reactRemix : VERSIONS.react,
  };

  if (isNext(config.framework)) {
    deps["next"] = VERSIONS.next;
  }

  if (isRemix(config.framework)) {
    deps["@remix-run/node"] = "^2.15.2";
    deps["@remix-run/react"] = "^2.15.2";
    deps["@remix-run/serve"] = "^2.15.2";
    deps["isbot"] = "^4.4.0";
  }

  switch (config.database) {
    case "supabase":
      deps["@supabase/supabase-js"] = "^2.47.0";
      break;
    case "mongodb":
      deps["mongodb"] = "^6.12.0";
      break;
    case "xata":
      deps["@xata.io/client"] = "^0.30.0";
      break;
    case "firebase":
      deps["firebase"] = "^11.0.0";
      break;
  }

  if (spa && (config.database === "mongodb" || config.database === "xata")) {
    deps["express"] = "^4.21.2";
    deps["cors"] = "^2.8.5";
    deps["dotenv"] = "^16.4.7";
  }

  return deps;
};

export const getDevDependencies = (config: ProjectConfig) => {
  const spa = isSpa(config.framework);
  const remix = isRemix(config.framework);

  const devDeps: Record<string, string> = {
    typescript: "^5.7.0",
    "@types/node": "^20",
    "@types/react": remix ? "^18" : "^19",
    "@types/react-dom": remix ? "^18" : "^19",
  };

  if (spa) {
    devDeps["@vitejs/plugin-react"] = "^4.3.4";
    devDeps["vite"] = "^6.0.1";
  }

  if (remix) {
    devDeps["@remix-run/dev"] = "^2.15.2";
    devDeps["vite"] = "^5.4.11";
  }

  if (spa && (config.database === "mongodb" || config.database === "xata")) {
    devDeps["concurrently"] = "^9.1.0";
    devDeps["tsx"] = "^4.19.2";
    devDeps["@types/express"] = "^5.0.0";
    devDeps["@types/cors"] = "^2.8.17";
  }

  if (config.styling === "tailwind") {
    devDeps["postcss"] = "^8";
    devDeps["tailwindcss"] = "^3.4.17";
    devDeps["autoprefixer"] = "^10.4.20";
  }

  return devDeps;
};
