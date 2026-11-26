import { AuthSetup } from "@/types/project";
import { isNext, isSpa } from "@/utils/generate/kind";
import { authClientPrefix, authLibDir } from "./paths";

export const generateSupabaseSetup = (framework: string): AuthSetup => {
  const spa = isSpa(framework);
  const remix = framework === "remix";
  const libPath = `${authLibDir(framework)}/supabase.ts`;
  const pagePath = spa
    ? "src/pages/SignIn.tsx"
    : remix
      ? "app/routes/sign-in.tsx"
      : "app/sign-in/page.tsx";
  const importPath = spa ? "../lib/supabase" : remix ? "~/lib/supabase" : "@/lib/supabase";
  const urlExpr = isNext(framework)
    ? "process.env.NEXT_PUBLIC_SUPABASE_URL"
    : "import.meta.env.VITE_SUPABASE_URL";
  const keyExpr = isNext(framework)
    ? "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY"
    : "import.meta.env.VITE_SUPABASE_ANON_KEY";
  const useClient = remix ? "" : `"use client";\n\n`;
  const envPrefix = authClientPrefix(framework);

  return {
    files: {
      [libPath]: `import { createClient } from "@supabase/supabase-js";

const url = ${urlExpr};
const anonKey = ${keyExpr};

export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key"
);
`,
      [pagePath]: `${useClient}import { useState } from "react";
import { supabase } from "${importPath}";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : "Signed in");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Sign In</button>
        {message ? <p>{message}</p> : null}
      </form>
    </div>
  );
}
`,
      ...(spa
        ? {
            "src/App.tsx": `import SignInPage from "./pages/SignIn";

export default function App() {
  return <SignInPage />;
}
`,
          }
        : remix
          ? {
              "app/routes/_index.tsx": `import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main>
      <h1>Remix + Supabase</h1>
      <Link to="/sign-in">Sign in</Link>
    </main>
  );
}
`,
            }
          : {}),
    },
    env: {
      [`${envPrefix}_SUPABASE_URL`]: "your_supabase_url",
      [`${envPrefix}_SUPABASE_ANON_KEY`]: "your_supabase_anon_key",
    },
    dependencies: {
      "@supabase/supabase-js": "^2.47.0",
    },
    devDependencies: {},
  };
};
