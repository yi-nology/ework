<template>
    <div class="layout">
        <Layout class="layout-full">
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed" class="layout-sider">
                <div class="logo-con">
                    <a href="./"><img src="logo.png" key="max-logo"/><span class="logo-text">Work</span></a>
                </div>
                <Menu :active-name="activeSection" theme="dark" width="auto" :class="menuitemClasses" @on-select="jumpAnchor">
                    <Menu-group title="个人">
                        <menu-item name="我的收藏">
                            <Icon type="ios-heart"/>
                            <span class="menu-label">我的收藏</span>
                        </menu-item>
                        <menu-item name="常用网址">
                            <Icon type="ios-time"/>
                            <span class="menu-label">常用网址</span>
                        </menu-item>
                    </Menu-group>
                    <Menu-group title="团队分类" v-if="data.length">
                        <menu-item :name="item.title" v-for="(item,index) in data" :key="index">
                            <span class="menu-badge" :style="{ background: badgeColor(index) }">{{ (item.title || '?')[0] }}</span>
                            <span class="menu-label">{{ item.title }}</span>
                            <span class="menu-count">{{ item.nav.length }}</span>
                        </menu-item>
                    </Menu-group>
                </Menu>
                <div slot="trigger"></div>
                <div class="settings-entry" v-if="enableRb" @click="showSettings = true">
                    <Icon type="ios-settings-outline"/>
                    <span class="settings-label">配置中心</span>
                    <span class="settings-tag" :class="{ 'settings-tag-remote': currentDataMode === 'remote' }">{{ currentDataMode }}</span>
                </div>
            </Sider>
            <Layout class="layout-content-area">
                <Header class="layout-header-bar">
                    <div class="welcome-wrap">
                        <span class="welcome-text">{{ greeting }} 👋</span>
                        <span class="stats-chip" v-if="totalLinks">{{ data.length }} 个分类 · {{ totalLinks }} 个站点</span>
                    </div>
                    <Tag v-if="enableRb && currentDataMode === 'remote'" color="blue" class="data-mode-tag">{{ rbPipeline }}</Tag>
                    <div class="header-spacer"></div>
                    <transition name="fade">
                        <span class="search-result-chip" v-if="searchStatus">找到 {{ searchNum }} 个</span>
                    </transition>
                    <div class="search-box">
                        <Icon type="ios-search" class="search-icon"/>
                        <input v-model="search" class="search-input" placeholder="搜索名称 / 链接 / 描述..." @input="onSearchInput" @keyup.enter="searchData"/>
                        <span class="search-clear" v-show="search" @click="resetSearch">
                            <Icon type="ios-close-circle"/>
                        </span>
                    </div>
                </Header>
                <Content class="layout-scroll-area" ref="scrollArea" @scroll.native="onContentScroll">
                    <div class="state-block" v-if="loadError">
                        <Icon type="ios-cloud-off-outline" class="state-icon"/>
                        <p class="state-title">数据加载失败</p>
                        <p class="state-hint">请检查配置中心连接后重试</p>
                        <Button type="primary" @click="retryLoad">重新加载</Button>
                    </div>
                    <div class="skeleton-area" v-else-if="spinShow && !totalLinks">
                        <div class="skeleton-card" v-for="i in 2" :key="i">
                            <div class="sk-row sk-title shimmer"></div>
                            <div class="sk-grid">
                                <div class="sk-item shimmer" v-for="j in 8" :key="j"></div>
                            </div>
                        </div>
                    </div>
                    <div class="state-block" v-else-if="searchStatus && searchNum === 0">
                        <Icon type="ios-search" class="state-icon"/>
                        <p class="state-title">没有找到与「{{ search }}」相关的站点</p>
                        <p class="state-hint">换个关键词试试，或清空搜索</p>
                        <Button @click="resetSearch">清空搜索</Button>
                    </div>
                    <div class="state-block" v-else-if="!spinShow && !totalLinks">
                        <Icon type="ios-archive-outline" class="state-icon"/>
                        <p class="state-title">暂无导航数据</p>
                        <p class="state-hint">请到配置中心检查各渠道发布状态</p>
                    </div>
                    <NavSub v-else :data="data" :spinShow="spinShow"></NavSub>
                </Content>
                <Footer class="layout-footer-center">版权 © 2014-2026 MurphyYi · <a
                        href="https://github.com/yi-nology/ework" target="_blank">GitHub (项目地址)</a></Footer>
            </Layout>
        </Layout>
        <BackTop></BackTop>
        <SettingsPanel v-if="enableRb" :visible="showSettings" @close="showSettings = false"></SettingsPanel>
    </div>
