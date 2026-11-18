<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import MapPanel from '@/components/MapPanel.vue'
import { profile, contact } from '@/data/profile'
import { useReveal } from '@/utils/reveal'

useReveal()

const formRef = ref(null)
const submitting = ref(false)

const form = reactive({
  name: '',
  email: '',
  topic: '实习 / 工作机会',
  message: '',
})

const topics = ['实习 / 工作机会', '技术交流', '项目合作', '只是想聊聊']

const rules = {
  name: [{ required: true, message: '请填写你的称呼', trigger: 'blur' }],
  email: [
    { required: true, message: '请填写邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] },
  ],
  message: [
    { required: true, message: '说点什么吧', trigger: 'blur' },
    { min: 10, message: '至少写 10 个字，方便我理解你的来意', trigger: 'blur' },
  ],
}

const copyText = async (text, label) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success(`${label}已复制`)
  } catch {
    ElMessage.warning('当前环境不支持自动复制，请手动选择文本')
  }
}

const submit = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  submitting.value = true
  // 前端演示：真实项目可换成接口请求（例如 POST /api/messages）
  window.setTimeout(() => {
    submitting.value = false
    ElMessage({
      type: 'success',
      message: '留言已记录（演示用，未接入后端）。也可以直接发邮件给我。',
      duration: 4000,
    })
    formRef.value.resetFields()
  }, 600)
}

const cityRows = [
  { key: '出生地', icon: '🌾', value: '内蒙古自治区 · 赤峰市' },
  { key: '成长地', icon: '🌊', value: '辽宁省 · 大连市（小学至高中）' },
  { key: '求学地', icon: '⛰️', value: '广西壮族自治区 · 柳州市' },
]
</script>

