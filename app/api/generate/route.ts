import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import { generateTemplate } from '@/templates/generateTemplate';
import { ProjectConfig } from '@/types/project';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const config = (await req.json()) as ProjectConfig; // Parse incoming request body
    console.log('Received project configuration:', config);

    const zip = new JSZip();
    const files = generateTemplate(config);

    // Add generated files to ZIP archive
    files.forEach((content, path) => {
      zip.file(path, content);
    });

    // Generate README.md dynamically
    const readme = `# ${config.framework} Project

## Features

- Framework: ${config.framework}
${config.authentication ? `- Authentication: ${config.authentication.join(', ')}\n` : ''}
- Database: ${config.database}
- Styling: ${config.styling}

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`
`;

    zip.file('README.md', readme);

    // Generate ZIP file as a Node.js Buffer
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=${config.framework || 'project'}.zip`,
      },
    });
  } catch (error) {
    console.error('Error generating project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
