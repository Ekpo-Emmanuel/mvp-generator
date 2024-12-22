import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} ProjectSetup. All rights reserved.
        </p>
        <nav className="flex space-x-4">
          <Link href="/docs" className="text-sm text-muted-foreground hover:underline">
            Documentation
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            Privacy Policy
          </Link>
          <Link href="/support" className="text-sm text-muted-foreground hover:underline">
            Support
          </Link>
        </nav>
      </div>
    </footer>
  )
}