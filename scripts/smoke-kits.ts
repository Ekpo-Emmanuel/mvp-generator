import { mkdirSync, writeFileSync, rmSync } from "fs";
import { tmpdir } from "os";
import { dirname, join } from "path";
import { spawnSync } from "child_process";
import { generateProjectFileMap } from "../utils/generate/projectFiles";
import { ProjectConfig } from "../types/project";

const frameworks = ["nextjs", "vite", "remix", "manual"] as const;
const auths = ["none", "clerk", "auth0", "firebase", "supabase"] as const;
const databases = ["none", "supabase", "firebase", "mongodb", "xata"] as const;
const stylings = ["tailwind", "bootstrap", "css"] as const;

const buildKits: { name: string; config: ProjectConfig }[] = [
  { name: "nextjs-none-none-css", config: { framework: "nextjs", auth: "none", database: "none", styling: "css" } },
  { name: "nextjs-none-none-tailwind", config: { framework: "nextjs", auth: "none", database: "none", styling: "tailwind" } },
  { name: "nextjs-clerk-none-css", config: { framework: "nextjs", auth: "clerk", database: "none", styling: "css" } },
  { name: "vite-none-none-css", config: { framework: "vite", auth: "none", database: "none", styling: "css" } },
  { name: "remix-none-none-css", config: { framework: "remix", auth: "none", database: "none", styling: "css" } },
];

function requiredPaths(config: ProjectConfig) {
  const paths = ["package.json", "README.md", ".env.example"];
  if (config.framework === "nextjs") {
    paths.push("app/page.tsx", "app/layout.tsx", "app/globals.css");
  } else if (config.framework === "remix") {
    paths.push("app/root.tsx", "app/routes/_index.tsx", "app/styles.css");
  } else {
    paths.push("index.html", "src/main.tsx", "src/App.tsx");
  }
  if (config.styling === "tailwind") {
    paths.push("tailwind.config.ts");
  }
  if (config.auth === "clerk" && config.framework === "nextjs") {
    paths.push("middleware.ts");
  }
  if (config.database === "mongodb" && config.framework === "nextjs") {
    paths.push("app/api/db/ping/route.ts", "lib/mongodb.ts");
  }
  return paths;
}

function assertCombo(config: ProjectConfig) {
  const files = generateProjectFileMap(config);
  const pkg = JSON.parse(files["package.json"] || "null");
  if (!pkg?.dependencies?.react) {
    throw new Error(`Missing react in ${JSON.stringify(config)}`);
  }
  if (!pkg.scripts?.dev || !pkg.scripts?.build) {
    throw new Error(`Missing scripts in ${JSON.stringify(config)}`);
  }
  for (const path of requiredPaths(config)) {
    if (!files[path]) {
      throw new Error(`Missing ${path} in ${JSON.stringify(config)}`);
    }
  }
  for (const [path, content] of Object.entries(files)) {
    if (path.endsWith(".json")) continue;
    if (content.trimStart().startsWith("{") && path.endsWith(".tsx")) {
      throw new Error(`Broken TSX start in ${path} for ${JSON.stringify(config)}`);
    }
  }
  return files;
}

function writeKit(root: string, files: Record<string, string>) {
  mkdirSync(root, { recursive: true });
  for (const [path, content] of Object.entries(files)) {
    const full = join(root, path);
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, content);
  }
  if (files[".env.example"]) {
    const envName = files["next.config.ts"] ? ".env.local" : ".env";
    writeFileSync(join(root, envName), files[".env.example"]);
  }
}

let count = 0;
for (const framework of frameworks) {
  for (const auth of auths) {
    for (const database of databases) {
      for (const styling of stylings) {
        assertCombo({ framework, auth, database, styling });
        count += 1;
      }
    }
  }
}

console.log(`asserted ${count} kit combinations`);

const outRoot = join(tmpdir(), "mvp-generator-smoke-kits");
mkdirSync(outRoot, { recursive: true });

for (const kit of buildKits) {
  writeKit(join(outRoot, kit.name), assertCombo(kit.config));
  console.log(`wrote ${kit.name}`);
}

const shouldBuild = process.argv.includes("--build");
if (!shouldBuild) {
  process.exit(0);
}

const onlyIndex = process.argv.indexOf("--only");
const onlyName = onlyIndex >= 0 ? process.argv[onlyIndex + 1] : "";
const kitsToBuild = onlyName ? buildKits.filter((kit) => kit.name === onlyName) : buildKits;

for (const kit of kitsToBuild) {
  const dir = join(outRoot, kit.name);
  console.log(`\n=== build ${kit.name} ===`);
  const install = spawnSync("npm", ["install", "--no-audit", "--no-fund", "--prefer-offline"], {
    cwd: dir,
    stdio: "inherit",
    shell: true,
  });
  if (install.status !== 0) {
    throw new Error(`npm install failed for ${kit.name}`);
  }
  const build = spawnSync("npm", ["run", "build"], { cwd: dir, stdio: "inherit", shell: true });
  if (build.status !== 0) {
    throw new Error(`npm run build failed for ${kit.name}`);
  }
}

console.log("\nall sample kits built");