<template>
  <div>
    <!-- 页头 -->
    <section class="page-head">
      <div class="container page-head__grid">
        <div>
          <span class="eyebrow">Contact · 联系我</span>
          <h1 class="page-head__title">
            地址在这里，<em>门随时开着</em>
          </h1>
          <p class="page-head__desc">
            现在常驻广西柳州的广西科技大学文昌校区。邮件是我最稳定的联系方式，一般当天回复；
            实习、校招或者单纯聊聊天，都欢迎。
          </p>
          <div class="page-head__meta">
            <span class="chip chip--brand">广西 · 柳州</span>
            <span class="chip">邮件优先</span>
            <span class="chip">开放实习与工作机会</span>
          </div>
        </div>
        <div class="page-head__aside">
          <div class="info-list">
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Message /></el-icon>邮箱</span>
              <span class="info-list__val">{{ profile.email }}</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Phone /></el-icon>电话</span>
              <span class="info-list__val">
                {{ profile.phone || '待补充' }}
                <span v-if="!profile.phone" class="pending-tag">待补充</span>
              </span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><ChatDotRound /></el-icon>微信</span>
              <span class="info-list__val">
                {{ profile.wechat || '待补充' }}
                <span v-if="!profile.wechat" class="pending-tag">待补充</span>
              </span>
            </div>
            <div class="info-list__row">
              <span class="info-list__key"><el-icon><Clock /></el-icon>邮件回复</span>
              <span class="info-list__val">一般当天内</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 地址 + 地图 -->
    <section class="section" style="padding-top: 20px">
      <div class="container">
        <div class="contact-grid">
          <div>
            <div class="contact-block">
              <div class="mini-head">所在地址</div>

              <div class="contact-line">
                <div class="contact-line__icon"><el-icon><Location /></el-icon></div>
                <div style="flex: 1">
                  <div class="contact-line__label">Address</div>
                  <div class="contact-line__value">{{ contact.address }}</div>
                </div>
                <el-button link type="primary" @click="copyText(contact.address, '地址')">
                  复制
                </el-button>
              </div>

              <div class="contact-line">
                <div class="contact-line__icon"><el-icon><Message /></el-icon></div>
                <div style="flex: 1">
                  <div class="contact-line__label">Email</div>
                  <div class="contact-line__value">
                    <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
                  </div>
                </div>
                <el-button link type="primary" @click="copyText(profile.email, '邮箱')">
                  复制
                </el-button>
              </div>

              <div class="contact-line">
                <div class="contact-line__icon"><el-icon><Postcard /></el-icon></div>
                <div style="flex: 1">
                  <div class="contact-line__label">Postcode</div>
                  <div class="contact-line__value">{{ contact.postcode }}</div>
                </div>
              </div>

              <div class="contact-line">
                <div class="contact-line__icon"><el-icon><Clock /></el-icon></div>
                <div style="flex: 1">
                  <div class="contact-line__label">Working Hours</div>
                  <div class="contact-line__value">{{ contact.workingHours }}</div>
                </div>
              </div>
            </div>

            <div class="contact-block">
              <div class="mini-head">怎么找到我</div>
              <div v-for="t in contact.traffic" :key="t.text" class="traffic-item">
                <span class="traffic-item__icon">{{ t.icon }}</span>
                <span>{{ t.text }}</span>
              </div>
              <el-divider style="margin: 16px 0" />
              <p class="form-note">{{ contact.tips }}</p>
            </div>

            <div class="contact-block">
              <div class="mini-head">我的三座城市</div>
              <div class="info-list info-list--dense">
                <div v-for="c in cityRows" :key="c.key" class="info-list__row">
                  <span class="info-list__key">{{ c.icon }} {{ c.key }}</span>
                  <span class="info-list__val">{{ c.value }}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <MapPanel
              :center="contact.center"
              :zoom="contact.zoom"
              :title="profile.name + ' · 广西科技大学'"
              :address="contact.address"
            />
            <p class="form-note" style="margin-top: 14px">
              坐标采用 GCJ-02（火星坐标），与国内地图服务一致；地图数据来自腾讯位置服务。
              如需精确导航，可点击地图卡片上的「在腾讯地图中查看」。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 留言表单 -->
    <section class="section section--soft">
      <div class="container">
        <div class="about-grid">
          <div class="contact-block" style="margin-top: 0">
            <div class="mini-head">给我留言</div>
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="top"
              size="large"
              @submit.prevent="submit"
            >
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px">
                <el-form-item label="你的称呼" prop="name">
                  <el-input v-model="form.name" placeholder="怎么称呼你？" clearable />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form.email" placeholder="name@example.com" clearable />
                </el-form-item>
              </div>

              <el-form-item label="来意">
                <el-select v-model="form.topic" style="width: 100%">
                  <el-option v-for="t in topics" :key="t" :label="t" :value="t" />
                </el-select>
              </el-form-item>

              <el-form-item label="留言内容" prop="message">
                <el-input
                  v-model="form.message"
                  type="textarea"
                  :rows="5"
                  maxlength="500"
                  show-word-limit
                  placeholder="想聊什么？实习机会、项目合作、技术问题，或者只是打个招呼都行。"
                />
              </el-form-item>

              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap">
                <el-button type="primary" round :loading="submitting" @click="submit">
                  发送留言
                </el-button>
                <el-button round plain @click="formRef?.resetFields()">清空</el-button>
                <span class="form-note">演示环境不会真正发送，内容也不会被存储。</span>
              </div>
            </el-form>
          </div>

          <aside>
            <div class="mini-head">其他方式</div>
            <div style="display: flex; flex-direction: column; gap: 10px">
              <a
                v-for="s in profile.social"
                :key="s.name"
                class="social-link"
                :href="s.url"
                target="_blank"
                rel="noopener"
                style="justify-content: space-between"
              >
                <span>{{ s.name }}</span>
                <el-icon><TopRight /></el-icon>
              </a>
            </div>

            <el-divider style="margin: 26px 0" />

            <div class="mini-head">备注</div>
            <ul class="dot-list">
              <li>邮件请写清来意和时间预期，回复会更快。</li>
              <li>电话与微信还在补充，暂时请用邮件联系。</li>
              <li>外来访客进校需要登记，提前说一声我帮忙确认。</li>
            </ul>

            <div class="pullquote" style="margin-top: 24px">
              <p>不必拘谨，一封邮件就能开始。</p>
              <cite>—— {{ profile.name }}</cite>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
