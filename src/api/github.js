import axios from "axios";
import { getLocalData, fetchAllNavData, fetchNacosConfig, fetchApolloConfig } from './config'
import { loadRbSettings } from '@/common/js/cache'

let service = axios.create();

service.interceptors.request.use((config) => {
    return config;
});

service.interceptors.response.use((resp) => {
    return resp;
}, (error) => {
    return error;
});

const ENABLE_RB = process.env.VUE_APP_ENABLE_RB !== 'false'

export function GetWebData() {
    const settings = loadRbSettings()
    if (!ENABLE_RB) {
        return getLocalData(settings.localDataUrl).then((data) => {
            return { data: data }
        })
    }
    if (settings.dataMode === 'remote') {
        if (settings.configType === 'rainbow-bridge') {
            return fetchAllNavData(settings.baseUrl, settings.environment, settings.skipSslVerify).then((data) => {
                return { data: data }
            })
        } else if (settings.configType === 'nacos') {
            return fetchNacosConfig(
                settings.nacosServerAddr,
                settings.nacosNamespace,
                settings.nacosDataId,
                settings.nacosGroup,
                settings.skipSslVerify
            ).then((data) => {
                return { data: data }
            })
        } else if (settings.configType === 'apollo') {
            return fetchApolloConfig(
                settings.apolloMeta,
                settings.apolloAppId,
                settings.apolloNamespace,
                settings.skipSslVerify
            ).then((data) => {
                return { data: data }
            })
        }
    }
    return getLocalData(settings.localDataUrl, settings.skipSslVerify).then((data) => {
        return { data: data }
    })
}
