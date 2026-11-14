"use client";

type Props = {
  url: string;
  fallback: string;
  className?: string;
};

export function SiteIcon({ url, fallback, className = "" }: Props) {
  const hostname = new URL(url).hostname;
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=128`;

  return (
    <span className={`site-icon ${className}`.trim()} aria-hidden="true">
      <span className="site-icon-fallback">{fallback}</span>
      {/* Remote favicons keep the directory recognizable without maintaining 100 logo assets. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={faviconUrl} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.hidden = true; }} />
    </span>
  );
}
