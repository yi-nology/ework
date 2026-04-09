# 虹桥计划 (Rainbow Bridge) 对接文档

## 概述

ework 导航站通过虹桥计划 (Rainbow Bridge) 配置管理平台动态获取导航数据。虹桥计划作为配置中心，管理各环境下的 Pipeline（流水线）和 Config（配置项），ework 作为消费端读取这些配置并渲染为导航链接。

## 架构

```
┌─────────────┐         ┌──────────────────────┐
│             │  HTTP   │   Rainbow Bridge     │
│   ework     │ ──────> │   配置管理平台         │
│  导航站      │         │                      │
│             │ <────── │  /api/v1/pipeline/list│
│             │         │  /api/v1/runtime/config│
└─────────────┘         └──────────────────────┘
```

## 数据流

```
页面加载
  │
  ├─ 读取 Cookie 中的覆盖配置 (loadRbSettings)
  │    ├─ dataMode: local / remote
  │    ├─ baseUrl: API 地址
  │    └─ environment: 环境名称
  │
  ├─ dataMode === 'local'
  │    └─ 请求静态 JSON 文件 (COS)
  │
  └─ dataMode === 'remote'
       ├─ 1) GET /api/v1/pipeline/list?environment_key={environment}
       │     → 获取所有活跃 Pipeline 列表
       │
       └─ 2) 对每个 Pipeline:
            GET /api/v1/runtime/config
            Headers: x-environment / x-pipeline
            → 获取该 Pipeline 下的配置项列表
            → 转换为导航链接 (configToNavItem)
```

---

## API 接口

### 1. 获取 Pipeline 列表

```
GET {baseUrl}/api/v1/pipeline/list?environment_key={environment}
```

**请求参数 (Query):**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `environment_key` | string | 是 | 环境标识，如 `navi`、`prod` |
| `is_active` | bool | 否 | 传 `true` 仅返回活跃的 Pipeline |

**响应:**

```json
{
    "code": 200,
    "msg": "OK",
    "data": {
        "total": 3,
        "list": [
            {
                "environment_key": "navi",
                "pipeline_key": "dev-tools",
                "pipeline_name": "开发工具",
                "description": "开发相关工具导航",
                "sort_order": 1,
                "is_active": true
            }
        ]
    }
}
```

### 2. 获取 Pipeline 配置项

```
GET {baseUrl}/api/v1/runtime/config
```

**请求头 (Headers):**

| Header | 类型 | 必填 | 说明 |
|--------|------|------|------|
| `x-environment` | string | 是 | 环境标识 |
| `x-pipeline` | string | 是 | Pipeline 标识 |

**响应:**

```json
{
    "code": 200,
    "msg": "OK",
    "data": {
        "configs": [
            {
                "resource_key": "gitlab",
                "name": "GitLab",
                "alias": "gitlab",
                "type": "object",
                "content": {
                    "link": "https://gitlab.example.com",
                    "icon": "https://gitlab.example.com/favicon.ico",
                    "desc": "代码仓库"
                },
                "remark": "主代码仓库"
            }
        ],
        "environment": {
            "environment_key": "navi",
            "pipeline_name": "开发工具"
        }
    }
}
```

**认证:** 两个接口均无需认证（Auth 中间件为非强制模式）。

---

## 配置项类型映射

虹桥计划支持多种配置类型，ework 按以下规则将配置转换为导航项：

### Config → NavItem 转换规则

| Config Type | content 格式 | 转换逻辑 |
|-------------|-------------|---------|
| `text` | 纯文本 URL | `link = content` |
| `keyvalue` / `object` / `json` | JSON 对象 | 解析 JSON，提取 `link`/`url`/`href`、`icon`/`favicon`、`desc`/`description`、`name` |
| `image` | 图片 URL | `icon = content` |

### JSON 对象可用字段

```json
{
    "link": "https://example.com",
    "url": "备选链接字段",
    "href": "备选链接字段",
    "icon": "https://example.com/favicon.ico",
    "favicon": "备选图标字段",
    "desc": "描述文字",
    "description": "备选描述字段",
    "name": "显示名称（覆盖 config.name）"
}
```

### 推荐配置格式

在虹桥计划中创建导航链接时，推荐使用 `object` 类型，content 格式如下：

```json
{
    "link": "https://gitlab.example.com",
    "icon": "https://gitlab.example.com/favicon.ico",
    "desc": "代码仓库"
}
```

其中 `name` 由配置项的 `name` 或 `alias` 字段提供，不需要在 content 中重复设置。

---

## 环境配置

### 编译时环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VUE_APP_ENABLE_RB` | 是否启用虹桥计划功能 | `true` |
| `VUE_APP_DATA_MODE` | 数据模式 `local` / `remote` | `local` |
| `VUE_APP_LOCAL_DATA_URL` | 本地数据 JSON 地址 | COS 静态文件 |
| `VUE_APP_RB_BASE_URL` | 虹桥计划 API 地址 | `http://localhost:8080/rainbow-bridge` |
| `VUE_APP_RB_ENVIRONMENT` | 环境名称 | `navi` |
| `VUE_APP_RB_PIPELINE` | Pipeline（不可用户配置） | `main` |

