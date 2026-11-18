<script setup>
import { skills, certificates, learningWays, practices } from '@/data/profile'
import { useReveal } from '@/utils/reveal'

useReveal()
</script>

<template>
  <div>
    <!-- 页头 -->
    <section class="page-head">
      <div class="container page-head__grid">
        <div>
          <span class="eyebrow">Practice · 实践与技能</span>
          <h1 class="page-head__title">
            会什么，<em>正在补什么</em>
          </h1>
          <p class="page-head__desc">
            专业上以 Java 为主，也写 Python 和前端。目前实习与项目经历还在整理，
            先把技能、证书和学习方式摆出来——这一页会随着经历增加不断更新。
          </p>
          <div class="page-head__meta">
            <span class="chip chip--brand">软件工程</span>
            <span class="chip">Java / Python / Web</span>
            <span class="chip">3 份学位与毕业证书</span>
          </div>
        </div>
        <div class="page-head__aside">
          <div class="info-list">
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Monitor /></el-icon>主语言</span>
              <span class="info-list__val">Java · Python · JavaScript</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Coin /></el-icon>数据库</span>
              <span class="info-list__val">MySQL</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Tools /></el-icon>工具</span>
              <span class="info-list__val">Git · Linux · VS Code · IDEA</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Document /></el-icon>状态</span>
              <span class="info-list__val">开放实习与工作机会</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 实习 / 项目 -->
    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div class="about-grid">
          <div>
            <div class="mini-head">实习与项目</div>
            <el-alert
              type="warning"
              :closable="false"
              show-icon
              title="这部分内容正在整理"
              description="有实习、课程设计或个人项目之后，会按「时间 / 角色 / 做了什么 / 结果」的格式补充在这里。"
              style="margin-bottom: 18px"
            />

            <div
              v-for="p in practices"
              :key="p.title"
              class="prac-card reveal"
            >
              <div class="prac-card__top">
                <span class="prac-card__kind">{{ p.kind }}</span>
                <span class="prac-card__period">{{ p.period }}</span>
              </div>
              <h3 class="prac-card__title">
                {{ p.title }}
                <span v-if="p.pending" class="pending-tag">待补充</span>
              </h3>
              <p class="prac-card__desc">{{ p.desc }}</p>
            </div>
          </div>

          <aside class="aside-sticky">
            <div class="mini-head">证书与学历</div>
            <div class="cert-list">
              <div v-for="c in certificates" :key="c.name" class="cert-item">
                <span class="cert-item__dot" :class="{ 'is-pending': !c.done }">
                  <el-icon v-if="c.done"><Select /></el-icon>
                  <el-icon v-else><Minus /></el-icon>
                </span>
                <div style="flex: 1">
                  <div class="cert-item__name" :class="{ 'is-pending': !c.done }">{{ c.name }}</div>
                  <div class="cert-item__org">{{ c.org }}</div>
                </div>
                <span class="cert-item__year">{{ c.year }}</span>
              </div>
            </div>

            <el-divider style="margin: 24px 0" />

            <p class="form-note">
              学位证书相关信息可在教育部中外合作办学监管平台查询（批准书编号 MOE45AU2A20131469N）。
            </p>
          </aside>
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
              自评口径：能不能独立把一个小项目从需求做到跑起来。数字只是相对刻度，不代表绝对水平。
            </p>

            <div style="margin-top: 28px">
              <div v-for="s in skills" :key="s.name" class="skill-row skill-row--with-note">
                <div>
                  <span class="skill-row__name">{{ s.name }}</span>
                  <div class="skill-row__note">{{ s.note }}</div>
                </div>
                <el-progress :percentage="s.value" :show-text="false" :stroke-width="7" />
                <span class="skill-row__val">{{ s.value }}</span>
              </div>
            </div>
          </div>

          <aside>
            <div class="mini-head">我的学习方式</div>
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div v-for="m in learningWays" :key="m.title" class="tile">
                <div class="tile__icon">{{ m.icon }}</div>
                <div>
                  <div class="tile__title">{{ m.title }}</div>
                  <div class="tile__desc">{{ m.desc }}</div>
                </div>
              </div>
            </div>

            <div class="pullquote" style="margin-top: 20px">
              <p>先把东西做出来，再谈优雅。做不出来，优雅没有意义。</p>
              <cite>—— 目前最认同的一句话</cite>
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
            <div class="cta-band__title">愿意给我一个机会吗？</div>
            <p class="cta-band__desc">
              实习、校招、或者一个小项目的活儿都可以聊。我学得快，也愿意从基础做起。
            </p>
          </div>
          <div class="cta-band__actions">
            <el-button type="primary" size="large" round @click="$router.push('/contact')">
              联系我
            </el-button>
            <el-button size="large" round @click="$router.push('/education')">
              看教育背景
            </el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
