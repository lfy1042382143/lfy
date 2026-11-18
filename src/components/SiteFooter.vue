<script setup>
import { profile } from '@/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <span>© {{ year }} {{ profile.name }} · 保留所有权利</span>
      <span>
        Vue 3 <span class="site-footer__dot">/</span> Element Plus
        <span class="site-footer__dot">/</span> Vite
        <span class="site-footer__dot">/</span> Cloudflare Pages
      </span>
      <span>
        <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
      </span>
    </div>
  </footer>
</template>
