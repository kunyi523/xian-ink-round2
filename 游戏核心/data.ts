export const RARITY = ["凡人", "炼气", "筑基", "金丹", "元婴", "化神", "合体", "仙人"] as const;
export const RARITY_COLOR = [
  "#8a8478", // 凡人 · gray ink
  "#4a6b66", // 炼气 · teal-ink
  "#3a5278", // 筑基 · blue-ink
  "#a63d32", // 金丹 · cinnabar
  "#6b3a7a", // 元婴 · purple-ink
  "#1c1914", // 化神 · near-black
  "#5c4820", // 合体 · dark gold-brown
  "#2a2410", // 仙人 · near-black gold tint
] as const;

export type BonusKind = "dps" | "click" | "jade" | "crit" | "explore" | "sword" | "offline" | "dao" | "startQi";

export type BuildingDef = {
  id: string;
  name: string;
  sprite: string;
  flavor: string;
  perk: string;
  tiers: [string, string, string];
  baseCost: number;
  costScale: number;
  baseDps: number;
  color: string;
  projectile: "orb" | "sword" | "bolt" | "spark";
};

export const BUILDINGS: BuildingDef[] = [
  {
    id: "hall",
    name: "开山香案",
    sprite: "hall",
    flavor: "空峰第一炷香。烟起之处，山才认你作主人。",
    perk: "香火：全山山息随等级提升",
    tiers: ["残案", "香火", "仙案"],
    baseCost: 15,
    costScale: 1.15,
    baseDps: 0.5,
    color: "#1c1914",
    projectile: "orb",
  },
  {
    id: "house",
    name: "云阶茅舍",
    sprite: "house",
    flavor: "山麓入山口。灯一盏盏亮起，便有人替你守夜开光。",
    perk: "人潮：缓慢香火自燃，并多开云游槽",
    tiers: ["茅阶", "云阶", "万灯"],
    baseCost: 100,
    costScale: 1.14,
    baseDps: 3,
    color: "#3a3630",
    projectile: "spark",
  },
  {
    id: "sword",
    name: "悬剑冢",
    sprite: "sword",
    flavor: "右脊插满旧剑。剑醒之后，自行出鞘绕峰。",
    perk: "剑鸣：悬剑冢、镇峰残纹额外增幅",
    tiers: ["剑石", "剑冢", "万剑鸣"],
    baseCost: 1100,
    costScale: 1.13,
    baseDps: 18,
    color: "#2a2622",
    projectile: "sword",
  },
  {
    id: "array",
    name: "镇峰残纹",
    sprite: "array",
    flavor: "山左残台。一笔一笔补回阵纹，峰才肯稳住。",
    perk: "阵眼：镇峰残纹山息随等级提升",
    tiers: ["残纹", "镇峰", "伐天纹"],
    baseCost: 12000,
    costScale: 1.13,
    baseDps: 92,
    color: "#a63d32",
    projectile: "sword",
  },
  {
    id: "mine",
    name: "龙脉口",
    sprite: "mine",
    flavor: "山腹脉眼。疏通之后，脉晶自己往外渗。",
    perk: "脉晶：挂机渗出灵矿",
    tiers: ["脉眼", "龙脉", "灵渊"],
    baseCost: 130000,
    costScale: 1.12,
    baseDps: 480,
    color: "#4a453e",
    projectile: "orb",
  },
  {
    id: "tower",
    name: "雷骨塔",
    sprite: "tower",
    flavor: "近峰木骨。雷纹一接，指尖开光带神雷。",
    perk: "神雷：强化指尖开光",
    tiers: ["木骨", "雷骨", "九霄"],
    baseCost: 1.4e6,
    costScale: 1.12,
    baseDps: 2600,
    color: "#1c1914",
    projectile: "bolt",
  },
  {
    id: "mirror",
    name: "望劫镜",
    sprite: "mirror",
    flavor: "崖上旧镜正对劫云。擦亮了，仙果来得勤。",
    perk: "望劫：开光增强，仙果更频",
    tiers: ["铜镜", "望劫", "星河"],
    baseCost: 2.0e7,
    costScale: 1.12,
    baseDps: 14000,
    color: "#6e2a24",
    projectile: "orb",
  },
  {
    id: "alchemy",
    name: "瀑侧丹灶",
    sprite: "alchemy",
    flavor: "瀑边土灶。炉烟一起，灵草便顺水滴下。",
    perk: "丹烟：挂机渗出灵草",
    tiers: ["土灶", "丹烟", "太乙"],
    baseCost: 3.3e8,
    costScale: 1.11,
    baseDps: 78000,
    color: "#a63d32",
    projectile: "spark",
  },
];

