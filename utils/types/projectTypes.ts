export interface ProjectConfig {
  framework: string;
  auth: string;
  database: string;
  styling: string;
}

export interface AuthSetup {
  files: Record<string, string>;
  env: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}