import { isNext, isSpa } from "@/utils/generate/kind";

export function authClientPrefix(framework: string) {
  return isNext(framework) ? "NEXT_PUBLIC" : "VITE";
}

export function authLibDir(framework: string) {
  if (isSpa(framework)) return "src/lib";
  if (isNext(framework)) return "lib";
  return "app/lib";
}

export function firebaseEnvExpr(framework: string, key: string) {
  return isNext(framework)
    ? `process.env.NEXT_PUBLIC_FIREBASE_${key}`
    : `import.meta.env.VITE_FIREBASE_${key}`;
}
