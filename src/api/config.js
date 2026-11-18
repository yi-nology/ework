import axios from 'axios'

function createService () {
  const service = axios.create({ timeout: 10000 })
  service.interceptors.response.use(r => r, error => Promise.reject(error))
  return service
}

// ---- 配置项 -> 导航项 ----
// 虹桥 v5.4: web_link.content = { url, icon_url?, sort_order? }
// type 为自由字符串(12 种)，runtime release 每项含 is_perm 私有标记
function configToNavItem (c) {
  const nav = {
    name: c.name || c.alias || '',
    link: '',
    desc: c.remark || c.description || '',
    icon: '',
    type: c.type || '',
    isPerm: !!c.is_perm,
    sortOrder: 0
  }

  let content = c.content
  if (typeof content === 'string') {
    try {
      content = JSON.parse(content)
    } catch (e) {
      content = null
    }
  }

  if (content && typeof content === 'object') {
    nav.link = content.link || content.url || content.href || ''
    nav.icon = content.icon || content.icon_url || content.favicon || ''
    nav.desc = content.desc || content.description || nav.desc
    if (!nav.name && content.name) nav.name = content.name
    nav.sortOrder = content.sort_order || content.sortOrder || 0
  } else if (c.type === 'text' && typeof c.content === 'string') {
    nav.link = c.content
  } else if (c.type === 'image' && typeof c.content === 'string') {
    // image 类型 content 是解析后的资源地址(快照内不可变)，可作图标
    nav.icon = c.content
  }

  return nav
}

function mapConfigs (configs) {
  return (configs || [])
    .map(configToNavItem)
    .filter(n => n.link || n.icon)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
}

// ---- 渠道发现 ----
// pipeline/list 带 sort_order/is_active，但新版本虹桥需要管理员鉴权；
// overview 公开但无 sort_order —— 两者构成降级链路
function normalizePipelines (list) {
  return (list || [])
    .filter(p => p && p.pipeline_key && p.is_active !== false)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .map(p => ({
      key: p.pipeline_key,
      name: p.pipeline_name || p.pipeline_key,
      sortOrder: p.sort_order || 0
    }))
}

function fetchPipelineList (service, baseUrl, environment) {
  return service({
    url: baseUrl + '/api/v1/pipeline/list',
    method: 'get',
    params: { environment_key: environment }
  }).then(resp => {
    const body = resp.data
    const list = body && body.code === 200 && body.data && body.data.list
    if (!list) throw new Error('pipeline/list 响应异常')
    return normalizePipelines(list)
  })
}

function fetchOverviewPipelines (service, baseUrl, environment) {
  return service({ url: baseUrl + '/api/v1/runtime/overview', method: 'get' }).then(resp => {
    const body = resp.data
    const envs = body && body.code === 200 && body.data && body.data.list
    if (!envs) throw new Error('overview 响应异常')
    const env = envs.find(e => e.environment_key === environment)
    const pipelines = env ? env.pipelines : []
    return normalizePipelines(pipelines)
  })
}

// ---- 渠道发布快照 ----
// 返回 { nav, meta }; meta 含 version/activated_at/snapshot_id/selection_mode
function extractRelease (body) {
  const data = body && body.code === 200 && body.data
  if (!data) return { nav: [], meta: null }
  return {
    nav: mapConfigs(data.configs),
    meta: {
      version: data.version || '',
      activatedAt: data.activated_at || '',
      snapshotId: data.snapshot_id || '',
      selectionMode: data.selection_mode || 'active',
      environmentName: (data.environment && data.environment.environment_name) || ''
    }
  }
}

function fetchPipelineRelease (service, baseUrl, environment, pipelineKey) {
  return service({
    url: baseUrl + '/api/v1/runtime/release',
    method: 'get',
    headers: { 'x-environment': environment, 'x-pipeline': pipelineKey }
  }).then(resp => extractRelease(resp.data)).catch(() =>
    // 老版本虹桥(v5.3 前)仅有 runtime/config,作为最后兜底
    service({
      url: baseUrl + '/api/v1/runtime/config',
      method: 'get',
      headers: { 'x-environment': environment, 'x-pipeline': pipelineKey }
    }).then(resp => {
      const body = resp.data
      const data = body && body.code === 200 && body.data
      return { nav: mapConfigs(data && data.configs), meta: null }
    })
  )
}

export function fetchAllNavData (baseUrl, environment) {
  const service = createService()
  return fetchPipelineList(service, baseUrl, environment)
    .catch(() => fetchOverviewPipelines(service, baseUrl, environment))
    .then(pipelines => {
      const requests = pipelines.map(p =>
        fetchPipelineRelease(service, baseUrl, environment, p.key)
          .then(r => ({ title: p.name, name: p.key, nav: r.nav, meta: r.meta }))
          .catch(() => ({ title: p.name, name: p.key, nav: [], meta: null }))
      )
      return Promise.all(requests)
    })
    .then(results => {
      const categories = results.filter(r => r.nav.length > 0)
      // 聚合各渠道 release 元数据：取最新激活时间 + 去重版本号
      const metas = results.map(r => r.meta).filter(Boolean)
      const activatedAt = metas.map(m => m.activatedAt).filter(Boolean).sort().pop() || ''
      const versions = [...new Set(metas.map(m => m.version).filter(Boolean))]
      const environmentName = (metas.find(m => m.environmentName) || {}).environmentName || ''
      return {
        categories,
        meta: {
          environmentName,
          activatedAt,
          versions,
          pipelines: metas.length,
          snapshots: metas.map(m => m.snapshotId).filter(Boolean).length
        }
      }
    })
}

// ---- 其他配置源 ----
export function fetchNacosConfig (serverAddr, namespace, dataId, group) {
  const service = createService()
  return service({
    url: serverAddr + '/v1/cs/configs',
    method: 'get',
    params: { dataId, group, tenant: namespace }
  }).then(resp => {
    const content = resp.data
    if (typeof content === 'string') {
      try {
        return JSON.parse(content)
      } catch (e) {
        return content
      }
    }
    return content
  })
}

export function fetchApolloConfig (meta, appId, namespace) {
  const service = createService()
  return service({ url: meta + '/configs/' + appId + '/default/' + namespace, method: 'get' }).then(resp => {
    const body = resp.data
    if (body && body.configurations) {
      const navData = body.configurations.navData || body.configurations.ework_nav
      if (navData) {
        try {
          return JSON.parse(navData)
        } catch (e) {
          return navData
        }
      }
      return body.configurations
    }
    return []
  })
}

export function getLocalData (url) {
  const service = createService()
  return service({ url, method: 'get' }).then(resp => resp.data)
}
