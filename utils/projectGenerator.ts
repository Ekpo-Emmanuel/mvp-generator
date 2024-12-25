import JSZip from 'jszip';
import { ProjectConfig } from './types/projectTypes';
import { generatePackageJson } from './project/packageJsonGenerator';
import { getAuthSetup } from './project/authSetup';

export const generateProjectFiles = async (config: ProjectConfig): Promise<Blob> => {
  const zip = new JSZip();
  const authSetup = getAuthSetup(config.auth);

  // Add package.json
  zip.file("package.json", JSON.stringify(generatePackageJson(config), null, 2));

  // Add auth-specific files
  Object.entries(authSetup.files).forEach(([path, content]) => {
    zip.file(path, content);
  });

  // Add .env.example with auth configuration
  const envContent = Object.entries(authSetup.env)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  zip.file('.env.example', envContent);

  // Add README with auth setup instructions
  const readmeContent = `# Generated Project

## Tech Stack
- Framework: ${config.framework}
- Authentication: ${config.auth}
- Database: ${config.database}
- Styling: ${config.styling}

## Getting Started

1. Copy \`.env.example\` to \`.env.local\` or \`.env\` and update the values with your ${config.auth} credentials.

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## Authentication Setup

### ${config.auth} Configuration
1. Create a ${config.auth} account and project
2. Copy your ${config.auth} credentials to \`.env.local\` or \`.env\`
3. Update any necessary configuration in \`src/lib/auth.ts\`

## Project Structure

- \`pages/\`: Application pages
- \`components/\`: Reusable components
- \`lib/\`: Utility functions and configurations
- \`styles/\`: Global styles
- \`public/\`: Static assets

## Authentication Routes

- \`/auth/signin\`: Sign in page
- \`/auth/signup\`: Sign up page (if applicable)
- \`/dashboard\`: Protected dashboard page
`;

  zip.file("README.md", readmeContent);

  // Add TypeScript configuration
  zip.file("tsconfig.json", `
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
  `);

  return await zip.generateAsync({ type: "blob" });
};