import { ref, computed } from 'vue'
import { GetNavData } from '@/api'
import { settings as rbSettings } from '@/composables/useRbSettings'

// ---- 模块级单例状态 ----
export const categories = ref([])
export const releaseMeta = ref(null)
export const keyword = ref('')
export const loading = ref(false)
export const error = ref(false)
export const activeSection = ref('')

const AUTO_REFRESH_MS = 5 * 60 * 1000
let refreshTimer = null

function normalize (list) {
  return (Array.isArray(list) ? list : Object.values(list || {}))
    .map(c => ({
      title: c.title || c.name || '',
      name: c.name || c.title || '',
      nav: (c.nav || []).filter(it => it.link || it.icon)
    }))
    .filter(c => c.nav.length > 0)
}

export async function load (silent = false) {
  loading.value = true
  if (!silent) error.value = false
  try {
    const result = await GetNavData()
    categories.value = normalize(result.categories)
    releaseMeta.value = result.meta || null
    if (silent) error.value = false
  } catch (e) {
    // 静默刷新失败时保留旧数据，不打断使用
    if (!silent) error.value = true
  } finally {
    loading.value = false
  }
}

// 手动刷新(带加载态) / 静默定时刷新(页面可见时)
function setupAutoRefresh () {
  if (refreshTimer) return
  refreshTimer = setInterval(() => {
    if (!document.hidden && rbSettings.dataMode === 'remote' && rbSettings.autoRefresh) {
      load(true)
    }
  }, AUTO_REFRESH_MS)
}
setupAutoRefresh()

export function setKeyword (kw) {
  keyword.value = kw
}

// 关键词过滤(名称/链接/描述) + 私有项过滤 + 空分类剔除
export const filtered = computed(() => {
  let list = categories.value
  if (rbSettings.hidePrivate) {
    list = list
      .map(c => ({ ...c, nav: c.nav.filter(it => !it.isPerm) }))
      .filter(c => c.nav.length > 0)
  }
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return list
  return list
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

export function useNavData () {
  return {
    categories, releaseMeta, keyword, loading, error, activeSection,
    filtered, hitCount, totalCount,
    load, setKeyword, updateActiveSection
  }
}
