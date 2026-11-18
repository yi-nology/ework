<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root {
    --surface-primary: #F3EBE2;
    --surface-secondary: #C5BEB6;
    --surface-inverse: #1A1A1A;
    --foreground-primary: #1A1A1A;
    --foreground-secondary: #3D3D3D;
    --foreground-muted: #6B6B6B;
    --foreground-inverse: #FFFFFF;
    --accent-primary: #D4916E;
    --accent-deep: #C97B5D;
    --accent-weak: #F6E4DB;
    --footer-bg: #FBF7F2;
    --sidebar-bg: #2B2B2B;
    --card-bg: #FFFFFF;
    --border-color: #E8E2DA;
    --shadow-card: 0 1px 2px rgba(26, 26, 26, 0.03), 0 6px 20px rgba(26, 26, 26, 0.05);
    --shadow-float: 0 12px 32px rgba(26, 26, 26, 0.12);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: var(--surface-primary);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

#app {
    height: 100%;
    width: 100%;
}

.ivu-poptip-inner {
    border-radius: 12px !important;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
    border: 1px solid var(--border-color) !important;
}

.ivu-poptip-body {
    padding: 12px !important;
}

.ivu-poptip-arrow {
    display: none !important;
}

.ivu-card-head {
    border-bottom: none !important;
}

/* 回到顶部按钮 */
.ivu-back-top-inner {
    background: var(--accent-primary) !important;
    border-radius: 10px !important;
    box-shadow: var(--shadow-float) !important;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    width: 48px;
    height: 48px;
    line-height: 48px;
}

.ivu-back-top-inner:hover {
    background: var(--accent-deep) !important;
}

/* 搜索结果计数 chip 过渡 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateX(6px);
}
</style>
