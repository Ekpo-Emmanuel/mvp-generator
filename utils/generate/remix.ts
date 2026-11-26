import { ProjectConfig } from "@/types/project";
import { trimFile, usesTailwind } from "./kind";

export function remixFiles(config: ProjectConfig): Record<string, string> {
  const bootstrap = config.styling === "bootstrap";
  const files: Record<string, string> = {
    "vite.config.ts": trimFile(`
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [remix()],
});
`),
    "tsconfig.json": trimFile(`
{
  "include": ["env.d.ts", "**/*.ts", "**/*.tsx"],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "isolatedModules": true,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "target": "ES2022",
    "strict": true,
    "skipLibCheck": true,
    "paths": { "~/*": ["./app/*"] },
    "noEmit": true
  }
}
`),
    "env.d.ts": trimFile(`
/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />
`),
    "app/entry.client.tsx": trimFile(`
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
`),
    "app/entry.server.tsx": trimFile(`
import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
`),
    "app/root.tsx": trimFile(`
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "./styles.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${bootstrap ? '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />' : ""}
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
`),
    "app/routes/_index.tsx": trimFile(`
export default function Index() {
  return (
    <main>
      <h1>Remix app</h1>
      <p>Auth: ${config.auth} / Database: ${config.database} / Styling: ${config.styling}</p>
    </main>
  );
}
`),
    ".gitignore": trimFile(`
node_modules
.cache
build
.env
`),
  };

  const bootstrapImport =
    config.styling === "bootstrap"
      ? '@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");\n\n'
      : "";

  files["app/styles.css"] = usesTailwind(config.styling)
    ? trimFile(`
${bootstrapImport}@tailwind base;
@tailwind components;
@tailwind utilities;
`)
    : trimFile(`
${bootstrapImport}body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
`);

  if (usesTailwind(config.styling)) {
    files["tailwind.config.ts"] = trimFile(`
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
} satisfies Config;
`);
    files["postcss.config.mjs"] = trimFile(`
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`);
  }

  return files;
}
