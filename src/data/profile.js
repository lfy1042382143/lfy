/**
 * 站点内容配置 —— 所有页面的数据都集中在这里
 * 后续补充真实信息时，只需要改这个文件，无需动页面模板。
 * 标注 pending: true 的条目会在页面上显示「待补充」标记。
 */

/* ------------------------------ 基本信息 ------------------------------ */
const BIRTHDAY = '2003-05-31'

function calcAge(birthday) {
  const birth = new Date(birthday)
  const now = new Date()
  let result = now.getFullYear() - birth.getFullYear()
  const m = now.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) result -= 1
  return result
}

export const age = calcAge(BIRTHDAY)

export const profile = {
  name: '刘福洋',
  englishName: 'Liu Fuyang',
  initials: 'LFY',
  birthday: BIRTHDAY,
  birthdayText: '2003 年 5 月 31 日',
  gender: '男',
  age,
  title: '软件工程 · 中外合作办学',
  role: '广西科技大学 × 南十字星大学',
  intro:
    '2003 年生于内蒙古赤峰，在大连读完小学到高中，后来到柳州读软件工程——中澳合作办学项目，四年下来既学会了写代码，也习惯了全英文的课堂。',
  slogan: '把学到的东西，做成能跑起来的东西。',
  email: 'liufuyang@example.com',
  phone: '', // 待补充
  wechat: '', // 待补充
  bio: [
    '你好，我是刘福洋。软件工程专业，读的是广西科技大学与澳大利亚南十字星大学合作举办的本科项目：四年都在柳州完成，澳方老师带着原版教材过来全英文授课，毕业时拿到中澳两边的学位证书。',
    '我喜欢那种「想法变成能点开的东西」的过程——从一行代码到一个能交付的小项目。这个站点用来记录我的经历、学校和目前掌握的东西，也会慢慢补充更多细节。',
  ],
  tags: ['软件工程', '中外合作办学', 'Java', 'Python', 'Web 开发', '英文授课'],
  cities: [
    {
      tag: '出生地',
      name: '内蒙古 · 赤峰',
      desc: '2003 年在这里出生。北方的四季和辽阔，是我对「家」最早的印象。',
      icon: '🌾',
      colorKey: 'gold',
    },
    {
      tag: '成长地',
      name: '辽宁 · 大连',
      desc: '小学、初中、高中十二年都在大连，海边长大的孩子，出门习惯带件外套。',
      icon: '🌊',
      colorKey: 'brand',
    },
    {
      tag: '求学地',
      name: '广西 · 柳州',
      desc: '大学四年在柳州，柳江、紫荆花和一碗螺蛳粉，是这段时光的底色。',
      icon: '⛰️',
      colorKey: 'deep',
    },
  ],
  stats: [
    { value: String(age), suffix: '岁', label: '2003 年出生' },
    { value: '3', suffix: '座', label: '赤峰 · 大连 · 柳州' },
    { value: '12', suffix: '年', label: '在大连求学' },
    { value: '2', suffix: '份', label: '中澳学位证书' },
  ],
  social: [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/' },
    { name: '邮箱', icon: 'mail', url: 'mailto:liufuyang@example.com' },
  ],
}

/* ------------------------------ 个人经历 ------------------------------ */
export const journey = [
  {
    year: '2025.06',
    stage: '里程碑',
    title: '本科毕业 · 拿到两份学位证书',
    subtitle: '广西科技大学 × 南十字星大学',
    description:
      '完成软件工程专业（中外合作办学）四年学业，成绩合格，同时获得广西科技大学本科毕业证书、工学学士学位证书，以及澳大利亚南十字星大学信息技术学士学位证书（教育部认证）。',
    highlights: ['工学学士', '信息技术学士', 'ACS 认证项目'],
    type: 'growth',
  },
  {
    year: '2021.09 - 2025.06',
    stage: '大学',
    title: '软件工程（中外合作办学）',
    subtitle: '广西科技大学 · 国际教育学院',
    description:
      '四年制「4+0」培养模式，全程在柳州完成。大一有一年的英语强化训练，之后由澳方教师用原版教材全英文授课，课程覆盖程序设计、数据结构、数据库、软件工程与软件测试等。',
    highlights: ['4+0 培养模式', '全英文澳方课程', '中澳共同制定培养方案'],
    type: 'uni',
  },
  {
    year: '2018.09 - 2021.06',
    stage: '高中',
    title: '北京语言大学附属大连高级中学',
    subtitle: '辽宁 · 大连 · 高中三年',
    description:
      '2018 年入学，2021 年毕业，高中三年在大连的北京语言大学附属大连高级中学度过，之后从大连到柳州读大学。',
    highlights: ['大连', '2018 - 2021'],
    type: 'study',
  },
  {
    year: '2015.09 - 2018.06',
    stage: '初中',
    title: '大连市第十八中学',
    subtitle: '辽宁 · 大连 · 初中三年',
    description: '2015 年入学，2018 年毕业，初中三年就读于大连市第十八中学。',
    highlights: ['大连', '2015 - 2018'],
    type: 'study',
  },
  {
    year: '2009.09 - 2015.06',
    stage: '小学',
    title: '辛寨子中心小学',
    subtitle: '辽宁 · 大连 · 小学六年',
    description: '2009 年入学，2015 年毕业，小学六年在大连辛寨子中心小学就读。',
    highlights: ['大连', '2009 - 2015'],
    type: 'study',
  },
  {
    year: '2003.05.31',
    stage: '起点',
    title: '出生在内蒙古赤峰',
    subtitle: '内蒙古自治区赤峰市',
    description: '2003 年 5 月 31 日出生，之后随家人到大连生活，在那里度过了小学到高中的十二年。',
    highlights: ['赤峰', '男'],
    type: 'growth',
  },
]

