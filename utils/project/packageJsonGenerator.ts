import { ProjectConfig } from '../types/projectTypes';
import { getDependencies, getDevDependencies } from './dependencies';
import { getAuthSetup } from './authSetup';
import { version } from 'os';

export const generatePackageJson = (config: ProjectConfig) => {
  const authSetup = getAuthSetup(config.auth);
  
  const frameworkVersions: Record<string, string> = {
    nextjs: "0.1.0",
    vite: "0.0.0",
  };

  // Define types for each framework
  const frameworkTypes: Record<string, string | undefined> = {
    vite: "module",
    nextjs: undefined,
  };

   // Define scripts based on framework
   const scripts: Record<string, string | undefined> = {
    dev: config.framework === "nextjs" ? "next dev" : "vite",
    build: config.framework === "nextjs" ? "next build" : 
           config.framework === "remix" ? "remix build" : 
           "tsc -b && vite build", // Default for Vite
    start: config.framework === "nextjs" ? "next start" : 
           config.framework === "remix" ? "remix start" : 
           "vite preview", // Default for Vite
    lint: (() => {
      if (config.framework === "vite") {
        return "eslint .";
      } else if (config.framework === "nextjs" && config.styling === "css") {
        return "next lint";
      } else if (config.framework === "remix") {
        return "eslint ."; 
      }
      return undefined; // No linting command for other frameworks or styles
    })(),
  };

  return {
    name: `my-${config.framework}-project` || "project-by-emmanuel-ekpo",
    version: frameworkVersions[config.framework] || "0.0.0",
    private: true,
    type: frameworkTypes[config.framework],
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