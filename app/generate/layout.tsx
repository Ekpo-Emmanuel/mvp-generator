import type { Metadata } from "next";
import "@/components/builder/builder.css";

export const metadata: Metadata = {
  title: "Build your starter — mvp",
  description: "Choose your stack and download a connected starter project.",
};

export default function GenerateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
