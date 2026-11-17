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
            代码之外，<em>还有半个生活</em>
          </h1>
          <p class="page-head__desc">
            工作让我学会怎么解决问题，爱好让我记得为什么要生活。摄影教我等光，
            长跑教我不急，手冲咖啡教我接受一杯不如意的结果。
          </p>
          <div class="page-head__meta">
            <span class="chip chip--brand">6 项长期爱好</span>
            <span class="chip">摄影 · 长跑 · 咖啡</span>
            <span class="chip">阅读 · 徒步 · 开源</span>
          </div>
        </div>
        <div class="page-head__aside">
          <div class="pullquote">
            <p>把时间花在喜欢的事上，从来都不算浪费。</p>
            <cite>—— 关于业余时间的一点私心</cite>
          </div>
        </div>
      </div>
    </section>

    <!-- 爱好网格 -->
    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div class="hobby-grid">
          <article v-for="h in hobbies" :key="h.name" class="hobby-card reveal">
            <div class="hobby-card__top">
              <div class="hobby-card__icon">{{ h.icon }}</div>
              <div class="hobby-card__metric">
                <strong>{{ h.metric }}</strong>
                <span>{{ h.metricLabel }}</span>
              </div>
            </div>
            <h3 class="hobby-card__name">{{ h.name }}</h3>
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
              读书笔记散落在各处，这里先放一个简短的清单。技术书和文学书交替读，
              是我保持输入最稳定的方式。
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
                <div class="tile__icon">🎯</div>
                <div>
                  <div class="tile__title">耐心</div>
                  <div class="tile__desc">等一张照片的光、等一支豆子排气，都需要慢下来。</div>
                </div>
              </div>
              <div class="tile">
                <div class="tile__icon">🧠</div>
                <div>
                  <div class="tile__title">结构感</div>
                  <div class="tile__desc">长期阅读让我更擅长把零散信息组织成可复用的框架。</div>
                </div>
              </div>
              <div class="tile">
                <div class="tile__icon">🔋</div>
                <div>
                  <div class="tile__title">恢复力</div>
                  <div class="tile__desc">跑步和徒步是最好的重启方式，跑完十公里再难题也顺眼些。</div>
                </div>
              </div>
            </div>

            <el-divider style="margin: 26px 0" />

            <p class="form-note">
              如果你也喜欢其中某件事，欢迎在留言里告诉我——约跑、交换书单、或者聊聊相机都行。
            </p>
            <el-button type="primary" round plain style="margin-top: 14px; width: 100%" @click="$router.push('/contact')">
              找我聊聊
            </el-button>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
