import { getLocalData, fetchAllNavData, fetchNacosConfig, fetchApolloConfig } from './config'
import { loadRbSettings } from '@/common/cache'

export function GetNavData () {
  const settings = loadRbSettings()
  if (settings.dataMode === 'remote') {
    if (settings.configType === 'rainbow-bridge') {
      return fetchAllNavData(settings.baseUrl, settings.environment)
    }
    if (settings.configType === 'nacos') {
      return fetchNacosConfig(
        settings.nacosServerAddr,
        settings.nacosNamespace,
        settings.nacosDataId,
        settings.nacosGroup
      )
    }
    if (settings.configType === 'apollo') {
      return fetchApolloConfig(settings.apolloMeta, settings.apolloAppId, settings.apolloNamespace)
    }
  }
  return getLocalData(settings.localDataUrl)
}
