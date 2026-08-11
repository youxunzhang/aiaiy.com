export type TaoChapter = {
  number: number;
  opening: string;
  english: string;
  insight: string;
  practice: string;
  reflection: string;
  themes: string[];
};

export type TaoTheme = { name: string; chinese: string; chapters: number[] };

export const themes: TaoTheme[] = [
  { name: "Understanding Tao", chinese: "理解道", chapters: [1, 4, 14, 21, 25, 32, 34, 37, 40, 42] },
  { name: "Inner Peace", chinese: "内在平静", chapters: [8, 10, 15, 16, 33, 44, 45, 46, 48, 52, 56] },
  { name: "Relationships", chinese: "关系", chapters: [2, 5, 22, 23, 27, 36, 49, 63, 67, 68, 79] },
  { name: "Leadership", chinese: "领导力", chapters: [3, 17, 18, 19, 29, 30, 31, 39, 57, 58, 59, 60, 61, 65, 66, 72, 75, 77] },
  { name: "Life Choices", chinese: "人生选择", chapters: [7, 9, 12, 13, 20, 24, 26, 35, 41, 43, 47, 50, 51, 53, 54, 55, 62, 64, 69, 70, 71, 73, 74, 76, 78, 80, 81] },
  { name: "Simplicity", chinese: "简单生活", chapters: [6, 11, 28, 38] },
];

const openings = [
  "道可道，非常道。名可名，非常名。", "天下皆知美之为美，斯恶已；皆知善之为善，斯不善已。",
  "不尚贤，使民不争；不贵难得之货，使民不为盗。", "道冲而用之，或不盈。渊兮，似万物之宗。",
  "天地不仁，以万物为刍狗；圣人不仁，以百姓为刍狗。", "谷神不死，是谓玄牝。玄牝之门，是谓天地根。",
  "天长地久。天地所以能长且久者，以其不自生，故能长生。", "上善若水。水善利万物而不争，处众人之所恶，故几于道。",
  "持而盈之，不如其已；揣而锐之，不可长保。", "载营魄抱一，能无离乎？专气致柔，能婴儿乎？",
  "三十辐，共一毂；当其无，有车之用。", "五色令人目盲；五音令人耳聋；五味令人口爽。",
  "宠辱若惊，贵大患若身。", "视之不见名曰夷，听之不闻名曰希，搏之不得名曰微。",
  "古之善为士者，微妙玄通，深不可识。", "致虚极，守静笃。万物并作，吾以观复。",
  "太上，下知有之；其次，亲而誉之；其次，畏之；其次，侮之。", "大道废，有仁义；智慧出，有大伪。",
  "绝圣弃智，民利百倍；绝仁弃义，民复孝慈。", "绝学无忧。唯之与阿，相去几何？",
  "孔德之容，惟道是从。", "曲则全，枉则直，洼则盈，敝则新，少则得，多则惑。",
  "希言自然。故飘风不终朝，骤雨不终日。", "企者不立，跨者不行；自见者不明，自是者不彰。",
  "有物混成，先天地生。寂兮寥兮，独立而不改。", "重为轻根，静为躁君。",
  "善行无辙迹；善言无瑕谪；善数不用筹策。", "知其雄，守其雌，为天下溪。",
  "将欲取天下而为之，吾见其不得已。", "以道佐人主者，不以兵强天下。",
  "夫兵者，不祥之器，物或恶之，故有道者不处。", "道常无名，朴。虽小，天下莫能臣。",
  "知人者智，自知者明。胜人者有力，自胜者强。", "大道泛兮，其可左右。万物恃之以生而不辞。",
  "执大象，天下往。往而不害，安平泰。", "将欲歙之，必故张之；将欲弱之，必故强之。",
  "道常无为而无不为。", "上德不德，是以有德；下德不失德，是以无德。",
  "昔之得一者：天得一以清，地得一以宁。", "反者道之动；弱者道之用。",
  "上士闻道，勤而行之；中士闻道，若存若亡。", "道生一，一生二，二生三，三生万物。",
  "天下之至柔，驰骋天下之至坚。", "名与身孰亲？身与货孰多？得与亡孰病？",
  "大成若缺，其用不弊。大盈若冲，其用不穷。", "天下有道，却走马以粪；天下无道，戎马生于郊。",
  "不出户，知天下；不窥牖，见天道。", "为学日益，为道日损。损之又损，以至于无为。",
  "圣人常无心，以百姓心为心。", "出生入死。生之徒，十有三；死之徒，十有三。",
  "道生之，德畜之，物形之，势成之。", "天下有始，以为天下母。",
  "使我介然有知，行于大道，唯施是畏。", "善建者不拔，善抱者不脱。",
  "含德之厚，比于赤子。", "知者不言，言者不知。挫其锐，解其纷。",
  "以正治国，以奇用兵，以无事取天下。", "其政闷闷，其民淳淳；其政察察，其民缺缺。",
  "治人事天，莫若啬。", "治大国，若烹小鲜。",
  "大国者下流，天下之交，天下之牝。", "道者万物之奥。善人之宝，不善人之所保。",
  "为无为，事无事，味无味。", "其安易持，其未兆易谋。千里之行，始于足下。",
  "古之善为道者，非以明民，将以愚之。", "江海所以能为百谷王者，以其善下之。",
  "天下皆谓我道大，似不肖。我有三宝：一曰慈，二曰俭，三曰不敢为天下先。", "善为士者不武；善战者不怒；善胜敌者不与。",
  "用兵有言：吾不敢为主，而为客；不敢进寸，而退尺。", "吾言甚易知，甚易行。天下莫能知，莫能行。",
  "知不知，尚矣；不知知，病也。", "民不畏威，则大威至。无狎其所居，无厌其所生。",
  "勇于敢则杀，勇于不敢则活。", "民不畏死，奈何以死惧之？",
  "民之饥，以其上食税之多，是以饥。", "人之生也柔弱，其死也坚强。草木之生也柔脆，其死也枯槁。",
  "天之道，其犹张弓欤？高者抑之，下者举之。", "天下莫柔弱于水，而攻坚强者莫之能胜。",
  "和大怨，必有余怨，安可以为善？", "小国寡民。甘其食，美其服，安其居，乐其俗。",
  "信言不美，美言不信。善者不辩，辩者不善。",
];

