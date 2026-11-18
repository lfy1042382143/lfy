<script setup>
import { computed } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import { profile, journey, hobbies, highlights } from '@/data/profile'
import { useReveal } from '@/utils/reveal'

useReveal()

const featured = computed(() => journey.slice(0, 4))
const topHobbies = computed(() => hobbies.slice(0, 4))

const facts = [
  { label: '出生地', value: '内蒙古 · 赤峰' },
  { label: '现居', value: '广西 · 柳州' },
  { label: '学校', value: '广西科技大学' },
  { label: '专业', value: '软件工程（中外合作）' },
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
            把学到的东西，<mark>做成能跑起来的东西</mark>。
          </p>

          <p class="hero__desc">{{ profile.intro }}</p>

          <div class="hero__actions">
            <el-button type="primary" size="large" round @click="$router.push('/education')">
              查看教育背景
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
              <div class="profile-card__role">{{ profile.role }}</div>
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
              开放实习与工作机会
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
            <h2 class="sec-head__title" style="margin-top: 14px">从赤峰出发，一路向南</h2>
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
                <span class="info-list__key"><el-icon><Calendar /></el-icon>生日</span>
                <span class="info-list__val">{{ profile.birthdayText }}（{{ profile.age }} 岁）</span>
              </div>
              <div class="info-list__row">
                <span class="info-list__key"><el-icon><Male /></el-icon>性别</span>
                <span class="info-list__val">{{ profile.gender }}</span>
              </div>
              <div class="info-list__row">
                <span class="info-list__key"><el-icon><Location /></el-icon>家乡</span>
                <span class="info-list__val">内蒙古 · 赤峰</span>
              </div>
              <div class="info-list__row">
                <span class="info-list__key"><el-icon><School /></el-icon>学校</span>
                <span class="info-list__val">广西科技大学 · 国际教育学院</span>
              </div>
              <div class="info-list__row">
                <span class="info-list__key"><el-icon><Reading /></el-icon>专业</span>
                <span class="info-list__val">软件工程（中外合作办学）</span>
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

    <!-- ---------------------------------- 三座城市 ---------------------------------- -->
    <section class="section section--soft">
      <div class="container">
        <SectionHeading
          eyebrow="Cities"
          title="三座城市，一条成长线"
          desc="出生在赤峰，长大在大连，读书在柳州。三座城市隔了大半个中国，也刚好对应我人生的三个阶段。"
        />

        <div class="city-grid">
          <article
            v-for="c in profile.cities"
            :key="c.name"
            class="city-card reveal"
            :class="`city-card--${c.colorKey}`"
          >
            <div class="city-card__head">
              <span class="city-card__icon">{{ c.icon }}</span>
              <span class="city-card__tag">{{ c.tag }}</span>
            </div>
            <h3 class="city-card__name">{{ c.name }}</h3>
            <p class="city-card__desc">{{ c.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ---------------------------------- 经历预览 ---------------------------------- -->
    <section class="section">
      <div class="container">
        <SectionHeading
          eyebrow="Journey"
          title="一条时间线，串起这二十多年"
          desc="从 2003 年在赤峰出生，到大连的十二年，再到柳州的四年大学。以下是几个关键节点，完整版本在「个人经历」页。"
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
              <div class="preview-item__title">
                {{ item.title }}
                <span v-if="item.pending" class="pending-tag">待补充</span>
              </div>
              <div class="preview-item__sub">{{ item.subtitle }}</div>
            </div>
            <el-icon class="preview-item__arrow"><Right /></el-icon>
          </div>
        </div>
      </div>
    </section>

    <!-- ---------------------------------- 兴趣爱好速览 ---------------------------------- -->
    <section class="section section--soft">
      <div class="container">
        <SectionHeading
          eyebrow="Hobbies"
          title="学习之外的我"
          desc="拼高达、打 PTCG、开一局 Apex，或者在 Warframe 里折腾配装——这些是代码之外的部分。"
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
            <div class="hobby-mini__level">{{ h.level }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ---------------------------------- CTA ---------------------------------- -->
    <section class="section--tight" style="padding-top: 0">
      <div class="container">
        <div class="cta-band reveal">
          <div>
            <div class="cta-band__title">想认识一下？</div>
            <p class="cta-band__desc">
              不管是实习机会、技术上的讨论，还是想聊聊这三座城市，都欢迎写信给我。
            </p>
          </div>
          <div class="cta-band__actions">
            <el-button type="primary" size="large" round @click="$router.push('/contact')">
              给我留言
            </el-button>
            <el-button size="large" round @click="$router.push('/practice')">
              看技能与证书
            </el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
