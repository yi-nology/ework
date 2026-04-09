<template>
    <div class="settings-overlay" v-show="visible" @click.self="close">
        <div class="settings-panel" :class="{ 'panel-open': visible }">
            <div class="panel-header">
                <span class="panel-title">虹桥计划 API 设置</span>
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
                        <span>API 地址</span>
                        <span class="form-hint">默认: {{ defaults.baseUrl }}</span>
                    </label>
                    <input class="form-input" type="text" v-model="form.baseUrl" placeholder="输入虹桥计划 API 地址"/>
                </div>

                <div class="form-section" v-show="form.dataMode === 'remote'">
                    <label class="form-label">
                        <span>环境名称</span>
                        <span class="form-hint">默认: {{ defaults.environment }}</span>
                    </label>
                    <input class="form-input" type="text" v-model="form.environment" placeholder="输入环境名称"/>
                </div>
            </div>

            <div class="panel-footer">
                <button class="btn btn-default" @click="resetDefaults">恢复默认</button>
                <button class="btn btn-primary" @click="save">保存并应用</button>
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
            form: {
                dataMode: saved.dataMode,
                baseUrl: saved.baseUrl,
                environment: saved.environment
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
</style>
