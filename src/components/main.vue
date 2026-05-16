<template>
    <div class="layout">
        <Layout class="layout-full">
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed" class="layout-sider">
                <div class="logo-con">
                    <a href="./"><img src="logo.png" key="max-logo"/><span class="logo-text">Work</span></a>
                </div>
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses" @on-select="jumpAnchor">
                    <menu-item name="我的收藏">
                        <Icon type="ios-heart"/>
                        <span>我的收藏</span>
                    </menu-item>
                    <menu-item name="常用网址">
                        <Icon type="ios-navigate"></Icon>
                        <span>常用网址</span>
                    </menu-item>
                    <menu-item :name="item.title" v-for="(item,index) in data" :key="index">
                        <Icon type="ios-search"></Icon>
                        <span>{{ item.title }}</span>
                    </menu-item>
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
                    <span class="welcome-text">欢迎回来 👋</span>
                    <Tag v-if="enableRb && currentDataMode === 'remote'" color="blue" class="data-mode-tag">{{ rbPipeline }}</Tag>
                    <div class="header-spacer"></div>
                    <div class="search-box">
                        <Icon type="ios-search" class="search-icon"/>
                        <input v-model="search" class="search-input" placeholder="搜索网址..." @keyup.enter="searchData"/>
                    </div>
                    <Button class="search-btn" @click="searchData">搜索</Button>
                    <Button class="reset-btn" @click="resetSearch" v-show="searchStatus">重置</Button>
                </Header>
                <Content class="layout-scroll-area">
                    <NavSub :data="data" :spinShow="spinShow"></NavSub>
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
                data: {},
                sourceData: '',
                serarchNum: 0,
                spinShow: false,
                showSettings: false,
                enableRb: enableRb,
                currentDataMode: currentDataMode,
                rbPipeline: rbPipeline
            }
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
        },
        methods: {
            githubWebData(){
              this.spinShow = true
              GetWebData().then((data)=>{
                this.data=data.data
              }).catch(() => {
                this.$Message.error('数据加载失败，请检查配置')
              }).finally(() => {
                this.spinShow = false
              })
            },
            jumpAnchor(name) {
                if (document.documentElement.clientWidth <= 768) {
                    this.isCollapsed = true
                }
                document.querySelector('#' + name).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            },
            searchData() {
                if (typeof this.search === 'undefined' || this.search === null || this.search === '') {
                    this.$Message.error('输入内容呀！')
                    return true
                }
                if (!this.searchStatus) {
                    this.sourceData = JSON.parse(JSON.stringify(this.data))
                }
                this.searchStatus = true
                for (let d in this.data) {
                    for (let i = 0; i < this.data[d]['nav'].length; i++) {
                        if (this.data[d]['nav'][i]['name'].toLowerCase().indexOf(this.search.toLowerCase()) === -1) {
                            if (this.data[d]['nav'][i]['link'].toLowerCase().indexOf(this.search.toLowerCase()) === -1) {
                                this.data[d]['nav'].splice(i--, 1)
                            } else {
                                this.serarchNum++
                            }
                        } else {
                            this.serarchNum++
                        }
                    }
                }
                if (this.serarchNum === 0) {
                    this.$Message.error('没找到哦.')
                } else {
                    this.$Message.success('查找到了' + this.serarchNum + '个相近的.')
                }
            },
            resetSearch() {
                this.spinShow = true
                this.searchStatus = false
                this.search = ''
                this.serarchNum = 0
                this.data = JSON.parse(JSON.stringify(this.sourceData))
                setTimeout(() => {
                    this.spinShow = false
                }, 1000)
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
        line-height: 64px !important;
        flex-shrink: 0;
        box-shadow: none !important;
    }

    .welcome-text {
        font-size: 15px;
        font-weight: 500;
        color: var(--foreground-primary);
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
        padding: 8px 14px;
        background: var(--surface-primary);
        border: 1px solid var(--border-color);
        border-radius: 999px;
        width: 280px;
        height: 40px;
        box-sizing: border-box;
        flex-shrink: 0;
        transition: border-color 0.2s ease;

        &:focus-within {
            border-color: var(--accent-primary);
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

    .search-btn {
        background: var(--accent-primary) !important;
        border-color: var(--accent-primary) !important;
        color: var(--foreground-inverse) !important;
        border-radius: 8px !important;
        flex-shrink: 0;
    }

    .reset-btn {
        background: var(--surface-primary) !important;
        border-color: var(--border-color) !important;
        color: var(--foreground-secondary) !important;
        border-radius: 8px !important;
        flex-shrink: 0;
    }

    .layout-scroll-area {
        flex: 1;
        overflow-y: auto;
        padding: 32px;
        background: var(--surface-primary);
    }

    .layout-footer-center {
        background: var(--card-bg);
        border-top: 1px solid var(--border-color);
        color: var(--foreground-muted);
        font-size: 12px;
        text-align: center;
        padding: 16px 32px;
        flex-shrink: 0;
    }

    .layout-footer-center a {
        color: var(--accent-primary);
    }

    .menu-item span {
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

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .ivu-layout-sider {
        z-index: 100;
        background: var(--sidebar-bg) !important;
    }

    .ivu-layout-sider .ivu-menu-dark {
        background: var(--sidebar-bg) !important;
    }

    .ivu-layout-sider .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active,
    .ivu-layout-sider .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover {
        color: var(--accent-primary) !important;
        background: #3D3D3D !important;
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
        border-radius: 999px;
        background: #3D3D3D;
        color: var(--foreground-muted);
        margin-left: auto;
        white-space: nowrap;
    }

    .settings-tag-remote {
        background: var(--accent-primary);
        color: var(--foreground-inverse);
    }

    @media screen and (max-width: 768px) {
        .layout-header-bar {
            padding: 0 16px;
        }
        .search-box {
            width: auto;
            flex: 1;
        }
        .welcome-text {
            display: none;
        }
        .layout-scroll-area {
            padding: 16px;
        }
    }
</style>
