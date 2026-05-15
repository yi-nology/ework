# Docker 部署说明

## 快速开始

### 1. 本地文件模式（默认）
```bash
docker-compose -f docker-compose.simple.yml up -d
```
访问 http://localhost:8080，使用本地 `nav-data.json` 配置。

### 2. 虹桥计划远程模式
```bash
# 修改 docker-compose.simple.yml 中 DATA_MODE=remote
# 然后启动
docker-compose -f docker-compose.simple.yml up -d
```

### 3. 完整模式（含 Nacos/Apollo）
```bash
# 启动导航 + Nacos
docker-compose --profile nacos up -d

# 启动导航 + Apollo
docker-compose --profile apollo up -d
```

## 配置说明

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `DATA_MODE` | local | 数据模式: `local` / `remote` |
| `CONFIG_TYPE` | rainbow-bridge | 配置中心类型: `rainbow-bridge` / `nacos` / `apollo` |
| `LOCAL_DATA_URL` | /nav-data.json | 本地数据文件路径 |

### 虹桥计划配置
| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `RB_BASE_URL` | /rainbow-bridge | API 地址 |
| `RB_ENVIRONMENT` | navi | 环境名称 |

### Nacos 配置
| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `NACOS_SERVER_ADDR` | http://nacos:8848/nacos | 服务地址 |
| `NACOS_NAMESPACE` | public | 命名空间 |
| `NACOS_DATA_ID` | ework-nav.json | 配置 Data ID |
| `NACOS_GROUP` | DEFAULT_GROUP | 配置 Group |

### Apollo 配置
| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `APOLLO_META` | http://apollo:8080 | Meta 服务地址 |
| `APOLLO_APP_ID` | ework-nav | 应用 ID |
| `APOLLO_NAMESPACE` | application | Namespace |

### 其他配置
| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `SKIP_SSL_VERIFY` | true | 跳过 SSL 证书验证 |

## 本地文件注入

修改 `nav-data.json` 文件后重启容器即可生效：
```bash
docker-compose restart ework-nav
```

## 数据格式

nav-data.json 格式示例：

```json
[
  {
    "title": "研发常用地址",
    "name": "backend",
    "nav": [
      {
        "name": "GitHub",
        "link": "https://github.com",
        "icon": "https://github.com/favicon.ico",
        "desc": "代码托管平台"
      },
      {
        "name": "Stack Overflow",
        "link": "https://stackoverflow.com",
        "icon": "https://stackoverflow.com/favicon.ico",
        "desc": "程序员问答社区"
      }
    ]
  },
  {
    "title": "办公常用网址",
    "name": "work",
    "nav": [
      {
        "name": "语雀",
        "link": "https://www.yuque.com",
        "icon": "https://www.yuque.com/favicon.ico",
        "desc": "知识总结，就在此刻"
      }
    ]
  }
]
```

### 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | ✅ | 分类显示名称 |
| `name` | string | ✅ | 分类唯一标识 |
| `nav` | array | ✅ | 该分类下的导航链接数组 |
| `nav[].name` | string | ✅ | 链接名称 |
| `nav[].link` | string | ✅ | 跳转地址 |
| `nav[].icon` | string | ❌ | 图标地址 |
| `nav[].desc` | string | ❌ | 描述文字 |

## 常用命令

```bash
# 启动
docker-compose up -d

# 查看日志
docker-compose logs -f ework-nav

# 重启
docker-compose restart ework-nav

# 停止并删除
docker-compose down

# 重新构建镜像
docker-compose build --no-cache
```

## 使用 GitHub Actions 自动构建

本项目已配置 GitHub Actions 支持：

1. 提交代码到 main 分支自动触发构建
2. 构建多架构镜像 (amd64/arm64)
3. 自动推送到 GitHub Container Registry (GHCR)

配置文件位置：`.github/workflows/docker-build.yml`

详细说明请参考 `GITHUB_ACTIONS.md`

### 快速使用预构建镜像

```bash
# 修改 docker-compose.simple.yml 使用预构建镜像
# 注释 build 行，取消 image 注释并替换为你的用户名
# image: ghcr.io/你的用户名/ework-nav:latest

# 直接启动（无需本地构建）
docker-compose -f docker-compose.simple.yml up -d
```
