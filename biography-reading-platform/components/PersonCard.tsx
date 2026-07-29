import Link from "next/link";
import type { Person } from "@/lib/content";

export function PersonCard({ person, index = 0 }: { person: Person; index?: number }) {
  return (
    <Link href={`/people/${person.slug}`} className="person-card">
      <div className={`portrait tone-${index % 6}`}>
        <img src={person.avatar} alt={`${person.name}人物肖像`} loading="lazy" />
        <small>{person.birth}</small>
      </div>
      <div className="card-copy">
        <p className="eyebrow">{person.dynasty} · {person.identity}</p>
        <h3>{person.name}</h3>
        <p>{person.summary}</p>
        <div className="tag-row">
          {person.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </Link>
  );
}
