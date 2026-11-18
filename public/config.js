// 运行时配置:作为无注入部署(GitHub Pages 等)的默认值
// docker/k8s 部署由 docker-entrypoint.sh 在启动时覆写本文件
// 优先级: Cookie 设置 > window.ESHOP_CONFIG > Vite 环境变量
window.ESHOP_CONFIG = {
  // Pages 无后端,默认走本地数据;docker 部署注入 dataMode: "remote"
  dataMode: "local",
  configType: "rainbow-bridge",
  localDataUrl: "/nav-data.json",
  environment: "navi"
};
