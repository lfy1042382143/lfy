<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { profile, contact } from '@/data/profile'

const route = useRoute()
const router = useRouter()

const navItems = [
  { name: '首页', path: '/', index: '01' },
  { name: '个人经历', path: '/experience', index: '02' },
  { name: '教育背景', path: '/education', index: '03' },
  { name: '实践与技能', path: '/practice', index: '04' },
  { name: '兴趣爱好', path: '/hobbies', index: '05' },
  { name: '联系我', path: '/contact', index: '06' },
]

const drawerVisible = ref(false)
const initials = profile.initials

const isActive = (path) => route.path === path

const go = (path) => {
  drawerVisible.value = false
  if (route.path !== path) router.push(path)
}

watch(
  () => route.path,
  () => {
    drawerVisible.value = false
  }
)
</script>

<template>
  <!-- 桌面端：左侧固定竖栏 -->
  <aside class="site-sidebar">
    <router-link to="/" class="side-brand">
      <span class="side-brand__mark">{{ initials }}</span>
      <span class="side-brand__text">
        <span class="side-brand__name">{{ profile.name }}</span>
        <span class="side-brand__en">{{ profile.englishName }}</span>
      </span>
    </router-link>

    <div class="side-status">
      <span class="pulse-dot"></span>
      开放实习与工作机会
    </div>

    <nav class="site-nav">
      <div class="site-nav__group">Menu</div>
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="site-nav__link"
        :class="{ 'is-active': isActive(item.path) }"
      >
        <span class="site-nav__index">{{ item.index }}</span>
        <span class="site-nav__label">{{ item.name }}</span>
        <span class="site-nav__arrow">→</span>
      </router-link>
    </nav>

    <div class="side-note">
      <span class="side-note__key">Now</span>
      <p>{{ profile.slogan }}</p>
    </div>

    <div class="side-meta">
      <div class="side-meta__row">
        <span class="side-meta__key">Loc</span>
        <span class="side-meta__val">{{ contact.addressShort }}</span>
      </div>
      <div class="side-meta__row">
        <span class="side-meta__key">Mail</span>
        <span class="side-meta__val">
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </span>
      </div>

      <div class="side-social">
        <a
          v-for="s in profile.social"
          :key="s.name"
          class="side-social__link"
          :href="s.url"
          target="_blank"
          rel="noopener"
        >
          {{ s.name }}
        </a>
      </div>

      <div class="side-copy">© {{ new Date().getFullYear() }} {{ profile.name }}</div>
    </div>
  </aside>

  <!-- 移动端：顶部栏 + 抽屉 -->
  <header class="site-topbar">
    <router-link to="/" class="topbar__brand">
      <span class="topbar__mark">{{ initials }}</span>
      <span class="topbar__name">{{ profile.name }}</span>
    </router-link>

    <button class="topbar__toggle" type="button" aria-label="打开菜单" @click="drawerVisible = true">
      <el-icon><Menu /></el-icon>
      Menu
    </button>
  </header>

  <el-drawer v-model="drawerVisible" direction="rtl" size="260px" title="Navigation">
    <nav class="drawer-nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="drawer-nav__link"
        :class="{ 'is-active': isActive(item.path) }"
        @click="go(item.path)"
      >
        <span>{{ item.name }}</span>
        <span class="drawer-nav__index">{{ item.index }}</span>
      </router-link>
    </nav>
    <el-divider />
    <p class="form-note">{{ profile.slogan }}</p>
  </el-drawer>
</template>