</template>
<script>
    import NavSub from '@/components/card/sub'
    import {GetWebData} from "@/api/github"
    import {colorForIndex} from '@/common/js/palette'
    export default {
        data() {
            const enableRb = process.env.VUE_APP_ENABLE_RB !== 'false'
            let currentDataMode = 'local'
            let rbPipeline = 'main'
            if (enableRb) {
                var loadRbSettings = require('@/common/js/cache').loadRbSettings
                var rbSettings = loadRbSettings()
                currentDataMode = rbSettings.dataMode
                rbPipeline = process.env.VUE_APP_RB_PIPELINE || 'main'
            }
            return {
                isCollapsed: false,
                search: '',
                searchStatus: false,
                searchNum: 0,
                data: [],
                sourceData: [],
                spinShow: false,
                loadError: false,
                activeSection: '',
                spyLock: false,
                showSettings: false,
                enableRb: enableRb,
                currentDataMode: currentDataMode,
                rbPipeline: rbPipeline
            }
        },
        computed: {
            greeting() {
                const h = new Date().getHours()
                if (h < 6) return '夜深了'
                if (h < 12) return '早上好'
                if (h < 14) return '中午好'
                if (h < 18) return '下午好'
                return '晚上好'
            },
            totalLinks() {
                return (this.data || []).reduce((s, c) => s + (c.nav || []).length, 0)
            },
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
        },
        methods: {
            badgeColor(index) {
                return colorForIndex(index)
            },
            githubWebData(){
              this.spinShow = true
              this.loadError = false
              GetWebData().then((data)=>{
                this.data = data.data || []
              }).catch(() => {
                this.loadError = true
              }).finally(() => {
                this.spinShow = false
              })
            },
            jumpAnchor(name) {
                if (document.documentElement.clientWidth <= 768) {
                    this.isCollapsed = true
                }
                const target = document.getElementById(name)
                if (target && target.offsetParent !== null) {
                    this.activeSection = name
                    this.spyLock = true
                    setTimeout(() => { this.spyLock = false }, 1000)
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    return
                }
                // 目标区块不可见（收藏/常用为空或被搜索过滤）时给出提示
                if (name === '我的收藏') {
                    this.$Message.info('还没有收藏，鼠标悬浮卡片可添加')
                } else if (name === '常用网址') {
                    this.$Message.info('打开的链接会自动出现在这里')
                } else {
                    this.$Message.info('该分类暂无站点')
                }
            },
            onContentScroll() {
                if (this.spyLock) return
                const wrap = this.$refs.scrollArea
                if (!wrap || !wrap.$el) return
                const wrapEl = wrap.$el
                const sections = wrapEl.querySelectorAll('.card-section')
                let current = ''
                sections.forEach(s => {
                    if (s.offsetParent === null) return
                    const top = s.getBoundingClientRect().top - wrapEl.getBoundingClientRect().top
                    if (top <= 96) current = s.id
                })
                if (current && current !== this.activeSection) this.activeSection = current
            },
            onSearchInput() {
                clearTimeout(this.searchTimer)
                this.searchTimer = setTimeout(() => {
                    this.searchData()
                }, 300)
            },
            searchData() {
                // 每次都从 sourceData 全量重新过滤，避免在上一次结果上叠加过滤
                const kw = (this.search || '').trim().toLowerCase()
                if (!kw) {
                    this.resetSearch()
                    return
                }
                if (!this.searchStatus) {
                    this.sourceData = JSON.parse(JSON.stringify(this.data))
                    this.searchStatus = true
                }
                let count = 0
                this.data = (this.sourceData || []).map(cat => {
                    const nav = (cat.nav || []).filter(it =>
                        ((it.name || '') + '|' + (it.link || '') + '|' + (it.desc || '')).toLowerCase().indexOf(kw) !== -1
                    )
                    if (nav.length) count += nav.length
                    return {
                        title: cat.title,
                        name: cat.name,
                        nav: nav
                    }
                }).filter(cat => cat.nav.length)
                this.searchNum = count
            },
            resetSearch() {
                if (this.searchStatus) {
                    this.data = JSON.parse(JSON.stringify(this.sourceData))
                }
                this.searchStatus = false
                this.search = ''
                this.searchNum = 0
                clearTimeout(this.searchTimer)
            }
        },
      created() {
          this.githubWebData()
      },
      components: {
            NavSub,
            SettingsPanel: process.env.VUE_APP_ENABLE_RB !== 'false'
                ? require('@/components/settings').default
                : { render: function (h) { return h() } }
        }
    }
