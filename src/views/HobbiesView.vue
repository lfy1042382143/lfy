<script setup>
import { hobbies, readingList } from '@/data/profile'
import { useReveal } from '@/utils/reveal'

useReveal()
</script>

<template>
  <div>
    <!-- 页头 -->
    <section class="page-head">
      <div class="container page-head__grid">
        <div>
          <span class="eyebrow">Hobbies · 兴趣爱好</span>
          <h1 class="page-head__title">
            代码之外，<em>还有点别的</em>
          </h1>
          <p class="page-head__desc">
            从北方到南方，路上养成的习惯就那么几个：到处走走、随手拍点照片、听歌、打球。
            这一页内容还在陆续补充，先把位置占上。
          </p>
          <div class="page-head__meta">
            <span class="chip chip--brand">旅行 · 摄影 · 音乐</span>
            <span class="chip">运动 · 游戏 · 阅读</span>
            <span class="chip">占位内容 · 持续补充</span>
          </div>
        </div>
        <div class="page-head__aside">
          <div class="pullquote">
            <p>会玩的人，通常也会学。</p>
            <cite>—— 给自己找的借口</cite>
          </div>
        </div>
      </div>
    </section>

    <!-- 爱好网格 -->
    <section class="section" style="padding-top: 20px">
      <div class="container">
        <el-alert
          type="info"
          :closable="false"
          show-icon
          title="以下爱好为占位内容"
          description="真实爱好、具体经历和数量在逐步补充中，可以直接改 src/data/profile.js 里的 hobbies 数组。"
          style="margin-bottom: 22px"
        />

        <div class="hobby-grid">
          <article v-for="h in hobbies" :key="h.name" class="hobby-card reveal">
            <div class="hobby-card__top">
              <div class="hobby-card__icon">{{ h.icon }}</div>
              <div class="hobby-card__metric">
                <strong>{{ h.metric }}</strong>
                <span>{{ h.metricLabel }}</span>
              </div>
            </div>
            <h3 class="hobby-card__name">
              {{ h.name }}
              <span v-if="h.pending" class="pending-tag">待补充</span>
            </h3>
            <div class="hobby-card__level">{{ h.level }}</div>
            <p class="hobby-card__desc">{{ h.desc }}</p>
            <div class="hobby-card__tags">
              <span v-for="t in h.tags" :key="t" class="chip chip--ghost">{{ t }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 阅读清单 -->
    <section class="section section--soft">
      <div class="container">
        <div class="about-grid">
          <div>
            <span class="eyebrow">Reading</span>
            <h2 class="sec-head__title" style="margin-top: 14px">最近在读</h2>
            <p class="sec-head__desc">
              读书笔记还散在手机备忘录里，先把读过的、在读的列一下。
            </p>

            <div class="reading-list" style="margin-top: 12px">
              <div v-for="b in readingList" :key="b.title" class="reading-item">
                <div>
                  <div class="reading-item__title">{{ b.title }}</div>
                  <div class="reading-item__author">{{ b.author }}</div>
                </div>
                <el-tag
                  size="small"
                  round
                  effect="plain"
                  :type="b.type === '读完' ? 'success' : b.type === '在读' ? 'warning' : 'info'"
                >
                  {{ b.type }}
                </el-tag>
                <p class="reading-item__comment">{{ b.comment }}</p>
              </div>
            </div>
          </div>

          <aside class="aside-sticky">
            <div class="mini-head">这些事带给我的</div>
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div class="tile">
                <div class="tile__icon">🧭</div>
                <div>
                  <div class="tile__title">换个视角</div>
                  <div class="tile__desc">出门走走最容易换个角度想问题，卡住的代码往往在路上就想通了。</div>
                </div>
              </div>
              <div class="tile">
                <div class="tile__icon">🔋</div>
                <div>
                  <div class="tile__title">恢复力</div>
                  <div class="tile__desc">运动一小时，比盯着屏幕两小时更能重启状态。</div>
                </div>
              </div>
              <div class="tile">
                <div class="tile__icon">📝</div>
                <div>
                  <div class="tile__title">表达</div>
                  <div class="tile__desc">拍照和写字都是在练「怎么把感觉说清楚」，写需求文档也一样。</div>
                </div>
              </div>
            </div>

            <el-divider style="margin: 26px 0" />

            <p class="form-note">
              如果你也喜欢其中某件事，欢迎在留言里告诉我——约球、换书单、聊聊相机都行。
            </p>
            <el-button
              type="primary"
              round
              plain
              style="margin-top: 14px; width: 100%"
              @click="$router.push('/contact')"
            >
              找我聊聊
            </el-button>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
