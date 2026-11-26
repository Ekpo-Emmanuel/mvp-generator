import { ProjectConfig } from "@/types/project";
import { isNext, isRemix, isSpa, trimFile } from "./kind";

export function databaseEnv(config: ProjectConfig): Record<string, string> {
  const client = isNext(config.framework) ? "NEXT_PUBLIC" : "VITE";

  switch (config.database) {
    case "supabase":
      return {
        [`${client}_SUPABASE_URL`]: "your_supabase_url",
        [`${client}_SUPABASE_ANON_KEY`]: "your_supabase_anon_key",
      };
    case "mongodb":
      return { MONGODB_URI: "mongodb://127.0.0.1:27017/app" };
    case "firebase":
      return {
        [`${client}_FIREBASE_API_KEY`]: "your_api_key",
        [`${client}_FIREBASE_AUTH_DOMAIN`]: "your_auth_domain",
        [`${client}_FIREBASE_PROJECT_ID`]: "your_project_id",
        [`${client}_FIREBASE_STORAGE_BUCKET`]: "your_storage_bucket",
        [`${client}_FIREBASE_MESSAGING_SENDER_ID`]: "your_messaging_sender_id",
        [`${client}_FIREBASE_APP_ID`]: "your_app_id",
      };
    case "xata":
      return {
        XATA_API_KEY: "your_xata_api_key",
        XATA_BRANCH: "main",
        XATA_DATABASE_URL: "https://your-workspace.xata.sh/db/your-db",
      };
    default:
      return {};
  }
}

function mongoClientModule() {
  return trimFile(`
import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClient() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI");
  }
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}
`);
}

function xataModule() {
  return trimFile(`
export function getXataConfig() {
  const apiKey = process.env.XATA_API_KEY;
  const databaseUrl = process.env.XATA_DATABASE_URL;
  const branch = process.env.XATA_BRANCH ?? "main";
  if (!apiKey || !databaseUrl) {
    throw new Error("Missing XATA_API_KEY or XATA_DATABASE_URL");
  }
  return { apiKey, databaseUrl, branch };
}

export async function xataSql(statement: string, params: unknown[] = []) {
  const { apiKey, databaseUrl, branch } = getXataConfig();
  const response = await fetch(\`\${databaseUrl}/sql\`, {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${apiKey}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ statement, params, branch }),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
}
`);
}

function firebaseDbModule(config: ProjectConfig) {
  const key = (name: string) =>
    isNext(config.framework)
      ? `process.env.NEXT_PUBLIC_FIREBASE_${name}`
      : `import.meta.env.VITE_FIREBASE_${name}`;

  return trimFile(`
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: ${key("API_KEY")},
  authDomain: ${key("AUTH_DOMAIN")},
  projectId: ${key("PROJECT_ID")},
  storageBucket: ${key("STORAGE_BUCKET")},
  messagingSenderId: ${key("MESSAGING_SENDER_ID")},
  appId: ${key("APP_ID")},
};

export const firebaseApp = getApps().length === 0
  ? initializeApp({
      apiKey: firebaseConfig.apiKey || "demo",
      authDomain: firebaseConfig.authDomain || "demo.firebaseapp.com",
      projectId: firebaseConfig.projectId || "demo",
      storageBucket: firebaseConfig.storageBucket || "demo.appspot.com",
      messagingSenderId: firebaseConfig.messagingSenderId || "0",
      appId: firebaseConfig.appId || "demo",
    })
  : getApps()[0];
export const db = getFirestore(firebaseApp);
`);
}

function supabaseModule(config: ProjectConfig) {
  const url = isNext(config.framework)
    ? "process.env.NEXT_PUBLIC_SUPABASE_URL"
    : "import.meta.env.VITE_SUPABASE_URL";
  const key = isNext(config.framework)
    ? "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY"
    : "import.meta.env.VITE_SUPABASE_ANON_KEY";

  return trimFile(`
import { createClient } from "@supabase/supabase-js";

const url = ${url};
const anonKey = ${key};

export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key"
);
`);
}

function spaServer(config: ProjectConfig) {
  if (!isSpa(config.framework)) return {};
  if (config.database !== "mongodb" && config.database !== "xata") return {};

  const extraImport =
    config.database === "mongodb"
      ? 'import { getMongoClient } from "./mongodb";'
      : 'import { getXataConfig } from "./xata";';

  const handler =
    config.database === "mongodb"
      ? `app.get("/api/db/ping", async (_req, res) => {
  const client = await getMongoClient();
  await client.db().command({ ping: 1 });
  res.json({ ok: true, database: "mongodb" });
});`
      : `app.get("/api/db/ping", async (_req, res) => {
  getXataConfig();
  res.json({ ok: true, database: "xata" });
});`;

  return {
    "server/index.ts": trimFile(`
import "dotenv/config";
import express from "express";
import cors from "cors";
${extraImport}

const app = express();
app.use(cors());
app.use(express.json());

${handler}

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
  console.log(\`API listening on http://localhost:\${port}\`);
});
`),
  };
}

export function databaseFiles(config: ProjectConfig): Record<string, string> {
  if (config.database === "none") return {};

  const files: Record<string, string> = {};
  const libDir = isSpa(config.framework) ? "src/lib" : isRemix(config.framework) ? "app/lib" : "lib";

  if (config.database === "mongodb") {
    files[`${isSpa(config.framework) ? "server" : libDir}/mongodb.ts`] = mongoClientModule();
    if (isNext(config.framework)) {
      files["app/api/db/ping/route.ts"] = trimFile(`
import { getMongoClient } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await getMongoClient();
  await client.db().command({ ping: 1 });
  return NextResponse.json({ ok: true, database: "mongodb" });
}
`);
    }
    if (isRemix(config.framework)) {
      files["app/routes/api.db.ping.ts"] = trimFile(`
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getMongoClient } from "~/lib/mongodb";

export async function loader(_args: LoaderFunctionArgs) {
  const client = await getMongoClient();
  await client.db().command({ ping: 1 });
  return json({ ok: true, database: "mongodb" });
}
`);
    }
  }

  if (config.database === "xata") {
    files[`${isSpa(config.framework) ? "server" : libDir}/xata.ts`] = xataModule();
    if (isNext(config.framework)) {
      files["app/api/db/ping/route.ts"] = trimFile(`
import { getXataConfig } from "@/lib/xata";
import { NextResponse } from "next/server";

export async function GET() {
  getXataConfig();
  return NextResponse.json({ ok: true, database: "xata" });
}
`);
    }
    if (isRemix(config.framework)) {
      files["app/routes/api.db.ping.ts"] = trimFile(`
import { json } from "@remix-run/node";
import { getXataConfig } from "~/lib/xata";

export async function loader() {
  getXataConfig();
  return json({ ok: true, database: "xata" });
}
`);
    }
  }

  if (config.database === "supabase" && config.auth !== "supabase") {
    files[`${libDir}/supabase.ts`] = supabaseModule(config);
  }

  if (config.database === "firebase" && config.auth !== "firebase") {
    files[`${libDir}/firebase.ts`] = firebaseDbModule(config);
  }

  Object.assign(files, spaServer(config));
  return files;
}