const featured: Record<number, Partial<TaoChapter>> = {
  1: { english: "The Tao that can be spoken is not the enduring Tao. The name that can be named is not the enduring name.", insight: "Not everything meaningful can be controlled by definitions. Leave room for mystery before rushing to explain.", practice: "Notice one thing today without naming, judging, or fixing it for sixty seconds.", reflection: "What becomes possible when you do not need an immediate answer?" },
  8: { english: "The highest goodness is like water. Water benefits all things without competing.", insight: "Water does not prove its strength. It adapts, nourishes, and keeps moving toward what is needed.", practice: "Solve one problem today without proving that you are right.", reflection: "Where could softness help you move forward?" },
  16: { english: "Reach complete emptiness; hold firmly to stillness. As all things arise, watch them return.", insight: "Stillness is not withdrawal. It is the place where patterns become visible and the nervous system can reset.", practice: "Take three quiet minutes before your next important decision.", reflection: "What can you understand only when you stop moving?" },
  22: { english: "Yield and remain whole. Bend and become straight. Be empty and become full.", insight: "Flexibility protects what rigidity breaks. Yielding can be a mature way to preserve energy and relationship.", practice: "In one conversation, replace your defense with one honest question.", reflection: "What are you protecting by refusing to bend?" },
  33: { english: "Knowing others is intelligence; knowing yourself is true clarity. Mastering yourself is strength.", insight: "Self-knowledge turns comparison into direction. The clearest next step begins with an honest inner view.", practice: "Name one feeling, one need, and one choice available to you now.", reflection: "What truth about yourself are you ready to accept?" },
  44: { english: "Which is dearer, your name or your life? Know contentment and avoid disgrace; know when to stop and avoid danger.", insight: "More is not always progress. Enough is a boundary that protects time, health, and attention.", practice: "Choose one task to stop, postpone, or simplify today.", reflection: "What would enough look like in your life right now?" },
  48: { english: "In learning, gain daily. In following Tao, let go daily—until effortless action becomes possible.", insight: "Growth is not only accumulation. Wisdom often appears when noise, urgency, and unnecessary effort are removed.", practice: "Remove one nonessential commitment from this week.", reflection: "What are you ready to stop carrying?" },
  60: { english: "Governing a large country is like cooking a small fish.", insight: "Overhandling damages delicate systems. Good leadership creates conditions, then resists unnecessary interference.", practice: "Give one person space to complete a task in their own way.", reflection: "Where are you managing too tightly?" },
  64: { english: "A journey of a thousand miles begins beneath your feet. Attend to the ending as carefully as the beginning.", insight: "Large change grows from small, repeatable actions. Care at the final step matters as much as motivation at the start.", practice: "Do the smallest visible action toward one delayed goal.", reflection: "What is the next step—not the whole journey?" },
  67: { english: "I have three treasures: compassion, simplicity, and not daring to be first in the world.", insight: "Compassion gives courage, simplicity gives capacity, and humility makes lasting influence possible.", practice: "Let compassion choose the tone of one difficult message.", reflection: "Which of the three treasures do you need most today?" },
  78: { english: "Nothing in the world is softer than water, yet nothing surpasses it in overcoming the hard.", insight: "Softness can endure where force exhausts itself. Resilience is the ability to remain responsive without losing form.", practice: "Meet resistance with a slower pace and a softer response.", reflection: "How can you stay soft without abandoning your boundary?" },
  81: { english: "Truthful words are not ornate; ornate words are not truthful. The Tao of heaven benefits and does not harm.", insight: "A wise life values truth over performance and contribution over accumulation.", practice: "Say one necessary thing today in the simplest honest words.", reflection: "What can you give without needing recognition?" },
};

function themesFor(number: number) {
  return themes.filter((theme) => theme.chapters.includes(number)).map((theme) => theme.name);
}

export const chapters: TaoChapter[] = openings.map((opening, index) => {
  const number = index + 1;
  const detail = featured[number] ?? {};
  return {
    number,
    opening,
    english: detail.english ?? "A brief invitation to notice balance, natural timing, and the cost of unnecessary force.",
    insight: detail.insight ?? "Read this chapter slowly. Its value is less in finding one fixed answer than in noticing where life is asking for less force and more awareness.",
    practice: detail.practice ?? "Pause once today before reacting, and choose the smallest useful action.",
    reflection: detail.reflection ?? "Where might a quieter response create a better result?",
    themes: themesFor(number),
  };
});

export const getChapter = (number: number) => chapters.find((chapter) => chapter.number === number);
