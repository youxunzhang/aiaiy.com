import type { Person } from "./content";

type Seed = {
  slug: string;
  name: string;
  alias: string;
  dynasty: string;
  country?: string;
  region: string;
  identity: string;
  tags: string[];
  birth: string;
  death: string;
  summary: string;
  achievements: string[];
  relations?: Person["relations"];
  timeline: Person["timeline"];
};

function createPerson(seed: Seed): Person {
  const firstAchievement = seed.achievements[0] ?? "留下重要历史影响";
  return {
    ...seed,
    country: seed.country ?? "中国",
    avatar: `/images/people/${seed.slug}.jpg`,
    works: [],
    relations: seed.relations ?? [],
    books: [],
    articles: [`${seed.name}的关键人生转折`, `如何理解${seed.name}的历史影响`],
    seoTitle: `${seed.name}生平、成就与时间线`,
    seoDescription: `阅读${seed.name}的人物传记，了解其生平、${firstAchievement}及时代影响。`,
    content: `<h2>人物小传</h2><p>${seed.summary}</p><p>${seed.name}的经历与${seed.dynasty}的时代变化紧密相连。理解这个人，不只是在记住一个名字，也是在观察权力、制度、文化与个人选择如何彼此影响。</p><h2>为什么值得认识</h2><p>${seed.achievements.join("；")}。这些经历构成了理解其历史评价的主要线索。</p>`,
  };
}

