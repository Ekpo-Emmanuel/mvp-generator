import { AuthSetup } from '../../types/projectTypes';

export const generateAuth0Setup = (): AuthSetup => ({
  files: {
    'src/lib/auth0.ts': `
import { getSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isAuthenticated = !!session;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  if (isAuthPage) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}`,
    'src/components/auth/SignIn.tsx': `
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@/components/ui/button';

export default function SignIn() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4">
        {!user ? (
          <Button asChild>
            <a href="/api/auth/login">Sign In with Auth0</a>
          </Button>
        ) : (
          <Button asChild>
            <a href="/api/auth/logout">Sign Out</a>
          </Button>
        )}
      </div>
    </div>
  );
}`,
  },
  env: {
    AUTH0_SECRET: 'your_auth0_secret',
    AUTH0_BASE_URL: 'your_auth0_base_url',
    AUTH0_ISSUER_BASE_URL: 'your_auth0_issuer_base_url',
    AUTH0_CLIENT_ID: 'your_auth0_client_id',
    AUTH0_CLIENT_SECRET: 'your_auth0_client_secret',
  },
  dependencies: {
    '@auth0/nextjs-auth0': '^3.1.0',
  },
  devDependencies: {}
});