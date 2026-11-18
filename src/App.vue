<template>
  <n-config-provider :theme="theme" :theme-overrides="overrides" class="app-provider">
    <n-message-provider placement="top">
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { darkTheme, NConfigProvider, NMessageProvider } from 'naive-ui'
import { useTheme } from '@/composables/useTheme'
import { buildThemeOverrides } from '@/theme'

const { mode } = useTheme()
const theme = computed(() => (mode.value === 'dark' ? darkTheme : null))
const overrides = buildThemeOverrides()
</script>
