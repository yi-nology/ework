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
    --sidebar-bg: #2B2B2B;
    --card-bg: #FFFFFF;
    --border-color: #E8E2DA;
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
</style>
