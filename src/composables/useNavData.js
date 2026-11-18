import { ref, computed } from 'vue'
import { GetNavData } from '@/api'

// ---- 模块级单例状态 ----
export const categories = ref([])
export const keyword = ref('')
export const loading = ref(false)
export const error = ref(false)
export const activeSection = ref('')

export async function load () {
  loading.value = true
  error.value = false
  try {
    const data = await GetNavData()
    // 兼容对象/数组两种历史数据形态
    const list = Array.isArray(data) ? data : Object.values(data || {})
    categories.value = list
      .map(c => ({
        title: c.title || c.name || '',
        name: c.name || c.title || '',
        nav: (c.nav || []).filter(it => it.link || it.icon)
      }))
      .filter(c => c.nav.length > 0)
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
}

export function setKeyword (kw) {
  keyword.value = kw
}

// 关键词过滤(名称/链接/描述) + 空分类剔除
export const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return categories.value
  return categories.value
    .map(c => ({
      ...c,
      nav: c.nav.filter(it =>
        ((it.name || '') + '|' + (it.link || '') + '|' + (it.desc || '')).toLowerCase().includes(kw)
      )
    }))
    .filter(c => c.nav.length > 0)
})

export const hitCount = computed(() =>
  filtered.value.reduce((s, c) => s + c.nav.length, 0)
)

export const totalCount = computed(() =>
  categories.value.reduce((s, c) => s + c.nav.length, 0)
)

// scroll-spy: 视口顶部以下 88px 内的最后一个分类卡片即当前区块
export function updateActiveSection (container) {
  if (!container) return
  let current = ''
  container.querySelectorAll('.category-card').forEach(el => {
    if (el.offsetParent === null) return
    const top = el.getBoundingClientRect().top - container.getBoundingClientRect().top
    if (top <= 88) current = el.id
  })
  if (current) activeSection.value = current
}

// 组合式封装(与直接 import 等价，供偏好函数式调用的场景使用)
export function useNavData () {
  return {
    categories, keyword, loading, error, activeSection,
    filtered, hitCount, totalCount,
    load, setKeyword, updateActiveSection
  }
}
