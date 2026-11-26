export function isSpa(framework: string) {
  return framework === "vite" || framework === "manual";
}

export function isRemix(framework: string) {
  return framework === "remix";
}

export function isNext(framework: string) {
  return framework === "nextjs";
}

export function trimFile(content: string) {
  return content.replace(/^\n/, "").trimEnd() + "\n";
}

export function usesTailwind(styling: string) {
  return styling === "tailwind";
}