export const supplementalPeople: Person[] = [
  createPerson({
    slug: "li-shimin", name: "李世民", alias: "唐太宗", dynasty: "唐朝", region: "长安",
    identity: "帝王", tags: ["贞观之治", "玄武门之变", "唐朝"], birth: "598年", death: "649年",
    summary: "从少年名将到贞观之治的开创者，他的功业、用人与权力选择共同塑造了初唐。",
    achievements: ["开创贞观之治", "完善三省六部制", "推动多民族交流"],
    relations: [{ name: "李渊", relation: "父亲" }, { name: "魏征", relation: "谏臣" }],
    timeline: [{ year: "598年", event: "出生。" }, { year: "626年", event: "发动玄武门之变，后即位。" }, { year: "649年", event: "病逝。" }],
  }),
  createPerson({
    slug: "li-yuan", name: "李渊", alias: "唐高祖", dynasty: "唐朝", region: "长安",
    identity: "帝王", tags: ["唐朝", "开国", "隋唐"], birth: "566年", death: "635年",
    summary: "他从隋朝重臣起兵晋阳，建立唐朝，却在晚年被儿子的权力斗争改变了命运。",
    achievements: ["建立唐朝", "完成关中政权整合", "奠定初唐制度基础"],
    timeline: [{ year: "566年", event: "出生。" }, { year: "618年", event: "称帝，建立唐朝。" }, { year: "626年", event: "退位为太上皇。" }],
  }),
  createPerson({
    slug: "li-longji", name: "李隆基", alias: "唐玄宗、李三郎", dynasty: "唐朝", region: "长安",
    identity: "帝王", tags: ["开元盛世", "安史之乱", "唐朝"], birth: "685年", death: "762年",
    summary: "前半生开创开元盛世，后半生却见证安史之乱，他的一生浓缩了盛唐的高峰与转折。",
    achievements: ["开创开元盛世", "整顿吏治与财政", "推动盛唐文化繁荣"],
    relations: [{ name: "杨玉环", relation: "贵妃" }, { name: "张九龄", relation: "宰相" }],
    timeline: [{ year: "685年", event: "出生。" }, { year: "712年", event: "即位。" }, { year: "755年", event: "安史之乱爆发。" }],
  }),
  createPerson({
    slug: "yang-yuhuan", name: "杨玉环", alias: "杨贵妃", dynasty: "唐朝", region: "蒲州永乐",
    identity: "后妃", tags: ["盛唐", "宫廷", "安史之乱"], birth: "719年", death: "756年",
    summary: "她既是盛唐审美的象征，也被卷入帝国政治失衡与安史之乱的巨大漩涡。",
    achievements: ["成为盛唐文化的重要象征", "其人生连接宫廷生活与安史之乱"],
    relations: [{ name: "李隆基", relation: "唐玄宗" }, { name: "杨国忠", relation: "族兄" }],
    timeline: [{ year: "719年", event: "出生。" }, { year: "745年", event: "册封贵妃。" }, { year: "756年", event: "马嵬驿之变中去世。" }],
  }),
  createPerson({
    slug: "wei-zheng", name: "魏征", alias: "魏徵、郑国公", dynasty: "唐朝", region: "巨鹿",
    identity: "政治家", tags: ["谏臣", "贞观之治", "唐朝"], birth: "580年", death: "643年",
    summary: "从李建成旧臣到唐太宗最著名的谏臣，他用直言与制度意识定义了君臣相处的理想范本。",
    achievements: ["辅佐贞观之治", "以直谏影响决策", "参与编修多部史书"],
    relations: [{ name: "李世民", relation: "君主" }, { name: "李建成", relation: "旧主" }],
    timeline: [{ year: "580年", event: "出生。" }, { year: "626年后", event: "进入唐太宗朝廷。" }, { year: "643年", event: "去世。" }],
  }),
  createPerson({
    slug: "di-renjie", name: "狄仁杰", alias: "狄梁公", dynasty: "唐朝", region: "并州太原",
    identity: "政治家", tags: ["武周", "宰相", "断案"], birth: "630年", death: "700年",
    summary: "他不只是传说中的断案高手，更是武则天时期维持政治平衡与举荐人才的重要宰相。",
    achievements: ["担任武周宰相", "举荐姚崇等人才", "以清正与断案著称"],
    relations: [{ name: "武则天", relation: "君主" }, { name: "姚崇", relation: "举荐的人才" }],
    timeline: [{ year: "630年", event: "出生。" }, { year: "691年", event: "首次拜相。" }, { year: "700年", event: "去世。" }],
  }),
  createPerson({
    slug: "fang-xuanling", name: "房玄龄", alias: "房乔、梁国公", dynasty: "唐朝", region: "齐州临淄",
    identity: "政治家", tags: ["房谋杜断", "贞观之治", "宰相"], birth: "579年", death: "648年",
    summary: "他善于谋划而不争风头，是李世民最重要的政治伙伴之一，也是贞观班底的核心。",
    achievements: ["长期担任宰相", "参与制定唐初制度", "主持编修晋书"],
    timeline: [{ year: "579年", event: "出生。" }, { year: "626年", event: "参与玄武门之变后进入中枢。" }, { year: "648年", event: "去世。" }],
  }),
  createPerson({
    slug: "guo-ziyi", name: "郭子仪", alias: "汾阳王", dynasty: "唐朝", region: "华州郑县",
    identity: "军事家", tags: ["安史之乱", "中兴名将", "唐朝"], birth: "697年", death: "781年",
    summary: "他在安史之乱中挽救唐朝，又以极高的政治分寸善终，成为功高不震主的罕见名将。",
    achievements: ["平定安史之乱的重要统帅", "收复长安与洛阳", "维护中晚唐政局"],
    timeline: [{ year: "697年", event: "出生。" }, { year: "757年", event: "参与收复两京。" }, { year: "781年", event: "去世。" }],
  }),
  createPerson({
    slug: "an-lushan", name: "安禄山", alias: "安轧荦山", dynasty: "唐朝", region: "营州",
    identity: "军事人物", tags: ["安史之乱", "藩镇", "叛乱"], birth: "703年", death: "757年",
    summary: "从边镇将领到发动叛乱，他改变了唐朝的国运，也暴露出盛世背后的军政结构危机。",
    achievements: ["掌握三镇军权", "发动安史之乱并改变唐朝政治格局"],
    timeline: [{ year: "703年", event: "出生。" }, { year: "755年", event: "起兵反唐。" }, { year: "757年", event: "被杀。" }],
  }),
  createPerson({
    slug: "bai-juyi", name: "白居易", alias: "白乐天、香山居士", dynasty: "唐朝", region: "太原",
    identity: "文学家", tags: ["唐诗", "新乐府", "诗人"], birth: "772年", death: "846年",
    summary: "他以浅白而有力量的诗歌关心普通人的生活，把社会现实、友情与日常都写进唐诗。",
    achievements: ["推动新乐府运动", "创作长恨歌与琵琶行", "扩大诗歌的社会表达"],
    timeline: [{ year: "772年", event: "出生。" }, { year: "800年", event: "进士及第。" }, { year: "846年", event: "在洛阳去世。" }],
  }),
  createPerson({
    slug: "han-yu", name: "韩愈", alias: "韩昌黎、文公", dynasty: "唐朝", region: "河阳",
    identity: "文学家", tags: ["古文运动", "唐宋八大家", "儒学"], birth: "768年", death: "824年",
    summary: "他以古文运动改变文坛，也因直言进谏屡遭贬谪，把文章、政治与儒学理想连在一起。",
    achievements: ["倡导古文运动", "位列唐宋八大家之首", "推动儒学复兴"],
    timeline: [{ year: "768年", event: "出生。" }, { year: "792年", event: "进士及第。" }, { year: "819年", event: "因谏迎佛骨被贬潮州。" }],
  }),
  createPerson({
    slug: "xuan-zang", name: "玄奘", alias: "陈祎、三藏法师", dynasty: "唐朝", region: "洛州缑氏",
    identity: "佛学家", tags: ["西行", "佛经翻译", "大唐西域记"], birth: "602年", death: "664年",
    summary: "他孤身西行求法，带回大量佛典并主持翻译，让真实经历比文学想象更为壮阔。",
    achievements: ["西行印度求法", "主持大规模佛经翻译", "口述大唐西域记"],
    timeline: [{ year: "602年", event: "出生。" }, { year: "629年", event: "启程西行。" }, { year: "645年", event: "返回长安。" }],
  }),
  createPerson({
    slug: "kangxi", name: "康熙帝", alias: "爱新觉罗·玄烨、清圣祖", dynasty: "清朝", region: "北京",
    identity: "帝王", tags: ["康乾盛世", "三藩之乱", "统一"], birth: "1654年", death: "1722年",
    summary: "他少年亲政，在平三藩、统一台湾与多线边疆治理中奠定清朝盛世格局。",
    achievements: ["平定三藩之乱", "完成台湾统一", "巩固多民族国家疆域"],
    timeline: [{ year: "1654年", event: "出生。" }, { year: "1661年", event: "即位。" }, { year: "1722年", event: "去世。" }],
  }),
  createPerson({
    slug: "yongzheng", name: "雍正帝", alias: "爱新觉罗·胤禛、清世宗", dynasty: "清朝", region: "北京",
    identity: "帝王", tags: ["勤政", "改革", "密折制度"], birth: "1678年", death: "1735年",
    summary: "他以高强度勤政和强势改革重塑财政与行政，也留下极富争议的继位与统治形象。",
    achievements: ["推行摊丁入亩", "整顿财政吏治", "完善密折与军机制度"],
    timeline: [{ year: "1678年", event: "出生。" }, { year: "1722年", event: "即位。" }, { year: "1735年", event: "去世。" }],
  }),
  createPerson({
    slug: "qianlong", name: "乾隆帝", alias: "爱新觉罗·弘历、清高宗", dynasty: "清朝", region: "北京",
    identity: "帝王", tags: ["康乾盛世", "十全武功", "清朝"], birth: "1711年", death: "1799年",
    summary: "他在位前期延续盛世，晚年政治与财政问题却不断积累，成为清朝转折的重要观察窗口。",
    achievements: ["完成多部大型文化典籍编纂", "拓展并巩固疆域", "延续康乾盛世"],
    timeline: [{ year: "1711年", event: "出生。" }, { year: "1735年", event: "即位。" }, { year: "1796年", event: "退位为太上皇。" }],
  }),
  createPerson({
    slug: "xiaozhuang", name: "孝庄文皇后", alias: "博尔济吉特·布木布泰", dynasty: "清朝", region: "科尔沁",
    identity: "后妃", tags: ["清初", "宫廷", "康熙"], birth: "1613年", death: "1688年",
    summary: "她历经皇太极、顺治与康熙三朝，在清初权力交接中发挥了稳定局面的重要作用。",
    achievements: ["辅佐顺治与康熙", "参与清初皇室政治协调", "维系满蒙政治联系"],
    timeline: [{ year: "1613年", event: "出生。" }, { year: "1643年", event: "其子福临即位。" }, { year: "1688年", event: "去世。" }],
  }),
  createPerson({
    slug: "dorgon", name: "多尔衮", alias: "睿亲王", dynasty: "清朝", region: "赫图阿拉",
    identity: "政治家", tags: ["清初", "摄政王", "入关"], birth: "1612年", death: "1650年",
    summary: "他手握摄政大权并主导清军入关，却始终停留在皇位之外，身后评价也经历巨大反复。",
    achievements: ["主导清军入关", "担任摄政王", "推动清初政权扩张"],
    timeline: [{ year: "1612年", event: "出生。" }, { year: "1644年", event: "率军入关。" }, { year: "1650年", event: "去世。" }],
  }),
  createPerson({
    slug: "heshen", name: "和珅", alias: "钮祜禄·和珅", dynasty: "清朝", region: "北京",
    identity: "政治家", tags: ["乾隆", "权臣", "贪腐"], birth: "1750年", death: "1799年",
    summary: "他以才干与逢迎迅速登上权力顶峰，最终在乾隆去世后被嘉庆清算。",
    achievements: ["长期掌握清廷多项要职", "参与外交与财政事务", "成为乾隆晚期政治的标志人物"],
    timeline: [{ year: "1750年", event: "出生。" }, { year: "1775年后", event: "迅速进入权力中枢。" }, { year: "1799年", event: "被赐自尽。" }],
  }),
  createPerson({
    slug: "lin-zexu", name: "林则徐", alias: "林元抚、文忠公", dynasty: "晚清", region: "福建侯官",
    identity: "政治家", tags: ["虎门销烟", "鸦片战争", "开眼看世界"], birth: "1785年", death: "1850年",
    summary: "虎门销烟让他成为民族记忆中的标志人物，而他的选择也折射出晚清面对世界变化的艰难。",
    achievements: ["主持虎门销烟", "整顿海防与吏治", "组织翻译海外资料"],
    timeline: [{ year: "1785年", event: "出生。" }, { year: "1839年", event: "在虎门销烟。" }, { year: "1850年", event: "去世。" }],
  }),
  createPerson({
    slug: "zuo-zongtang", name: "左宗棠", alias: "左季高、文襄公", dynasty: "晚清", region: "湖南湘阴",
    identity: "政治家", tags: ["收复新疆", "洋务运动", "晚清"], birth: "1812年", death: "1885年",
    summary: "他从幕僚起步成为封疆大吏，以抬棺西征和收复新疆留下极具行动力的晚清形象。",
    achievements: ["收复新疆", "推动西北治理", "创办福州船政局等洋务事业"],
    timeline: [{ year: "1812年", event: "出生。" }, { year: "1876年", event: "率军西征。" }, { year: "1885年", event: "去世。" }],
  }),
  createPerson({
    slug: "li-hongzhang", name: "李鸿章", alias: "李少荃、文忠公", dynasty: "晚清", region: "安徽合肥",
    identity: "政治家", tags: ["洋务运动", "北洋", "晚清外交"], birth: "1823年", death: "1901年",
    summary: "他在帝国衰局中办军、办厂、办外交，成就与争议都与晚清转型的困境紧密相连。",
    achievements: ["创建淮军与北洋水师", "推动洋务运动", "参与晚清外交与近代工业建设"],
    relations: [{ name: "曾国藩", relation: "老师与上级" }, { name: "左宗棠", relation: "同僚" }],
    timeline: [{ year: "1823年", event: "出生。" }, { year: "1862年", event: "率淮军赴上海。" }, { year: "1901年", event: "去世。" }],
  }),
  createPerson({
    slug: "zheng-chenggong", name: "郑成功", alias: "国姓爷、郑森", dynasty: "明清之际", region: "福建南安",
    identity: "军事家", tags: ["收复台湾", "抗清", "海洋"], birth: "1624年", death: "1662年",
    summary: "他坚持抗清并驱逐荷兰殖民者、收复台湾，把个人命运与东南海疆历史连接起来。",
    achievements: ["驱逐荷兰殖民者", "收复台湾", "经营东南沿海抗清力量"],
    timeline: [{ year: "1624年", event: "出生。" }, { year: "1661年", event: "进军台湾。" }, { year: "1662年", event: "荷兰殖民者投降，同年去世。" }],
  }),
  createPerson({
    slug: "cao-xueqin", name: "曹雪芹", alias: "曹霑、梦阮", dynasty: "清朝", region: "江宁",
    identity: "文学家", tags: ["红楼梦", "清代文学", "小说"], birth: "约1715年", death: "约1763年",
    summary: "他从贵族家庭的繁华跌入贫困，把家族记忆与人生体悟写成《红楼梦》。",
    achievements: ["创作红楼梦", "把世情小说推向高峰", "塑造丰富的女性人物群像"],
    timeline: [{ year: "约1715年", event: "出生。" }, { year: "青年时期", event: "家族衰败后迁居北京。" }, { year: "约1763年", event: "贫病中去世。" }],
  }),
  createPerson({
    slug: "nian-gengyao", name: "年羹尧", alias: "年亮工", dynasty: "清朝", region: "安徽怀远",
    identity: "军事家", tags: ["雍正", "西北", "权力"], birth: "1679年", death: "1726年",
    summary: "他从封疆大吏到西北大将军，又在权力顶峰急速坠落，是雍正朝最戏剧化的人物之一。",
    achievements: ["平定青海罗卜藏丹津叛乱", "长期经营西北军政", "成为雍正初年核心将领"],
    timeline: [{ year: "1679年", event: "出生。" }, { year: "1723年", event: "出任抚远大将军。" }, { year: "1726年", event: "被赐自尽。" }],
  }),
  createPerson({
    slug: "liu-bang", name: "刘邦", alias: "汉高祖", dynasty: "西汉", region: "沛郡丰邑",
    identity: "帝王", tags: ["汉朝", "开国", "楚汉战争"], birth: "公元前256年", death: "公元前195年",
    summary: "从沛县亭长到西汉开国皇帝，他凭借用人与政治韧性赢得楚汉战争。",
    achievements: ["建立西汉", "结束秦末长期战争", "奠定汉初政治制度"],
    relations: [{ name: "项羽", relation: "楚汉战争对手" }, { name: "张良", relation: "谋士" }],
    timeline: [{ year: "公元前256年", event: "出生。" }, { year: "公元前202年", event: "称帝，建立汉朝。" }, { year: "公元前195年", event: "去世。" }],
  }),
  createPerson({
    slug: "liu-che", name: "汉武帝", alias: "刘彻", dynasty: "西汉", region: "长安",
    identity: "帝王", tags: ["汉武帝", "中央集权", "丝绸之路"], birth: "公元前156年", death: "公元前87年",
    summary: "他大幅拓展汉朝疆域与国家能力，也让长期战争和财政压力成为盛世背面的代价。",
    achievements: ["加强中央集权", "推动对外开拓", "派遣张骞通西域"],
    timeline: [{ year: "公元前156年", event: "出生。" }, { year: "公元前141年", event: "即位。" }, { year: "公元前87年", event: "去世。" }],
  }),
  createPerson({
    slug: "liu-xiu", name: "刘秀", alias: "汉光武帝", dynasty: "东汉", region: "南阳郡蔡阳",
    identity: "帝王", tags: ["东汉", "光武中兴", "统一"], birth: "公元前5年", death: "57年",
    summary: "他在新莽末年群雄竞逐中重新统一天下，建立东汉并开创光武中兴。",
    achievements: ["建立东汉", "完成全国统一", "恢复经济与社会秩序"],
    timeline: [{ year: "公元前5年", event: "出生。" }, { year: "25年", event: "称帝。" }, { year: "57年", event: "去世。" }],
  }),
  createPerson({
    slug: "cao-pi", name: "曹丕", alias: "魏文帝、子桓", dynasty: "三国", region: "沛国谯县",
    identity: "帝王", tags: ["曹魏", "三国", "文学"], birth: "187年", death: "226年",
    summary: "他完成汉魏政权更替，建立曹魏，同时也是建安文学的重要作者与评论者。",
    achievements: ["建立曹魏", "推行九品中正制", "撰写典论·论文"],
    relations: [{ name: "曹操", relation: "父亲" }, { name: "曹植", relation: "弟弟" }],
    timeline: [{ year: "187年", event: "出生。" }, { year: "220年", event: "代汉称帝。" }, { year: "226年", event: "去世。" }],
  }),
  createPerson({
    slug: "liu-bei", name: "刘备", alias: "汉昭烈帝、玄德", dynasty: "三国", region: "涿郡涿县",
    identity: "帝王", tags: ["蜀汉", "三国", "创业"], birth: "161年", death: "223年",
    summary: "他在长期辗转与多次失败中建立蜀汉，把坚韧、名分与用人凝结成独特的政治形象。",
    achievements: ["建立蜀汉", "占据益州", "形成三国鼎立格局"],
    relations: [{ name: "诸葛亮", relation: "丞相" }, { name: "关羽", relation: "核心将领" }],
    timeline: [{ year: "161年", event: "出生。" }, { year: "221年", event: "在成都称帝。" }, { year: "223年", event: "病逝白帝城。" }],
  }),
  createPerson({
    slug: "sun-quan", name: "孙权", alias: "吴大帝、仲谋", dynasty: "三国", region: "吴郡富春",
    identity: "帝王", tags: ["东吴", "三国", "江东"], birth: "182年", death: "252年",
    summary: "他继承父兄基业，在江东建立稳定政权，并通过赤壁之战等关键决策奠定三国格局。",
    achievements: ["建立东吴", "巩固江东政权", "参与形成三国鼎立"],
    timeline: [{ year: "182年", event: "出生。" }, { year: "229年", event: "称帝。" }, { year: "252年", event: "去世。" }],
  }),
  createPerson({
    slug: "huang-renxun", name: "黄仁勋", alias: "Jensen Huang", dynasty: "当代", country: "美国", region: "台南",
    identity: "科技企业家", tags: ["人工智能", "芯片", "英伟达"], birth: "1963年", death: "至今",
    summary: "他共同创办英伟达，并推动图形处理器从游戏硬件走向人工智能计算基础设施。",
    achievements: ["共同创办英伟达", "推动GPU计算生态", "参与塑造人工智能算力产业"],
    timeline: [{ year: "1963年", event: "出生。" }, { year: "1993年", event: "共同创办英伟达。" }, { year: "2006年", event: "推动CUDA平台发布。" }],
  }),
  createPerson({
    slug: "sam-altman", name: "萨姆·奥尔特曼", alias: "Sam Altman", dynasty: "当代", country: "美国", region: "芝加哥",
    identity: "科技企业家", tags: ["人工智能", "创业", "OpenAI"], birth: "1985年", death: "至今",
    summary: "他从创业孵化走向人工智能产业中心，是推动生成式人工智能进入大众生活的重要人物。",
    achievements: ["参与创办OpenAI", "推动生成式人工智能产品化", "长期参与科技创业投资"],
    timeline: [{ year: "1985年", event: "出生。" }, { year: "2014年", event: "出任Y Combinator总裁。" }, { year: "2015年", event: "参与创办OpenAI。" }],
  }),
  createPerson({
    slug: "fei-fei-li", name: "李飞飞", alias: "Fei-Fei Li", dynasty: "当代", country: "美国", region: "北京",
    identity: "人工智能科学家", tags: ["计算机视觉", "ImageNet", "人工智能"], birth: "1976年", death: "至今",
    summary: "她以ImageNet推动计算机视觉跃迁，也持续倡导以人为本的人工智能研究。",
    achievements: ["主持创建ImageNet", "推动现代计算机视觉发展", "倡导以人为本的人工智能"],
    timeline: [{ year: "1976年", event: "出生。" }, { year: "2009年", event: "ImageNet数据集发布。" }, { year: "2017年", event: "共同推动斯坦福以人为本人工智能研究。" }],
  }),
  createPerson({
    slug: "andrew-ng", name: "吴恩达", alias: "Andrew Ng", dynasty: "当代", country: "美国", region: "伦敦",
    identity: "人工智能科学家", tags: ["机器学习", "教育", "人工智能"], birth: "1976年", death: "至今",
    summary: "他把机器学习教育带向全球大众，并持续推动人工智能从研究走向实际应用。",
    achievements: ["共同创办Google Brain", "共同创办Coursera", "普及机器学习教育"],
    timeline: [{ year: "1976年", event: "出生。" }, { year: "2011年", event: "参与创办Google Brain。" }, { year: "2012年", event: "共同创办Coursera。" }],
  }),
  createPerson({
    slug: "demis-hassabis", name: "德米斯·哈萨比斯", alias: "Demis Hassabis", dynasty: "当代", country: "英国", region: "伦敦",
    identity: "人工智能科学家", tags: ["DeepMind", "AlphaGo", "蛋白质结构"], birth: "1976年", death: "至今",
    summary: "他共同创办DeepMind，带领团队以AlphaGo与AlphaFold展示人工智能解决复杂问题的潜力。",
    achievements: ["共同创办DeepMind", "推动AlphaGo研发", "推动AlphaFold蛋白质结构预测"],
    timeline: [{ year: "1976年", event: "出生。" }, { year: "2010年", event: "共同创办DeepMind。" }, { year: "2016年", event: "AlphaGo击败李世石。" }],
  }),
  createPerson({
    slug: "geoffrey-hinton", name: "杰弗里·辛顿", alias: "Geoffrey Hinton", dynasty: "当代", country: "英国、加拿大", region: "伦敦",
    identity: "人工智能科学家", tags: ["深度学习", "神经网络", "图灵奖"], birth: "1947年", death: "至今",
    summary: "他数十年坚持神经网络研究，是深度学习从边缘方向走向主流的关键推动者。",
    achievements: ["推动反向传播与神经网络研究", "发展深度学习方法", "获得图灵奖"],
    timeline: [{ year: "1947年", event: "出生。" }, { year: "1986年", event: "发表反向传播相关重要研究。" }, { year: "2018年", event: "与杨立昆、本吉奥共同获得图灵奖。" }],
  }),
];
