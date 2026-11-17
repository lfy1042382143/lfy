/**
 * 站点内容配置 —— 所有页面的数据都集中在这里
 * 后续补充真实信息时，只需要改这个文件，无需动页面模板。
 */

/* ------------------------------ 基本信息 ------------------------------ */
export const profile = {
  name: '张三',
  englishName: 'Zhang San',
  initials: 'ZS',
  title: '前端工程师 / 独立开发者',
  intro:
    '一名常居杭州的前端工程师，6 年电商与内容平台经验，喜欢把复杂的业务抽象成清晰的组件与流程。',
  slogan: '把复杂留给自己，把简单交给用户。',
  bio: [
    '你好，我是张三。目前在做内容中台的前端架构，日常打交道的是组件设计、构建链路和性能指标。比起写得多漂亮，我更在意方案在线上跑得稳不稳。',
    '工作之外，我用相机记录城市，用长跑丈量街道，也会把一些想法写成开源项目。这个站点是我的一份长期自述，用来记录经历、项目与生活。',
  ],
  location: '中国 · 浙江 · 杭州',
  email: 'zhangsan@example.com',
  phone: '138****8888',
  wechat: 'zhangsan_dev',
  tags: ['Vue 3', 'TypeScript', 'Node.js', '数据可视化', '性能优化', '摄影'],
  stats: [
    { value: '6', suffix: '年', label: '前端开发经验' },
    { value: '42', suffix: '个', label: '参与交付项目' },
    { value: '1.2k', suffix: '+', label: '开源 Star' },
    { value: '40', suffix: '本', label: '年均阅读量' },
  ],
  social: [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/' },
    { name: '掘金', icon: 'juejin', url: 'https://juejin.cn/' },
    { name: '邮箱', icon: 'mail', url: 'mailto:zhangsan@example.com' },
  ],
}

/* ------------------------------ 个人经历 ------------------------------ */
export const journey = [
  {
    year: '2024 - 至今',
    stage: '现在',
    title: '独立开发与开源',
    subtitle: '业余时间维护个人项目',
    description:
      '把工作里沉淀的组件与工具整理成开源库，累计 1.2k Star；同时维护一个摄影作品集站点，用 Nuxt 做的静态化 + 图片懒加载方案。',
    highlights: ['开源组件库 v2 发布', '技术博客累计 60+ 篇', '摄影站点上线'],
    type: 'growth',
  },
  {
    year: '2022 - 至今',
    stage: '职场',
    title: '高级前端工程师',
    subtitle: '阿里巴巴 · 内容技术团队',
    description:
      '负责内容中台的前端架构，主导从 Vue 2 到 Vue 3 的渐进式迁移，搭建可视化搭建平台，支撑 30+ 业务方日常运营。',
    highlights: ['迁移 12 万行存量代码', '首屏性能提升 46%', '带 3 人小组'],
    type: 'work',
  },
  {
    year: '2019 - 2022',
    stage: '职场',
    title: '前端工程师',
    subtitle: '阿里巴巴 · 电商营销团队',
    description:
      '参与双十一大促会场开发，负责营销活动页引擎与低代码物料建设，支撑峰值 QPS 期间的前端稳定性。',
    highlights: ['大促会场 0 事故', '物料库覆盖 80% 需求'],
    type: 'work',
  },
  {
    year: '2017 - 2019',
    stage: '职场',
    title: '前端开发工程师',
    subtitle: '网易 · 数字内容事业部',
    description:
      '从零参与资讯类 H5 产品开发，完成首版上线；沉淀了埋点 SDK 与移动端适配方案，是职业生涯的起点。',
    highlights: ['首个独立负责项目上线', '沉淀埋点 SDK'],
    type: 'work',
  },
  {
    year: '2013 - 2017',
    stage: '求学',
    title: '本科 · 计算机科学与技术',
    subtitle: '浙江大学 · 计算机学院',
    description:
      '系统学习计算机基础与软件工程，担任校科技社团技术负责人，举办过 5 场前端分享会。',
    highlights: ['GPA 3.8 / 4.0', '校级优秀毕业生', 'ACM 校赛二等奖'],
    type: 'study',
  },
  {
    year: '2010 - 2013',
    stage: '求学',
    title: '高中 · 理科实验班',
    subtitle: '杭州第二中学',
    description: '在这里第一次接触编程，用 VB 写了一个课程表小工具，从此决定学计算机。',
    highlights: ['物理竞赛省三等奖', '校报美编'],
    type: 'study',
  },
]

