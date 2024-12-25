import { generateClerkSetup } from '../templates/auth/clerk';
import { generateFirebaseSetup } from '../templates/auth/firebase';
import { generateSupabaseSetup } from '../templates/auth/supabase';
import { generateAuth0Setup } from '../templates/auth/auth0';
import { AuthSetup } from '../types/projectTypes';

export const getAuthSetup = (authProvider: string): AuthSetup => {
  switch (authProvider) {
    case 'clerk':
      return generateClerkSetup();
    case 'firebase':
      return generateFirebaseSetup();
    case 'supabase':
      return generateSupabaseSetup();
    case 'auth0':
      return generateAuth0Setup();
    default:
      return { files: {}, env: {}, dependencies: {}, devDependencies: {} };
  }
};