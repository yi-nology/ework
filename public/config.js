// 运行时配置（部署环境中由 docker-entrypoint.sh / 运维注入覆盖）
// 优先级: Cookie 设置 > window.ESHOP_CONFIG > Vite 环境变量
window.ESHOP_CONFIG = {
  dataMode: "remote",
  configType: "rainbow-bridge",
  baseUrl: "/rainbow-bridge",
  environment: "navi",
  localDataUrl: "/nav-data.json",
  nacosServerAddr: "http://localhost:8848/nacos",
  nacosNamespace: "public",
  nacosDataId: "ework-nav.json",
  nacosGroup: "DEFAULT_GROUP",
  apolloMeta: "http://localhost:8080",
  apolloAppId: "ework-nav",
  apolloNamespace: "application",
  skipSslVerify: true
};
