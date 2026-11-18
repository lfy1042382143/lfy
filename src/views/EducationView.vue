<script setup>
import { education, middleSchools } from '@/data/profile'
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
            软件工程，<em>中澳合作培养</em>
          </h1>
          <p class="page-head__desc">
            广西科技大学 × 澳大利亚南十字星大学，软件工程专业本科项目。四年在柳州完成，
            澳方教师带着原版教材来上课，毕业时拿到中澳两边的学位证书——这是我大学四年最实在的收获。
          </p>
          <div class="page-head__meta">
            <span class="chip chip--brand">广西科技大学</span>
            <span class="chip">软件工程（中外合作办学）</span>
            <span class="chip">2021 - 2025</span>
            <span class="chip">中澳双学位</span>
          </div>
        </div>
        <div class="page-head__aside">
          <div class="info-list">
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><School /></el-icon>就读院校</span>
              <span class="info-list__val">广西科技大学</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Reading /></el-icon>专业</span>
              <span class="info-list__val">软件工程（080902H）</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Connection /></el-icon>合作院校</span>
              <span class="info-list__val">南十字星大学（澳）</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Medal /></el-icon>学位</span>
              <span class="info-list__val">工学学士 + 信息技术学士</span>
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
          :class="{ 'edu-card--primary': edu.primary, 'edu-card--coop': edu.coop }"
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

              <template v-if="edu.points?.length">
                <div class="mini-head" style="margin-top: 26px">项目要点</div>
                <div class="point-list">
                  <div v-for="p in edu.points" :key="p.name" class="point-item">
                    <div class="point-item__name">{{ p.name }}</div>
                    <div class="point-item__desc">{{ p.desc }}</div>
                  </div>
                </div>
              </template>
            </div>

            <div>
              <div class="mini-head">校园经历</div>
              <ul v-if="edu.campus?.length" class="dot-list">
                <li v-for="c in edu.campus" :key="c">{{ c }}</li>
              </ul>
              <div v-else class="empty-block">
                <div class="empty-block__title">待补充</div>
                <div class="empty-block__desc">这一段经历还没整理好。</div>
              </div>

              <div style="margin-top: 26px">
                <div class="mini-head">荣誉与奖项</div>
                <div v-if="edu.honors?.length" class="honor-list">
                  <div v-for="h in edu.honors" :key="h.text + h.year" class="honor-item">
                    <span class="honor-item__year">{{ h.year }}</span>
                    <span>{{ h.text }}</span>
                  </div>
                </div>
                <div v-else class="empty-block">
                  <div class="empty-block__title">待补充</div>
                  <div class="empty-block__desc">奖学金、竞赛、证书这些整理好后会补在这里。</div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="edu.quote" class="edu-quote">
            <div class="pullquote">
              <p>{{ edu.quote.text }}</p>
              <cite>{{ edu.quote.cite }}</cite>
            </div>
          </div>
        </div>

        <!-- 中学阶段 -->
        <div class="surface card-pad reveal" style="margin-top: 22px">
          <div class="mini-head">中学与小学阶段</div>
          <el-alert
            type="info"
            :closable="false"
            show-icon
            style="margin-bottom: 6px"
            title="学校名称待补充"
            description="小学、初中、高中都在大连就读，具体学校名称填进 src/data/profile.js 的 middleSchools 即可自动显示。"
          />
          <div class="school-list">
            <div v-for="s in middleSchools" :key="s.stage" class="school-row">
              <span class="school-row__stage">{{ s.stage }}</span>
              <div>
                <div class="school-row__name">
                  {{ s.name || '—' }}
                  <span v-if="s.pending" class="pending-tag">校名待补充</span>
                </div>
                <div class="school-row__meta">{{ s.city }}</div>
              </div>
              <span class="school-row__period">{{ s.period }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
