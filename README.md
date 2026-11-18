# 刘福洋 · 个人博客

一个基于 **Vue 3 + Element Plus + Vite + Vue Router** 的个人博客 / 在线简历站点，多页面结构，样式与脚本分离存放，构建产物为纯静态文件，可用 Nginx、Vercel、Netlify、GitHub Pages 或 Docker 部署。

视觉方案是 **Workbench**：深色底 + 薄荷绿强调色 + 等宽字体小标签 + 直角边框；桌面端使用左侧固定竖栏导航，内容区单列自上而下阅读；移动端折叠为顶部栏 + 抽屉菜单。

> 站点内容集中在 **`src/data/profile.js`**，替换资料时只需要改这一个文件；页面上标注 `pending: true` 的条目会自动显示「待补充」标记。

---

## 一、技术栈

| 关注点 | 方案 |
| --- | --- |
| 框架 | Vue 3（组合式 API，`<script setup>`） |
| UI 组件库 | Element Plus 2.x（中文语言包，图标全量注册） |
| 路由 | Vue Router（`createWebHistory`，滚动行为恢复） |
| 构建工具 | Vite |
| 样式组织 | 独立 CSS 文件，不使用 `<style scoped>`，便于统一改主题 |
| 数据层 | `src/data/profile.js` 集中管理 |

## 二、页面结构

| 路由 | 页面 | 主要内容 |
| --- | --- | --- |
| `/` | 首页 | 首屏 Hero、个人名片、数据概览、关于我、三座城市、经历预览、兴趣速览、CTA |
| `/experience` | 个人经历 | 时间线（可按阶段筛选：成长 / 求学 / 大学） |
| `/education` | 教育背景 | 广西科技大学、南十字星大学两张卡片、主修课程、项目要点、中学阶段、空状态 |
| `/practice` | 实践与技能 | 实习与项目（占位）、技能熟练度、证书与学历、学习方式 |
| `/hobbies` | 兴趣爱好 | 拼高达 / PTCG / Apex 英雄 / Warframe 四张卡片 + 「为什么是这几件事」说明 |
| `/contact` | 联系我 | 地址、邮编、交通指引、**地图模块**、三座城市、留言表单 |

## 三、目录结构

```
liufuyang-blog/
├─ index.html                # 入口 HTML（SEO meta / 标题）
├─ vite.config.js            # 构建配置（别名、分包、base）
├─ package.json
├─ public/
│  └─ favicon.svg
└─ src/
   ├─ main.js                # 应用入口：注册 Element Plus、图标、样式
   ├─ App.vue                # 骨架：侧栏 + 路由视图 + 页脚 + 回到顶部
   ├─ router/index.js        # 路由表、标题、滚动行为
   ├─ data/profile.js        # ★ 全站内容数据（改这里即可）
   ├─ utils/
   │  ├─ map.js              # 腾讯地图 SDK 加载与打点
   │  └─ reveal.js           # 滚动入场动画
   ├─ components/
   │  ├─ SiteNav.vue         # 左侧固定竖栏导航 + 移动端顶栏/抽屉
   │  ├─ SiteFooter.vue
   │  ├─ SectionHeading.vue  # 区块标题组
   │  └─ MapPanel.vue        # 地图面板（含无 Key 降级视图）
   ├─ views/                 # 6 个页面
   └─ assets/styles/
      ├─ base.css            # 设计变量、重置、排版、Element Plus 主题覆盖
      ├─ layout.css          # 侧栏 / 移动端顶栏 / 页面头部 / 页脚
      ├─ components.css      # 复用组件样式
      └─ pages.css           # 各页面专属样式
```

## 四、内容维护（待补充清单）

全部内容都在 `src/data/profile.js`，按下面的顺序补最快：

| 位置 | 需要补充什么 |
| --- | --- |
| `profile` | 真实邮箱、电话、微信；头像（目前用姓名首字母 LFY 渲染） |
| `journey` | 大学起止年份若与 2021.09–2025.06 不符，改这里；中小学已在位，可再补在校经历 |
| `education` | 广西科技大学卡的 GPA、排名、荣誉、校园经历（学院已填「国际教育学院」） |
| `practices` | 实习经历、课程项目、毕业设计，按「时间 / 角色 / 做了什么 / 结果」写 |
| `skills` | 熟练度数值与说明按自己的实际感受调 |
| `certificates` | 四六级等证书；已有项把 `done` 设为 `true` 并填年份 |
| `hobbies` | 四项爱好已填（拼高达 / PTCG 只收藏 / Apex 单排最高钻石 / Warframe），可补「模型数量、游玩时长」等具体数字 |

