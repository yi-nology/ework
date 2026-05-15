# GitHub Actions 自动构建说明

## 功能说明

配置 GitHub Action 后，每次代码提交到 main 分支都会自动：
1. 构建 Docker 镜像（支持 amd64/arm64 多架构）
2. 推送到 GitHub Container Registry (GHCR)
3. 可选：推送到 Docker Hub

## 使用步骤

### 1. 启用 GitHub Packages

1. 进入 GitHub 仓库 Settings
2. 找到 "Packages" 确保功能已启用

### 2. 配置工作流

使用 `docker-build-simple.yml`（仅 GHCR，推荐）：
```bash
mv .github/workflows/docker-build-simple.yml .github/workflows/docker-build.yml
rm .github/workflows/docker-build-simple.yml
```

或使用完整版本 `docker-build.yml`（支持 Docker Hub 和 GHCR）

### 3. 添加 Secrets（如使用 Docker Hub）

进入 GitHub 仓库 → Settings → Secrets and variables → Actions → New repository secret：

| Secret 名称 | 说明 |
|-------------|------|
| `DOCKERHUB_USERNAME` | Docker Hub 用户名 |
| `DOCKERHUB_TOKEN` | Docker Hub Access Token |

### 4. 触发构建

提交代码到 main/master 分支即可自动触发构建。

## 拉取和使用镜像

```bash
# 从 GHCR 拉取
docker pull ghcr.io/你的用户名/ework-nav:latest

# 运行
docker run -d -p 8080:80 ghcr.io/你的用户名/ework-nav:latest

# 挂载本地配置文件
docker run -d -p 8080:80 \
  -v $(pwd)/nav-data.json:/usr/share/nginx/html/nav-data.json:ro \
  ghcr.io/你的用户名/ework-nav:latest
```

## 镜像标签

- `latest` - 最新版本
- `sha-xxxxxxx` - 对应 Git Commit 的版本
- `v1.0.0` - 对应 Git Tag 的版本

## 本地测试构建

```bash
# 本地构建测试
docker build --build-arg NODE_OPTIONS=--openssl-legacy-provider -t ework-nav .

# 本地运行测试
docker run -d -p 8080:80 ework-nav
```

## Troubleshooting

### 1. 权限不足
确保 `GITHUB_TOKEN` 有写 Packages 的权限：
- 仓库 Settings → Actions → General
- Workflow permissions 选择 "Read and write permissions"

### 2. 构建失败
检查是否有足够的构建时间，Node.js 构建可能需要 3-5 分钟。

### 3. 镜像拉取失败
确保包已设置为公开，或已登录 GHCR：
```bash
docker login ghcr.io -u 你的用户名 -p 你的 PAT
```
