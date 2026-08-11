import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="ReadTao home">
        <span className="brand-mark">道</span>
        <span><b>ReadTao</b><small>读道</small></span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/#daily">Daily Tao</Link>
        <Link href="/#chapters">81 Chapters</Link>
        <Link href="/#questions">Life Questions</Link>
        <Link href="/#journey">81-Day Journey</Link>
      </nav>
      <Link href="/tao-te-ching/chapter-1" className="header-cta">Begin reading <span>→</span></Link>
    </header>
  );
}
