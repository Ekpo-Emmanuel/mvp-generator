import { AuthSetup } from "@/types/project";
import { isSpa } from "@/utils/generate/kind";

export const generateAuth0Setup = (framework: string): AuthSetup => {
  if (isSpa(framework)) {
    return {
      files: {
        "src/main.tsx": `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
`,
        "src/App.tsx": `import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <main>
      <h1>React + Auth0</h1>
      {isAuthenticated ? (
        <>
          <p>{user?.email}</p>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log out
          </button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}
    </main>
  );
}
`,
      },
      env: {
        VITE_AUTH0_DOMAIN: "your_auth0_domain",
        VITE_AUTH0_CLIENT_ID: "your_auth0_client_id",
      },
      dependencies: {
        "@auth0/auth0-react": "^2.2.4",
      },
      devDependencies: {},
    };
  }

  if (framework === "remix") {
    return {
      files: {
        "app/entry.client.tsx": `import { RemixBrowser } from "@remix-run/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        <RemixBrowser />
      </Auth0Provider>
    </StrictMode>
  );
});
`,
        "app/routes/_index.tsx": `import { useAuth0 } from "@auth0/auth0-react";

export default function Index() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return (
    <main>
      <h1>Remix + Auth0</h1>
      {isAuthenticated ? (
        <>
          <p>{user?.email}</p>
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log out</button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}
    </main>
  );
}
`,
      },
      env: {
        VITE_AUTH0_DOMAIN: "your_auth0_domain",
        VITE_AUTH0_CLIENT_ID: "your_auth0_client_id",
      },
      dependencies: {
        "@auth0/auth0-react": "^2.2.4",
      },
      devDependencies: {},
    };
  }

  return {
    files: {
      "app/api/auth/[auth0]/route.ts": `import { handleAuth } from "@auth0/nextjs-auth0";

export const GET = handleAuth();
`,
      "app/dashboard/page.tsx": `import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) {
    redirect("/api/auth/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p>Signed in as {session.user.email}</p>
      <a href="/api/auth/logout">Log out</a>
    </div>
  );
}
`,
    },
    env: {
      AUTH0_SECRET: "use_openssl_rand_hex_32",
      AUTH0_BASE_URL: "http://localhost:3000",
      AUTH0_ISSUER_BASE_URL: "https://your-tenant.auth0.com",
      AUTH0_CLIENT_ID: "your_auth0_client_id",
      AUTH0_CLIENT_SECRET: "your_auth0_client_secret",
    },
    dependencies: {
      "@auth0/nextjs-auth0": "^3.5.0",
    },
    devDependencies: {},
  };
};
