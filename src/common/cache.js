import Cookies from 'js-cookie'

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200
const USED_KEY = '__used__'
const USED_MAX_LEN = 200
const RB_SETTINGS_KEY = '__rb_settings__'
const THEME_KEY = '__theme__'

// js-cookie v3 的 get() 不再自动解析 JSON,统一从这里读
function getJSONCookie (key) {
  const raw = Cookies.get(key)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    arr.forEach(item => {
      if (item.link === val.link && val.num) item.num += 1
    })
    return
  }
  if (index > 0) arr.splice(index, 1)
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) arr.pop()
}

function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) arr.splice(index, 1)
}

export function loadFavorite () {
  return getJSONCookie(FAVORITE_KEY) || []
}

export function saveFavorite (url) {
  const urls = loadFavorite()
  insertArray(urls, url, item => item.link === url.link, FAVORITE_MAX_LEN)
  Cookies.set(FAVORITE_KEY, urls)
  return urls
}

export function deleteFavorite (url) {
  const urls = loadFavorite()
  deleteFromArray(urls, item => item.link === url.link)
  Cookies.set(FAVORITE_KEY, urls)
  return urls
}

export function removeFavorite () {
  Cookies.remove(FAVORITE_KEY)
  return []
}

export function loadUsed () {
  return getJSONCookie(USED_KEY) || []
}

export function saveUsed (url) {
  url.num = 1
  const urls = loadUsed()
  insertArray(urls, url, item => item.link === url.link, USED_MAX_LEN)
  Cookies.set(USED_KEY, urls)
  return urls
}

export function deleteUsed (url) {
  const urls = loadUsed()
  deleteFromArray(urls, item => item.link === url.link)
  Cookies.set(USED_KEY, urls)
  return urls
}

export function removeUsed () {
  Cookies.remove(USED_KEY)
  return []
}

// ------- 三方API设置 -------
// 优先级: Cookie 覆盖 > window.ESHOP_CONFIG(部署运行时注入) > Vite 环境变量 > 代码默认
// 运行时注入必须赢过构建期 env,否则 docker-entrypoint 的注入不生效
function readRuntimeConfig () {
  return (typeof window !== 'undefined' && window.ESHOP_CONFIG) || {}
}

function env (key, fallback) {
  const v = import.meta.env[key]
  return v === undefined || v === '' ? fallback : v
}

function rc (key, fallback) {
  const v = readRuntimeConfig()[key]
  return v === undefined || v === '' ? fallback : v
}

export const RB_DEFAULTS = {
  dataMode: rc('dataMode', env('VITE_DATA_MODE', 'local')),
  configType: rc('configType', env('VITE_CONFIG_TYPE', 'rainbow-bridge')),
  baseUrl: rc('baseUrl', env('VITE_RB_BASE_URL', '/rainbow-bridge')),
  environment: rc('environment', env('VITE_RB_ENVIRONMENT', 'navi')),
  localDataUrl: rc('localDataUrl', env('VITE_LOCAL_DATA_URL', '/nav-data.json')),
  nacosServerAddr: rc('nacosServerAddr', env('VITE_NACOS_SERVER_ADDR', 'http://localhost:8848/nacos')),
  nacosNamespace: rc('nacosNamespace', env('VITE_NACOS_NAMESPACE', 'public')),
  nacosDataId: rc('nacosDataId', env('VITE_NACOS_DATA_ID', 'ework-nav.json')),
  nacosGroup: rc('nacosGroup', env('VITE_NACOS_GROUP', 'DEFAULT_GROUP')),
  apolloMeta: rc('apolloMeta', env('VITE_APOLLO_META', 'http://localhost:8080')),
  apolloAppId: rc('apolloAppId', env('VITE_APOLLO_APP_ID', 'ework-nav')),
  apolloNamespace: rc('apolloNamespace', env('VITE_APOLLO_NAMESPACE', 'application')),
  skipSslVerify: String(rc('skipSslVerify', env('VITE_SKIP_SSL_VERIFY', 'false'))) === 'true',
  hidePrivate: false,
  autoRefresh: true
}

export function loadRbSettings () {
  const value = getJSONCookie(RB_SETTINGS_KEY)
  if (!value) return { ...RB_DEFAULTS }
  return { ...RB_DEFAULTS, ...value }
}

export function saveRbSettings (settings) {
  Cookies.set(RB_SETTINGS_KEY, settings)
}

export function removeRbSettings () {
  Cookies.remove(RB_SETTINGS_KEY)
}

// ------- 主题 -------
export function loadTheme () {
  return Cookies.get(THEME_KEY) === 'dark' ? 'dark' : 'light'
}

export function saveTheme (mode) {
  Cookies.set(THEME_KEY, mode, { expires: 365 })
}
