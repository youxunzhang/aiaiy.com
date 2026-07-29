import { DynastyExplorer } from "@/components/DynastyExplorer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPeople } from "@/lib/content";

const homepagePeople = new Set([
  "confucius",
  "du-fu",
  "li-bai",
  "lu-xun",
  "qin-shi-huang",
  "ren-zhengfei",
  "sima-qian",
  "su-shi",
  "wang-an-shi",
  "wang-yangming",
  "wu-zetian",
  "zeng-guofan",
  "zhang-juzheng",
]);

export default function Home() {
  const people = getPeople()
    .filter((person) => homepagePeople.has(person.slug))
    .map((person) => ({
      slug: person.slug,
      name: person.name,
      dynasty: person.dynasty,
      identity: person.identity,
      birth: person.birth,
      death: person.death,
      avatar: person.avatar,
      summary: person.summary,
      tags: person.tags.slice(0, 3),
    }));

  return (
    <>
      <main>
        <SiteHeader />
        <DynastyExplorer people={people} />
      </main>
      <SiteFooter />
    </>
  );
}
