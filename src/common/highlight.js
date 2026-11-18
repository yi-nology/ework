import { keyword } from '@/composables/useNavData'

// 搜索命中高亮：转义 HTML 后把首个关键词包上 <mark>
function escapeHtml (str) {
  return String(str || '').replace(/[&<>"']/g, m => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]
  ))
}

export function highlightText (text) {
  const kw = keyword.value.trim()
  const safe = escapeHtml(text)
  if (!kw) return safe
  const idx = safe.toLowerCase().indexOf(kw.toLowerCase())
  if (idx === -1) return safe
  return safe.slice(0, idx) +
    '<mark>' + safe.slice(idx, idx + kw.length) + '</mark>' +
    safe.slice(idx + kw.length)
}
