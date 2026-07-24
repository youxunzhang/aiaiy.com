import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="人物志首页">
        <span className="brand-mark">人</span><span>人物志</span>
      </Link>
      <nav aria-label="主导航">
        <Link href="/people">人物</Link><Link href="/books">书架</Link><Link href="/topics">专题</Link>
      </nav>
      <Link href="/people" className="header-cta">开始阅读 <span>↗</span></Link>
    </header>
  );
}

