import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/experience',
    name: 'experience',
    component: () => import('@/views/ExperienceView.vue'),
    meta: { title: '个人经历' },
  },
  {
    path: '/education',
    name: 'education',
    component: () => import('@/views/EducationView.vue'),
    meta: { title: '教育背景' },
  },
  {
    path: '/work',
    name: 'work',
    component: () => import('@/views/WorkView.vue'),
    meta: { title: '工作经历' },
  },
  {
    path: '/hobbies',
    name: 'hobbies',
    component: () => import('@/views/HobbiesView.vue'),
    meta: { title: '兴趣爱好' },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: '联系我' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 90, behavior: 'smooth' }
    return { top: 0 }
  },
})

const SITE_NAME = '张三 · 个人博客'

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | ${SITE_NAME}` : SITE_NAME
})

export default router
