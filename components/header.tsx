import Link from 'next/link'
import ModeToggle from './mode-toggle'

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* <Link href="/" className="text-2xl font-bold">
          <span className="text-primary">MVP </span>Setup
        </Link> */}
        <nav className="flex items-center space-x-4">
          <Link href="/docs" className="text-sm font-medium hover:underline">
            Docs
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
