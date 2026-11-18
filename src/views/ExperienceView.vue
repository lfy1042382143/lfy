<script setup>
import { ref, computed } from 'vue'
import { journey, profile } from '@/data/profile'
import { useReveal } from '@/utils/reveal'

useReveal()

const filter = ref('all')
const stages = [
  { label: '全部', value: 'all' },
  { label: '成长', value: 'growth' },
  { label: '求学', value: 'study' },
  { label: '大学', value: 'uni' },
]

const filtered = computed(() =>
  filter.value === 'all' ? journey : journey.filter((i) => i.type === filter.value)
)

const summary = [
  { value: String(journey.length), label: '关键节点' },
  { value: '22', label: '时间跨度（年）' },
  { value: '3', label: '长住城市' },
  { value: '2', label: '学位证书' },
]
</script>

<template>
  <div>
    <!-- 页头 -->
    <section class="page-head">
      <div class="container page-head__grid">
        <div>
          <span class="eyebrow">Journey · 个人经历</span>
          <h1 class="page-head__title">
            从赤峰出发，<em>一路向南</em>
          </h1>
          <p class="page-head__desc">
            2003 年在内蒙古赤峰出生，之后在大连读完小学、初中和高中，2021 年到广西柳州读大学。
            这里按时间倒序记录几个关键节点——地理上一直在往南走，专业上也从「想学计算机」走到「软件工程」。
          </p>
          <div class="page-head__meta">
            <span class="chip chip--brand">2003 赤峰出生</span>
            <span class="chip">大连 12 年</span>
            <span class="chip">柳州 4 年大学</span>
          </div>
        </div>
        <div class="page-head__aside">
          <div class="pullquote">
            <p>{{ profile.slogan }}</p>
            <cite>—— 写在首页第一行的话</cite>
          </div>
        </div>
      </div>
    </section>

    <!-- 主体 -->
    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div class="about-grid">
          <div>
            <div class="mini-head">时间线</div>

            <div class="timeline-wrap">
              <div v-for="item in filtered" :key="item.title + item.year" class="journey-item reveal">
                <div class="journey-item__side">
                  <div class="journey-item__year">{{ item.year }}</div>
                  <span class="journey-item__stage">{{ item.stage }}</span>
                </div>
                <div class="journey-item__body">
                  <span class="journey-item__dot"></span>
                  <h3 class="journey-item__title">
                    {{ item.title }}
                    <span v-if="item.pending" class="pending-tag">待补充</span>
                  </h3>
                  <div class="journey-item__sub">{{ item.subtitle }}</div>
                  <p class="journey-item__desc">{{ item.description }}</p>
                  <div class="journey-item__tags">
                    <span v-for="h in item.highlights" :key="h" class="chip chip--ghost">· {{ h }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside class="aside-sticky">
            <div class="mini-head">概览</div>
            <div class="mini-stat-grid">
              <div v-for="s in summary" :key="s.label" class="stat-item">
                <div class="stat-item__value">{{ s.value }}</div>
                <div class="stat-item__label">{{ s.label }}</div>
              </div>
            </div>

            <div class="mini-head" style="margin-top: 32px">按阶段筛选</div>
            <el-radio-group v-model="filter" size="small" style="display: flex; flex-wrap: wrap; gap: 8px">
              <el-radio-button v-for="s in stages" :key="s.value" :value="s.value">
                {{ s.label }}
              </el-radio-button>
            </el-radio-group>

            <el-divider style="margin: 28px 0" />

            <div class="mini-head">想去哪一页</div>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <el-button round plain @click="$router.push('/education')">
                <el-icon style="margin-right: 6px"><School /></el-icon>学校与专业详情
              </el-button>
              <el-button round plain @click="$router.push('/practice')">
                <el-icon style="margin-right: 6px"><Suitcase /></el-icon>技能与证书
              </el-button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
