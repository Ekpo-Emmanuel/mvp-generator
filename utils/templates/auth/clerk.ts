import { AuthSetup } from '../../types/projectTypes';

export const generateClerkSetup = (): AuthSetup => ({
  files: {
    'app/(auth)/sign-in/[[...sign-in]]/page.tsx': `
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="flex justify-center">
        <SignIn />
      </div>
    </>
  );
}`,
    'app/(auth)/sign-up/[[...sign-up]]/page.tsx': `
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="flex justify-center">
        <SignUp />
      </div>
    </>
  );
}`,
    'app/dashboard/page.tsx': `
import { auth } from "@clerk/nextjs/server";
import {
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) return null;

  console.log(userId) // check terminal for userInfo

  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center space-y-2">
        <p>If youre on this page then you're successfully authenticated :)</p>
        <div className="flex items-center gap-2">
          <UserButton />
          <SignedOut>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Sign out
            </button>
          </SignedOut>
        </div>
      </div>
    </>
  )
}`,
    'app/layout.tsx': `{
import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import clsx from "clsx"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={clsx(inter.className, antialiased)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

}`,
    'middleware.ts': `
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)', 
  '/sign-up(.*)',
  // Add other public routes here
])

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect()
    }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};`,
  },
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'your_publishable_key',
    CLERK_SECRET_KEY: 'your_secret_key',
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: '/sign-in',
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: '/sign-up',
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: '/dashboard',
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: '/dashboard',
  },
  dependencies: {
    '@clerk/nextjs': '^4.6.0',
  },
  devDependencies: {}
});