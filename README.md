# mvp

**Less setting up. More getting somewhere.**

![mvp landing page preview](./docs/assets/mvp-portfolio-v3-lime.png)

`mvp` turns four stack choices into a starter project you can download, inspect, and own.

Choose a framework, authentication provider, database, and styling approach. The builder connects the relevant dependencies, providers, environment placeholders, and starter files into one zip.

No account. No subscription. No hosted runtime between you and your code.

## What you can build

| Layer | Options |
| --- | --- |
| Framework | Next.js, Vite, Remix, React.js |
| Authentication | None, Clerk, Auth0, Firebase, Supabase |
| Database | None, Supabase, Firebase, MongoDB, Xata |
| Styling | Tailwind CSS, Bootstrap, plain CSS |

Every option keeps its native value throughout the builder and generator. A generated project is ordinary source code with no proprietary wrapper.

## How it works

1. Open the builder at `/generate`.
2. Choose one option in each step.
3. Review the complete stack.
4. Download the generated zip.
5. Add service credentials and start building.

Generation runs in the browser with JSZip. The selected configuration becomes a project file map, then a downloadable archive.

## Inside the zip

Output changes with the selected stack. A starter can include:

- framework entry points and configuration;
- authentication providers and middleware;
- database clients and a connection check;
- styling configuration and global styles;
- `.env.example` with required variable names;
- dependency versions selected for the generated stack;
- a setup-focused `README.md`.

The preview in the builder is illustrative. The downloaded archive is produced from the real generator file map.

## Run locally

Requirements:

- Node.js 20 or newer
- npm

```bash
git clone https://github.com/Ekpo-Emmanuel/mvp-generator.git
cd mvp-generator
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev          # Start the development server
npm run build        # Create a production build
npm run start        # Serve the production build
npm run lint         # Lint application and landing/builder code
npm run smoke        # Validate generated project combinations
npm run smoke:build  # Validate and build generated projects
```

## Project map

```text
app/
  page.tsx                 Landing page
  generate/                Builder route
  api/generate/            Server-side zip endpoint
components/
  landing/                 Landing-page presentation
  builder/                 Builder presentation and interaction
utils/
  projectGenerator.ts      Browser zip orchestration
  generate/projectFiles.ts Source-of-truth project file map
  generate/                Framework and integration generators
scripts/
  smoke-kits.ts            Generated-project smoke coverage
```

The generator is configuration-driven:

```ts
type ProjectConfig = {
  framework: string;
  auth: string;
  database: string;
  styling: string;
};
```

Defaults are normalized to Next.js, no authentication, no database, and Tailwind CSS when a partial configuration reaches the generator directly.

## Working on the generator

Keep option values stable. They are part of the contract between the UI, file generator, and API route.

When adding an integration:

1. add its dependencies and files;
2. add required environment placeholders;
3. preserve existing combinations;
4. extend the smoke matrix;
5. generate a project and run it locally.

Do not treat a successful zip download as proof that the generated project works. Run the smoke suite and inspect the emitted files.

## After downloading a starter

```bash
unzip <project>.zip
cd <project>
cp .env.example .env.local # Next.js
# Use .env for other frameworks.
npm install
npm run dev
```

Only copy the environment file when the selected integrations require one. Replace its placeholders with keys from your own provider dashboards.

## Contributing

Focused fixes and new stack combinations are welcome. Open an issue before a broad generator change so option values and compatibility stay coordinated.

Repository: [github.com/Ekpo-Emmanuel/mvp-generator](https://github.com/Ekpo-Emmanuel/mvp-generator)

## License

[MIT](./LICENSE)
