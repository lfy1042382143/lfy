<script setup>
import { workExperience, skills } from '@/data/profile'
import { useReveal } from '@/utils/reveal'

useReveal()

const methods = [
  { icon: '🧭', title: '先对齐目标', desc: '动手前先问清楚「这个需求要解决谁的什么问题」，避免做得很忙但没做对。' },
  { icon: '🧱', title: '小步可回滚', desc: '大改造拆成可灰度的若干步，每一步都能单独上线与回退，风险自然可控。' },
  { icon: '📈', title: '用数据说话', desc: '性能、转化、交付周期都要有指标，方案好不好让数字来判断。' },
]
</script>

<template>
  <div>
    <!-- 页头 -->
    <section class="page-head">
      <div class="container page-head__grid">
        <div>
          <span class="eyebrow">Work · 工作经历</span>
          <h1 class="page-head__title">
            在真实业务里，<em>把代码跑起来</em>
          </h1>
          <p class="page-head__desc">
            2017 年入行，先后在网易与阿里巴巴做前端。做过 H5 资讯产品、双十一会场、
            内容中台的搭建平台。比起写得多漂亮，我更在意方案在线上跑得稳不稳、业务拿到了什么。
          </p>
          <div class="page-head__meta">
            <span class="chip chip--brand">当前：阿里巴巴 · 高级前端</span>
            <span class="chip">3 家公司</span>
            <span class="chip">6 个核心项目</span>
          </div>
        </div>
        <div class="page-head__aside">
          <div class="info-list">
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Suitcase /></el-icon>当前公司</span>
              <span class="info-list__val">阿里巴巴集团 · 内容技术</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Medal /></el-icon>当前职位</span>
              <span class="info-list__val">高级前端工程师</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Calendar /></el-icon>工作年限</span>
              <span class="info-list__val">6 年（2017.07 至今）</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><User /></el-icon>团队</span>
              <span class="info-list__val">前端 3 人小组负责人</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 工作经历 -->
    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div class="mini-head">任职经历</div>

        <div v-for="job in workExperience" :key="job.company + job.period" class="work-card reveal">
          <div class="work-card__head">
            <div class="work-card__logo">{{ job.logoText }}</div>
            <div class="work-card__titles">
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap">
                <h2 class="work-card__company">{{ job.company }}</h2>
                <el-tag v-if="job.current" type="success" effect="light" size="small" round>
                  在职中
                </el-tag>
              </div>
              <div class="work-card__dept">{{ job.department }} · {{ job.location }}</div>
            </div>
            <div class="work-card__meta">
              <span class="work-card__role">{{ job.role }}</span>
              <span class="work-card__period">{{ job.period }}</span>
            </div>
          </div>

          <p class="work-card__summary">{{ job.summary }}</p>

          <div class="mini-head" style="margin-top: 24px">主要职责与成果</div>
          <ul class="dot-list">
            <li v-for="d in job.duties" :key="d">{{ d }}</li>
          </ul>

          <div class="work-card__projects">
            <div v-for="p in job.projects" :key="p.name" class="project-card">
              <div class="project-card__top">
                <span class="project-card__name">{{ p.name }}</span>
                <span class="project-card__role">{{ p.role }}</span>
              </div>
              <p class="project-card__desc">{{ p.desc }}</p>
              <div class="project-card__result">
                <el-icon><Trophy /></el-icon>
                <span>{{ p.result }}</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 8px">
            <span v-for="s in job.stack" :key="s" class="chip chip--ghost">{{ s }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能 -->
    <section class="section section--soft">
      <div class="container">
        <div class="about-grid">
          <div>
            <span class="eyebrow">Skills</span>
            <h2 class="sec-head__title" style="margin-top: 14px">技术栈与熟练度</h2>
            <p class="sec-head__desc">
              自评口径：能不能独立负责一个中等规模项目的完整方案。数字只是相对刻度，不代表绝对水平。
            </p>

            <div style="margin-top: 28px">
              <div v-for="s in skills" :key="s.name" class="skill-row">
                <span class="skill-row__name">{{ s.name }}</span>
                <el-progress :percentage="s.value" :show-text="false" :stroke-width="7" />
                <span class="skill-row__val">{{ s.value }}</span>
              </div>
            </div>
          </div>

          <aside>
            <div class="mini-head">我的工作方法</div>
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div v-for="m in methods" :key="m.title" class="tile">
                <div class="tile__icon">{{ m.icon }}</div>
                <div>
                  <div class="tile__title">{{ m.title }}</div>
                  <div class="tile__desc">{{ m.desc }}</div>
                </div>
              </div>
            </div>

            <div class="pullquote" style="margin-top: 20px">
              <p>好的前端方案，应该让后来接手的人少花一半时间理解它。</p>
              <cite>—— 代码评审时最常说的一句</cite>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section--tight">
      <div class="container">
        <div class="cta-band reveal">
          <div>
            <div class="cta-band__title">想看更细的项目细节？</div>
            <p class="cta-band__desc">
              架构设计、性能治理、低代码物料的取舍，都可以当面聊。也欢迎直接看我的个人经历时间线。
            </p>
          </div>
          <div class="cta-band__actions">
            <el-button type="primary" size="large" round @click="$router.push('/experience')">
              个人经历
            </el-button>
            <el-button size="large" round @click="$router.push('/contact')">
              联系我
            </el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
