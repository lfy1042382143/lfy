<script setup>
import { computed } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { profile, journey, hobbies, highlights } from '@/data/profile'
import { useReveal } from '@/utils/reveal'

useReveal()

const featured = computed(() => journey.slice(0, 4))
const topHobbies = computed(() => hobbies.slice(0, 4))

const facts = [
  { label: '常居城市', value: profile.location },
  { label: '当前职位', value: '高级前端工程师' },
  { label: '工作年限', value: '6 年（2017 年入行）' },
  { label: '常用邮箱', value: profile.email },
]
</script>

<template>
  <div>
    <!-- ---------------------------------- Hero ---------------------------------- -->
    <section class="hero">
      <div class="container hero__grid">
        <div>
          <span class="eyebrow">个人博客 · Personal Blog</span>

          <h1 class="hero__title">
            {{ profile.name }}
            <small>{{ profile.englishName }}</small>
          </h1>

          <div class="hero__role">{{ profile.title }}</div>

          <p class="hero__slogan">
            把复杂留给自己，<mark>把简单交给用户</mark>。
          </p>

          <p class="hero__desc">{{ profile.intro }}</p>

          <div class="hero__actions">
            <el-button type="primary" size="large" round @click="$router.push('/work')">
              查看工作经历
              <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
            <el-button size="large" round plain @click="$router.push('/contact')">
              联系我
            </el-button>
          </div>

          <div class="hero__tags">
            <span v-for="t in profile.tags" :key="t" class="chip">{{ t }}</span>
          </div>
        </div>

        <div class="profile-card reveal">
          <div class="profile-card__top">
            <div class="avatar-badge">{{ profile.initials }}</div>
            <div>
              <div class="profile-card__name">{{ profile.name }}</div>
              <div class="profile-card__role">{{ profile.title }}</div>
            </div>
          </div>

          <div class="profile-card__facts">
            <div v-for="f in facts" :key="f.label" class="profile-card__fact">
              <span>{{ f.label }}</span>
              <span>{{ f.value }}</span>
            </div>
          </div>

          <div class="profile-card__foot">
            <span class="profile-card__status">
              <span class="pulse-dot"></span>
              开放技术交流与新机会
            </span>
            <el-button link type="primary" @click="$router.push('/contact')">
              取得联系
              <el-icon class="el-icon--right"><Right /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- ---------------------------------- 数据条 ---------------------------------- -->
    <section class="section--tight" style="padding-top: 0">
      <div class="container">
        <div class="stat-strip">
          <div v-for="s in profile.stats" :key="s.label" class="stat-item reveal">
            <div class="stat-item__value">{{ s.value }}<span>{{ s.suffix }}</span></div>
            <div class="stat-item__label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ---------------------------------- 关于我 ---------------------------------- -->
    <section class="section">
      <div class="container">
        <div class="about-grid">
          <div class="about-grid__text">
            <span class="eyebrow">About Me</span>
            <h2 class="sec-head__title" style="margin-top: 14px">写代码，也写生活</h2>
            <div style="margin-top: 20px">
              <p v-for="(p, i) in profile.bio" :key="i" class="lead">{{ p }}</p>
            </div>
          </div>

          <aside class="about-aside reveal">
            <div class="mini-head">基本信息</div>
            <div class="info-list info-list--dense">
              <div class="info-list__row">
                <span class="info-list__key"><el-icon><User /></el-icon>姓名</span>
                <span class="info-list__val">{{ profile.name }}</span>
              </div>
              <div class="info-list__row">
                <span class="info-list__key"><el-icon><Location /></el-icon>所在地</span>
                <span class="info-list__val">{{ profile.location }}</span>
              </div>
              <div class="info-list__row">
                <span class="info-list__key"><el-icon><School /></el-icon>学历</span>
                <span class="info-list__val">本科 · 浙江大学</span>
              </div>
              <div class="info-list__row">
                <span class="info-list__key"><el-icon><Suitcase /></el-icon>职业</span>
                <span class="info-list__val">{{ profile.title }}</span>
              </div>
              <div class="info-list__row">
                <span class="info-list__key"><el-icon><Message /></el-icon>邮箱</span>
                <span class="info-list__val">{{ profile.email }}</span>
              </div>
              <div class="info-list__row">
                <span class="info-list__key"><el-icon><Calendar /></el-icon>工作状态</span>
                <span class="info-list__val">在职 · 开放交流</span>
              </div>
            </div>

            <el-divider style="margin: 20px 0" />

            <p class="form-note">{{ profile.slogan }}</p>
            <el-button
              type="primary"
              plain
              round
              style="margin-top: 16px; width: 100%"
              @click="$router.push('/contact')"
            >
              查看地址与联系方式
            </el-button>
          </aside>
        </div>

        <div class="highlight-grid" style="margin-top: 40px">
          <div v-for="h in highlights" :key="h.title" class="tile reveal">
            <div class="tile__icon">{{ h.icon }}</div>
            <div>
              <div class="tile__title">{{ h.title }}</div>
              <div class="tile__desc">{{ h.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ---------------------------------- 经历预览 ---------------------------------- -->
    <section class="section section--soft">
      <div class="container">
        <SectionHeading
          eyebrow="Journey"
          title="一条时间线，串起这十年"
          desc="从高中第一次写下 VB 代码，到今天带小组做前端架构。以下是几个关键节点，完整版本在「个人经历」页。"
        >
          <template #aside>
            <el-button round plain @click="$router.push('/experience')">
              查看完整经历
              <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
          </template>
        </SectionHeading>

        <div class="preview-timeline">
          <div
            v-for="item in featured"
            :key="item.title + item.year"
            class="preview-item"
            @click="$router.push('/experience')"
          >
            <div class="preview-item__year">{{ item.year }}</div>
            <div>
              <div class="preview-item__title">{{ item.title }}</div>
              <div class="preview-item__sub">{{ item.subtitle }}</div>
            </div>
            <el-icon class="preview-item__arrow"><Right /></el-icon>
          </div>
        </div>
      </div>
    </section>

    <!-- ---------------------------------- 兴趣爱好速览 ---------------------------------- -->
    <section class="section">
      <div class="container">
        <SectionHeading
          eyebrow="Hobbies"
          title="工作之外的我"
          desc="摄影、长跑、手冲咖啡和几本书——它们构成了代码之外的另一半生活。"
        >
          <template #aside>
            <el-button round plain @click="$router.push('/hobbies')">
              看看细节
              <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
          </template>
        </SectionHeading>

        <div class="hobby-mini-grid">
          <div v-for="h in topHobbies" :key="h.name" class="hobby-mini reveal">
            <div class="hobby-mini__icon">{{ h.icon }}</div>
            <div class="hobby-mini__name">{{ h.name }}</div>
            <div class="hobby-mini__level">{{ h.metricLabel }} · {{ h.metric }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ---------------------------------- CTA ---------------------------------- -->
    <section class="section--tight" style="padding-top: 0">
      <div class="container">
        <div class="cta-band reveal">
          <div>
            <div class="cta-band__title">有想法？我们聊聊。</div>
            <p class="cta-band__desc">
              无论是技术方案、合作机会，还是只想聊聊某本书和某条跑道，都欢迎写信给我。
            </p>
          </div>
          <div class="cta-band__actions">
            <el-button type="primary" size="large" round @click="$router.push('/contact')">
              给我留言
            </el-button>
            <el-button size="large" round @click="$router.push('/experience')">
              先看经历
            </el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
