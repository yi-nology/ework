import axios from 'axios'

function createService () {
  const service = axios.create({ timeout: 10000 })
  service.interceptors.response.use(r => r, error => Promise.reject(error))
  return service
}

function configToNavItem (c) {
  const nav = {
    name: c.name || c.alias || '',
    link: '',
    desc: c.remark || c.description || '',
    icon: '',
    sortOrder: 0
  }

  // content 可能是对象，也可能是 JSON 字符串
  let content = c.content
  if (typeof content === 'string') {
    try {
      content = JSON.parse(content)
    } catch (e) {
      content = null
    }
  }

  if (content && typeof content === 'object') {
    // web_link 类型 content 形如 { url, sort_order }，兼容 link/href/icon 字段
    nav.link = content.link || content.url || content.href || ''
    nav.icon = content.icon || content.favicon || ''
    nav.desc = content.desc || content.description || nav.desc
    if (!nav.name && content.name) nav.name = content.name
    nav.sortOrder = content.sort_order || content.sortOrder || 0
  } else if (c.type === 'text') {
    nav.link = c.content || ''
  } else if (c.type === 'image') {
    nav.icon = c.content || ''
  }

  return nav
}

function mapConfigs (configs) {
  return (configs || [])
    .map(configToNavItem)
    .filter(n => n.link || n.icon)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
}

function fetchRelease (service, baseUrl, environment, pipelineKey) {
  return service({
    url: baseUrl + '/api/v1/runtime/release',
    method: 'get',
    headers: { 'x-environment': environment, 'x-pipeline': pipelineKey }
  }).then(resp => {
    const body = resp.data
    if (body && body.code === 200 && body.data && body.data.configs) {
      return mapConfigs(body.data.configs)
    }
    return []
  })
}

function fetchConfig (service, baseUrl, environment, pipelineKey) {
  return service({
    url: baseUrl + '/api/v1/runtime/config',
    method: 'get',
    headers: { 'x-environment': environment, 'x-pipeline': pipelineKey }
  }).then(resp => {
    const body = resp.data
    if (body && body.code === 200 && body.data && body.data.configs) {
      return mapConfigs(body.data.configs)
    }
    return []
  })
}

function fetchPipelineNav (service, baseUrl, environment, pipelineKey) {
  // 优先使用 runtime/release（已发布快照），失败时回退 runtime/config
  return fetchRelease(service, baseUrl, environment, pipelineKey).catch(() =>
    fetchConfig(service, baseUrl, environment, pipelineKey)
  )
}

export function fetchAllNavData (baseUrl, environment) {
  const service = createService()
  return service({
    url: baseUrl + '/api/v1/pipeline/list',
    method: 'get',
    params: { environment_key: environment }
  }).then(resp => {
    const body = resp.data
    if (!body || body.code !== 200 || !body.data || !body.data.list) return []

    const pipelines = body.data.list
      .filter(p => p.is_active !== false)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))

    const requests = pipelines.map(p =>
      fetchPipelineNav(service, baseUrl, environment, p.pipeline_key)
        .then(nav => ({ title: p.pipeline_name || p.pipeline_key, name: p.pipeline_key, nav }))
        .catch(() => ({ title: p.pipeline_name || p.pipeline_key, name: p.pipeline_key, nav: [] }))
    )

    return Promise.all(requests).then(results => results.filter(r => r.nav.length > 0))
  })
}

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
  return service({
    url: meta + '/configs/' + appId + '/default/' + namespace,
    method: 'get'
  }).then(resp => {
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
