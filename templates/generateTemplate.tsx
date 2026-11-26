import { ProjectConfig } from "@/types/project";
import { generateProjectFileMap } from "@/utils/generate/projectFiles";
import { normalizeConfig } from "@/utils/projectGenerator";

export const generateTemplate = (config: ProjectConfig | Record<string, unknown>): Map<string, string> => {
  const files = generateProjectFileMap(normalizeConfig(config));
  return new Map(Object.entries(files));
};