</script>
<style lang=less scoped>
    .layout {
        height: 100vh;
        width: 100vw;
        background: var(--surface-primary);
        overflow: hidden;
    }

    .layout-full {
        height: 100%;
    }

    .layout-sider {
        height: 100vh !important;
        position: relative;
    }

    .layout-content-area {
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .layout-header-bar {
        background: var(--card-bg);
        border-bottom: 1px solid var(--border-color);
        display: flex !important;
        align-items: center;
        gap: 16px;
        padding: 0 32px !important;
        height: 64px !important;
        line-height: normal !important;
        flex-shrink: 0;
        box-shadow: none !important;
    }

    .welcome-wrap {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .welcome-text {
        font-size: 15px;
        font-weight: 500;
        color: var(--foreground-primary);
        white-space: nowrap;
    }

    .stats-chip {
        font-size: 12px;
        color: var(--foreground-muted);
        background: var(--surface-primary);
        border: 1px solid var(--border-color);
        padding: 3px 10px;
        border-radius: 999px;
        white-space: nowrap;
    }

    .search-result-chip {
        font-size: 12px;
        color: var(--accent-deep);
        background: var(--accent-weak);
        padding: 3px 10px;
        border-radius: 999px;
        white-space: nowrap;
    }

    .header-spacer {
        flex: 1;
        height: 1px;
    }

    .search-box {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0 14px;
        background: var(--surface-primary);
        border: 1px solid var(--border-color);
        border-radius: 999px;
        width: 320px;
        height: 40px;
        box-sizing: border-box;
        flex-shrink: 0;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;

        &:focus-within {
            border-color: var(--accent-primary);
            box-shadow: 0 0 0 3px var(--accent-weak);
        }
    }

    .search-icon {
        color: var(--foreground-muted);
        font-size: 14px;
        flex-shrink: 0;
    }

    .search-input {
        border: none;
        outline: none;
        background: transparent;
        font-size: 13px;
        color: var(--foreground-primary);
        width: 100%;
        height: 100%;
        font-family: inherit;
        line-height: normal;

        &::placeholder {
            color: var(--foreground-muted);
        }
    }

    .search-clear {
        cursor: pointer;
        color: var(--foreground-muted);
        display: flex;
        align-items: center;
        font-size: 16px;

        &:hover {
            color: var(--foreground-primary);
        }
    }

    .layout-scroll-area {
        flex: 1;
        overflow-y: auto;
        padding: 32px;
        background: var(--surface-primary);
    }

    /* 状态区块：错误 / 搜索无结果 / 数据为空 */
    .state-block {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        color: var(--foreground-muted);

        .state-icon {
            font-size: 48px;
            color: var(--surface-secondary);
            margin-bottom: 8px;
        }

        .state-title {
            font-size: 15px;
            font-weight: 500;
            color: var(--foreground-secondary);
        }

        .state-hint {
            font-size: 12px;
            color: var(--foreground-muted);
        }

        button {
            margin-top: 16px;
            border-radius: 8px;
        }
    }

    /* 首屏骨架屏 */
    .skeleton-area {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .skeleton-card {
        background: var(--card-bg);
        border-radius: 16px;
        padding: 24px;
    }

    .sk-row {
        width: 140px;
        height: 16px;
        border-radius: 4px;
    }

    .sk-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 20px;
    }

    .sk-item {
        width: 180px;
        height: 62px;
        border-radius: 12px;
        border: 1px solid var(--border-color);
    }

    .shimmer {
        background: linear-gradient(100deg, var(--surface-primary) 40%, var(--card-bg) 50%, var(--surface-primary) 60%);
        background-size: 200% 100%;
        animation: shimmer 1.2s infinite linear;
    }

    @keyframes shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
    }

    .layout-footer-center {
        background: var(--footer-bg);
        border-top: 1px solid var(--border-color);
        color: var(--foreground-muted);
        font-size: 12px;
        text-align: center;
        padding: 12px 32px;
        flex-shrink: 0;
    }

    .layout-footer-center a {
        color: var(--accent-primary);
    }

    /* 侧边栏菜单 */
    .menu-item .menu-label {
        display: inline-block;
        overflow: hidden;
        width: 120px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .menu-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 6px;
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        line-height: 1;
        margin-right: 10px;
        vertical-align: middle;
        flex-shrink: 0;
    }

    .menu-count {
        position: absolute;
        right: 14px;
        font-size: 11px;
        color: var(--foreground-muted);
        font-family: 'Courier New', monospace;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transform: translateX(5px);
        vertical-align: middle;
        font-size: 22px;
    }

    .collapsed-menu .menu-badge {
        width: 20px !important;
        height: 20px !important;
        margin-right: 0;
    }

    .ivu-layout-sider {
        z-index: 100;
        background: var(--sidebar-bg) !important;
    }

    .ivu-layout-sider .ivu-menu-dark {
        /* keep sidebar dark */
        background: var(--sidebar-bg) !important;
    }

    /* 圆角 pill 菜单项 + 分组标题 */
    .ivu-layout-sider /deep/ .ivu-menu-vertical .ivu-menu-item {
        margin: 2px 8px;
        border-radius: 8px;
        padding: 12px 16px;
        transition: background 0.2s ease, color 0.2s ease;
    }

    .ivu-layout-sider /deep/ .ivu-menu-vertical .ivu-menu-item:hover {
        background: rgba(255, 255, 255, 0.06) !important;
        color: #FFFFFF !important;
    }

    .ivu-layout-sider /deep/ .ivu-menu-vertical .ivu-menu-item-active {
        background: rgba(201, 123, 93, 0.18) !important;
        color: #F0B794 !important;
        border-right: none;
    }

    .ivu-layout-sider /deep/ .ivu-menu-vertical .ivu-menu-item-active .menu-count {
        color: #F0B794;
    }

    .ivu-layout-sider /deep/ .ivu-menu-item-group-title {
        font-size: 11px;
        letter-spacing: 0.05em;
        padding: 16px 20px 6px 20px;
        color: rgba(255, 255, 255, 0.35);
    }

    .collapsed-menu /deep/ .ivu-menu-item-group-title {
        display: none;
    }

    .logo-con {
        padding: 12px 20px 20px 20px;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .logo-con a {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .logo-con img {
        height: 32px;
        width: auto;
    }

    .logo-text {
        font-size: 18px;
        font-weight: 600;
        color: var(--foreground-inverse);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .data-mode-tag {
        margin-left: 0;
    }

    .settings-entry {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        border-top: 1px solid #3D3D3D;
        cursor: pointer;
        transition: background 0.2s ease;

        i {
            font-size: 16px;
            color: var(--foreground-muted);
        }

        &:hover {
            background: #3D3D3D;
            i, .settings-label {
                color: var(--accent-primary);
            }
        }
    }

    .settings-label {
        font-size: 12px;
        color: var(--foreground-muted);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .settings-tag {
        font-size: 9px;
 font-family: 'Courier New', monospace;
        padding: 2px 6px;
        padding: 2px 6px;
        border-radius: 999px;
        background: #3D3D3D;
        background: #3D3D3D;
        color: var(--foreground-muted);
        margin-left: auto;
        white-space: nowrap;
    }

    @media screen and (max-width: 768px) {
        .layout-header-bar {
            padding: 0 16px;
        }
        .search-box {
            width: auto;
            flex: 1;
        }
        .welcome-wrap {
            display: none;
        }
        .layout-scroll-area {
            padding: 16px;
        }
    }
</style>
