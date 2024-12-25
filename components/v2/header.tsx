import React from "react";
import ModeToggle from "@/components/mode-toggle";
import V2LogoSvg from "./svgs/v2-logo";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-background z-50">
        <div className="flex items-center justify-between border-b px-4 py-2 lg:px-0 max-w-4xl mx-auto">
        <V2LogoSvg />
        <ModeToggle />
        </div>
    </header>
  );
}
