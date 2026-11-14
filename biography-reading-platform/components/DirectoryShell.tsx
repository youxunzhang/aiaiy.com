import { aiTools } from "@/lib/ai-tools";
import Link from "next/link";

export function DirectoryHeader() {
  return (
    <header className="directory-header">
      <Link className="directory-brand" href="/" aria-label="AIAIY AI 工具导航首页">
        <span className="brand-symbol">AI</span>
        <span><b>AIAIY</b><small>AI 工具导航</small></span>
      </Link>
      <nav aria-label="主导航">
        <Link href="/#curated">工作入口</Link>
        <Link href="/#directory">工具库</Link>
        <Link href="/categories/">分类</Link>
        <Link href="/#about">关于</Link>
      </nav>
      <a className="submit-link" href="mailto:hello@aiaiy.com?subject=提交 AI 工具">提交工具 <span>↗</span></a>
    </header>
  );
}

export function DirectoryFooter() {
  return (
    <footer className="directory-footer">
      <div><b>AIAIY</b><span>{aiTools.length} 个主流 AI 工具，一站发现。</span></div>
      <div className="footer-links"><Link href="/">工具首页</Link><Link href="/categories/">全部分类</Link><a href="mailto:hello@aiaiy.com">联系我们</a><span>© 2026 AIAIY.COM</span></div>
    </footer>
  );
}
