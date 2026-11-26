import { generateClerkSetup } from "../templates/auth/clerk";
import { generateFirebaseSetup } from "../templates/auth/firebase";
import { generateSupabaseSetup } from "../templates/auth/supabase";
import { generateAuth0Setup } from "../templates/auth/auth0";
import { AuthSetup } from "@/types/project";

export const getAuthSetup = (authProvider: string, framework = "nextjs"): AuthSetup => {
  switch (authProvider) {
    case "clerk":
      return generateClerkSetup(framework);
    case "firebase":
      return generateFirebaseSetup(framework);
    case "supabase":
      return generateSupabaseSetup(framework);
    case "auth0":
      return generateAuth0Setup(framework);
    default:
      return { files: {}, env: {}, dependencies: {}, devDependencies: {} };
  }
};
