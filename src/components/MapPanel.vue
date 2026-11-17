<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ensureTMap, createMap, getMapKey } from '@/utils/map'

const props = defineProps({
  center: { type: Object, required: true }, // { lat, lng }，GCJ-02 坐标
  zoom: { type: Number, default: 15 },
  title: { type: String, default: '我的位置' },
  address: { type: String, default: '' },
})

const mapEl = ref(null)
const status = ref('loading') // loading | ready | fallback

let instance = null

// 腾讯地图官方 URI API：在 App / 网页中唤起地图查看该坐标
const externalUrl = `https://apis.map.qq.com/uri/v1/marker?marker=coord:${props.center.lat},${props.center.lng};title:${encodeURIComponent(
  props.title
)};addr:${encodeURIComponent(props.address)}&referer=zhangsan-blog`

const openExternal = () => {
  window.open(externalUrl, '_blank', 'noopener,noreferrer')
}

onMounted(async () => {
  try {
    await ensureTMap()
    instance = createMap(mapEl.value, {
      center: props.center,
      zoom: props.zoom,
      title: props.title,
      address: props.address,
    })
    status.value = 'ready'
  } catch (err) {
    // 无可用 Key / 网络异常时优雅降级，不影响页面其余内容
    console.warn('[map] 地图加载失败，已降级为地址卡片：', err?.message || err)
    status.value = 'fallback'
  }
})

onBeforeUnmount(() => {
  instance?.destroy()
  instance = null
})
</script>

<template>
  <div class="map-panel">
    <div v-show="status === 'ready'" ref="mapEl" class="map-panel__canvas"></div>

    <div v-if="status !== 'ready'" class="map-fallback">
      <div class="map-fallback__pattern"></div>
      <div class="map-fallback__pin"><span>📍</span></div>

      <div class="map-fallback__card">
        <div class="map-fallback__label">{{ status === 'loading' ? '地图加载中' : '位置信息' }}</div>
        <div class="map-fallback__address">{{ address || title }}</div>
        <div class="map-fallback__meta">
          GCJ-02 · {{ center.lat.toFixed(4) }}, {{ center.lng.toFixed(4) }}
        </div>
        <div class="map-fallback__actions">
          <el-button type="primary" size="small" round @click="openExternal">
            <el-icon style="margin-right: 5px"><Position /></el-icon>在腾讯地图中查看
          </el-button>
          <el-tooltip
            v-if="!getMapKey()"
            content="配置 .env.local 中的 VITE_TMAP_KEY 后即可在此内嵌实时地图"
            placement="top"
          >
            <el-button size="small" round plain>如何内嵌地图</el-button>
          </el-tooltip>
        </div>
      </div>
    </div>

    <span v-if="status === 'ready'" class="map-panel__tag">腾讯地图 · 实时</span>
  </div>
</template>
