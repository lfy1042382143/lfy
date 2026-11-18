<script setup>
import { projects } from '@/data/profile'
import { useReveal } from '@/utils/reveal'

useReveal()

const accentClass = (accent) => `project-card--${accent}`
</script>

<template>
  <div>
    <!-- 页头 -->
    <section class="page-head">
      <div class="container page-head__grid">
        <div>
          <span class="eyebrow">Projects · 我的其他项目</span>
          <h1 class="page-head__title">
            这里还有几个<em>站点</em>
          </h1>
          <p class="page-head__desc">
            除了这个博客，我还搭了几个小项目，都挂在同一个域名下面。点一下卡片就能跳过去——
            想看书的、想玩游戏的、想听歌的，各归各的地方。
          </p>
          <div class="page-head__meta">
            <span class="chip chip--brand">藏书阁</span>
            <span class="chip">深渊试炼</span>
            <span class="chip">声场</span>
          </div>
        </div>
        <div class="page-head__aside">
          <div class="pullquote">
            <p>每个项目都是一个小世界。</p>
            <cite>—— 搭着搭着就停不下来</cite>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目卡片 -->
    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div class="project-grid">
          <a
            v-for="p in projects"
            :key="p.id"
            class="project-card reveal"
            :class="accentClass(p.accent)"
            :href="p.url"
            target="_blank"
            rel="noopener"
          >
            <div class="project-card__top">
              <span class="project-card__icon">{{ p.icon }}</span>
              <span class="project-card__en">{{ p.en }}</span>
            </div>
            <h3 class="project-card__name">{{ p.name }}</h3>
            <p class="project-card__desc">{{ p.desc }}</p>
            <div class="project-card__foot">
              <span class="project-card__url">{{ p.url.replace('https://', '') }}</span>
              <span class="project-card__arrow">↗</span>
            </div>
            <div class="project-card__tags">
              <span v-for="t in p.tags" :key="t" class="chip chip--ghost">{{ t }}</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- 说明 -->
    <section class="section section--soft">
      <div class="container">
        <div class="about-grid">
          <div>
            <span class="eyebrow">About these</span>
            <h2 class="sec-head__title" style="margin-top: 14px">同一个域名下的几个角落</h2>
            <p class="sec-head__desc">
              这些项目都是我自己搭着玩的，各有各的用途，也都还在陆续更新。它们和这个博客一样，
              托管在 Cloudflare 上，用的是同一个根域名 <code>cat21432961.online</code>。
            </p>
            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 24px">
              <div class="tile reveal">
                <div class="tile__icon">📚</div>
                <div>
                  <div class="tile__title">藏书阁</div>
                  <div class="tile__desc">
                    读书是一件需要慢慢来的事，把书名、进度和摘抄记下来，回头看会很有成就感。
                  </div>
                </div>
              </div>
              <div class="tile reveal">
                <div class="tile__icon">🎮</div>
                <div>
                  <div class="tile__title">深渊试炼</div>
                  <div class="tile__desc">
                    写代码之外，也想试试「做一个能玩的东西」是什么感觉，于是有了这个游戏。
                  </div>
                </div>
              </div>
              <div class="tile reveal">
                <div class="tile__icon">🎵</div>
                <div>
                  <div class="tile__title">声场</div>
                  <div class="tile__desc">
                    听歌是日常的一部分，把常听的歌整理成一个站，随时随地都能打开。
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside class="aside-sticky">
            <div class="mini-head">小提示</div>
            <ul class="dot-list">
              <li>点击卡片会在新标签页打开对应站点，不会离开当前页面。</li>
              <li>三个项目用的是同一个根域名，只是子域不同。</li>
              <li>如果你对某个项目感兴趣，欢迎去逛逛，也欢迎提建议。</li>
            </ul>

            <el-divider style="margin: 26px 0" />

            <p class="form-note">
              有想一起做的项目，或者对某个站有想法，都可以在「联系我」里说一声。
            </p>
            <el-button
              type="primary"
              round
              plain
              style="margin-top: 14px; width: 100%"
              @click="$router.push('/contact')"
            >
              联系我
            </el-button>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
