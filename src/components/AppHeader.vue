<template>
  <header class="header">
    <div class="left">
      <n-button quaternary circle size="small" class="mobile-menu-btn" @click="toggleSider">
        <template #icon><n-icon :component="MenuOutline" /></template>
      </n-button>
      <span class="greeting">{{ greeting }}，今天也要加油呀</span>
      <span class="stats-chip" v-if="totalCount">{{ categories.length }} 个分类 · {{ totalCount }} 个站点</span>
      <span class="mode-chip" v-if="isRemote">{{ settings.environment }}</span>
    </div>

    <div class="right">
      <transition name="fade">
        <span class="result-chip" v-if="keyword">找到 {{ hitCount }} 个</span>
      </transition>
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
import { NButton, NIcon, NInput } from 'naive-ui'
import { SearchOutline, MenuOutline } from '@vicons/ionicons5'
import { useNavData } from '@/composables/useNavData'
import { useRbSettings } from '@/composables/useRbSettings'
import { useUiState } from '@/composables/useUiState'

const { categories, totalCount, hitCount, keyword, setKeyword } = useNavData()
const { settings } = useRbSettings()
const { toggleSider } = useUiState()

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
