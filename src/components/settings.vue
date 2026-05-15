<template>
    <div class="settings-overlay" v-show="visible" @click.self="close">
        <div class="settings-panel" :class="{ 'panel-open': visible }">
            <div class="panel-header">
                <span class="panel-title">三方API 设置</span>
                <Icon type="ios-close" size="18" class="panel-close" @click="close"/>
            </div>

            <div class="panel-body">
                <div class="form-section">
                    <label class="form-label">数据模式</label>
                    <div class="mode-btns">
                        <div class="mode-btn" :class="{ active: form.dataMode === 'local' }" @click="form.dataMode = 'local'">
                            <Icon type="ios-folder-outline"/>
                            <span>Local 本地</span>
                        </div>
                        <div class="mode-btn" :class="{ active: form.dataMode === 'remote' }" @click="form.dataMode = 'remote'">
                            <Icon type="ios-cloud-outline"/>
                            <span>Remote 远程</span>
                        </div>
                    </div>
                </div>

                <div class="form-section" v-show="form.dataMode === 'remote'">
                    <label class="form-label">
                        <span>配置中心类型</span>
                    </label>
                    <div class="config-type-btns">
                        <div class="config-type-btn" :class="{ active: form.configType === 'rainbow-bridge' }" @click="form.configType = 'rainbow-bridge'">
                            <span>虹桥计划</span>
                        </div>
                        <div class="config-type-btn" :class="{ active: form.configType === 'nacos' }" @click="form.configType = 'nacos'">
                            <span>Nacos</span>
                        </div>
                        <div class="config-type-btn" :class="{ active: form.configType === 'apollo' }" @click="form.configType = 'apollo'">
                            <span>Apollo</span>
                        </div>
                    </div>
                </div>

                <div class="form-section" v-show="form.dataMode === 'remote' && form.configType === 'rainbow-bridge'">
                    <label class="form-label">
                        <span>API 地址</span>
                        <span class="form-hint">默认: {{ defaults.baseUrl }}</span>
                    </label>
                    <input class="form-input" type="text" v-model="form.baseUrl" placeholder="输入虹桥计划 API 地址"/>
                </div>

                <div class="form-section" v-show="form.dataMode === 'remote' && form.configType === 'rainbow-bridge'">
                    <label class="form-label">
                        <span>环境名称</span>
                        <span class="form-hint">默认: {{ defaults.environment }}</span>
                    </label>
                    <input class="form-input" type="text" v-model="form.environment" placeholder="输入环境名称"/>
                </div>

                <div class="form-section" v-show="form.dataMode === 'remote' && form.configType === 'nacos'">
                    <label class="form-label">
                        <span>Nacos 地址</span>
                        <span class="form-hint">默认: {{ defaults.nacosServerAddr }}</span>
                    </label>
                    <input class="form-input" type="text" v-model="form.nacosServerAddr" placeholder="http://localhost:8848/nacos"/>
                </div>

                <div class="form-section" v-show="form.dataMode === 'remote' && form.configType === 'nacos'">
                    <label class="form-label">
                        <span>命名空间</span>
                        <span class="form-hint">默认: {{ defaults.nacosNamespace }}</span>
                    </label>
                    <input class="form-input" type="text" v-model="form.nacosNamespace" placeholder="public"/>
                </div>

                <div class="form-section" v-show="form.dataMode === 'remote' && form.configType === 'nacos'">
                    <label class="form-label">
                        <span>配置 Data ID</span>
                        <span class="form-hint">默认: {{ defaults.nacosDataId }}</span>
                    </label>
                    <input class="form-input" type="text" v-model="form.nacosDataId" placeholder="ework-nav.json"/>
                </div>

                <div class="form-section" v-show="form.dataMode === 'remote' && form.configType === 'nacos'">
                    <label class="form-label">
                        <span>配置 Group</span>
                        <span class="form-hint">默认: {{ defaults.nacosGroup }}</span>
                    </label>
                    <input class="form-input" type="text" v-model="form.nacosGroup" placeholder="DEFAULT_GROUP"/>
                </div>

                <div class="form-section" v-show="form.dataMode === 'remote' && form.configType === 'apollo'">
                    <label class="form-label">
                        <span>Apollo 地址</span>
                        <span class="form-hint">默认: {{ defaults.apolloMeta }}</span>
                    </label>
                    <input class="form-input" type="text" v-model="form.apolloMeta" placeholder="http://localhost:8080"/>
                </div>

                <div class="form-section" v-show="form.dataMode === 'remote' && form.configType === 'apollo'">
                    <label class="form-label">
                        <span>App ID</span>
                        <span class="form-hint">默认: {{ defaults.apolloAppId }}</span>
                    </label>
                    <input class="form-input" type="text" v-model="form.apolloAppId" placeholder="ework-nav"/>
                </div>

                <div class="form-section" v-show="form.dataMode === 'remote' && form.configType === 'apollo'">
                    <label class="form-label">
                        <span>Namespace</span>
                        <span class="form-hint">默认: {{ defaults.apolloNamespace }}</span>
                    </label>
                    <input class="form-input" type="text" v-model="form.apolloNamespace" placeholder="application"/>
                </div>

                <div class="form-section" v-show="form.dataMode === 'local'">
                    <label class="form-label">
                        <span>本地数据地址</span>
                        <span class="form-hint">支持本地 JSON 文件或远程 URL</span>
                    </label>
                    <input class="form-input" type="text" v-model="form.localDataUrl" placeholder="输入本地 JSON 文件路径"/>
                    <button class="btn-format" @click="showFormatExample = true">查看数据格式示例</button>
                </div>

                <div class="form-section" v-show="form.dataMode === 'remote'">
                    <label class="form-label">
                        <span>SSL 证书验证</span>
                    </label>
                    <div class="checkbox-item" @click="form.skipSslVerify = !form.skipSslVerify">
                        <span class="checkbox" :class="{ checked: form.skipSslVerify }">
                            <Icon v-if="form.skipSslVerify" type="ios-checkmark" size="12"/>
                        </span>
                        <span class="checkbox-label">跳过 SSL 证书验证（用于自签名证书）</span>
                    </div>
                </div>
            </div>

            <div class="panel-footer">
                <button class="btn btn-default" @click="resetDefaults">恢复默认</button>
                <button class="btn btn-primary" @click="save">保存并应用</button>
            </div>
        </div>

        <div class="modal-overlay" v-show="showFormatExample" @click.self="showFormatExample = false">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title">数据格式示例</span>
                    <Icon type="ios-close" size="18" class="modal-close" @click="showFormatExample = false"/>
                </div>
                <div class="modal-body">
                    <div class="format-desc">本地数据文件 (nav-data.json) 格式如下：</div>
                    <pre class="code-block"><code>[
  {
    "title": "分类名称",
    "name": "category-key",
    "nav": [
      {
        "name": "链接名称",
        "link": "https://example.com",
        "icon": "https://example.com/favicon.ico",
        "desc": "描述信息"
      }
    ]
  }
]</code></pre>
                    <div class="format-tips">
                        <p>📌 字段说明：</p>
                        <ul>
                            <li><b>title</b>: 分类显示名称</li>
                            <li><b>name</b>: 分类唯一标识</li>
                            <li><b>nav</b>: 该分类下的导航链接数组</li>
                            <li><b>nav[].name</b>: 链接名称</li>
                            <li><b>nav[].link</b>: 跳转地址</li>
                            <li><b>nav[].icon</b>: 图标地址（可选）</li>
                            <li><b>nav[].desc</b>: 描述文字（可选）</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" @click="showFormatExample = false">知道了</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { loadRbSettings, saveRbSettings, removeRbSettings, getRbDefaults } from '@/common/js/cache'

