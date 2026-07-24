import { DynastyExplorer } from "@/components/DynastyExplorer";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPeople } from "@/lib/content";

export default function Home() {
  const people = getPeople().map((person) => ({
    slug: person.slug,
    name: person.name,
    dynasty: person.dynasty,
    identity: person.identity,
    birth: person.birth,
    death: person.death,
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
