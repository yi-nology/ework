<template>
  <header class="header">
    <div class="left">
      <n-button quaternary circle size="small" class="mobile-menu-btn" @click="toggleSider">
        <template #icon><n-icon :component="MenuOutline" /></template>
      </n-button>
      <span class="greeting">{{ greeting }}，今天也要加油呀</span>
      <span v-if="totalCount" class="stats-chip">{{ categories.length }} 个分类 · {{ totalCount }} 个站点</span>
      <span v-if="isRemote" class="mode-chip">{{ settings.environment }}</span>
    </div>

    <div class="right">
      <transition name="fade">
        <span v-if="keyword" class="result-chip">找到 {{ hitCount }} 个</span>
      </transition>
      <n-tooltip v-if="releaseMeta && releaseMeta.activatedAt" trigger="hover">
        <template #trigger>
          <span class="meta-chip">
            快照 {{ versionLabel }} · {{ relTime(releaseMeta.activatedAt) }}
          </span>
        </template>
        数据快照元数据（来自 Rainbow Bridge release）
        <br />激活时间: {{ releaseMeta.activatedAt }}
        <br />渠道数: {{ releaseMeta.pipelines }} · 快照数: {{ releaseMeta.snapshots }}
        <br />环境: {{ releaseMeta.environmentName || settings.environment }}
      </n-tooltip>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button quaternary circle size="small" :loading="loading" @click="onRefresh">
            <template #icon><n-icon :component="RefreshOutline" /></template>
          </n-button>
        </template>
        重新拉取数据（每 5 分钟自动静默刷新）
      </n-tooltip>
      <n-input
        ref="inputRef"
        v-model:value="keyword"
        class="search"
        round
        clearable
        placeholder="搜索名称 / 链接 / 描述…"
        @update:value="setKeyword"
      >
        <template #prefix><n-icon :component="SearchOutline" class="search-icon" /></template>
      </n-input>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { NButton, NIcon, NInput, NTooltip, useMessage } from 'naive-ui'
import { SearchOutline, MenuOutline, RefreshOutline } from '@vicons/ionicons5'
import { useNavData } from '@/composables/useNavData'
import { useRbSettings } from '@/composables/useRbSettings'
import { useUiState } from '@/composables/useUiState'

const { categories, totalCount, hitCount, keyword, setKeyword, releaseMeta, load, loading } = useNavData()
const { settings } = useRbSettings()
const { toggleSider } = useUiState()
const { message } = useMessage()

const inputRef = ref(null)
const isRemote = computed(() => settings.dataMode === 'remote')

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 6) return '夜深了'
  if (h < 12) return '早上好'
  if (h < 14) return '中午好'
  if (h < 18) return '下午好'
  return '晚上好'
})

// 版本号过多时折叠展示
const versionLabel = computed(() => {
  const v = releaseMeta.value?.versions || []
  if (!v.length) return '-'
  if (v.length === 1) return v[0]
  if (v.length <= 3) return v.join('/')
  return v.slice(0, 3).join('/') + ' +' + (v.length - 3)
})

const relTime = (iso) => {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return '刚刚'
  if (m < 60) return m + ' 分钟前'
  const h = Math.floor(m / 60)
  if (h < 24) return h + ' 小时前'
  return Math.floor(h / 24) + ' 天前'
}

function onRefresh () {
  load().then(() => message.success('数据已刷新'))
}

// Ctrl/Command+K 聚焦搜索
function onKeydown (e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    inputRef.value?.focus()
  }
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 32px;
  height: 64px;
  flex-shrink: 0;
  background: var(--card-soft);
  border-bottom: 1px solid var(--border);
}
.left { display: flex; align-items: center; gap: 10px; min-width: 0; }
.greeting { font-size: 15px; font-weight: 600; white-space: nowrap; }
.stats-chip, .mode-chip {
  font-size: 12px; color: var(--text-3);
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  padding: 3px 10px; border-radius: 999px;
  white-space: nowrap;
}
.mode-chip { color: var(--accent-deep); border-color: var(--accent-weak); background: var(--accent-weak); }
.right { margin-left: auto; display: flex; gap: 12px; align-items: center; }
.meta-chip {
  font-size: 12px;
  color: var(--text-3);
  background: var(--chip-bg);
  border: 1px solid var(--chip-border);
  padding: 3px 10px;
  border-radius: 999px;
  white-space: nowrap;
  cursor: default;
}
.result-chip {
  font-size: 12px; padding: 3px 10px; border-radius: 999px;
  color: var(--accent-deep); background: var(--accent-weak);
  white-space: nowrap;
}
.search { width: 300px; background: var(--chip-bg); }
.search-icon { color: var(--text-3); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
@media (max-width: 768px) {
  .header { padding: 0 16px; }
  .greeting, .stats-chip { display: none; }
  .search { width: auto; flex: 1; }
  .mobile-menu-btn { display: inline-flex; }
}
@media (min-width: 769px) {
  .mobile-menu-btn { display: none; }
}
</style>
