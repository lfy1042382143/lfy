/**
 * 腾讯地图 GL JS 加载与初始化
 *
 * 合规说明：仅使用腾讯位置服务（国内合规地图源），不引入任何境外地图与瓦片。
 * Key 有两种用法：
 *  1) 自有 Key：在项目根目录 .env.local 中配置 VITE_TMAP_KEY=你的Key
 *  2) 无 Key：回退到本地代理模式（_TMapSecurityConfig），由运行环境注入密钥；
 *     若代理不可用则自动降级为地址卡片，不影响页面其他功能。
 */

const SDK_SRC = 'https://map.qq.com/api/gljs?v=1.exp'

// 自定义标记图标（内联 SVG，避免依赖任何外部图片资源）
const PIN_SVG =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="38" viewBox="0 0 30 38">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3b7d6e"/>
          <stop offset="100%" stop-color="#1b4b40"/>
        </linearGradient>
      </defs>
      <path d="M15 37C15 37 29 23.2 29 14.4 29 6.4 22.7 0 15 0S1 6.4 1 14.4C1 23.2 15 37 15 37Z" fill="url(#g)"/>
      <circle cx="15" cy="14" r="5.2" fill="#f7f4ea"/>
    </svg>`
  )

let loadingPromise = null

export function getMapKey() {
  return (import.meta.env.VITE_TMAP_KEY || '').trim()
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const exist = document.querySelector(`script[data-tmap="1"]`)
    if (exist) {
      exist.addEventListener('load', () => resolve())
      exist.addEventListener('error', () => reject(new Error('地图 SDK 加载失败')))
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.dataset.tmap = '1'
    script.onload = () => resolve()
    script.onerror = () => {
      loadingPromise = null
      reject(new Error('地图 SDK 加载失败'))
    }
    document.head.appendChild(script)
  })
}

export function ensureTMap() {
  if (window.TMap) return Promise.resolve(window.TMap)
  if (loadingPromise) return loadingPromise

  const key = getMapKey()

  if (key) {
    // 场景二：使用自有 Key
    loadingPromise = loadScript(`${SDK_SRC}&key=${key}`).then(() => {
      if (!window.TMap) throw new Error('地图 SDK 初始化异常')
      return window.TMap
    })
  } else {
    // 场景一：代理模式，SDK 地址不带 key
    window._TMapSecurityConfig = window._TMapSecurityConfig || {
      serviceHost: 'http://127.0.0.1:__WB_HTTP_PORT__/_TMapService/_wbt/__WB_TMAP_SECRET__',
    }
    loadingPromise = loadScript(SDK_SRC).then(() => {
      if (!window.TMap) throw new Error('地图 SDK 初始化异常')
      return window.TMap
    })
  }

  return loadingPromise
}

/**
 * 在指定容器初始化地图并打点
 * @returns {{ map: object, destroy: Function }}
 */
export function createMap(container, options) {
  const { center, zoom = 15, title = '', address = '' } = options
  const TMap = window.TMap
  if (!TMap || !container) throw new Error('地图容器或 SDK 不可用')

  const map = new TMap.Map(container, {
    center: new TMap.LatLng(center.lat, center.lng),
    zoom,
    pitch: 0,
    rotation: 0,
    viewMode: '2D',
    baseMap: { type: 'vector' },
    showControl: true,
  })

  const markerLayer = new TMap.MultiMarker({
    map,
    styles: {
      marker: new TMap.MarkerStyle({
        width: 30,
        height: 38,
        anchor: { x: 15, y: 38 },
        src: PIN_SVG,
      }),
    },
    geometries: [
      {
        id: 'location',
        styleId: 'marker',
        position: new TMap.LatLng(center.lat, center.lng),
        properties: { title },
      },
    ],
  })

  const labelLayer = new TMap.MultiLabel({
    map,
    styles: {
      label: new TMap.LabelStyle({
        color: '#1b4b40',
        size: 13,
        offset: { x: 0, y: -46 },
        backgroundColor: 'rgba(255,255,255,0.94)',
        backgroundPadding: 6,
        borderColor: 'rgba(47,107,94,0.25)',
        borderWidth: 1,
        borderRadius: 6,
        alignment: 'center',
      }),
    },
    geometries: [
      {
        id: 'label',
        styleId: 'label',
        position: new TMap.LatLng(center.lat, center.lng),
        content: title || address,
      },
    ],
  })

  return {
    map,
    destroy() {
      try {
        markerLayer.setMap(null)
        labelLayer.setMap(null)
        map.destroy()
      } catch (e) {
        /* 忽略销毁异常 */
      }
    },
  }
}
