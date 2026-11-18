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
          <transition name="route-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <SiteFooter />
    </div>

    <el-backtop :right="26" :bottom="34" />
  </div>
</template>
