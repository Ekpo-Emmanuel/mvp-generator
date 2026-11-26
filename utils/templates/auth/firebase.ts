import { AuthSetup } from "@/types/project";
import { isSpa } from "@/utils/generate/kind";
import { authClientPrefix, authLibDir, firebaseEnvExpr } from "./paths";

export const generateFirebaseSetup = (framework: string): AuthSetup => {
  const spa = isSpa(framework);
  const remix = framework === "remix";
  const libPath = `${authLibDir(framework)}/firebase.ts`;
  const pagePath = spa
    ? "src/pages/SignIn.tsx"
    : remix
      ? "app/routes/sign-in.tsx"
      : "app/sign-in/page.tsx";
  const importPath = spa ? "../lib/firebase" : remix ? "~/lib/firebase" : "@/lib/firebase";
  const useClient = spa || !remix ? `"use client";\n\n` : "";

  const page = `${useClient}import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "${importPath}";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Signed in");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Sign in failed");
    }
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
`;

  const envPrefix = authClientPrefix(framework);

  return {
    files: {
      [libPath]: `import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: ${firebaseEnvExpr(framework, "API_KEY")},
  authDomain: ${firebaseEnvExpr(framework, "AUTH_DOMAIN")},
  projectId: ${firebaseEnvExpr(framework, "PROJECT_ID")},
  storageBucket: ${firebaseEnvExpr(framework, "STORAGE_BUCKET")},
  messagingSenderId: ${firebaseEnvExpr(framework, "MESSAGING_SENDER_ID")},
  appId: ${firebaseEnvExpr(framework, "APP_ID")},
};

export const firebaseApp = getApps().length === 0 ? initializeApp({
  apiKey: firebaseConfig.apiKey || "demo",
  authDomain: firebaseConfig.authDomain || "demo.firebaseapp.com",
  projectId: firebaseConfig.projectId || "demo",
  storageBucket: firebaseConfig.storageBucket || "demo.appspot.com",
  messagingSenderId: firebaseConfig.messagingSenderId || "0",
  appId: firebaseConfig.appId || "demo",
}) : getApps()[0];
export const auth = getAuth(firebaseApp);
`,
      [pagePath]: page,
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
      <h1>Remix + Firebase</h1>
      <Link to="/sign-in">Sign in</Link>
    </main>
  );
}
`,
            }
          : {}),
    },
    env: {
      [`${envPrefix}_FIREBASE_API_KEY`]: "your_api_key",
      [`${envPrefix}_FIREBASE_AUTH_DOMAIN`]: "your_auth_domain",
      [`${envPrefix}_FIREBASE_PROJECT_ID`]: "your_project_id",
      [`${envPrefix}_FIREBASE_STORAGE_BUCKET`]: "your_storage_bucket",
      [`${envPrefix}_FIREBASE_MESSAGING_SENDER_ID`]: "your_messaging_sender_id",
      [`${envPrefix}_FIREBASE_APP_ID`]: "your_app_id",
    },
    dependencies: {
      firebase: "^11.0.0",
    },
    devDependencies: {},
  };
};