export default {
    props: {
        visible: {
            default: false
        }
    },
    data () {
        const defaults = getRbDefaults()
        const saved = loadRbSettings()
        return {
            defaults,
            showFormatExample: false,
            form: {
                dataMode: saved.dataMode,
                configType: saved.configType,
                baseUrl: saved.baseUrl,
                environment: saved.environment,
                localDataUrl: saved.localDataUrl,
                nacosServerAddr: saved.nacosServerAddr,
                nacosNamespace: saved.nacosNamespace,
                nacosDataId: saved.nacosDataId,
                nacosGroup: saved.nacosGroup,
                apolloMeta: saved.apolloMeta,
                apolloAppId: saved.apolloAppId,
                apolloNamespace: saved.apolloNamespace,
                skipSslVerify: saved.skipSslVerify
            }
        }
    },
    methods: {
        close () {
            this.$emit('close')
        },
        save () {
            saveRbSettings(this.form)
            this.$Message.success('设置已保存，正在刷新页面...')
            setTimeout(() => {
                location.reload()
            }, 800)
        },
        resetDefaults () {
            removeRbSettings()
            this.form = { ...this.defaults }
            this.$Message.success('已恢复默认值，正在刷新页面...')
            setTimeout(() => {
                location.reload()
            }, 800)
        }
    }
}
</script>