/* ------------------------------ 教育背景 ------------------------------ */
export const education = [
  {
    school: '浙江大学',
    schoolEn: 'Zhejiang University',
    major: '计算机科学与技术',
    degree: '工学学士',
    period: '2013.09 - 2017.06',
    location: '浙江省杭州市西湖区余杭塘路 866 号',
    gpa: '3.8 / 4.0',
    rank: '专业前 10%',
    logoText: '浙大',
    primary: true,
    summary:
      '四年里把主要精力放在计算机基础与工程实践上：操作系统、编译原理、数据库、计算机网络构成了我的知识底座，社团与外包项目则让我学会把知识变成可交付的东西。',
    courses: [
      '数据结构与算法',
      '操作系统',
      '计算机网络',
      '数据库系统',
      '编译原理',
      '软件工程',
      '计算机图形学',
      '人机交互',
    ],
    honors: [
      { year: '2017', text: '校级优秀毕业生' },
      { year: '2016', text: '国家励志奖学金' },
      { year: '2015', text: 'ACM 程序设计竞赛校赛二等奖' },
      { year: '2014', text: '校科技社团技术负责人' },
    ],
    campus: [
      '担任计算机学院科技社团技术负责人，组织 5 场前端技术分享，累计参与 400+ 人次。',
      '参与学院实验室的课程项目，独立完成一个基于 Canvas 的在线白板。',
      '毕业设计：《面向移动端的前端性能优化方案研究》，获评优秀毕业设计。',
    ],
    scores: [
      { label: '专业课平均分', value: 91 },
      { label: '实践课程评分', value: 95 },
      { label: '毕业设计', value: 93 },
    ],
  },
  {
    school: '杭州第二中学',
    schoolEn: 'Hangzhou No.2 High School',
    major: '理科实验班',
    degree: '高中',
    period: '2010.09 - 2013.06',
    location: '浙江省杭州市上城区建国中路 36 号',
    gpa: '—',
    rank: '年级前 15%',
    logoText: '杭二',
    primary: false,
    summary:
      '高中阶段打下了比较扎实的数理基础，也在信息课上学着写下了第一行代码——一个能自动排课的 VB 小程序。',
    courses: ['数学', '物理', '化学', '信息技术', '通用技术'],
    honors: [
      { year: '2012', text: '全国中学生物理竞赛省三等奖' },
      { year: '2011', text: '校报美术编辑' },
    ],
    campus: ['校报美编，负责版面设计与排版。', '信息课代表，帮同学调试课程作业。'],
    scores: [
      { label: '理科综合', value: 88 },
      { label: '信息技术', value: 96 },
    ],
  },
]

