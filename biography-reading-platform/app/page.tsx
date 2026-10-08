import { AiDirectory } from "@/components/AiDirectory";
import { aiTools } from "@/lib/ai-tools";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://aiaiy.com/#website",
        url: "https://aiaiy.com/",
        name: "AIAIY AI工具导航",
        description: "精选100个主流AI工具，按真实使用场景分类整理。",
        inLanguage: "zh-CN",
      },
      {
        "@type": "CollectionPage",
        "@id": "https://aiaiy.com/#directory",
        url: "https://aiaiy.com/",
        name: "AI工具导航｜100个主流AI网站大全",
        isPartOf: { "@id": "https://aiaiy.com/#website" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: aiTools.length,
          itemListElement: aiTools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.name,
            url: tool.url,
          })),
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <AiDirectory />
    </>
  );
}
