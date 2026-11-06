import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border px-4 py-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6 justify-between">
        <div><p className="font-medium text-lg">HomeServyc</p><p className="text-sm text-muted-foreground mt-2">Community recommendations. More informed choices.</p></div>
        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm"><Link href="/directory">Explore services</Link><Link href="/#how-it-works">How it works</Link></nav>
      </div>
    </footer>
  );
}