/* ------------------------------ 工作经历 ------------------------------ */
export const workExperience = [
  {
    company: '阿里巴巴集团',
    companyShort: '阿里',
    department: '内容技术团队',
    role: '高级前端工程师',
    period: '2022.07 - 至今',
    location: '杭州 · 西溪园区',
    logoText: 'ALI',
    current: true,
    summary:
      '负责内容中台的前端架构设计与团队技术方案评审，主导 Vue 3 技术栈升级与可视化搭建平台建设，服务 30+ 业务方的日常内容生产。',
    duties: [
      '主导内容中台从 Vue 2 到 Vue 3 的渐进式迁移，设计兼容层与灰度方案，12 万行存量代码平滑过渡。',
      '从 0 到 1 搭建低代码可视化搭建平台，沉淀 60+ 业务物料，活动页产出效率提升约 3 倍。',
      '制定前端性能与稳定性规范，建立 Core Web Vitals 监控看板，首屏 LCP 从 2.8s 优化到 1.5s。',
      '带 3 人前端小组，负责方案评审、代码 Review 与新人培养。',
    ],
    stack: ['Vue 3', 'TypeScript', 'Vite', 'Pinia', 'Node.js', 'Web Components'],
    projects: [
      {
        name: '内容中台可视化搭建平台',
        role: '前端负责人',
        desc: '面向运营的可视化页面搭建工具，支持拖拽编排、实时预览、多端适配与灰度发布。',
        result: '覆盖 30+ 业务方，活动页上线周期从 3 天缩短到 4 小时。',
      },
      {
        name: '前端性能治理专项',
        role: '技术 owner',
        desc: '建立性能指标采集与告警链路，定位并修复首屏阻塞、图片过大、重复请求等 40+ 问题。',
        result: '整体 LCP 降低 46%，跳出率下降 12%。',
      },
    ],
  },
  {
    company: '阿里巴巴集团',
    companyShort: '阿里',
    department: '电商营销团队',
    role: '前端工程师',
    period: '2019.07 - 2022.06',
    location: '杭州 · 西溪园区',
    logoText: 'ALI',
    current: false,
    summary:
      '参与双十一等大促会场开发，负责营销活动页引擎与物料体系建设，在高并发、高时效场景下保障前端稳定交付。',
    duties: [
      '负责双十一会场页面的模块开发与联调，连续三年大促零 P1 事故。',
      '建设活动页物料库，把重复出现的模块标准化，需求交付时间平均缩短 40%。',
      '推动移动端适配与图片方案统一，减少各业务重复造轮子。',
    ],
    stack: ['Vue 2', 'Rax', 'Webpack', 'Sass', '小程序'],
    projects: [
      {
        name: '双十一会场前端支撑',
        role: '模块 owner',
        desc: '负责会场主链路模块开发、埋点与降级预案，参与压测与容量评估。',
        result: '峰值期间页面可用性 99.99%，大促零事故。',
      },
    ],
  },
  {
    company: '网易',
    companyShort: '网易',
    department: '数字内容事业部',
    role: '前端开发工程师',
    period: '2017.07 - 2019.06',
    location: '杭州 · 滨江',
    logoText: 'NTES',
    current: false,
    summary: '职业生涯的起点，从零参与资讯类 H5 产品开发，完成了从校园项目到线上产品的转变。',
    duties: [
      '独立负责资讯 H5 首版开发，完成从设计稿到上线的全流程交付。',
      '沉淀移动端适配方案与埋点 SDK，被部门内 4 个项目复用。',
      '参与前端工程化改造，引入 ESLint / 提交规范 / 自动化部署。',
    ],
    stack: ['Vue 2', 'JavaScript', 'Webpack', 'Less', 'Nginx'],
    projects: [
      {
        name: '资讯 H5 产品',
        role: '前端开发',
        desc: '面向移动端的资讯流产品，包含列表、详情、评论与分享链路。',
        result: '上线首月日活 8 万，获部门季度优秀项目。',
      },
    ],
  },
]

/* ------------------------------ 技能 ------------------------------ */
export const skills = [
  { name: 'Vue 3 / 组合式 API', value: 95 },
  { name: 'TypeScript', value: 88 },
  { name: 'CSS / 响应式与动效', value: 92 },
  { name: '工程化（Vite / Webpack）', value: 85 },
  { name: 'Node.js / BFF', value: 72 },
  { name: '数据可视化（ECharts）', value: 78 },
]

