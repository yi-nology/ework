import axios from 'axios'

function createService(skipSslVerify) {
  var config = { timeout: 10000 }
  
  if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    var https = require('https')
    if (skipSslVerify) {
      config.httpsAgent = new https.Agent({
        rejectUnauthorized: false
      })
    }
  }
  
  var service = axios.create(config)

  service.interceptors.response.use(
    function (resp) { return resp },
    function (error) {
      // eslint-disable-next-line no-console
      console.error('Config API Error:', error)
      return Promise.reject(error)
    }
  )
  
  return service
}

function configToNavItem(c) {
  var nav = {
    name: c.name || c.alias || '',
    link: '',
    desc: c.remark || c.description || '',
    icon: '',
    sortOrder: 0
  }

  // content 可能是对象，也可能是 JSON 字符串
  var content = c.content
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

function sortNavItems(items) {
  return items.slice().sort(function (a, b) {
    return (a.sortOrder || 0) - (b.sortOrder || 0)
  })
}

function mapConfigs(configs) {
  return sortNavItems(
    (configs || [])
      .map(configToNavItem)
      .filter(function (n) {
        return n.link || n.icon
      })
  )
}

// 优先使用 runtime/release（已发布快照），失败时回退 runtime/config
function fetchPipelineNav(baseUrl, environment, pipelineKey, skipSslVerify) {
  var service = createService(skipSslVerify)
  return service({
    url: baseUrl + '/api/v1/runtime/release',
    method: 'get',
    headers: {
      'x-environment': environment,
      'x-pipeline': pipelineKey
    }
  }).then(function (resp) {
    var body = resp.data
    if (body && body.code === 200 && body.data && body.data.configs) {
      return mapConfigs(body.data.configs)
    }
    return []
  }).catch(function () {
    return service({
      url: baseUrl + '/api/v1/runtime/config',
      method: 'get',
      headers: {
        'x-environment': environment,
        'x-pipeline': pipelineKey
      }
    }).then(function (resp) {
      var body = resp.data
      if (body && body.code === 200 && body.data && body.data.configs) {
        return mapConfigs(body.data.configs)
      }
      return []
    })
  })
}

export function fetchAllNavData(baseUrl, environment, skipSslVerify) {
  var service = createService(skipSslVerify)
  return service({
    url: baseUrl + '/api/v1/pipeline/list',
    method: 'get',
    params: { environment_key: environment }
  }).then(function (resp) {
    var body = resp.data
    if (!body || body.code !== 200 || !body.data || !body.data.list) {
      return []
    }

    var pipelines = body.data.list
      .filter(function (p) { return p.is_active !== false })
      .sort(function (a, b) { return (a.sort_order || 0) - (b.sort_order || 0) })

    var requests = pipelines.map(function (p) {
      return fetchPipelineNav(baseUrl, environment, p.pipeline_key, skipSslVerify).then(function (nav) {
        return {
          title: p.pipeline_name || p.pipeline_key,
          name: p.pipeline_key,
          nav: nav
        }
      }).catch(function () {
        return {
          title: p.pipeline_name || p.pipeline_key,
          name: p.pipeline_key,
          nav: []
        }
      })
    })

    return Promise.all(requests).then(function (results) {
      return results.filter(function (r) { return r.nav.length > 0 })
    })
  })
}

export function fetchNacosConfig(serverAddr, namespace, dataId, group, skipSslVerify) {
  var service = createService(skipSslVerify)
  var url = serverAddr + '/v1/cs/configs'
  return service({
    url: url,
    method: 'get',
    params: {
      dataId: dataId,
      group: group,
      tenant: namespace
    }
  }).then(function (resp) {
    var content = resp.data
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

export function fetchApolloConfig(meta, appId, namespace, skipSslVerify) {
  var service = createService(skipSslVerify)
  var url = meta + '/configs/' + appId + '/default/' + namespace
  return service({
    url: url,
    method: 'get'
  }).then(function (resp) {
    var body = resp.data
    if (body && body.configurations) {
      var navData = body.configurations.navData || body.configurations.ework_nav
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

export function getLocalData(url, skipSslVerify) {
  var service = createService(skipSslVerify)
  return service({
    url: url,
    method: 'get'
  }).then(function (resp) {
    return resp.data
  })
}