<style lang=less scoped>
.settings-overlay {
    position: fixed;
    top: 0;
    left: 220px;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
}

.settings-panel {
    width: 340px;
    background: var(--card-bg);
    border-right: 1px solid var(--border-color);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    animation: slideIn 0.25s ease;
}

@keyframes slideIn {
    from {
        transform: translateX(-20px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid var(--border-color);
}

.panel-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--foreground-primary);
}

.panel-close {
    cursor: pointer;
    color: var(--foreground-muted);
    &:hover {
        color: var(--foreground-primary);
    }
}

.panel-body {
    flex: 1;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
}

.form-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    color: var(--foreground-secondary);
}

.form-hint {
    font-size: 10px;
    color: var(--foreground-muted);
    font-family: 'Geist Mono', monospace;
}

.mode-btns {
    display: flex;
    gap: 8px;
}

.config-type-btns {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.config-type-btn {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid var(--border-color);
    background: var(--surface-primary);
    cursor: pointer;
    font-size: 11px;
    color: var(--foreground-secondary);
    transition: all 0.2s ease;

    &:hover {
        border-color: var(--accent-primary);
    }

    &.active {
        background: var(--accent-primary);
        border-color: var(--accent-primary);
        color: var(--foreground-inverse);
    }
}

.checkbox-item {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    padding: 8px 0;
}

.checkbox {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    border: 1px solid var(--border-color);
    background: var(--surface-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--foreground-inverse);
    transition: all 0.2s ease;

    &.checked {
        background: var(--accent-primary);
        border-color: var(--accent-primary);
    }
}

.checkbox-label {
    font-size: 12px;
    color: var(--foreground-secondary);
}

.mode-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background: var(--surface-primary);
    cursor: pointer;
    font-size: 12px;
    color: var(--foreground-secondary);
    transition: all 0.2s ease;

    &:hover {
        border-color: var(--accent-primary);
    }

    &.active {
        background: var(--accent-primary);
        border-color: var(--accent-primary);
        color: var(--foreground-inverse);

        i {
            color: var(--foreground-inverse);
        }
    }
}

.form-input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--surface-primary);
    font-size: 12px;
    font-family: 'Geist Mono', 'Courier New', monospace;
    color: var(--foreground-primary);
    outline: none;
    transition: border-color 0.2s ease;
    box-sizing: border-box;

    &:focus {
        border-color: var(--accent-primary);
    }

    &::placeholder {
        color: var(--foreground-muted);
    }
}

.panel-footer {
    display: flex;
    gap: 8px;
    padding: 20px 24px;
    border-top: 1px solid var(--border-color);
}

.btn {
    flex: 1;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 12px;
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
}

.btn-default {
    background: var(--surface-primary);
    border: 1px solid var(--border-color);
    color: var(--foreground-secondary);

    &:hover {
        border-color: var(--accent-primary);
    }
}

.btn-primary {
    background: var(--accent-primary);
    color: var(--foreground-inverse);
    font-weight: 500;

    &:hover {
        opacity: 0.9;
    }
}

.btn-format {
    margin-top: 8px;
    padding: 6px 12px;
    border-radius: 6px;
    border: 1px dashed var(--accent-primary);
    background: transparent;
    color: var(--accent-primary);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: var(--accent-primary);
        color: var(--foreground-inverse);
    }
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.modal-content {
    width: 90%;
    max-width: 500px;
    max-height: 80vh;
    background: var(--card-bg);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    animation: modalFadeIn 0.25s ease;
}

@keyframes modalFadeIn {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border-color);
}

.modal-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--foreground-primary);
}

.modal-close {
    cursor: pointer;
    color: var(--foreground-muted);
    &:hover {
        color: var(--foreground-primary);
    }
}

.modal-body {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.format-desc {
    font-size: 13px;
    color: var(--foreground-secondary);
    margin-bottom: 12px;
}

.code-block {
    background: var(--surface-primary);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    overflow-x: auto;

    code {
        font-family: 'Geist Mono', 'Courier New', monospace;
        font-size: 12px;
        color: var(--accent-primary);
        line-height: 1.6;
    }
}

.format-tips {
    font-size: 12px;
    color: var(--foreground-secondary);

    p {
        margin: 0 0 8px 0;
        font-weight: 500;
    }

    ul {
        margin: 0;
        padding-left: 20px;

        li {
            margin-bottom: 4px;
        }
    }
}

.modal-footer {
    padding: 16px 20px;
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-end;
}
</style>
