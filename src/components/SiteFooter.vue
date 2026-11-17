<script setup>
import { profile, contact } from '@/data/profile'

const year = new Date().getFullYear()
const initials = profile.initials

const quickLinks = [
  { name: '个人经历', path: '/experience' },
  { name: '教育背景', path: '/education' },
  { name: '工作经历', path: '/work' },
  { name: '兴趣爱好', path: '/hobbies' },
  { name: '联系我', path: '/contact' },
]
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div>
          <div class="site-footer__brand">
            <span class="brand__mark">{{ initials }}</span>
            <span>
              <strong style="font-size: 16px; letter-spacing: 0.02em">{{ profile.name }}</strong>
              <span style="display: block; font-size: 11.5px; letter-spacing: 0.14em; opacity: 0.5">
                {{ profile.englishName }}
              </span>
            </span>
          </div>
          <p class="site-footer__desc">{{ profile.slogan }} 这个站点用来长期记录我的经历、项目与生活，<br />如果其中某段内容对你有一点点用，那就是它存在的意义。</p>
          <div class="social-row" style="margin-top: 22px">
            <a
              v-for="s in profile.social"
              :key="s.name"
              class="social-link"
              :href="s.url"
              target="_blank"
              rel="noopener"
              style="border-color: rgba(255, 255, 255, 0.18); color: rgba(243, 239, 228, 0.8)"
            >
              {{ s.name }}
            </a>
          </div>
        </div>

        <div>
          <div class="site-footer__title">页面</div>
          <div class="site-footer__list">
            <router-link v-for="l in quickLinks" :key="l.path" :to="l.path">{{ l.name }}</router-link>
          </div>
        </div>

        <div>
          <div class="site-footer__title">联系</div>
          <div class="site-footer__list">
            <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
            <span>微信：{{ profile.wechat }}</span>
            <span>{{ contact.addressShort }}</span>
            <span>{{ contact.workingHours }}</span>
          </div>
        </div>
      </div>

      <div class="site-footer__bottom">
        <span>© {{ year }} {{ profile.name }} · 保留所有权利</span>
        <span>
          Built with <code>Vue 3</code> + <code>Element Plus</code> + <code>Vite</code>
        </span>
      </div>
    </div>
  </footer>
</template>
