import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Happy Homes</h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              The Home Help Network. Find trusted help for your home. Trusted help. Happy homes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Browse</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Add a Recommendation
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <p className="text-xs text-muted-foreground text-center">
            © 2026 Happy Homes - The Home Help Network. Find trusted help for your home.
          </p>
        </div>
      </div>
    </footer>
  )
}
