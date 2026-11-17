<script setup>
import { education } from '@/data/profile'
import { useReveal } from '@/utils/reveal'

useReveal()
</script>

<template>
  <div>
    <!-- 页头 -->
    <section class="page-head">
      <div class="container page-head__grid">
        <div>
          <span class="eyebrow">Education · 教育背景</span>
          <h1 class="page-head__title">
            知识底座，<em>在校园里搭好</em>
          </h1>
          <p class="page-head__desc">
            浙江大学计算机科学与技术专业，工学学士。四年里最重要的收获不是记住了多少公式，
            而是学会了怎么把一个陌生问题拆开、查资料、再拼回去。
          </p>
          <div class="page-head__meta">
            <span class="chip chip--brand">浙江大学</span>
            <span class="chip">计算机科学与技术</span>
            <span class="chip">2013 - 2017</span>
            <span class="chip">GPA 3.8 / 4.0</span>
          </div>
        </div>
        <div class="page-head__aside">
          <div class="info-list">
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><School /></el-icon>最高学历</span>
              <span class="info-list__val">本科（工学学士）</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Reading /></el-icon>主修方向</span>
              <span class="info-list__val">计算机软件与理论</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Trophy /></el-icon>在校荣誉</span>
              <span class="info-list__val">优秀毕业生 · 国家励志奖学金</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Location /></el-icon>学校地址</span>
              <span class="info-list__val">浙江省杭州市西湖区</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 学校卡片 -->
    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div
          v-for="edu in education"
          :key="edu.school"
          class="edu-card reveal"
          :class="{ 'edu-card--primary': edu.primary }"
        >
          <div class="edu-card__head">
            <div class="edu-card__logo">{{ edu.logoText }}</div>
            <div class="edu-card__titles">
              <h2 class="edu-card__school">{{ edu.school }}</h2>
              <div class="edu-card__school-en">{{ edu.schoolEn }}</div>
              <div class="edu-card__major">
                <el-tag effect="plain" round size="small">{{ edu.degree }}</el-tag>
                <span>{{ edu.major }}</span>
                <span class="muted">·</span>
                <span class="muted">{{ edu.location }}</span>
              </div>
            </div>
            <div class="edu-card__period">{{ edu.period }}</div>
          </div>

          <p class="edu-card__summary">{{ edu.summary }}</p>

          <div class="edu-card__cols">
            <div>
              <div class="mini-head">主修课程</div>
              <div style="display: flex; flex-wrap: wrap; gap: 8px">
                <span v-for="c in edu.courses" :key="c" class="chip">{{ c }}</span>
              </div>

              <div v-if="edu.scores?.length" style="margin-top: 26px">
                <div class="mini-head">成绩概况</div>
                <div v-for="s in edu.scores" :key="s.label" class="edu-score">
                  <div class="edu-score__top">
                    <span>{{ s.label }}</span>
                    <span class="edu-score__val">{{ s.value }} / 100</span>
                  </div>
                  <el-progress :percentage="s.value" :show-text="false" :stroke-width="6" />
                </div>
              </div>
            </div>

            <div>
              <div class="mini-head">荣誉与奖项</div>
              <div class="honor-list">
                <div v-for="h in edu.honors" :key="h.text + h.year" class="honor-item">
                  <span class="honor-item__year">{{ h.year }}</span>
                  <span>{{ h.text }}</span>
                </div>
              </div>

              <div style="margin-top: 26px">
                <div class="mini-head">校园经历</div>
                <ul class="dot-list">
                  <li v-for="c in edu.campus" :key="c">{{ c }}</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="edu.primary" class="edu-quote">
            <div class="pullquote">
              <p>毕业设计做的是《面向移动端的前端性能优化方案研究》，那也是我第一次意识到：性能不是优化项，是产品的一部分。</p>
              <cite>—— 2017 年夏，紫金港</cite>
            </div>
          </div>
        </div>

        <!-- 补充说明 -->
        <div class="surface card-pad reveal" style="margin-top: 22px">
          <div class="mini-head">持续学习</div>
          <div class="highlight-grid">
            <div class="tile" style="border: none; padding: 0">
              <div class="tile__icon">🎓</div>
              <div>
                <div class="tile__title">在线课程</div>
                <div class="tile__desc">持续跟完 Web 性能、编译原理、可视化等方向的课程，累计 300+ 学时。</div>
              </div>
            </div>
            <div class="tile" style="border: none; padding: 0">
              <div class="tile__icon">📖</div>
              <div>
                <div class="tile__title">技术阅读</div>
                <div class="tile__desc">保持每周精读一篇源码或规范文档，笔记整理在自己的知识库里。</div>
              </div>
            </div>
            <div class="tile" style="border: none; padding: 0">
              <div class="tile__icon">🗣️</div>
              <div>
                <div class="tile__title">内部分享</div>
                <div class="tile__desc">在公司内部做过 12 场技术分享，主题覆盖框架升级、性能治理与工程化。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
