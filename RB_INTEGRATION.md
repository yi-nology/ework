# 三方API (配置中心) 对接文档

## 概述

ework 导航站通过「三方API」配置中心动态获取导航数据，支持多种主流配置中心：
- **虹桥计划 (Rainbow Bridge)** — 原内置配置中心
- **Nacos** — 阿里巴巴开源配置中心
- **Apollo** — 携程开源配置中心

配置中心管理各环境下的分类和导航链接，ework 作为消费端读取这些配置并渲染为导航卡片。

## 架构

```
┌─────────────┐         ┌───────────────────────────┐
│             │  HTTP   │  Rainbow Bridge (v5.3+)   │
│   ework     │ ──────> │                           │
│  导航站      │         │  /api/v1/runtime/release  │  <- 主接口(公开)
│             │ <────── │  /api/v1/runtime/overview │  <- 渠道发现(公开)
└─────────────┘         └───────────────────────────┘
     │
     └─ 降级链路: /api/v1/pipeline/list (带 sort_order, 新版需管理员鉴权)
                 失败时自动降级到 overview
```

## 数据流

```
页面加载
  |
  |-- 读取配置 (loadRbSettings): Cookie 覆盖 > window.ESHOP_CONFIG > Vite env
  |
  |-- dataMode === 'local'
  |    |-- 请求静态 JSON (localDataUrl, 如同域 /nav-data.json 或 COS)
  |
  |-- dataMode === 'remote'
       |-- rainbow-bridge:
       |    1. 渠道发现: pipeline/list -> (401/403 时) -> runtime/overview
       |    2. 逐渠道: GET /api/v1/runtime/release (x-environment/x-pipeline)
       |       -> configs[] + release 元数据(version/activated_at/snapshot_id)
       |    3. 聚合元数据 -> Header 数据快照 chip; 每 5 分钟静默自刷新
       |-- nacos: GET /v1/cs/configs
       +-- apollo: GET /configs/{appId}/default/{namespace} -> 提取 navData
```

---

## API 接口

### 1. 渠道发现（双链路降级）

**链路 A（优先）:** `GET {baseUrl}/api/v1/pipeline/list?environment_key={env}`
带 `sort_order` / `is_active` / `description`；**新版虹桥需要管理员鉴权**，401/403 时自动降级。

**链路 B（公开保底）:** `GET {baseUrl}/api/v1/runtime/overview`
免鉴权白名单端点，返回环境->渠道树，但**不含 sort_order**（已向虹桥提 issue 建议补充，见 rainbow_bridge#52）。

### 2. 渠道发布快照（主接口）

```
GET {baseUrl}/api/v1/runtime/release
```

| Header | 必填 | 说明 |
|--------|------|------|
| `x-environment` | 是 | 环境标识，如 `navi` |
| `x-pipeline` | 是 | 渠道标识 |

Query 可选 `version`（锁定历史版本）、`content_format=json|raw`（默认 json，web_link/object/keyvalue 的 content 直接是对象）。

**响应顶层（release 元数据，ework 用于数据新鲜度展示与自刷新判断）:**

| 字段 | 说明 |
|------|------|
| `version` / `snapshot_id` | 快照版本与唯一 ID |
| `activated_at` | 激活时间 (RFC3339 UTC)，仅 active 模式返回 |
| `selection_mode` | `active`（跟随最新）或 `fixed`（固定版本） |
| `active_revision` / `source_freeze_revision` / `payload_sha256` | 版本追溯信息 |
| `environment` | `{environment_key, environment_name, pipeline_key, pipeline_name}` |

**configs[] 每项字段:**

| 字段 | 说明 |
|------|------|
| `resource_key` / `alias` / `name` | 业务键 / 别名 / 显示名 |
| `type` | 自由字符串（12 种），ework 透传并在卡片 popover 展示 |
| `content` | 按 type 解释；web_link = `{url, icon_url?, sort_order?}` |
| `remark` / `description` | 备注 / 描述，ework 取 `remark || description` 作卡片描述 |
| `is_perm` | 私有标记：true 时卡片显示锁徽章，可在设置中隐藏 |
| content 中 `release-asset://` | 虹桥渲染为快照资产地址，可长期缓存（同快照不可变） |

### 3. Legacy 兜底（仅老版本虹桥）

`/api/v1/runtime/config` 已在虹桥 v5.3 删除（5d0a2e2）。ework 仅在 release 请求失败时尝试该端点，用于兼容 v5.3 前的旧部署。
## 配置项类型映射

虹桥计划支持多种配置类型，ework 按以下规则将配置转换为导航项：

### Config → NavItem 转换规则