### 各环境配置

**`.env` (通用默认):**
```
VUE_APP_ENABLE_RB=true
VUE_APP_DATA_MODE=local
VUE_APP_RB_BASE_URL=http://localhost:8080/rainbow-bridge
VUE_APP_RB_ENVIRONMENT=navi
VUE_APP_RB_PIPELINE=main
```

**`.env.development` (开发):**
```
VUE_APP_ENABLE_RB=true
VUE_APP_DATA_MODE=remote
VUE_APP_RB_BASE_URL=http://localhost:8080/rainbow-bridge
VUE_APP_RB_ENVIRONMENT=navi
VUE_APP_RB_PIPELINE=dev
```

**`.env.production` (生产):**
```
VUE_APP_ENABLE_RB=true
VUE_APP_DATA_MODE=remote
VUE_APP_RB_BASE_URL=/rainbow-bridge
VUE_APP_RB_ENVIRONMENT=navi
VUE_APP_RB_PIPELINE=prod
```

**`.env.static` (纯静态版):**
```
VUE_APP_ENABLE_RB=false
VUE_APP_DATA_MODE=local
```

### 构建命令

```bash
# 标准版（含虹桥计划功能）
yarn build

# 纯静态版（无虹桥计划功能）
yarn build:static
```

**`VUE_APP_ENABLE_RB=false` 时以下内容被隐藏：**
- 侧边栏底部「虹桥计划 API」设置按钮
- Header 中的 Pipeline Tag
- 设置面板组件
- 强制使用 local 数据模式，不加载 RB 相关模块

### Cookie 覆盖机制

用户可通过侧边栏底部「虹桥计划 API」设置面板动态修改以下配置，修改后保存在 Cookie (`__rb_settings__`) 中，覆盖编译时默认值：

| Cookie 字段 | 说明 |
|-------------|------|
| `dataMode` | 数据模式覆盖值 |
| `baseUrl` | API 地址覆盖值 |
| `environment` | 环境名称覆盖值 |

**优先级:** Cookie 覆盖值 > 编译时环境变量默认值

**恢复默认:** 点击「恢复默认」按钮清除 Cookie，回到编译时注入的值。

---

## 在虹桥计划中配置导航

### 步骤

1. **创建/选择环境** — 如 `navi`

2. **创建 Pipeline** — 每个 Pipeline 对应导航站中的一个分类卡片
   - `pipeline_key`: 如 `dev-tools`
   - `pipeline_name`: 如 `开发工具`（将显示为卡片标题）
   - `sort_order`: 控制卡片显示顺序
   - `is_active`: 设为 `true`

3. **在 Pipeline 下创建配置项** — 每个配置项对应一个导航链接
   - `name`: 链接名称，如 `GitLab`
   - `type`: 选择 `object`
   - `content`: JSON 格式的链接信息

4. **验证** — 在 ework 中将数据模式切换为 `remote`，填入 API 地址和环境名称，保存后页面自动刷新加载数据

### 配置示例

**Pipeline: 开发工具 (dev-tools)**

| 配置项 name | type | content |
|-------------|------|---------|
| GitLab | object | `{"link":"https://gitlab.com","icon":"https://gitlab.com/favicon.ico","desc":"代码仓库"}` |
| Jenkins | object | `{"link":"https://jenkins.io","desc":"持续集成"}` |
| Nginx | object | `{"link":"https://nginx.org","desc":"反向代理"}` |

**Pipeline: 文档管理 (docs)**

| 配置项 name | type | content |
|-------------|------|---------|
| ShowDoc | object | `{"link":"https://showdoc.com","desc":"API 文档"}` |
| Confluence | object | `{"link":"https://confluence.com","desc":"团队 Wiki"}` |

---

## 文件结构

```
src/
├── api/
│   ├── github.js          # 数据获取入口，读取 Cookie 配置分发请求
│   └── config.js           # 虹桥计划 API 客户端 (pipeline/list + runtime/config)
├── common/js/
│   └── cache.js            # Cookie 存储 (收藏/常用/虹桥计划设置)
├── components/
│   ├── main.vue            # 主布局，侧边栏设置入口
│   ├── settings.vue        # 虹桥计划 API 设置面板
│   └── card/
│       ├── sub.vue         # 分类卡片容器
│       └── nav.vue         # 导航链接项
└── store/                  # Vuex (收藏/常用)
```

## 错误处理

| 场景 | 处理方式 |
|------|---------|
| API 地址不可达 | 页面提示「数据加载失败，请检查配置」 |
| Pipeline 列表为空 | 页面无分类卡片显示 |
| 某个 Pipeline 配置获取失败 | 该分类显示为空卡片，不影响其他分类 |
| Cookie 设置后 API 不可用 | 点击「恢复默认」回到编译时配置 |
