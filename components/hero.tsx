import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
export function Hero() {
  return <section className="hero-wrap px-4 sm:px-6"><div className="hero-panel max-w-7xl mx-auto">
    <div className="hero-copy"><span className="hero-eyebrow"><span/> GOOD HELP. GOOD DAYS. GHANA.</span><h1>A little help.<br/>A whole lot<br/><span>more life.</span></h1><p>Make room for what matters. Discover home help through the people who know them.</p><Link href="/directory" className="hero-cta">Find your kind of help <ArrowUpRight size={19}/></Link><div className="hero-note"><Sparkles size={16}/> Real recommendations. A personal touch.</div></div>
    <div className="hero-visual"><img src="/design/homeservyc-colorful-hero.png" alt="Colorful illustration of a welcoming home with cleaning, gardening and home-service symbols" className="hero-photo"/><div className="hero-photo-label">A helping hand, closer to home.</div><div className="hero-caption"><span className="text-xl">✦</span><div><strong>Everyday life, a little lighter.</strong><span>From fresh spaces to family care.</span></div></div></div>
  </div></section>;
}
