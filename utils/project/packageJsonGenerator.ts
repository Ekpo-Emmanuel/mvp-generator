import { ProjectConfig } from "@/types/project";
import { getDependencies, getDevDependencies } from "./dependencies";
import { getAuthSetup } from "./authSetup";
import { isNext, isRemix, isSpa } from "@/utils/generate/kind";

export const generatePackageJson = (config: ProjectConfig) => {
  const authSetup = getAuthSetup(config.auth, config.framework);
  const spaDbServer = isSpa(config.framework) && (config.database === "mongodb" || config.database === "xata");

  let scripts: Record<string, string>;
  if (isNext(config.framework)) {
    scripts = {
      dev: "next dev",
      build: "next build",
      start: "next start",
    };
  } else if (isRemix(config.framework)) {
    scripts = {
      dev: "remix vite:dev",
      build: "remix vite:build",
      start: "remix-serve ./build/server/index.js",
    };
  } else if (spaDbServer) {
    scripts = {
      dev: 'concurrently -k "vite" "tsx watch server/index.ts"',
      build: "vite build",
      preview: "vite preview",
    };
  } else {
    scripts = {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
    };
  }

  return {
    name: `my-${config.framework}-project`,
    version: "0.1.0",
    private: true,
    type: isNext(config.framework) ? undefined : "module",
    scripts,
    dependencies: {
      ...getDependencies(config),
      ...(authSetup.dependencies || {}),
    },
    devDependencies: {
      ...getDevDependencies(config),
      ...(authSetup.devDependencies || {}),
    },
  };
};
