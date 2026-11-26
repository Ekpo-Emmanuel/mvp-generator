import { AuthSetup } from "@/types/project";
import { isSpa } from "@/utils/generate/kind";

export const generateClerkSetup = (framework: string): AuthSetup => {
  if (isSpa(framework)) {
    return {
      files: {
        "src/main.tsx": `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!publishableKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  </StrictMode>
);
`,
        "src/App.tsx": `import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function App() {
  return (
    <main>
      <h1>React + Clerk</h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </main>
  );
}
`,
      },
      env: {
        VITE_CLERK_PUBLISHABLE_KEY: "pk_test_Y2xlcmsuZXhhbXBsZS5jb20k",
      },
      dependencies: {
        "@clerk/clerk-react": "^5.25.0",
      },
      devDependencies: {},
    };
  }

  if (framework === "remix") {
    return {
      files: {
        "app/root.tsx": `import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp } from "@clerk/remix";
import type { LoaderFunctionArgs } from "@remix-run/node";
import "./styles.css";

export const loader = (args: LoaderFunctionArgs) => rootAuthLoader(args);

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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

export default ClerkApp(App);
`,
        "app/routes/_index.tsx": `import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/remix";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main>
      <h1>Remix + Clerk</h1>
      <SignedOut>
        <SignInButton />
        <Link to="/sign-up">Sign up</Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Link to="/dashboard">Dashboard</Link>
      </SignedIn>
    </main>
  );
}
`,
        "app/routes/sign-in.$.tsx": `import { SignIn } from "@clerk/remix";

export default function SignInPage() {
  return <SignIn />;
}
`,
        "app/routes/sign-up.$.tsx": `import { SignUp } from "@clerk/remix";

export default function SignUpPage() {
  return <SignUp />;
}
`,
        "app/routes/dashboard.tsx": `import { UserButton } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args);
  if (!userId) return redirect("/sign-in");
  return null;
}

export default function Dashboard() {
  return (
    <main>
      <p>Signed in</p>
      <UserButton />
    </main>
  );
}
`,
      },
      env: {
        CLERK_PUBLISHABLE_KEY: "pk_test_Y2xlcmsuZXhhbXBsZS5jb20k",
        CLERK_SECRET_KEY: "REPLACE_ME_CLERK_SECRET",
      },
      dependencies: {
        "@clerk/remix": "^4.4.0",
      },
      devDependencies: {},
    };
  }

  return {
    files: {
      "app/(auth)/sign-in/[[...sign-in]]/page.tsx": `import { SignIn } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
`,
      "app/(auth)/sign-up/[[...sign-up]]/page.tsx": `import { SignUp } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp />
    </div>
  );
}
`,
      "app/dashboard/page.tsx": `import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) return null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p>Signed in as {userId}</p>
      <UserButton />
    </div>
  );
}
`,
      "middleware.ts": `import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
`,
    },
    env: {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_Y2xlcmsuZXhhbXBsZS5jb20k",
      CLERK_SECRET_KEY: "REPLACE_ME_CLERK_SECRET",
      NEXT_PUBLIC_CLERK_SIGN_IN_URL: "/sign-in",
      NEXT_PUBLIC_CLERK_SIGN_UP_URL: "/sign-up",
      NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: "/dashboard",
      NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: "/dashboard",
    },
    dependencies: {
      "@clerk/nextjs": "^6.12.0",
    },
    devDependencies: {},
  };
};