/* ------------------------------ 教育背景 ------------------------------ */
export const education = [
  {
    school: '广西科技大学',
    schoolEn: 'Guangxi University of Science and Technology',
    college: '国际教育学院',
    major: '软件工程（中外合作办学）',
    degree: '工学学士',
    period: '2021.09 - 2025.06',
    location: '广西柳州市城中区文昌路 2 号 · 文昌校区',
    gpa: '',
    rank: '',
    logoText: '广科大',
    primary: true,
    summary:
      '就读于广西科技大学国际教育学院，专业是学校与澳大利亚南十字星大学合作举办的软件工程本科项目（教育部批准书编号 MOE45AU2A20131469N，专业代码 080902H）。项目自 2014 年起开办，采用「4+0」培养模式，四年全程在广西科技大学完成，中澳双方共同制定培养方案，并通过澳大利亚计算机协会（ACS）认证。',
    courses: [
      '程序设计基础',
      '数据结构与算法',
      '面向对象程序设计',
      '数据库原理',
      '计算机网络',
      '操作系统',
      '软件工程',
      '软件测试',
      'Web 开发',
      '学术英语',
    ],
    points: [
      { name: '4+0 培养模式', desc: '四年都在广西科技大学完成，无需出国即可获得澳方学位。' },
      { name: '全英文澳方课程', desc: '引进 21 门澳方优势课程，澳方教师使用原版教材、全英文授课。' },
      { name: '一年英语强化', desc: '大一安排英语强化训练，为后续全英文课堂与作业打基础。' },
      { name: 'ACS 认证', desc: '项目通过澳大利亚计算机协会（ACS）认证，学位含金量有据可查。' },
    ],
    honors: [],
    campus: [
      '使用南十字星大学 Blackboard 教学系统与 Collaborate 在线课堂，按澳方要求完成作业与小组汇报。',
      '在校期间的社团、竞赛等具体经历正在补充中。',
    ],
    scores: [],
    quote: {
      text: '英语强化那一年最难受，但也是它让我后来能跟上澳方老师的课。',
      cite: '—— 关于大学四年的一点体会',
    },
  },
  {
    school: '澳大利亚南十字星大学',
    schoolEn: 'Southern Cross University',
    major: 'Bachelor of Information Technology（信息技术）',
    degree: '信息技术学士',
    period: '合作办学 · 毕业授予',
    location: '澳大利亚新南威尔士州 · 利斯莫尔',
    gpa: '',
    rank: '',
    logoText: 'SCU',
    coop: true,
    summary:
      '合作办学的外方院校，1970 年成立的澳大利亚公立大学，校名取自南半球夜空中最亮的南十字星座，2024 年位列泰晤士高等教育全球最佳年轻大学前 100 名。作为项目澳方学校，为本项目学生开放教学系统，并颁发信息技术学士学位证书（教育部认证）。',
    courses: ['Information Technology', 'Software Engineering', 'Database Systems', 'Web Development'],
    points: [
      { name: '学位证书', desc: '成绩合格者可获颁 Bachelor of Information Technology，教育部予以认证。' },
      { name: '优先录取', desc: '毕业后可优先录取赴南十字星大学继续攻读硕士学位。' },
    ],
    honors: [],
    campus: [],
    scores: [],
  },
]

/* 中学阶段 */
export const middleSchools = [
  {
    stage: '高中',
    period: '2018.09 - 2021.06',
    city: '辽宁 · 大连',
    name: '北京语言大学附属大连高级中学',
  },
  { stage: '初中', period: '2015.09 - 2018.06', city: '辽宁 · 大连', name: '大连市第十八中学' },
  { stage: '小学', period: '2009.09 - 2015.06', city: '辽宁 · 大连', name: '辛寨子中心小学' },
]

/* ------------------------------ 实践与技能 ------------------------------ */
export const practices = [
  {
    kind: '实习经历',
    period: '待补充',
    title: '实习经历整理中',
    desc: '如果后续有实习、兼职或外包项目，会在这里按「时间 / 角色 / 做了什么 / 结果」的格式补充。',
    pending: true,
  },
  {
    kind: '项目经历',
    period: '待补充',
    title: '课程项目与个人项目',
    desc: '课程设计、毕业设计、自己动手写的小工具都会放在这里，附上技术栈和仓库链接。',
    pending: true,
  },
]

