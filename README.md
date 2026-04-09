# Work [GitHub](https://github.com/yi-nology/ework)

> **Work** 是一个简洁美观的网址导航站，省去到处找服务地址的烦恼。
> 支持纯静态模式和虹桥计划 (Rainbow Bridge) 远程配置模式。

## 设计稿

设计文件存放在 `design/` 目录：

| 文件 | 说明 |
|------|------|
| `design/01-main-layout.png` | 主页面布局设计（全屏拉伸模式） |
| `design/02-logo-design.png` | 应用图标设计方案 |
| `design/03-rb-settings-interaction.png` | 虹桥计划 API 切换交互设计 |

## 功能特性

- 深色侧边栏 + 暖色内容区导航布局
- 分类卡片展示，支持搜索筛选
- 收藏夹和常用网址（Cookie 持久化）
- 导航链接 Hover/Active 交互状态
- Poptip 操作菜单（打开/复制/收藏/常用）
- 虹桥计划 API 远程配置（可编译时开关）
- 全屏拉伸模式，独立滚动区域
- 移动端自适应

## 快速开始

```bash
# 安装依赖
yarn install

# 开发模式
yarn serve

# 生产构建（含虹桥计划功能）
yarn build

# 纯静态构建（无虹桥计划功能）
yarn build:static

# 代码检查
yarn lint
```

## 添加网址

### 方式一：静态 JSON

在 `data` 分支下编辑 `data.json`：

```json
{
  "icon": "https://www.baidu.com/favicon.ico",
  "name": "百度",
  "desc": "百度一下你就知道",
  "link": "https://www.baidu.com"
}
```

### 方式二：虹桥计划远程配置

参见 [RB_INTEGRATION.md](./RB_INTEGRATION.md) 了解完整的虹桥计划对接文档。

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VUE_APP_ENABLE_RB` | 是否启用虹桥计划功能 | `true` |
| `VUE_APP_DATA_MODE` | 数据模式 `local` / `remote` | `local` |
| `VUE_APP_LOCAL_DATA_URL` | 本地数据 JSON 地址 | COS 静态文件 |
| `VUE_APP_RB_BASE_URL` | 虹桥计划 API 地址 | `http://localhost:8080/rainbow-bridge` |
| `VUE_APP_RB_ENVIRONMENT` | 环境名称 | `navi` |
| `VUE_APP_RB_PIPELINE` | Pipeline（不可用户配置） | `main` |

## Docker 部署

```bash
# 构建镜像
docker build -t ework .

# 运行
docker run -d -p 80:80 ework
```

## 效果演示

[查看 Demo](https://yi-nology.github.io/ework)

## 技术栈

**前端：** Vue 2 + Vuex + Vue Router + Vue Lazyload + iView + Clipboard + js-cookie + Webpack + Less

**后端（可选）：** Go - [虹桥计划 (Rainbow Bridge)](https://github.com/yi-nology/rainbow_bridge)

## License

MIT
