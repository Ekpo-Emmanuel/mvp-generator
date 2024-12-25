import { AuthSetup } from '../../types/projectTypes';

export const generateSupabaseSetup = (): AuthSetup => ({
  files: {
    'src/lib/supabase.ts': `
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);`,
    'src/components/auth/SignIn.tsx': `
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
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
    NEXT_PUBLIC_SUPABASE_URL: 'your_supabase_url',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'your_supabase_anon_key',
  },
  dependencies: {
    '@supabase/supabase-js': '^2.31.0',
  },
  devDependencies: {}
});