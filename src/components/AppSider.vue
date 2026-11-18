<template>
  <aside class="sider" :class="{ collapsed }">
    <div class="logo">
      <a href="#/" class="logo-link">
        <img src="/logo.png" alt="ework" />
        <span class="logo-text">Work</span>
      </a>
    </div>

    <nav class="menu">
      <p class="group-title">个人</p>
      <a class="menu-item" :class="{ active: activeSection === '我的收藏' }" @click="jump('我的收藏')">
        <n-icon size="16" :component="HeartOutline" />
        <span class="menu-label">我的收藏</span>
      </a>
      <a class="menu-item" :class="{ active: activeSection === '常用网址' }" @click="jump('常用网址')">
        <n-icon size="16" :component="TimeOutline" />
        <span class="menu-label">常用网址</span>
      </a>

      <p class="group-title" v-if="categories.length">团队分类</p>
      <a
        v-for="(item, index) in categories"
        :key="item.name"
        class="menu-item"
        :class="{ active: activeSection === item.title }"
        @click="jump(item.title)"
      >
        <span class="badge" :style="{ background: colorForIndex(index) }">{{ item.title[0] }}</span>
        <span class="menu-label">{{ item.title }}</span>
        <span class="count">{{ item.nav.length }}</span>
      </a>
    </nav>

    <div class="sider-footer">
      <a class="theme-entry" @click="toggle">
        <n-icon size="16" :component="mode === 'dark' ? SunnyOutline : MoonOutline" />
        <span class="menu-label">{{ mode === 'dark' ? '亮色模式' : '暗色模式' }}</span>
      </a>
      <a class="settings-entry" @click="showSettings = true">
        <n-icon size="16" :component="SettingsOutline" />
        <span class="menu-label">配置中心</span>
        <span class="mode-tag">{{ settings.dataMode }}</span>
      </a>
      <SettingsDrawer v-model:show="showSettings" />
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import {
  HeartOutline, TimeOutline, SettingsOutline,
  MoonOutline, SunnyOutline
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import SettingsDrawer from './SettingsDrawer.vue'
import { colorForIndex } from '@/common/palette'
import { useNavData } from '@/composables/useNavData'
import { useTheme } from '@/composables/useTheme'
import { useRbSettings } from '@/composables/useRbSettings'
import { useUiState } from '@/composables/useUiState'

const { categories, activeSection } = useNavData()
const { settings } = useRbSettings()
const { mode, toggle } = useTheme()
const { siderCollapsed: collapsed } = useUiState()
const showSettings = ref(false)

function jump (title) {
  if (window.innerWidth <= 768) collapsed.value = true
  const target = document.getElementById(title)
  if (target && target.offsetParent !== null) {
    activeSection.value = title
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.sider {
  width: 232px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: var(--sidebar);
  transition: width 0.2s ease, background 0.25s ease;
}
.sider.collapsed { width: 64px; }
.logo { padding: 18px 20px 14px; }
.logo-link { display: flex; align-items: center; gap: 10px; }
.logo img { height: 30px; width: auto; }
.logo-text { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: 0.02em; }
.menu { flex: 1; overflow-y: auto; padding: 0 10px 12px; }
.group-title {
  font-size: 11px; color: rgba(255,255,255,0.38);
  padding: 14px 10px 6px; letter-spacing: 0.06em;
}
.menu-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px; margin: 2px 0;
  border-radius: 8px; cursor: pointer;
  color: rgba(255,255,255,0.72); font-size: 13px;
  transition: background 0.15s ease, color 0.15s ease;
  white-space: nowrap; overflow: hidden;
}
.menu-item:hover { background: var(--sidebar-hover); color: #fff; }
.menu-item.active {
  background: var(--sidebar-active);
  color: var(--sidebar-active-text);
}
.menu-item.active .count { color: var(--sidebar-active-text); }
.menu-label {
  flex: 1; min-width: 0; overflow: hidden;
  text-overflow: ellipsis; text-align: left;
}
.count {
  font-size: 11px; color: rgba(255,255,255,0.45);
  font-family: ui-monospace, monospace;
}
.badge {
  width: 20px; height: 20px; border-radius: 6px;
  color: #fff; font-size: 12px; font-weight: 600;
  display: inline-flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.sider-footer { border-top: 1px solid var(--sidebar-border); padding: 8px 10px 10px; }
.theme-entry, .settings-entry {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; border-radius: 8px; cursor: pointer;
  color: rgba(255,255,255,0.6); font-size: 12px;
  transition: background 0.15s ease, color 0.15s ease;
  white-space: nowrap; overflow: hidden;
}
.theme-entry:hover, .settings-entry:hover { background: var(--sidebar-hover); color: var(--sidebar-active-text); }
.mode-tag {
  font-size: 10px; padding: 1px 7px; border-radius: 999px;
  background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.55);
  font-family: ui-monospace, monospace;
}
/* 折叠态：隐藏文字，徽标/图标居中 */
.sider.collapsed .menu-label,
.sider.collapsed .count,
.sider.collapsed .group-title,
.sider.collapsed .logo-text,
.sider.collapsed .mode-tag { display: none; }
.sider.collapsed .menu-item,
.sider.collapsed .theme-entry,
.sider.collapsed .settings-entry { justify-content: center; padding: 9px 0; }
.sider.collapsed .logo { padding: 18px 0 14px; text-align: center; }
@media (max-width: 768px) {
  .sider {
    position: fixed; z-index: 50; left: 0; top: 0; bottom: 0;
    box-shadow: var(--shadow-float);
  }
  .sider.collapsed { width: 0; padding: 0; overflow: hidden; }
}
</style>
