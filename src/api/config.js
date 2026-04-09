import axios from 'axios'

var service = axios.create({ timeout: 10000 })

service.interceptors.response.use(
  function (resp) { return resp },
  function (error) {
    // eslint-disable-next-line no-console
    console.error('Config API Error:', error)
    return Promise.reject(error)
  }
)

function configToNavItem(c) {
  var nav = {
    name: c.name || c.alias || '',
    link: '',
    desc: c.remark || '',
    icon: ''
  }

  if (c.type === 'text') {
    nav.link = c.content || ''
  } else if (c.type === 'keyvalue' || c.type === 'object' || c.type === 'json') {
    try {
      var obj = typeof c.content === 'string' ? JSON.parse(c.content) : c.content
      nav.link = obj.link || obj.url || obj.href || ''
      nav.icon = obj.icon || obj.favicon || ''
      nav.desc = obj.desc || obj.description || nav.desc
      if (!nav.name && obj.name) nav.name = obj.name
    } catch (e) {
      nav.link = c.content || ''
    }
  } else if (c.type === 'image') {
    nav.icon = c.content || ''
  }

  return nav
}

function fetchPipelineConfig(baseUrl, environment, pipelineKey) {
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
      return body.data.configs.map(configToNavItem).filter(function (n) {
        return n.link || n.icon
      })
    }
    return []
  })
}

export function fetchAllNavData(baseUrl, environment) {
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
      return fetchPipelineConfig(baseUrl, environment, p.pipeline_key).then(function (nav) {
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

export function getLocalData(url) {
  return service({
    url: url,
    method: 'get'
  }).then(function (resp) {
    return resp.data
  })
}
