import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TaoHome } from "@/components/TaoHome";
import { chapters, themes } from "@/lib/tao";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <TaoHome chapters={chapters} themes={themes} />
      </main>
      <SiteFooter />
    </>
  );
}
