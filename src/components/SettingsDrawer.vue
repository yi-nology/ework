<template>
  <n-drawer v-model:show="show" :width="380" placement="left">
    <n-drawer-content title="配置中心" closable>
      <n-form label-placement="top" size="small">
        <n-form-item label="数据模式">
          <n-radio-group v-model:value="settings.dataMode">
            <n-radio value="local">Local 本地</n-radio>
            <n-radio value="remote">Remote 远程</n-radio>
          </n-radio-group>
        </n-form-item>

        <n-form-item v-if="remote" label="配置中心类型">
          <n-radio-group v-model:value="settings.configType">
            <n-radio value="rainbow-bridge">配置中心</n-radio>
            <n-radio value="nacos">Nacos</n-radio>
            <n-radio value="apollo">Apollo</n-radio>
          </n-radio-group>
        </n-form-item>

        <template v-if="remote && settings.configType === 'rainbow-bridge'">
          <n-form-item label="API 地址">
            <n-input v-model:value="settings.baseUrl" placeholder="/rainbow-bridge" />
          </n-form-item>
          <n-form-item label="环境名称">
            <n-input v-model:value="settings.environment" placeholder="navi" />
          </n-form-item>
        </template>

        <template v-if="remote && settings.configType === 'nacos'">
          <n-form-item label="Nacos 地址">
            <n-input v-model:value="settings.nacosServerAddr" placeholder="http://localhost:8848/nacos" />
          </n-form-item>
          <n-form-item label="命名空间">
            <n-input v-model:value="settings.nacosNamespace" placeholder="public" />
          </n-form-item>
        </template>

        <n-form-item label="显示过滤">
          <n-checkbox v-model:checked="settings.hidePrivate">隐藏标记为私有的配置项</n-checkbox>
        </n-form-item>

        <n-form-item v-if="remote" label="自动刷新">
          <n-checkbox v-model:checked="settings.autoRefresh">每 5 分钟静默拉取新快照（页面可见时）</n-checkbox>
        </n-form-item>

        <n-form-item v-if="remote" label="SSL 证书验证">
          <n-checkbox v-model:checked="settings.skipSslVerify">跳过 SSL 证书验证（自签名证书）</n-checkbox>
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="space-between" style="width: 100%">
          <n-button @click="onReset">恢复默认</n-button>
          <n-button type="primary" @click="onSave">保存并应用</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { computed } from 'vue'
import {
  NCheckbox, NDrawer, NDrawerContent, NForm, NFormItem,
  NInput, NRadio, NRadioGroup, NButton, NSpace
} from 'naive-ui'
import { useRbSettings } from '@/composables/useRbSettings'
import { useMessage } from 'naive-ui'

const show = defineModel('show', { type: Boolean, default: false })

const { settings, save, reset } = useRbSettings()
const remote = computed(() => settings.dataMode === 'remote')
const { message } = useMessage()

function onSave () {
  save()
  message.success('设置已保存，即将刷新页面')
  setTimeout(() => location.reload(), 600)
}

function onReset () {
  reset()
  message.success('已恢复默认，即将刷新页面')
  setTimeout(() => location.reload(), 600)
}
</script>