export const skills = [
  { name: 'Java', value: 78, note: '面向对象、集合、基础 JavaWeb' },
  { name: 'Python', value: 72, note: '数据处理脚本、爬虫与自动化小工具' },
  { name: 'MySQL / 数据库设计', value: 70, note: '建表规范、多表查询、基础索引' },
  { name: 'HTML / CSS / JavaScript', value: 75, note: '响应式页面、原生交互、常用布局' },
  { name: 'Vue 3', value: 65, note: '组件化开发、路由与状态管理入门' },
  { name: 'Git / Linux 基础', value: 68, note: '分支管理、命令行操作、简单部署' },
]

export const certificates = [
  { name: '广西科技大学 · 本科毕业证书', org: '广西科技大学', year: '2025', done: true },
  { name: '工学学士学位证书（软件工程）', org: '广西科技大学', year: '2025', done: true },
  { name: '信息技术学士学位证书', org: '澳大利亚南十字星大学 · 教育部认证', year: '2025', done: true },
  { name: '大学英语四级 / 六级', org: '全国大学英语考试', year: '待补充', done: false },
  { name: '其他技能证书', org: '待补充', year: '待补充', done: false },
]

export const learningWays = [
  { icon: '🧱', title: '先跑起来', desc: '不追求一次写对，先让最小版本跑通，再一点点补上结构和边界。' },
  { icon: '📖', title: '英文资料直接读', desc: '四年英文课堂养成的习惯：官方文档优先，报错原文比二手翻译靠谱。' },
  { icon: '🔁', title: '把踩过的坑记下来', desc: '遇到的报错和解决方式都留一份笔记，下次少绕一圈。' },
]

/* ------------------------------ 兴趣爱好 ------------------------------ */
export const hobbies = [
  {
    icon: '🤖',
    name: '拼高达',
    level: '高达模型 · 手作',
    desc: '剪件、修水口、组装、贴贴纸，一步步把一堆板件变成一台机器人。比起摆在架子上看，我更享受拼的那几个小时——手上有活，脑子反而空得下来。',
    tags: ['高达模型', '拼装', '手作'],
    metric: '动手',
    metricLabel: '最解压的时候',
  },
  {
    icon: '🃏',
    name: 'PTCG',
    level: '宝可梦集换式卡牌 · 只收藏',
    desc: '只收藏，不打牌。喜欢的是卡面插画和一些特定的宝可梦，碰到合眼缘的就收起来，按系列整理进卡册——翻卡册本身就很解压。',
    tags: ['宝可梦', '卡面插画', '收藏'],
    metric: '收藏',
    metricLabel: '只收不打',
  },
  {
    icon: '🎯',
    name: 'Apex 英雄',
    level: 'FPS · 大逃杀 · 单排',
    desc: '基本只单排，跳点、搜物资、转移全自己判断，输赢也自己扛。最高打到钻石——再往上单排的容错率太低了，就停在这儿。',
    tags: ['FPS', '大逃杀', '单排'],
    metric: '钻石',
    metricLabel: '最高段位',
  },
  {
    icon: '⚔️',
    name: 'Warframe',
    level: '刷宝射击 · 配装',
    desc: '一款把「堆数值」做成学问的游戏。MOD 怎么插、武器怎么配、哪个战甲适合哪种任务，本质上都是在解一道优化题。',
    tags: ['刷宝射击', '配装', '科幻'],
    metric: '配装',
    metricLabel: '最花时间',
  },
]

/* ------------------------------ 联系与地址 ------------------------------ */
export const contact = {
  address: '广西壮族自治区柳州市城中区文昌路 2 号 · 广西科技大学（文昌校区）',
  addressShort: '广西柳州 · 广西科技大学',
  postcode: '545006',
  // GCJ-02 火星坐标（腾讯地图 / 高德通用）：广西科技大学文昌校区
  center: { lat: 24.324255, lng: 109.448967 },
  zoom: 15,
  traffic: [
    { icon: '🚄', text: '柳州站 → 乘坐 54 路公交至「广西科技大学」站，步行约 200 米' },
    { icon: '🚌', text: '市区方向可乘 B102 路至「龙潭公园」站，步行约 800 米到校门' },
    { icon: '✈️', text: '白莲机场 → 机场快线 2 号线至「文昌路西」，换乘 30 路到「广科大东门」' },
  ],
  workingHours: '在校期间 · 邮件随时可发，一般当天回复',
  tips: '如果要来学校找我，提前说一声，我把时间和具体地点一起定好，校门登记也方便些。',
}

/* ------------------------------ 首页亮点 ------------------------------ */
export const highlights = [
  {
    icon: '🎓',
    title: '中澳合作培养',
    desc: '4+0 模式，中澳双方共同制定培养方案，毕业拿到广西科技大学与南十字星大学两份学位证书。',
  },
  {
    icon: '💻',
    title: '软件工程专业',
    desc: '从程序设计与数据结构，到数据库、软件测试与 Web 开发，专业基础打得比较系统。',
  },
  {
    icon: '🌏',
    title: '全英文课堂',
    desc: '澳方教师用原版教材全英文授课，习惯了读英文文档、写英文作业和做小组汇报。',
  },
]
