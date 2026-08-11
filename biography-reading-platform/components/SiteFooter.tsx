import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="tao-footer">
      <div className="footer-brand"><b>ReadTao</b><p>Ancient Taoist wisdom for modern life.</p></div>
      <div className="footer-links">
        <Link href="/#daily">Daily Tao</Link><Link href="/#chapters">81 Chapters</Link>
        <Link href="/#questions">Life Questions</Link><Link href="/#journey">81-Day Journey</Link>
      </div>
      <div className="footer-meta"><span>English · 中文</span><span>© 2026 ReadTao</span></div>
    </footer>
  );
}
