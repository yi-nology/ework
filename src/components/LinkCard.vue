<template>
  <n-popover trigger="hover" placement="bottom" :show-arrow="false">
    <template #trigger>
      <a class="link-card" :href="item.link" target="_blank" rel="noopener" @click="onOpen">
        <span class="avatar" :style="avatarStyle">
          <img v-if="item.icon && !iconErr" :src="item.icon" alt="" @error="iconErr = true" />
          <span v-else class="letter">{{ initial }}</span>
        </span>
        <span class="meta">
          <span class="name" v-html="highlightText(item.name)"></span>
          <span class="desc" v-if="item.desc" v-html="highlightText(item.desc)"></span>
        </span>
        <n-icon class="open-icon" :component="OpenOutline" />
      </a>
    </template>
    <div class="popover-body">
      <p class="url" :title="item.link">{{ item.link }}</p>
      <div class="actions">
        <n-button size="tiny" quaternary @click="copy">复制</n-button>
        <n-button size="tiny" quaternary @click="fav">收藏</n-button>
        <n-button size="tiny" quaternary type="error" @click="del" v-if="deletable">删除</n-button>
      </div>
      <p class="hint">Ctrl/⌘+K 快速搜索</p>
    </div>
  </n-popover>
</template>

<script setup>
import { computed, ref } from 'vue'
import { NButton, NIcon, NPopover, useMessage } from 'naive-ui'
import { OpenOutline } from '@vicons/ionicons5'
import { useFavorites } from '@/composables/useFavorites'
import { useNavData } from '@/composables/useNavData'
import { badgeForIndex } from '@/common/palette'
import { highlightText } from '@/common/highlight'

const props = defineProps({
  item: { type: Object, required: true },
  catIndex: { type: Number, default: 0 },
  deletable: { type: Boolean, default: false }
})

const iconErr = ref(false)
const { addFavorite, addUsed, removeItem } = useFavorites()
const { keyword } = useNavData()
const { message } = useMessage()

const initial = computed(() => (props.item.name || '?').trim()[0] || '?')
const avatarStyle = computed(() => ({ background: badgeForIndex(props.catIndex).bg }))

function onOpen () {
  addUsed(props.item)
}

async function copy () {
  try {
    await navigator.clipboard.writeText(props.item.link)
    message.success('复制成功')
  } catch (e) {
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
.name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
.popover-body .hint {
  font-size: 11px;
  color: var(--text-3);
  margin-top: 6px;
}
</style>
