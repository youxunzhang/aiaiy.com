import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PersonCard } from "@/components/PersonCard";
import { getPeople, getPerson, getBooks } from "@/lib/content";

export function generateStaticParams() {
  return getPeople().map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) return {};
  return {
    title: person.seoTitle,
    description: person.seoDescription,
    alternates: { canonical: `/people/${slug}` },
    openGraph: {
      title: person.seoTitle,
      description: person.seoDescription,
      type: "article",
    },
  };
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) notFound();

  const allPeople = getPeople();
  const peopleByName = new Map(allPeople.map((item) => [item.name, item]));
  const books = getBooks().filter((book) => person.books.includes(book.slug));
  const related = allPeople
    .filter(
      (item) =>
        item.slug !== person.slug &&
        (item.identity === person.identity || item.dynasty === person.dynasty),
    )
    .slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main className="page-shell">
        <div className="breadcrumbs">
          <Link href="/">首页</Link>　/　<Link href="/people">人物</Link>　/　{person.name}
        </div>

        <section className="profile-hero">
          <div className="profile-portrait portrait">
            <img src={person.avatar} alt={`${person.name}人物肖像`} />
            <small>{person.birth} — {person.death}</small>
          </div>
          <div className="profile-title">
            <p className="eyebrow">{person.dynasty} · {person.identity}</p>
            <h1>{person.name}</h1>
            <p className="alias">{person.alias}</p>
            <p className="lead">{person.summary}</p>
            <div className="facts">
              <div><span>生卒</span><b>{person.birth} — {person.death}</b></div>
              <div><span>国家 / 地区</span><b>{person.country} · {person.region}</b></div>
              <div><span>身份</span><b>{person.identity}</b></div>
            </div>
          </div>
        </section>

        <div className="profile-layout">
          <article className="prose">
            <div dangerouslySetInnerHTML={{ __html: person.content }} />
            <h2>人生时间线</h2>
            <div className="timeline">
              {person.timeline.map((item) => (
                <div className="timeline-item" key={item.year + item.event}>
                  <b>{item.year}</b>
                  <p>{item.event}</p>
                </div>
              ))}
            </div>
            <h2>主要成就</h2>
            <ul>{person.achievements.map((item) => <li key={item}>{item}</li>)}</ul>
            <h2>代表作品</h2>
            <div className="pill-list">
              {person.works.map((item) => <span key={item}>{item}</span>)}
            </div>
          </article>

          <aside>
            <div className="side-card">
              <h3>人物标签</h3>
              <div className="pill-list">
                {person.tags.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <div className="side-card">
              <h3>人物关系</h3>
              <div className="relation-list">
                {person.relations.map((relation) => {
                  const knownPerson = peopleByName.get(relation.name);
                  return (
                    <div className="relation-person" key={relation.name}>
                      {knownPerson ? (
                        <img
                          src={knownPerson.avatar}
                          alt={`${relation.name}人物肖像`}
                          loading="lazy"
                        />
                      ) : (
                        <span>{relation.name.slice(-1)}</span>
                      )}
                      <p>
                        <b>{relation.name}</b>
                        <small>{relation.relation}</small>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            {books.length > 0 && (
              <div className="side-card">
                <h3>推荐书籍</h3>
                {books.map((book) => (
                  <Link href={`/books/${book.slug}`} key={book.slug}>
                    {book.title}<br /><small>{book.author}</small>
                  </Link>
                ))}
              </div>
            )}
            <div className="side-card">
              <h3>相关文章</h3>
              {person.articles.map((article) => (
                <span className="side-article" key={article}>{article}</span>
              ))}
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="latest">
            <div className="section-heading">
              <div>
                <p className="eyebrow">RELATED PEOPLE</p>
                <h2>相关推荐</h2>
              </div>
            </div>
            <div className="people-grid">
              {related.map((item, index) => (
                <PersonCard person={item} index={index + 2} key={item.slug} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
