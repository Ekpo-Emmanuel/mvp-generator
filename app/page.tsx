import type { Metadata } from "next";
import LandingView from "@/components/landing/landing-view";

const description = "mvp builds a starter project with your framework, auth, database and styling already connected. Open source, no account.";

export const metadata: Metadata = {
  title: "mvp — redesigned landing page",
  description,
  openGraph: { title: "mvp — redesigned landing page", description, type: "website" },
};

export default function Home() { return <LandingView/>; }
