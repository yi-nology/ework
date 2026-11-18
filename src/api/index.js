import { getLocalData, fetchAllNavData, fetchNacosConfig, fetchApolloConfig } from './config'
import { loadRbSettings } from '@/common/cache'

const asResult = (categories, meta = null) => ({ categories: categories || [], meta })

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
      ).then(data => asResult(data))
    }
    if (settings.configType === 'apollo') {
      return fetchApolloConfig(settings.apolloMeta, settings.apolloAppId, settings.apolloNamespace)
        .then(data => asResult(data))
    }
  }
  return getLocalData(settings.localDataUrl).then(data => asResult(data))
}
