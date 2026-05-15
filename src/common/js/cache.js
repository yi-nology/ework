import Cookies from 'js-cookie'

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

const USED_KEY = '__used__'
const USED_MAX_LEN = 200

function insertArray (arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)
    if (index === 0) {
        arr.forEach(item => {
            if (item.link === val.link && val.num) {
                item.num += 1
            }
        })
        return
    }
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

function deleteFromArray (arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
        arr.splice(index, 1)
    }
}

export function loadFavorite () {
    const value = Cookies.getJSON(FAVORITE_KEY)
    return value || []
}

export function saveFavorite (url) {
    let urls = loadFavorite()
    insertArray(urls, url, (item) => {
        return item.link === url.link
    }, FAVORITE_MAX_LEN)
    Cookies.set(FAVORITE_KEY, urls)
    return urls
}

export function deleteFavorite (url) {
    let urls = loadFavorite()
    deleteFromArray(urls, (item) => {
        return item.link === url.link
    })
    Cookies.set(FAVORITE_KEY, urls)
    return urls
}

export function removeFavorite () {
    Cookies.remove(FAVORITE_KEY)
    return []
}

export function loadUsed () {
    const value = Cookies.getJSON(USED_KEY)
    return value || []
}

export function saveUsed (url) {
    url.num = 1
    let urls = loadUsed()
    insertArray(urls, url, (item) => {
        return url.link === item.link
    }, USED_MAX_LEN)
    Cookies.set(USED_KEY, urls)
    return urls
}

export function deleteUsed (url) {
    let urls = loadUsed()
    deleteFromArray(urls, (item) => {
        return item.link === url.link
    })
    Cookies.set(USED_KEY, urls)
    return urls
}

export function removeUsed () {
    Cookies.remove(USED_KEY)
    return []
}

const RB_SETTINGS_KEY = '__rb_settings__'

const RB_DEFAULTS = {
    dataMode: process.env.VUE_APP_DATA_MODE || 'local',
    configType: process.env.VUE_APP_CONFIG_TYPE || 'rainbow-bridge',
    baseUrl: process.env.VUE_APP_RB_BASE_URL || '/rainbow-bridge',
    environment: process.env.VUE_APP_RB_ENVIRONMENT || 'navi',
    localDataUrl: process.env.VUE_APP_LOCAL_DATA_URL || 'https://ework-1251965636.cos.ap-beijing.myqcloud.com/web.json',
    nacosServerAddr: process.env.VUE_APP_NACOS_SERVER_ADDR || 'http://localhost:8848/nacos',
    nacosNamespace: process.env.VUE_APP_NACOS_NAMESPACE || 'public',
    nacosDataId: process.env.VUE_APP_NACOS_DATA_ID || 'ework-nav.json',
    nacosGroup: process.env.VUE_APP_NACOS_GROUP || 'DEFAULT_GROUP',
    apolloMeta: process.env.VUE_APP_APOLLO_META || 'http://localhost:8080',
    apolloAppId: process.env.VUE_APP_APOLLO_APP_ID || 'ework-nav',
    apolloNamespace: process.env.VUE_APP_APOLLO_NAMESPACE || 'application',
    skipSslVerify: process.env.VUE_APP_SKIP_SSL_VERIFY === 'true'
}

export function loadRbSettings () {
    const value = Cookies.getJSON(RB_SETTINGS_KEY)
    if (!value) return { ...RB_DEFAULTS }
    return {
        dataMode: value.dataMode || RB_DEFAULTS.dataMode,
        configType: value.configType || RB_DEFAULTS.configType,
        baseUrl: value.baseUrl || RB_DEFAULTS.baseUrl,
        environment: value.environment || RB_DEFAULTS.environment,
        localDataUrl: value.localDataUrl || RB_DEFAULTS.localDataUrl,
        nacosServerAddr: value.nacosServerAddr || RB_DEFAULTS.nacosServerAddr,
        nacosNamespace: value.nacosNamespace || RB_DEFAULTS.nacosNamespace,
        nacosDataId: value.nacosDataId || RB_DEFAULTS.nacosDataId,
        nacosGroup: value.nacosGroup || RB_DEFAULTS.nacosGroup,
        apolloMeta: value.apolloMeta || RB_DEFAULTS.apolloMeta,
        apolloAppId: value.apolloAppId || RB_DEFAULTS.apolloAppId,
        apolloNamespace: value.apolloNamespace || RB_DEFAULTS.apolloNamespace,
        skipSslVerify: value.skipSslVerify !== undefined ? value.skipSslVerify : RB_DEFAULTS.skipSslVerify
    }
}

export function saveRbSettings (settings) {
    Cookies.set(RB_SETTINGS_KEY, settings)
}

export function removeRbSettings () {
    Cookies.remove(RB_SETTINGS_KEY)
}

export function getRbDefaults () {
    return { ...RB_DEFAULTS }
}
