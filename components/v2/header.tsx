import React from "react";
import ModeToggle from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-background z-50">
        <div className="flex items-center justify-between border-b px-4 py-2 lg:px-0 max-w-4xl mx-auto">
        <div className="flex items-end gap-1">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            id="logo-72"
            width="22"
            fill="none"
            viewBox="0 0 53 44"
            className="text-primary dark:text-primary"
            >
            <path
                d="m23.3 0 28.746 28.63V44H38.631v-9.845L17.752 13.361h-4.337V44H0V0zM38.63 15.27V0h13.415v15.27z"
                className="fill-current"
            />
            </svg>
        </div>
        <ModeToggle />
        </div>
    </header>
  );
}