| Config Type | content 格式 | 转换逻辑 |
|-------------|-------------|---------|
| `web_link`（推荐） | JSON 对象 | `link = url`；`icon = icon_url \|\| icon \|\| favicon`；`sort_order` 参与卡片排序 |
| `text` | 纯文本 URL | `link = content` |
| `keyvalue` / `object` / `json` | JSON 对象 | 解析 JSON，提取 `link`/`url`/`href`、`icon`/`icon_url`/`favicon`、`desc`/`description`、`name` |
| `image` | 图片/资产 URL | `icon = content`（快照资产地址不可变，可长期缓存） |

另：`is_perm` 透传到导航项，卡片显示私有锁徽章；`type` 透传并在 popover 展示；其余类型仅当 content 能解析出链接或图标时渲染。

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

在虹桥计划中创建导航链接时，推荐直接使用 `web_link` 类型（虹桥 v5.4+，写入时校验 url/icon_url 格式），只需填 `url` 与可选 `icon_url`、`sort_order`；描述写在配置项的 `remark` 或 `description` 字段，显示名用 `name`。

如需自定义扩展字段（如内网别名、备注链接），可退而使用 `object` 类型，content 支持以下字段：

```json
{
    "link": "https://gitlab.example.com",
    "icon": "https://example.com/favicon.ico",
    "desc": "代码仓库"
}
```

其中 `name` 由配置项的 `name` 或 `alias` 字段提供，不需要在 content 中重复设置。

---

## Nacos 配置中心

### 接口说明

ework 直接调用 Nacos Open API 获取配置：

```
GET {serverAddr}/v1/cs/configs?dataId={dataId}&group={group}&tenant={namespace}
```

### 数据格式要求

Nacos 配置内容需为 JSON 数组，格式与本地静态文件格式一致：

```json
[
    {
        "title": "开发工具",
        "name": "dev-tools",
        "nav": [
            {
                "name": "GitLab",
                "link": "https://gitlab.com",
                "icon": "https://gitlab.com/favicon.ico",
                "desc": "代码仓库"
            }
        ]
    }
]
```

### 配置步骤

1. 在 Nacos 控制台创建命名空间（或使用 `public`）
2. 创建配置：
   - **Data ID**: `ework-nav.json`
   - **Group**: `DEFAULT_GROUP`
   - **配置格式**: JSON
3. 填入导航数据 JSON 数组
4. 在 ework 设置面板选择「Nacos」类型，填入地址和配置信息

---

## Apollo 配置中心

### 接口说明

ework 调用 Apollo Open API 获取配置：

```
GET {meta}/configs/{appId}/default/{namespace}
```

### 数据格式要求

在 Apollo 中添加一个 key 为 `navData` 或 `ework_nav` 的配置项，value 为 JSON 数组字符串。

### 配置步骤

1. 在 Apollo 门户创建 App（如 `ework-nav`）
2. 在 `application` namespace 中添加配置：
   - **Key**: `navData`
   - **Value**: 导航数据 JSON 数组字符串
3. 发布配置
4. 在 ework 设置面板选择「Apollo」类型，填入地址和配置信息

---

## 环境配置

### 配置优先级（重要）

Cookie 用户覆盖 > `window.ESHOP_CONFIG`（**运行时注入**，docker-entrypoint.sh 写入）> 构建期 `VITE_*` 环境变量 > 代码默认。
运行时注入必须能压过构建期变量，否则容器启动注入不生效（PR #54 曾修复一次反转）。

**部署形态：**
- GitHub Pages（ework.murphyyi.com）：无注入，仓库 `public/config.js` 即生效 → local + 同域 `/nav-data.json`
- Docker/K8s：entrypoint 覆写 config.js → remote + 虹桥

### 编译时环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VUE_APP_ENABLE_RB` | 是否启用三方API功能 | `true` |
| `VUE_APP_DATA_MODE` | 数据模式 `local` / `remote` | `local` |
| `VUE_APP_CONFIG_TYPE` | 配置中心类型 `rainbow-bridge` / `nacos` / `apollo` | `rainbow-bridge` |
| `VUE_APP_LOCAL_DATA_URL` | 本地数据 JSON 地址 | COS 静态文件 |
| `VUE_APP_SKIP_SSL_VERIFY` | 是否跳过 SSL 证书验证（Node.js 环境有效） | `false` |

**虹桥计划相关:**
| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VUE_APP_RB_BASE_URL` | 虹桥计划 API 地址 | `http://localhost:8080/rainbow-bridge` |
| `VUE_APP_RB_ENVIRONMENT` | 环境名称 | `navi` |
| `VUE_APP_RB_PIPELINE` | Pipeline（不可用户配置） | `main` |

