<template>
<div>
    <ul class="nav-ul">
        <li class="nav-li" v-for="(item,index) in navData" :key="index">
            <Poptip placement="right" trigger="hover" :transfer="true" width="200" class="nav-poptip">
                <div class="link-item" @click="jumpLink(item)">
                    <div class="link-icon">
                        <img class="icon" v-lazy="item.icon" alt="" v-if="item.icon">
                        <span class="icon-letter" v-else>{{ (item.name || '?')[0].toUpperCase() }}</span>
                    </div>
                    <div class="link-text">
                        <span class="link-name">{{ item.name }}</span>
                        <span class="link-desc" v-if="item.desc">{{ item.desc }}</span>
                    </div>
                </div>
                <div class="poptip-panel" slot="content">
                    <div class="poptip-url">
                        <Icon type="ios-link" class="poptip-url-icon"/>
                        <span class="poptip-url-text">{{ item.link }}</span>
                    </div>
                    <div class="poptip-actions">
                        <div class="poptip-btn" @click="jumpLink(item)">
                            <Icon type="ios-open-outline"/>
                            <span>打开链接</span>
                        </div>
                        <div class="poptip-btn" @click="copyLink(item.link)">
                            <Icon type="ios-copy-outline"/>
                            <span>复制链接</span>
                        </div>
                        <div class="poptip-btn" @click="addFavorite(item)">
                            <Icon type="ios-heart-outline"/>
                            <span>添加收藏</span>
                        </div>
                        <div class="poptip-btn" @click="addBookmarks(item.link, item.name)">
                            <Icon type="ios-bookmark-outline"/>
                            <span>加入常用</span>
                        </div>
                        <div class="poptip-btn poptip-btn-danger" v-show="del" @click="delUrl(item)">
                            <Icon type="ios-trash-outline"/>
                            <span>删除</span>
                        </div>
                    </div>
                </div>
            </Poptip>
        </li>
    </ul>
    <Spin size="large" fix v-if="spinShow"></Spin>
</div>
</template>

<script>
import Clipboard from 'clipboard'
import {mapActions} from 'vuex'

export default {
    props: {
        navData: {
            default: []
        },
        subTitle: {
            default: ''
        },
        del: {
            default: false
        },
        spinShow: {
            default: false
        }
    },
    methods: {
        jumpLink (item) {
            item.title = this.subTitle
            this.saveUsedList(item)
            window.open(item.link)
        },
        copyLink (link) {
            var clipboard = new Clipboard('.poptip-btn', { text: function () { return link } })
            clipboard.on('success', () => {
                this.$Message.success('复制成功')
                clipboard.destroy()
            })
            clipboard.on('error', () => {
                this.$Message.error('该浏览器不支持自动复制')
                clipboard.destroy()
            })
        },
        addFavorite (item) {
            item.title = this.subTitle
            this.saveFavoriteList(item)
            this.$Message.success('添加成功')
        },
        delUrl (item) {
            this.deleteList(item)
        },
        addBookmarks (url, title) {
            try {
                if (window.external && window.external.AddFavorite) {
                    window.external.AddFavorite(url, title)
                } else {
                    this.$Message.info('请使用 Ctrl+D (Mac: Cmd+D) 收藏本页')
                }
            } catch (e) {
                this.$Message.info('请使用 Ctrl+D (Mac: Cmd+D) 收藏本页')
            }
        },
        ...mapActions([
            'saveFavoriteList',
            'saveUsedList',
            'deleteList'
        ])
    }
}
</script>

<style lang=less scoped>
@min-width: 768px;

.nav-ul {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.nav-li {
    width: 180px;
    cursor: pointer;
    @media screen {
        @media (max-width: @min-width) {
            width: 100%;
        }
    }
}

.link-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
        border: 2px solid var(--accent-primary);
        padding: 11px;
        box-shadow: 0 4px 12px rgba(212, 145, 110, 0.2);

        .link-icon {
            background: var(--accent-primary);

            .icon {
                filter: brightness(0) invert(1);
            }

            .icon-letter {
                color: var(--foreground-inverse);
            }
        }

        .link-name {
            font-weight: 600;
        }

        .link-desc {
            color: var(--accent-primary);
        }
    }

    &:active {
        background: var(--accent-primary);
        border: 2px solid var(--accent-primary);
        padding: 11px;
        box-shadow: 0 2px 4px rgba(212, 145, 110, 0.27);

        .link-icon {
            background: var(--foreground-inverse);

            .icon {
                filter: none;
            }

            .icon-letter {
                color: var(--accent-primary);
            }
        }

        .link-name {
            color: var(--foreground-inverse);
            font-weight: 600;
        }

        .link-desc {
            color: rgba(255, 255, 255, 0.6);
        }
    }
}

.link-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--surface-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    transition: background 0.2s ease;

    .icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        pointer-events: none;
        transition: filter 0.2s ease;
    }

    .icon-letter {
        font-size: 14px;
        font-weight: 600;
        color: var(--accent-primary);
        transition: color 0.2s ease;
    }
}

.link-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    overflow: hidden;
}

.link-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--foreground-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s ease, font-weight 0.2s ease;
}

.link-desc {
    font-size: 11px;
    color: var(--foreground-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s ease;
}

.nav-poptip {
    display: block;
}

.poptip-panel {
    width: 200px;
}

.poptip-url {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0 8px 0;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 4px;
}

.poptip-url-icon {
    font-size: 14px;
    color: var(--foreground-muted);
    flex-shrink: 0;
}

.poptip-url-text {
    font-size: 11px;
    font-family: 'Courier New', monospace;
    color: var(--foreground-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.poptip-actions {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.poptip-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s ease;

    i {
        font-size: 14px;
        color: var(--foreground-muted);
    }

    span {
        font-size: 12px;
        color: var(--foreground-primary);
    }

    &:hover {
        background: var(--surface-primary);

        i {
            color: var(--foreground-primary);
        }
    }

    &.poptip-btn-danger {
        span {
            color: #ed4014;
        }
        i {
            color: #ed4014;
        }
        &:hover {
            background: #fff0f0;
        }
    }
}
</style>
