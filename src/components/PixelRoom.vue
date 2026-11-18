<script setup>
/**
 * 像素剖面房间
 * - 用 336 × 216 的像素网格（每格 1 单位）绘制，shape-rendering=crispEdges 保证不糊
 * - 网格比原先加密一倍：同样是 1 单位，显示出来就是一个更细的像素点
 * - 所有动态效果走 CSS 动画，散落在 pixel-room.css 里，用 steps() 保持像素感
 * - 交互：可点区域是叠在画面上的透明按钮，坐标按 viewBox 百分比换算，
 *   不参与 SVG 绘制，所以缩放时永远对位；台灯 / 显示器 / 雨三个还能真的开关
 */
import { computed, ref } from 'vue'

const title = 'ROOM_01 · 我的房间'
const meta = '02:41 AM'

const VW = 336
const VH = 216

/** 可交互物件：x/y/w/h 是 SVG 里的坐标，直接换算成百分比用 */
const items = [
  {
    id: 'window',
    label: '窗外',
    x: 12,
    y: 20,
    w: 114,
    h: 100,
    tag: 'WINDOW',
    title: '窗外',
    desc: '雨还在下，玻璃上糊着一层水汽。远处楼里的灯零零散散亮着，和这间屋子差不多。',
    toggle: 'rain',
  },
  {
    id: 'clock',
    label: '挂钟',
    x: 197,
    y: 15,
    w: 26,
    h: 26,
    tag: 'CLOCK',
    title: '02:41 AM',
    desc: '分针还在跳。写到这儿的时候已经两点四十了，明天照样有早八。',
    tip: 'below',
  },
  {
    id: 'poster',
    label: '准星海报',
    x: 228,
    y: 14,
    w: 44,
    h: 42,
    tag: 'APEX',
    title: '准星海报',
    desc: 'Apex 基本只单排，跳点、转移、输赢都自己扛。最高打到钻石——再往上单排容错太低，就停在这儿了。',
    link: '/hobbies',
    tip: 'below',
  },
  {
    id: 'cards',
    label: '三张卡',
    x: 132,
    y: 14,
    w: 58,
    h: 44,
    tag: 'PTCG',
    title: '展示框里的三张卡',
    desc: '火、草、水各一张，挑的都是卡面插画好看的。只收藏不打牌，按系列整理进卡册。',
    link: '/hobbies',
    tip: 'below',
  },
  {
    id: 'lamp',
    label: '台灯',
    x: 244,
    y: 80,
    w: 28,
    h: 38,
    tag: 'LAMP',
    title: '台灯',
    desc: '屏幕之外唯一的光源。开着写代码眼睛没那么累，关了房间就只剩显示器的绿光。',
    toggle: 'lamp',
  },
  {
    id: 'monitor',
    label: '显示器',
    x: 145,
    y: 55,
    w: 70,
    h: 64,
    tag: 'SCREEN',
    title: '显示器',
    desc: '左边编辑器，右边终端。这个点还在跑的是本地 dev server，改完一行保存就热更新。',
    toggle: 'screen',
  },
  {
    id: 'gunpla',
    label: '高达',
    x: 291,
    y: 36,
    w: 27,
    h: 29,
    tag: 'GUNPLA',
    title: '架上的高达',
    desc: '剪件、修水口、组装、贴贴纸，一堆板件变成一台机器人。比起摆着看，更享受拼的那几个小时。',
    link: '/hobbies',
  },
  {
    id: 'warframe',
    label: '战甲',
    x: 283,
    y: 66,
    w: 18,
    h: 24,
    tag: 'WARFRAME',
    title: '暗色战甲',
    desc: 'MOD 怎么插、武器怎么配、哪个战甲适合哪种任务，本质都是在解一道优化题。',
    link: '/hobbies',
  },
  {
    id: 'binder',
    label: '卡册',
    x: 282,
    y: 92,
    w: 50,
    h: 36,
    tag: 'PTCG',
    title: '卡册与补充包',
    desc: '拆包只为了看卡面，重复的就按系列塞进卡册。翻卡册本身就很解压。',
    link: '/hobbies',
  },
  {
    id: 'controller',
    label: '手柄',
    x: 215,
    y: 103,
    w: 27,
    h: 14,
    tag: 'INPUT',
    title: '手柄',
    desc: '常年摆在桌角，单排的时候用它手感更稳。摇杆边上那点橙光是呼吸灯。',
  },
  {
    id: 'person',
    label: '我',
    x: 110,
    y: 70,
    w: 35,
    h: 84,
    tag: 'ME',
    title: '还坐在这儿的人',
    desc: '凌晨两点四十，还在补一个没复现出来的 bug。这个房间就是我大部分时间的坐标。',
  },
  {
    id: 'plant',
    label: '绿萝',
    x: 24,
    y: 116,
    w: 30,
    h: 40,
    tag: 'PLANT',
    title: '绿萝',
    desc: '房间里唯一需要浇水的成员，目前还活着，叶子会跟着风轻轻晃。',
  },
]

const hovered = ref('')
const activeId = ref('')
const active = computed(() => items.find((i) => i.id === activeId.value) || null)

const lampOn = ref(true)
const screenOn = ref(true)
const rainOn = ref(true)

const toggles = {
  lamp: { on: lampOn, label: () => (lampOn.value ? '关掉台灯' : '打开台灯') },
  screen: { on: screenOn, label: () => (screenOn.value ? '关掉显示器' : '点亮显示器') },
  rain: { on: rainOn, label: () => (rainOn.value ? '让雨停一会' : '继续下雨') },
}

const activeToggleLabel = computed(() =>
  active.value?.toggle ? toggles[active.value.toggle].label() : ''
)

function toggle(name) {
  if (name === 'lamp') lampOn.value = !lampOn.value
  if (name === 'screen') screenOn.value = !screenOn.value
  if (name === 'rain') rainOn.value = !rainOn.value
}

