<script setup>
import SiteNav from '@/components/SiteNav.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div class="app-shell">
    <SiteNav />

    <div class="app-body">
      <main class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="page-turn" mode="out-in" :duration="{ enter: 400, leave: 200 }">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <SiteFooter />
    </div>

    <el-backtop :right="26" :bottom="34" />
  </div>
</template>