export type DiscipleDef = {
  id: string;
  name: string;
  title: string;
  rarity: number;
  bonus: { kind: BonusKind; value: number };
  flavor: string;
  sprite: "mascot" | "outer" | "elder" | "sword" | "immortal";
  portrait: string;
};

export const DISCIPLES: DiscipleDef[] = [
  { id: "ago", name: "阿狗", title: "外门杂役", rarity: 0, bonus: { kind: "dps", value: 0.012 }, flavor: "山门扫地的。据说扫着扫着扫出了大道。", sprite: "outer", portrait: "ago" },
  { id: "xiaohua", name: "小花", title: "药园童子", rarity: 0, bonus: { kind: "explore", value: 0.03 }, flavor: "认得三百种能吃的草，其中十二种真能吃。", sprite: "mascot", portrait: "xiaohua" },
  { id: "linzhou", name: "林小舟", title: "外门弟子", rarity: 1, bonus: { kind: "click", value: 0.04 }, flavor: "每天打坐到腿麻，腿麻即是悟道。", sprite: "outer", portrait: "ago" },
  { id: "qinghe", name: "清荷", title: "记名弟子", rarity: 1, bonus: { kind: "dps", value: 0.03 }, flavor: "话很少，剑很快。", sprite: "mascot", portrait: "qinghe" },
  { id: "suqing", name: "苏清寒", title: "内门执事", rarity: 2, bonus: { kind: "jade", value: 0.08 }, flavor: "管香火簿的。把缘玉算成了气运。", sprite: "elder", portrait: "chiyun" },
  { id: "tiewei", name: "铁卫", title: "护山执事", rarity: 2, bonus: { kind: "dps", value: 0.05 }, flavor: "一块会走路的盾。", sprite: "elder", portrait: "tiewei" },
  { id: "mowuchen", name: "墨无尘", title: "金丹长老", rarity: 3, bonus: { kind: "sword", value: 0.12 }, flavor: "一剑从东边的云里来。金丹以上可御剑绕劫。", sprite: "elder", portrait: "jianjiu" },
  { id: "chiyun", name: "赤云真人", title: "丹堂主事", rarity: 3, bonus: { kind: "click", value: 0.1 }, flavor: "炼丹炼到炉鼎认他当师傅。金丹以上可御剑绕劫。", sprite: "elder", portrait: "chiyun" },
  { id: "yunjun", name: "云中君", title: "元婴真君", rarity: 4, bonus: { kind: "dps", value: 0.12 }, flavor: "人在茅舍，神在云上。御剑绕劫云而斩。", sprite: "sword", portrait: "xuantian" },
  { id: "luohua", name: "落花神君", title: "元婴神君", rarity: 4, bonus: { kind: "explore", value: 0.18 }, flavor: "专寻别人寻不到的云游处。御剑绕劫云而斩。", sprite: "mascot", portrait: "xiaohua" },
  { id: "jianjiu", name: "剑九", title: "化神剑仙", rarity: 5, bonus: { kind: "sword", value: 0.22 }, flavor: "第九剑从未出鞘。据说出鞘那天，天道要让路。", sprite: "sword", portrait: "jianjiu" },
  { id: "mingyue", name: "明月尊者", title: "化神尊者", rarity: 5, bonus: { kind: "crit", value: 0.08 }, flavor: "一瞥即是暴机。御剑绕劫云而斩。", sprite: "sword", portrait: "qinghe" },
  { id: "xuantian", name: "玄天老祖", title: "合体老祖", rarity: 6, bonus: { kind: "dps", value: 0.22 }, flavor: "闭关三千年，出来发现山门匾额换了。", sprite: "immortal", portrait: "xuantian" },
  { id: "wangji", name: "太上忘机", title: "散仙", rarity: 6, bonus: { kind: "offline", value: 0.35 }, flavor: "睡着山息也不停。令人羡慕。", sprite: "immortal", portrait: "xuantian" },
  { id: "tiandao", name: "无名", title: "仙人", rarity: 7, bonus: { kind: "dps", value: 0.4 }, flavor: "没有名字。天道记得他就够了。", sprite: "immortal", portrait: "chuchen" },
  { id: "chuchen", name: "初尘", title: "仙人", rarity: 7, bonus: { kind: "click", value: 0.45 }, flavor: "第一缕香火凝成的人。开光一下，空峰亮一下。", sprite: "immortal", portrait: "chuchen" },
];

