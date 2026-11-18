<script setup>
/**
 * 像素剖面房间
 * - 用 168 × 108 的像素网格（每格 1 单位）绘制，shape-rendering=crispEdges 保证不糊
 * - 所有动态效果走 CSS 动画，散落在 pixel-room.css 里，用 steps() 保持像素感
 */
const title = 'ROOM_01 · 我的房间'
const meta = '02:41 AM'
</script>

<template>
  <figure class="pixel-room">
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
      viewBox="0 0 168 108"
      shape-rendering="crispEdges"
      role="img"
      aria-label="像素风格的房间剖面：夜里开着台灯的书桌、正在写代码的显示器、放着高达模型和卡册的架子、下着雨的城市窗外"
    >
      <defs>
        <clipPath id="pr-window">
          <rect x="12" y="16" width="44" height="36" />
        </clipPath>
        <clipPath id="pr-screen">
          <rect x="76" y="32" width="26" height="22" />
        </clipPath>
        <radialGradient id="pr-lamp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#5cf0c0" stop-opacity="0.34" />
          <stop offset="55%" stop-color="#5cf0c0" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#5cf0c0" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="pr-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f7ecc9" stop-opacity="0.16" />
          <stop offset="100%" stop-color="#f7ecc9" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="pr-screenglow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#5cf0c0" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#5cf0c0" stop-opacity="0.02" />
        </linearGradient>
      </defs>

      <!-- ===================== 墙体 / 地面 ===================== -->
      <rect x="0" y="0" width="168" height="108" fill="#0b1211" />
      <rect x="0" y="0" width="168" height="6" fill="#121a18" />
      <rect x="0" y="6" width="168" height="76" fill="#1b2522" />
      <g fill="#202c28" opacity="0.55">
        <rect x="8" y="6" width="1" height="76" />
        <rect x="22" y="6" width="1" height="76" />
        <rect x="36" y="6" width="1" height="76" />
        <rect x="50" y="6" width="1" height="76" />
        <rect x="64" y="6" width="1" height="76" />
        <rect x="78" y="6" width="1" height="76" />
        <rect x="92" y="6" width="1" height="76" />
        <rect x="106" y="6" width="1" height="76" />
        <rect x="120" y="6" width="1" height="76" />
        <rect x="134" y="6" width="1" height="76" />
        <rect x="148" y="6" width="1" height="76" />
        <rect x="162" y="6" width="1" height="76" />
      </g>
      <!-- 墙脚线 + 地板 -->
      <rect x="0" y="80" width="168" height="2" fill="#2b3833" />
      <rect x="0" y="80" width="168" height="1" fill="#3a4a44" />
      <rect x="0" y="82" width="168" height="26" fill="#2a2521" />
      <g fill="#221d1a">
        <rect x="0" y="90" width="168" height="1" />
        <rect x="0" y="98" width="168" height="1" />
        <rect x="0" y="105" width="168" height="1" />
        <rect x="34" y="82" width="1" height="8" />
        <rect x="96" y="82" width="1" height="8" />
        <rect x="14" y="91" width="1" height="7" />
        <rect x="112" y="91" width="1" height="7" />
        <rect x="58" y="99" width="1" height="6" />
        <rect x="140" y="99" width="1" height="6" />
      </g>
      <!-- 家具落地阴影 -->
      <rect x="60" y="82" width="78" height="3" fill="#1d1917" opacity="0.55" />
      <rect x="50" y="81" width="24" height="2" fill="#1d1917" opacity="0.5" />
      <!-- 剖面切边 -->
      <rect x="0" y="0" width="3" height="108" fill="#0f1715" />
      <rect x="165" y="0" width="3" height="108" fill="#0f1715" />
      <rect x="2" y="6" width="1" height="76" fill="#33443e" opacity="0.8" />
      <rect x="165" y="6" width="1" height="76" fill="#33443e" opacity="0.8" />

      <!-- ===================== 窗户（夜景 + 雨） ===================== -->
      <g>
        <rect x="10" y="14" width="48" height="40" fill="#4b5852" />
        <rect x="11" y="15" width="46" height="38" fill="#3b4741" />
        <rect x="12" y="16" width="44" height="36" fill="#0a1418" />
        <g clip-path="url(#pr-window)">
          <!-- 星星 -->
          <g fill="#d8ece6">
            <rect class="px-twinkle" x="18" y="20" width="1" height="1" />
            <rect class="px-twinkle px-d1" x="27" y="24" width="1" height="1" />
            <rect class="px-twinkle px-d2" x="45" y="19" width="1" height="1" />
            <rect class="px-twinkle px-d1" x="50" y="28" width="1" height="1" />
            <rect class="px-twinkle px-d2" x="22" y="30" width="1" height="1" />
            <rect class="px-twinkle" x="40" y="22" width="1" height="1" />
          </g>
          <!-- 远景城市 -->
          <g fill="#111d1f">
            <rect x="12" y="38" width="8" height="14" />
            <rect x="21" y="42" width="6" height="10" />
            <rect x="28" y="35" width="6" height="17" />
            <rect x="35" y="41" width="7" height="11" />
            <rect x="43" y="37" width="6" height="15" />
            <rect x="50" y="44" width="6" height="8" />
          </g>
          <g fill="#f0b45a">
            <rect class="px-twinkle" x="14" y="41" width="1" height="1" />
            <rect x="17" y="45" width="1" height="1" />
            <rect class="px-twinkle px-d2" x="23" y="45" width="1" height="1" />
            <rect x="30" y="39" width="1" height="1" />
            <rect class="px-twinkle px-d1" x="31" y="45" width="1" height="1" />
            <rect x="37" y="44" width="1" height="1" />
            <rect class="px-twinkle px-d2" x="45" y="40" width="1" height="1" />
            <rect x="52" y="47" width="1" height="1" />
          </g>
          <!-- 雨 -->
          <g fill="#7da2aa" opacity="0.5">
            <rect class="px-rain" x="16" y="16" width="1" height="5" />
            <rect class="px-rain px-d1" x="22" y="16" width="1" height="4" />
            <rect class="px-rain px-d2" x="29" y="16" width="1" height="6" />
            <rect class="px-rain px-d1" x="37" y="16" width="1" height="4" />
            <rect class="px-rain px-d2" x="44" y="16" width="1" height="5" />
            <rect class="px-rain" x="51" y="16" width="1" height="4" />
            <rect class="px-rain px-d2" x="19" y="16" width="1" height="5" />
            <rect class="px-rain" x="34" y="16" width="1" height="4" />
          </g>
          <!-- 玻璃反光 -->
          <rect x="12" y="16" width="44" height="1" fill="#9fc7c9" opacity="0.18" />
          <rect x="12" y="16" width="6" height="36" fill="#9fc7c9" opacity="0.05" />
        </g>
        <rect x="33" y="16" width="2" height="36" fill="#3d4a45" />
        <rect x="12" y="33" width="44" height="2" fill="#3d4a45" />
        <rect x="8" y="54" width="52" height="2" fill="#55635c" />
        <rect x="8" y="56" width="52" height="1" fill="#2f3a36" />
      </g>

      <!-- ===================== 墙面：海报 / 挂钟 / 便签 ===================== -->
      <g>
        <!-- 像素风景海报 -->
        <rect x="70" y="9" width="26" height="18" fill="#3d352d" />
        <rect x="71" y="10" width="24" height="16" fill="#15201f" />
        <!-- 山 / 雪线 / 月亮 -->
        <g fill="#2f4a44">
          <rect x="78" y="18" width="5" height="1" />
          <rect x="77" y="19" width="7" height="1" />
          <rect x="76" y="20" width="9" height="1" />
          <rect x="75" y="21" width="11" height="1" />
          <rect x="74" y="22" width="13" height="1" />
          <rect x="73" y="23" width="15" height="1" />
          <rect x="72" y="24" width="18" height="2" />
          <rect x="84" y="22" width="6" height="1" />
          <rect x="83" y="23" width="8" height="3" />
        </g>
        <g fill="#4d7268">
          <rect x="79" y="18" width="3" height="1" />
          <rect x="78" y="19" width="5" height="1" />
          <rect x="78" y="20" width="3" height="1" />
        </g>
        <rect x="88" y="12" width="4" height="4" fill="#f0b45a" />
        <rect x="89" y="11" width="2" height="1" fill="#f0b45a" />
        <g fill="#d8ece6">
          <rect x="74" y="13" width="1" height="1" />
          <rect x="80" y="15" width="1" height="1" />
          <rect x="91" y="17" width="1" height="1" />
        </g>
        <rect x="71" y="25" width="24" height="1" fill="#22322c" />
        <!-- 挂钟 -->
        <rect x="120" y="10" width="14" height="14" fill="#2b3331" />
        <rect x="121" y="11" width="12" height="12" fill="#141e1c" />
        <g fill="#41504a">
          <rect x="126" y="12" width="1" height="1" />
          <rect x="126" y="21" width="1" height="1" />
          <rect x="122" y="16" width="1" height="1" />
          <rect x="131" y="16" width="1" height="1" />
        </g>
        <rect class="px-clock-hand" x="126" y="13" width="1" height="4" fill="#f0b45a" />
        <rect class="px-clock-hand-h" x="127" y="16" width="3" height="1" fill="#e9efec" />
        <!-- 墙上便签 -->
        <rect x="62" y="12" width="5" height="5" fill="#f0b45a" opacity="0.72" />
        <rect x="63" y="14" width="3" height="1" fill="#1b2522" opacity="0.45" />
        <rect x="63" y="15" width="2" height="1" fill="#1b2522" opacity="0.45" />
        <rect x="64" y="11" width="1" height="1" fill="#8a6a33" />
        <rect x="138" y="12" width="6" height="5" fill="#5cf0c0" opacity="0.35" />
      </g>

      <!-- ===================== 吊灯 + 光锥 ===================== -->
      <polygon points="96,20 112,20 128,82 80,82" fill="url(#pr-cone)" />
      <rect x="104" y="6" width="1" height="8" fill="#4b5852" />
      <g fill="#46524c">
        <rect x="96" y="14" width="16" height="1" />
        <rect x="97" y="15" width="14" height="1" />
        <rect x="98" y="16" width="12" height="2" />
        <rect x="100" y="18" width="8" height="1" fill="#5b6a63" />
      </g>
      <rect x="103" y="19" width="2" height="2" fill="#f7ecc9" />
      <ellipse class="px-lamp" cx="104" cy="22" rx="24" ry="17" fill="url(#pr-lamp-glow)" />

      <!-- ===================== 书桌 ===================== -->
      <g>
        <rect x="62" y="58" width="76" height="3" fill="#4a4038" />
        <rect x="62" y="58" width="76" height="1" fill="#5c4f43" />
        <rect x="64" y="61" width="66" height="1" fill="#5cf0c0" opacity="0.45" />
        <rect x="64" y="62" width="66" height="2" fill="#5cf0c0" opacity="0.08" />
        <rect x="64" y="61" width="3" height="21" fill="#3a322b" />
        <rect x="133" y="61" width="3" height="21" fill="#3a322b" />
        <!-- 抽屉柜 -->
        <rect x="116" y="61" width="20" height="18" fill="#423931" />
        <rect x="116" y="61" width="20" height="1" fill="#524639" />
        <rect x="117" y="67" width="18" height="1" fill="#332c26" />
        <rect x="117" y="73" width="18" height="1" fill="#332c26" />
        <rect x="122" y="64" width="6" height="1" fill="#6b5f52" />
        <rect x="122" y="70" width="6" height="1" fill="#6b5f52" />
      </g>

      <!-- 桌下：主机、垃圾桶、线材 -->
      <g>
        <rect x="96" y="64" width="12" height="16" fill="#2b3331" />
        <rect x="97" y="65" width="10" height="14" fill="#232b29" />
        <g fill="#3a4a44">
          <rect x="98" y="67" width="8" height="1" />
          <rect x="98" y="70" width="8" height="1" />
          <rect x="98" y="73" width="8" height="1" />
        </g>
        <rect class="px-led" x="99" y="76" width="1" height="1" fill="#5cf0c0" />
        <rect x="106" y="68" width="1" height="1" fill="#f0b45a" opacity="0.6" />
        <!-- 走线 -->
        <rect x="100" y="63" width="1" height="1" fill="#33403b" />
        <rect x="104" y="62" width="6" height="1" fill="#33403b" />
        <rect x="110" y="61" width="2" height="1" fill="#33403b" />
        <rect x="82" y="78" width="6" height="4" fill="#2f3a36" />
        <rect x="81" y="77" width="8" height="1" fill="#3b4741" />
      </g>

      <!-- ===================== 显示器 ===================== -->
      <g>
        <rect x="74" y="30" width="30" height="26" fill="#2b3331" />
        <rect x="75" y="31" width="28" height="24" fill="#0b1719" />
        <rect x="86" y="56" width="6" height="2" fill="#2b3331" />
        <rect x="80" y="57" width="18" height="1" fill="#2b3331" />
        <g clip-path="url(#pr-screen)">
          <g class="px-code">
            <rect x="78" y="34" width="10" height="1" fill="#5cf0c0" />
            <rect x="90" y="34" width="7" height="1" fill="#6c7d78" />
            <rect x="78" y="37" width="7" height="1" fill="#6c7d78" />
            <rect x="87" y="37" width="11" height="1" fill="#f0b45a" />
            <rect x="78" y="40" width="13" height="1" fill="#5cf0c0" />
            <rect x="80" y="43" width="7" height="1" fill="#6c7d78" />
            <rect x="89" y="43" width="10" height="1" fill="#5cf0c0" />
            <rect x="78" y="46" width="12" height="1" fill="#6c7d78" />
            <rect x="80" y="49" width="6" height="1" fill="#f0b45a" />
            <rect x="88" y="49" width="10" height="1" fill="#6c7d78" />
            <rect x="78" y="52" width="9" height="1" fill="#5cf0c0" opacity="0.7" />
          </g>
          <rect class="px-cursor" x="97" y="51" width="2" height="2" fill="#5cf0c0" />
          <rect x="76" y="32" width="26" height="22" fill="url(#pr-screenglow)" opacity="0.5" />
        </g>
        <!-- 副屏 -->
        <rect x="106" y="44" width="8" height="14" fill="#2b3331" />
        <rect x="107" y="45" width="6" height="12" fill="#0b1719" />
        <g fill="#5cf0c0" opacity="0.75">
          <rect x="108" y="45" width="3" height="1" />
          <rect x="108" y="47" width="4" height="1" />
          <rect x="108" y="49" width="2" height="1" />
          <rect x="108" y="51" width="4" height="1" />
        </g>
        <!-- 键盘 / 鼠标 -->
        <rect x="80" y="59" width="24" height="2" fill="#2f3835" />
        <rect x="81" y="59" width="22" height="1" fill="#465350" />
        <rect x="106" y="59" width="3" height="2" fill="#2f3835" />
        <!-- 马克杯 + 热气 -->
        <rect x="118" y="54" width="6" height="4" fill="#cfc8b8" />
        <rect x="124" y="55" width="1" height="2" fill="#cfc8b8" />
        <rect x="118" y="54" width="6" height="1" fill="#e7e0d0" />
        <g fill="#cfc8b8" opacity="0.55">
          <rect class="px-steam" x="120" y="50" width="1" height="2" />
          <rect class="px-steam px-d1" x="122" y="48" width="1" height="2" />
          <rect class="px-steam px-d2" x="121" y="46" width="1" height="2" />
        </g>
        <!-- 草稿本 -->
        <rect x="126" y="56" width="8" height="2" fill="#b9b2a2" />
        <rect x="126" y="56" width="8" height="1" fill="#d5cfc0" />
      </g>

      <!-- ===================== 椅子 + 人 ===================== -->
      <g>
        <!-- 椅背 / 坐垫 / 气压杆 / 五星脚 -->
        <rect x="50" y="40" width="5" height="30" fill="#33403b" />
        <rect x="51" y="42" width="3" height="18" fill="#42544d" />
        <rect x="50" y="40" width="5" height="1" fill="#4c5f57" />
        <rect x="52" y="70" width="20" height="3" fill="#33403b" />
        <rect x="52" y="70" width="20" height="1" fill="#42544d" />
        <rect x="56" y="63" width="8" height="2" fill="#2b3532" />
        <rect x="60" y="73" width="3" height="7" fill="#2b3532" />
        <rect x="52" y="79" width="19" height="3" fill="#262f2c" />
      </g>
      <g class="px-person">
        <!-- 大腿向前伸、小腿垂下，坐姿 -->
        <rect x="58" y="66" width="20" height="6" fill="#3b4551" />
        <rect x="58" y="66" width="20" height="1" fill="#48535f" />
        <rect x="74" y="71" width="5" height="10" fill="#333c47" />
        <rect x="72" y="80" width="10" height="2" fill="#20262c" />
        <!-- 连帽衫 -->
        <rect x="58" y="47" width="14" height="19" fill="#2f6b58" />
        <rect x="58" y="47" width="14" height="2" fill="#3c8070" />
        <rect x="58" y="47" width="6" height="4" fill="#285c4c" />
        <rect x="67" y="52" width="3" height="8" fill="#285c4c" />
        <!-- 手臂伸到键盘上 -->
        <rect x="70" y="51" width="4" height="6" fill="#2f6b58" />
        <rect class="px-hand" x="74" y="55" width="9" height="4" fill="#2f6b58" />
        <rect class="px-hand" x="82" y="57" width="3" height="2" fill="#e8b48a" />
        <!-- 头 -->
        <rect x="60" y="37" width="10" height="5" fill="#2b2420" />
        <rect x="62" y="36" width="6" height="1" fill="#332a25" />
        <rect x="60" y="41" width="10" height="6" fill="#e8b48a" />
        <rect x="70" y="43" width="1" height="2" fill="#d9a077" />
        <rect x="67" y="42" width="1" height="1" fill="#2b2420" />
        <rect x="59" y="42" width="1" height="1" fill="#e8b48a" />
        <rect x="63" y="47" width="4" height="1" fill="#d9a077" />
      </g>

      <!-- ===================== 置物架 ===================== -->
      <g>
        <rect x="140" y="20" width="26" height="42" fill="#332c26" />
        <rect x="142" y="22" width="22" height="38" fill="#1e2826" />
        <rect x="140" y="20" width="26" height="2" fill="#4a4038" />
        <rect x="140" y="32" width="26" height="2" fill="#4a4038" />
        <rect x="140" y="45" width="26" height="2" fill="#4a4038" />
        <rect x="140" y="59" width="26" height="2" fill="#4a4038" />
        <rect x="140" y="20" width="1" height="42" fill="#4a4038" />
        <rect x="165" y="20" width="1" height="42" fill="#4a4038" />
        <!-- 上层：书 -->
        <g>
          <rect x="143" y="24" width="3" height="8" fill="#4f6b62" />
          <rect x="146" y="25" width="3" height="7" fill="#6b5a45" />
          <rect x="149" y="24" width="2" height="8" fill="#4a5a70" />
          <rect x="151" y="26" width="3" height="6" fill="#7a6a51" />
          <rect x="155" y="25" width="4" height="7" fill="#553f36" />
          <rect x="160" y="27" width="3" height="5" fill="#3f5b52" />
        </g>
        <!-- 中层：高达模型 -->
        <g>
          <!-- 头 + V 字天线 -->
          <rect x="147" y="35" width="6" height="3" fill="#dfe7e3" />
          <rect x="148" y="34" width="4" height="1" fill="#dfe7e3" />
          <rect x="149" y="33" width="2" height="1" fill="#f0b45a" />
          <rect x="148" y="33" width="1" height="1" fill="#f0b45a" />
          <rect x="151" y="33" width="1" height="1" fill="#f0b45a" />
          <rect x="149" y="36" width="1" height="1" fill="#5cf0c0" />
          <rect x="151" y="36" width="1" height="1" fill="#5cf0c0" />
          <!-- 躯干 + 蓝色胸甲 -->
          <rect x="147" y="38" width="6" height="5" fill="#dfe7e3" />
          <rect x="148" y="39" width="4" height="2" fill="#3f6b9a" />
          <rect x="149" y="41" width="2" height="1" fill="#f0b45a" />
          <!-- 肩甲 / 手臂 -->
          <rect x="144" y="38" width="3" height="3" fill="#c2cbc6" />
          <rect x="153" y="38" width="3" height="3" fill="#c2cbc6" />
          <rect x="145" y="41" width="2" height="3" fill="#dfe7e3" />
          <rect x="153" y="41" width="2" height="3" fill="#dfe7e3" />
          <!-- 腿 + 脚 -->
          <rect x="147" y="43" width="2" height="3" fill="#dfe7e3" />
          <rect x="151" y="43" width="2" height="3" fill="#dfe7e3" />
          <rect x="146" y="45" width="3" height="1" fill="#3f6b9a" />
          <rect x="151" y="45" width="3" height="1" fill="#3f6b9a" />
        </g>
        <g>
          <rect x="157" y="39" width="4" height="3" fill="#3b2f4a" />
          <rect x="157" y="39" width="4" height="1" fill="#5cf0c0" opacity="0.6" />
        </g>
        <!-- 下层：卡册 / 卡盒 / 音响 -->
        <g>
          <rect x="143" y="48" width="9" height="10" fill="#3b2f4a" />
          <rect x="145" y="50" width="5" height="1" fill="#5cf0c0" opacity="0.55" />
          <rect x="145" y="52" width="4" height="1" fill="#5cf0c0" opacity="0.35" />
          <rect x="154" y="51" width="5" height="7" fill="#423931" />
          <rect x="155" y="52" width="3" height="1" fill="#6b5f52" />
        </g>
        <!-- 音响 + 跳动电平 -->
        <rect x="160" y="47" width="5" height="11" fill="#2b3331" />
        <g fill="#5cf0c0">
          <rect class="px-eq" x="161" y="54" width="1" height="3" />
          <rect class="px-eq px-d1" x="162" y="52" width="1" height="5" />
          <rect class="px-eq px-d2" x="163" y="55" width="1" height="2" />
        </g>
        <!-- 架下摞着的模型盒 -->
        <g>
          <rect x="142" y="74" width="14" height="8" fill="#3a3f52" />
          <rect x="143" y="75" width="12" height="2" fill="#5f6b8c" />
          <rect x="143" y="78" width="8" height="1" fill="#8b96b5" />
          <rect x="144" y="70" width="12" height="4" fill="#4a3f52" />
          <rect x="145" y="71" width="10" height="1" fill="#8f7fa8" />
          <rect x="144" y="70" width="12" height="1" fill="#6d5f7a" />
          <rect x="146" y="66" width="9" height="4" fill="#3f4a3f" />
          <rect x="147" y="67" width="7" height="1" fill="#5cf0c0" opacity="0.5" />
        </g>
        <!-- 挂在架边的耳机 -->
        <g fill="#2b3331">
          <rect x="166" y="34" width="1" height="6" />
          <rect x="164" y="33" width="2" height="1" />
          <rect x="163" y="34" width="1" height="3" />
        </g>
      </g>

      <!-- ===================== 盆栽 / 地毯 ===================== -->
      <g class="px-plant">
        <rect x="18" y="64" width="1" height="10" fill="#3f6b52" />
        <rect x="15" y="66" width="3" height="1" fill="#3f6b52" />
        <rect x="19" y="68" width="3" height="1" fill="#3f6b52" />
        <rect x="16" y="70" width="2" height="1" fill="#35604a" />
        <rect x="20" y="64" width="2" height="1" fill="#35604a" />
        <rect x="14" y="69" width="2" height="1" fill="#35604a" />
        <rect x="18" y="61" width="1" height="3" fill="#35604a" />
      </g>
      <g>
        <rect x="13" y="73" width="12" height="2" fill="#6b5344" />
        <rect x="14" y="75" width="10" height="7" fill="#5a4438" />
        <rect x="16" y="79" width="6" height="1" fill="#4a3830" />
        <rect x="14" y="75" width="10" height="1" fill="#75594a" />
      </g>

      <g>
        <rect x="44" y="90" width="58" height="12" fill="#2d3a35" />
        <rect x="44" y="90" width="58" height="1" fill="#41544c" />
        <rect x="44" y="101" width="58" height="1" fill="#22302b" />
        <rect x="44" y="90" width="1" height="12" fill="#41544c" />
        <rect x="101" y="90" width="1" height="12" fill="#41544c" />
        <rect x="47" y="94" width="52" height="1" fill="#35443e" />
        <rect x="47" y="97" width="52" height="1" fill="#35443e" />
        <!-- 流苏 -->
        <g fill="#43564e">
          <rect x="42" y="92" width="2" height="1" />
          <rect x="42" y="96" width="2" height="1" />
          <rect x="42" y="100" width="2" height="1" />
          <rect x="102" y="92" width="2" height="1" />
          <rect x="102" y="96" width="2" height="1" />
          <rect x="102" y="100" width="2" height="1" />
        </g>
      </g>

      <!-- ===================== 光里漂浮的灰尘 ===================== -->
      <g fill="#cfe8e0" opacity="0.4">
        <rect class="px-dust" x="88" y="28" width="1" height="1" />
        <rect class="px-dust px-d1" x="112" y="34" width="1" height="1" />
        <rect class="px-dust px-d2" x="94" y="44" width="1" height="1" />
        <rect class="px-dust px-d2" x="118" y="26" width="1" height="1" />
        <rect class="px-dust px-d1" x="84" y="36" width="1" height="1" />
      </g>
    </svg>
    </div>

    <figcaption class="pixel-room__cap">
      <span class="pixel-room__cap-label">CUTAWAY</span>
      <span>夜里的房间：屏幕还亮着，模型在架子上站好，窗外在下雨。</span>
    </figcaption>
  </figure>
</template>
