<template>
  <div class="layout">
    <AppSider />
    <div class="main-area">
     <AppHeader />
      <main ref="scrollEl" class="scroll-area" @scroll="onScroll">
        <ContentArea :scroll-el="scrollEl" />
      </main>
      <footer class="footer">
        版权 © 2014-2026 MurphyYi ·
        <a href="https://github.com/yi-nology/ework" target="_blank" rel="noopener">GitHub (项目地址)</a>
      </footer>
    </div>
    <n-back-top :right="40" :bottom="48" :visibility-height="400" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NBackTop } from 'naive-ui'
import AppSider from '@/components/AppSider.vue'
import AppHeader from '@/components/AppHeader.vue'
import ContentArea from '@/components/ContentArea.vue'
import { updateActiveSection } from '@/composables/useNavData'

const scrollEl = ref(null)

function onScroll () {
  updateActiveSection(scrollEl.value)
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 28px 32px 40px;
  scroll-behavior: smooth;
}

.footer {
  flex-shrink: 0;
  text-align: center;
  font-size: 12px;
  color: var(--text-3);
  padding: 12px 32px;
  background: var(--card-soft);
  border-top: 1px solid var(--border);
}

.footer a {
  color: var(--accent);
}

@media (max-width: 768px) {
  .scroll-area {
    padding: 16px 16px 32px;
  }
}
</style>