**Nacos 相关:**
| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VUE_APP_NACOS_SERVER_ADDR` | Nacos 服务器地址 | `http://localhost:8848/nacos` |
| `VUE_APP_NACOS_NAMESPACE` | 命名空间 ID | `public` |
| `VUE_APP_NACOS_DATA_ID` | 配置 Data ID | `ework-nav.json` |
| `VUE_APP_NACOS_GROUP` | 配置 Group | `DEFAULT_GROUP` |

**Apollo 相关:**
| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VUE_APP_APOLLO_META` | Apollo Meta 服务地址 | `http://localhost:8080` |
| `VUE_APP_APOLLO_APP_ID` | Apollo App ID | `ework-nav` |
| `VUE_APP_APOLLO_NAMESPACE` | Apollo Namespace | `application` |

### 各环境配置

**`.env` (通用默认):**
```
VUE_APP_ENABLE_RB=true
VUE_APP_DATA_MODE=local
VUE_APP_CONFIG_TYPE=rainbow-bridge
VUE_APP_RB_BASE_URL=http://localhost:8080/rainbow-bridge
VUE_APP_RB_ENVIRONMENT=navi
VUE_APP_RB_PIPELINE=main
VUE_APP_NACOS_SERVER_ADDR=http://localhost:8848/nacos
VUE_APP_NACOS_NAMESPACE=public
VUE_APP_NACOS_DATA_ID=ework-nav.json
VUE_APP_NACOS_GROUP=DEFAULT_GROUP
VUE_APP_APOLLO_META=http://localhost:8080
VUE_APP_APOLLO_APP_ID=ework-nav
VUE_APP_APOLLO_NAMESPACE=application
VUE_APP_SKIP_SSL_VERIFY=false
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
- 侧边栏底部「三方API」设置按钮
- Header 中的 Pipeline Tag
- 设置面板组件
- 强制使用 local 数据模式，不加载相关模块

### SSL 证书跳过验证

针对自签名证书或内网 HTTPS 服务，可开启「跳过 SSL 证书验证」选项：

- **适用场景**: Node.js 环境（Electron、SSR 等）
- **浏览器限制**: 浏览器环境下此选项不生效（浏览器安全策略不允许跳过证书验证）
- **建议**: 浏览器环境下请安装自签名证书到系统信任根证书存储

### Cookie 覆盖机制

用户可通过侧边栏底部「三方API」设置面板动态修改以下配置，修改后保存在 Cookie (`__rb_settings__`) 中，覆盖编译时默认值：

| Cookie 字段 | 说明 |
|-------------|------|
| `dataMode` | 数据模式覆盖值 |
| `configType` | 配置中心类型 |
| `baseUrl` | 虹桥计划 API 地址 |
| `environment` | 环境名称 |
| `nacosServerAddr` | Nacos 服务器地址 |
| `nacosNamespace` | Nacos 命名空间 |
| `nacosDataId` | Nacos Data ID |
| `nacosGroup` | Nacos Group |
| `apolloMeta` | Apollo Meta 地址 |
| `apolloAppId` | Apollo App ID |
| `apolloNamespace` | Apollo Namespace |
| `skipSslVerify` | 是否跳过 SSL 证书验证 |

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
│   ├── index.js            # 数据获取入口，读取 Cookie 配置分发请求
│   └── config.js           # 配置中心 API 客户端 (Rainbow Bridge / Nacos / Apollo)
├── common/
│   ├── cache.js            # Cookie 存储 (收藏/常用/三方API设置/主题)
│   ├── palette.js          # 分类配色 (12 色大地色系)
│   └── highlight.js        # 搜索命中高亮
├── composables/            # 模块级单例状态 (useNavData/useFavorites/useRbSettings/useTheme/useUiState)
├── components/
│   ├── AppSider.vue        # 暗色侧边栏 (分组/徽标/scroll-spy/主题切换)
│   ├── AppHeader.vue       # Header (问候/统计/搜索/快照chip/刷新)
│   ├── ContentArea.vue     # 状态区 (骨架屏/错误/空态) + 分类列表
│   ├── CategoryCard.vue    # 分类卡片容器
│   ├── LinkCard.vue        # 导航链接项 (图标三级回退/私有锁/操作popover)
│   └── SettingsDrawer.vue  # 配置中心抽屉
└── views/HomeView.vue      # 布局壳
```

## 错误处理

| 场景 | 处理方式 |
|------|---------|
| API 地址不可达 | 页面提示「数据加载失败，请检查配置」 |
| 配置中心返回空数据 | 页面无分类卡片显示 |
| 某个分类配置获取失败 | 该分类显示为空卡片，不影响其他分类 |
| SSL 证书验证失败（浏览器） | 请安装自签名证书到系统信任存储 |
| Cookie 设置后 API 不可用 | 点击「恢复默认」回到编译时配置 |
