#!/bin/sh

CONFIG_FILE="/usr/share/nginx/html/config.js"

cat > $CONFIG_FILE << EOF
window.ESHOP_CONFIG = {
  dataMode: '${DATA_MODE:-local}',
  configType: '${CONFIG_TYPE:-rainbow-bridge}',
  baseUrl: '${RB_BASE_URL:-/rainbow-bridge}',
  environment: '${RB_ENVIRONMENT:-navi}',
  localDataUrl: '${LOCAL_DATA_URL:-/nav-data.json}',
  nacosServerAddr: '${NACOS_SERVER_ADDR:-http://localhost:8848/nacos}',
  nacosNamespace: '${NACOS_NAMESPACE:-public}',
  nacosDataId: '${NACOS_DATA_ID:-ework-nav.json}',
  nacosGroup: '${NACOS_GROUP:-DEFAULT_GROUP}',
  apolloMeta: '${APOLLO_META:-http://localhost:8080}',
  apolloAppId: '${APOLLO_APP_ID:-ework-nav}',
  apolloNamespace: '${APOLLO_NAMESPACE:-application}',
  skipSslVerify: ${SKIP_SSL_VERIFY:-true}
};
EOF

exec nginx -g 'daemon off;'
