<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { profile } from '@/data/profile'

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

const scrolled = ref(false)
const drawerVisible = ref(false)

// 头像字母取自数据配置，后续可替换为真实头像图片
const initials = profile.initials

const isActive = (path) => route.path === path

const handleScroll = () => {
  scrolled.value = window.scrollY > 8
}

const go = (path) => {
  drawerVisible.value = false
  if (route.path !== path) router.push(path)
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(
  () => route.path,
  () => {
    drawerVisible.value = false
  }
)
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <div class="container site-header__inner">
      <router-link to="/" class="brand">
        <span class="brand__mark">{{ initials }}</span>
        <span class="brand__text">
          <span class="brand__name">{{ profile.name }}</span>
          <span class="brand__sub">Personal Blog</span>
        </span>
      </router-link>

      <nav class="nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav__link"
          :class="{ 'is-active': isActive(item.path) }"
        >
          {{ item.name }}
        </router-link>
      </nav>

      <div class="header__actions">
        <el-button type="primary" round @click="go('/contact')">联系我</el-button>
        <button
          class="header__toggle"
          type="button"
          aria-label="打开菜单"
          @click="drawerVisible = true"
        >
          <el-icon><Menu /></el-icon>
        </button>
      </div>
    </div>

    <el-drawer v-model="drawerVisible" direction="rtl" size="300px" title="导航">
      <nav class="drawer-nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="drawer-nav__link"
          :class="{ 'is-active': isActive(item.path) }"
        >
          <span>{{ item.name }}</span>
          <span class="drawer-nav__index">{{ item.index }}</span>
        </router-link>
      </nav>
      <el-divider />
      <p class="form-note">{{ profile.slogan }}</p>
    </el-drawer>
  </header>
</template>
