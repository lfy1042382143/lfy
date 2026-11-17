# 张三 · 个人博客

一个基于 **Vue 3 + Element Plus + Vite + Vue Router** 的个人博客 / 在线简历站点，多页面结构，样式与脚本分离存放，构建产物为纯静态文件，可用 Nginx、Vercel、Netlify、GitHub Pages 或 Docker 部署。

> 站点内容全部为示例信息（张三），后续替换真实资料时**只需要改 `src/data/profile.js`**，页面模板无需改动。

---

## 一、技术栈

| 关注点 | 方案 |
| --- | --- |
| 框架 | Vue 3（组合式 API，`<script setup>`） |
| UI 组件库 | Element Plus 2.x（中文语言包，图标全量注册） |
| 路由 | Vue Router 4/5（`createWebHistory`，滚动行为恢复） |
| 构建工具 | Vite |
| 样式组织 | 独立 CSS 文件，不使用 `<style scoped>`，便于统一改主题 |
| 数据层 | `src/data/profile.js` 集中管理 |

## 二、页面结构

| 路由 | 页面 | 主要内容 |
| --- | --- | --- |
| `/` | 首页 | 首屏 Hero、数据概览、关于我、亮点、经历预览、兴趣速览、CTA |
| `/experience` | 个人经历 | 时间线（可按阶段筛选：求学 / 职场 / 成长） |
| `/education` | 教育背景 | 学校卡片、主修课程、成绩进度条、荣誉、校园经历 |
| `/work` | 工作经历 | 公司与职责、项目卡片、技能熟练度、工作方法 |
| `/hobbies` | 兴趣爱好 | 6 项爱好卡片、最近在读清单 |
| `/contact` | 地址与联系 | 地址、交通指引、**地图模块**、留言表单 |

## 三、目录结构

```
zhangsan-blog/
├─ index.html                # 入口 HTML（SEO meta / 标题）
├─ vite.config.js            # 构建配置（别名、分包、base）
├─ package.json
├─ public/
│  └─ favicon.svg
└─ src/
   ├─ main.js                # 应用入口：注册 Element Plus、图标、样式
   ├─ App.vue                # 骨架：页头 + 路由视图 + 页脚 + 回到顶部
   ├─ router/index.js        # 路由表、标题、滚动行为
   ├─ data/profile.js        # ★ 全站内容数据（改这里即可）
   ├─ utils/
   │  ├─ map.js              # 腾讯地图 SDK 加载与打点
   │  └─ reveal.js           # 滚动入场动画
   ├─ components/
   │  ├─ SiteHeader.vue      # 吸顶导航 + 移动端抽屉菜单
   │  ├─ SiteFooter.vue
   │  ├─ SectionHeading.vue  # 区块标题组
   │  └─ MapPanel.vue        # 地图面板（含无 Key 降级视图）
   ├─ views/                 # 6 个页面
   └─ assets/styles/
      ├─ base.css            # 设计变量、重置、排版、Element Plus 主题覆盖
      ├─ layout.css          # 页头 / 页脚 / 页面头部
      ├─ components.css      # 复用组件样式
      └─ pages.css           # 各页面专属样式
```

## 四、本地开发

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

## 五、内容维护

1. 全站文案、经历、学校、公司、兴趣、联系方式都在 **`src/data/profile.js`**。
2. 头像目前用姓名首字母（`profile.initials`）渲染，想换成图片：把头像放到 `public/`，在 `SiteHeader.vue` / 首页 `profile-card` 里替换为 `<img>` 即可。
3. 主题色改 `src/assets/styles/base.css` 里的 `--brand` 等变量；Element Plus 的 `--el-color-primary` 系列已在同一文件覆盖，改一处即可全局生效。

## 六、地图模块说明（合规）

- 仅使用**腾讯位置服务（腾讯地图 GL JS）**，符合国内地图数据合规要求；未引入任何境外地图源（Google / Bing / Mapbox / OSM 等）。
- 坐标体系为 **GCJ-02（火星坐标）**，与国内地图服务一致。
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

### 方案一：Nginx（自建服务器 / 云主机，推荐）

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/zhangsan-blog/dist;
    index index.html;

    # 开启 gzip，JS/CSS 体积可压缩 70% 以上
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_min_length 1024;

    # 带 hash 的静态资源长缓存
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # History 模式回退
    location / {
        try_files $uri $uri/ /index.html;
    }

    # index.html 不缓存，保证发版后立即生效
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

部署脚本（本地构建 + rsync 上传）：

```bash
npm run build
rsync -avz --delete dist/ user@server:/var/www/zhangsan-blog/dist/
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

1. `vite.config.js` 里把 `base` 改成仓库名：`base: '/lfy/'`（仓库为 `lfy1042382143/lfy` 时）。
2. 构建后把 `dist/` 推到 `gh-pages` 分支，或在仓库 Settings → Pages 里指定分支。
3. History 模式回退：把 `dist/index.html` 复制为 `dist/404.html`（Pages 会用 404 页面兜底）。

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
docker build -t zhangsan-blog .
docker run -d -p 8080:80 zhangsan-blog
```

### 部署到二级目录（如 `https://example.com/blog/`）

改 `vite.config.js` 的 `base: '/blog/'` 后重新构建即可，路由会自动使用 `import.meta.env.BASE_URL`。

## 八、可选优化

- **Element Plus 按需引入**：当前为全量引入（构建产物中 `element-plus` 约 1.1MB，gzip 后 ~358KB）。若在意首屏体积，可引入 `unplugin-vue-components` + `unplugin-auto-import`，改为按需加载，通常可减少 40%~60%。
- 图片资源建议用 WebP + `loading="lazy"`。
- 若接后端留言接口，把 `ContactView.vue` 中 `submit()` 的 `setTimeout` 换成真实请求即可。
