<script setup>
import { hobbies } from '@/data/profile'
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
            业余时间基本被四件事占着：拼高达、打 PTCG、开一局 Apex，或者在 Warframe 里折腾配装。
            一个动手，一个动脑，两个动队友——共同点是都能让人从屏幕前的工作里抽离出来。
          </p>
          <div class="page-head__meta">
            <span class="chip chip--brand">拼高达 · PTCG</span>
            <span class="chip">Apex 英雄 · Warframe</span>
            <span class="chip">手作 · 卡牌 · 射击</span>
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
        <div class="hobby-grid hobby-grid--two">
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

    <!-- 为什么是这几件事 -->
    <section class="section section--soft">
      <div class="container">
        <div class="about-grid">
          <div>
            <span class="eyebrow">Why these</span>
            <h2 class="sec-head__title" style="margin-top: 14px">四件事，其实是一种练习</h2>
            <p class="sec-head__desc">
              看起来是四种完全不同的消遣，但喜欢它们的理由差不多：有明确的目标、能自己掌控节奏，
              而且做完能立刻看到结果。
            </p>

            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 24px">
              <div class="tile reveal">
                <div class="tile__icon">🧩</div>
                <div>
                  <div class="tile__title">耐心</div>
                  <div class="tile__desc">
                    拼模型最练这个：一个水口没打磨干净，整台机体都看得出来；一个零件装反，只能拆开重来。
                  </div>
                </div>
              </div>
              <div class="tile reveal">
                <div class="tile__icon">🧠</div>
                <div>
                  <div class="tile__title">复盘</div>
                  <div class="tile__desc">
                    一局打完，想清楚哪一步吃亏了、哪次转移太急，比闷头多打十局有用得多。
                  </div>
                </div>
              </div>
              <div class="tile reveal">
                <div class="tile__icon">👥</div>
                <div>
                  <div class="tile__title">一起玩</div>
                  <div class="tile__desc">
                    三排、线下打牌、互相看对方的新模型——这些乐趣都是靠人凑起来的，一个人玩不出那个味道。
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside class="aside-sticky">
            <div class="mini-head">这些小习惯</div>
            <ul class="dot-list">
              <li>拼之前先把板件按字母排好，找件能省一半时间。</li>
              <li>组卡先定一套赢法，再往里塞牌，不然越组越乱。</li>
              <li>游戏里想练的东西，先定一个小目标再开局。</li>
            </ul>

            <el-divider style="margin: 26px 0" />

            <p class="form-note">
              如果你也在拼模型、打牌，或者想找人凑一局，欢迎在留言里说一声——换卡、聊配装都行。
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
