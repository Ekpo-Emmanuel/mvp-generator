import { AuthSetup } from '../../types/projectTypes';

export const generateFirebaseSetup = (): AuthSetup => ({
  files: {
    'src/lib/firebase.ts': `
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);`,
    'src/components/auth/SignIn.tsx': `
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="block w-full rounded-md border p-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="block w-full rounded-md border p-2"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}`,
  },
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: 'your_api_key',
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'your_auth_domain',
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'your_project_id',
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'your_storage_bucket',
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: 'your_messaging_sender_id',
    NEXT_PUBLIC_FIREBASE_APP_ID: 'your_app_id',
  },
  dependencies: {
    'firebase': '^10.1.0',
  },
  devDependencies: {}
});