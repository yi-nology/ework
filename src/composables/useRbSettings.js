import { reactive } from 'vue'
import { loadRbSettings, saveRbSettings, removeRbSettings, RB_DEFAULTS } from '@/common/cache'

const settings = reactive(loadRbSettings()) // 单例

export function useRbSettings () {
  const save = () => {
    saveRbSettings(JSON.parse(JSON.stringify(settings)))
  }

  const reset = () => {
    removeRbSettings()
    Object.assign(settings, RB_DEFAULTS)
  }

  return { settings, save, reset, defaults: RB_DEFAULTS }
}