export const GACHA_WEIGHTS = [46, 26, 14, 8, 4, 1.4, 0.45, 0.15];

export type SkillDef = {
  id: string;
  name: string;
  desc: string;
  max: number;
  cost: number;
  costScale: number;
  kind: BonusKind;
  value: number;
};

export const SKILLS: SkillDef[] = [
  { id: "breath", name: "山息诀", desc: "全山山息", max: 20, cost: 1, costScale: 1.45, kind: "dps", value: 0.08 },
  { id: "mind", name: "开光指", desc: "指尖开光所得香火", max: 20, cost: 1, costScale: 1.45, kind: "click", value: 0.08 },
  { id: "swordheart", name: "剑冢印", desc: "剑系印记增幅", max: 15, cost: 2, costScale: 1.5, kind: "sword", value: 0.1 },
  { id: "luck", name: "香火运", desc: "缘玉与开光暴机", max: 12, cost: 2, costScale: 1.55, kind: "jade", value: 0.06 },
  { id: "cave", name: "闭关庐", desc: "离山时山门代收", max: 12, cost: 2, costScale: 1.5, kind: "offline", value: 0.12 },
  { id: "seed", name: "劫后余种", desc: "劫后归山起步香火", max: 8, cost: 3, costScale: 1.65, kind: "startQi", value: 1 },
  { id: "senseDao", name: "听劫", desc: "劫余道果与双倍机缘", max: 10, cost: 2, costScale: 1.55, kind: "dao", value: 0.05 },
];

export type ClickUpgradeDef = {
  id: string;
  name: string;
  desc: string;
  baseCost: number;
  scale: number;
  max?: number;
  needSense?: number;
};

export const CLICK_UPGRADES: ClickUpgradeDef[] = [
  { id: "sense", name: "指尖开光", desc: "每一次开光更沉", baseCost: 20, scale: 1.18 },
  { id: "critC", name: "劫纹窥机", desc: "提高开光暴机", baseCost: 80, scale: 1.22, max: 20 },
  { id: "critD", name: "灵犀一触", desc: "提高暴机所得", baseCost: 120, scale: 1.24, max: 16 },
  { id: "auto", name: "山中无为", desc: "香火自燃。需指尖开光 5 级", baseCost: 400, scale: 1.28, max: 25, needSense: 5 },
];

export type CraftDef = {
  id: string;
  name: string;
  desc: string;
  max: number;
  herbs: number;
  ore: number;
  jade: number;
  kind: BonusKind;
  value: number;
};

export const CRAFTS: CraftDef[] = [
  { id: "talisman", name: "开光符", desc: "指尖开光增强", max: 10, herbs: 8, ore: 2, jade: 2, kind: "click", value: 0.06 },
  { id: "swordblank", name: "剑胚", desc: "剑系印记增幅", max: 10, herbs: 4, ore: 10, jade: 3, kind: "sword", value: 0.08 },
  { id: "pill", name: "山息丹", desc: "全山山息", max: 10, herbs: 12, ore: 4, jade: 2, kind: "dps", value: 0.07 },
  { id: "mirrorbit", name: "镜屑", desc: "开光暴机", max: 8, herbs: 6, ore: 8, jade: 4, kind: "crit", value: 0.02 },
];

export type RealmDef = {
  id: string;
  name: string;
  duration: number;
  unlockLayer: number;
  jade: [number, number];
  herbs: [number, number];
  ore: [number, number];
  qi: number;
};

export const REALMS: RealmDef[] = [
  { id: "backhill", name: "后山石径", duration: 20, unlockLayer: 0, jade: [1, 2], herbs: [1, 3], ore: [0, 1], qi: 40 },
  { id: "mist", name: "紫霞涧", duration: 45, unlockLayer: 2, jade: [2, 4], herbs: [3, 6], ore: [1, 2], qi: 180 },
  { id: "swordtomb", name: "古剑沉谷", duration: 90, unlockLayer: 6, jade: [3, 6], herbs: [2, 5], ore: [3, 6], qi: 700 },
  { id: "ascend", name: "望仙台", duration: 150, unlockLayer: 12, jade: [5, 10], herbs: [4, 8], ore: [4, 8], qi: 2400 },
];
