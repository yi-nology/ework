<template>
  <n-popover trigger="hover" placement="bottom" :show-arrow="false">
    <template #trigger>
      <a class="link-card" :href="item.link" target="_blank" rel="noopener" @click="onOpen">
        <span class="avatar" :style="avatarStyle">
          <img v-if="currentIcon" :src="currentIcon" alt="" referrerpolicy="no-referrer" @error="onIconError" />
          <span v-else class="letter">{{ initial }}</span>
        </span>
        <span class="meta">
          <span class="name-row">
            <span class="name" v-html="highlightText(item.name)"></span>
            <n-icon v-if="item.isPerm" class="perm-lock" :component="LockClosedOutline" />
          </span>
          <span v-if="item.desc" class="desc" v-html="highlightText(item.desc)"></span>
        </span>
        <n-icon class="open-icon" :component="OpenOutline" />
      </a>
    </template>
    <div class="popover-body">
      <p class="url" :title="item.link">{{ item.link }}</p>
      <p v-if="item.type || item.isPerm" class="tags">
        <span class="type-chip">{{ item.type || 'link' }}</span>
        <span v-if="item.isPerm" class="type-chip perm">私有</span>
      </p>
      <div class="actions">
        <n-button size="tiny" quaternary @click="copy">复制</n-button>
        <n-button size="tiny" quaternary @click="fav">收藏</n-button>
        <n-button v-if="deletable" size="tiny" quaternary type="error" @click="del">删除</n-button>
      </div>
      <p class="hint">Ctrl/⌘+K 快速搜索</p>
    </div>
  </n-popover>
</template>

<script setup>
import { computed, ref } from 'vue'
import { NButton, NIcon, NPopover, useMessage } from 'naive-ui'
import { OpenOutline, LockClosedOutline } from '@vicons/ionicons5'
import { useFavorites } from '@/composables/useFavorites'
import { badgeForIndex } from '@/common/palette'
import { highlightText } from '@/common/highlight'

const props = defineProps({
  item: { type: Object, required: true },
  catIndex: { type: Number, default: 0 },
  deletable: { type: Boolean, default: false }
})

const { addFavorite, addUsed, removeItem } = useFavorites()
const { message } = useMessage()

// 图标三级回退: 配置图标 -> 域名推导 favicon(仅公网域名) -> 首字头像
const iconStage = ref(0)

const derivedIcon = computed(() => {
  try {
    const u = new URL(props.item.link)
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return ''
    const h = u.hostname
    const isIp = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(h) || h === 'localhost' || h.includes(':')
    if (isIp) return ''
    return 'https://icons.duckduckgo.com/ip3/' + h + '.ico'
  } catch {
    return ''
  }
})

const iconSrcList = computed(() => [props.item.icon, derivedIcon.value].filter(Boolean))

const currentIcon = computed(() => iconSrcList.value[iconStage.value] || '')

function onIconError () {
  if (iconStage.value < iconSrcList.value.length - 1) iconStage.value += 1
}

const initial = computed(() => (props.item.name || '?').trim()[0] || '?')
const avatarStyle = computed(() => ({ background: badgeForIndex(props.catIndex).bg }))

function onOpen () {
  addUsed(props.item)
}

async function copy () {
  try {
    await navigator.clipboard.writeText(props.item.link)
    message.success('复制成功')
  } catch {
    message.error('复制失败')
  }
}

function fav () {
  addFavorite(props.item)
  message.success('收藏成功')
}

function del () {
  removeItem(props.item)
  message.success('已删除')
}
</script>

<style scoped>
.link-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.18s ease;
}
.link-card:hover {
  border-color: var(--accent);
  box-shadow: 0 6px 16px rgba(201, 123, 93, 0.18);
  transform: translateY(-1px);
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}
.avatar img {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: contain;
}
.letter {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-deep);
}
.meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.name-row {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
}
.name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.perm-lock {
  color: var(--text-3);
  flex-shrink: 0;
}
.desc {
  font-size: 11px;
  color: var(--text-3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.35;
}
.open-icon {
  color: var(--text-3);
  opacity: 0;
  transition: opacity 0.18s ease;
  flex-shrink: 0;
}
.link-card:hover .open-icon {
  opacity: 1;
}
.popover-body .url {
  font-size: 11px;
  color: var(--text-3);
  font-family: ui-monospace, monospace;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.popover-body .actions {
  display: flex;
  gap: 4px;
  margin-top: 6px;
}
.popover-body .tags {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}
.type-chip {
  font-size: 10px;
  color: var(--text-3);
  background: var(--bg-soft);
  padding: 1px 8px;
  border-radius: 999px;
}
.type-chip.perm {
  color: var(--accent-deep);
  background: var(--accent-weak);
}
.popover-body .hint {
  font-size: 11px;
  color: var(--text-3);
  margin-top: 6px;
}
</style>