/* ------------------------------ 兴趣爱好 ------------------------------ */
export const hobbies = [
  {
    icon: '📷',
    name: '摄影',
    level: '6 年 · 街头与风光',
    desc: '一台理光 GR3 陪我走过很多城市的清晨。比起器材，我更喜欢等一个刚好的人刚好路过光里。',
    tags: ['街头', '风光', '胶片色调'],
    metric: '1.2 万张',
    metricLabel: '累计快门',
  },
  {
    icon: '🏃',
    name: '长跑',
    level: '每周 3 次 · 半马',
    desc: '跑步是最不需要天赋的坚持。沿着钱塘江跑到江风起来，是一天里最清醒的四十分钟。',
    tags: ['半程马拉松', '晨跑', '心率训练'],
    metric: '1:42',
    metricLabel: '半马 PB',
  },
  {
    icon: '☕',
    name: '手冲咖啡',
    level: '4 年 · V60',
    desc: '从磨豆开始的一套固定仪式。偏爱浅烘的埃塞日晒，喜欢那种像茶一样的干净尾韵。',
    tags: ['V60', '浅烘', '埃塞俄比亚'],
    metric: '3 杯',
    metricLabel: '每日上限',
  },
  {
    icon: '📚',
    name: '阅读',
    level: '年均 40 本',
    desc: '技术书搭着文学书一起读。前者教我怎么做事，后者提醒我为什么做。',
    tags: ['技术', '文学', '社科'],
    metric: '40 本',
    metricLabel: '年均阅读',
  },
  {
    icon: '⛰️',
    name: '徒步与露营',
    level: '每月 1 次',
    desc: '背着帐篷走进山里，信号消失的那一刻，反而觉得世界清楚了起来。',
    tags: ['重装徒步', '露营', '江浙山地'],
    metric: '23 座',
    metricLabel: '走过的山',
  },
  {
    icon: '⌨️',
    name: '开源与写作',
    level: '在维护 3 个仓库',
    desc: '把踩过的坑写成文章和工具，是我对抗遗忘的方式，也常常因此认识很好的朋友。',
    tags: ['开源', '技术写作', '分享'],
    metric: '60+',
    metricLabel: '技术文章',
  },
]

export const readingList = [
  { title: '《代码整洁之道》', author: 'Robert C. Martin', type: '重读', comment: '每次重构前都会翻两章，提醒自己命名比结构更重要。' },
  { title: '《设计中的设计》', author: '原研哉', type: '在读', comment: '“无印”的白不是空，是留出来给使用者的余地。' },
  { title: '《人类简史》', author: '尤瓦尔·赫拉利', type: '读完', comment: '把虚构故事当作理解协作的入口，读起来很有意思。' },
  { title: '《深入浅出 Node.js》', author: '朴灵', type: '在读', comment: '补 BFF 一层的基础，异步与事件循环讲得透。' },
]

/* ------------------------------ 联系与地址 ------------------------------ */
export const contact = {
  address: '浙江省杭州市西湖区文三路 199 号 · 某科技园 A 座 12 层',
  addressShort: '杭州市西湖区文三路 199 号',
  postcode: '310012',
  // GCJ-02 火星坐标（腾讯地图 / 高德通用）
  center: { lat: 30.2803, lng: 120.1341 },
  zoom: 15,
  traffic: [
    { icon: '🚇', text: '地铁 2 号线 · 学院路站 B 口，步行约 600 米' },
    { icon: '🚌', text: '公交 15 / 37 / 156 路 · 文三路教工路口站' },
    { icon: '🚗', text: '园区地下车库，访客可登记进入（前 2 小时免费）' },
  ],
  workingHours: '工作日 09:30 - 18:30 · 周末偶尔在线',
  tips: '如需面谈，建议提前一天邮件或微信约时间，我会把会议室一起订好。',
}

/* ------------------------------ 首页亮点 ------------------------------ */
export const highlights = [
  {
    icon: '🧩',
    title: '组件与架构',
    desc: '擅长把重复业务抽象成可复用组件，主导过 12 万行代码的框架升级。',
  },
  {
    icon: '⚡',
    title: '性能优化',
    desc: '从指标采集到落地修复，把首屏 LCP 从 2.8s 降到 1.5s。',
  },
  {
    icon: '🎯',
    title: '业务结果',
    desc: '更在意方案带来了什么：上线周期从 3 天到 4 小时，是比代码更硬的证明。',
  },
]