/** 百分比定位，保证和 SVG 严格对齐 */
function hotspotStyle(item) {
  return {
    left: `${(item.x / VW) * 100}%`,
    top: `${(item.y / VH) * 100}%`,
    width: `${(item.w / VW) * 100}%`,
    height: `${(item.h / VH) * 100}%`,
  }
}
</script>

<template>
  <figure
    class="pixel-room"
    :class="{
      'is-lamp-off': !lampOn,
      'is-screen-off': !screenOn,
      'is-rain-off': !rainOn,
    }"
  >
    <div class="pixel-room__bar">
      <span class="pixel-room__leds">
        <i></i><i></i><i></i>
      </span>
      <span class="pixel-room__title">{{ title }}</span>
      <span class="pixel-room__meta">{{ meta }}</span>
    </div>

    <div class="pixel-room__screen">
    <svg
      class="pixel-room__svg"
      viewBox="0 0 336 216"
      shape-rendering="crispEdges"
      role="img"
      aria-label="像素风格的房间剖面：深夜还亮着的显示器与台灯、架子上站好的高达模型、暗色战甲小人、PTCG 卡册与补充包、桌上的手柄，墙上挂着三张卡的展示框和准星海报，窗外是下着雨的城市"
    >
      <defs>
        <clipPath id="pr-window">
          <rect x="18" y="24" width="102" height="84" />
        </clipPath>
        <clipPath id="pr-screen">
          <rect x="149" y="59" width="62" height="46" />
        </clipPath>
        <clipPath id="pr-poster">
          <rect x="230" y="16" width="40" height="38" />
        </clipPath>
        <radialGradient id="pr-lamp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f7ecc9" stop-opacity="0.3" />
          <stop offset="55%" stop-color="#f7ecc9" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#f7ecc9" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="pr-screen-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#5cf0c0" stop-opacity="0.26" />
          <stop offset="100%" stop-color="#5cf0c0" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="pr-screenglow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5cf0c0" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#5cf0c0" stop-opacity="0.02" />
        </linearGradient>
        <linearGradient id="pr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0d1c22" />
          <stop offset="70%" stop-color="#0a1418" />
          <stop offset="100%" stop-color="#0a1518" />
        </linearGradient>
      </defs>

      <!-- ===================== 墙体 / 地面 ===================== -->
      <rect x="0" y="0" width="336" height="216" fill="#0b1211" />
      <rect x="0" y="0" width="336" height="10" fill="#121a18" />
      <rect x="0" y="10" width="336" height="140" fill="#1b2522" />
      <g fill="#202c28" opacity="0.5">
        <rect x="24" y="10" width="1" height="140" />
        <rect x="52" y="10" width="1" height="140" />
        <rect x="80" y="10" width="1" height="140" />
        <rect x="108" y="10" width="1" height="140" />
        <rect x="136" y="10" width="1" height="140" />
        <rect x="164" y="10" width="1" height="140" />
        <rect x="192" y="10" width="1" height="140" />
        <rect x="220" y="10" width="1" height="140" />
        <rect x="248" y="10" width="1" height="140" />
        <rect x="276" y="10" width="1" height="140" />
        <rect x="304" y="10" width="1" height="140" />
        <rect x="328" y="10" width="1" height="140" />
      </g>
      <!-- 踢脚线 + 地板 -->
      <rect x="0" y="150" width="336" height="6" fill="#2b3833" />
      <rect x="0" y="150" width="336" height="1" fill="#3a4a44" />
      <rect x="0" y="156" width="336" height="60" fill="#2a2521" />
      <g fill="#221d1a">
        <rect x="0" y="172" width="336" height="1" />
        <rect x="0" y="188" width="336" height="1" />
        <rect x="0" y="204" width="336" height="1" />
        <rect x="60" y="156" width="1" height="16" />
        <rect x="180" y="156" width="1" height="16" />
        <rect x="258" y="156" width="1" height="16" />
        <rect x="24" y="173" width="1" height="15" />
        <rect x="124" y="173" width="1" height="15" />
        <rect x="220" y="173" width="1" height="15" />
        <rect x="300" y="173" width="1" height="15" />
        <rect x="88" y="189" width="1" height="15" />
        <rect x="246" y="189" width="1" height="15" />
        <rect x="150" y="205" width="1" height="11" />
        <rect x="312" y="205" width="1" height="11" />
      </g>
      <!-- 家具落地阴影 -->
      <rect x="122" y="154" width="160" height="4" fill="#1d1917" opacity="0.55" />
      <rect x="278" y="152" width="58" height="5" fill="#1d1917" opacity="0.5" />
      <rect x="24" y="153" width="28" height="3" fill="#1d1917" opacity="0.45" />
      <!-- 剖面切边 -->
      <rect x="0" y="0" width="4" height="216" fill="#0f1715" />
      <rect x="332" y="0" width="4" height="216" fill="#0f1715" />
      <rect x="3" y="10" width="1" height="140" fill="#33443e" opacity="0.8" />
      <rect x="332" y="10" width="1" height="140" fill="#33443e" opacity="0.8" />

      <!-- ===================== 窗户（夜景 + 雨） ===================== -->
      <g>
        <rect x="14" y="20" width="110" height="92" fill="#4b5852" />
        <rect x="15" y="21" width="108" height="90" fill="#3b4741" />
        <rect x="18" y="24" width="102" height="84" fill="url(#pr-sky)" />
        <g clip-path="url(#pr-window)">
          <!-- 月亮 -->
          <g fill="#dbe7dd" opacity="0.82">
            <rect x="99" y="31" width="4" height="1" />
            <rect x="97" y="32" width="8" height="1" />
            <rect x="96" y="33" width="10" height="4" />
            <rect x="97" y="37" width="8" height="1" />
            <rect x="99" y="38" width="4" height="1" />
          </g>
          <rect x="101" y="34" width="2" height="2" fill="#c2cfc6" opacity="0.55" />
          <rect x="98" y="36" width="1" height="1" fill="#c2cfc6" opacity="0.55" />
          <!-- 星星 -->
          <g fill="#d8ece6">
            <rect class="px-twinkle" x="26" y="30" width="1" height="1" />
            <rect class="px-twinkle px-d1" x="38" y="35" width="1" height="1" />
            <rect class="px-twinkle px-d2" x="47" y="28" width="1" height="1" />
            <rect class="px-twinkle px-d1" x="57" y="33" width="1" height="1" />
            <rect class="px-twinkle" x="63" y="27" width="1" height="1" />
            <rect class="px-twinkle px-d2" x="74" y="34" width="1" height="1" />
            <rect class="px-twinkle px-d1" x="85" y="29" width="1" height="1" />
            <rect class="px-twinkle" x="91" y="37" width="1" height="1" />
            <rect class="px-twinkle px-d2" x="23" y="42" width="1" height="1" />
            <rect class="px-twinkle px-d1" x="112" y="30" width="1" height="1" />
          </g>
          <!-- 远景城市 -->
          <g fill="#111d1f">
            <rect x="18" y="86" width="16" height="22" />
            <rect x="35" y="78" width="13" height="30" />
            <rect x="49" y="90" width="11" height="18" />
            <rect x="61" y="74" width="15" height="34" />
            <rect x="77" y="84" width="12" height="24" />
            <rect x="90" y="79" width="13" height="29" />
            <rect x="104" y="92" width="16" height="16" />
          </g>
          <g fill="#16272a">
            <rect x="18" y="96" width="24" height="12" />
            <rect x="46" y="100" width="18" height="8" />
            <rect x="86" y="98" width="34" height="10" />
          </g>
          <g fill="#f0b45a">
            <rect class="px-twinkle" x="21" y="90" width="1" height="1" />
            <rect x="27" y="94" width="1" height="1" />
            <rect class="px-twinkle px-d2" x="38" y="82" width="1" height="1" />
            <rect x="40" y="88" width="1" height="1" />
            <rect x="45" y="84" width="1" height="1" />
            <rect class="px-twinkle px-d1" x="53" y="94" width="1" height="1" />
            <rect x="65" y="78" width="1" height="1" />
            <rect class="px-twinkle px-d2" x="70" y="86" width="1" height="1" />
            <rect x="72" y="92" width="1" height="1" />
            <rect class="px-twinkle px-d1" x="80" y="88" width="1" height="1" />
            <rect x="94" y="83" width="1" height="1" />
            <rect class="px-twinkle" x="99" y="90" width="1" height="1" />
            <rect x="108" y="96" width="1" height="1" />
            <rect class="px-twinkle px-d2" x="114" y="99" width="1" height="1" />
          </g>
          <!-- 雨 -->
          <g fill="#7da2aa" opacity="0.45">
            <rect class="px-rain" x="22" y="24" width="1" height="8" />
            <rect class="px-rain px-d1" x="29" y="24" width="1" height="6" />
            <rect class="px-rain px-d2" x="35" y="24" width="1" height="10" />
            <rect class="px-rain px-d1" x="42" y="24" width="1" height="7" />
            <rect class="px-rain px-d2" x="48" y="24" width="1" height="9" />
            <rect class="px-rain" x="55" y="24" width="1" height="6" />
            <rect class="px-rain px-d2" x="61" y="24" width="1" height="8" />
            <rect class="px-rain" x="68" y="24" width="1" height="7" />
            <rect class="px-rain px-d1" x="75" y="24" width="1" height="10" />
            <rect class="px-rain px-d2" x="82" y="24" width="1" height="6" />
            <rect class="px-rain" x="89" y="24" width="1" height="9" />
            <rect class="px-rain px-d1" x="96" y="24" width="1" height="7" />
            <rect class="px-rain px-d2" x="103" y="24" width="1" height="8" />
            <rect class="px-rain" x="110" y="24" width="1" height="6" />
            <rect class="px-rain px-d1" x="116" y="24" width="1" height="9" />
          </g>
          <!-- 玻璃反光 -->
          <rect x="18" y="24" width="102" height="1" fill="#9fc7c9" opacity="0.16" />
          <rect x="18" y="24" width="12" height="84" fill="#9fc7c9" opacity="0.045" />
        </g>
        <!-- 窗框十字 -->
        <rect x="67" y="24" width="4" height="84" fill="#3d4a45" />
        <rect x="67" y="24" width="1" height="84" fill="#4a5952" />
        <rect x="18" y="64" width="102" height="4" fill="#3d4a45" />
        <rect x="18" y="64" width="102" height="1" fill="#4a5952" />
        <!-- 窗台 -->
        <rect x="12" y="112" width="110" height="4" fill="#55635c" />
        <rect x="12" y="112" width="110" height="1" fill="#6a7a72" />
        <rect x="12" y="116" width="110" height="2" fill="#2f3a36" />
      </g>

      <!-- ===================== 墙面：PTCG 展示框 / 挂钟 / 准星海报 ===================== -->
      <g>
        <!-- 三张卡的展示框 -->
        <rect x="132" y="14" width="58" height="44" fill="#3d352d" />
        <rect x="133" y="14" width="56" height="1" fill="#54493c" />
        <rect x="134" y="16" width="54" height="40" fill="#0e1817" />
        <!-- 卡一：火 -->
        <g>
          <rect x="136" y="26" width="14" height="20" fill="#d8ece6" />
          <rect x="137" y="27" width="12" height="11" fill="#d9663c" />
          <g fill="#f0b45a">
            <rect x="141" y="30" width="3" height="4" />
            <rect x="140" y="33" width="5" height="2" />
            <rect x="143" y="28" width="1" height="3" />
          </g>
          <rect x="147" y="28" width="2" height="2" fill="#f0b45a" />
          <rect x="138" y="40" width="8" height="1" fill="#5a5f58" />
          <rect x="138" y="42" width="6" height="1" fill="#5a5f58" />
        </g>
        <!-- 卡二：草 -->
        <g>
          <rect x="152" y="26" width="14" height="20" fill="#d8ece6" />
          <rect x="153" y="27" width="12" height="11" fill="#3f7a5c" />
          <g fill="#8fe3c0">
            <rect x="158" y="30" width="2" height="5" />
            <rect x="156" y="32" width="2" height="3" />
            <rect x="160" y="31" width="3" height="2" />
          </g>
          <rect x="163" y="28" width="2" height="2" fill="#8fe3c0" />
          <rect x="154" y="40" width="8" height="1" fill="#5a5f58" />
          <rect x="154" y="42" width="5" height="1" fill="#5a5f58" />
        </g>
        <!-- 卡三：水（带一点高光） -->
        <g>
          <rect x="168" y="26" width="14" height="20" fill="#d8ece6" />
          <rect x="169" y="27" width="12" height="11" fill="#4a6fa8" />
          <g fill="#9fd0e8">
            <rect x="170" y="34" width="5" height="1" />
            <rect x="172" y="32" width="4" height="1" />
            <rect x="175" y="30" width="4" height="1" />
          </g>
          <rect class="px-shine" x="169" y="27" width="12" height="11" fill="#e8f6ff" opacity="0.16" />
          <rect x="179" y="28" width="2" height="2" fill="#cfe8f2" />
          <rect x="170" y="40" width="8" height="1" fill="#5a5f58" />
          <rect x="170" y="42" width="6" height="1" fill="#5a5f58" />
        </g>
        <!-- 夹子 -->
        <rect x="141" y="13" width="4" height="2" fill="#8a6a33" />
        <rect x="177" y="13" width="4" height="2" fill="#8a6a33" />

        <!-- 挂钟 -->
        <rect x="197" y="15" width="26" height="26" fill="#2b3331" />
        <rect x="198" y="16" width="24" height="24" fill="#141e1c" />
        <rect x="198" y="16" width="24" height="1" fill="#2b3331" />
        <g fill="#41504a">
          <rect x="209" y="18" width="2" height="1" />
          <rect x="209" y="37" width="2" height="1" />
          <rect x="200" y="27" width="1" height="2" />
          <rect x="219" y="27" width="1" height="2" />
        </g>
        <rect class="px-clock-hand" x="209" y="20" width="2" height="6" fill="#f0b45a" />
        <rect class="px-clock-hand-h" x="210" y="27" width="5" height="2" fill="#e9efec" />

        <!-- 准星海报（Apex 味） -->
        <rect x="228" y="14" width="44" height="42" fill="#3d352d" />
        <rect x="229" y="14" width="42" height="1" fill="#54493c" />
        <rect x="230" y="16" width="40" height="38" fill="#0e1216" />
        <g clip-path="url(#pr-poster)">
          <g fill="#e0663f" opacity="0.92">
            <rect x="246" y="21" width="8" height="1" />
            <rect x="246" y="44" width="8" height="1" />
            <rect x="237" y="29" width="1" height="8" />
            <rect x="262" y="29" width="1" height="8" />
            <rect x="239" y="23" width="4" height="1" />
            <rect x="257" y="23" width="4" height="1" />
            <rect x="239" y="42" width="4" height="1" />
            <rect x="257" y="42" width="4" height="1" />
          </g>
          <rect x="249" y="32" width="2" height="2" fill="#ff8a5c" />
          <g fill="#8fa6a0" opacity="0.6">
            <rect x="234" y="39" width="10" height="1" />
            <rect x="256" y="39" width="10" height="1" />
            <rect x="234" y="26" width="1" height="10" />
            <rect x="265" y="26" width="1" height="10" />
          </g>
          <rect class="px-hud-scan" x="230" y="24" width="40" height="1" fill="#e0663f" opacity="0.45" />
        </g>

        <!-- 便签 -->
        <rect x="190" y="46" width="8" height="8" fill="#f0b45a" opacity="0.72" />
        <rect x="191" y="49" width="6" height="1" fill="#1b2522" opacity="0.4" />
        <rect x="191" y="51" width="4" height="1" fill="#1b2522" opacity="0.4" />
        <rect x="192" y="45" width="2" height="1" fill="#8a6a33" />
        <rect x="200" y="50" width="7" height="7" fill="#5cf0c0" opacity="0.32" />
      </g>

      <!-- ===================== 置物架：高达 / 战甲 / 卡册 ===================== -->
      <g>
        <rect x="280" y="34" width="54" height="96" fill="#332c26" />
        <rect x="282" y="36" width="50" height="92" fill="#1e2826" />
        <rect x="280" y="34" width="54" height="3" fill="#4a4038" />
        <rect x="280" y="34" width="54" height="1" fill="#5c4f43" />
        <rect x="280" y="64" width="54" height="3" fill="#4a4038" />
        <rect x="280" y="90" width="54" height="3" fill="#4a4038" />
        <rect x="280" y="112" width="54" height="3" fill="#4a4038" />
        <rect x="280" y="127" width="54" height="3" fill="#4a4038" />
        <rect x="280" y="34" width="1" height="96" fill="#4a4038" />
        <rect x="333" y="34" width="1" height="96" fill="#4a4038" />

        <!-- 顶层：站好的高达 -->
        <g>
          <!-- V 字天线 -->
          <g fill="#f0b45a">
            <rect x="295" y="39" width="3" height="2" />
            <rect x="308" y="39" width="3" height="2" />
            <rect x="300" y="38" width="6" height="2" />
          </g>
          <!-- 头 -->
          <rect x="299" y="40" width="10" height="5" fill="#dfe7e3" />
          <rect x="301" y="42" width="6" height="2" fill="#16232a" />
          <rect class="px-eye" x="302" y="42" width="1" height="1" fill="#5cf0c0" />
          <rect class="px-eye px-d1" x="305" y="42" width="1" height="1" fill="#5cf0c0" />
          <rect x="303" y="45" width="2" height="1" fill="#c2cbc6" />
          <!-- 肩甲 -->
          <rect x="291" y="46" width="7" height="5" fill="#dfe7e3" />
          <rect x="310" y="46" width="7" height="5" fill="#dfe7e3" />
          <rect x="291" y="49" width="7" height="2" fill="#3f6b9a" />
          <rect x="310" y="49" width="7" height="2" fill="#3f6b9a" />
          <!-- 躯干 + 胸甲 -->
          <rect x="298" y="46" width="13" height="8" fill="#dfe7e3" />
          <rect x="300" y="47" width="9" height="4" fill="#3f6b9a" />
          <rect x="301" y="48" width="2" height="2" fill="#f0b45a" />
          <rect x="306" y="48" width="2" height="2" fill="#f0b45a" />
          <rect x="300" y="52" width="9" height="1" fill="#c2cbc6" />
          <!-- 手臂 -->
          <rect x="292" y="52" width="4" height="7" fill="#dfe7e3" />
          <rect x="311" y="52" width="4" height="7" fill="#dfe7e3" />
          <rect x="292" y="58" width="4" height="2" fill="#20262c" />
          <rect x="311" y="58" width="4" height="2" fill="#20262c" />
          <!-- 腰 + 侧裙甲 -->
          <rect x="300" y="54" width="9" height="2" fill="#3f6b9a" />
          <rect x="296" y="54" width="5" height="3" fill="#dfe7e3" />
          <rect x="308" y="54" width="5" height="3" fill="#dfe7e3" />
          <!-- 腿 + 脚 -->
          <rect x="299" y="56" width="4" height="7" fill="#dfe7e3" />
          <rect x="306" y="56" width="4" height="7" fill="#dfe7e3" />
          <rect x="299" y="59" width="4" height="1" fill="#c2cbc6" />
          <rect x="306" y="59" width="4" height="1" fill="#c2cbc6" />
          <rect x="297" y="63" width="7" height="1" fill="#3f6b9a" />
          <rect x="305" y="63" width="7" height="1" fill="#3f6b9a" />
          <!-- 手里的光束步枪 -->
          <rect x="315" y="52" width="2" height="11" fill="#20262c" />
          <rect x="314" y="55" width="4" height="2" fill="#2f3835" />
        </g>

        <!-- 中层：暗色战甲 + PTCG 补充包 -->
        <g>
          <rect x="290" y="68" width="5" height="4" fill="#1b2530" />
          <rect class="px-core" x="291" y="70" width="3" height="1" fill="#f0b45a" />
          <rect x="287" y="71" width="10" height="2" fill="#d9b25a" />
          <rect x="284" y="72" width="6" height="6" fill="#22303a" />
          <rect x="296" y="72" width="5" height="6" fill="#22303a" />
          <rect x="284" y="72" width="6" height="1" fill="#d9b25a" />
          <rect x="296" y="72" width="5" height="1" fill="#d9b25a" />
          <rect x="288" y="73" width="9" height="8" fill="#1b2530" />
          <rect x="289" y="75" width="7" height="1" fill="#2f4050" />
          <rect class="px-core px-d1" x="291" y="77" width="3" height="3" fill="#6fd8d0" />
          <rect x="285" y="78" width="3" height="8" fill="#1b2530" />
          <rect x="297" y="78" width="3" height="8" fill="#1b2530" />
          <rect x="288" y="81" width="4" height="7" fill="#1b2530" />
          <rect x="294" y="81" width="4" height="7" fill="#1b2530" />
          <rect x="287" y="88" width="6" height="1" fill="#22303a" />
          <rect x="293" y="88" width="6" height="1" fill="#22303a" />
        </g>
        <g>
          <!-- 补充包 1 -->
          <rect x="303" y="72" width="11" height="18" fill="#3b2f4a" />
          <rect x="303" y="72" width="11" height="3" fill="#8f7fa8" />
          <rect x="304" y="77" width="9" height="2" fill="#5cf0c0" opacity="0.5" />
          <rect x="305" y="81" width="7" height="6" fill="#d9663c" />
          <rect x="306" y="82" width="5" height="4" fill="#f0b45a" />
          <rect x="304" y="88" width="9" height="1" fill="#5a4b6d" />
          <!-- 补充包 2 -->
          <rect x="316" y="73" width="10" height="17" fill="#2f3f4a" />
          <rect x="316" y="73" width="10" height="3" fill="#6b8fa8" />
          <rect x="317" y="81" width="8" height="6" fill="#0e1817" />
          <rect x="318" y="82" width="6" height="4" fill="#5cf0c0" opacity="0.45" />
          <rect x="317" y="78" width="8" height="1" fill="#9fc7c9" opacity="0.5" />
        </g>

        <!-- 下层：卡册 + 摊开的卡 + 卡盒 -->
        <g>
          <rect x="283" y="95" width="13" height="17" fill="#3b2f4a" />
          <rect x="283" y="95" width="2" height="17" fill="#55446a" />
          <rect x="286" y="98" width="8" height="1" fill="#5cf0c0" opacity="0.5" />
          <rect x="286" y="101" width="6" height="1" fill="#5cf0c0" opacity="0.3" />
          <rect x="286" y="104" width="7" height="1" fill="#5cf0c0" opacity="0.3" />
        </g>
        <g>
          <!-- 靠着的两张卡 -->
          <rect x="298" y="99" width="9" height="13" fill="#d8ece6" />
          <rect x="299" y="100" width="7" height="6" fill="#4a6fa8" />
          <rect x="300" y="107" width="5" height="1" fill="#5a5f58" />
          <rect x="301" y="109" width="5" height="1" fill="#5a5f58" />
          <rect x="303" y="101" width="9" height="11" fill="#d8ece6" opacity="0.85" />
          <rect x="304" y="102" width="7" height="5" fill="#d9663c" opacity="0.9" />
        </g>
        <g>
          <rect x="313" y="98" width="17" height="14" fill="#423931" />
          <rect x="313" y="98" width="17" height="1" fill="#6b5f52" />
          <rect x="315" y="101" width="13" height="5" fill="#1e2826" />
          <rect x="316" y="102" width="11" height="3" fill="#f0b45a" opacity="0.55" />
          <rect x="315" y="108" width="9" height="1" fill="#6b5f52" />
        </g>

        <!-- 最下层：摞起来的模型盒 -->
        <g>
          <rect x="283" y="117" width="22" height="9" fill="#3a3f52" />
          <rect x="283" y="117" width="22" height="2" fill="#5f6b8c" />
          <rect x="285" y="121" width="10" height="1" fill="#8b96b5" />
          <rect x="308" y="118" width="20" height="8" fill="#4a3f52" />
          <rect x="308" y="118" width="20" height="1" fill="#8f7fa8" />
          <rect x="310" y="121" width="12" height="1" fill="#6d5f7a" />
        </g>

        <!-- 挂在架边的耳机 -->
        <g fill="#2b3331">
          <rect x="333" y="66" width="2" height="12" />
          <rect x="329" y="64" width="4" height="2" />
          <rect x="327" y="66" width="2" height="6" />
          <rect x="327" y="66" width="2" height="1" fill="#3f4a3f" />
        </g>
      </g>

      <!-- 架下地面：模型盒堆 -->
      <g>
        <rect x="286" y="144" width="26" height="12" fill="#3a3f52" />
        <rect x="286" y="144" width="26" height="3" fill="#5f6b8c" />
        <rect x="288" y="149" width="12" height="1" fill="#8b96b5" />
        <rect x="286" y="136" width="18" height="8" fill="#3f4a3f" />
        <rect x="287" y="138" width="16" height="1" fill="#5cf0c0" opacity="0.45" />
        <rect x="314" y="148" width="18" height="8" fill="#4a3f52" />
        <rect x="314" y="148" width="18" height="1" fill="#8f7fa8" />
        <rect x="316" y="151" width="10" height="1" fill="#6d5f7a" />
      </g>

      <!-- ===================== 书桌 ===================== -->
      <g>
        <rect x="124" y="116" width="154" height="5" fill="#4a4038" />
        <rect x="124" y="116" width="154" height="1" fill="#5c4f43" />
        <rect x="124" y="120" width="154" height="1" fill="#3a322b" />
        <!-- 屏幕投在桌面上的反光 -->
        <rect class="px-screen-glow" x="149" y="121" width="62" height="2" fill="#5cf0c0" opacity="0.22" />
        <rect class="px-screen-glow" x="149" y="123" width="62" height="3" fill="#5cf0c0" opacity="0.07" />
        <!-- 桌腿 -->
        <rect x="128" y="121" width="5" height="35" fill="#3a322b" />
        <rect x="128" y="121" width="1" height="35" fill="#4a4038" />
        <rect x="277" y="121" width="4" height="35" fill="#3a322b" />
        <!-- 抽屉柜 -->
        <rect x="236" y="121" width="42" height="35" fill="#423931" />
        <rect x="236" y="121" width="42" height="1" fill="#524639" />
        <rect x="237" y="130" width="40" height="1" fill="#332c26" />
        <rect x="237" y="141" width="40" height="1" fill="#332c26" />
        <rect x="250" y="125" width="14" height="2" fill="#6b5f52" />
        <rect x="250" y="136" width="14" height="2" fill="#6b5f52" />
        <rect x="250" y="147" width="14" height="2" fill="#6b5f52" />
      </g>

      <!-- 桌下：主机 / 走线 -->
      <g>
        <rect x="196" y="124" width="26" height="30" fill="#2b3331" />
        <rect x="197" y="125" width="24" height="28" fill="#232b29" />
        <g fill="#3a4a44">
          <rect x="199" y="128" width="20" height="1" />
          <rect x="199" y="132" width="20" height="1" />
          <rect x="199" y="136" width="20" height="1" />
          <rect x="199" y="140" width="20" height="1" />
        </g>
        <rect class="px-led" x="200" y="148" width="2" height="2" fill="#5cf0c0" />
        <rect x="214" y="146" width="2" height="2" fill="#f0b45a" opacity="0.6" />
        <rect x="206" y="118" width="1" height="6" fill="#33403b" />
        <rect x="206" y="118" width="14" height="1" fill="#33403b" />
        <rect x="220" y="116" width="1" height="3" fill="#33403b" />
      </g>

      <!-- ===================== 显示器 ===================== -->
      <g>
        <rect x="145" y="55" width="70" height="58" fill="#2e3a36" />
        <rect x="145" y="55" width="70" height="1" fill="#46534e" />
        <rect x="145" y="55" width="1" height="58" fill="#3c4744" />
        <rect x="214" y="55" width="1" height="58" fill="#3c4744" />
        <rect x="149" y="59" width="62" height="46" fill="#0b1719" />
        <!-- 下巴 + 支架 -->
        <rect x="149" y="105" width="62" height="8" fill="#28332f" />
        <rect x="149" y="105" width="62" height="1" fill="#3c4744" />
        <rect class="px-led" x="177" y="108" width="2" height="1" fill="#5cf0c0" opacity="0.8" />
        <rect x="172" y="113" width="16" height="4" fill="#1c2623" />
        <rect x="162" y="116" width="36" height="3" fill="#1c2623" />
        <g clip-path="url(#pr-screen)">
          <g class="px-code">
            <rect x="154" y="64" width="16" height="2" fill="#5cf0c0" />
            <rect x="174" y="64" width="12" height="2" fill="#6c7d78" />
            <rect x="154" y="69" width="22" height="2" fill="#6c7d78" />
            <rect x="154" y="74" width="8" height="2" fill="#f0b45a" />
            <rect x="165" y="74" width="18" height="2" fill="#6c7d78" />
            <rect x="154" y="79" width="26" height="2" fill="#5cf0c0" />
            <rect x="161" y="84" width="14" height="2" fill="#6c7d78" />
            <rect x="178" y="84" width="16" height="2" fill="#5cf0c0" />
            <rect x="154" y="89" width="10" height="2" fill="#f0b45a" />
            <rect x="167" y="89" width="18" height="2" fill="#6c7d78" />
            <rect x="154" y="94" width="20" height="2" fill="#6c7d78" />
            <rect x="161" y="99" width="12" height="2" fill="#5cf0c0" opacity="0.75" />
          </g>
          <rect x="186" y="60" width="1" height="42" fill="#16262a" />
          <rect class="px-cursor" x="177" y="96" width="3" height="4" fill="#5cf0c0" />
          <rect class="px-screen-glow" x="149" y="59" width="62" height="46" fill="url(#pr-screenglow)" opacity="0.45" />
        </g>
      </g>

      <!-- ===================== 桌面物件 ===================== -->
      <g>
        <!-- 键盘 -->
        <rect x="156" y="110" width="40" height="6" fill="#2f3835" />
        <rect x="156" y="110" width="40" height="1" fill="#465350" />
        <g fill="#3d4a46">
          <rect x="158" y="112" width="36" height="1" />
          <rect x="159" y="114" width="34" height="1" />
        </g>
        <!-- 鼠标 -->
        <rect x="198" y="112" width="6" height="4" fill="#2f3835" />
        <rect x="198" y="112" width="6" height="1" fill="#465350" />
        <!-- 马克杯 + 热气 -->
        <rect x="206" y="105" width="9" height="11" fill="#cfc8b8" />
        <rect x="206" y="105" width="9" height="1" fill="#e7e0d0" />
        <rect x="215" y="107" width="2" height="5" fill="#cfc8b8" />
        <g fill="#cfc8b8" opacity="0.5">
          <rect class="px-steam" x="208" y="99" width="1" height="3" />
          <rect class="px-steam px-d1" x="211" y="96" width="1" height="3" />
          <rect class="px-steam px-d2" x="209" y="93" width="1" height="3" />
        </g>
        <!-- 手柄 -->
        <g>
          <rect x="219" y="107" width="20" height="7" fill="#2f3835" />
          <rect x="219" y="107" width="20" height="1" fill="#465350" />
          <rect x="218" y="109" width="3" height="5" fill="#262f2c" />
          <rect x="237" y="109" width="3" height="5" fill="#262f2c" />
          <rect x="222" y="109" width="3" height="3" fill="#1e2724" />
          <rect x="232" y="109" width="3" height="3" fill="#1e2724" />
          <rect class="px-core" x="227" y="110" width="2" height="2" fill="#e0663f" />
          <rect x="224" y="110" width="1" height="1" fill="#5cf0c0" />
          <rect x="234" y="110" width="1" height="1" fill="#f0b45a" />
        </g>
        <!-- 台灯 -->
        <g>
          <rect x="250" y="112" width="16" height="4" fill="#2b3331" />
          <rect x="250" y="112" width="16" height="1" fill="#3f4a46" />
          <rect x="257" y="92" width="3" height="21" fill="#46524c" />
          <rect x="244" y="84" width="20" height="8" fill="#46524c" />
          <rect x="246" y="84" width="16" height="1" fill="#5b6a63" />
          <rect x="244" y="91" width="20" height="1" fill="#3a4640" />
          <rect class="px-bulb" x="246" y="91" width="4" height="2" fill="#f7ecc9" />
        </g>
        <!-- 摊在桌上的两张卡 -->
        <g>
          <rect x="262" y="108" width="10" height="8" fill="#d8ece6" transform="rotate(-6 267 112)" />
          <rect x="263" y="109" width="8" height="4" fill="#4a6fa8" transform="rotate(-6 267 112)" />
          <rect x="271" y="110" width="9" height="6" fill="#d8ece6" />
          <rect x="272" y="111" width="7" height="3" fill="#3f7a5c" />
        </g>
      </g>

      <!-- ===================== 地毯 / 盆栽 ===================== -->
      <g>
        <!-- 地毯：近处稍宽，做出一点透视 -->
        <polygon points="76,193 224,193 244,211 56,211" fill="#26332e" />
        <polygon points="79,196 221,196 236,208 64,208" fill="none" stroke="#38493f" stroke-width="1" />
        <g fill="#3a4d45">
          <rect x="99" y="199" width="5" height="1" />
          <rect x="149" y="199" width="5" height="1" />
          <rect x="199" y="199" width="5" height="1" />
          <rect x="124" y="203" width="5" height="1" />
          <rect x="174" y="203" width="5" height="1" />
        </g>
        <!-- 流苏 -->
        <g fill="#3f5148">
          <rect x="60" y="211" width="1" height="3" />
          <rect x="68" y="211" width="1" height="3" />
          <rect x="76" y="211" width="1" height="3" />
          <rect x="220" y="211" width="1" height="3" />
          <rect x="228" y="211" width="1" height="3" />
          <rect x="236" y="211" width="1" height="3" />
        </g>
        <!-- 掉在地毯上的一张卡 -->
        <g transform="rotate(-7 178 200)">
          <rect x="173" y="194" width="9" height="12" fill="#d8ece6" />
          <rect x="174" y="195" width="7" height="5" fill="#d9663c" />
          <rect x="175" y="196" width="4" height="3" fill="#f0b45a" />
          <rect x="174" y="202" width="6" height="1" fill="#8a908a" />
          <rect x="174" y="204" width="4" height="1" fill="#8a908a" />
        </g>
      </g>
      <g class="px-plant">
        <g fill="#3f6b52">
          <rect x="35" y="126" width="2" height="18" />
          <rect x="30" y="130" width="6" height="2" />
          <rect x="36" y="134" width="7" height="2" />
          <rect x="27" y="137" width="4" height="2" />
          <rect x="38" y="124" width="4" height="2" />
          <rect x="33" y="120" width="2" height="3" />
        </g>
        <g fill="#35604a">
          <rect x="29" y="132" width="3" height="2" />
          <rect x="35" y="128" width="3" height="2" />
          <rect x="31" y="141" width="4" height="2" />
          <rect x="40" y="131" width="3" height="3" />
          <rect x="25" y="134" width="3" height="2" />
        </g>
      </g>
      <g>
        <rect x="26" y="144" width="22" height="4" fill="#6b5344" />
        <rect x="26" y="144" width="22" height="1" fill="#7d6152" />
        <rect x="28" y="148" width="18" height="8" fill="#5a4438" />
        <rect x="31" y="151" width="12" height="1" fill="#4a3830" />
      </g>

      <!-- ===================== 椅子 + 人 ===================== -->
      <g>
        <!-- 椅背（低背，藏在人身后） -->
        <rect x="96" y="92" width="13" height="44" fill="#33403b" />
        <rect x="98" y="95" width="9" height="38" fill="#42544d" />
        <rect x="96" y="90" width="13" height="3" fill="#4c5f57" />
        <g fill="#3a4a44">
          <rect x="99" y="101" width="7" height="1" />
          <rect x="99" y="108" width="7" height="1" />
          <rect x="99" y="115" width="7" height="1" />
          <rect x="99" y="122" width="7" height="1" />
        </g>
        <!-- 扶手 -->
        <rect x="100" y="118" width="12" height="3" fill="#33403b" />
        <rect x="107" y="121" width="3" height="13" fill="#2f3a36" />
        <!-- 坐垫 -->
        <rect x="102" y="134" width="46" height="6" fill="#33403b" />
        <rect x="102" y="134" width="46" height="1" fill="#42544d" />
        <rect x="102" y="139" width="46" height="1" fill="#283430" />
        <!-- 气压杆 + 五星脚 -->
        <rect x="120" y="140" width="6" height="12" fill="#2b3532" />
        <rect x="104" y="152" width="38" height="4" fill="#262f2c" />
        <rect x="104" y="152" width="38" height="1" fill="#33403b" />
      </g>
      <g class="px-person">
        <!-- 大腿、小腿、鞋 -->
        <rect x="114" y="128" width="42" height="8" fill="#3b4551" />
        <rect x="114" y="128" width="42" height="1" fill="#48535f" />
        <rect x="148" y="136" width="10" height="18" fill="#333c47" />
        <rect x="144" y="152" width="20" height="4" fill="#20262c" />
        <!-- 连帽衫 -->
        <rect x="112" y="94" width="30" height="36" fill="#2f6b58" />
        <rect x="112" y="94" width="30" height="2" fill="#3c8070" />
        <rect x="112" y="94" width="12" height="8" fill="#285c4c" />
        <rect x="134" y="104" width="4" height="16" fill="#285c4c" />
        <!-- 手臂搭在键盘上 -->
        <rect x="138" y="102" width="6" height="12" fill="#2f6b58" />
        <rect class="px-hand" x="142" y="106" width="14" height="5" fill="#2f6b58" />
        <rect class="px-hand" x="156" y="108" width="6" height="4" fill="#e8b48a" />
        <!-- 头 -->
        <rect x="118" y="74" width="22" height="10" fill="#2b2420" />
        <rect x="120" y="72" width="16" height="2" fill="#332a25" />
        <rect x="118" y="84" width="22" height="12" fill="#e8b48a" />
        <rect x="138" y="86" width="2" height="4" fill="#d9a077" />
        <rect x="132" y="86" width="2" height="2" fill="#2b2420" />
        <rect x="117" y="86" width="1" height="3" fill="#e8b48a" />
        <rect x="122" y="93" width="8" height="2" fill="#d9a077" />
      </g>

      <!-- ===================== 灯光 + 漂浮的灰尘 ===================== -->
      <ellipse class="px-lamp" cx="242" cy="104" rx="50" ry="30" fill="url(#pr-lamp-glow)" />
      <ellipse class="px-screen-glow" cx="180" cy="118" rx="46" ry="18" fill="url(#pr-screen-glow)" />
      <g fill="#cfe8e0" opacity="0.38">
        <rect class="px-dust" x="176" y="56" width="1" height="1" />
        <rect class="px-dust px-d1" x="224" y="68" width="1" height="1" />
        <rect class="px-dust px-d2" x="188" y="88" width="1" height="1" />
        <rect class="px-dust px-d2" x="236" y="52" width="1" height="1" />
        <rect class="px-dust px-d1" x="168" y="72" width="1" height="1" />
        <rect class="px-dust" x="212" y="104" width="1" height="1" />
      </g>
    </svg>

      <!-- 可点区域：透明按钮叠在画面上，坐标来自 SVG 网格 -->
      <div class="pixel-room__hits" @keydown.esc="activeId = ''">
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          class="pixel-room__hit"
          :class="{
            'is-active': activeId === item.id,
            'is-hovered': hovered === item.id,
          }"
          :style="hotspotStyle(item)"
          :aria-label="item.label"
          @mouseenter="hovered = item.id"
          @mouseleave="hovered = ''"
          @focus="hovered = item.id"
          @blur="hovered = ''"
          @click="activeId = activeId === item.id ? '' : item.id"
        >
          <span class="pixel-room__hit-tip" :class="{ 'is-below': item.tip === 'below' }">
            {{ item.label }}
          </span>
        </button>
      </div>
    </div>

    <figcaption class="pixel-room__cap" aria-live="polite">
      <template v-if="active">
        <span class="pixel-room__cap-label">{{ active.tag }}</span>
        <div class="pixel-room__detail">
          <div class="pixel-room__detail-title">{{ active.title }}</div>
          <p class="pixel-room__detail-desc">{{ active.desc }}</p>
          <div class="pixel-room__detail-actions">
            <button
              v-if="active.toggle"
              type="button"
              class="pixel-room__act"
              @click="toggle(active.toggle)"
            >
              {{ activeToggleLabel }}
            </button>
            <router-link v-if="active.link" :to="active.link" class="pixel-room__act pixel-room__act--link">
              看兴趣页
            </router-link>
            <button type="button" class="pixel-room__act pixel-room__act--ghost" @click="activeId = ''">
              收起
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <span class="pixel-room__cap-label">CUTAWAY</span>
        <span>
          夜里的房间：屏幕还亮着，架子上的高达站好，卡册摊在桌上，窗外在下雨。
          <em class="pixel-room__hint">点一下房间里的东西试试。</em>
        </span>
      </template>
    </figcaption>
  </figure>
</template>
