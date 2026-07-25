import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { supplementalPeople } from "./supplemental-people";

export type Person = {
  slug: string; name: string; alias: string; dynasty: string; country: string;
  region: string; identity: string; tags: string[]; birth: string; death: string;
  avatar: string; summary: string; achievements: string[]; works: string[];
  relations: { name: string; relation: string }[]; books: string[]; articles: string[];
  seoTitle: string; seoDescription: string; timeline: { year: string; event: string }[];
  content: string;
};

export type Book = {
  slug: string; title: string; author: string; cover: string; isbn: string;
  publisher: string; publishDate: string; summary: string; buyLinks: { jd?: string; taobao?: string };
  content: string;
};

export type Topic = {
  slug: string; title: string; eyebrow: string; summary: string; people: string[]; seoDescription: string; content: string;
};

const root = path.join(process.cwd(), "content");
function readCollection<T>(folder: string): T[] {
  const dir = path.join(root, folder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx")).map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(source);
    return { slug, ...data, content: marked.parse(content, { async: false }) } as T;
  });
}

export const getPeople = () => [...readCollection<Person>("people"), ...supplementalPeople];
export const getBooks = () => readCollection<Book>("books");
export const getTopics = () => readCollection<Topic>("topics");
export const getPerson = (slug: string) => getPeople().find((item) => item.slug === slug);
export const getBook = (slug: string) => getBooks().find((item) => item.slug === slug);
export const getTopic = (slug: string) => getTopics().find((item) => item.slug === slug);
