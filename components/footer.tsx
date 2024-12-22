import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        <nav className="flex space-x-4 items-center">
          <p className="text-sm text-muted-foreground">MVP Setup &copy; {currentYear} - Created by <b><Link href="https://github.com/Ekpo-Emmanuel" target="_blank">Emmanuel Ekpo</Link></b></p>
          <ModeToggle />
        </nav>
      </div>
    </footer>
  )
}