import JSZip from "jszip";
import { ProjectConfig } from "@/types/project";
import { generateProjectFileMap } from "./generate/projectFiles";

export function normalizeConfig(raw: Partial<ProjectConfig> & { authentication?: string | string[] }): ProjectConfig {
  const authValue = Array.isArray(raw.authentication)
    ? raw.authentication[0]
    : raw.authentication ?? raw.auth;

  return {
    framework: raw.framework || "nextjs",
    auth: authValue || "none",
    database: raw.database || "none",
    styling: raw.styling || "tailwind",
  };
}

export const generateProjectFiles = async (config: ProjectConfig): Promise<Blob> => {
  const zip = new JSZip();
  const files = generateProjectFileMap(normalizeConfig(config));
  Object.entries(files).forEach(([path, content]) => {
    zip.file(path, content);
  });
  return zip.generateAsync({ type: "blob" });
};
