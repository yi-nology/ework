import { ref, watchEffect } from 'vue'
import { loadTheme, saveTheme } from '@/common/cache'

const mode = ref(loadTheme()) // 单例状态，跨组件共享

watchEffect(() => {
  document.documentElement.dataset.theme = mode.value
})

export function useTheme () {
  const toggle = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark'
    saveTheme(mode.value)
  }
  return { mode, toggle }
}
