import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

/* 样式：Element Plus 基础样式 + 深色变量 → 项目自有样式（顺序不可调换，保证变量覆盖生效） */
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles/base.css'
import './assets/styles/layout.css'
import './assets/styles/components.css'
import './assets/styles/pages.css'
import './assets/styles/pixel-room.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 图标全量注册，模板里可直接 <el-icon><ArrowRight /></el-icon>
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.mount('#app')