> 页面上的「待补充」标签由数据里的 `pending: true` 控制，补齐内容后把该字段删掉即可。

## 五、本地开发

```bash
# 1. 安装依赖（Node >= 18）
npm install

# 2. 启动开发服务器，默认 http://localhost:5173
npm run dev

# 3. 生产构建，产物输出到 dist/
npm run build

# 4. 本地预览构建产物，默认 http://localhost:4173
npm run preview
```

## 六、地图模块说明（合规）

- 仅使用**腾讯位置服务（腾讯地图 GL JS）**，符合国内地图数据合规要求；未引入任何境外地图源（Google / Bing / Mapbox / OSM 等）。
- 坐标体系为 **GCJ-02（火星坐标）**，当前打点在广西科技大学文昌校区（24.324255, 109.448967）。
- 未配置 Key 时：页面自动降级为「地址卡片」，展示地址、坐标与「在腾讯地图中查看」按钮，不影响其它功能。
- 配置自己的 Key：

  ```bash
  # 根目录新建 .env.local
  VITE_TMAP_KEY=你的Key
  ```

  Key 申请：<https://lbs.qq.com/dev/console/key/manage>（腾讯位置服务控制台 → 密钥管理）。
  建议在控制台配置 **Referer 域名白名单**，避免前端明文 Key 被滥用；商用场景请通过后端代理签名。

## 七、部署方案

构建产物是纯静态文件，`dist/` 直接丢到任意静态服务器即可。路由使用 HTML5 History 模式，**服务器需要把未知路径回退到 `index.html`**。

### 线上环境（已部署）

| 项 | 值 |
| --- | --- |
| 访问地址 | <https://mylfy.cat21432961.online> |
| 托管平台 | Cloudflare Pages，项目名 `mylfy-blog`，生产分支 `main` |
| 平台默认域名 | <https://mylfy-blog.pages.dev>（可作备用入口） |
| DNS | `mylfy` → CNAME `mylfy-blog.pages.dev`，已开启 Cloudflare 代理（橙色云） |
| 证书 | Cloudflare 自动签发（Google Trust Services），无需手动续期 |
| SPA 回退 | `public/_redirects` 中 `/*  /index.html  200` |

重新发布：

```bash
npm run deploy      # = vite build + wrangler pages deploy dist --project-name mylfy-blog
```

> 首次使用需 `npx wrangler login` 授权；CI 环境改用 `CLOUDFLARE_API_TOKEN`（需 Pages:Edit 与 Zone:DNS:Edit 权限）。

### 方案一：Nginx（自建服务器 / 云主机，推荐）

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/liufuyang-blog/dist;
    index index.html;

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_min_length 1024;

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

部署脚本（本地构建 + rsync 上传）：

```bash
npm run build
rsync -avz --delete dist/ user@server:/var/www/liufuyang-blog/dist/
# 然后 nginx -s reload
```

### 方案二：Vercel / Netlify / Cloudflare Pages（零运维）

- 构建命令：`npm run build`，输出目录：`dist`
- SPA 回退规则：
  - Netlify：在 `public/` 放 `_redirects`，内容 `/* /index.html 200`
  - Vercel：根目录 `vercel.json`

    ```json
    { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
    ```

### 方案三：GitHub Pages

1. `vite.config.js` 里把 `base` 改成仓库名：`base: '/lfy/'`。
2. 构建后把 `dist/` 推到 `gh-pages` 分支，或在仓库 Settings → Pages 里指定分支。
3. History 模式回退：把 `dist/index.html` 复制为 `dist/404.html`。

### 方案四：Docker

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

```bash
docker build -t liufuyang-blog .
docker run -d -p 8080:80 liufuyang-blog
```

### 部署到二级目录（如 `https://example.com/blog/`）

改 `vite.config.js` 的 `base: '/blog/'` 后重新构建即可，路由会自动使用 `import.meta.env.BASE_URL`。

## 八、可选优化

- **Element Plus 按需引入**：当前为全量引入（`element-plus` chunk 约 1.14MB，gzip 后 ~358KB）。若在意首屏体积，可引入 `unplugin-vue-components` + `unplugin-auto-import` 改为按需加载。
- 图片资源建议用 WebP + `loading="lazy"`。
- 接后端留言接口时，把 `ContactView.vue` 中 `submit()` 的 `setTimeout` 换成真实请求即可。
