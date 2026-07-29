import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const people = [
  ["confucius", "孔子"], ["qin-shi-huang", "秦始皇"], ["sima-qian", "司马迁"],
  ["li-bai", "李白"], ["du-fu", "杜甫"], ["su-shi", "苏轼"],
  ["wang-an-shi", "王安石"], ["wang-yangming", "王阳明"], ["wu-zetian", "武则天"],
  ["zeng-guofan", "曾国藩"], ["zhang-juzheng", "张居正"], ["lu-xun", "鲁迅"],
  ["ren-zhengfei", "任正非"], ["li-shimin", "唐太宗"], ["li-yuan", "唐高祖"],
  ["li-longji", "唐玄宗"], ["yang-yuhuan", "杨贵妃"], ["wei-zheng", "魏徵"],
  ["di-renjie", "狄仁杰"], ["fang-xuanling", "房玄龄"], ["guo-ziyi", "郭子仪"],
  ["an-lushan", "安禄山"], ["bai-juyi", "白居易"], ["han-yu", "韩愈"],
  ["xuan-zang", "玄奘"], ["kangxi", "康熙帝"], ["yongzheng", "雍正帝"],
  ["qianlong", "乾隆帝"], ["xiaozhuang", "孝庄文皇后"], ["dorgon", "多尔衮"],
  ["heshen", "和珅"], ["lin-zexu", "林则徐"], ["zuo-zongtang", "左宗棠"],
  ["li-hongzhang", "李鸿章"], ["zheng-chenggong", "郑成功"], ["cao-xueqin", "曹雪芹"],
  ["nian-gengyao", "年羹尧"], ["liu-bang", "汉高祖"], ["liu-che", "汉武帝"],
  ["liu-xiu", "汉光武帝"], ["cao-pi", "曹丕"], ["liu-bei", "刘备"],
  ["sun-quan", "孙权"], ["huang-renxun", "黄仁勋"], ["sam-altman", "萨姆·奥尔特曼"],
  ["fei-fei-li", "李飞飞"], ["andrew-ng", "吴恩达"], ["demis-hassabis", "德米斯·哈萨比斯"],
  ["geoffrey-hinton", "杰弗里·辛顿"],
];

const outputDir = path.resolve("public/people/portraits");
const api = "https://zh.wikipedia.org/w/api.php";
const englishApi = "https://en.wikipedia.org/w/api.php";
const englishFallbacks = [
  ["fei-fei-li", "Fei-Fei Li"],
  ["andrew-ng", "Andrew Ng"],
  ["demis-hassabis", "Demis Hassabis"],
];

async function query(params, endpoint = api) {
  const url = new URL(endpoint);
  for (const [key, value] of Object.entries({ action: "query", format: "json", formatversion: "2", origin: "*", ...params })) {
    url.searchParams.set(key, value);
  }
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await fetch(url, { headers: { "user-agent": "Renwuzhi/1.0 (portrait attribution project)" } });
    if (response.ok) return response.json();
    if (response.status !== 429) throw new Error(`${response.status} ${url}`);
    await new Promise((resolve) => setTimeout(resolve, 2000 * (attempt + 1)));
  }
  throw new Error(`429 ${url}`);
}

async function collectPortraits(peopleList = people, endpoint = api) {
  const titleToSlug = new Map(peopleList.map(([slug, title]) => [title, slug]));
  const data = await query({
    prop: "pageimages",
    piprop: "thumbnail|name",
    pithumbsize: "900",
    redirects: "1",
    titles: peopleList.map(([, title]) => title).join("|"),
  }, endpoint);

  for (const item of data?.query?.normalized ?? []) {
    if (titleToSlug.has(item.from)) titleToSlug.set(item.to, titleToSlug.get(item.from));
  }
  for (let pass = 0; pass < 3; pass += 1) {
    for (const item of data?.query?.redirects ?? []) {
      if (titleToSlug.has(item.from)) titleToSlug.set(item.to, titleToSlug.get(item.from));
    }
  }

  const pages = data?.query?.pages ?? [];
  const files = pages.filter((page) => page.pageimage).map((page) => `File:${page.pageimage}`);
  const fileData = files.length
    ? await query({
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      titles: files.join("|"),
    }, endpoint)
    : null;
  const metadataByName = new Map(
    (fileData?.query?.pages ?? []).map((file) => [file.title.replace(/^File:/, ""), file.imageinfo?.[0] ?? {}]),
  );

  const portraits = new Map();
  for (const page of pages) {
    const slug = titleToSlug.get(page.title);
    if (!slug || !page.thumbnail?.source) continue;
    const metadata = metadataByName.get(page.pageimage) ?? {};
    portraits.set(slug, {
      articleTitle: page.title,
      articleUrl: `https://zh.wikipedia.org/wiki/${encodeURIComponent(page.title.replaceAll(" ", "_"))}`,
      thumbnailUrl: page.thumbnail.source,
      fileUrl: metadata.descriptionurl ?? metadata.url ?? null,
      author: metadata.extmetadata?.Artist?.value?.replace(/<[^>]+>/g, "") ?? null,
      license: metadata.extmetadata?.LicenseShortName?.value ?? null,
      licenseUrl: metadata.extmetadata?.LicenseUrl?.value ?? null,
    });
  }

  return portraits;
}

await mkdir(outputDir, { recursive: true });
const attributions = [];
const missing = [];
const portraits = await collectPortraits();
const fallbackPortraits = await collectPortraits(englishFallbacks, englishApi);
for (const [slug, portrait] of fallbackPortraits) {
  if (!portraits.has(slug)) portraits.set(slug, portrait);
}

async function fetchImage(url) {
  for (let attempt = 0; attempt < 7; attempt += 1) {
    const response = await fetch(url, { headers: { "user-agent": "Renwuzhi/1.0 (portrait attribution project)" } });
    if (response.ok) return Buffer.from(await response.arrayBuffer());
    if (response.status !== 429) throw new Error(`image ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, 2500 * (attempt + 1)));
  }
  throw new Error("image 429");
}

for (const [slug, title] of people) {
  try {
    const portrait = portraits.get(slug);
    if (!portrait) {
      missing.push({ slug, title });
      process.stdout.write(`✗ ${title}: no public portrait found\n`);
      continue;
    }

    const destination = path.join(outputDir, `${slug}.webp`);
    try {
      await access(destination);
    } catch {
      const input = await fetchImage(portrait.thumbnailUrl);
      await sharp(input)
        .rotate()
        .resize(420, 560, { fit: "cover", position: "attention" })
        .webp({ quality: 84 })
        .toFile(destination);
      await new Promise((resolve) => setTimeout(resolve, 900));
    }

    attributions.push({ slug, name: title, ...portrait });
    process.stdout.write(`✓ ${title}\n`);
  } catch (error) {
    missing.push({ slug, title, error: String(error) });
    process.stdout.write(`✗ ${title}: ${error}\n`);
  }
}

await writeFile(
  path.join(outputDir, "attribution.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), sources: attributions, missing }, null, 2)}\n`,
  "utf8",
);

console.log(`Downloaded ${attributions.length}/${people.length} portraits.`);
if (missing.length) {
  console.log(`Missing: ${missing.map((item) => item.title).join("、")}`);
  process.exitCode = 2;
}
