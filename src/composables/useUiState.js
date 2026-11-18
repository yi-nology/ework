import { ref } from 'vue'

const siderCollapsed = ref(typeof window !== 'undefined' && window.innerWidth <= 768)

export function useUiState () {
  const toggleSider = () => {
    siderCollapsed.value = !siderCollapsed.value
  }
  return { siderCollapsed, toggleSider }
}
