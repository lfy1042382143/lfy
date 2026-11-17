/**
 * 滚动入场动画：给带 .reveal 的元素添加 .is-visible
 */
import { onMounted, onBeforeUnmount, nextTick } from 'vue'

export function useReveal(rootSelector = '.reveal') {
  let observer = null

  onMounted(async () => {
    await nextTick()
    const els = Array.from(document.querySelectorAll(rootSelector)).filter(
      (el) => !el.classList.contains('is-visible')
    )
    if (!els.length) return

    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.06 }
    )

    els.forEach((el, index) => {
      // 同屏多个元素做一点错峰，观感更自然
      el.style.transitionDelay = `${Math.min(index % 6, 5) * 60}ms`
      observer.observe(el)
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}
