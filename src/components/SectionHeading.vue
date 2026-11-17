<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  desc: { type: String, default: '' },
  align: { type: String, default: 'between' }, // between | start
})
</script>

<template>
  <div class="sec-head" :style="align === 'start' ? { justifyContent: 'flex-start' } : null">
    <div class="sec-head__main">
      <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
      <h2 class="sec-head__title">{{ title }}</h2>
      <p v-if="desc" class="sec-head__desc">{{ desc }}</p>
    </div>
    <div v-if="$slots.aside" class="sec-head__aside">
      <slot name="aside" />
    </div>
  </div>
</template>
